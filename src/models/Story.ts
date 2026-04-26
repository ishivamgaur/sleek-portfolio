import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    type: { type: String }, // On-site, Remote, Hybrid
    content: { type: String, required: true },
    date: { type: String }, // End date or "Current"
    startDate: { type: String },
    tech: [{ type: String }],
    imageUrl: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Story || mongoose.model("Story", StorySchema);
