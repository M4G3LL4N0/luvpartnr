import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
const openai = hasOpenAI
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

type ReportData = {
  executiveSummary: string;
  overallScore: number;
  scores: {
    trustworthiness: number;
    emotionalMaturity: number;
    consistency: number;
    compatibility: number;
    communicationQuality: number;
    relationshipRisk: number;
  };
  observedFacts: string[];
  strongInferences: string[];
  weakInferences: string[];
  redFlags: string[];
  greenFlags: string[];
  missingInformation: string[];
  nextSteps: string[];
  longTermOutlook: {
    oneYear: string;
    fiveYears: string;
    twentyYears: string;
  };
};

function parseReportData(raw: string): ReportData {
  const parsed = JSON.parse(raw) as ReportData;

  if (
    typeof parsed.executiveSummary !== "string" ||
    typeof parsed.overallScore !== "number"
  ) {
    throw new Error("Invalid AI report shape");
  }

  if (parsed.overallScore < 0 || parsed.overallScore > 100) {
    throw new Error("Invalid overall score");
  }

  return parsed;
}

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseClient();

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

    const formattedEntries =
      entries?.map((e) => ({
        type: e.entry_type,
        content: e.content,
        created_at: e.created_at,
        tags: e.tags ?? [],
      })) || [];

    const { count: existingCount } = await supabase
      .from("reports")
      .select("*", { count: "exact", head: true })
      .eq("case_file_id", caseFileId)
      .eq("user_id", user.id);

    const versionNumber = (existingCount ?? 0) + 1;

    const systemPrompt = `
You are a high-precision relationship intelligence analyst.

Your job:
- analyze behavioral patterns
- separate facts from inferences
- avoid certainty when data is incomplete
- highlight risks, contradictions, signals, and missing information

STRICT RULES:
- Do NOT assume facts not present
- Clearly separate:
  - observedFacts
  - strongInferences
  - weakInferences
- Always include missingInformation
- Do NOT give melodramatic advice
- Stay analytical, precise, and conservative
- Base reasoning only on the provided case file and entries
`;

    const userPrompt = `
CASE FILE
Title: ${caseFile.title}
Subject: ${caseFile.subject_name || "Unknown"}
Stage: ${caseFile.relationship_stage || "Unknown"}
Relationship Type: ${caseFile.relationship_type || "dating"}
Memory Summary: ${caseFile.memory_summary || "None"}

RECENT ENTRIES
${JSON.stringify(formattedEntries, null, 2)}

Return valid JSON only.
`;

    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const outputText = response.output_text?.trim();

    if (!outputText) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
    }

    let reportData: ReportData;

    try {
      reportData = parseReportData(outputText);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format in AI response" },
        { status: 500 }
      );
    }

    const memorySummary = [
      caseFile.memory_summary || "",
      reportData.executiveSummary,
      ...reportData.strongInferences.slice(0, 3),
    ]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000);

    const { data: reportRow, error: insertError } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        title: `Relationship Intelligence Report v${versionNumber}`,
        summary: reportData.executiveSummary,
        overall_score: reportData.overallScore,
        report_json: reportData,
        public_id: crypto.randomUUID().slice(0, 12),
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    await supabase
      .from("case_files")
      .update({
        memory_summary: memorySummary,
        report_count: (caseFile.report_count ?? 0) + 1,
        alert_level:
          reportData.scores.relationshipRisk >= 75
            ? "high"
            : reportData.scores.relationshipRisk >= 50
              ? "medium"
              : "low",
      })
      .eq("id", caseFileId)
      .eq("user_id", user.id);

    return NextResponse.json({ reportId: reportRow.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
