"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Personal() {
  return (
    <section className="px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">Personal</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          More about who I am beyond the code. My life goals and favorite films.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {/* 100 List Card */}
        <Link href="/bucket-list">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="group flex items-center justify-between p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer w-full"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-foreground">
                  The 100 List
                </h3>
                <p className="text-[13px] text-muted-foreground leading-snug hidden sm:block">
                  My bucket list of life goals and experiences.
                </p>
              </div>
            </div>
            <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </motion.div>
        </Link>

        {/* Favorite Movies Card */}
        <Link href="/movies">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="group flex items-center justify-between p-5 rounded-xl border border-dashed border-border bg-secondary/5 hover:bg-secondary/10 transition-all cursor-pointer w-full"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h3 className="text-[16px] font-semibold text-foreground">
                  Favorite Movies
                </h3>
                <p className="text-[13px] text-muted-foreground leading-snug hidden sm:block">
                  A curated selection of films that inspire me.
                </p>
              </div>
            </div>
            <div className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
