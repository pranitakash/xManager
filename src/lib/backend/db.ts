// ─── FC xManager — Prisma Client Singleton ──────────────
// Prevents multiple Prisma instances in Next.js dev mode

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL?.replace(":5432/postgres", ":6543/postgres");
const pool = connectionString ? new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase/Cloud PostgreSQL
}) : undefined;
const adapter = pool ? new PrismaPg(pool) : undefined;

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        ...(adapter ? { adapter } : {}),
        log:
            process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
    } as any);

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}