"use client";

import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Personal() {
  return (
    <section className="px-4">
      <FadeIn direction="up">
        <h2 className="text-[26px] font-bold tracking-tight mb-6">Personal</h2>
      </FadeIn>

      <div className="flex flex-col gap-3">
        {/* 100 List Card */}
        <Link href="/100-list">
          <FadeIn delay={0.1} direction="up">
            <div className="group flex items-center justify-between p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer w-full">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <FadeIn delay={0.1} direction="up">
                    <h3 className="text-[16px] font-semibold text-foreground">
                      The 100 List
                    </h3>
                  </FadeIn>
                  <FadeIn delay={0.15} direction="up">
                    <p className="text-[13px] text-muted-foreground leading-snug hidden sm:block">
                      My 100 list of life goals and experiences.
                    </p>
                  </FadeIn>
                </div>
              </div>
              <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </FadeIn>
        </Link>

        {/* Favorite Movies Card */}
        <Link href="/movies">
          <FadeIn delay={0.2} direction="up">
            <div className="group flex items-center justify-between p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer w-full">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <FadeIn delay={0.2} direction="up">
                    <h3 className="text-[16px] font-semibold text-foreground">
                      Favorite Movies
                    </h3>
                  </FadeIn>
                  <FadeIn delay={0.25} direction="up">
                    <p className="text-[13px] text-muted-foreground leading-snug hidden sm:block">
                      A curated selection of films that inspire me.
                    </p>
                  </FadeIn>
                </div>
              </div>
              <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </FadeIn>
        </Link>
      </div>
    </section>
  );
}
