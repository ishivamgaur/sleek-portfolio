import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
    },
    bannerImage: {
      type: String,
      default: "/banner.jpg",
    },
    profileImage: {
      type: String,
      default: "https://github.com/ishivamgaur.png?size=200",
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
