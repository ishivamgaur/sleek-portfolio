"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Stories() {
  const stories = useSelector((state: RootState) => state.portfolio.stories);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStoryIdx !== null) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 50); // 5 seconds total (100 * 50ms)
    }
    return () => clearInterval(interval);
  }, [activeStoryIdx]);

  const handleNext = () => {
    if (activeStoryIdx !== null) {
      if (activeStoryIdx < stories.length - 1) {
        setActiveStoryIdx(activeStoryIdx + 1);
      } else {
        setActiveStoryIdx(null);
      }
    }
  };

  const handlePrev = () => {
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
    }
  };

  if (stories.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {stories.map((story, idx) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-1 cursor-pointer min-w-[80px]"
            onClick={() => setActiveStoryIdx(idx)}
          >
            <div className="p-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-indigo-500 transition-transform hover:scale-105 active:scale-95">
              <div className="p-[2px] bg-background rounded-full">
                <Avatar className="w-16 h-16 border-0">
                  <AvatarImage src={story.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${story.title}`} />
                  <AvatarFallback>{story.title.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <span className="text-xs font-medium truncate w-full text-center text-muted-foreground">
              {story.title}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeStoryIdx !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
          >
            <div className="relative w-full max-w-lg aspect-[9/16] bg-muted rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Progress Bar */}
              <div className="absolute top-4 inset-x-4 flex gap-1 z-20">
                {stories.map((_, idx) => (
                  <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-50 linear"
                      style={{ 
                        width: idx < activeStoryIdx ? '100%' : idx === activeStoryIdx ? `${progress}%` : '0%' 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="absolute top-8 inset-x-4 flex items-center justify-between z-20 text-white">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border border-white/20">
                    <AvatarImage src={stories[activeStoryIdx].imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${stories[activeStoryIdx].title}`} />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{stories[activeStoryIdx].title}</p>
                    <p className="text-[10px] opacity-70">{stories[activeStoryIdx].date}</p>
                  </div>
                </div>
                <button onClick={() => setActiveStoryIdx(null)} className="p-1 hover:bg-white/10 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 relative bg-black flex items-center justify-center">
                {stories[activeStoryIdx].imageUrl ? (
                  <img 
                    src={stories[activeStoryIdx].imageUrl} 
                    alt={stories[activeStoryIdx].title} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center text-center">
                    <p className="text-2xl font-bold text-white leading-tight">
                      {stories[activeStoryIdx].content}
                    </p>
                  </div>
                )}
                
                {/* Overlay Content if image exists */}
                {stories[activeStoryIdx].imageUrl && (
                  <div className="absolute bottom-12 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="text-lg font-medium leading-relaxed">
                      {stories[activeStoryIdx].content}
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity"
                disabled={activeStoryIdx === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Tap zones for mobile */}
              <div className="absolute inset-0 flex z-10 md:hidden">
                <div className="w-1/3 h-full" onClick={handlePrev} />
                <div className="w-2/3 h-full" onClick={handleNext} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
