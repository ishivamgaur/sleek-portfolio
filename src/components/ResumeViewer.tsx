"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface ResumeViewerProps {
  resumeUrl: string;
}

export default function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const dispatch = useDispatch();
  const hasLoadedBefore = useSelector(
    (state: RootState) => state.portfolio.hasLoadedResume,
  );

  // Only show the loading skeleton if we haven't loaded it globally yet
  const [isLoading, setIsLoading] = useState(!hasLoadedBefore);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the image is already in browser cache, onLoad might not fire again.
    // We instantly mark it as loaded if the img.complete property is true.
    if (imgRef.current && imgRef.current.complete) {
      handleLoadSuccess();
    }
  }, []);

  const handleLoadSuccess = () => {
    setIsLoading(false);
    if (!hasLoadedBefore) {
      dispatch({ type: "portfolio/setHasLoadedResume", payload: true });
    }
  };

  const isCloudinary =
    resumeUrl?.includes("res.cloudinary.com") &&
    resumeUrl?.includes("/image/upload/");

  let previewUrl = "";
  if (isCloudinary) {
    // Cloudinary can perfectly render the first page of a PDF as an optimized image instantly.
    previewUrl = resumeUrl
      .split("?")[0]
      .replace("/image/upload/", "/image/upload/pg_1,f_auto,q_auto,w_1400/")
      .replace(/\.pdf$/i, ".jpg");
  } else if (resumeUrl?.includes("drive.google.com")) {
    const idMatch = resumeUrl.match(/\/d\/([^/]+)/);
    previewUrl = idMatch
      ? `https://drive.google.com/file/d/${idMatch[1]}/preview`
      : resumeUrl;
  } else {
    // Fallback to Google Docs viewer for generic links
    previewUrl = resumeUrl
      ? `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`
      : "";
  }

  // Cloudinary download link optimization
  const downloadUrl = resumeUrl?.replace("/upload/", "/upload/fl_attachment/");

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {resumeUrl ? (
        <>
          <div className="w-full relative group">
            <div
              className={`w-full aspect-[1/1.4] overflow-hidden bg-transparent relative max-h-[1000px] border border-border rounded-xl ${isLoading && !hasLoadedBefore ? "animate-pulse bg-secondary/10" : ""}`}
            >
              {isCloudinary ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  ref={imgRef}
                  src={previewUrl}
                  alt="Resume Preview"
                  className={`w-full h-full object-cover border-none block transition-opacity duration-300 ${isLoading && !hasLoadedBefore ? "opacity-0" : "opacity-100"}`}
                  onLoad={handleLoadSuccess}
                />
              ) : (
                <iframe
                  src={previewUrl}
                  className={`w-full h-full border-none block transition-opacity duration-300 ${isLoading && !hasLoadedBefore ? "opacity-0" : "opacity-100"}`}
                  title="Resume Preview"
                  onLoad={handleLoadSuccess}
                />
              )}

              {/* Minimal hover overlay */}
              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none transition-all duration-500 group-hover:bg-primary/[0.005]" />
              )}
            </div>
          </div>

          {/* Action Buttons - Matching Home Page Style */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight active:scale-[0.98]">
                View full resume
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </a>

            <a href={downloadUrl} download className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight active:scale-[0.98]">
                Download
                <Download className="w-4 h-4" />
              </button>
            </a>
          </div>
        </>
      ) : (
        <div className="flex min-h-[400px] w-full items-center justify-center p-8 text-center text-muted-foreground border border-dashed border-border rounded-xl bg-secondary/5">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-40"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9H8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
              </svg>
            </div>
            <p className="font-medium">No resume has been uploaded yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
