"use client";

import { portfolioData } from "@/data/portfolio";
import FadeIn from "@/components/animations/FadeIn";

export default function MoviesPage() {
  const movies = portfolioData.favoriteMovies || [];

  return (
    <div className="px-4 pt-10 pb-12 w-full">
      {/* Header section */}
      <div className="mb-10 space-y-1">
        <FadeIn delay={0.1} direction="up">
          <h2 className="text-2xl font-bold tracking-tight">Movies & Series</h2>
        </FadeIn>
        <FadeIn delay={0.2} direction="up">
          <p className="text-muted-foreground text-[15px]">
            A curated list of films and series that have shaped my perspective,
            inspired creativity, or are just absolute masterpieces.
          </p>
        </FadeIn>
      </div>

      {/* Movies List */}
      <div className="flex flex-col gap-3">
        {movies.map((movie, idx) => (
          <FadeIn key={movie._id} delay={idx * 0.05} direction="up">
            <div className="flex flex-row items-center justify-between p-4 sm:p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-colors gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex flex-col min-w-0">
                  <span className="text-[16px] text-foreground font-semibold truncate block">
                    {movie.title}
                  </span>
                  <span className="text-[13px] text-muted-foreground mt-0.5 truncate block">
                    Dir. {movie.director}
                  </span>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[12px] font-semibold tracking-wider font-mono">
                  {movie.year}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
