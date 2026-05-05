"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { fetchSpotify } from "@/services/api";

export default function SpotifyNowPlaying() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.portfolio.spotifyData);
  const hasFetchedSpotify = useSelector(
    (state: RootState) => state.portfolio.hasFetchedSpotify,
  );

  const loadSpotify = useCallback(async () => {
    try {
      const spotifyData = await fetchSpotify();
      dispatch({ type: "portfolio/setSpotifyData", payload: spotifyData });
    } catch {
      // Keep the last successful value if Spotify is temporarily unavailable.
    }
  }, [dispatch]);

  useEffect(() => {
    // Only fetch immediately on mount if we haven't fetched before
    if (!hasFetchedSpotify) {
      loadSpotify();
    }

    // Always keep polling in the background so the current song stays updated
    const interval = window.setInterval(loadSpotify, 30_000);
    return () => window.clearInterval(interval);
  }, [loadSpotify, hasFetchedSpotify]);

  if (!data || !data.isPlaying) return null;

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mt-3 w-fit"
    >
      <svg
        className="w-4 h-4 shrink-0 text-[#1DB954]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
      <span className="opacity-60 shrink-0">Recently listened to</span>
      <span className="font-medium truncate max-w-[200px] group-hover:underline underline-offset-2">
        {data.title}
      </span>
      <span className="opacity-40 hidden sm:inline">·</span>
      <span className="opacity-50 truncate max-w-[120px] hidden sm:inline">
        {data.artist}
      </span>
    </a>
  );
}
