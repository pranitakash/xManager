// ─── FC xManager — Gemini AI Service ────────────────────
// Handles all interactions with Google Gemini API
// Enforces JSON output, low temperature, retry on invalid JSON

import { GoogleGenerativeAI, type Part } from "@google/generative-ai";
import { createLogger } from "./logger";

const log = createLogger("gemini-service");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

let genAI: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
    if (!genAI) {
        if (!GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    }
    return genAI;
}

// ─── Text-Only Execution ────────────────────────────────
export async function executeTextPrompt(
    systemInstruction: string,
    userPrompt: string,
    options?: {
        temperature?: number;
        maxOutputTokens?: number;
        model?: string;
    }
): Promise<{ success: true; data: Record<string, unknown> } | { success: false; error: string }> {
    const model = options?.model || "gemini-2.0-flash";
    const temperature = options?.temperature ?? 0.2;
    const maxOutputTokens = options?.maxOutputTokens ?? 8192;

    const startTime = Date.now();

    try {
        const client = getClient();
        const generativeModel = client.getGenerativeModel({
            model,
            generationConfig: {
                temperature,
                maxOutputTokens,
                responseMimeType: "application/json",
            },
            tools: [{ googleSearch: {} } as any],
            systemInstruction,
        });

        const result = await generativeModel.generateContent(userPrompt);
        const responseText = result.response.text();
        const durationMs = Date.now() - startTime;

        log.gemini("text-prompt", durationMs, true, { model });

        return parseJsonResponse(responseText, durationMs);
    } catch (error) {
        const durationMs = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : "Unknown Gemini API error";
        console.error("[gemini] Text prompt error:", errorMessage);
        log.gemini("text-prompt", durationMs, false, { error: errorMessage });
        return { success: false, error: errorMessage };
    }
}

// ─── Multimodal Execution (Text + Image) ────────────────
export async function executeMultimodalPrompt(
    systemInstruction: string,
    userPrompt: string,
    imageBase64: string,
    imageMimeType: string,
    options?: {
        temperature?: number;
        maxOutputTokens?: number;
        model?: string;
    }
): Promise<{ success: true; data: Record<string, unknown> } | { success: false; error: string }> {
    const model = options?.model || "gemini-2.0-flash";
    const temperature = options?.temperature ?? 0.2;
    const maxOutputTokens = options?.maxOutputTokens ?? 8192;

    const startTime = Date.now();

    try {
        const client = getClient();
        const generativeModel = client.getGenerativeModel({
            model,
            generationConfig: {
                temperature,
                maxOutputTokens,
                responseMimeType: "application/json",
            },
            tools: [{ googleSearch: {} } as any],
            systemInstruction,
        });

        const parts: Part[] = [
            { text: userPrompt },
            {
                inlineData: {
                    mimeType: imageMimeType,
                    data: imageBase64,
                },
            },
        ];

        const result = await generativeModel.generateContent(parts);
        const responseText = result.response.text();
        const durationMs = Date.now() - startTime;

        log.gemini("multimodal-prompt", durationMs, true, { model });

        return parseJsonResponse(responseText, durationMs);
    } catch (error) {
        const durationMs = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : "Unknown Gemini API error";
        log.gemini("multimodal-prompt", durationMs, false, { error: errorMessage });
        return { success: false, error: errorMessage };
    }
}

// ─── JSON Response Parser with Retry ────────────────────
function parseJsonResponse(
    responseText: string,
    durationMs: number
): { success: true; data: Record<string, unknown> } | { success: false; error: string } {
    try {
        // Try direct parse
        const parsed = JSON.parse(responseText);
        log.debug("JSON response parsed successfully", { durationMs });
        return { success: true, data: parsed };
    } catch {
        // Try to extract JSON from markdown code blocks
        const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                const parsed = JSON.parse(jsonMatch[1].trim());
                log.warn("JSON extracted from code block", { durationMs });
                return { success: true, data: parsed };
            } catch {
                // Fall through
            }
        }

        // Try to find JSON object in response
        const objectMatch = responseText.match(/\{[\s\S]*\}/);
        if (objectMatch) {
            try {
                const parsed = JSON.parse(objectMatch[0]);
                log.warn("JSON extracted from response body", { durationMs });
                return { success: true, data: parsed };
            } catch {
                // Fall through
            }
        }

        log.error("Failed to parse JSON from Gemini response", {
            responsePreview: responseText.substring(0, 200),
        });
        return {
            success: false,
            error: "AI response was not valid JSON. Please retry.",
        };
    }
}

// ─── Image Validation ───────────────────────────────────
const ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export function validateImage(
    base64Data: string,
    mimeType: string
): { valid: true } | { valid: false; error: string } {
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
        return {
            valid: false,
            error: `Invalid image type: ${mimeType}. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`,
        };
    }

    // Calculate approximate size from base64
    const sizeBytes = Math.ceil((base64Data.length * 3) / 4);
    if (sizeBytes > MAX_IMAGE_SIZE_BYTES) {
        return {
            valid: false,
            error: `Image too large: ${(sizeBytes / 1024 / 1024).toFixed(1)}MB. Maximum: 5MB`,
        };
    }

    return { valid: true };
}
