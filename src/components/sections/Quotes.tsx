"use client";

import { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { QUOTES } from "@/data/portfolio";

export default function Quotes() {
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    let unseenQuotes: number[] = [];
    try {
      const stored = localStorage.getItem("unseenQuotes");
      if (stored) unseenQuotes = JSON.parse(stored);
    } catch (e) {}

    // If all quotes have been shown, reset the pool
    if (!Array.isArray(unseenQuotes) || unseenQuotes.length === 0) {
      unseenQuotes = Array.from({ length: QUOTES.length }, (_, i) => i);
    }

    // Pick a random index from the unseen pool
    const randomPosition = Math.floor(Math.random() * unseenQuotes.length);
    const chosenIndex = unseenQuotes[randomPosition];

    // Remove the chosen index from the unseen pool
    unseenQuotes.splice(randomPosition, 1);

    // Save the updated pool back to localStorage
    localStorage.setItem("unseenQuotes", JSON.stringify(unseenQuotes));

    setQuoteIndex(chosenIndex);
    setMounted(true);
  }, []);

  const currentQuote = mounted
    ? QUOTES[quoteIndex]
    : { text: " ", author: " " };

  return (
    <div className="w-full flex flex-col items-center">
      <FadeIn className="w-full">
        <div className="flex items-start gap-4 p-5 pb-10 rounded-2xl bg-secondary/5 hover:bg-secondary/10 transition-colors border border-dashed border-border relative overflow-hidden">
          {/* Stylish Text-based Quote Watermark */}
          <div className="absolute -top-10 -left-0 text-[280px] leading-none font-serif text-primary/10 select-none pointer-events-none">
            &ldquo;
          </div>
          <div className="relative z-10 flex flex-col w-full">
            <p className="text-[15px] sm:text-[17px] text-foreground/80 italic leading-relaxed font-medium">
              "{currentQuote.text}"
            </p>
          </div>

          <div className="absolute bottom-3 right-5 flex items-center gap-2 opacity-60">
            <div className="w-5 h-px bg-primary/40" />
            <span className="text-[12px] font-bold text-muted-foreground tracking-[0.2em]">
              {currentQuote.author}
            </span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
