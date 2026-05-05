"use client";

import { motion } from "framer-motion";

export default function Quotes() {
  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="flex items-start gap-4 p-5 pb-9 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors border border-dashed border-border relative overflow-hidden">
          {/* Stylish Text-based Quote Watermark */}
          <div className="absolute -top-5 -left-1 text-[280px] leading-none font-serif text-primary/10 select-none pointer-events-none">
            &ldquo;
          </div>
          <div className="relative z-10 flex flex-col w-full">
            <p className="text-[15px] sm:text-[17px] text-foreground/80 italic leading-relaxed font-medium">
              "The only way to do great work is to love what you do. Stay
              hungry, stay foolish."
            </p>
          </div>

          <div className="absolute bottom-4 right-5 flex items-center gap-2 opacity-60">
            <div className="w-5 h-px bg-primary/40" />
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
              Steve Jobs
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
