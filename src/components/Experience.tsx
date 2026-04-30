"use client";

import { motion } from "framer-motion";
import useSWR from "swr";
import { fetchExperiences, ExperienceData } from "@/services/api";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExperienceItem } from "./ExperienceItem";

export default function Experience() {
  const { data: experiences = [], isLoading } = useSWR<ExperienceData[]>(
    "/api/experiences",
    fetchExperiences,
  );

  if (isLoading) return null; // or a shimmer
  if (experiences.length === 0) return null;

  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Show only top 2 on home page
  const displayedExperiences = sortedExperiences.slice(0, 2);

  return (
    <section className="px-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          My professional journey and milestones.
        </p>
      </motion.div>

      <div className="space-y-12">
        {displayedExperiences.map((exp, idx) => (
          <ExperienceItem
            key={exp._id || String(idx)}
            story={exp as any}
            index={idx}
          />
        ))}
      </div>

      {sortedExperiences.length > 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/experience" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-200 text-sm font-bold tracking-tight shadow-sm active:scale-[0.98]">
              View full experience
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      )}
    </section>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr || dateStr === "Current") return dateStr;
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  } catch (e) {
    return dateStr;
  }
}
