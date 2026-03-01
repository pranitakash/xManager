// ─── FC xManager — POST /api/auth/login ─────────────────
// Generates a JWT token and sets it as a cookie

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function POST(request: NextRequest) {
    try {
        if (!JWT_SECRET) {
            return NextResponse.json(
                { error: "Server configuration error", code: "CONFIG_ERROR" },
                { status: 500 }
            );
        }

        const body = await request.json().catch(() => ({}));
        const email = body.email || "manager@fcx.ai";
        const name = body.name || "Manager";

        // Generate a deterministic userId from email
        const userId = `user_${Buffer.from(email).toString("base64url").slice(0, 16)}`;

        // Generate JWT token
        const token = jwt.sign(
            {
                userId,
                email,
                name,
                subscriptionTier: "pro", // Default to pro for full access
            },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set the cookie and return success
        const response = NextResponse.json({
            success: true,
            user: { userId, email, name, subscriptionTier: "pro" },
        });

        response.cookies.set("xm_auth", token, {
            path: "/",
            httpOnly: false, // Needs to be readable by middleware
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60, // 7 days
        });

        return response;
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Login failed";
        return NextResponse.json(
            { error: errorMessage, code: "LOGIN_ERROR" },
            { status: 500 }
        );
    }
}
