"use client";

import { motion } from "framer-motion";

export default function ResumeHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-10"
    >
      <h2 className="text-2xl font-bold tracking-tight">Resume</h2>
      <p className="text-muted-foreground mt-1 text-[15px]">
        A detailed overview of my professional qualifications and background.
      </p>
    </motion.div>
  );
}
