"use client";

import { useState, useEffect } from "react";
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
  defaultExpanded = false,
}: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const allBullets = story.content.split("\n").filter((line) => line.trim());

  return (
    <div className="flex flex-col space-y-2 group/toggle">
      {/* Header Section */}
      <FadeIn margin="-50px" className="flex flex-col space-y-0.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center min-w-0 flex-1">
            <div
              className="flex items-center gap-2 cursor-pointer max-w-full"
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
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] md:text-[14px] text-muted-foreground/80 font-medium mt-0.5">
              <span className="inline sm:hidden">
                {formatDateShort(story.startDate)} —{" "}
                {story.date === "Current"
                  ? "Current"
                  : formatDateShort(story.date)}
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

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ 
              height: !hasMounted && defaultExpanded ? "auto" : 0, 
              opacity: !hasMounted && defaultExpanded ? 1 : 0 
            }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-5 flex flex-col space-y-6">
              {/* Tech Stack */}
              {showTech && story.tech && story.tech.length > 0 && (
                <div className="space-y-2">
                  <FadeIn>
                    <h4 className="text-[13px] font-bold text-foreground/80">
                      Technologies & Tools
                    </h4>
                  </FadeIn>
                  <div className="pt-0.5 pb-0.5">
                    <TechDock tech={story.tech} />
                  </div>
                </div>
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
                      delay={i * 0.03}
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
const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const CUSTOM_ICONS: Record<string, { url: string; invertInDarkMode?: boolean }> = {
  "shadcn ui": {
    url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shadcnui.svg",
    invertInDarkMode: true,
  },
  "framer motion": {
    url: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg",
    invertInDarkMode: true,
  },
  "aceternity ui": {
    url: "https://ui.aceternity.com/apple-icon.png",
    invertInDarkMode: true,
  },
};

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
  github: ["github", "original"],
  mongoose: ["mongoose", "original"],
  websockets: ["socketio", "original"],
  "next.js": ["nextjs", "original"],
  aws: ["amazonwebservices", "original-wordmark"],
  nginx: ["nginx", "original"],
};

const getIconData = (name: string) => {
  const lowerName = name.toLowerCase();
  
  if (CUSTOM_ICONS[lowerName]) {
    return CUSTOM_ICONS[lowerName];
  }

  const entry = DEVICON_SLUGS[lowerName];
  if (entry) {
    return { url: `${DEVICON_BASE}/${entry[0]}/${entry[0]}-${entry[1]}.svg` };
  }

  const slug = lowerName.replace(/[.\s]/g, "");
  return { url: `${DEVICON_BASE}/${slug}/${slug}-original.svg` };
};

function TechDock({ tech }: { tech: string[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      layout
      className="flex flex-wrap gap-2 items-center min-h-[34px]"
      onMouseLeave={() => setHoveredIndex(null)}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {tech.map((t, i) => {
        const isHovered = hoveredIndex === i;
        const iconData = getIconData(t);

        return (
          <FadeIn key={i} delay={i * 0.03} direction="up" layout={true}>
            <motion.div
              layout
              onMouseEnter={() => setHoveredIndex(i)}
              className="relative flex items-center h-[26px] sm:h-[30px] rounded-lg border border-dashed border-border cursor-pointer bg-secondary/5 overflow-hidden px-1.5"
              animate={{
                backgroundColor: isHovered
                  ? "rgba(var(--secondary), 0.1)"
                  : "rgba(var(--secondary), 0.05)",
              }}
              transition={{
                layout: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
              }}
            >
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center shrink-0">
                <img
                  src={iconData.url}
                  alt={t}
                  className={`w-full h-full object-contain ${iconData.invertInDarkMode ? "dark:invert" : ""}`}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t)}&background=333&color=fff&size=48&rounded=true&font-size=0.4&bold=true`;
                  }}
                />
              </div>

              <motion.div
                initial={false}
                animate={{
                  width: isHovered ? "auto" : 0,
                  opacity: isHovered ? 1 : 0,
                  marginLeft: isHovered ? 8 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden flex items-center"
              >
                <span className="text-[11px] sm:text-[13px] font-bold tracking-tight whitespace-nowrap text-foreground/80">
                  {t}
                </span>
              </motion.div>
            </motion.div>
          </FadeIn>
        );
      })}
    </motion.div>
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
