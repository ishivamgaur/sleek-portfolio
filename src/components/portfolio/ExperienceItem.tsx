"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExperienceData } from "@/services/api";
import { ChevronRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

interface ExperienceItemProps {
  story: ExperienceData;
  index: number;
  showTech?: boolean;
  defaultExpanded?: boolean;
}

export function ExperienceItem({
  story,
  index,
  showTech = true,
  defaultExpanded,
}: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const allBullets = story.content.split("\n").filter((line) => line.trim());

  return (
    <div className="flex flex-col space-y-2 group/toggle">
      {/* Header Section */}
      <FadeIn margin="-50px" className="flex flex-col space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <div
            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <h3 className="text-[16px] md:text-[17px] font-bold tracking-tight text-foreground leading-tight truncate group-hover/toggle:text-primary transition-colors">
              {story.company}
            </h3>
            <div className="p-0.5 rounded-md bg-secondary/5 border border-border/30 text-muted-foreground group-hover/toggle:text-primary group-hover/toggle:bg-primary/5 group-hover/toggle:border-primary/20 transition-all duration-300 opacity-100 sm:opacity-0 sm:group-hover/toggle:opacity-100 shrink-0">
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </motion.div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] md:text-[14px] text-muted-foreground/80 font-medium mt-0.5">
              <span className="inline sm:hidden">
                {formatDateShort(story.startDate)} —{" "}
                {story.date === "Current" ? "Current" : formatDateShort(story.date)}
              </span>
              <span className="hidden sm:inline">
                {formatDate(story.startDate)} —{" "}
                {story.date === "Current" ? "Current" : formatDate(story.date)}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] md:text-[14px] font-medium text-foreground/60">
            {story.role}
          </p>
          <p className="text-[11px] md:text-[14px] text-muted-foreground/60 font-medium shrink-0">
            <span className="inline sm:hidden">
              {story.shortLocation || story.location}
            </span>
            <span className="hidden sm:inline">{story.location}</span>
          </p>
        </div>
      </FadeIn>

      {/* Expandable Content Section */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-5 flex flex-col space-y-6">
              {/* Tech Stack */}
              {showTech && story.tech && story.tech.length > 0 && (
                <FadeIn className="space-y-2">
                  <h4 className="text-[13px] font-bold text-foreground/80">
                    Technologies & Tools
                  </h4>
                  <div className="pt-0.5 pb-0.5">
                    <TechDock tech={story.tech} />
                  </div>
                </FadeIn>
              )}

              {/* Achievements */}
              <div className="space-y-2.5">
                <FadeIn className="text-[13px] font-bold text-foreground/80">
                  Key Contributions & Achievements
                </FadeIn>
                <div className="flex flex-col space-y-3">
                  {allBullets.map((bullet, i) => (
                    <FadeIn
                      key={i}
                      delay={i * 0.05}
                      className="flex gap-2 text-muted-foreground leading-normal text-[14px]"
                    >
                      <div className="w-1 h-1 rounded-full bg-foreground/30 mt-[0.65em] shrink-0" />
                      <span>{bullet.trim()}</span>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Devicon Integration
const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const DEVICON_SLUGS: Record<string, [string, string]> = {
  react: ["react", "original"],
  "node.js": ["nodejs", "original"],
  mongodb: ["mongodb", "original"],
  express: ["express", "original"],
  tailwind: ["tailwindcss", "original"],
  typescript: ["typescript", "original"],
  javascript: ["javascript", "original"],
  redux: ["redux", "original"],
  graphql: ["graphql", "plain"],
  jest: ["jest", "plain"],
  postman: ["postman", "original"],
  html5: ["html5", "original"],
  css3: ["css3", "original"],
  git: ["git", "original"],
  mongoose: ["mongoose", "original"],
  websockets: ["socketio", "original"],
};

const getIconUrl = (name: string) => {
  const entry = DEVICON_SLUGS[name.toLowerCase()];
  if (entry) return `${DEVICON_BASE}/${entry[0]}/${entry[0]}-${entry[1]}.svg`;
  const slug = name.toLowerCase().replace(/[.\s]/g, "");
  return `${DEVICON_BASE}/${slug}/${slug}-original.svg`;
};

function TechDock({ tech }: { tech: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="flex flex-wrap gap-2.5 items-center"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {tech.map((t, i) => {
        const isHovered = hoveredIndex === i;
        const isSomethingHovered = hoveredIndex !== null;
        const iconUrl = getIconUrl(t);

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className="relative flex items-center justify-center"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  className="h-[24px] w-[24px] md:h-[28px] md:w-[28px] p-[5px] cursor-pointer flex items-center justify-center rounded-md bg-secondary/5 border border-dashed border-border"
                  animate={{
                    scale: isHovered ? 1.25 : 1,
                    opacity: isSomethingHovered && !isHovered ? 0.4 : 1,
                    y: isHovered ? -2 : 0,
                  }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
                >
                  <img
                    src={iconUrl}
                    alt={t}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=333&color=fff&size=48&rounded=true&font-size=0.4&bold=true`;
                    }}
                  />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>{t}</TooltipContent>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(dateStr: string) {
  if (!dateStr || dateStr === "Current") return dateStr;
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}

function formatDateShort(dateStr: string) {
  if (!dateStr || dateStr === "Current") return dateStr;
  try {
    const date = new Date(dateStr);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  } catch (e) {
    return dateStr;
  }
}
