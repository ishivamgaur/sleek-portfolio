"use client";

import { motion } from "framer-motion";

import { portfolioData } from "@/data/portfolio";

export default function MoviesPage() {
  const movies = portfolioData.favoriteMovies || [];

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
        <h2 className="text-2xl font-bold tracking-tight">Favorite Movies</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          A curated list of films that have shaped my perspective, inspired
          creativity, or are just absolute masterpieces.
        </p>
      </motion.div>

      {/* Movies List */}
      <div className="flex flex-col gap-3">
        {movies.map((movie, idx) => (
          <motion.div
            key={movie._id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-colors gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[16px] text-foreground font-semibold">
                  {movie.title}
                </span>
                <span className="text-[13px] text-muted-foreground mt-0.5">
                  Dir. {movie.director}
                </span>
              </div>
            </div>

            <div className="flex items-center sm:justify-end ml-14 sm:ml-0">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-semibold tracking-wider font-mono">
                {movie.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
