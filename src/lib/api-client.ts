// ─── FC xManager — Frontend API Client ──────────────────
// Handles all communication with the backend API routes

export interface ExecuteToolParams {
    mode: "lab" | "boardroom";
    tool: string;
    inputData: Record<string, unknown>;
}

export interface ExecutionResponse {
    executionId: string;
    status: "pending" | "processing" | "success" | "failed";
    result: Record<string, unknown> | null;
    executionTimeMs: number | null;
    error: string | null;
}

export interface ApiError {
    error: string;
    code: string;
    details?: Record<string, unknown>;
}

/**
 * Execute a tool via the backend API.
 */
export async function executeTool(params: ExecuteToolParams): Promise<ExecutionResponse> {
    const res = await fetch("/api/execute-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const error: ApiError = await res.json().catch(() => ({
            error: "Request failed",
            code: "NETWORK_ERROR",
        }));
        throw new ToolExecutionError(error.error, error.code, res.status);
    }

    return res.json();
}

/**
 * Poll execution status for async jobs.
 */
export async function pollExecutionStatus(executionId: string): Promise<ExecutionResponse> {
    const res = await fetch(`/api/execution-status/${executionId}`);
    if (!res.ok) {
        throw new ToolExecutionError("Failed to fetch status", "POLL_ERROR", res.status);
    }
    return res.json();
}

/**
 * Poll with retry until completion.
 */
export async function waitForCompletion(
    executionId: string,
    onProgress?: (status: string) => void,
    maxAttempts = 30,
    intervalMs = 2000
): Promise<ExecutionResponse> {
    for (let i = 0; i < maxAttempts; i++) {
        const result = await pollExecutionStatus(executionId);

        if (result.status === "success" || result.status === "failed") {
            return result;
        }

        onProgress?.(result.status);
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    throw new ToolExecutionError("Execution timed out", "TIMEOUT", 408);
}

/**
 * Custom error class for tool execution failures.
 */
export class ToolExecutionError extends Error {
    code: string;
    statusCode: number;

    constructor(message: string, code: string, statusCode: number) {
        super(message);
        this.name = "ToolExecutionError";
        this.code = code;
        this.statusCode = statusCode;
    }
}

/**
 * Map tool IDs to default input structures.
 * When a sidebar feature is clicked, we need a base input shape.
 * The user's text prompt gets injected into the most relevant field.
 */
export function buildToolInput(toolId: string, userText: string): Record<string, unknown> {
    switch (toolId) {
        case "investment-whale":
            return { budget: 500000, platform: "ps", riskTolerance: "medium", timeHorizon: "medium", focusArea: userText };
        case "transfer-scout":
            return { targetPlayer: userText, maxBudget: 200000, position: "", league: "" };
        case "sbc-solutionist":
            return { sbcName: userText, requirements: userText, budget: 100000, platform: "ps" };
        case "evo-path-optimizer":
            return { playerName: userText, currentOverall: 85 };
        case "tactics-simulator":
            return { formation: "4-2-3-1", playstylePreference: "balanced", weaknesses: userText };
        case "post-match-reviewer":
            return { matchResult: "2-1", keyIssues: userText };
        case "wonderkid-whisperer":
            return { maxAge: 21, priorityAttributes: [], maxBudget: 50_000_000 };
        case "realism-enforcer":
            return { clubName: userText, clubBudget: 100_000_000, proposedTransfers: [], leagueTier: "top" };
        case "storyline-generator":
            return { clubName: userText, managerName: "Manager", currentSeason: "2025/26", narrativeStyle: "realistic" };
        case "financial-auditor":
            return { clubName: userText, transferBudget: 50_000_000, wageBudget: 20_000_000 };
        case "manager-persona-ai":
            return { managerName: userText, philosophy: "possession", personality: "pragmatic" };
        case "sister-club-scout":
            return { mainClubName: userText, developmentPriority: "youth" };
        default:
            return { query: userText };
    }
}
