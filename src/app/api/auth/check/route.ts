import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

export async function GET(req: NextRequest) {
  // avoid endpoint abuse (per instance)
  const limit = await rateLimitRequest(req, {
    keyPrefix: "auth:check",
    limit: 30,
    windowMs: 60_000,
  });
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const authed = await isAuthenticated();
  return jsonNoStore({ authenticated: authed });
}
