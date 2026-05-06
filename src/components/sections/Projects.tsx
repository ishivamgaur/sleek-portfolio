"use client";

import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Projects() {
  const projects = portfolioData?.projects || [];

  // Show only top 2 projects on the homepage grid
  const displayedProjects = projects.slice(0, 2);

  return (
    <section className="px-4">
      <FadeIn direction="up">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Projects</h2>
      </FadeIn>

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
        <FadeIn delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link href="/projects" className="w-full sm:w-auto">
              <button className="flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[13px] md:text-[14px] font-bold tracking-tight active:scale-95 group/btn cursor-pointer">
                View all projects
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
