import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json(
      { error: "Message required" },
      { status: 400 }
    );
  }

  const systemPrompt = `
You are a high-level human communication analyst.

Analyze the following message with precision and return ONLY a JSON object that includes these fields:
- tone: concise string (e.g., "neutral", "urgent", "apologetic")
- intent: concise string (what they actually want, e.g., "request help", "express frustration")
- emotionalState: concise string (e.g., "calm", "anxious", "angry")
- riskLevel: "low" | "medium" | "high" (based on potential conflict/legal implications)
- hiddenSignals: array of concise bullet points (e.g., "mentions legal terms", "uses all caps")
- suggestedResponses: object with exactly three fields:
    neutral: string (realistic, copy-paste ready, matches situation)
    confident: string (direct but polite)
    assertive: string (clear boundary-setting)

Rules:
- Output ONLY valid JSON, no markdown, no extra commentary
- Keep each value short and actionable
- Do not add any fields beyond those listed
- Prioritize practicality over theoretical analysis
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const content = response.choices[0]?.message?.content ?? "";
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse model output as JSON" },
        { status: 500 }
      );
    }

    // Enforce required structure
    const result = {
      tone: parsed.tone || "neutral",
      intent: parsed.intent || "general inquiry",
      emotionalState: parsed.emotionalState || "neutral",
      riskLevel: parsed.riskLevel || "low",
      hiddenSignals: Array.isArray(parsed.hiddenSignals) ? parsed.hiddenSignals : [],
      suggestedResponses: {
        neutral: parsed.suggestedResponses?.neutral || "I'm here to help with this.",
        confident: parsed.suggestedResponses?.confident || "Please clarify your request.",
        assertive: parsed.suggestedResponses?.assertive || "I need specific details to proceed."
      }
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Analysis failed" },
      { status: 500 }
    );
  }
}
