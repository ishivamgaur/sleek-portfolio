import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { isAuthenticated } from "@/lib/auth";

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

    const { bannerImage, profileImage } = await req.json();
    await dbConnect();

    const update: Record<string, string> = {};
    if (bannerImage) update.bannerImage = bannerImage;
    if (profileImage) update.profileImage = profileImage;

    const settings = await SiteSettings.findOneAndUpdate(
      { key: "main" },
      { $set: update },
      { new: true, upsert: true },
    );

    return NextResponse.json({
      bannerImage: settings.bannerImage,
      profileImage: settings.profileImage,
    });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 },
    );
  }
}
