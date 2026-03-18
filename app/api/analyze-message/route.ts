import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ error: "Message required" }, { status: 400 });
  }

  const systemPrompt = `
You are a high-level human communication analyst.

Analyze the following message with precision.

Return a JSON object with these fields:
- tone: concise string
- intent: concise string (what they actually want)
- emotionalState: concise string
- riskLevel: "low" | "medium" | "high"
- hiddenSignals: array of concise bullet points
- suggestedReplies: object with 3 fields:
    - neutral: string (realistic, human, copy-paste ready, matches situation, avoids cringe/over-explaining)
    - confident: string (realistic, human, copy-paste ready, matches situation, avoids cringe/over-explaining)
    - assertive: string (realistic, human, copy-paste ready, matches situation, avoids cringe/over-explaining)

Rules:
- No fluff
- No emotional coaching language
- Analytical, clear, grounded
- Replies must be realistic, human, and copy-paste ready
- Replies must match the tone of the situation
- Avoid cringe, over-explaining, or generic advice
- Output only valid JSON, no markdown or commentary
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.4,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    // Try to parse the JSON from the model's response
    let result = null;
    const content = response.choices[0]?.message?.content ?? "";
    try {
      result = JSON.parse(content);
    } catch (e) {
      // fallback: return as text if parsing fails
      return NextResponse.json({
        error: "Failed to parse model response as JSON",
        raw: content,
      }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}
