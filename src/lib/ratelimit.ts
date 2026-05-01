import type { NextRequest } from "next/server";
import { RateLimiterMemory, RateLimiterRes } from "rate-limiter-flexible";

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  keyPrefix: string;
};

type RateLimitResult =
  | { ok: true; remaining: number; resetAt: number }
  | { ok: false; remaining: 0; resetAt: number; retryAfterSeconds: number };

declare global {
  // eslint-disable-next-line no-var
  var __rateLimiters:
    | Map<string, RateLimiterMemory>
    | undefined;
}

function getLimiter({
  keyPrefix,
  limit,
  windowMs,
}: RateLimitOptions): RateLimiterMemory {
  const limiterKey = `${keyPrefix}:${limit}:${windowMs}`;
  if (!globalThis.__rateLimiters) {
    globalThis.__rateLimiters = new Map<string, RateLimiterMemory>();
  }

  const existing = globalThis.__rateLimiters.get(limiterKey);
  if (existing) return existing;

  const limiter = new RateLimiterMemory({
    keyPrefix,
    points: limit,
    duration: Math.max(1, Math.ceil(windowMs / 1000)),
  });

  globalThis.__rateLimiters.set(limiterKey, limiter);
  return limiter;
}

export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const maybeIp = (req as NextRequest & { ip?: string }).ip;
  return maybeIp || "unknown";
}

export async function rateLimit(
  rawKey: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const limiter = getLimiter(options);

  try {
    const result = await limiter.consume(rawKey);
    return {
      ok: true,
      remaining: Math.max(0, result.remainingPoints ?? 0),
      resetAt: Date.now() + result.msBeforeNext,
    };
  } catch (error) {
    const result = error as RateLimiterRes;
    return {
      ok: false,
      remaining: 0,
      resetAt: Date.now() + result.msBeforeNext,
      retryAfterSeconds: Math.max(1, Math.ceil(result.msBeforeNext / 1000)),
    };
  }
}

export async function rateLimitRequest(
  req: NextRequest,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  return rateLimit(getClientIp(req), options);
}
