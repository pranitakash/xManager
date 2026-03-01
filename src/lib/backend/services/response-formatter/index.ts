// ─── FC xManager — Response Formatter & Validator ───────
// Validates AI output, strips unsafe content, normalizes structure

import { z } from "zod";
import { createLogger } from "../logger";

const log = createLogger("response-formatter");

// ─── Base Output Schema ─────────────────────────────────
const BaseToolOutputSchema = z.object({
    analysis: z.string().min(1),
    primaryRecommendation: z.string().min(1),
    supportingData: z.array(z.record(z.string(), z.unknown())).default([]),
    riskFactors: z.array(z.string()).default([]),
    alternatives: z.array(z.string()).default([]),
});

// ─── Sanitization ───────────────────────────────────────
const DANGEROUS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /on\w+\s*=/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
];

function sanitizeString(input: string): string {
    let sanitized = input;
    for (const pattern of DANGEROUS_PATTERNS) {
        sanitized = sanitized.replace(pattern, "");
    }
    return sanitized.trim();
}

function sanitizeValue(value: unknown): unknown {
    if (typeof value === "string") {
        return sanitizeString(value);
    }
    if (Array.isArray(value)) {
        return value.map(sanitizeValue);
    }
    if (value && typeof value === "object") {
        return sanitizeObject(value as Record<string, unknown>);
    }
    return value;
}

function sanitizeObject(obj: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        sanitized[sanitizeString(key)] = sanitizeValue(value);
    }
    return sanitized;
}

// ─── Validate & Format ──────────────────────────────────
export function validateAndFormat(
    rawData: Record<string, unknown>,
    toolSchema?: z.ZodSchema
): {
    success: true;
    data: Record<string, unknown>;
} | {
    success: false;
    error: string;
} {
    try {
        // Step 1: Sanitize all content
        const sanitized = sanitizeObject(rawData);

        // Step 2: Validate against tool-specific schema if provided
        if (toolSchema) {
            const toolResult = toolSchema.safeParse(sanitized);
            if (toolResult.success) {
                log.debug("Tool-specific schema validation passed");
                return { success: true, data: toolResult.data as Record<string, unknown> };
            }
            log.warn("Tool-specific schema validation failed, trying base schema", {
                errors: toolResult.error.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`),
            });
        }

        // Step 3: Validate against base schema
        const baseResult = BaseToolOutputSchema.safeParse(sanitized);
        if (baseResult.success) {
            // Merge extra fields from sanitized data that aren't in the base schema
            const normalized: Record<string, unknown> = { ...baseResult.data };
            for (const [key, value] of Object.entries(sanitized)) {
                if (!(key in normalized)) {
                    normalized[key] = value;
                }
            }
            log.debug("Base schema validation passed");
            return { success: true, data: normalized };
        }

        // Step 4: If both fail, return the sanitized data with a warning
        // The AI might return a different structure that's still useful
        log.warn("Schema validation failed, returning sanitized data", {
            baseErrors: baseResult.error.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`),
        });

        // Ensure minimum required fields exist
        const fallback: Record<string, unknown> = {
            analysis: sanitized["analysis"] || sanitized["summary"] || "Analysis unavailable",
            primaryRecommendation:
                sanitized["primaryRecommendation"] ||
                sanitized["recommendation"] ||
                "No recommendation available",
            supportingData: sanitized["supportingData"] || sanitized["data"] || [],
            riskFactors: sanitized["riskFactors"] || sanitized["risks"] || [],
            alternatives: sanitized["alternatives"] || [],
            ...sanitized,
        };

        return { success: true, data: fallback };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown validation error";
        log.error("Response formatting failed", { error: errorMessage });
        return { success: false, error: errorMessage };
    }
}

/**
 * Detect and block prompt injection attempts in user input.
 */
export function detectPromptInjection(input: string): boolean {
    const injectionPatterns = [
        /ignore\s+(previous|above|all)\s+(instructions?|prompts?)/i,
        /you\s+are\s+now\s+/i,
        /forget\s+(everything|all|your)/i,
        /new\s+instructions?:/i,
        /system\s*:\s*/i,
        /\[INST\]/i,
        /\[SYSTEM\]/i,
        /<<SYS>>/i,
        /override\s+(system|instructions?)/i,
        /pretend\s+(you|to\s+be)/i,
        /act\s+as\s+(if\s+you|a|an)/i,
        /jailbreak/i,
        /DAN\s+mode/i,
    ];

    for (const pattern of injectionPatterns) {
        if (pattern.test(input)) {
            log.warn("Prompt injection attempt detected", {
                pattern: pattern.source,
                inputPreview: input.substring(0, 100),
            });
            return true;
        }
    }
    return false;
}
