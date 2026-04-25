"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Briefcase, CalendarDays, Gift, X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Hero() {
  const stories = useSelector((state: RootState) => state.portfolio.stories);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasStories = stories.length > 0;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeStoryIdx !== null && !isPaused) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext(true);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [activeStoryIdx, isPaused]);

  useEffect(() => {
    if (activeStoryIdx !== null) {
      setProgress(0);
      setIsPaused(false);
    }
  }, [activeStoryIdx]);

  const handleNext = (isAuto = false) => {
    if (activeStoryIdx !== null) {
      if (activeStoryIdx < stories.length - 1) {
        setActiveStoryIdx(activeStoryIdx + 1);
      } else if (isAuto) {
        setActiveStoryIdx(null);
      }
    }
  };

  const handlePrev = () => {
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
    }
  };

  return (
    <section className="relative w-full overflow-hidden pb-4">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full bg-muted/30 relative">
        <img 
          src="/banner.jpg" 
          alt="Banner" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.classList.add('bg-gradient-to-b', 'from-slate-800', 'to-black');
          }}
        />
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4">
        {/* Avatar & Action Button Row */}
        <div className="flex justify-between items-start -mt-16 md:-mt-20 mb-4 relative z-10">
          <div 
            className={`p-[3px] rounded-full transition-transform active:scale-95 ${hasStories ? 'bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-indigo-500 cursor-pointer' : ''}`}
            onClick={() => hasStories && setActiveStoryIdx(0)}
          >
            <Avatar className="w-32 h-32 md:w-38 md:h-38 border-4 border-background shadow-sm bg-background">
              <AvatarImage src="https://github.com/ishivamgaur.png" alt="Shivam Gaur" className="object-cover bg-background" />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="pt-20 md:pt-24">
            <Button variant="outline" className="rounded-full font-bold px-4 py-2 border-border/60 hover:bg-muted/50 transition-colors">
              Edit profile
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight leading-none">Shivam Gaur</h1>
            <p className="text-muted-foreground text-[15px] mt-1">@ishivamgaur</p>
          </div>

          <p className="text-[15px] text-foreground leading-snug">
            Don&apos;t be an NPC.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px] text-muted-foreground mt-2">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-[18px] h-[18px]" />
              <span>Software developer/Programmer/Software engineer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-[18px] h-[18px]" />
              <span>NOIDA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gift className="w-[18px] h-[18px]" />
              <span>Born August 24, 2005</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-[18px] h-[18px]" />
              <span>Joined June 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStoryIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-pointer"
            onClick={() => setActiveStoryIdx(null)}
          >
            <div 
              className="relative w-full max-w-lg h-full md:h-[95vh] md:max-h-[900px] bg-muted md:rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar */}
              <div className="absolute top-6 inset-x-4 flex gap-1.5 z-20">
                {stories.map((_, idx) => (
                  <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-50 linear"
                      style={{ width: idx < activeStoryIdx ? '100%' : idx === activeStoryIdx ? `${progress}%` : '0%' }}
                    />
                  </div>
                ))}
              </div>

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
                <div className="flex items-center gap-1">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }} 
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play className="w-5 h-5 fill-current" /> : <Pause className="w-5 h-5 fill-current" />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveStoryIdx(null); }} 
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div 
                className="flex-1 relative bg-black flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {stories[activeStoryIdx].imageUrl ? (
                  <img src={stories[activeStoryIdx].imageUrl} alt={stories[activeStoryIdx].title} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center text-center">
                    <p className="text-2xl font-bold text-white leading-tight">{stories[activeStoryIdx].content}</p>
                  </div>
                )}
                {stories[activeStoryIdx].imageUrl && (
                  <div className="absolute bottom-12 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="text-lg font-medium leading-relaxed">{stories[activeStoryIdx].content}</p>
                  </div>
                )}
              </div>

              {stories.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity" disabled={activeStoryIdx === 0}>
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleNext(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity">
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute inset-0 flex z-10 md:hidden">
                <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                <div className="w-2/3 h-full" onClick={(e) => { e.stopPropagation(); handleNext(false); }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
