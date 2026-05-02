import { NextResponse } from "next/server";

export function jsonNoStore(
  data: unknown,
  init?: Parameters<typeof NextResponse.json>[1],
) {
  const res = NextResponse.json(data, init);
  res.headers.set("Cache-Control", "no-store");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export function jsonPublicCache(
  data: unknown,
  init?: Parameters<typeof NextResponse.json>[1],
) {
  const res = NextResponse.json(data, init);
  res.headers.set(
    "Cache-Control",
    "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
  );
  return res;
}

export function tooManyRequests(retryAfterSeconds: number) {
  const res = jsonNoStore(
    { error: "Too many requests. Please try again later." },
    { status: 429 },
  );
  res.headers.set("Retry-After", String(retryAfterSeconds));
  return res;
}
