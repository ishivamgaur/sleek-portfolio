import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

// GET — fetch current settings (public)
export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne({ key: "main" })
      .select("resumeUrl")
      .lean();

    if (!settings) {
      const createdSettings = await SiteSettings.create({ key: "main" });
      settings = createdSettings.toObject();
    }

    const data = {
      resumeUrl: settings.resumeUrl || "",
    };

    return jsonNoStore(data);
  } catch (error) {
    console.error("Settings GET error:", error);
    return jsonNoStore({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// PUT — update settings (admin only)
export async function PUT(req: NextRequest) {
  try {
    const limit = await rateLimitRequest(req, {
      keyPrefix: "settings:put",
      limit: 30,
      windowMs: 60_000,
    });
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const authed = await isAuthenticated();
    if (!authed) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeUrl } = await req.json();
    await dbConnect();

    let settings = await SiteSettings.findOne({ key: "main" });
    if (!settings) {
      settings = await SiteSettings.create({ key: "main" });
    }

    if (resumeUrl !== undefined) {
      settings.resumeUrl = resumeUrl;
    }

    await settings.save();

    return jsonNoStore({
      resumeUrl: settings.resumeUrl || "",
    });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return jsonNoStore({ error: "Failed to update settings" }, { status: 500 });
  }
}
