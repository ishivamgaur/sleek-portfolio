"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/widgets/ThemeToggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

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
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Permanent frosted glass background layer */}
      <div className="absolute inset-0 w-full h-full bg-background/80 backdrop-blur-md" />

      {/* Navbar Content */}
      <div className="relative max-w-3xl mx-auto px-4 py-2 md:py-3 flex items-center justify-between w-full">
        <nav className="flex items-center gap-x-6 text-[11px] md:text-xs font-medium tracking-wide">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "transition-all duration-300 py-1 rounded-md text-foreground/80 hover:text-foreground",
                pathname === item.path && "text-foreground font-semibold",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-center h-8 w-8 transition-all duration-300 rounded-md">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
