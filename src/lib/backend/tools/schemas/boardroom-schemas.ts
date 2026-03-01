// ─── FC xManager — Boardroom Tool Schemas ───────────────
// Zod schemas for all 6 Boardroom mode tools (Zod 4 compatible)

import { z } from "zod";

// ════════════════════════════════════════════════════════
// 1. WONDERKID WHISPERER
// ════════════════════════════════════════════════════════
export const WonderkidWhispererInputSchema = z.object({
    position: z.string().max(20).optional(),
    maxAge: z.number().min(15).max(23).default(21),
    league: z.string().max(100).optional(),
    nation: z.string().max(100).optional(),
    maxBudget: z.number().min(0).max(500_000_000).optional(),
    priorityAttributes: z.array(z.string()).max(6).optional(),
    potentialMinimum: z.number().min(70).max(99).optional(),
});

export const WonderkidWhispererOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            playerName: z.string(),
            age: z.number(),
            position: z.string(),
            currentOverall: z.number(),
            potentialOverall: z.number(),
            estimatedValue: z.number(),
            growthProjection: z.string(),
            keyAttributes: z.record(z.string(), z.number()),
            scoutReport: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    marketInsight: z.string(),
});

// ════════════════════════════════════════════════════════
// 2. REALISM ENFORCER
// ════════════════════════════════════════════════════════
export const RealismEnforcerInputSchema = z.object({
    clubName: z.string().min(1).max(100),
    clubBudget: z.number().min(0).max(2_000_000_000),
    currentSquad: z.array(z.string()).max(30).optional(),
    proposedTransfers: z
        .array(
            z.object({
                playerName: z.string(),
                type: z.enum(["buy", "sell", "loan-in", "loan-out"]),
                fee: z.number().optional(),
            })
        )
        .max(20),
    leagueTier: z.enum(["top", "mid", "lower"]).default("top"),
    season: z.string().max(20).optional(),
});

export const RealismEnforcerOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            transfer: z.string(),
            realismScore: z.number().min(0).max(100),
            verdict: z.enum(["realistic", "possible", "unlikely", "impossible"]),
            reasoning: z.string(),
            adjustedFee: z.number().optional(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    overallRealismScore: z.number().min(0).max(100),
    budgetImpact: z.object({
        totalSpend: z.number(),
        totalIncome: z.number(),
        netSpend: z.number(),
        remainingBudget: z.number(),
    }),
});

// ════════════════════════════════════════════════════════
// 3. STORYLINE GENERATOR
// ════════════════════════════════════════════════════════
export const StorylineGeneratorInputSchema = z.object({
    clubName: z.string().min(1).max(100),
    managerName: z.string().min(1).max(100),
    currentSeason: z.string().max(20),
    recentResults: z.string().max(500).optional(),
    clubMorale: z.enum(["excellent", "good", "neutral", "poor", "crisis"]).default("neutral"),
    narrativeStyle: z
        .enum(["dramatic", "realistic", "cinematic", "documentary"])
        .default("realistic"),
    keyEvents: z.array(z.string()).max(10).optional(),
});

export const StorylineGeneratorOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            type: z.enum(["press-conference", "storyline", "event", "rumor"]),
            headline: z.string(),
            content: z.string(),
            impact: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    seasonArc: z.object({
        currentPhase: z.string(),
        nextMilestone: z.string(),
        overarchingNarrative: z.string(),
    }),
    pressConference: z.object({
        question: z.string(),
        suggestedResponses: z.array(
            z.object({
                tone: z.string(),
                response: z.string(),
                moraleEffect: z.string(),
            })
        ),
    }),
});

// ════════════════════════════════════════════════════════
// 4. FINANCIAL AUDITOR
// ════════════════════════════════════════════════════════
export const FinancialAuditorInputSchema = z.object({
    clubName: z.string().min(1).max(100),
    transferBudget: z.number().min(0).max(2_000_000_000),
    wageBudget: z.number().min(0).max(500_000_000),
    revenueStreams: z.record(z.string(), z.number()).optional(),
    recentTransfers: z
        .array(
            z.object({
                playerName: z.string(),
                type: z.enum(["buy", "sell"]),
                fee: z.number(),
                wages: z.number().optional(),
            })
        )
        .max(30)
        .optional(),
    season: z.string().max(20).optional(),
});

export const FinancialAuditorOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            metric: z.string(),
            value: z.number(),
            trend: z.enum(["up", "down", "stable"]),
            benchmark: z.string(),
            healthStatus: z.enum(["healthy", "warning", "critical"]),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    financialHealth: z.object({
        overallScore: z.number().min(0).max(100),
        wageToTurnoverRatio: z.number(),
        transferROI: z.number(),
        projectedBalance: z.number(),
        sustainability: z.enum(["sustainable", "at-risk", "unsustainable"]),
    }),
    projections: z.array(
        z.object({
            period: z.string(),
            revenue: z.number(),
            expenses: z.number(),
            netPosition: z.number(),
        })
    ),
});

// ════════════════════════════════════════════════════════
// 5. MANAGER PERSONA AI
// ════════════════════════════════════════════════════════
export const ManagerPersonaInputSchema = z.object({
    managerName: z.string().min(1).max(100),
    philosophy: z
        .enum(["attacking", "defensive", "possession", "counter-attacking", "total-football"])
        .default("possession"),
    personality: z
        .enum(["ruthless", "charismatic", "pragmatic", "visionary", "disciplinarian"])
        .default("pragmatic"),
    clubName: z.string().max(100).optional(),
    currentSituation: z.string().max(500).optional(),
    decisionContext: z.string().max(500).optional(),
});

export const ManagerPersonaOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            aspect: z.string(),
            guidance: z.string(),
            historicalParallel: z.string(),
            confidenceLevel: z.number().min(0).max(100),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    personaProfile: z.object({
        archetype: z.string(),
        strengths: z.array(z.string()),
        weaknesses: z.array(z.string()),
        negotiationStyle: z.string(),
        moraleImpact: z.string(),
    }),
    decisionMatrix: z.array(
        z.object({
            option: z.string(),
            alignmentScore: z.number().min(0).max(100),
            reasoning: z.string(),
        })
    ),
});

// ════════════════════════════════════════════════════════
// 6. SISTER CLUB SCOUT
// ════════════════════════════════════════════════════════
export const SisterClubScoutInputSchema = z.object({
    mainClubName: z.string().min(1).max(100),
    affiliateClubs: z
        .array(
            z.object({
                name: z.string(),
                league: z.string(),
                tier: z.enum(["top", "mid", "lower"]),
            })
        )
        .max(10)
        .optional(),
    loanPlayers: z.array(z.string()).max(20).optional(),
    developmentPriority: z
        .enum(["youth", "depth", "financial", "scouting"])
        .default("youth"),
    targetRegions: z.array(z.string()).max(10).optional(),
});

export const SisterClubScoutOutputSchema = z.object({
    analysis: z.string(),
    primaryRecommendation: z.string(),
    supportingData: z.array(
        z.object({
            clubName: z.string(),
            region: z.string(),
            partnershipValue: z.number().min(0).max(100),
            loanOpportunities: z.number(),
            scoutingAdvantage: z.string(),
            recommendedAction: z.string(),
        })
    ),
    riskFactors: z.array(z.string()),
    alternatives: z.array(z.string()),
    networkOverview: z.object({
        totalAffiliates: z.number(),
        activeLoans: z.number(),
        developmentPipeline: z.array(
            z.object({
                playerName: z.string(),
                loanClub: z.string(),
                progress: z.string(),
                readiness: z.enum(["ready", "developing", "not-ready"]),
            })
        ),
    }),
    expansionTargets: z.array(
        z.object({
            region: z.string(),
            suggestedClub: z.string(),
            rationale: z.string(),
        })
    ),
});
