import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, jsonPublicCache, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

import crypto from "crypto";

type PreviousImage = { url: string; publicId?: string };

async function deleteFromCloudinary(publicId: string) {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn(
        "Cloudinary credentials missing, skipping Cloudinary deletion.",
      );
      return;
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign)
      .digest("hex");

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", apiKey);
    formData.append("signature", signature);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      const err = await res.json();
      console.error("Cloudinary destroy failed:", err);
    }
  } catch (error) {
    console.error("deleteFromCloudinary error:", error);
  }
}

// GET — fetch current settings (public)
export async function GET(req: NextRequest) {
  try {
    const isWarmup = req.nextUrl.searchParams.get("warm") === "1";

    await dbConnect();
    let settings = await SiteSettings.findOne({ key: "main" })
      .select(
        "bannerImage profileImage resumeUrl previousBanners previousProfiles",
      )
      .lean();

    if (!settings) {
      const createdSettings = await SiteSettings.create({ key: "main" });
      settings = createdSettings.toObject();
    }

    const data = {
      bannerImage: settings.bannerImage,
      profileImage: settings.profileImage,
      resumeUrl: settings.resumeUrl || "",
      previousBanners: settings.previousBanners || [],
      previousProfiles: settings.previousProfiles || [],
    };

    return isWarmup ? jsonNoStore(data) : jsonPublicCache(data);
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

    const {
      bannerImage,
      profileImage,
      resumeUrl,
      publicId,
      deleteBanner,
      deleteProfile,
    } = await req.json();
    await dbConnect();

    let settings = await SiteSettings.findOne({ key: "main" });
    if (!settings) {
      settings = await SiteSettings.create({ key: "main" });
    }

    if (bannerImage) {
      settings.bannerImage = bannerImage;
      const alreadyHas = settings.previousBanners.some(
        (b: PreviousImage) => b.url === bannerImage,
      );
      if (!alreadyHas) {
        settings.previousBanners.push({
          url: bannerImage,
          publicId: publicId || "",
        });
      }
    }

    if (profileImage) {
      settings.profileImage = profileImage;
      const alreadyHas = settings.previousProfiles.some(
        (p: PreviousImage) => p.url === profileImage,
      );
      if (!alreadyHas) {
        settings.previousProfiles.push({
          url: profileImage,
          publicId: publicId || "",
        });
      }
    }

    if (deleteBanner) {
      const bToDel = settings.previousBanners.find(
        (b: PreviousImage) => b.url === deleteBanner,
      );
      if (bToDel && bToDel.publicId) {
        await deleteFromCloudinary(bToDel.publicId);
      }
      settings.previousBanners = settings.previousBanners.filter(
        (b: PreviousImage) => b.url !== deleteBanner,
      );
    }

    if (deleteProfile) {
      const pToDel = settings.previousProfiles.find(
        (p: PreviousImage) => p.url === deleteProfile,
      );
      if (pToDel && pToDel.publicId) {
        await deleteFromCloudinary(pToDel.publicId);
      }
      settings.previousProfiles = settings.previousProfiles.filter(
        (p: PreviousImage) => p.url !== deleteProfile,
      );
    }

    if (resumeUrl !== undefined) {
      settings.resumeUrl = resumeUrl;
    }

    await settings.save();

    return jsonNoStore({
      bannerImage: settings.bannerImage,
      profileImage: settings.profileImage,
      resumeUrl: settings.resumeUrl || "",
      previousBanners: settings.previousBanners || [],
      previousProfiles: settings.previousProfiles || [],
    });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return jsonNoStore({ error: "Failed to update settings" }, { status: 500 });
  }
}
