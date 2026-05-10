"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  FolderGit2,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { portfolioData } from "@/data/portfolio";

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [imgError, setImgError] = useState(false);
  const videoRef = useRef<HTMLImageElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (
      videoRef.current &&
      videoRef.current.complete &&
      videoRef.current.naturalWidth === 0
    ) {
      setImgError(true);
    }
    if (
      thumbRef.current &&
      thumbRef.current.complete &&
      thumbRef.current.naturalWidth === 0
    ) {
      setImgError(true);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const project = portfolioData.projects.find((item) => item._id === params.id);

  if (!project) {
    return (
      <div className="px-4 pt-24 pb-12 w-full flex flex-col space-y-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Project not found
          </h2>
          <p className="text-muted-foreground mt-2 text-[15px]">
            This project is not available anymore.
          </p>
        </div>
      </div>
    );
  }

  const projectContent = project.content || project.description;
  const projectFeatures = project.features || [];
  const githubUrl =
    project.github ||
    (project.link?.includes("github.com") ? project.link : undefined);

  return (
    <div className="px-4 pt-24 pb-12 w-full flex flex-col space-y-8">
      <FadeIn delay={0.1} direction="up">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>
      </FadeIn>

      <div className="space-y-6">
        <div className="space-y-1">
          <FadeIn delay={0.15} direction="up">
            <h2 className="text-2xl font-bold tracking-tight">
              {project.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} direction="up">
            <p className="text-muted-foreground mt-1 text-[15px]">
              {project.description}
            </p>
          </FadeIn>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <FadeIn key={tag} delay={0.25 + idx * 0.05} direction="up">
                <Badge
                  variant="secondary"
                  className="bg-secondary/40 font-medium px-2.5 py-0.5 text-[11px] rounded-md border-none"
                >
                  {tag}
                </Badge>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} direction="up">
            <div className="flex items-center gap-6 text-[13px]">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <GitBranch className="w-4 h-4 text-primary/60" /> Source
                </a>
              )}
              {project.link && project.link !== githubUrl && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4 text-primary/60" /> Visit
                  Site
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.5} direction="up">
        <div className="w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-secondary/5 border border-dashed border-border relative">
          {project.videoUrl && !imgError ? (
            <img
              ref={videoRef}
              src={project.videoUrl}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : project.thumbnailUrl && !imgError ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/40 via-muted to-secondary/10 shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-background/50 flex items-center justify-center shadow-sm mb-4 backdrop-blur-sm">
                <FolderGit2 className="w-8 h-8 text-muted-foreground/70" />
              </div>
              <span className="text-xs font-bold text-muted-foreground/50 tracking-widest uppercase">
                Project Preview
              </span>
            </div>
          )}
        </div>
      </FadeIn>

      <div className="w-full space-y-10 pt-4">
        <div className="flex flex-col space-y-4">
          {projectContent.split("\n\n").map((paragraph, i) => (
            <FadeIn key={i} delay={0.6 + i * 0.1} direction="up">
              <div className="text-[16px] text-foreground/90 leading-relaxed">
                {paragraph}
              </div>
            </FadeIn>
          ))}
        </div>

        {projectFeatures.length > 0 && (
          <div className="space-y-4">
            <FadeIn delay={0.7} direction="up">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">
                Key Features
              </h3>
            </FadeIn>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectFeatures.map((feature, idx) => (
                <FadeIn key={idx} delay={0.75 + idx * 0.05} direction="up">
                  <li className="flex items-start bg-secondary/5 p-4 rounded-xl border border-dashed border-border h-full">
                    <div className="w-1 h-1 rounded-full bg-foreground/30 mt-[0.65em] shrink-0 mr-3" />
                    <span className="leading-snug text-[14px] text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </div>
        )}
      </div>

      <FadeIn delay={0.9} direction="up">
        <div className="pt-16 pb-4 flex justify-center mt-auto">
          <button
            onClick={scrollToTop}
            className="text-[13px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            Back to top
            <ArrowUpRight className="w-4 h-4 -rotate-45" />
          </button>
        </div>
      </FadeIn>
    </div>
  );
}
