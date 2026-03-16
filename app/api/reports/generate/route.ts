import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function buildMockReport(entryCount: number) {
  const overall = Math.max(35, Math.min(82, 55 + Math.floor(entryCount / 2)));

  return {
    executiveSummary:
      "Current evidence suggests meaningful emotional interest, but consistency, accountability, and long-term stability remain under-proven. Further observation is warranted before deeper commitment.",
    scores: {
      trustworthiness: 61,
      emotionalMaturity: 68,
      consistency: 54,
      compatibility: 66,
      communicationQuality: 63,
      relationshipRisk: 58,
    },
    redFlags: [
      "Warmth-to-distance shifts",
      "Limited evidence of repair after conflict",
      "Inconsistent follow-through",
    ],
    greenFlags: [
      "Emotional warmth is present",
      "Some signs of empathy and care",
      "Engagement improves when the dynamic feels safe",
    ],
    missingInformation: [
      "Stress response",
      "Financial habits",
      "Conflict repair consistency",
      "Long-term life alignment",
    ],
    nextSteps: [
      "Observe consistency for 30 days",
      "Ask direct questions about accountability",
      "Do not escalate commitment yet",
    ],
    longTermOutlook: {
      oneYear: "Promising but unstable without stronger consistency.",
      fiveYears: "Could become draining if current inconsistency remains unchanged.",
      twentyYears: "Not enough evidence supports long-term reliability at this stage.",
    },
    overallScore: overall,
  };
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { caseFileId } = await req.json();

  const { data: entries, error: entriesError } = await supabase
    .from("case_entries")
    .select("*")
    .eq("case_file_id", caseFileId)
    .eq("user_id", user.id);

  if (entriesError) {
    return NextResponse.json({ error: entriesError.message }, { status: 400 });
  }

  const report = buildMockReport(entries?.length ?? 0);

  const { data, error } = await supabase
    .from("reports")
    .insert({
      case_file_id: caseFileId,
      user_id: user.id,
      title: "Relationship Intelligence Report",
      summary: report.executiveSummary,
      overall_score: report.overallScore,
      report_json: report,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ reportId: data.id });
}
