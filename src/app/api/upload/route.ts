import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const uploadType = (formData.get("type") as string) || "general";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      return NextResponse.json(
        { error: "Cloudinary not configured" },
        { status: 500 }
      );
    }

    const isVideo = file.type.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    // Set folder based on type
    const folderMap: Record<string, string> = {
      banner: "portfolio/banners",
      profile: "portfolio/profiles",
      story: "portfolio/stories",
      general: "portfolio/general",
    };

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", uploadPreset);
    cloudinaryForm.append("folder", folderMap[uploadType] || "portfolio/general");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: err.error?.message || "Upload failed" },
        { status: 500 }
      );
    }

    const data = await res.json();

    // Build an optimized URL using Cloudinary on-the-fly transformations
    // This doesn't change the stored file, but ensures the SERVED image
    // is resized, compressed, and in the best format for the browser.
    //
    // URL format: https://res.cloudinary.com/<cloud>/image/upload/<transforms>/<version>/<public_id>.<format>
    const optimizedUrl = buildOptimizedUrl(
      data.secure_url,
      uploadType,
      resourceType
    );

    return NextResponse.json({
      url: optimizedUrl,
      resourceType,
      publicId: data.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Inserts Cloudinary transformation params into the URL.
 * e.g. .../image/upload/v123/file.jpg
 *   -> .../image/upload/c_fill,w_1500,h_500,q_auto,f_auto/v123/file.jpg
 *
 * This way Cloudinary serves a resized, compressed, auto-format version
 * without us needing signed uploads or preset-level transformations.
 */
function buildOptimizedUrl(
  secureUrl: string,
  uploadType: string,
  resourceType: string
): string {
  if (resourceType === "video") {
    // For videos, just apply quality optimization
    return insertTransform(secureUrl, "q_auto");
  }

  switch (uploadType) {
    case "banner":
      // 1500x500, 3:1 landscape, smart crop, auto quality + format
      return insertTransform(secureUrl, "c_fill,w_1500,h_500,g_auto,q_auto,f_auto");
    case "profile":
      // 400x400 square, face-aware crop, auto quality + format
      return insertTransform(secureUrl, "c_fill,w_400,h_400,g_face,q_auto,f_auto");
    case "story":
      // 1080x1920 portrait (9:16), smart crop, auto quality + format
      return insertTransform(secureUrl, "c_fill,w_1080,h_1920,g_auto,q_auto,f_auto");
    default:
      // General: just compress and auto-format
      return insertTransform(secureUrl, "q_auto,f_auto");
  }
}

/**
 * Inserts a transformation string into a Cloudinary URL.
 * Before: https://res.cloudinary.com/xxx/image/upload/v1234/folder/file.jpg
 * After:  https://res.cloudinary.com/xxx/image/upload/c_fill,w_400.../v1234/folder/file.jpg
 */
function insertTransform(url: string, transform: string): string {
  // Match .../upload/ and insert transforms right after it
  return url.replace("/upload/", `/upload/${transform}/`);
}
