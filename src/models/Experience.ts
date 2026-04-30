import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    type: { type: String }, // On-site, Remote, Hybrid
    content: { type: String, required: true },
    date: { type: String }, // End date or "Current"
    startDate: { type: String },
    tech: [{ type: String }],
  },
  { timestamps: true }
);

delete mongoose.models.Experience;
export default mongoose.model("Experience", ExperienceSchema);
