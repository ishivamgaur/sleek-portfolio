"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateBannerImage,
  updateProfileImage,
} from "@/store/slices/portfolioSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FileUpload from "@/components/FileUpload";
import {
  checkAuth,
  login,
  logout,
  fetchSettings,
  updateSettings,
  createStory,
  fetchStories,
  deleteStory,
  fetchAnalytics,
  StoryData,
  SiteSettings,
  AnalyticsStats,
} from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  X,
  Users,
  Eye,
  CalendarDays,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const adminCardClass =
  "rounded-md border border-border bg-muted/20 shadow-sm ring-0 dark:border-white/15 dark:bg-white/[0.03]";
const adminCardTitleClass =
  "text-[16px] md:text-[17px] font-bold tracking-tight text-foreground leading-tight";
const adminCardDescriptionClass = "text-muted-foreground mt-1 text-[14px]";

function PreviousBannersSkeleton() {
  return (
    <div className="space-y-3 pt-4 border-t border-border mt-4">
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function PreviousProfilesSkeleton() {
  return (
    <div className="space-y-3 pt-4 border-t border-border mt-4">
      <Skeleton className="h-4 w-44" />
      <div className="flex flex-wrap gap-4">
        {[0, 1, 2, 3].map((item) => (
          <Skeleton key={item} className="h-16 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
}

function StoriesSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {[0, 1, 2].map((item) => (
        <div key={item} className="flex items-center justify-center">
          <Skeleton className="h-22 w-22 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [isStoriesLoading, setIsStoriesLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [originalBannerUrl, setOriginalBannerUrl] = useState("");
  const [originalProfileUrl, setOriginalProfileUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [originalResumeUrl, setOriginalResumeUrl] = useState("");
  const [stories, setStories] = useState<StoryData[]>([]);
  const [previousBanners, setPreviousBanners] = useState<
    Array<{ url: string; publicId?: string }>
  >([]);
  const [previousProfiles, setPreviousProfiles] = useState<
    Array<{ url: string; publicId?: string }>
  >([]);
  const [currentBannerPublicId, setCurrentBannerPublicId] = useState("");
  const [currentProfilePublicId, setCurrentProfilePublicId] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);

  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const getErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : "";

  const loadStories = () => {
    setIsStoriesLoading(true);
    fetchStories()
      .then((data) => setStories(data))
      .catch(() => {})
      .finally(() => setIsStoriesLoading(false));
  };

  const loadAnalytics = () => {
    fetchAnalytics()
      .then((data) => setAnalytics(data))
      .catch(() => {});
  };

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

  // Sync video play/pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused]);

  // Check auth + fetch current settings on mount
  useEffect(() => {
    checkAuth()
      .then((authed) => setIsLoggedIn(authed))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));

    fetchSettings()
      .then((s: SiteSettings) => {
        setBannerUrl(s.bannerImage || "");
        setProfileUrl(s.profileImage || "");
        setOriginalBannerUrl(s.bannerImage || "");
        setOriginalProfileUrl(s.profileImage || "");
        setResumeUrl(s.resumeUrl || "");
        setOriginalResumeUrl(s.resumeUrl || "");
        setPreviousBanners(s.previousBanners || []);
        setPreviousProfiles(s.previousProfiles || []);
      })
      .catch(() => {})
      .finally(() => setIsSettingsLoading(false));

    fetchStories()
      .then((data) => setStories(data))
      .catch(() => {})
      .finally(() => setIsStoriesLoading(false));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    loadAnalytics();
  }, [isLoggedIn]);

  const [storyData, setStoryData] = useState({
    imageUrl: "",
    mediaType: "photo" as "photo" | "video",
  });
  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyData.imageUrl) {
      alert("Please upload a media file first.");
      return;
    }

    try {
      await createStory({
        imageUrl: storyData.imageUrl,
        mediaType: storyData.mediaType,
      });
      alert("Story added successfully!");
      setStoryData({ imageUrl: "", mediaType: "photo" });
      loadStories();
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Failed to add story");
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await deleteStory(id);
      alert("Story deleted successfully!");
      loadStories();
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Failed to delete story");
    }
  };

  const handleUpdateImages = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateSettings({
        bannerImage: bannerUrl || undefined,
        profileImage: profileUrl || undefined,
        resumeUrl: resumeUrl || undefined,
        publicId:
          bannerUrl === currentBannerPublicId
            ? undefined
            : currentBannerPublicId || currentProfilePublicId || undefined,
      });
      if (bannerUrl) {
        dispatch(updateBannerImage(bannerUrl));
        setOriginalBannerUrl(bannerUrl);
      }
      if (profileUrl) {
        dispatch(updateProfileImage(profileUrl));
        setOriginalProfileUrl(profileUrl);
      }
      if (resumeUrl) {
        setOriginalResumeUrl(resumeUrl);
      }
      if (res) {
        setPreviousBanners(res.previousBanners || []);
        setPreviousProfiles(res.previousProfiles || []);
      }
      alert("Images updated successfully!");
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Failed to update images");
    }
  };

  const handleDeletePreviousImage = async (
    type: "banner" | "profile",
    imageUrl: string,
  ) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await updateSettings({
        deleteBanner: type === "banner" ? imageUrl : undefined,
        deleteProfile: type === "profile" ? imageUrl : undefined,
      });
      if (res) {
        setPreviousBanners(res.previousBanners || []);
        setPreviousProfiles(res.previousProfiles || []);
      }
      alert("Image deleted successfully!");
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Failed to delete image");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      await login(email, password);
      setIsLoggedIn(true);
      setPassword("");
      setEmail("");
    } catch (err: unknown) {
      setLoginError(getErrorMessage(err) || "Login failed");
    }
  };

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 border-4 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className={`w-full max-w-md ${adminCardClass}`}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your password to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="px-4 pt-24 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-[15px]">
            Manage your portfolio projects and professional experience.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full sm:w-auto"
        >
          Logout
        </Button>
      </motion.div>

      <Card className={`${adminCardClass} mb-4`}>
        <CardHeader>
          <CardTitle className={adminCardTitleClass}>
            Website Analytics
          </CardTitle>
          <CardDescription className={adminCardDescriptionClass}>
            Unique visitors and page visits tracked from your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!analytics ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-20 rounded-md" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-md border border-border bg-background/50 p-3">
                  <Users className="size-4 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">
                    {analytics.uniqueVisitors}
                  </p>
                  <p className="text-xs text-muted-foreground">Unique users</p>
                </div>
                <div className="rounded-md border border-border bg-background/50 p-3">
                  <Eye className="size-4 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{analytics.totalVisits}</p>
                  <p className="text-xs text-muted-foreground">Total visits</p>
                </div>
                <div className="rounded-md border border-border bg-background/50 p-3">
                  <CalendarDays className="size-4 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">
                    {analytics.todayUniqueVisitors}
                  </p>
                  <p className="text-xs text-muted-foreground">Users today</p>
                </div>
                <div className="rounded-md border border-border bg-background/50 p-3">
                  <BarChart3 className="size-4 text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{analytics.todayVisits}</p>
                  <p className="text-xs text-muted-foreground">Visits today</p>
                </div>
              </div>

              {analytics.popularPages.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Top Pages</Label>
                  <div className="space-y-2">
                    {analytics.popularPages.map((page) => (
                      <div
                        key={page.path}
                        className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2 text-sm"
                      >
                        <span className="truncate pr-3">{page.path}</span>
                        <span className="font-semibold">{page.visits}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Card className={adminCardClass}>
          <CardHeader>
            <CardTitle className={adminCardTitleClass}>Site Media</CardTitle>
            <CardDescription className={adminCardDescriptionClass}>
              Update your banner and profile pictures.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateImages} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Banner Image</Label>
                    {bannerUrl !== originalBannerUrl && (
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded animate-in fade-in zoom-in duration-300">
                        Modified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      placeholder="Paste URL or upload"
                      className={
                        bannerUrl !== originalBannerUrl
                          ? "border-emerald-500/70 focus-visible:ring-emerald-500 bg-emerald-500/5 transition-all"
                          : "transition-all"
                      }
                    />
                    <FileUpload
                      accept="image/*"
                      label="Upload"
                      uploadType="banner"
                      onUploadComplete={(url, publicId) => {
                        setBannerUrl(url);
                        if (publicId) setCurrentBannerPublicId(publicId);
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Profile Image</Label>
                    {profileUrl !== originalProfileUrl && (
                      <span className="text-xs text-emerald-600 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded animate-in fade-in zoom-in duration-300">
                        Modified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      placeholder="Paste URL or upload"
                      className={
                        profileUrl !== originalProfileUrl
                          ? "border-emerald-500/70 focus-visible:ring-emerald-500 bg-emerald-500/5 transition-all"
                          : "transition-all"
                      }
                    />
                    <FileUpload
                      accept="image/*"
                      label="Upload"
                      uploadType="profile"
                      onUploadComplete={(url, publicId) => {
                        setProfileUrl(url);
                        if (publicId) setCurrentProfilePublicId(publicId);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Resume PDF</Label>
                  {resumeUrl !== originalResumeUrl && (
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded animate-in fade-in zoom-in duration-300">
                      Modified
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="Upload PDF or paste direct URL"
                    className={
                      resumeUrl !== originalResumeUrl
                        ? "border-emerald-500/70 focus-visible:ring-emerald-500 bg-emerald-500/5 transition-all"
                        : "transition-all"
                    }
                  />
                  <FileUpload
                    accept="application/pdf"
                    label="Upload"
                    uploadType="resume"
                    onUploadComplete={(url) => setResumeUrl(url)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  bannerUrl === originalBannerUrl &&
                  profileUrl === originalProfileUrl &&
                  resumeUrl === originalResumeUrl
                }
                className="w-full md:w-auto font-bold mt-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Update Settings
              </Button>

              {isSettingsLoading ? (
                <PreviousBannersSkeleton />
              ) : previousBanners && previousBanners.length > 0 ? (
                <div className="space-y-2 pt-4 border-t border-border mt-4">
                  <Label className="text-sm font-medium">
                    Previous Banners
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {previousBanners.map((b, idx) => (
                      <div
                        key={idx}
                        className={`group relative h-20 rounded-lg overflow-hidden border transition cursor-pointer bg-muted/20 ${b.url === bannerUrl ? "border-emerald-500 ring-2 ring-emerald-500/40 scale-95 shadow-md" : "border-border/60 hover:border-primary/50"}`}
                        onClick={() => setBannerUrl(b.url)}
                      >
                        <img
                          src={b.url}
                          alt={`Previous banner ${idx + 1}`}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePreviousImage("banner", b.url);
                          }}
                          className="absolute top-1 right-1 p-1 bg-background/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full backdrop-blur-sm transition opacity-100 cursor-pointer"
                          title="Delete image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {isSettingsLoading ? (
                <PreviousProfilesSkeleton />
              ) : previousProfiles && previousProfiles.length > 0 ? (
                <div className="space-y-2 pt-4 border-t border-border mt-4">
                  <Label className="text-sm font-medium">
                    Previous Profile Pictures
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {previousProfiles.map((p, idx) => (
                      <div
                        key={idx}
                        className={`group relative w-16 h-16 rounded-full border transition cursor-pointer bg-muted/20 ${p.url === profileUrl ? "border-emerald-500 ring-2 ring-emerald-500/40 scale-95 shadow-md" : "border-border/60 hover:border-primary/50"}`}
                        onClick={() => setProfileUrl(p.url)}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <img
                            src={p.url}
                            alt={`Previous profile ${idx + 1}`}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePreviousImage("profile", p.url);
                          }}
                          className="absolute top-0 right-0 p-1 bg-destructive hover:bg-destructive/90 text-white rounded-full shadow-sm transition opacity-100 cursor-pointer z-10"
                          title="Delete image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-4">
        <Card className={adminCardClass}>
          <CardHeader>
            <CardTitle className={adminCardTitleClass}>Add New Story</CardTitle>
            <CardDescription className={adminCardDescriptionClass}>
              Upload a photo or video to your story.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStory} className="space-y-4">
              <div className="space-y-2">
                <Label>Story Media (Required)</Label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={storyData.imageUrl}
                    onChange={(e) =>
                      setStoryData({ ...storyData, imageUrl: e.target.value })
                    }
                    placeholder="Paste URL or upload"
                    required
                  />
                  <FileUpload
                    accept="image/*,video/*"
                    label="Upload"
                    uploadType="story"
                    onUploadComplete={(url) =>
                      setStoryData({
                        ...storyData,
                        imageUrl: url,
                        mediaType: url.includes("/video/upload/")
                          ? "video"
                          : "photo",
                      })
                    }
                  />
                </div>
              </div>
              <Button type="submit" className="w-full font-bold">
                Add Story
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className={adminCardClass}>
          <CardHeader>
            <CardTitle className={adminCardTitleClass}>
              Manage Stories
            </CardTitle>
            <CardDescription className={adminCardDescriptionClass}>
              View and remove your active stories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isStoriesLoading ? (
              <StoriesSkeleton />
            ) : stories.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No active stories.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stories.map((story, idx) => (
                  <div
                    key={story._id}
                    className="relative group flex items-center justify-center bg-background/50"
                  >
                    <div
                      onClick={() => {
                        setProgress(0);
                        setIsPaused(false);
                        setActiveStoryIdx(idx);
                      }}
                      className="relative w-22 h-22 rounded-full border-2 border-primary/50 p-0.5 bg-background shadow-sm cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {story.mediaType === "video" ? (
                          <video
                            src={story.imageUrl}
                            className="w-full h-full object-cover rounded-full"
                            muted
                          />
                        ) : (
                          <img
                            src={
                              story.imageUrl.includes(".gif")
                                ? story.imageUrl.replace("f_auto,", "")
                                : story.imageUrl
                            }
                            alt="Story Preview"
                            className="w-full h-full object-cover rounded-full"
                          />
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (story._id) {
                          handleDeleteStory(story._id);
                        }
                      }}
                      className="absolute -top-1 right-3 p-1 bg-destructive hover:bg-destructive/90 text-white rounded-full shadow-sm transition opacity-100 cursor-pointer z-10"
                      title="Delete story"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStoryIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-lg flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveStoryIdx(null);
              setProgress(0);
              setIsPaused(false);
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
                      <AvatarImage src={profileUrl || "/profile-pic.jpg"} />
                      <AvatarFallback>SG</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[13px] md:text-sm font-bold shadow-sm">
                          Shivam Gaur
                        </p>
                        {stories[activeStoryIdx]?.createdAt && (
                          <>
                            <span className="text-white/60 text-xs">•</span>
                            <span className="text-white/70 text-[10px] md:text-xs font-normal tracking-wide">
                              {formatTimeAgo(stories[activeStoryIdx].createdAt)}
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
                {stories[activeStoryIdx] && (
                  <>
                    {stories[activeStoryIdx].mediaType === "video" ? (
                      <video
                        ref={videoRef}
                        src={stories[activeStoryIdx].imageUrl}
                        autoPlay
                        muted
                        playsInline
                        className="h-full w-full object-contain"
                        onEnded={() => handleNext(true)}
                      />
                    ) : (
                      <img
                        src={
                          stories[activeStoryIdx].imageUrl.includes(".gif")
                            ? stories[activeStoryIdx].imageUrl.replace(
                                "f_auto,",
                                "",
                              )
                            : stories[activeStoryIdx].imageUrl
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
    </div>
  );
}
