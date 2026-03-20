import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: cases } = await supabase
    .from("case_files")
    .select("memory_summary")
    .eq("user_id", user.id);

  const combined =
    cases?.map((c) => c.memory_summary).filter(Boolean).join("\n") || "";

  const prompt = `
Analyze this user's relationship behavior patterns.

Find:
- recurring behaviors
- strengths
- weaknesses
- risks
`;

  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: prompt + "\n" + combined,
  });

  return NextResponse.json({
    profile: response.output_text,
  });
}
