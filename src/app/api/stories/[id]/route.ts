import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Story from "@/models/Story";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const deletedStory = await Story.findByIdAndDelete(id);

    if (!deletedStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("Story DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete story" },
      { status: 500 },
    );
  }
}
