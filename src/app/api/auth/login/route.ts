import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import { createToken, setAuthCookie } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { getClientIp, rateLimit, rateLimitRequest } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    // Basic brute-force protection (per instance). For multi-region/serverless,
    // consider a shared store like Redis/Upstash.
    const ipLimit = await rateLimitRequest(req, {
      keyPrefix: "auth:login:ip",
      limit: 10,
      windowMs: 60_000,
    });
    if (!ipLimit.ok) return tooManyRequests(ipLimit.retryAfterSeconds);

    const contentLength = Number(req.headers.get("content-length") || "0");
    if (Number.isFinite(contentLength) && contentLength > 10_000) {
      return jsonNoStore({ error: "Payload too large" }, { status: 413 });
    }

    const { email, password } = await req.json();

    const emailRaw = typeof email === "string" ? email : "";
    const passwordRaw = typeof password === "string" ? password : "";

    if (!emailRaw || !passwordRaw) {
      return jsonNoStore(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    // Light input hardening
    if (emailRaw.length > 320 || passwordRaw.length > 200) {
      return jsonNoStore({ error: "Invalid credentials" }, { status: 401 });
    }

    const normalizedEmail = emailRaw.toLowerCase().trim();
    const ip = getClientIp(req);
    const emailLimit = await rateLimit(`${ip}:${normalizedEmail}`, {
      keyPrefix: "auth:login:email",
      limit: 5,
      windowMs: 60_000,
    });
    if (!emailLimit.ok) return tooManyRequests(emailLimit.retryAfterSeconds);

    await dbConnect();

    const admin = await Admin.findOne({ email: normalizedEmail });

    if (!admin) {
      return jsonNoStore({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await admin.comparePassword(passwordRaw);

    if (!isMatch) {
      return jsonNoStore({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT and set HTTP-only cookie
    const token = await createToken();
    await setAuthCookie(token);

    return jsonNoStore({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return jsonNoStore({ error: "Internal server error" }, { status: 500 });
  }
}
