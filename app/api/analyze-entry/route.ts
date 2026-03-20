import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();

  const { entryId } = await req.json();

  const { data: entry } = await supabase
    .from("case_entries")
    .select("*")
    .eq("id", entryId)
    .single();

  if (!entry) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  const prompt = `
Analyze this relationship event:

${entry.content}

Return:
- tags (array)
- riskLevel
- signalSummary
`;

  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: prompt,
  });

  await supabase
    .from("case_entries")
    .update({
      tags: ["analyzed"],
    })
    .eq("id", entryId);

  return NextResponse.json({ ok: true });
}
