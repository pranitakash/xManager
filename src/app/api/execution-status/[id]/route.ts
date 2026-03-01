// ─── FC xManager — GET /api/execution-status/[id] ───────
// Polling endpoint for async job status

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, AuthError } from "@/lib/backend/auth";
import { prisma } from "@/lib/backend/db";
import { createLogger } from "@/lib/backend/services/logger";
import type { ExecutionResponse, ExecutionStatus } from "@/lib/backend/types";

const log = createLogger("execution-status");

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
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

        const { id } = await params;

        if (!id || id.length < 10) {
            return NextResponse.json(
                { error: "Invalid execution ID", code: "INVALID_ID" },
                { status: 400 }
            );
        }

        // ─── Fetch Status ───────────────────────────────────
        const execution = await prisma.execution.findFirst({
            where: {
                id,
                userId: auth.userId,
            },
            select: {
                id: true,
                status: true,
                outputData: true,
                executionTimeMs: true,
                errorMessage: true,
            },
        });

        if (!execution) {
            return NextResponse.json(
                { error: "Execution not found", code: "NOT_FOUND" },
                { status: 404 }
            );
        }

        const status = execution.status as ExecutionStatus;

        const response: ExecutionResponse = {
            executionId: execution.id,
            status,
            result:
                status === "success"
                    ? (execution.outputData as ExecutionResponse["result"])
                    : null,
            executionTimeMs: execution.executionTimeMs,
            error: execution.errorMessage,
        };

        // ─── Cache Headers ──────────────────────────────────
        const headers: Record<string, string> = {};
        if (status === "pending" || status === "processing") {
            // Tell frontend to poll again
            headers["Cache-Control"] = "no-store";
            headers["X-Poll-Interval"] = "2000"; // Suggest 2s polling
        } else {
            // Completed — can be cached
            headers["Cache-Control"] = "private, max-age=3600";
        }

        log.debug("Status check", { executionId: id, status });

        return NextResponse.json(response, { headers });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        log.error("Status check failed", { error: errorMessage });
        return NextResponse.json(
            { error: "Internal server error", code: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}
