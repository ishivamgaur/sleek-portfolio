"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, CheckCircle2, X } from "lucide-react";
import Cropper from "react-easy-crop";

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

/** Get cropped image using canvas */
async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  targetW: number,
  targetH: number,
): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d")!;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    targetW,
    targetH,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob failed"));
      },
      "image/jpeg",
      0.9,
    );
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

  // Cropping State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isVideoSelected, setIsVideoSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const dim = DIMENSIONS[uploadType] || DIMENSIONS.general;
  const aspect = dim.w / dim.h;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("video/")) {
      setIsVideoSelected(true);
      setSelectedFile(file);
      await uploadDirectly(file, true);
    } else {
      setIsVideoSelected(false);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImageSrc(reader.result as string),
      );
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setUploading(true);
    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        dim.w,
        dim.h,
      );
      await uploadDirectly(croppedBlob, false);
      setImageSrc(null); // close modal
    } catch (e) {
      alert("Failed to crop image.");
      setUploading(false);
    }
  };

  const uploadDirectly = async (fileOrBlob: File | Blob, isVideo: boolean) => {
    setUploading(true);
    setDone(false);

    try {
      const resourceType = isVideo ? "video" : "image";
      const form = new FormData();
      form.append("upload_preset", UPLOAD_PRESET);
      form.append("folder", FOLDERS[uploadType] || FOLDERS.general);

      if (!isVideo) {
        form.append("file", fileOrBlob, "upload.jpg");
      } else {
        form.append("file", fileOrBlob);
      }

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        { method: "POST", body: form },
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.error?.message || "Upload failed");
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
    <>
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
          disabled={uploading && !imageSrc}
          onClick={() => inputRef.current?.click()}
          className="gap-2"
        >
          {uploading && !imageSrc ? (
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

      {/* Cropper Modal Overlay */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-lg overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-lg">Crop {uploadType}</h3>
              <button
                onClick={() => setImageSrc(null)}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative w-full h-[350px] bg-black/10">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-4 flex items-center justify-between bg-muted/30">
              <div className="w-1/2">
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <Button onClick={handleCropSave} disabled={uploading}>
                {uploading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Save & Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
