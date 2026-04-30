"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  label?: string;
  uploadType?: "banner" | "profile" | "story" | "general";
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

/** Target dimensions per upload type */
const DIMENSIONS: Record<string, { w: number; h: number }> = {
  banner: { w: 1200, h: 400 },
  profile: { w: 200, h: 200 },
  story: { w: 720, h: 1280 },
  general: { w: 800, h: 800 },
};

const FOLDERS: Record<string, string> = {
  banner: "portfolio/banners",
  profile: "portfolio/profiles",
  story: "portfolio/stories",
  general: "portfolio/general",
};

/**
 * Resizes an image file using Canvas before uploading.
 * Returns a compressed Blob at the target dimensions.
 */
function resizeImage(
  file: File,
  maxW: number,
  maxH: number,
  quality = 0.8
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = maxW;
      canvas.height = maxH;

      const ctx = canvas.getContext("2d")!;
      // Fill-crop: scale to cover, then center-crop
      const scale = Math.max(maxW / img.width, maxH / img.height);
      const scaledW = img.width * scale;
      const scaledH = img.height * scale;
      const offsetX = (maxW - scaledW) / 2;
      const offsetY = (maxH - scaledH) / 2;

      ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas toBlob failed"));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export default function FileUpload({
  onUploadComplete,
  accept = "image/*,video/*",
  label = "Upload",
  uploadType = "general",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setDone(false);

    try {
      const isVideo = file.type.startsWith("video/");
      const resourceType = isVideo ? "video" : "image";

      const form = new FormData();
      form.append("upload_preset", UPLOAD_PRESET);
      form.append("folder", FOLDERS[uploadType] || FOLDERS.general);

      if (!isVideo) {
        // Resize image client-side before uploading
        const dim = DIMENSIONS[uploadType] || DIMENSIONS.general;
        const resizedBlob = await resizeImage(file, dim.w, dim.h);
        form.append("file", resizedBlob, "upload.jpg");
      } else {
        // Videos upload as-is
        form.append("file", file);
      }

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        { method: "POST", body: form }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.error?.message || "Upload failed");
        setUploading(false);
        return;
      }

      const data = await res.json();
      onUploadComplete(data.secure_url);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      alert("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="gap-2"
      >
        {uploading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Uploading…
          </>
        ) : done ? (
          <>
            <CheckCircle2 className="size-4 text-green-500" />
            Done
          </>
        ) : (
          <>
            <Upload className="size-4" />
            {label}
          </>
        )}
      </Button>
    </div>
  );
}
