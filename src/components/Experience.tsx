"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ExperienceItem } from "./ExperienceItem";

export default function Experience() {
  const stories = useSelector((state: RootState) => state.portfolio.stories);

  if (stories.length === 0) return null;

  // Show only top 2 on home page
  const displayedStories = stories.slice(0, 2);

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
        <p className="text-muted-foreground mt-1 text-[15px]">My professional journey and milestones.</p>
      </motion.div>

      <div className="space-y-12">
        {displayedStories.map((story, idx) => (
          <ExperienceItem key={story.id} story={story} index={idx} />
        ))}
      </div>

      {stories.length > 2 && (
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
  if (!dateStr || dateStr === 'Current') return dateStr;
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  } catch (e) {
    return dateStr;
  }
}
