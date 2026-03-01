// ─── FC xManager — GET /api/history/[executionId] ────────
// Returns full execution record with structured output

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, AuthError } from "@/lib/backend/auth";
import { prisma } from "@/lib/backend/db";
import { createLogger } from "@/lib/backend/services/logger";
import type { HistoryDetailResponse, Mode, ExecutionStatus } from "@/lib/backend/types";

const log = createLogger("history-detail");

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ executionId: string }> }
) {
    try {
        // ─── Authenticate ───────────────────────────────────
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
            throw error;
        }

        const { executionId } = await params;

        if (!executionId || executionId.length < 10) {
            return NextResponse.json(
                { error: "Invalid execution ID", code: "INVALID_ID" },
                { status: 400 }
            );
        }

        // ─── Fetch Execution ────────────────────────────────
        const execution = await prisma.execution.findFirst({
            where: {
                id: executionId,
                userId: auth.userId, // Ensure user owns this execution
            },
        });

        if (!execution) {
            return NextResponse.json(
                { error: "Execution not found", code: "NOT_FOUND" },
                { status: 404 }
            );
        }

        log.info("Execution detail fetched", {
            executionId,
            userId: auth.userId,
        });

        const response: HistoryDetailResponse = {
            id: execution.id,
            mode: execution.mode as Mode,
            tool: execution.tool,
            status: execution.status as ExecutionStatus,
            inputData: execution.inputData as Record<string, unknown>,
            outputData: execution.outputData as HistoryDetailResponse["outputData"],
            executionTimeMs: execution.executionTimeMs,
            errorMessage: execution.errorMessage,
            createdAt: execution.createdAt.toISOString(),
        };

        return NextResponse.json({ data: response });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        log.error("Execution detail fetch failed", { error: errorMessage });
        return NextResponse.json(
            { error: "Internal server error", code: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}
