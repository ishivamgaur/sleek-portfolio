"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, MonitorPlay } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  content?: string; // For the detailed description page
}

export function ProjectCard({
  project,
  idx,
  showDescription = true,
  showBullets = true,
}: {
  project: Project;
  idx: number;
  showDescription?: boolean;
  showBullets?: boolean;
}) {
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (
      imgRef.current &&
      imgRef.current.complete &&
      imgRef.current.naturalWidth === 0
    ) {
      setImgError(true);
    }
  }, []);

  return (
    <Link href={`/projects/${project._id}`} className="block">
      <FadeIn delay={idx * 0.05} direction="up" fullWidth>
        <div className="group relative flex flex-col cursor-pointer h-full">
          {/* The Video Thumbnail */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border">
            {!project.thumbnailUrl || imgError ? (
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/40 via-muted to-secondary/10 border border-border shadow-inner">
                <div className="w-14 h-14 rounded-2xl bg-background/50 flex items-center justify-center shadow-sm mb-3 backdrop-blur-sm">
                  <MonitorPlay className="w-7 h-7 text-muted-foreground/70" />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground/50 tracking-widest uppercase">
                  Project Preview
                </span>
              </div>
            ) : (
              <img
                ref={imgRef}
                src={project.thumbnailUrl}
                alt={project.title}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
            )}

            {/* Video/GIF Hover Overlay */}
            {project.videoUrl && (
              <img
                src={project.videoUrl}
                alt={`${project.title} preview`}
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Title, Description & Tags */}
          <div className="flex flex-col mt-4 px-1 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              {project.link && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(project.link, "_blank", "noopener,noreferrer");
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors z-10"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {showDescription && (
              <div className="text-[14px] text-muted-foreground leading-relaxed mt-2 flex flex-col gap-1">
                {project.description.split("\n").map((line, i) => {
                  const cleanLine = line.replace(/^[•◦-]\s*/, "").trim();
                  if (!cleanLine) return null;
                  return (
                    <FadeIn key={i} delay={idx * 0.05 + i * 0.04} direction="up">
                      <span className="flex gap-2">
                        {showBullets && (
                          <div className="w-1 h-1 rounded-full bg-foreground/30 mt-[0.65em] shrink-0" />
                        )}
                        {cleanLine}
                      </span>
                    </FadeIn>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.slice(0, 3).map((tag, tIdx) => (
                <FadeIn
                  key={tag}
                  delay={idx * 0.05 + 0.1 + tIdx * 0.03}
                  direction="up"
                >
                  <Badge
                    variant="secondary"
                    className="bg-secondary/40 hover:bg-secondary/60 font-medium px-2 py-0.5 text-[11px] rounded-md"
                  >
                    {tag}
                  </Badge>
                </FadeIn>
              ))}
              {project.tags.length > 3 && (
                <FadeIn delay={idx * 0.05 + 0.2} direction="up">
                  <Badge
                    variant="outline"
                    className="text-[11px] rounded-md px-2 py-0.5"
                  >
                    +{project.tags.length - 3}
                  </Badge>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </Link>
  );
}
