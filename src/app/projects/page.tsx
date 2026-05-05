"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectCard, Project } from "@/components/ProjectCard";

import { portfolioData } from "@/data/portfolio";

export default function AllProjectsPage() {
  const projects = portfolioData.projects;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 pt-24 pb-12 w-full">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          A comprehensive archive of everything I&apos;ve built, open-sourced,
          or experimented with.
        </p>
      </motion.div>

      {/* Full Grid of all projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project._id}
            project={project}
            idx={idx}
            showBullets={false}
          />
        ))}
      </div>

      {/* Back to Top Button */}
      <div className="pt-12 pb-4 flex justify-center mt-auto">
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
