import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Experience from "@/models/Experience";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET — public, fetch all experiences
export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ startDate: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("Experiences GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 },
    );
  }
}

// POST — admin only, create a new experience
export async function POST(req: NextRequest) {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const newExp = await Experience.create(body);
    return NextResponse.json(newExp, { status: 201 });
  } catch (error) {
    console.error("Experiences POST error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create experience",
      },
      { status: 500 },
    );
  }
}
