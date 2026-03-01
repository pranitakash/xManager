// ─── FC xManager — Structured Logger ────────────────────
// JSON-structured logging for execution tracking and monitoring

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    service: string;
    message: string;
    data?: Record<string, unknown>;
}

function createEntry(
    level: LogLevel,
    service: string,
    message: string,
    data?: Record<string, unknown>
): LogEntry {
    return {
        timestamp: new Date().toISOString(),
        level,
        service,
        message,
        ...(data && { data }),
    };
}

function emit(entry: LogEntry): void {
    const output = JSON.stringify(entry);
    switch (entry.level) {
        case "error":
            console.error(output);
            break;
        case "warn":
            console.warn(output);
            break;
        case "debug":
            if (process.env.NODE_ENV === "development") {
                console.debug(output);
            }
            break;
        default:
            console.log(output);
    }
}

/**
 * Create a scoped logger for a specific service.
 */
export function createLogger(service: string) {
    return {
        info: (message: string, data?: Record<string, unknown>) =>
            emit(createEntry("info", service, message, data)),
        warn: (message: string, data?: Record<string, unknown>) =>
            emit(createEntry("warn", service, message, data)),
        error: (message: string, data?: Record<string, unknown>) =>
            emit(createEntry("error", service, message, data)),
        debug: (message: string, data?: Record<string, unknown>) =>
            emit(createEntry("debug", service, message, data)),

        /**
         * Log execution timing
         */
        timing: (operation: string, durationMs: number, data?: Record<string, unknown>) =>
            emit(
                createEntry("info", service, `${operation} completed`, {
                    durationMs,
                    ...data,
                })
            ),

        /**
         * Log Gemini API call metrics
         */
        gemini: (tool: string, durationMs: number, success: boolean, data?: Record<string, unknown>) =>
            emit(
                createEntry(success ? "info" : "error", service, `Gemini call for ${tool}`, {
                    tool,
                    durationMs,
                    success,
                    ...data,
                })
            ),
    };
}

export const logger = createLogger("xmanager");
