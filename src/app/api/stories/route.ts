import { NextRequest } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import { isAuthenticated } from "@/lib/auth";
import { jsonNoStore, tooManyRequests } from "@/lib/http";
import { rateLimitRequest } from "@/lib/ratelimit";

// GET — public, fetch all stories
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const stories = await Story.find({}).sort({ createdAt: 1 });
    return jsonNoStore(stories);
  } catch (error) {
    console.error("Stories GET error:", error);
    return jsonNoStore({ error: "Failed to fetch stories" }, { status: 500 });
  }
}

// POST — admin only, create a new story
export async function POST(req: NextRequest) {
  try {
    const limit = await rateLimitRequest(req, {
      keyPrefix: "stories:post",
      limit: 30,
      windowMs: 60_000,
    });
    if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

    const authed = await isAuthenticated();
    if (!authed) {
      return jsonNoStore({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const newStory = await Story.create(body);
    return jsonNoStore(newStory, { status: 201 });
  } catch (error) {
    console.error("Stories POST error:", error);
    return jsonNoStore(
      { error: error instanceof Error ? error.message : "Failed to create story" },
      { status: 500 },
    );
  }
}
