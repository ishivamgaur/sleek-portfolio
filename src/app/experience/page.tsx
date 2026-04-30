"use client";

import { motion } from "framer-motion";
import useSWR from "swr";
import { fetchExperiences, ExperienceData } from "@/services/api";
import { ExperienceItem } from "@/components/ExperienceItem";

export default function ExperiencePage() {
  const { data: experiences = [], isLoading } = useSWR<ExperienceData[]>(
    "/api/experiences",
    fetchExperiences,
  );

  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <div className="px-4 pt-24 pb-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">
          Professional Experience
        </h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          A detailed overview of my professional journey and technical
          expertise.
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="size-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
        </div>
      ) : sortedExperiences.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No experience entries found.
        </p>
      ) : (
        <div className="space-y-16">
          {sortedExperiences.map((exp, idx) => (
            <ExperienceItem
              key={exp._id || String(idx)}
              story={exp as any}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
}
