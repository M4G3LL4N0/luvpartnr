import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = String(body.message || body.input || "").trim();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const lower = message.toLowerCase();
    const riskLevel =
      lower.includes("never") || lower.includes("done") || lower.includes("whatever")
        ? "medium"
        : lower.includes("sorry") || lower.includes("understand")
          ? "low"
          : "low";

    return NextResponse.json({
      tone: "Measured and context-dependent",
      intent: "The message may be expressing a need, boundary, reaction, or emotional signal. More context would improve confidence.",
      emotionalState: "Unclear from one message alone",
      riskLevel,
      hiddenSignals: [
        "Interpretation should stay cautious without more context.",
        "Look for consistency between this message and repeated behavior.",
        "Avoid over-reading one isolated text."
      ],
      suggestedResponses: {
        neutral: "I hear you. Can you help me understand what you mean by that?",
        confident: "I want to understand this clearly, so I’d rather talk directly than guess.",
        assertive: "I’m open to talking, but I need clarity and consistency if we’re going to keep discussing this."
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
