"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Briefcase,
  CalendarDays,
  Gift,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Code,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { fetchSettings, fetchStories } from "@/services/api";

import Image from "next/image";

export default function Hero() {
  // Fetch stories from MongoDB
  const { data: stories = [] } = useSWR("stories", fetchStories, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });
  const defaultBanner = useSelector((state: RootState) => state.portfolio.bannerImage);
  const defaultProfile = useSelector((state: RootState) => state.portfolio.profileImage);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(true);

  // Fetch persisted images from DB via SWR (cached, deduped)
  const { data: siteSettings, error: settingsError } = useSWR("settings", fetchSettings, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const settingsReady = !!siteSettings || !!settingsError;
  const bannerImage = siteSettings?.bannerImage || (settingsError ? defaultBanner : null);
  const profileImage = siteSettings?.profileImage || (settingsError ? defaultProfile : null);

  // Use SWR for highly optimized, cached data fetching
  const { data: githubData } = useSWR("/github", fetcher, {
    revalidateOnFocus: false, // GitHub stats don't change by the second
    dedupingInterval: 60000, // Cache for at least 1 minute
  });

  const calculateDays = (dateString?: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const hasStories = stories.length > 0;
  const currentStory = activeStoryIdx !== null ? stories[activeStoryIdx] : null;

  // Track "seen" state in localStorage — gradient fades after viewing
  const [storiesSeen, setStoriesSeen] = useState(true); // default true to avoid flash

  useEffect(() => {
    // Check localStorage for seen state
    const seenKey = "stories_seen";
    const seenIds = JSON.parse(localStorage.getItem(seenKey) || "[]") as string[];
    const allStoryIds = stories.map((s) => s._id).filter(Boolean) as string[];
    const allSeen = allStoryIds.length > 0 && allStoryIds.every((id) => seenIds.includes(id));
    setStoriesSeen(allSeen);
  }, [stories]);

  const markStoriesSeen = () => {
    const seenKey = "stories_seen";
    const allStoryIds = stories.map((s) => s._id).filter(Boolean) as string[];
    localStorage.setItem(seenKey, JSON.stringify(allStoryIds));
    setStoriesSeen(true);
  };

  // Show gradient only when stories exist AND not yet seen
  const showGradient = hasStories && !storiesSeen;

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
        // Viewed all stories — mark as seen
        markStoriesSeen();
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
      <div
        className={`h-48 md:h-64 w-full relative transition-colors duration-500 ${bannerError ? "bg-gradient-to-b from-slate-800 to-black" : (!settingsReady || bannerLoading) ? "bg-muted animate-pulse" : "bg-muted/30"}`}
      >
        {!bannerError && bannerImage && (
          <Image
            src={bannerImage}
            alt="Banner"
            fill
            priority
            className={`object-cover transition-opacity duration-500 ${bannerLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setBannerLoading(false)}
            onError={() => {
              setBannerError(true);
              setBannerLoading(false);
            }}
          />
        )}
      </div>

      {/* Profile Section */}
      <div className="px-4 pb-4">
        {/* Avatar & Action Button Row */}
        <div className="flex justify-between items-start -mt-12 md:-mt-16 mb-4 relative z-10">
          <div
            className={`rounded-full transition-all duration-500 active:scale-95 p-[3px] ${
              !settingsReady
                ? "bg-muted animate-pulse"
                : showGradient
                  ? "bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-indigo-500 cursor-pointer"
                  : hasStories
                    ? "bg-muted-foreground/30 cursor-pointer"
                    : "bg-transparent"
            }`}
            onClick={() => {
              if (hasStories) {
                setActiveStoryIdx(0);
              }
            }}
          >
            <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-background shadow-sm bg-background relative">
              {!settingsReady ? (
                <div className="w-full h-full rounded-full bg-muted animate-pulse" />
              ) : profileImage ? (
                <AvatarImage
                  src={profileImage}
                  alt="Shivam Gaur"
                  className="object-cover bg-background"
                />
              ) : null}
              {settingsReady && (
                <AvatarFallback className="w-full h-full relative bg-muted">
                  <Image
                    src="/profile-pic.jpg"
                    alt="Shivam Gaur"
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 768px) 80px, 112px"
                  />
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          <div className="pt-16 md:pt-20 flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://github.com/ishivamgaur"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="p-2 rounded-md border border-border/60 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://instagram.com/ishivamgaur"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="p-2 rounded-md border border-border/60 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>Instagram</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://linkedin.com/in/ishivamgaur"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="p-2 rounded-md border border-border/60 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                render={
                  <a
                    href="https://twitter.com/ishivamgaur"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="p-2 rounded-md border border-border/60 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>X (Twitter)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Info Section */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight leading-none">
              Shivam Gaur
            </h1>
            <p className="text-muted-foreground text-[15px] mt-1">
              @ishivamgaur
            </p>
          </div>

          <p className="text-[15px] text-foreground leading-snug">
            Be an engineer, not just a coder.
          </p>

          <div className="flex flex-col gap-y-2 text-[15px] text-muted-foreground mt-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-[18px] h-[18px]" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-[18px] h-[18px]" />
                <span>NOIDA</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-1.5">
                <Gift className="w-[18px] h-[18px]" />
                <span>Born August 24, 2005</span>
              </div>
              {githubData?.createdAt ? (
                <div className="flex items-center gap-1.5">
                  <Code className="w-[18px] h-[18px]" />
                  <span>
                    Coding for {calculateDays(githubData.createdAt)} days
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 animate-pulse">
                  <Code className="w-[18px] h-[18px] opacity-50" />
                  <div className="h-4 w-32 bg-muted rounded" />
                </div>
              )}
            </div>
          </div>
          <SpotifyNowPlaying />
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
            onClick={() => { markStoriesSeen(); setActiveStoryIdx(null); }}
          >
            <div
              className="relative w-full max-w-lg h-full md:h-[95vh] md:max-h-[900px] bg-muted md:rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar */}
              <div className="absolute top-6 inset-x-4 flex gap-1.5 z-20">
                {stories.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-1 flex-1 bg-white/20 rounded-md overflow-hidden"
                  >
                    <div
                      className="h-full bg-white transition-all duration-50 linear"
                      style={{
                        width:
                          idx < activeStoryIdx
                            ? "100%"
                            : idx === activeStoryIdx
                              ? `${progress}%`
                              : "0%",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="absolute top-8 inset-x-4 flex items-center justify-between z-20 text-white">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border border-white/20">
                    <AvatarImage
                      src={profileImage || "/profile-pic.jpg"}
                    />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">Shivam Gaur</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? (
                      <Play className="w-5 h-5 fill-current" />
                    ) : (
                      <Pause className="w-5 h-5 fill-current" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markStoriesSeen();
                      setActiveStoryIdx(null);
                    }}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div
                className="flex-1 relative bg-black flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {currentStory?.imageUrl ? (
                  currentStory.mediaType === "video" ? (
                    <video
                      src={currentStory.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={currentStory.imageUrl}
                      alt="Story"
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center text-center">
                  </div>
                )}
              </div>

              {stories.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-md text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity"
                    disabled={activeStoryIdx === 0}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 rounded-md text-white backdrop-blur-sm z-30 opacity-0 md:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="absolute inset-0 flex z-10 md:hidden">
                <div
                  className="w-1/3 h-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                />
                <div
                  className="w-2/3 h-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext(false);
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
