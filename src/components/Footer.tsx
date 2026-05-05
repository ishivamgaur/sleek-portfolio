"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full max-w-3xl mx-auto mt-auto pb-8">
      <div className="px-4">
        <div className="w-full h-px bg-border my-8" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 text-[13px] font-medium">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Twitter
          </a>
          <a
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </div>

        <div className="text-[12px] text-muted-foreground text-center sm:text-right">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}.
          </p>
          <p className="mt-0.5">Designed & Built with ❤️ and Next.js</p>
        </div>
      </motion.div>
    </footer>
  );
}
