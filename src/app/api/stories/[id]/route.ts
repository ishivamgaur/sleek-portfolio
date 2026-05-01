import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const limit = await rateLimitRequest(req, {
      keyPrefix: "stories:delete",
      limit: 30,
      windowMs: 60_000,
    });
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const { id } = await params;
    const authed = await isAuthenticated();
    if (!authed) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return jsonNoStore({ error: "Story not found" }, { status: 404 });
    }

    return jsonNoStore({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Story DELETE error:", error);
    return jsonNoStore({ error: "Failed to delete story" }, { status: 500 });
  }
}
