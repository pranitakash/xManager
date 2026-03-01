// ─── FC xManager — POST /api/execute-tool ────────────────
// Main structured execution endpoint
// Flow: Auth → Validate → Rate Limit → Execute → Store → Return

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, AuthError } from "@/lib/backend/auth";
import { ExecuteToolRequestSchema } from "@/lib/backend/types";
import type { ToolName, ExecutionResponse } from "@/lib/backend/types";
import { getToolConfig, isRegisteredTool, hasToolAccess, validateToolInput } from "@/lib/backend/tools/registry";
import { buildPrompt } from "@/lib/backend/services/prompt-engine";
import { executeTextPrompt, executeMultimodalPrompt, validateImage } from "@/lib/backend/services/gemini";
import { validateAndFormat, detectPromptInjection } from "@/lib/backend/services/response-formatter";

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        // ─── 1. Authenticate ──────────────────────────────────
        let auth;
        try {
            auth = await requireAuth();
        } catch (error) {
            if (error instanceof AuthError) {
                return NextResponse.json(
                    { error: "Authentication required", code: "AUTH_REQUIRED" },
                    { status: 401 }
                );
            }
            console.error("[execute-tool] Auth error:", error);
            return NextResponse.json(
                { error: "Authentication error", code: "AUTH_ERROR" },
                { status: 401 }
            );
        }

        console.log("[execute-tool] Authenticated:", auth.userId);

        // ─── 2. Parse & Validate Request Body ─────────────────
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON in request body", code: "INVALID_JSON" },
                { status: 400 }
            );
        }

        const parseResult = ExecuteToolRequestSchema.safeParse(body);
        if (!parseResult.success) {
            return NextResponse.json(
                {
                    error: "Invalid request format",
                    code: "INVALID_REQUEST",
                    details: {
                        errors: parseResult.error.issues.map((e) => `${e.path.join(".")}: ${e.message}`),
                    },
                },
                { status: 400 }
            );
        }

        const { mode, tool, inputData } = parseResult.data;
        console.log("[execute-tool] Tool:", tool, "Mode:", mode);

        // ─── 3. Validate Tool Exists ──────────────────────────
        if (!isRegisteredTool(tool)) {
            return NextResponse.json(
                { error: `Unknown tool: ${tool}`, code: "UNKNOWN_TOOL" },
                { status: 400 }
            );
        }

        const toolName = tool as ToolName;
        const toolConfig = getToolConfig(toolName);

        if (!toolConfig) {
            return NextResponse.json(
                { error: `Tool configuration not found: ${tool}`, code: "TOOL_NOT_FOUND" },
                { status: 500 }
            );
        }

        // ─── 4. Verify Tool Mode Match ────────────────────────
        if (toolConfig.mode !== mode) {
            return NextResponse.json(
                {
                    error: `Tool "${tool}" is not available in "${mode}" mode`,
                    code: "MODE_MISMATCH",
                },
                { status: 400 }
            );
        }

        // ─── 5. Check Subscription Access ─────────────────────
        if (!hasToolAccess(toolName, auth.subscriptionTier)) {
            return NextResponse.json(
                {
                    error: `Tool "${toolConfig.displayName}" requires "${toolConfig.requiredTier}" subscription or higher`,
                    code: "SUBSCRIPTION_REQUIRED",
                },
                { status: 403 }
            );
        }

        // ─── 6. Validate Input Schema ─────────────────────────
        const inputValidation = validateToolInput(toolName, inputData);
        if (!inputValidation.valid) {
            return NextResponse.json(
                {
                    error: "Invalid input data",
                    code: "INVALID_INPUT",
                    details: { errors: inputValidation.errors },
                },
                { status: 400 }
            );
        }

        // ─── 7. Check Input Size ──────────────────────────────
        const inputSize = JSON.stringify(inputData).length;
        if (inputSize > toolConfig.maxInputSizeBytes) {
            return NextResponse.json(
                {
                    error: `Input data exceeds maximum size (${(toolConfig.maxInputSizeBytes / 1024).toFixed(0)}KB)`,
                    code: "INPUT_TOO_LARGE",
                },
                { status: 400 }
            );
        }

        // ─── 8. Detect Prompt Injection ───────────────────────
        const textValues = extractTextValues(inputData);
        for (const text of textValues) {
            if (detectPromptInjection(text)) {
                return NextResponse.json(
                    {
                        error: "Request contains disallowed content patterns",
                        code: "INJECTION_DETECTED",
                    },
                    { status: 400 }
                );
            }
        }

        // ─── 9. Validate Image (if multimodal) ────────────────
        const imageInput = inputData.image as
            | { base64: string; mimeType: string }
            | undefined;

        if (toolConfig.isMultimodal && imageInput) {
            const imageValidation = validateImage(imageInput.base64, imageInput.mimeType);
            if (!imageValidation.valid) {
                return NextResponse.json(
                    { error: imageValidation.error, code: "INVALID_IMAGE" },
                    { status: 400 }
                );
            }
        }

        // ─── 10. Rate Limit (fail-safe) ──────────────────────
        try {
            const { checkRateLimit } = await import("@/lib/backend/middleware/rate-limit");
            const rateLimitResult = await checkRateLimit(auth.userId, auth.subscriptionTier);
            if (!rateLimitResult.allowed) {
                return NextResponse.json(
                    {
                        error: "Rate limit exceeded. Please wait before trying again.",
                        code: "RATE_LIMITED",
                        details: {
                            retryAfterSeconds: rateLimitResult.retryAfterSeconds,
                        },
                    },
                    { status: 429 }
                );
            }
            console.log("[execute-tool] Rate limit passed");
        } catch (err) {
            console.warn("[execute-tool] Rate limit check skipped:", err instanceof Error ? err.message : err);
        }

        // ─── 11. Create DB Record (optional) ─────────────────
        let executionId = `exec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
        try {
            const { prisma } = await import("@/lib/backend/db");
            const storedInput = { ...inputValidation.data };
            if (storedInput.image && typeof storedInput.image === "object") {
                storedInput.image = { mimeType: (storedInput.image as Record<string, unknown>).mimeType, attached: true };
            }
            const execution = await prisma.execution.create({
                data: {
                    userId: auth.userId,
                    mode,
                    tool: toolName,
                    inputData: JSON.parse(JSON.stringify(storedInput)),
                    status: "pending",
                },
            });
            executionId = execution.id;
            console.log("[execute-tool] DB record created:", executionId);
        } catch (err) {
            console.warn("[execute-tool] DB record creation skipped:", err instanceof Error ? err.message : err);
        }

        // ─── 12. Build Prompt ─────────────────────────────────
        const { systemInstruction, userPrompt } = buildPrompt(toolName, inputValidation.data);
        console.log("[execute-tool] Prompt built, calling Gemini...");

        // ─── 13. Execute AI ───────────────────────────────────
        let aiResult;
        if (toolConfig.isMultimodal && imageInput) {
            aiResult = await executeMultimodalPrompt(
                systemInstruction,
                userPrompt,
                imageInput.base64,
                imageInput.mimeType
            );
        } else {
            aiResult = await executeTextPrompt(systemInstruction, userPrompt);
        }

        const executionTimeMs = Date.now() - startTime;

        if (!aiResult.success) {
            // Retry once on failure
            console.log("[execute-tool] First attempt failed, retrying...");
            const retryResult = toolConfig.isMultimodal && imageInput
                ? await executeMultimodalPrompt(systemInstruction, userPrompt, imageInput.base64, imageInput.mimeType)
                : await executeTextPrompt(systemInstruction, userPrompt);

            if (!retryResult.success) {
                const response: ExecutionResponse = {
                    executionId,
                    status: "failed",
                    result: null,
                    executionTimeMs: Date.now() - startTime,
                    error: "AI processing failed after retry. Please try again.",
                };
                return NextResponse.json(response, { status: 502 });
            }

            aiResult = retryResult;
        }

        // ─── 14. Validate & Format Response ───────────────────
        const formatted = validateAndFormat(aiResult.data, toolConfig.outputSchema);
        const finalExecTime = Date.now() - startTime;

        if (!formatted.success) {
            const response: ExecutionResponse = {
                executionId,
                status: "failed",
                result: null,
                executionTimeMs: finalExecTime,
                error: "Response validation failed",
            };
            return NextResponse.json(response, { status: 502 });
        }

        // ─── 15. Store Result (optional) ──────────────────────
        try {
            const { prisma } = await import("@/lib/backend/db");
            await prisma.execution.update({
                where: { id: executionId },
                data: {
                    status: "success",
                    outputData: JSON.parse(JSON.stringify(formatted.data)),
                    executionTimeMs: finalExecTime,
                },
            });
        } catch (err) {
            console.warn("[execute-tool] DB update skipped:", err instanceof Error ? err.message : err);
        }

        console.log("[execute-tool] Success!", { tool: toolName, executionTimeMs: finalExecTime });

        const response: ExecutionResponse = {
            executionId,
            status: "success",
            result: formatted.data as ExecutionResponse["result"],
            executionTimeMs: finalExecTime,
            error: null,
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("[execute-tool] UNHANDLED ERROR:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";

        return NextResponse.json(
            { error: errorMessage, code: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}

// ─── Utility: Extract all text values from input ────────
function extractTextValues(obj: Record<string, unknown>): string[] {
    const texts: string[] = [];
    for (const value of Object.values(obj)) {
        if (typeof value === "string") {
            texts.push(value);
        } else if (Array.isArray(value)) {
            for (const item of value) {
                if (typeof item === "string") {
                    texts.push(item);
                } else if (item && typeof item === "object") {
                    texts.push(...extractTextValues(item as Record<string, unknown>));
                }
            }
        } else if (value && typeof value === "object") {
            texts.push(...extractTextValues(value as Record<string, unknown>));
        }
    }
    return texts;
}
