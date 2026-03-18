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

Analyze the message with precision.

Return:
- tone (concise)
- intent (what they actually want)
- emotionalState
- riskLevel (low, medium, high)
- hiddenSignals (bullet points)
- suggestedResponses (3 options: neutral, confident, assertive)

Rules:
- no fluff
- no emotional coaching language
- analytical, clear, grounded
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      temperature: 0.4,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      result: response.output_text,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed" },
      { status: 500 }
    );
  }
}
