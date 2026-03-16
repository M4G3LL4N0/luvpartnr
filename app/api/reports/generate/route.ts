import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/lib/supabase/server";

function safeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function safeScores(value: unknown) {
  const obj = typeof value === "object" && value !== null ? value as Record<string, unknown> : {};
  return {
    trustworthiness: Number(obj.trustworthiness ?? 0),
    emotionalMaturity: Number(obj.emotionalMaturity ?? 0),
    consistency: Number(obj.consistency ?? 0),
    compatibility: Number(obj.compatibility ?? 0),
    communicationQuality: Number(obj.communicationQuality ?? 0),
    relationshipRisk: Number(obj.relationshipRisk ?? 0),
  };
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY in environment variables." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const caseFileId = body.caseFileId;

    if (!caseFileId || typeof caseFileId !== "string") {
      return NextResponse.json({ error: "Missing caseFileId" }, { status: 400 });
    }

    const { data: caseFile, error: caseError } = await supabase
      .from("case_files")
      .select("*")
      .eq("id", caseFileId)
      .eq("user_id", user.id)
      .single();

    if (caseError || !caseFile) {
      return NextResponse.json({ error: "Case file not found" }, { status: 404 });
    }

    const { data: entries, error: entriesError } = await supabase
      .from("case_entries")
      .select("*")
      .eq("case_file_id", caseFileId)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);

    if (entriesError) {
      return NextResponse.json({ error: entriesError.message }, { status: 400 });
    }

    const entryText = (entries ?? [])
      .map((entry, index) => {
        return [
          `Entry ${index + 1}`,
          `Type: ${entry.entry_type}`,
          `Created: ${entry.created_at}`,
          `Content: ${entry.content}`,
        ].join("\n");
      })
      .join("\n\n---\n\n");

    const prompt = `
You are generating a structured relationship intelligence report.

Important rules:
- Do not claim certainty.
- Separate observed facts from inferences.
- Be calm, analytical, ethical, and grounded.
- Do not diagnose mental illness.
- Note when information is missing.
- Keep recommendations conservative and practical.

Return valid JSON with exactly this shape:
{
  "executiveSummary": "string",
  "scores": {
    "trustworthiness": number,
    "emotionalMaturity": number,
    "consistency": number,
    "compatibility": number,
    "communicationQuality": number,
    "relationshipRisk": number
  },
  "observedFacts": ["string"],
  "strongInferences": ["string"],
  "weakInferences": ["string"],
  "missingInformation": ["string"],
  "redFlags": ["string"],
  "greenFlags": ["string"],
  "nextSteps": ["string"],
  "longTermOutlook": {
    "oneYear": "string",
    "fiveYears": "string",
    "twentyYears": "string"
  },
  "overallScore": number
}

Case file:
- title: ${caseFile.title ?? ""}
- subject_name: ${caseFile.subject_name ?? ""}
- relationship_stage: ${caseFile.relationship_stage ?? ""}

Entries:
${entryText || "No entries yet."}
`.trim();

    const response = await openai.responses.create({
      model: "gpt-5.4",
      input: prompt,
      text: {
        format: {
          type: "json_schema",
          name: "relationship_report",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              executiveSummary: { type: "string" },
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
              observedFacts: { type: "array", items: { type: "string" } },
              strongInferences: { type: "array", items: { type: "string" } },
              weakInferences: { type: "array", items: { type: "string" } },
              missingInformation: { type: "array", items: { type: "string" } },
              redFlags: { type: "array", items: { type: "string" } },
              greenFlags: { type: "array", items: { type: "string" } },
              nextSteps: { type: "array", items: { type: "string" } },
              longTermOutlook: {
                type: "object",
                additionalProperties: false,
                properties: {
                  oneYear: { type: "string" },
                  fiveYears: { type: "string" },
                  twentyYears: { type: "string" }
                },
                required: ["oneYear", "fiveYears", "twentyYears"]
              },
              overallScore: { type: "number" }
            },
            required: [
              "executiveSummary",
              "scores",
              "observedFacts",
              "strongInferences",
              "weakInferences",
              "missingInformation",
              "redFlags",
              "greenFlags",
              "nextSteps",
              "longTermOutlook",
              "overallScore"
            ]
          }
        }
      }
    });

    const raw =
      response.output_text ||
      "{}";

    const parsed = JSON.parse(raw);

    const report = {
      executiveSummary: String(parsed.executiveSummary ?? ""),
      scores: safeScores(parsed.scores),
      observedFacts: safeArray(parsed.observedFacts),
      strongInferences: safeArray(parsed.strongInferences),
      weakInferences: safeArray(parsed.weakInferences),
      missingInformation: safeArray(parsed.missingInformation),
      redFlags: safeArray(parsed.redFlags),
      greenFlags: safeArray(parsed.greenFlags),
      nextSteps: safeArray(parsed.nextSteps),
      longTermOutlook: {
        oneYear: String(parsed.longTermOutlook?.oneYear ?? ""),
        fiveYears: String(parsed.longTermOutlook?.fiveYears ?? ""),
        twentyYears: String(parsed.longTermOutlook?.twentyYears ?? "")
      },
      overallScore: Number(parsed.overallScore ?? 0)
    };

    const { data, error } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        title: "Relationship Intelligence Report",
        summary: report.executiveSummary,
        overall_score: report.overallScore,
        report_json: report
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ reportId: data.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
