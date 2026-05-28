"use client";

import FadeIn from "@/components/animations/FadeIn";
import { ExperienceItem } from "@/components/portfolio/ExperienceItem";
import { portfolioData } from "@/data/portfolio";

export default function ExperiencePage() {
  const experiences = portfolioData.experiences || [];

  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="px-4 pt-10 pb-12 w-full">
      <FadeIn delay={0.1}>
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
          <p className="text-muted-foreground mt-1 text-[15px]">
            A detailed overview of my professional journey and technical
            expertise.
          </p>
        </div>
      </FadeIn>

      {sortedExperiences.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No experience entries found.
        </p>
      ) : (
        <div className="space-y-16">
          {sortedExperiences.map((exp, idx) => (
            <ExperienceItem
              key={exp._id || String(idx)}
              story={exp}
              index={idx}
              defaultExpanded={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
