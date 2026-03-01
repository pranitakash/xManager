// ─── FC xManager — BullMQ Queue System ──────────────────
// Async job processing for long-running tool executions

import { Queue, Worker, type Job } from "bullmq";
import Redis from "ioredis";
import { prisma } from "../db";
import { createLogger } from "./logger";
import type { ToolName, Mode } from "../types";

const log = createLogger("queue-system");

// ─── Job Data Types ─────────────────────────────────────
export interface ToolJobData {
    executionId: string;
    userId: string;
    mode: Mode;
    tool: ToolName;
    inputData: Record<string, unknown>;
    systemInstruction: string;
    userPrompt: string;
    isMultimodal: boolean;
    imageBase64?: string;
    imageMimeType?: string;
}

export interface ToolJobResult {
    success: boolean;
    data?: Record<string, unknown>;
    error?: string;
    executionTimeMs: number;
}

// ─── Redis Connection for BullMQ ────────────────────────
function createConnection(): Redis {
    const url = process.env.REDIS_URL;
    if (!url) {
        throw new Error("REDIS_URL is not configured");
    }
    return new Redis(url, {
        maxRetriesPerRequest: null, // Required by BullMQ
    });
}

// ─── Queue ──────────────────────────────────────────────
const QUEUE_NAME = "tool-execution";

let queue: Queue | null = null;

export function getQueue(): Queue {
    if (!queue) {
        queue = new Queue(QUEUE_NAME, {
            connection: createConnection() as never,
            defaultJobOptions: {
                removeOnComplete: { count: 1000 },
                removeOnFail: { count: 500 },
                attempts: 2,
                backoff: {
                    type: "exponential",
                    delay: 3000,
                },
            },
        });
        log.info("Queue initialized", { name: QUEUE_NAME });
    }
    return queue;
}

// ─── Add Job to Queue ───────────────────────────────────
export async function enqueueToolExecution(data: ToolJobData): Promise<string> {
    const q = getQueue();
    const job = await q.add(`execute-${data.tool}`, data, {
        jobId: data.executionId,
    });
    log.info("Job enqueued", {
        jobId: job.id,
        tool: data.tool,
        executionId: data.executionId,
    });
    return job.id || data.executionId;
}

// ─── Worker (import this file to start processing) ──────
let worker: Worker | null = null;

export function startWorker(): Worker {
    if (worker) return worker;

    const concurrency = parseInt(process.env.QUEUE_CONCURRENCY || "3");

    worker = new Worker(
        QUEUE_NAME,
        async (job: Job) => {
            const { executionId, tool, isMultimodal, systemInstruction, userPrompt, imageBase64, imageMimeType } = job.data as ToolJobData;
            const startTime = Date.now();

            log.info("Processing job", { jobId: job.id, tool, executionId });

            // Update status to processing
            await prisma.execution.update({
                where: { id: executionId },
                data: { status: "processing" },
            });

            try {
                // Dynamic import to avoid circular dependencies
                const { executeTextPrompt, executeMultimodalPrompt } = await import("./gemini");

                let result;
                if (isMultimodal && imageBase64 && imageMimeType) {
                    result = await executeMultimodalPrompt(systemInstruction, userPrompt, imageBase64, imageMimeType);
                } else {
                    result = await executeTextPrompt(systemInstruction, userPrompt);
                }

                const executionTimeMs = Date.now() - startTime;

                if (result.success) {
                    await prisma.execution.update({
                        where: { id: executionId },
                        data: {
                            status: "success",
                            outputData: JSON.parse(JSON.stringify(result.data)),
                            executionTimeMs,
                        },
                    });

                    log.info("Job completed successfully", { executionId, tool, executionTimeMs });
                    return { success: true, data: result.data, executionTimeMs };
                } else {
                    await prisma.execution.update({
                        where: { id: executionId },
                        data: {
                            status: "failed",
                            errorMessage: result.error,
                            executionTimeMs,
                        },
                    });

                    log.error("Job failed — AI error", { executionId, tool, error: result.error });
                    return { success: false, error: result.error, executionTimeMs };
                }
            } catch (error) {
                const executionTimeMs = Date.now() - startTime;
                const errorMessage = error instanceof Error ? error.message : "Unknown error";

                await prisma.execution.update({
                    where: { id: executionId },
                    data: {
                        status: "failed",
                        errorMessage,
                        executionTimeMs,
                    },
                });

                log.error("Job crashed", { executionId, tool, error: errorMessage });
                throw error; // Let BullMQ handle retry
            }
        },
        {
            connection: createConnection() as never,
            concurrency,
        }
    );

    worker.on("completed", (job) => {
        log.info("Worker completed job", { jobId: job.id });
    });

    worker.on("failed", (job, err) => {
        log.error("Worker job failed", { jobId: job?.id, error: err.message });
    });

    log.info("Worker started", { concurrency });
    return worker;
}
