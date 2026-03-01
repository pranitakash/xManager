// ─── FC xManager — Tool Registry ────────────────────────
// Central registry mapping tool names to configs, schemas, and permissions

import { z } from "zod";
import type { ToolConfig, ToolName, Mode, SubscriptionTier } from "../types";
import { ALL_TOOLS } from "../types";

// ─── Lab Schemas ────────────────────────────────────────
import {
    InvestmentWhaleInputSchema,
    InvestmentWhaleOutputSchema,
    TransferScoutInputSchema,
    TransferScoutOutputSchema,
    SBCSolutionistInputSchema,
    SBCSolutionistOutputSchema,
    EvoPathOptimizerInputSchema,
    EvoPathOptimizerOutputSchema,
    TacticsSimulatorInputSchema,
    TacticsSimulatorOutputSchema,
    PostMatchReviewerInputSchema,
    PostMatchReviewerOutputSchema,
} from "./schemas/lab-schemas";

// ─── Boardroom Schemas ──────────────────────────────────
import {
    WonderkidWhispererInputSchema,
    WonderkidWhispererOutputSchema,
    RealismEnforcerInputSchema,
    RealismEnforcerOutputSchema,
    StorylineGeneratorInputSchema,
    StorylineGeneratorOutputSchema,
    FinancialAuditorInputSchema,
    FinancialAuditorOutputSchema,
    ManagerPersonaInputSchema,
    ManagerPersonaOutputSchema,
    SisterClubScoutInputSchema,
    SisterClubScoutOutputSchema,
} from "./schemas/boardroom-schemas";

// ─── Tool Configuration Registry ────────────────────────
const TOOL_REGISTRY: Record<ToolName, ToolConfig> = {
    // ── Lab Tools ─────────────────────────────────────────
    "investment-whale": {
        name: "investment-whale",
        displayName: "Investment Whale",
        mode: "lab",
        description: "Market trend analysis and card investment recommendations",
        inputSchema: InvestmentWhaleInputSchema,
        outputSchema: InvestmentWhaleOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 10_000,
        isLongRunning: false,
    },
    "transfer-scout": {
        name: "transfer-scout",
        displayName: "Transfer Scout",
        mode: "lab",
        description: "Find budget-friendly player alternatives",
        inputSchema: TransferScoutInputSchema,
        outputSchema: TransferScoutOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 10_000,
        isLongRunning: false,
    },
    "sbc-solutionist": {
        name: "sbc-solutionist",
        displayName: "SBC Solutionist",
        mode: "lab",
        description: "Optimal SBC solutions with cost minimization",
        inputSchema: SBCSolutionistInputSchema,
        outputSchema: SBCSolutionistOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 20_000,
        isLongRunning: false,
    },
    "evo-path-optimizer": {
        name: "evo-path-optimizer",
        displayName: "Evo-Path Optimizer",
        mode: "lab",
        description: "Evolution path planning and stat maximization",
        inputSchema: EvoPathOptimizerInputSchema,
        outputSchema: EvoPathOptimizerOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 10_000,
        isLongRunning: false,
    },
    "tactics-simulator": {
        name: "tactics-simulator",
        displayName: "Tactics Simulator",
        mode: "lab",
        description: "Custom tactical configurations and slider optimization",
        inputSchema: TacticsSimulatorInputSchema,
        outputSchema: TacticsSimulatorOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 15_000,
        isLongRunning: false,
    },
    "post-match-reviewer": {
        name: "post-match-reviewer",
        displayName: "Post-Match Reviewer",
        mode: "lab",
        description: "Match analysis with optional screenshot review",
        inputSchema: PostMatchReviewerInputSchema,
        outputSchema: PostMatchReviewerOutputSchema,
        requiredTier: "pro",
        isMultimodal: true,
        maxInputSizeBytes: 5_500_000, // 5MB image + text
        isLongRunning: true,
    },

    // ── Boardroom Tools ───────────────────────────────────
    "wonderkid-whisperer": {
        name: "wonderkid-whisperer",
        displayName: "Wonderkid Whisperer",
        mode: "boardroom",
        description: "Youth talent scouting and development projection",
        inputSchema: WonderkidWhispererInputSchema,
        outputSchema: WonderkidWhispererOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 10_000,
        isLongRunning: false,
    },
    "realism-enforcer": {
        name: "realism-enforcer",
        displayName: "Realism Enforcer",
        mode: "boardroom",
        description: "Transfer plausibility analysis and budget impact",
        inputSchema: RealismEnforcerInputSchema,
        outputSchema: RealismEnforcerOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 20_000,
        isLongRunning: false,
    },
    "storyline-generator": {
        name: "storyline-generator",
        displayName: "Storyline Generator",
        mode: "boardroom",
        description: "Dynamic narrative arcs and press event generation",
        inputSchema: StorylineGeneratorInputSchema,
        outputSchema: StorylineGeneratorOutputSchema,
        requiredTier: "pro",
        isMultimodal: false,
        maxInputSizeBytes: 15_000,
        isLongRunning: true,
    },
    "financial-auditor": {
        name: "financial-auditor",
        displayName: "Financial Auditor",
        mode: "boardroom",
        description: "Club financial health analysis and projections",
        inputSchema: FinancialAuditorInputSchema,
        outputSchema: FinancialAuditorOutputSchema,
        requiredTier: "free",
        isMultimodal: false,
        maxInputSizeBytes: 20_000,
        isLongRunning: false,
    },
    "manager-persona-ai": {
        name: "manager-persona-ai",
        displayName: "Manager Persona AI",
        mode: "boardroom",
        description: "Coaching identity development and decision guidance",
        inputSchema: ManagerPersonaInputSchema,
        outputSchema: ManagerPersonaOutputSchema,
        requiredTier: "pro",
        isMultimodal: false,
        maxInputSizeBytes: 10_000,
        isLongRunning: false,
    },
    "sister-club-scout": {
        name: "sister-club-scout",
        displayName: "Sister Club Scout",
        mode: "boardroom",
        description: "Affiliate network management and loan optimization",
        inputSchema: SisterClubScoutInputSchema,
        outputSchema: SisterClubScoutOutputSchema,
        requiredTier: "pro",
        isMultimodal: false,
        maxInputSizeBytes: 15_000,
        isLongRunning: false,
    },
};

// ─── Registry API ───────────────────────────────────────

/**
 * Get a tool's configuration by name.
 */
export function getToolConfig(toolName: string): ToolConfig | null {
    if (!isRegisteredTool(toolName)) return null;
    return TOOL_REGISTRY[toolName as ToolName];
}

/**
 * Check if a tool name is registered.
 */
export function isRegisteredTool(toolName: string): toolName is ToolName {
    return ALL_TOOLS.includes(toolName as ToolName);
}

/**
 * Get all tools for a specific mode.
 */
export function getToolsByMode(mode: Mode): ToolConfig[] {
    return Object.values(TOOL_REGISTRY).filter((tool) => tool.mode === mode);
}

/**
 * Check if a user's subscription tier allows access to a tool.
 */
export function hasToolAccess(toolName: ToolName, userTier: SubscriptionTier): boolean {
    const tool = TOOL_REGISTRY[toolName];
    const tierHierarchy: Record<SubscriptionTier, number> = {
        free: 0,
        pro: 1,
        elite: 2,
    };
    return tierHierarchy[userTier] >= tierHierarchy[tool.requiredTier];
}

/**
 * Validate input data against a tool's schema.
 */
export function validateToolInput(
    toolName: ToolName,
    inputData: unknown
): { valid: true; data: Record<string, unknown> } | { valid: false; errors: string[] } {
    const tool = TOOL_REGISTRY[toolName];
    const result = tool.inputSchema.safeParse(inputData);

    if (result.success) {
        return { valid: true, data: result.data as Record<string, unknown> };
    }

    return {
        valid: false,
        errors: result.error.issues.map(
            (e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`
        ),
    };
}

/**
 * Get all registered tool names.
 */
export function getAllToolNames(): ToolName[] {
    return [...ALL_TOOLS];
}
