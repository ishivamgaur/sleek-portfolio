"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function ExperiencePage() {
  const stories = useSelector((state: RootState) => state.portfolio.stories);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-24 pb-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
        <p className="text-muted-foreground mt-2">My journey and milestones in software development.</p>
      </motion.div>

      {stories.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No experience entries found.</p>
      ) : (
        <div className="relative border-l border-border/50 pl-6 md:pl-8 ml-4 md:ml-6 space-y-12">
          {stories.map((story, idx) => (
            <motion.div
              key={story.id}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <span className="absolute -left-[33px] md:-left-[41px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-primary/80 font-mono font-medium tracking-wide">
                  {new Date(story.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <h3 className="text-xl font-semibold tracking-tight">{story.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-[15px]">
                  {story.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
