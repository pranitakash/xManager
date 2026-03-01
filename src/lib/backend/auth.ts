// ─── FC xManager — Auth Utilities ───────────────────────
// JWT verification and user extraction from xm_auth cookie

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { AuthContext, SubscriptionTier } from "./types";

const JWT_SECRET = process.env.JWT_SECRET || "";

interface JwtPayload {
    userId: string;
    email: string;
    subscriptionTier: SubscriptionTier;
    iat?: number;
    exp?: number;
}

/**
 * Verify the auth token from the xm_auth cookie.
 * Returns the authenticated user context or null if invalid.
 */
export async function verifyAuth(): Promise<AuthContext | null> {
    try {
        if (!JWT_SECRET) {
            console.error("[AUTH] JWT_SECRET is not configured");
            return null;
        }

        const cookieStore = await cookies();
        const authCookie = cookieStore.get("xm_auth");

        if (!authCookie?.value) {
            return null;
        }

        const token = authCookie.value;
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (!decoded.userId || !decoded.email) {
            return null;
        }

        return {
            userId: decoded.userId,
            email: decoded.email,
            subscriptionTier: decoded.subscriptionTier || "free",
        };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.warn("[AUTH] Token expired");
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.warn("[AUTH] Invalid token");
        } else {
            console.error("[AUTH] Verification error:", error);
        }
        return null;
    }
}

/**
 * Require authentication — returns AuthContext or throws.
 * Use in API route handlers.
 */
export async function requireAuth(): Promise<AuthContext> {
    const auth = await verifyAuth();
    if (!auth) {
        throw new AuthError("Authentication required");
    }
    return auth;
}

/**
 * Generate a JWT token for a user (utility for testing / login integration).
 */
export function generateToken(payload: {
    userId: string;
    email: string;
    subscriptionTier: SubscriptionTier;
}): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// ─── Auth Error ─────────────────────────────────────────
export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthError";
    }
}
