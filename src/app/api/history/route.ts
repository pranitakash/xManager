// ─── FC xManager — GET /api/history ──────────────────────
// Returns paginated execution history grouped by mode

import { NextRequest, NextResponse } from "next/server";
import { requireAuth, AuthError } from "@/lib/backend/auth";
import { prisma } from "@/lib/backend/db";
import { createLogger } from "@/lib/backend/services/logger";
import type { HistoryEntry, Mode } from "@/lib/backend/types";

const log = createLogger("history");

export async function GET(request: NextRequest) {
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

        // ─── Parse Query Params ─────────────────────────────
        const searchParams = request.nextUrl.searchParams;
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
        const modeFilter = searchParams.get("mode") as Mode | null;
        const skip = (page - 1) * limit;

        // ─── Build Query ────────────────────────────────────
        const where = {
            userId: auth.userId,
            ...(modeFilter && { mode: modeFilter }),
        };

        // ─── Fetch Data ─────────────────────────────────────
        const [executions, total] = await Promise.all([
            prisma.execution.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
                select: {
                    id: true,
                    mode: true,
                    tool: true,
                    status: true,
                    executionTimeMs: true,
                    createdAt: true,
                    inputData: true,
                },
            }),
            prisma.execution.count({ where }),
        ]);

        // ─── Format Response ────────────────────────────────
        const entries: HistoryEntry[] = executions.map((exec: { id: string; mode: string; tool: string; status: string; executionTimeMs: number | null; createdAt: Date; inputData: unknown }) => ({
            id: exec.id,
            mode: exec.mode as Mode,
            tool: exec.tool,
            status: exec.status as HistoryEntry["status"],
            executionTimeMs: exec.executionTimeMs,
            createdAt: exec.createdAt.toISOString(),
            inputSummary: generateInputSummary(exec.inputData as Record<string, unknown>),
        }));

        // ─── Group by Mode ──────────────────────────────────
        const grouped = {
            lab: entries.filter((e) => e.mode === "lab"),
            boardroom: entries.filter((e) => e.mode === "boardroom"),
        };

        log.info("History fetched", {
            userId: auth.userId,
            total,
            page,
            returned: entries.length,
        });

        return NextResponse.json({
            data: grouped,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasMore: skip + limit < total,
            },
        });
    } catch (error) {
        console.error("HISTORY_FETCH_ERROR:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        log.error("History fetch failed", { error: errorMessage });
        return NextResponse.json(
            { error: "Internal server error", code: "INTERNAL_ERROR", details: errorMessage },
            { status: 500 }
        );
    }
}

// ─── Generate a short summary from input data ───────────
function generateInputSummary(inputData: Record<string, unknown>): string {
    if (!inputData || typeof inputData !== "object") return "Execution";
    const parts: string[] = [];

    // Extract the most meaningful fields
    const meaningfulKeys = [
        "playerName",
        "targetPlayer",
        "sbcName",
        "clubName",
        "formation",
        "matchResult",
        "managerName",
        "mainClubName",
    ];

    for (const key of meaningfulKeys) {
        if (typeof inputData[key] === "string") {
            parts.push(String(inputData[key]));
        }
    }

    if (parts.length === 0) {
        // Fallback: use first string value
        for (const value of Object.values(inputData)) {
            if (typeof value === "string" && value.length > 0 && value.length < 100) {
                parts.push(value);
                break;
            }
        }
    }

    return parts.join(" — ").substring(0, 150) || "Execution";
}
