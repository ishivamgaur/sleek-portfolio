"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StoryData } from "@/services/api";

interface StoryViewerProps {
  stories: StoryData[];
  activeIndex: number | null;
  onIndexChange: (index: number | null) => void;
  profileImage?: string;
  onAllStoriesSeen?: () => void;
}

export default function StoryViewer({
  stories,
  activeIndex,
  onIndexChange,
  profileImage = "/profile-pic.jpg",
  onAllStoriesSeen,
}: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNext = useCallback(
    (isAuto = false) => {
      if (activeIndex === null) return;
      if (activeIndex < stories.length - 1) {
        onIndexChange(activeIndex + 1);
      } else {
        if (onAllStoriesSeen && isAuto) {
          onAllStoriesSeen();
        }
        onIndexChange(null);
      }
    },
    [activeIndex, stories.length, onIndexChange, onAllStoriesSeen],
  );

  const handlePrev = useCallback(() => {
    if (activeIndex !== null && activeIndex > 0) {
      onIndexChange(activeIndex - 1);
    }
  }, [activeIndex, onIndexChange]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeIndex !== null && !isPaused && mediaLoaded) {
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
  }, [activeIndex, isPaused, mediaLoaded, handleNext]);

  useEffect(() => {
    if (activeIndex === null) return;
    setProgress(0);
    setIsPaused(false);
    setMediaLoaded(false);

    const story = stories[activeIndex];
    if (story?.imageUrl && story.mediaType !== "video") {
      const img = new window.Image();
      img.onload = () => setMediaLoaded(true);
      img.onerror = () => setMediaLoaded(true);
      img.src = story.imageUrl.includes(".gif")
        ? story.imageUrl.replace("f_auto,", "")
        : story.imageUrl;
      return () => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      };
    }
  }, [activeIndex, stories]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

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

  return (
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-transparent backdrop-blur-lg flex items-center justify-center cursor-pointer"
          onClick={() => {
            if (onAllStoriesSeen) onAllStoriesSeen();
            onIndexChange(null);
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
                          idx < activeIndex
                            ? "100%"
                            : idx === activeIndex
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
                    <AvatarImage src={profileImage} />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[13px] md:text-sm font-bold drop-shadow-md">
                        Shivam Gaur
                      </p>
                      {stories[activeIndex]?.createdAt && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-white/70 text-[10px] md:text-xs font-normal tracking-wide">
                            {formatTimeAgo(stories[activeIndex].createdAt)}
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
                      onIndexChange(null);
                    }}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="relative h-full w-full flex items-center justify-center">
              {!mediaLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
              {stories[activeIndex] && (
                <>
                  {stories[activeIndex].mediaType === "video" ? (
                    <video
                      ref={videoRef}
                      src={stories[activeIndex].imageUrl}
                      autoPlay
                      muted
                      playsInline
                      className={`h-full w-full object-contain transition-opacity duration-200 ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
                      onEnded={() => handleNext(true)}
                      onCanPlay={() => setMediaLoaded(true)}
                    />
                  ) : (
                    <img
                      src={
                        stories[activeIndex].imageUrl.includes(".gif")
                          ? stories[activeIndex].imageUrl.replace("f_auto,", "")
                          : stories[activeIndex].imageUrl
                      }
                      alt="Story"
                      className={`h-full w-full object-contain select-none pointer-events-none transition-opacity duration-200 ${mediaLoaded ? "opacity-100" : "opacity-0"}`}
                      onLoad={() => setMediaLoaded(true)}
                    />
                  )}
                </>
              )}

              {/* Tap zones: Left = prev, Center = pause/play, Right = next */}
              <div className="absolute inset-0 flex z-10">
                <div
                  className="w-1/4 h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                />
                <div
                  className="w-2/4 h-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPaused((p) => !p);
                  }}
                />
                <div
                  className="w-1/4 h-full cursor-pointer"
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
  );
}
