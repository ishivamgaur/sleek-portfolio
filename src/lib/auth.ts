import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "admin_session";
const ISSUER = "sleek-portfolio";
const AUDIENCE = "admin";

declare global {
  // eslint-disable-next-line no-var
  var __devAdminSessionSecret: string | undefined;
}

function getSecret(): Uint8Array {
  const configured = process.env.ADMIN_SESSION_SECRET;
  if (configured && configured.trim().length >= 32) {
    return new TextEncoder().encode(configured);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set (>= 32 chars) in production.",
    );
  }

  if (!globalThis.__devAdminSessionSecret) {
    globalThis.__devAdminSessionSecret = crypto.randomBytes(32).toString("hex");
    console.warn(
      "[auth] ADMIN_SESSION_SECRET not set; using an ephemeral dev secret (sessions reset on restart).",
    );
  }

  return new TextEncoder().encode(globalThis.__devAdminSessionSecret);
}

/** Create a signed JWT valid for 24 hours */
export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setJti(crypto.randomUUID())
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(getSecret());
}

/** Verify the JWT token — returns true if valid */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });
    return true;
  } catch {
    return false;
  }
}

/** Set the auth cookie (HTTP-only, Secure, SameSite=strict) */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

/** Clear the auth cookie */
export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

/** Check if the current request has a valid auth cookie */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}
