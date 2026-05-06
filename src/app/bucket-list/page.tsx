"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function BucketListPage() {
  const list = portfolioData.bucketList || [];

  const completedCount = list.filter((item) => item.completed).length;
  const progress =
    list.length > 0 ? Math.round((completedCount / list.length) * 100) : 0;

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
        <h2 className="text-2xl font-bold tracking-tight">The 100 List</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          Not exactly 100, but a continuously growing bucket list of things I
          want to build, experience, and achieve in my lifetime.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="flex flex-col gap-10">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-5 bg-secondary/5 border border-dashed border-border rounded-xl flex flex-col gap-3"
        >
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-foreground/80">
              Life Progress
            </span>
            <span className="text-muted-foreground font-mono">
              {completedCount} / {list.length}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-primary"
            />
          </div>
        </motion.div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((item, idx) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border border-dashed transition-colors ${
                item.completed
                  ? "bg-primary/5 border-primary/30"
                  : "bg-secondary/5 border-border hover:bg-secondary/10"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {item.completed ? (
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/30" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span
                  className={`text-[15px] leading-snug ${
                    item.completed
                      ? "text-foreground font-medium line-through decoration-primary/30"
                      : "text-foreground/90 font-medium"
                  }`}
                >
                  {idx + 1}. {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
