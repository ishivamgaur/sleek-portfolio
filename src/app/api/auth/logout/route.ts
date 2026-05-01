import { NextRequest } from "next/server";
import { clearAuthCookie } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const limit = await rateLimitRequest(req, {
    keyPrefix: "auth:logout",
    limit: 20,
    windowMs: 60_000,
  });
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  await clearAuthCookie();
  return jsonNoStore({ success: true });
}
