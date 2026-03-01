// ─── FC xManager — Tool Input Configuration ────────────
// Per-tool field definitions for the dynamic input forms

export type FieldType = "text" | "number" | "select" | "textarea";

export interface ToolField {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    defaultValue?: string | number;
}

export interface ToolInputConfig {
    toolId: string;
    displayName: string;
    description: string;
    fields: ToolField[];
    supportsImage: boolean;
    imageLabel?: string;
    imagePlaceholder?: string;
}

// ════════════════════════════════════════════════════════
// LAB TOOLS
// ════════════════════════════════════════════════════════

const investmentWhale: ToolInputConfig = {
    toolId: "investment-whale",
    displayName: "Investment Whale",
    description: "Analyze market trends and identify the best card investment opportunities.",
    fields: [
        { name: "budget", label: "Budget (coins)", type: "number", placeholder: "500000", min: 0, max: 100_000_000, defaultValue: 500000 },
        {
            name: "platform", label: "Platform", type: "select", options: [
                { value: "ps", label: "PlayStation" },
                { value: "xbox", label: "Xbox" },
                { value: "pc", label: "PC" },
            ], defaultValue: "ps"
        },
        {
            name: "riskTolerance", label: "Risk Tolerance", type: "select", options: [
                { value: "low", label: "Low — Safe investments" },
                { value: "medium", label: "Medium — Balanced" },
                { value: "high", label: "High — Aggressive" },
            ], defaultValue: "medium"
        },
        {
            name: "timeHorizon", label: "Time Horizon", type: "select", options: [
                { value: "short", label: "Short (1-3 days)" },
                { value: "medium", label: "Medium (1-2 weeks)" },
                { value: "long", label: "Long (1+ month)" },
            ], defaultValue: "medium"
        },
        { name: "focusArea", label: "Focus Area", type: "textarea", placeholder: "e.g. Gold rare cards, TOTS investments, meta player flipping..." },
    ],
    supportsImage: true,
    imageLabel: "Market Screenshot",
    imagePlaceholder: "Upload a screenshot of the transfer market, player prices, or price graphs",
};

const transferScout: ToolInputConfig = {
    toolId: "transfer-scout",
    displayName: "Transfer Scout",
    description: "Find budget-friendly alternatives to expensive meta players.",
    fields: [
        { name: "targetPlayer", label: "Target Player", type: "text", placeholder: "e.g. Mbappé, Haaland, Vinícius Jr.", required: true },
        { name: "maxBudget", label: "Max Budget (coins)", type: "number", placeholder: "200000", min: 0, max: 100_000_000, defaultValue: 200000 },
        {
            name: "position", label: "Position", type: "select", options: [
                { value: "", label: "Any" },
                { value: "ST", label: "ST" }, { value: "CF", label: "CF" },
                { value: "LW", label: "LW" }, { value: "RW", label: "RW" },
                { value: "CAM", label: "CAM" }, { value: "CM", label: "CM" },
                { value: "CDM", label: "CDM" }, { value: "LB", label: "LB" },
                { value: "RB", label: "RB" }, { value: "CB", label: "CB" },
                { value: "GK", label: "GK" },
            ]
        },
        { name: "league", label: "League Preference", type: "text", placeholder: "e.g. Premier League, La Liga..." },
        { name: "playstyle", label: "Playstyle Preference", type: "text", placeholder: "e.g. Quick Step, Trivela, Power Shot..." },
        { name: "minOverall", label: "Min Overall", type: "number", placeholder: "80", min: 50, max: 99 },
    ],
    supportsImage: true,
    imageLabel: "Squad Screenshot",
    imagePlaceholder: "Upload a screenshot of your squad to find alternatives that fit",
};

const sbcSolutionist: ToolInputConfig = {
    toolId: "sbc-solutionist",
    displayName: "SBC Solutionist",
    description: "Find the cheapest SBC solutions using your club players.",
    fields: [
        { name: "sbcName", label: "SBC Name", type: "text", placeholder: "e.g. Marquee Matchups, Icon Pick...", required: true },
        { name: "requirements", label: "Requirements", type: "textarea", placeholder: "e.g. Min 83 rated, 2 TOTW, same league, 80+ chemistry...", required: true },
        { name: "budget", label: "Budget (coins)", type: "number", placeholder: "100000", min: 0, max: 50_000_000, defaultValue: 100000 },
        {
            name: "platform", label: "Platform", type: "select", options: [
                { value: "ps", label: "PlayStation" },
                { value: "xbox", label: "Xbox" },
                { value: "pc", label: "PC" },
            ], defaultValue: "ps"
        },
    ],
    supportsImage: true,
    imageLabel: "Club Players Screenshot",
    imagePlaceholder: "Upload a screenshot of your club players, untradeables, or the SBC requirements screen",
};

const evoPathOptimizer: ToolInputConfig = {
    toolId: "evo-path-optimizer",
    displayName: "Evo-Path Optimizer",
    description: "Map out the optimal evolution path for your player cards.",
    fields: [
        { name: "playerName", label: "Player Name", type: "text", placeholder: "e.g. Rashford, Bellingham...", required: true },
        { name: "currentOverall", label: "Current Overall", type: "number", placeholder: "85", min: 50, max: 99, required: true },
        {
            name: "targetPosition", label: "Target Position", type: "select", options: [
                { value: "", label: "Keep current" },
                { value: "ST", label: "ST" }, { value: "CF", label: "CF" },
                { value: "LW", label: "LW" }, { value: "RW", label: "RW" },
                { value: "CAM", label: "CAM" }, { value: "CM", label: "CM" },
                { value: "CDM", label: "CDM" }, { value: "LB", label: "LB" },
                { value: "RB", label: "RB" }, { value: "CB", label: "CB" },
            ]
        },
        { name: "priorityStats", label: "Priority Stats", type: "textarea", placeholder: "e.g. Pace, Shooting, Dribbling (comma-separated)" },
    ],
    supportsImage: true,
    imageLabel: "Player Card Screenshot",
    imagePlaceholder: "Upload a screenshot of the player card showing current stats and available evolutions",
};

const tacticsSimulator: ToolInputConfig = {
    toolId: "tactics-simulator",
    displayName: "Tactics Simulator",
    description: "Generate custom tactics and slider values for your squad.",
    fields: [
        {
            name: "formation", label: "Formation", type: "select", options: [
                { value: "4-2-3-1", label: "4-2-3-1" },
                { value: "4-4-2", label: "4-4-2" },
                { value: "4-3-3", label: "4-3-3" },
                { value: "4-3-2-1", label: "4-3-2-1" },
                { value: "4-1-2-1-2", label: "4-1-2-1-2 (Narrow)" },
                { value: "3-5-2", label: "3-5-2" },
                { value: "3-4-2-1", label: "3-4-2-1" },
                { value: "5-2-1-2", label: "5-2-1-2" },
                { value: "4-2-2-2", label: "4-2-2-2" },
                { value: "4-3-1-2", label: "4-3-1-2" },
            ], defaultValue: "4-2-3-1", required: true
        },
        {
            name: "playstylePreference", label: "Playstyle", type: "select", options: [
                { value: "balanced", label: "Balanced" },
                { value: "possession", label: "Possession" },
                { value: "counter", label: "Counter Attack" },
                { value: "high-press", label: "High Press" },
                { value: "park-the-bus", label: "Park the Bus" },
            ], defaultValue: "balanced"
        },
        { name: "opponentFormation", label: "Opponent Formation", type: "text", placeholder: "e.g. 4-4-2 (optional)" },
        { name: "weaknesses", label: "What problems are you facing?", type: "textarea", placeholder: "e.g. Getting exposed on counters, can't break down deep blocks, losing aerial duels..." },
    ],
    supportsImage: true,
    imageLabel: "Squad / Formation Screenshot",
    imagePlaceholder: "Upload a screenshot of your squad lineup or formation screen",
};

const postMatchReviewer: ToolInputConfig = {
    toolId: "post-match-reviewer",
    displayName: "Post-Match Reviewer",
    description: "Analyze your match performance and get tactical advice.",
    fields: [
        { name: "matchResult", label: "Match Result", type: "text", placeholder: "e.g. 2-1 Loss, 3-0 Win...", required: true },
        { name: "formation", label: "Your Formation", type: "text", placeholder: "e.g. 4-2-3-1" },
        { name: "opponentInfo", label: "Opponent Info", type: "text", placeholder: "e.g. 4-4-2 counter-attack, drop back..." },
        { name: "keyIssues", label: "Key Issues / What went wrong?", type: "textarea", placeholder: "e.g. Lost control in midfield after 60 min, couldn't create chances, kept getting caught on the break..." },
    ],
    supportsImage: true,
    imageLabel: "Match Stats Screenshot",
    imagePlaceholder: "Upload screenshots of match stats, heatmaps, player ratings, or key moments",
};

// ════════════════════════════════════════════════════════
// BOARDROOM TOOLS
// ════════════════════════════════════════════════════════

const wonderkidWhisperer: ToolInputConfig = {
    toolId: "wonderkid-whisperer",
    displayName: "Wonderkid Whisperer",
    description: "Discover hidden gems and high-growth youth prospects.",
    fields: [
        {
            name: "position", label: "Position", type: "select", options: [
                { value: "", label: "Any" },
                { value: "ST", label: "ST" }, { value: "CF", label: "CF" },
                { value: "LW", label: "LW" }, { value: "RW", label: "RW" },
                { value: "CAM", label: "CAM" }, { value: "CM", label: "CM" },
                { value: "CDM", label: "CDM" }, { value: "LB", label: "LB" },
                { value: "RB", label: "RB" }, { value: "CB", label: "CB" },
                { value: "GK", label: "GK" },
            ]
        },
        { name: "maxAge", label: "Max Age", type: "number", placeholder: "21", min: 15, max: 23, defaultValue: 21 },
        { name: "league", label: "League", type: "text", placeholder: "e.g. Premier League, Brasileirão..." },
        { name: "maxBudget", label: "Max Transfer Fee", type: "number", placeholder: "50000000", min: 0, max: 500_000_000 },
        { name: "priorityAttributes", label: "Priority Attributes", type: "textarea", placeholder: "e.g. Pace, Finishing, Ball Control (comma-separated)" },
        { name: "potentialMinimum", label: "Min Potential", type: "number", placeholder: "85", min: 70, max: 99 },
    ],
    supportsImage: false,
};

const realismEnforcer: ToolInputConfig = {
    toolId: "realism-enforcer",
    displayName: "Realism Enforcer",
    description: "Check if your career mode transfers are realistic.",
    fields: [
        { name: "clubName", label: "Your Club", type: "text", placeholder: "e.g. Newcastle United, AC Milan...", required: true },
        { name: "clubBudget", label: "Transfer Budget", type: "number", placeholder: "100000000", min: 0, max: 2_000_000_000, required: true },
        {
            name: "leagueTier", label: "League Tier", type: "select", options: [
                { value: "top", label: "Top (PL, La Liga, Serie A, etc.)" },
                { value: "mid", label: "Mid (Eredivisie, Liga Portugal, etc.)" },
                { value: "lower", label: "Lower (Championship, 2. Bundesliga, etc.)" },
            ], defaultValue: "top"
        },
        { name: "proposedTransfers", label: "Proposed Transfers", type: "textarea", placeholder: "e.g. Buy Saka 80M, Sell Isak 45M, Loan in Joao Felix...", required: true },
        { name: "season", label: "Current Season", type: "text", placeholder: "e.g. 2025/26" },
    ],
    supportsImage: false,
};

const storylineGenerator: ToolInputConfig = {
    toolId: "storyline-generator",
    displayName: "Storyline Generator",
    description: "Create dynamic narratives and press scenarios for your career.",
    fields: [
        { name: "clubName", label: "Club Name", type: "text", placeholder: "e.g. Sunderland, FC Barcelona...", required: true },
        { name: "managerName", label: "Manager Name", type: "text", placeholder: "Your manager's name", required: true },
        { name: "currentSeason", label: "Current Season", type: "text", placeholder: "e.g. 2026/27", required: true },
        {
            name: "narrativeStyle", label: "Narrative Style", type: "select", options: [
                { value: "realistic", label: "Realistic" },
                { value: "dramatic", label: "Dramatic" },
                { value: "cinematic", label: "Cinematic" },
                { value: "documentary", label: "Documentary" },
            ], defaultValue: "realistic"
        },
        {
            name: "clubMorale", label: "Club Morale", type: "select", options: [
                { value: "excellent", label: "Excellent — On a run" },
                { value: "good", label: "Good — Solid results" },
                { value: "neutral", label: "Neutral" },
                { value: "poor", label: "Poor — Struggling" },
                { value: "crisis", label: "Crisis — Job on the line" },
            ], defaultValue: "neutral"
        },
        { name: "recentResults", label: "Recent Results / Context", type: "textarea", placeholder: "e.g. Won 5 in a row, just signed a wonderkid from Brazil, 3rd in the league..." },
    ],
    supportsImage: false,
};

const financialAuditor: ToolInputConfig = {
    toolId: "financial-auditor",
    displayName: "Financial Auditor",
    description: "Track your club's finances, ROI, and wage ratios.",
    fields: [
        { name: "clubName", label: "Club Name", type: "text", placeholder: "e.g. Arsenal, Borussia Dortmund...", required: true },
        { name: "transferBudget", label: "Transfer Budget", type: "number", placeholder: "50000000", min: 0, max: 2_000_000_000, required: true },
        { name: "wageBudget", label: "Weekly Wage Budget", type: "number", placeholder: "2000000", min: 0, max: 500_000_000, required: true },
        { name: "season", label: "Current Season", type: "text", placeholder: "e.g. 2025/26" },
        { name: "recentTransfers", label: "Recent Transfers", type: "textarea", placeholder: "e.g. Bought Salah 30M (150k/w), Sold Werner 15M, Bought Musiala 90M (200k/w)..." },
    ],
    supportsImage: true,
    imageLabel: "Finance Screenshot",
    imagePlaceholder: "Upload a screenshot of your club's finance screen, wage overview, or transfer history",
};

const managerPersonaAI: ToolInputConfig = {
    toolId: "manager-persona-ai",
    displayName: "Manager Persona AI",
    description: "Develop your unique coaching identity and decision-making style.",
    fields: [
        { name: "managerName", label: "Manager Name", type: "text", placeholder: "Your manager's name", required: true },
        {
            name: "philosophy", label: "Tactical Philosophy", type: "select", options: [
                { value: "possession", label: "Possession-based (Guardiola)" },
                { value: "attacking", label: "Attacking (Klopp)" },
                { value: "defensive", label: "Defensive (Mourinho)" },
                { value: "counter-attacking", label: "Counter-attacking (Simeone)" },
                { value: "total-football", label: "Total Football (Cruyff)" },
            ], defaultValue: "possession"
        },
        {
            name: "personality", label: "Personality", type: "select", options: [
                { value: "charismatic", label: "Charismatic — Inspirational leader" },
                { value: "ruthless", label: "Ruthless — Results above all" },
                { value: "pragmatic", label: "Pragmatic — Flexible adapter" },
                { value: "visionary", label: "Visionary — Long-term builder" },
                { value: "disciplinarian", label: "Disciplinarian — Standards first" },
            ], defaultValue: "pragmatic"
        },
        { name: "clubName", label: "Current Club", type: "text", placeholder: "e.g. Manchester City" },
        { name: "currentSituation", label: "Current Situation", type: "textarea", placeholder: "e.g. Mid-season, in a title race, star player wants to leave..." },
        { name: "decisionContext", label: "Decision to Make", type: "textarea", placeholder: "e.g. Should I sell my aging striker or renew his contract? Should I play youth in the cup?" },
    ],
    supportsImage: false,
};

const sisterClubScout: ToolInputConfig = {
    toolId: "sister-club-scout",
    displayName: "Sister Club Scout",
    description: "Manage your global network of affiliate clubs for talent development.",
    fields: [
        { name: "mainClubName", label: "Main Club", type: "text", placeholder: "e.g. Chelsea, Red Bull Salzburg...", required: true },
        {
            name: "developmentPriority", label: "Development Priority", type: "select", options: [
                { value: "youth", label: "Youth Development" },
                { value: "depth", label: "Squad Depth" },
                { value: "financial", label: "Financial Partnership" },
                { value: "scouting", label: "Scouting Network" },
            ], defaultValue: "youth"
        },
        { name: "targetRegions", label: "Target Regions", type: "textarea", placeholder: "e.g. South America, West Africa, Scandinavia (comma-separated)" },
        { name: "loanPlayers", label: "Players Available for Loan", type: "textarea", placeholder: "e.g. Smith (CB, 72), Jones (ST, 68), Garcia (CM, 75)..." },
        { name: "affiliateClubs", label: "Current Affiliate Clubs", type: "textarea", placeholder: "e.g. Vitesse (Eredivisie), Lommel (Belgian Pro League)..." },
    ],
    supportsImage: false,
};

// ─── Export Registry ────────────────────────────────────

export const TOOL_INPUT_CONFIGS: Record<string, ToolInputConfig> = {
    "investment-whale": investmentWhale,
    "transfer-scout": transferScout,
    "sbc-solutionist": sbcSolutionist,
    "evo-path-optimizer": evoPathOptimizer,
    "tactics-simulator": tacticsSimulator,
    "post-match-reviewer": postMatchReviewer,
    "wonderkid-whisperer": wonderkidWhisperer,
    "realism-enforcer": realismEnforcer,
    "storyline-generator": storylineGenerator,
    "financial-auditor": financialAuditor,
    "manager-persona-ai": managerPersonaAI,
    "sister-club-scout": sisterClubScout,
};

export function getToolConfig(toolId: string): ToolInputConfig | undefined {
    return TOOL_INPUT_CONFIGS[toolId];
}
