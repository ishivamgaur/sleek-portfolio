"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        setTheme(theme === "light" ? "dark" : "light");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme, setTheme]);

  return (
    <Tooltip>
      <TooltipTrigger render={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="rounded-full hover:bg-transparent dark:hover:bg-transparent cursor-pointer h-7 w-7 md:h-8 md:w-8"
        />
      }>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
