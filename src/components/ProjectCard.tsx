"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, MonitorPlay } from "lucide-react";
import Link from "next/link";

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
}: {
  project: Project;
  idx: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/projects/${project._id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: idx * 0.1 }}
        className="group relative flex flex-col cursor-pointer h-full"
      >
        {/* The Video Thumbnail */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted/30 border border-border/40">
          {!project.thumbnailUrl || imgError ? (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/40 via-muted to-secondary/10 border border-border/50 shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-background/50 flex items-center justify-center shadow-sm mb-3 backdrop-blur-sm">
                <MonitorPlay className="w-7 h-7 text-muted-foreground/70" />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground/50 tracking-widest uppercase">
                Project Preview
              </span>
            </div>
          ) : (
            <img
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
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="w-5 h-5" />
              </a>
            )}
          </div>

          <p className="text-[14px] text-muted-foreground leading-snug mt-1.5 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/40 hover:bg-secondary/60 font-medium px-2 py-0.5 text-[11px] rounded-md"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-[11px] rounded-md px-2 py-0.5"
              >
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
