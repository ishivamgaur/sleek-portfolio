import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    mediaType: { type: String, enum: ["photo", "video"], default: "photo" },
  },
  { timestamps: true },
);

delete mongoose.models.Story;
export default mongoose.model("Story", StorySchema);
