import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    insights:
      "Track patterns across multiple relationships before drawing conclusions. The strongest signals usually come from repeated behavior, not single moments."
  });
}
