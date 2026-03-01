// ─── FC xManager — Redis-based Rate Limiter ─────────────
// Per-user, per-minute rate limiting with tier-based thresholds

import Redis from "ioredis";
import { createLogger } from "../services/logger";
import type { SubscriptionTier, RateLimitInfo } from "../types";

const log = createLogger("rate-limiter");

// ─── Redis Client ───────────────────────────────────────
let redis: Redis | null = null;

function getRedis(): Redis {
    if (!redis) {
        const url = process.env.REDIS_URL;
        if (!url) {
            throw new Error("REDIS_URL is not configured");
        }
        redis = new Redis(url, {
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                return Math.min(times * 50, 2000);
            },
        });
        redis.on("error", (err) => log.error("Redis connection error", { error: String(err) }));
    }
    return redis;
}

// ─── Tier Limits ────────────────────────────────────────
interface TierLimits {
    perMinute: number;
    perDay: number;
}

function getTierLimits(tier: SubscriptionTier): TierLimits {
    switch (tier) {
        case "elite":
            return {
                perMinute: parseInt(process.env.RATE_LIMIT_ELITE_PER_MINUTE || "60"),
                perDay: parseInt(process.env.RATE_LIMIT_ELITE_PER_DAY || "2000"),
            };
        case "pro":
            return {
                perMinute: parseInt(process.env.RATE_LIMIT_PRO_PER_MINUTE || "20"),
                perDay: parseInt(process.env.RATE_LIMIT_PRO_PER_DAY || "500"),
            };
        default:
            return {
                perMinute: parseInt(process.env.RATE_LIMIT_FREE_PER_MINUTE || "5"),
                perDay: parseInt(process.env.RATE_LIMIT_FREE_PER_DAY || "50"),
            };
    }
}

// ─── Check Rate Limit ───────────────────────────────────
export async function checkRateLimit(
    userId: string,
    tier: SubscriptionTier
): Promise<
    | { allowed: true; info: RateLimitInfo }
    | { allowed: false; info: RateLimitInfo; retryAfterSeconds: number }
> {
    const limits = getTierLimits(tier);
    const client = getRedis();

    const minuteKey = `rl:min:${userId}`;
    const dayKey = `rl:day:${userId}`;
    const now = Math.floor(Date.now() / 1000);

    try {
        // Use pipeline for atomic operations
        const pipeline = client.pipeline();
        pipeline.incr(minuteKey);
        pipeline.ttl(minuteKey);
        pipeline.incr(dayKey);
        pipeline.ttl(dayKey);
        const results = await pipeline.exec();

        if (!results) throw new Error("Redis pipeline returned null");

        const minuteCount = (results[0]?.[1] as number) || 0;
        const minuteTTL = (results[1]?.[1] as number) || -1;
        const dayCount = (results[2]?.[1] as number) || 0;
        const dayTTL = (results[3]?.[1] as number) || -1;

        // Set TTL on first request
        if (minuteTTL === -1 || minuteCount === 1) {
            await client.expire(minuteKey, 60);
        }
        if (dayTTL === -1 || dayCount === 1) {
            await client.expire(dayKey, 86400);
        }

        // Check minute limit
        if (minuteCount > limits.perMinute) {
            const resetAt = new Date((now + (minuteTTL > 0 ? minuteTTL : 60)) * 1000).toISOString();
            log.warn("Rate limit exceeded (per-minute)", { userId, minuteCount, limit: limits.perMinute });
            return {
                allowed: false,
                info: { remaining: 0, limit: limits.perMinute, resetAt },
                retryAfterSeconds: minuteTTL > 0 ? minuteTTL : 60,
            };
        }

        // Check daily limit
        if (dayCount > limits.perDay) {
            const resetAt = new Date((now + (dayTTL > 0 ? dayTTL : 86400)) * 1000).toISOString();
            log.warn("Rate limit exceeded (per-day)", { userId, dayCount, limit: limits.perDay });
            return {
                allowed: false,
                info: { remaining: 0, limit: limits.perDay, resetAt },
                retryAfterSeconds: dayTTL > 0 ? dayTTL : 86400,
            };
        }

        const remaining = Math.min(limits.perMinute - minuteCount, limits.perDay - dayCount);
        const resetAt = new Date((now + (minuteTTL > 0 ? minuteTTL : 60)) * 1000).toISOString();

        return {
            allowed: true,
            info: { remaining, limit: limits.perMinute, resetAt },
        };
    } catch (error) {
        // On Redis failure, allow the request (fail open) but log
        log.error("Rate limit check failed, allowing request", {
            userId,
            error: error instanceof Error ? error.message : String(error),
        });
        return {
            allowed: true,
            info: { remaining: -1, limit: limits.perMinute, resetAt: "" },
        };
    }
}

/**
 * Get the Redis client instance (for BullMQ and other services).
 */
export function getRedisClient(): Redis {
    return getRedis();
}
