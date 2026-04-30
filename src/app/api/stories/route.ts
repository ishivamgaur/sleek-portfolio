import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import { isAuthenticated } from "@/lib/auth";

// GET — public, fetch all stories
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const stories = await Story.find({}).sort({ createdAt: -1 });
    return NextResponse.json(stories);
  } catch (error) {
    console.error("Stories GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 },
    );
  }
}

// POST — admin only, create a new story
export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const newStory = await Story.create(body);
    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error("Stories POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create story",
      },
      { status: 500 },
    );
  }
}
