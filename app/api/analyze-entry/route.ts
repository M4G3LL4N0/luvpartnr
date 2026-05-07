import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { entryId } = await req.json();

  if (!entryId) {
    return NextResponse.json({ error: "entryId required" }, { status: 400 });
  }

  await supabase
    .from("case_entries")
    .update({ tags: ["reviewed"] })
    .eq("id", entryId);

  return NextResponse.json({ ok: true });
}
