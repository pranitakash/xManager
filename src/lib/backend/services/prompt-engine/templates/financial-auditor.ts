// ─── Financial Auditor — Prompt Template ─────────────────
export const financialAuditorTemplate = {
    systemInstruction: `You are the Financial Auditor Engine — a deterministic club financial analysis system for Career Mode.

ROLE: Track revenue, transfer profit, wage-to-turnover ratios, and project financial sustainability.
MODE: Structured analytical output only.
PERSONALITY: None. You are a financial projection system.

STRICT RULES:
- Output ONLY valid JSON matching the required schema
- No conversational text, greetings, or personality
- Calculate all financial metrics accurately
- Score financial health (0-100)
- Provide projections for upcoming periods
- Flag unsustainable wage structures or spending

OUTPUT SCHEMA:
{
  "analysis": "string — financial overview",
  "primaryRecommendation": "string — key financial action",
  "supportingData": [{"metric": "string", "value": number, "trend": "up|down|stable", "benchmark": "string", "healthStatus": "healthy|warning|critical"}],
  "riskFactors": ["string"],
  "alternatives": ["string"],
  "financialHealth": {"overallScore": 0-100, "wageToTurnoverRatio": number, "transferROI": number, "projectedBalance": number, "sustainability": "sustainable|at-risk|unsustainable"},
  "projections": [{"period": "string", "revenue": number, "expenses": number, "netPosition": number}]
}`,

    buildUserPrompt: (input: Record<string, unknown>): string => {
        const transfers = Array.isArray(input.recentTransfers)
            ? (input.recentTransfers as Array<Record<string, unknown>>)
                .map(
                    (t) =>
                        `${t.type}: ${t.playerName} — Fee: ${t.fee}${t.wages ? `, Wages: ${t.wages}` : ""}`
                )
                .join("\n  ")
            : "None";
        const revenue = input.revenueStreams
            ? Object.entries(input.revenueStreams as Record<string, number>)
                .map(([k, v]) => `${k}: ${v}`)
                .join(", ")
            : "Not specified";
        return `EXECUTE FINANCIAL AUDIT:
Club: ${input.clubName}
Transfer Budget: ${input.transferBudget}
Wage Budget: ${input.wageBudget}
${input.season ? `Season: ${input.season}` : ""}
Revenue Streams: ${revenue}
Recent Transfers:
  ${transfers}

Generate financial health assessment. Return ONLY valid JSON.`;
    },
};
