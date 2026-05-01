"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard, Project } from "./ProjectCard";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  const projects = portfolioData.projects;

  // Show only top 2 projects on the homepage grid
  const displayedProjects = projects.slice(0, 2);

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
