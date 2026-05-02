import mongoose from "mongoose";

const AnalyticsVisitSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true },
);

AnalyticsVisitSchema.index({ createdAt: -1 });
AnalyticsVisitSchema.index({ visitorId: 1, createdAt: -1 });

export default mongoose.models.AnalyticsVisit ||
  mongoose.model("AnalyticsVisit", AnalyticsVisitSchema);
