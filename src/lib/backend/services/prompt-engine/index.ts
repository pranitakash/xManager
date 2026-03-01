// ─── FC xManager — Prompt Engine ────────────────────────
// Central prompt builder that routes to tool-specific templates

import type { ToolName } from "../../types";

// ─── Template Imports ───────────────────────────────────
import { investmentWhaleTemplate } from "./templates/investment-whale";
import { transferScoutTemplate } from "./templates/transfer-scout";
import { sbcSolutionistTemplate } from "./templates/sbc-solutionist";
import { evoPathOptimizerTemplate } from "./templates/evo-path-optimizer";
import { tacticsSimulatorTemplate } from "./templates/tactics-simulator";
import { postMatchReviewerTemplate } from "./templates/post-match-reviewer";
import { wonderkidWhispererTemplate } from "./templates/wonderkid-whisperer";
import { realismEnforcerTemplate } from "./templates/realism-enforcer";
import { storylineGeneratorTemplate } from "./templates/storyline-generator";
import { financialAuditorTemplate } from "./templates/financial-auditor";
import { managerPersonaTemplate } from "./templates/manager-persona-ai";
import { sisterClubScoutTemplate } from "./templates/sister-club-scout";

// ─── Template Interface ─────────────────────────────────
interface PromptTemplate {
    systemInstruction: string;
    buildUserPrompt: (input: Record<string, unknown>) => string;
}

// ─── Template Map ───────────────────────────────────────
const TEMPLATE_MAP: Record<ToolName, PromptTemplate> = {
    "investment-whale": investmentWhaleTemplate,
    "transfer-scout": transferScoutTemplate,
    "sbc-solutionist": sbcSolutionistTemplate,
    "evo-path-optimizer": evoPathOptimizerTemplate,
    "tactics-simulator": tacticsSimulatorTemplate,
    "post-match-reviewer": postMatchReviewerTemplate,
    "wonderkid-whisperer": wonderkidWhispererTemplate,
    "realism-enforcer": realismEnforcerTemplate,
    "storyline-generator": storylineGeneratorTemplate,
    "financial-auditor": financialAuditorTemplate,
    "manager-persona-ai": managerPersonaTemplate,
    "sister-club-scout": sisterClubScoutTemplate,
};

// ─── Build Prompt ───────────────────────────────────────
export interface BuiltPrompt {
    systemInstruction: string;
    userPrompt: string;
}

/**
 * Build a complete prompt for a tool execution.
 * Injects user input into the tool's prompt template.
 */
export function buildPrompt(
    tool: ToolName,
    inputData: Record<string, unknown>
): BuiltPrompt {
    const template = TEMPLATE_MAP[tool];
    if (!template) {
        throw new Error(`No prompt template found for tool: ${tool}`);
    }

    return {
        systemInstruction: template.systemInstruction,
        userPrompt: template.buildUserPrompt(inputData),
    };
}

/**
 * Get the system instruction for a tool (useful for queue workers).
 */
export function getSystemInstruction(tool: ToolName): string {
    const template = TEMPLATE_MAP[tool];
    if (!template) {
        throw new Error(`No prompt template found for tool: ${tool}`);
    }
    return template.systemInstruction;
}

/**
 * Check if a tool has a registered prompt template.
 */
export function hasTemplate(tool: string): boolean {
    return tool in TEMPLATE_MAP;
}
