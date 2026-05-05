"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "What I build",
    text: "Full-stack web apps with clean interfaces, practical APIs, and database-backed features that feel simple to use.",
  },
  {
    title: "How I think",
    text: "I like breaking messy problems into small systems, shipping the useful version first, then improving the details.",
  },
  {
    title: "What I care about",
    text: "Readable code, fast pages, secure auth, smooth interactions, and products that stay easy to maintain.",
  },
];

export default function About() {
  return (
    <section className="px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight">About Me</h2>
        <p className="text-muted-foreground mt-1 text-[15px]">
          A little more about how I build and what I care about.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          I am a full-stack developer focused on building useful, polished web
          experiences with React, Next.js, Node.js, and MongoDB. I enjoy working
          across the whole product layer, from shaping the UI to designing the
          API and making sure the data flow stays reliable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {highlights.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="h-full rounded-xl border border-dashed border-border bg-secondary/5 p-5 transition-colors hover:bg-secondary/10"
            >
              <h3 className="text-[16px] font-bold tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-[14px] mt-2">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
