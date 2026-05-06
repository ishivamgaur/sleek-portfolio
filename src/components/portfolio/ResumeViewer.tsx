"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

interface ResumeViewerProps {
  resumeUrl: string;
}

export default function ResumeViewer({ resumeUrl }: ResumeViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [PdfComponents, setPdfComponents] = useState<{
    Document: any;
    Page: any;
  } | null>(null);

  // Overleaf page: 8.5in × 11.5in
  const RESUME_ASPECT = "8.5/11.5";

  // Dynamically import react-pdf on client only (avoids SSR DOMMatrix crash)
  useEffect(() => {
    Promise.all([
      import("react-pdf"),
      import("react-pdf/dist/Page/AnnotationLayer.css"),
      import("react-pdf/dist/Page/TextLayer.css"),
    ]).then(([mod]) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
      setPdfComponents({ Document: mod.Document, Page: mod.Page });
    });
  }, []);

  // Measure container width for responsive rendering
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      observer.observe(node);
      setContainerWidth(node.clientWidth);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  function onDocumentLoadError() {
    setHasError(true);
    setIsLoading(false);
  }

  const pdfUrl = resumeUrl?.split("?")[0] || "";

  const downloadUrl = resumeUrl?.includes("/upload/")
    ? resumeUrl.replace("/upload/", "/upload/fl_attachment/")
    : resumeUrl;

  if (!resumeUrl) {
    return (
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
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-8">
      <FadeIn delay={0.3} direction="up" fullWidth>
        <div
          ref={containerRef}
          className="w-full relative rounded-xl border border-border overflow-hidden"
        >
          {/* Universal container — always matches Overleaf 8.5×11.5in */}
          <div
            className="w-full relative overflow-hidden"
            style={{ aspectRatio: RESUME_ASPECT }}
          >
            {/* Pulse skeleton — exact same size as the PDF */}
            {isLoading && (
              <div className="absolute inset-0 rounded-xl bg-secondary/10 animate-pulse z-10" />
            )}

            {/* Render only page 1 as a clean preview */}
            {PdfComponents && !hasError && (
              <PdfComponents.Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={null}
                className="flex flex-col items-center bg-white [&_.react-pdf__Page]:!bg-transparent h-full"
              >
                <PdfComponents.Page
                  pageNumber={1}
                  width={containerWidth}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="!bg-white [&_canvas]:!bg-white"
                  loading={null}
                />
              </PdfComponents.Document>
            )}

            {/* Error state — same container size */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center text-center text-muted-foreground">
                <div className="flex flex-col items-center gap-4">
                  <p className="font-medium text-foreground">
                    Unable to load resume
                  </p>
                  <p className="text-sm">
                    Try viewing or downloading it directly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeIn>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
        <FadeIn delay={0.4} direction="up" fullWidth>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight active:scale-[0.98]">
              View full resume
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </a>
        </FadeIn>

        <FadeIn delay={0.5} direction="up" fullWidth>
          <a href={downloadUrl} download className="w-full">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight active:scale-[0.98]">
              Download
              <Download className="w-4 h-4" />
            </button>
          </a>
        </FadeIn>
      </div>
    </div>
  );
}
