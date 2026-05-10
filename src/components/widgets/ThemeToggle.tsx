"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const currentTheme = resolvedTheme ?? "dark";

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "x") {
        e.preventDefault();
        setTheme(currentTheme === "light" ? "dark" : "light");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentTheme, setTheme]);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(currentTheme === "light" ? "dark" : "light")
            }
            className="rounded-full hover:bg-transparent dark:hover:bg-transparent cursor-pointer h-7 w-7 md:h-8 md:w-8 relative overflow-hidden"
          />
        }
      >
        <div className="relative h-[1.2rem] w-[1.2rem] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {currentTheme === "light" ? (
              <motion.div
                key="sun"
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <span className="sr-only">Toggle theme</span>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-2">
        <span>Toggle theme</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>X
        </kbd>
      </TooltipContent>
    </Tooltip>
  );
}
