"use client";

import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import FadeIn from "@/components/animations/FadeIn";

export default function Experience() {
  const experiences = portfolioData.experiences || [];

  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Show only top 2 on home page
  const displayedExperiences = sortedExperiences.slice(0, 2);

  return (
    <section className="px-4">
      <FadeIn direction="up">
        <h2 className="text-2xl font-bold tracking-tight mb-6">
          Work Experience
        </h2>
      </FadeIn>

      <div className="space-y-6">
        {displayedExperiences.map((exp, idx) => (
          <ExperienceItem
            key={exp._id || String(idx)}
            story={exp}
            index={idx}
            defaultExpanded={idx === 0}
          />
        ))}
      </div>

      {sortedExperiences.length > 2 && (
        <FadeIn delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link href="/experience" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[13px] md:text-[14px] font-bold tracking-tight active:scale-95 group/btn cursor-pointer">
                View full experience
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </Link>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
