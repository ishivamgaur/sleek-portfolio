"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, Play, Pause } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import {
  fetchGithubStats,
  fetchSettings,
  fetchStories,
  GitHubStats,
  SiteSettings,
  StoryData,
} from "@/services/api";

import Image from "next/image";

export default function Hero() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [stories, setStories] = useState<StoryData[]>([]);
  const [githubData, setGithubData] = useState<GitHubStats | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const bannerImage = "/banner.jpg";
  const profileImage = "/profile-pic.jpg";

  useEffect(() => {
    const loadData = () => {
      fetchStories()
        .then((data) => setStories(data))
        .catch(() => {});

      fetchGithubStats()
        .then((data) => setGithubData(data))
        .catch(() => {});
    };

    loadData();

    const handleFocus = () => loadData();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(loadData, 5000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  const calculateDays = (dateString?: string) => {
    if (!dateString) return 0;
    const start = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMins < 1) return "just now";
    if (diffInMins < 60) return `${diffInMins}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  const hasStories = stories.length > 0;
  const currentStory = activeStoryIdx !== null ? stories[activeStoryIdx] : null;

  const [storiesSeen, setStoriesSeen] = useState(true);

  useEffect(() => {
    const seenKey = "stories_seen";
    const seenIds = JSON.parse(
      localStorage.getItem(seenKey) || "[]",
    ) as string[];
    const allStoryIds = stories.map((s) => s._id).filter(Boolean) as string[];
    const allSeen =
      allStoryIds.length > 0 && allStoryIds.every((id) => seenIds.includes(id));
    setStoriesSeen(allSeen);
  }, [stories]);

  const markStoriesSeen = () => {
    const seenKey = "stories_seen";
    const allStoryIds = stories.map((s) => s._id).filter(Boolean) as string[];
    localStorage.setItem(seenKey, JSON.stringify(allStoryIds));
    setStoriesSeen(true);
  };

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

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  const handleNext = (isAuto = false) => {
    if (activeStoryIdx !== null) {
      if (activeStoryIdx < stories.length - 1) {
        setActiveStoryIdx(activeStoryIdx + 1);
      } else if (isAuto) {
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
    <section className="relative w-full overflow-hidden pb-0">
      {/* Banner */}
      <div className="h-48 md:h-64 w-full relative bg-muted/30">
        <Image
          src={bannerImage}
          alt="Banner"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover"
        />
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-4 pb-4"
      >
        {/* Avatar & Action Button Row */}
        <div className="flex justify-between items-start -mt-12 md:-mt-16 mb-4 relative z-10">
          <div
            className={`rounded-full transition-all duration-500 active:scale-95 p-[3px] ${
              showGradient
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
              <AvatarImage
                src={profileImage}
                alt="Shivam Gaur"
                className="object-cover bg-background"
              />
              <AvatarFallback className="w-full h-full relative bg-muted">
                <Image
                  src="/profile-pic.jpg"
                  alt="Shivam Gaur"
                  fill
                  className="object-cover rounded-full"
                  sizes="(max-width: 768px) 80px, 112px"
                />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="pt-16 md:pt-20 flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/ishivamgaur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://instagram.com/ishivamgaur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Instagram</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://linkedin.com/in/ishivamgaur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://twitter.com/ishivamgaur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-colors text-foreground/80 hover:text-foreground flex items-center justify-center"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
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

          <div className="min-h-[1.5em]">
            <p className="text-[15px] text-foreground leading-snug">
              Be an engineer, not just a coder.
            </p>
          </div>

          <div className="flex flex-col gap-y-2 text-[15px] text-muted-foreground mt-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] md:text-[15px] font-medium">
              <span>Full Stack Developer</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
              <span>NOIDA</span>
              {githubData?.createdAt ? (
                <div className="flex items-center gap-x-2 whitespace-nowrap">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                  <span>
                    Coding for {calculateDays(githubData.createdAt)} days
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-x-2 whitespace-nowrap">
                  <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                  <Skeleton className="h-4 w-32" />
                </div>
              )}
            </div>
          </div>
          <SpotifyNowPlaying />
        </div>
      </motion.div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStoryIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              markStoriesSeen();
              setActiveStoryIdx(null);
            }}
          >
            <div
              className="relative bg-black md:rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
              style={{
                aspectRatio: "9 / 16",
                width: "min(100vw, calc(90dvh * 9 / 16), 420px)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar & Header Overlay */}
              <div className="absolute top-0 inset-x-0 pt-4 pb-12 z-20 pointer-events-none">
                <div className="px-4 flex gap-1 mb-3">
                  {stories.map((_, idx) => (
                    <div
                      key={idx}
                      className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
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

                <div className="px-4 flex items-center justify-between text-white pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 border border-white/20">
                      <AvatarImage src={profileImage || "/profile-pic.jpg"} />
                      <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[13px] md:text-sm font-bold shadow-sm">
                          Shivam Gaur
                        </p>
                        {currentStory?.createdAt && (
                          <>
                            <div className="w-1 h-1 rounded-full bg-white/40" />
                            <span className="text-white/70 text-[10px] md:text-xs font-normal tracking-wide">
                              {formatTimeAgo(currentStory.createdAt)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPaused(!isPaused);
                      }}
                    >
                      {isPaused ? (
                        <Play className="w-5 h-5 fill-white" />
                      ) : (
                        <Pause className="w-5 h-5 fill-white" />
                      )}
                    </button>
                    <button
                      className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        markStoriesSeen();
                        setActiveStoryIdx(null);
                      }}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="relative h-full w-full flex items-center justify-center">
                {currentStory && (
                  <>
                    {currentStory.mediaType === "video" ? (
                      <video
                        ref={videoRef}
                        src={currentStory.imageUrl}
                        autoPlay
                        muted
                        playsInline
                        className="h-full w-full object-contain"
                        onEnded={() => handleNext(true)}
                      />
                    ) : (
                      <img
                        src={
                          currentStory.imageUrl.includes(".gif")
                            ? currentStory.imageUrl.replace("f_auto,", "")
                            : currentStory.imageUrl
                        }
                        alt="Story"
                        className="h-full w-full object-contain select-none pointer-events-none"
                      />
                    )}
                  </>
                )}

                {/* Tap to Navigate Areas */}
                <div className="absolute inset-0 flex z-10">
                  <div
                    className="w-1/3 h-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                  />
                  <div
                    className="w-2/3 h-full cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
