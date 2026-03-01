// ─── FC xManager — Lab Tool Schemas ─────────────────────
// Zod schemas for all 6 Lab mode tools (Zod 4 compatible)

import { z } from "zod";

// ════════════════════════════════════════════════════════
// 1. INVESTMENT WHALE
// ════════════════════════════════════════════════════════
export const InvestmentWhaleInputSchema = z.object({
    budget: z.number().min(0).max(100_000_000),
    platform: z.enum(["ps", "xbox", "pc"]).default("ps"),
    riskTolerance: z.enum(["low", "medium", "high"]).default("medium"),
    timeHorizon: z.enum(["short", "medium", "long"]).default("medium"),
    focusArea: z.string().max(200).optional(),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const InvestmentWhaleOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            cardName: z.string(),
            currentPrice: z.number(),
            predictedPrice: z.number(),
            confidence: z.number().min(0).max(100),
            reasoning: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    marketTrend: z.string(),
    estimatedROI: z.string(),
});

// ════════════════════════════════════════════════════════
// 2. TRANSFER SCOUT
// ════════════════════════════════════════════════════════
export const TransferScoutInputSchema = z.object({
    targetPlayer: z.string().min(1).max(100),
    maxBudget: z.number().min(0).max(100_000_000),
    position: z.string().max(20).optional(),
    league: z.string().max(100).optional(),
    playstyle: z.string().max(200).optional(),
    minOverall: z.number().min(50).max(99).optional(),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const TransferScoutOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            playerName: z.string(),
            overall: z.number(),
            position: z.string(),
            price: z.number(),
            similarityScore: z.number().min(0).max(100),
            keyStats: z.record(z.string(), z.number()),
            playstyleTags: z.array(z.string()),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
});

// ════════════════════════════════════════════════════════
// 3. SBC SOLUTIONIST
// ════════════════════════════════════════════════════════
export const SBCSolutionistInputSchema = z.object({
    sbcName: z.string().min(1).max(200),
    requirements: z.string().max(1000),
    budget: z.number().min(0).max(50_000_000),
    ownedPlayers: z.array(z.string()).max(50).optional(),
    platform: z.enum(["ps", "xbox", "pc"]).default("ps"),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const SBCSolutionistOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            position: z.string(),
            playerName: z.string(),
            rating: z.number(),
            estimatedCost: z.number(),
            isOwned: z.boolean(),
            league: z.string(),
            nation: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    totalEstimatedCost: z.number(),
    chemistryRating: z.number(),
});

// ════════════════════════════════════════════════════════
// 4. EVO-PATH OPTIMIZER
// ════════════════════════════════════════════════════════
export const EvoPathOptimizerInputSchema = z.object({
    playerName: z.string().min(1).max(100),
    currentOverall: z.number().min(50).max(99),
    targetPosition: z.string().max(20).optional(),
    priorityStats: z.array(z.string()).max(6).optional(),
    availableEvolutions: z.array(z.string()).max(20).optional(),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const EvoPathOptimizerOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            evolutionName: z.string(),
            order: z.number(),
            statBoosts: z.record(z.string(), z.number()),
            requirement: z.string(),
            estimatedTime: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    finalProjectedStats: z.record(z.string(), z.number()),
    totalEvolutionTime: z.string(),
});

// ════════════════════════════════════════════════════════
// 5. TACTICS SIMULATOR
// ════════════════════════════════════════════════════════
export const TacticsSimulatorInputSchema = z.object({
    formation: z.string().min(1).max(20),
    squad: z.array(z.string()).max(11).optional(),
    playstylePreference: z.enum(["possession", "counter", "balanced", "high-press", "park-the-bus"]).default("balanced"),
    opponentFormation: z.string().max(20).optional(),
    weaknesses: z.string().max(500).optional(),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const TacticsSimulatorOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            category: z.string(),
            setting: z.string(),
            value: z.union([z.string(), z.number()]),
            explanation: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    sliderValues: z.object({
        defensiveWidth: z.number(),
        defensiveDepth: z.number(),
        offensiveWidth: z.number(),
        playersInBox: z.number(),
        corners: z.number(),
        freeKicks: z.number(),
    }),
    playerInstructions: z.array(
        z.object({
            position: z.string(),
            instructions: z.array(z.string()),
        })
    ),
});

// ════════════════════════════════════════════════════════
// 6. POST-MATCH REVIEWER (Multimodal)
// ════════════════════════════════════════════════════════
export const PostMatchReviewerInputSchema = z.object({
    matchResult: z.string().max(20),
    formation: z.string().max(20).optional(),
    keyIssues: z.string().max(500).optional(),
    opponentInfo: z.string().max(200).optional(),
    image: z
        .object({
            base64: z.string().min(1),
            mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        })
        .optional(),
});

export const PostMatchReviewerOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            phase: z.string(),
            observation: z.string(),
            impact: z.enum(["critical", "high", "medium", "low"]),
            suggestion: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    tacticalAdjustments: z.array(z.string()),
    playerPerformanceNotes: z.array(
        z.object({
            position: z.string(),
            rating: z.number().min(1).max(10),
            note: z.string(),
        })
    ),
});
