import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";

export async function GET() {
  try {
    await dbConnect();
    // Sort so newest experiences appear first
    const stories = await Story.find({}).sort({ startDate: -1 });
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const newStory = await Story.create(body);
    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create story" },
      { status: 500 },
    );
  }
}
