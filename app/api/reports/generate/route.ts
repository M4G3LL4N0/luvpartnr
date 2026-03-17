import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type ReportSchema = {
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

function safeParseReport(text: string): ReportSchema {
  const parsed = JSON.parse(text);

  return {
    executiveSummary: String(parsed.executiveSummary ?? ""),
    overallScore: Number(parsed.overallScore ?? 0),
    scores: {
      trustworthiness: Number(parsed.scores?.trustworthiness ?? 0),
      emotionalMaturity: Number(parsed.scores?.emotionalMaturity ?? 0),
      consistency: Number(parsed.scores?.consistency ?? 0),
      compatibility: Number(parsed.scores?.compatibility ?? 0),
      communicationQuality: Number(parsed.scores?.communicationQuality ?? 0),
      relationshipRisk: Number(parsed.scores?.relationshipRisk ?? 0),
    },
    observedFacts: Array.isArray(parsed.observedFacts) ? parsed.observedFacts.map(String) : [],
    strongInferences: Array.isArray(parsed.strongInferences) ? parsed.strongInferences.map(String) : [],
    weakInferences: Array.isArray(parsed.weakInferences) ? parsed.weakInferences.map(String) : [],
    redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags.map(String) : [],
    greenFlags: Array.isArray(parsed.greenFlags) ? parsed.greenFlags.map(String) : [],
    missingInformation: Array.isArray(parsed.missingInformation) ? parsed.missingInformation.map(String) : [],
    nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps.map(String) : [],
    longTermOutlook: {
      oneYear: String(parsed.longTermOutlook?.oneYear ?? ""),
      fiveYears: String(parsed.longTermOutlook?.fiveYears ?? ""),
      twentyYears: String(parsed.longTermOutlook?.twentyYears ?? ""),
    },
  };
}

export async function POST(req: Request) {
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
    })) ?? [];

  // Count existing reports for versioning
  const { count: reportCount } = await supabase
    .from("reports")
    .select("*", { count: "exact", head: true })
    .eq("case_file_id", caseFileId)
    .eq("user_id", user.id);

  const version = reportCount + 1;
  const title = `Relationship Intelligence Report v${version}`;

  const systemPrompt = `
You are a high-precision relationship intelligence analyst.

Your job:
- analyze behavioral patterns
- separate facts from inferences
- avoid certainty when data is incomplete
- highlight risks, signals, and missing information

STRICT RULES:
- Do NOT assume facts not present
- Clearly separate:
  - observed facts
  - strong inferences
  - weak inferences
- Always include missing information
- Do NOT give emotional advice
- Stay analytical and structured

Return valid JSON only.
`;

  const userPrompt = `
CASE FILE:
Title: ${caseFile.title}
Subject: ${caseFile.subject_name || "Unknown"}
Stage: ${caseFile.relationship_stage || "Unknown"}

ENTRIES:
${JSON.stringify(formattedEntries, null, 2)}

Return JSON with exactly this shape:
{
  "executiveSummary": "string",
  "overallScore": 0,
  "scores": {
    "trustworthiness": 0,
    "emotionalMaturity": 0,
    "consistency": 0,
    "compatibility": 0,
    "communicationQuality": 0,
    "relationshipRisk": 0
  },
  "observedFacts": ["string"],
  "strongInferences": ["string"],
  "weakInferences": ["string"],
  "redFlags": ["string"],
  "greenFlags": ["string"],
  "missingInformation": ["string"],
  "nextSteps": ["string"],
  "longTermOutlook": {
    "oneYear": "string",
    "fiveYears": "string",
    "twentyYears": "string"
  }
}
`;

  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "relationship_report",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              executiveSummary: { type: "string" },
              overallScore: { type: "number" },
              scores: {
                type: "object",
                additionalProperties: false,
                properties: {
                  trustworthiness: { type: "number" },
                  emotionalMaturity: { type: "number" },
                  consistency: { type: "number" },
                  compatibility: { type: "number" },
                  communicationQuality: { type: "number" },
                  relationshipRisk: { type: "number" }
                },
                required: [
                  "trustworthiness",
                  "emotionalMaturity",
                  "consistency",
                  "compatibility",
                  "communicationQuality",
                  "relationshipRisk"
                ]
              },
              observedFacts: {
                type: "array",
                items: { type: "string" }
              },
              strongInferences: {
                type: "array",
                items: { type: "string" }
              },
              weakInferences: {
                type: "array",
                items: { type: "string" }
              },
              redFlags: {
                type: "array",
                items: { type: "string" }
              },
              greenFlags: {
                type: "array",
                items: { type: "string" }
              },
              missingInformation: {
                type: "array",
                items: { type: "string" }
              },
              nextSteps: {
                type: "array",
                items: { type: "string" }
              },
              longTermOutlook: {
                type: "object",
                additionalProperties: false,
                properties: {
                  oneYear: { type: "string" },
                  fiveYears: { type: "string" },
                  twentyYears: { type: "string" }
                },
                required: ["oneYear", "fiveYears", "twentyYears"]
              }
            },
            required: [
              "executiveSummary",
              "overallScore",
              "scores",
              "observedFacts",
              "strongInferences",
              "weakInferences",
              "redFlags",
              "greenFlags",
              "missingInformation",
              "nextSteps",
              "longTermOutlook"
            ]
          }
        }
      }
    });

    const report = safeParseReport(response.output_text);

    const { data, error } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        title: title,
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
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
