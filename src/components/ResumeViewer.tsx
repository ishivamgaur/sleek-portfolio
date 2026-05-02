"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Download } from "lucide-react";

interface ResumeViewerProps {
  resumeUrl: string;
}

export default function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use Google Docs Viewer for maximum compatibility across Mobile (iOS/Android) and Desktop
  // Native PDF embedding often fails on mobile browsers.
  const previewUrl = resumeUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(resumeUrl)}&embedded=true`
    : "";

  // Cloudinary download link optimization
  const downloadUrl = resumeUrl?.replace("/upload/", "/upload/fl_attachment/");

  if (!mounted) {
    return <div className="w-full aspect-[1/1.4] shimmer max-h-[1000px]" />;
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {resumeUrl ? (
        <>
          <div className="w-full relative group">
            <div
              className={`w-full aspect-[1/1.4] overflow-hidden bg-transparent relative max-h-[1000px]  border border-border/50 ${isLoading ? "shimmer" : ""}`}
            >
              <iframe
                src={previewUrl}
                className={`w-full h-full border-none block transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
                title="Resume Preview"
                onLoad={() => setIsLoading(false)}
              />

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
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight shadow-sm active:scale-[0.98]">
                View full resume
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </a>

            <a href={downloadUrl} download className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight shadow-sm active:scale-[0.98]">
                Download PDF
                <Download className="w-4 h-4" />
              </button>
            </a>
          </div>
        </>
      ) : (
        <div className="flex min-h-[400px] w-full items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-3xl bg-muted/5">
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
