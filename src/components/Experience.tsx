"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExperienceItem } from "./ExperienceItem";

export default function Experience() {
  const experiences = portfolioData.experiences;

  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  // Show only top 2 on home page
  const displayedExperiences = sortedExperiences.slice(0, 2);

  return (
    <section className="px-4">
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
            story={exp}
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
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[13px] md:text-[14px] font-bold tracking-tight active:scale-95 group/btn cursor-pointer">
              View full experience
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
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
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}
