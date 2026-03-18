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
    .select("id, title, memory_summary")
    .eq("user_id", user.id);

  const combined = cases?.map(c => c.memory_summary).join("\n\n");

  const prompt = `
Analyze patterns across multiple relationships.

Find:
- repeated behaviors
- repeated partner types
- user tendencies
- risk patterns

Be precise and structured.
`;

  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      { role: "system", content: prompt },
      { role: "user", content: combined || "" },
    ],
  });

  return NextResponse.json({
    insights: response.output_text,
  });
}
