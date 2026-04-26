"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  FolderGit2,
  GitBranch,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const project = {
    _id: params.id,
    title: "Portfolio Website",
    description:
      "A sleek, modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion for ultra-smooth animations.",
    content:
      "This project was built to challenge the standard 'card grid' portfolio layouts by introducing a more editorial, minimal aesthetic. The goal was to create a highly performant, accessible, and visually striking platform to showcase professional work without relying on cluttered UI elements.\n\nThe technical implementation utilizes the brand new Next.js App Router for optimal performance, Framer Motion for scroll-triggered entrance animations, and Tailwind CSS for rapid styling.",
    features: [
      "Designed and developed a custom design system with CSS Variables and Tailwind.",
      "Implemented a resilient fallback system for missing media assets with premium visuals.",
      "Integrated Framer Motion for buttery-smooth scroll and layout animations.",
      "Optimized Next.js App Router for exceptional 100/100 Lighthouse performance scores.",
    ],
    tags: [
      "Next.js",
      "React",
      "Tailwind",
      "Framer Motion",
      "TypeScript",
      "Vercel",
    ],
    link: "https://portfolio.shivamgaur.com",
    github: "https://github.com/ishivamgaur",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507238692062-8e0ec06eadec?q=80&w=1200&auto=format&fit=crop",
    videoUrl:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FjcW12cm1oN2w3bWZlaDN0cWRzYWw3ZG5qamJpMmtwd2Rla2RkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif",
  };

  return (
    <div className="px-4 pt-24 pb-12 w-full flex flex-col space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to projects
      </Link>

      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none">
            {project.title}
          </h1>
          <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[90%]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-secondary/40 font-medium px-2.5 py-0.5 text-[11px] rounded-md border-none"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-6 text-[13px]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <GitBranch className="w-4 h-4 text-primary/60" /> Source
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4 text-primary/60" /> Visit Site
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-muted/30 border border-border/40 relative shadow-2xl">
        {project.videoUrl ? (
          <img
            src={project.videoUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : project.thumbnailUrl ? (
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FolderGit2 className="w-10 h-10 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <div className="w-full space-y-10 pt-4">
        <div className="text-[16px] text-foreground/90 leading-relaxed whitespace-pre-wrap">
          {project.content}
        </div>

        {project.features && project.features.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start bg-secondary/10 p-4 rounded-xl border border-border/20"
                >
                  <span className="mr-3 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                  <span className="leading-snug text-[14px] text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-16 pb-4 flex justify-center mt-auto">
        <button
          onClick={scrollToTop}
          className="text-[13px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
        >
          Back to top
          <ArrowUpRight className="w-4 h-4 -rotate-45" />
        </button>
      </div>
    </div>
  );
}
