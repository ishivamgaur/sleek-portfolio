"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStory,
  updateBannerImage,
  updateProfileImage,
} from "@/store/slices/portfolioSlice";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  StoryData,
} from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminPage() {
  const dispatch = useDispatch();
  const bannerImg = useSelector(
    (state: RootState) => state.portfolio.bannerImage,
  );
  const profileImg = useSelector(
    (state: RootState) => state.portfolio.profileImage,
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [originalBannerUrl, setOriginalBannerUrl] = useState("");
  const [originalProfileUrl, setOriginalProfileUrl] = useState("");
  const [stories, setStories] = useState<StoryData[]>([]);
  const [previousBanners, setPreviousBanners] = useState<any[]>([]);
  const [previousProfiles, setPreviousProfiles] = useState<any[]>([]);
  const [currentBannerPublicId, setCurrentBannerPublicId] = useState("");
  const [currentProfilePublicId, setCurrentProfilePublicId] = useState("");

  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const loadStories = () => {
    fetchStories()
      .then((data) => setStories(data))
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

  useEffect(() => {
    if (activeStoryIdx !== null) {
      setProgress(0);
      setIsPaused(false);
    }
  }, [activeStoryIdx]);

  // Check auth + fetch current settings on mount
  useEffect(() => {
    checkAuth()
      .then((authed) => setIsLoggedIn(authed))
      .catch(() => setIsLoggedIn(false))
      .finally(() => setIsLoading(false));

    fetchSettings()
      .then((s: any) => {
        setBannerUrl(s.bannerImage || "");
        setProfileUrl(s.profileImage || "");
        setOriginalBannerUrl(s.bannerImage || "");
        setOriginalProfileUrl(s.profileImage || "");
        setPreviousBanners(s.previousBanners || []);
        setPreviousProfiles(s.previousProfiles || []);
      })
      .catch(() => {});

    loadStories();
  }, []);

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
    } catch (err: any) {
      alert(err.message || "Failed to add story");
    }
  };

  const handleDeleteStory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await deleteStory(id);
      alert("Story deleted successfully!");
      loadStories();
    } catch (err: any) {
      alert(err.message || "Failed to delete story");
    }
  };

  const handleUpdateImages = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await updateSettings({
        bannerImage: bannerUrl || undefined,
        profileImage: profileUrl || undefined,
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
      if (res) {
        setPreviousBanners(res.previousBanners || []);
        setPreviousProfiles(res.previousProfiles || []);
      }
      alert("Images updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update images");
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
    } catch (err: any) {
      alert(err.message || "Failed to delete image");
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
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
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
        <Card className="w-full max-w-md border-border/50 shadow-sm">
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
    <div className="space-y-8 px-4  pt-24 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-[15px]">
            Manage your portfolio projects and professional experience.
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Site Media</CardTitle>
            <CardDescription>
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
              <Button
                type="submit"
                disabled={
                  bannerUrl === originalBannerUrl &&
                  profileUrl === originalProfileUrl
                }
                className="w-full md:w-auto font-bold mt-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Update Images
              </Button>

              {/* Previous Banners */}
              {previousBanners && previousBanners.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-border mt-4">
                  <Label className="text-sm font-medium">
                    Previous Banners
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {previousBanners.map((b: any, idx: number) => (
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
                          className="absolute top-1 right-1 p-1 bg-background/80 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Delete image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Profiles */}
              {previousProfiles && previousProfiles.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-border mt-4">
                  <Label className="text-sm font-medium">
                    Previous Profile Pictures
                  </Label>
                  <div className="flex flex-wrap gap-4">
                    {previousProfiles.map((p: any, idx: number) => (
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
                          className="absolute top-0 right-0 p-1 bg-destructive hover:bg-destructive/90 text-white rounded-full shadow-sm transition opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                          title="Delete image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-8">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Add New Story</CardTitle>
            <CardDescription>
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

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Manage Stories</CardTitle>
            <CardDescription>
              View and remove your active stories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stories.length === 0 ? (
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
                      onClick={() => setActiveStoryIdx(idx)}
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
                            src={story.imageUrl}
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
                        story._id && handleDeleteStory(story._id);
                      }}
                      className="absolute -top-1 right-3 p-1 bg-destructive hover:bg-destructive/90 text-white rounded-full shadow-sm transition opacity-0 group-hover:opacity-100 cursor-pointer z-10"
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
                    <AvatarImage src={profileUrl || "/profile-pic.jpg"} />
                    <AvatarFallback>SG</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold">Shivam Gaur</p>
                      {stories[activeStoryIdx]?.createdAt && (
                        <>
                          <span className="text-white/60 text-xs">•</span>
                          <span className="text-white/70 text-xs font-normal tracking-wide">
                            {formatTimeAgo(stories[activeStoryIdx].createdAt)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(!isPaused);
                    }}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
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
                      setActiveStoryIdx(null);
                    }}
                    className="p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div
                className="flex-1 relative bg-black flex items-center justify-center cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                {stories[activeStoryIdx]?.imageUrl ? (
                  stories[activeStoryIdx].mediaType === "video" ? (
                    <video
                      src={stories[activeStoryIdx].imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={stories[activeStoryIdx].imageUrl}
                      alt="Story"
                      className="w-full h-full object-contain"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 flex items-center justify-center text-center"></div>
                )}
              </div>

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
                    handleNext(false);
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
