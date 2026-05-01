import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { isAuthenticated } from "@/lib/auth";

import crypto from "crypto";

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
export async function GET() {
  try {
    await dbConnect();
    let settings = await SiteSettings.findOne({ key: "main" });

    if (!settings) {
      settings = await SiteSettings.create({ key: "main" });
    }

    return NextResponse.json({
      bannerImage: settings.bannerImage,
      profileImage: settings.profileImage,
      previousBanners: settings.previousBanners || [],
      previousProfiles: settings.previousProfiles || [],
    });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}

// PUT — update settings (admin only)
export async function PUT(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bannerImage, profileImage, publicId, deleteBanner, deleteProfile } =
      await req.json();
    await dbConnect();

    let settings = await SiteSettings.findOne({ key: "main" });
    if (!settings) {
      settings = await SiteSettings.create({ key: "main" });
    }

    if (bannerImage) {
      settings.bannerImage = bannerImage;
      const alreadyHas = settings.previousBanners.some(
        (b: any) => b.url === bannerImage,
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
        (p: any) => p.url === profileImage,
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
        (b: any) => b.url === deleteBanner,
      );
      if (bToDel && bToDel.publicId) {
        await deleteFromCloudinary(bToDel.publicId);
      }
      settings.previousBanners = settings.previousBanners.filter(
        (b: any) => b.url !== deleteBanner,
      );
    }

    if (deleteProfile) {
      const pToDel = settings.previousProfiles.find(
        (p: any) => p.url === deleteProfile,
      );
      if (pToDel && pToDel.publicId) {
        await deleteFromCloudinary(pToDel.publicId);
      }
      settings.previousProfiles = settings.previousProfiles.filter(
        (p: any) => p.url !== deleteProfile,
      );
    }

    await settings.save();

    return NextResponse.json({
      bannerImage: settings.bannerImage,
      profileImage: settings.profileImage,
      previousBanners: settings.previousBanners || [],
      previousProfiles: settings.previousProfiles || [],
    });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
