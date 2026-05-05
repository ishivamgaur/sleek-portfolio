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
    <section className="px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedProjects?.map((project, idx) => (
          <ProjectCard
            key={project._id}
            project={project}
            idx={idx}
            showBullets={false}
          />
        ))}
      </div>

      {projects.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 flex justify-center"
        >
          <Link href="/projects" className="w-full sm:w-auto">
            <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[13px] md:text-[14px] font-bold tracking-tight active:scale-95 group/btn cursor-pointer">
              View all projects
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
