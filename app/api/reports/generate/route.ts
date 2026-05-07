import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function buildFallbackReport(entryCount: number) {
  const overallScore = Math.max(45, Math.min(78, 58 + Math.floor(entryCount / 2)));

  return {
    executiveSummary:
      "This report is generated in local analysis mode. The available entries suggest the relationship should be evaluated through consistency, accountability, communication quality, and missing information before making deeper commitments.",
    overallScore,
    scores: {
      trustworthiness: 62,
      emotionalMaturity: 64,
      consistency: 58,
      compatibility: 61,
      communicationQuality: 63,
      relationshipRisk: 42
    },
    observedFacts: [
      "The case contains user-submitted timeline entries.",
      "The current report is based only on the available saved information.",
      "More repeated examples would improve confidence."
    ],
    strongInferences: [
      "Consistency over time should be treated as the most important signal.",
      "Decision quality improves when facts are separated from assumptions."
    ],
    weakInferences: [
      "There may be incomplete context around motivations and emotional state.",
      "Some signals may change as more entries are added."
    ],
    redFlags: [
      "Insufficient information can lead to over-interpretation.",
      "Repeated inconsistency should be monitored carefully."
    ],
    greenFlags: [
      "The user is tracking events instead of relying only on memory.",
      "Structured review can reduce emotional bias."
    ],
    missingInformation: [
      "Clear examples of accountability after conflict.",
      "Long-term values and commitment expectations.",
      "Patterns under stress.",
      "Consistency between words and actions."
    ],
    nextSteps: [
      "Add more timeline entries before making major decisions.",
      "Track repeated patterns, not isolated moments.",
      "Ask direct questions where information is missing.",
      "Avoid escalating commitment until consistency is clearer."
    ],
    longTermOutlook: {
      oneYear: "More data is needed, but consistency and repair behavior will be decisive.",
      fiveYears: "Long-term stability depends on repeated accountability and aligned values.",
      twentyYears: "Not enough evidence exists yet for a confident long-range projection."
    }
  };
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseFileId } = await req.json();

    const { data: caseFile } = await supabase
      .from("case_files")
      .select("*")
      .eq("id", caseFileId)
      .eq("user_id", user.id)
      .single();

    if (!caseFile) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    const { data: entries } = await supabase
      .from("case_entries")
      .select("*")
      .eq("case_file_id", caseFileId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);

    const { count } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("case_file_id", caseFileId)
      .eq("user_id", user.id);

    const version = (count ?? 0) + 1;
    const report = buildFallbackReport(entries?.length ?? 0);

    const { data, error } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        title: `Relationship Intelligence Report v${version}`,
        summary: report.executiveSummary,
        overall_score: report.overallScore,
        report_json: report,
        public_id: crypto.randomUUID().slice(0, 12)
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase
      .from("case_files")
      .update({
        memory_summary: report.executiveSummary,
        report_count: (caseFile.report_count ?? 0) + 1,
        alert_level: report.scores.relationshipRisk >= 70 ? "high" : report.scores.relationshipRisk >= 50 ? "medium" : "low"
      })
      .eq("id", caseFileId)
      .eq("user_id", user.id);

    return NextResponse.json({ reportId: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
