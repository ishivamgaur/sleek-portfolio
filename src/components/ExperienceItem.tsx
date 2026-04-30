"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExperienceData } from "@/services/api";
import { MapPin } from "lucide-react";

interface ExperienceItemProps {
  story: ExperienceData;
  index: number;
  showTech?: boolean;
}

export function ExperienceItem({
  story,
  index,
  showTech = true,
}: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex flex-col space-y-3">
        {/* Header: Company/Role & Date/Location */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[16px] md:text-[17px] font-bold tracking-tight text-foreground leading-tight min-w-0 flex-1">
              {story.company}
            </h3>
            <span className="text-[10px] md:text-[11px] text-muted-foreground/80 font-mono font-bold uppercase tracking-wider shrink-0 mt-0.5">
              {formatDate(story.startDate)} —{" "}
              {story.date === "Current" ? "Current" : formatDate(story.date)}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
            <p className="text-[13px] md:text-[14px] font-medium text-foreground/60">
              {story.role}
            </p>

            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="w-3 h-3 shrink-0 opacity-80" />
                <span className="truncate">{story.location}</span>
              </div>
              <span className="hidden md:inline">•</span>
              <span className="md:text-[10px] md:uppercase md:tracking-tight md:font-semibold">
                {story.type}
              </span>
            </div>
          </div>
        </div>

        {/* Tech Stack Icons (Focus and Fade) */}
        {showTech && story.tech && story.tech.length > 0 && (
          <div className="pt-1.5 pb-0.5">
            <TechDock tech={story.tech} />
          </div>
        )}

        {/* Description Bullets */}
        <ul className="list-disc list-outside ml-4 space-y-2">
          {story.content
            .split(".")
            .filter((line) => line.trim())
            .map((bullet, i) => (
              <li
                key={i}
                className="text-muted-foreground leading-relaxed text-[14px]"
              >
                {bullet.trim()}.
              </li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
}

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

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            className="relative"
          >
            <Tooltip>
              <TooltipTrigger
                render={
                  <motion.img
                    src={`https://skillicons.dev/icons?i=${t.toLowerCase().replace(/\.js$/, "js").replace("css3", "css").replace("html5", "html")}`}
                    alt={t}
                    className="h-5 w-5 md:h-[22px] md:w-[22px] cursor-pointer rounded-sm shadow-sm"
                    animate={{
                      scale: isHovered ? 1.25 : 1,
                      opacity: isSomethingHovered && !isHovered ? 0.4 : 1,
                      y: isHovered ? -2 : 0,
                    }}
                    transition={{
                      type: "tween",
                      ease: "easeInOut",
                      duration: 0.2,
                    }}
                  />
                }
              />
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
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
}
