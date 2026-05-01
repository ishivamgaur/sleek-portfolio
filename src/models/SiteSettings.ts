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
    previousBanners: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    previousProfiles: [
      {
        url: { type: String },
        publicId: { type: String },
      },
    ],
    resumeUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

// If the model exists, check if it has the resumeUrl field. If not, delete it so it can be re-registered with the new schema.
if (mongoose.models.SiteSettings) {
  const schema = mongoose.models.SiteSettings.schema;
  if (!schema.paths.resumeUrl) {
    delete mongoose.models.SiteSettings;
  }
}

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
