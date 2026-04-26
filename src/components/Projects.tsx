"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard, Project } from "./ProjectCard";

export default function Projects() {
  const { data, error } = useSWR<Project[]>("/projects", fetcher);

  // Fallback data if DB fails or is empty
  const fallbackProjects: Project[] = [
    {
      _id: "1",
      title: "Portfolio Website",
      description:
        "A sleek, modern portfolio website built with Next.js, Tailwind CSS, and Framer Motion for ultra-smooth animations.",
      tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
      link: "https://github.com/ishivamgaur",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1507238692062-8e0ec06eadec?q=80&w=600&auto=format&fit=crop",
      videoUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2FjcW12cm1oN2w3bWZlaDN0cWRzYWw3ZG5qamJpMmtwd2Rla2RkMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPEqDGUULpEU0aQ/giphy.gif",
    },
    {
      _id: "2",
      title: "Full Stack E-Commerce",
      description:
        "A complete MERN stack e-commerce platform with Stripe integration, Redux state management, and an admin dashboard.",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600&auto=format&fit=crop",
      videoUrl:
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm9sZnV6aXk0a2E2YzEwZWh3OTI3YzEwaHRrZWV5NWE4ZWY0YzMwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jIGsO4/giphy.gif",
    },
    {
      _id: "3",
      title: "AI Chat Application",
      description:
        "Real-time AI chat application leveraging WebSockets and OpenAI's API for intelligent conversation capabilities.",
      tags: ["OpenAI", "Socket.io", "React", "Node.js"],
      thumbnailUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const projects = data && data.length > 0 ? data : fallbackProjects;

  // Show only top 2 projects on the homepage grid
  const displayedProjects = projects.slice(0, 2);

  if (!data && !error) {
    return (
      <section className="px-4 py-8 space-y-6">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-1 text-[15px]">
            A showcase of my recent work and side projects.
          </p>
        </div>
        <div className="flex flex-col gap-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-muted/50 rounded-2xl w-full" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          Hover to play video previews. Click to view full details.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProjects?.map((project, idx) => (
          <ProjectCard key={project._id} project={project} idx={idx} />
        ))}
      </div>

      {projects.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight shadow-sm active:scale-[0.98]">
              View all projects
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
