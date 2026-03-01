// ─── FC xManager — Shared Backend Types ─────────────────
// Strict type definitions for the structured execution engine

import { z } from "zod";

// ─── Modes ──────────────────────────────────────────────
export const MODES = ["lab", "boardroom"] as const;
export type Mode = (typeof MODES)[number];

// ─── Tool Names ─────────────────────────────────────────
export const LAB_TOOLS = [
    "investment-whale",
    "transfer-scout",
    "sbc-solutionist",
    "evo-path-optimizer",
    "tactics-simulator",
    "post-match-reviewer",
] as const;

export const BOARDROOM_TOOLS = [
    "wonderkid-whisperer",
    "realism-enforcer",
    "storyline-generator",
    "financial-auditor",
    "manager-persona-ai",
    "sister-club-scout",
] as const;

export const ALL_TOOLS = [...LAB_TOOLS, ...BOARDROOM_TOOLS] as const;
export type ToolName = (typeof ALL_TOOLS)[number];
export type LabToolName = (typeof LAB_TOOLS)[number];
export type BoardroomToolName = (typeof BOARDROOM_TOOLS)[number];

// ─── Execution Status ───────────────────────────────────
export const EXECUTION_STATUSES = [
    "pending",
    "processing",
    "success",
    "failed",
] as const;
export type ExecutionStatus = (typeof EXECUTION_STATUSES)[number];

// ─── Subscription Tiers ─────────────────────────────────
export const SUBSCRIPTION_TIERS = ["free", "pro", "elite"] as const;
export type SubscriptionTier = (typeof SUBSCRIPTION_TIERS)[number];

// ─── Request Schema ─────────────────────────────────────
export const ExecuteToolRequestSchema = z.object({
    mode: z.enum(MODES),
    tool: z.string().min(1).max(50),
    inputData: z.record(z.string(), z.unknown()),
});

export type ExecuteToolRequest = z.infer<typeof ExecuteToolRequestSchema>;

// ─── Execution Response ─────────────────────────────────
export interface ExecutionResponse {
    executionId: string;
    status: ExecutionStatus;
    result: ToolOutput | null;
    executionTimeMs: number | null;
    error: string | null;
}

// ─── Generic Tool Output ────────────────────────────────
export interface ToolOutput {
    analysis: string;
    primaryRecommendation: string;
    supportingData: Record<string, unknown>[];
    riskFactors: string[];
    alternatives: string[];
    [key: string]: unknown;
}

// ─── Auth Context ───────────────────────────────────────
export interface AuthContext {
    userId: string;
    email: string;
    subscriptionTier: SubscriptionTier;
}

// ─── Tool Config ────────────────────────────────────────
export interface ToolConfig {
    name: ToolName;
    displayName: string;
    mode: Mode;
    description: string;
    inputSchema: z.ZodSchema;
    outputSchema: z.ZodSchema;
    requiredTier: SubscriptionTier;
    isMultimodal: boolean;
    maxInputSizeBytes: number;
    isLongRunning: boolean;
}

// ─── History Response ───────────────────────────────────
export interface HistoryEntry {
    id: string;
    mode: Mode;
    tool: string;
    status: ExecutionStatus;
    executionTimeMs: number | null;
    createdAt: string;
    inputSummary: string;
}

export interface HistoryDetailResponse {
    id: string;
    mode: Mode;
    tool: string;
    status: ExecutionStatus;
    inputData: Record<string, unknown>;
    outputData: ToolOutput | null;
    executionTimeMs: number | null;
    errorMessage: string | null;
    createdAt: string;
}

// ─── API Error ──────────────────────────────────────────
export interface ApiError {
    error: string;
    code: string;
    details?: Record<string, unknown>;
}

// ─── Rate Limit Info ────────────────────────────────────
export interface RateLimitInfo {
    remaining: number;
    limit: number;
    resetAt: string;
}
