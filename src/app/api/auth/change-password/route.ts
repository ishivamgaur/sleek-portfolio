import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/models/Admin";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, currentPassword, newPassword } = await req.json();
    const emailRaw =
      typeof email === "string" ? email.toLowerCase().trim() : "";
    const currentPasswordRaw =
      typeof currentPassword === "string" ? currentPassword : "";
    const newPasswordRaw = typeof newPassword === "string" ? newPassword : "";

    if (!emailRaw || !currentPasswordRaw || !newPasswordRaw) {
      return jsonNoStore(
        { error: "Email, current password, and new password are required" },
        { status: 400 },
      );
    }

    if (newPasswordRaw.length < 8) {
      return jsonNoStore(
        { error: "New password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    const ip = getClientIp(req);
    const limit = await rateLimit(`change-password:${ip}:${emailRaw}`, {
      keyPrefix: "auth:change-pw",
      limit: 5,
      windowMs: 15 * 60 * 1000,
    });

    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    await dbConnect();
    const admin = await Admin.findOne({ email: emailRaw });

    if (!admin) {
      return jsonNoStore({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await admin.comparePassword(currentPasswordRaw);
    if (!isMatch) {
      return jsonNoStore(
        { error: "Invalid current password" },
        { status: 401 },
      );
    }

    admin.password = newPasswordRaw;
    await admin.save();

    return jsonNoStore({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return jsonNoStore({ error: "Internal server error" }, { status: 500 });
  }
}
