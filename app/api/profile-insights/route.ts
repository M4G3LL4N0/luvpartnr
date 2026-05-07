import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    profile:
      "Your relationship profile will become more useful as more case files and timeline entries are added. For now, focus on consistency, boundaries, and repeated patterns."
  });
}
