import Video from "@/models/Video.model";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

// This is how to extract `params` in App Router API routes
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Id not found" }, { status: 400 });
  }

  try {
    await dbConnect();
    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error("Error fetching video: ", error);
    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 }
    );
  }
}
