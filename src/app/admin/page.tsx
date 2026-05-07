"use client";

import { useState, useEffect, useRef } from "react";
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
import FileUpload from "@/components/widgets/FileUpload";
import StoryViewer from "@/components/widgets/StoryViewer";
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
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const adminCardClass =
  "rounded-xl border border-dashed border-border bg-secondary/5 ring-0 dark:border-border dark:bg-secondary/10 transition-colors hover:bg-secondary/10";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [isStoriesLoading, setIsStoriesLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [originalResumeUrl, setOriginalResumeUrl] = useState("");
  const [stories, setStories] = useState<StoryData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStats | null>(null);

  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
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
  // Removed local story navigation logic as it's now handled by StoryViewer

  // Check auth + fetch current settings on mount
  useEffect(() => {
    checkAuth()
      .then((authed) => setIsLoggedIn(authed))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));

    fetchSettings()
      .then((s: SiteSettings) => {
        setResumeUrl(s.resumeUrl || "");
        setOriginalResumeUrl(s.resumeUrl || "");
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
  const [isAddingStory, setIsAddingStory] = useState(false);
  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyData.imageUrl) {
      alert("Please upload a media file first.");
      return;
    }

    setIsAddingStory(true);
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
    } finally {
      setIsAddingStory(false);
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

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateSettings({
        resumeUrl: resumeUrl || undefined,
      });
      if (resumeUrl) {
        setOriginalResumeUrl(resumeUrl);
      }
      alert("Resume updated successfully!");
    } catch (err: unknown) {
      alert(getErrorMessage(err) || "Failed to update resume");
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
              <button
                type="submit"
                className="flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[14px] font-bold tracking-tight active:scale-95 cursor-pointer"
              >
                Login
              </button>
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
            Manage your portfolio projects and Work Experience.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[14px] font-bold tracking-tight active:scale-95 cursor-pointer"
        >
          Logout
        </button>
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
                <div className="rounded-xl border border-dashed border-border bg-secondary/5 p-4 transition-colors hover:bg-secondary/10 flex flex-col items-start gap-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Unique users
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {analytics.uniqueVisitors}
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-border bg-secondary/5 p-4 transition-colors hover:bg-secondary/10 flex flex-col items-start gap-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total visits
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {analytics.totalVisits}
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-border bg-secondary/5 p-4 transition-colors hover:bg-secondary/10 flex flex-col items-start gap-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Users today
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {analytics.todayUniqueVisitors}
                  </p>
                </div>
                <div className="rounded-xl border border-dashed border-border bg-secondary/5 p-4 transition-colors hover:bg-secondary/10 flex flex-col items-start gap-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Visits today
                  </p>
                  <p className="text-3xl font-bold tracking-tight">
                    {analytics.todayVisits}
                  </p>
                </div>
              </div>

              {analytics.popularPages.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Top Pages</Label>
                  <div className="space-y-2">
                    {analytics.popularPages.map((page) => (
                      <div
                        key={page.path}
                        className="flex items-center justify-between rounded-xl border border-dashed border-border bg-secondary/5 px-4 py-2.5 text-sm transition-colors hover:bg-secondary/10"
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
            <CardTitle className={adminCardTitleClass}>
              Resume Settings
            </CardTitle>
            <CardDescription className={adminCardDescriptionClass}>
              Update your professional resume link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateResume} className="space-y-4">
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
              <button
                type="submit"
                disabled={resumeUrl === originalResumeUrl}
                className="flex items-center justify-center w-full md:w-auto mt-2 gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[14px] font-bold tracking-tight active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update Resume
              </button>
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
              <button
                type="submit"
                disabled={!storyData.imageUrl || isAddingStory}
                className="flex items-center justify-center w-full gap-2 px-5 py-2.5 rounded-md border border-dashed border-border bg-secondary/5 hover:bg-muted/50 transition-all duration-300 text-[14px] font-bold tracking-tight active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingStory ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                    <span>Adding...</span>
                  </div>
                ) : (
                  "Add Story"
                )}
              </button>
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
                    className="relative group flex items-center justify-center bg-secondary/5 rounded-xl border border-dashed border-border p-4 aspect-square transition-colors hover:bg-secondary/10"
                  >
                    <div
                      onClick={() => {
                        setActiveStoryIdx(idx);
                      }}
                      className="relative w-20 h-20 shrink-0 rounded-full border-2 border-primary/50 p-0.5 bg-background shadow-sm cursor-pointer active:scale-95 transition-transform"
                    >
                      <div className="w-full h-full rounded-full overflow-hidden">
                        {story.mediaType === "video" ? (
                          <video
                            src={story.imageUrl}
                            className="w-full h-full object-cover"
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
                            className="w-full h-full object-cover"
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
                      className="absolute top-2 right-2 p-1 bg-destructive hover:bg-destructive/90 text-white rounded-full shadow-sm transition opacity-100 cursor-pointer z-10"
                      title="Delete story"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <StoryViewer
        stories={stories}
        activeIndex={activeStoryIdx}
        onIndexChange={setActiveStoryIdx}
      />
    </div>
  );
}
