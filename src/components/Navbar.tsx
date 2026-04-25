"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Experience", path: "/experience" },
    { name: "Resume", path: "/resume" },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 transition-all duration-300",
      isScrolled ? "py-1.5 md:py-2" : "py-2 md:py-4"
    )}>
      <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
        <nav className="flex items-center space-x-2 md:space-x-3 text-xs md:text-sm font-bold tracking-wide">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "transition-colors px-2 md:px-4 py-1 rounded-md backdrop-blur-md shadow-sm border border-border/50",
                "bg-white/60 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/70",
                pathname === item.path ? "text-foreground" : "text-foreground/70"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="rounded-md bg-white/60 dark:bg-black/50 backdrop-blur-md shadow-sm border border-border/50 flex items-center justify-center h-7 w-7 md:w-8 md:h-8">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
