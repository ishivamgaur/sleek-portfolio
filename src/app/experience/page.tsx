"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExperienceItem } from "@/components/ExperienceItem";

export default function ExperiencePage() {
  const stories = useSelector((state: RootState) => state.portfolio.stories);

  return (
    <div className="px-4 pt-24 pb-12 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">Professional Experience</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">A detailed overview of my professional journey and technical expertise.</p>
      </motion.div>

      {stories.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No experience entries found.</p>
      ) : (
        <div className="space-y-16">
          {stories.map((story, idx) => (
            <ExperienceItem key={story.id} story={story} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
