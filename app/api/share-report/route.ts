import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { summary } = await req.json();

  if (!summary) {
    return NextResponse.json({ error: "Missing summary" }, { status: 400 });
  }

  const short = summary.slice(0, 180);

  return NextResponse.json({
    text: `AI Relationship Insight:\n\n${short}...\n\nAnalyze yours → luvpartnr.com`,
  });
}
