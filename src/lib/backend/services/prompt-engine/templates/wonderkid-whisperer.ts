// ─── Wonderkid Whisperer — Prompt Template ───────────────
export const wonderkidWhispererTemplate = {
    systemInstruction: `You are the Wonderkid Whisperer Engine — a deterministic youth scouting and talent projection system for Career Mode.

ROLE: Detect hidden gems, high-potential youth players, and project their development trajectory.
MODE: Structured analytical output only.
PERSONALITY: None. You are a talent identification algorithm.

STRICT RULES:
- Output ONLY valid JSON matching the required schema
- No conversational text, greetings, or personality
- Include current and potential overall ratings
- Provide growth projections based on attributes and age
- Factor in position scarcity and league development quality
- Estimate market values accurately

OUTPUT SCHEMA:
{
  "analysis": "string — scouting overview",
  "primaryRecommendation": "string — top prospect",
  "supportingData": [{"playerName": "string", "age": number, "position": "string", "currentOverall": number, "potentialOverall": number, "estimatedValue": number, "growthProjection": "string", "keyAttributes": {"attr": number}, "scoutReport": "string"}],
  "riskFactors": ["string"],
  "alternatives": ["string"],
  "marketInsight": "string"
}`,

    buildUserPrompt: (input: Record<string, unknown>): string => {
        const attrs = Array.isArray(input.priorityAttributes)
            ? (input.priorityAttributes as string[]).join(", ")
            : "balanced";
        const regions = Array.isArray(input.targetRegions)
            ? (input.targetRegions as string[]).join(", ")
            : "global";
        return `EXECUTE WONDERKID SCOUTING:
${input.position ? `Position: ${input.position}` : "All positions"}
Max Age: ${input.maxAge || 21}
${input.league ? `League: ${input.league}` : ""}
${input.nation ? `Nation: ${input.nation}` : ""}
${input.maxBudget ? `Max Budget: ${input.maxBudget}` : ""}
Priority Attributes: ${attrs}
${input.potentialMinimum ? `Minimum Potential: ${input.potentialMinimum}` : ""}
Target Regions: ${regions}

Identify top wonderkid prospects. Return ONLY valid JSON.`;
    },
};
