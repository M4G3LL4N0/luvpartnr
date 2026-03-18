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
  entryTags?: Record<string, string[]>;
};

const ALLOWED_TAGS = new Set([
  "inconsistency",
  "avoidance",
  "emotional volatility",
  "strong interest",
  "withdrawal",
  "mixed signals"
]);

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
    entryTags: parsed.entryTags || {},
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

  // Load memory summary if exists
  const memorySummary = caseFile.memory_summary || {};

  // Fetch case entries
  const { data: entries } = await supabase
    .from("case_entries")
    .select("*")
    .eq("case_file_id", caseFileId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(30);

  const formattedEntries =
    entries?.map((e) => ({
      id: e.id,
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

  const version = (reportCount ?? 0) + 1;
  const title = `Relationship Intelligence Report v${version}`;

  // Build prompt with memory context
  const systemPrompt = `
You are a high-precision relationship intelligence analyst.

Your job:
- analyze behavioral patterns
- separate facts from inferences
- avoid certainty when data is incomplete
- highlight risks, signals, and missing information

SIGNAL TAGGING:
For each entry, assign tags from this list based on behavioral signals:
- inconsistency: contradictory statements or behaviors
- avoidance: dodging topics, questions, or responsibilities
- emotional volatility: rapid mood swings, overreactions
- strong interest: intense focus, pursuit, or investment
- withdrawal: pulling back, reduced engagement, silence
- mixed signals: conflicting messages, hot-and-cold behavior

Rules for tagging:
- Only assign tags that clearly apply to the entry
- An entry can have multiple tags
- If no tags apply, return an empty array for that entry
- Do NOT invent new tags outside this list

STRICT RULES:
- Do NOT assume facts not present
- Clearly separate:
  - observed facts
  - strong inferences
  - weak inferences
- Always include missing information
- Do NOT give emotional advice
- Stay analytical and structured

MEMORY CONTEXT:
${JSON.stringify(memorySummary, null, 2)}

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
  },
  "entryTags": {
    "entry_id_1": ["tag1", "tag2"],
    "entry_id_2": ["tag3"]
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
              },
              entryTags: {
                type: "object",
                additionalProperties: {
                  type: "array",
                  items: { type: "string" }
                }
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

    // Update entry tags (without overwriting manually added ones)
    const entryTags = report.entryTags || {};
    
    const updatePromises = formattedEntries.map(async (entry) => {
      const entryId = entry.id;
      const newTags = (entryTags[entryId] || [])
        .filter(tag => typeof tag === 'string' && ALLOWED_TAGS.has(tag.toLowerCase()));

      if (newTags.length === 0) {
        return;
      }

      // Get current tags
      const { data: currentEntry } = await supabase
        .from("case_entries")
        .select("tags")
        .eq("id", entryId)
        .single();

      const currentTags = currentEntry?.tags || [];
      
      // Merge tags (case-insensitive deduplication)
      const mergedTags = [...new Set([
        ...currentTags.map((t: string) => t.toLowerCase()),
        ...newTags.map((t: string) => t.toLowerCase())
      ])];

      // Update entry
      await supabase
        .from("case_entries")
        .update({ tags: mergedTags })
        .eq("id", entryId);
    });

    await Promise.all(updatePromises);

    // Create compressed memory update
    const memoryUpdate = {
      version: version,
      executiveSummary: report.executiveSummary,
      keyScores: report.scores,
      redFlags: report.redFlags.slice(0, 3),
      greenFlags: report.greenFlags.slice(0, 3),
      nextSteps: report.nextSteps.slice(0, 3),
      timestamp: new Date().toISOString(),
    };

    // Update memory summary
    const updatedMemory = {
      ...memorySummary,
      ...memoryUpdate,
    };

    // Save report
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

    // Update case file memory
    await supabase
      .from("case_files")
      .update({ memory_summary: updatedMemory })
      .eq("id", caseFileId)
      .single();

    return NextResponse.json({ reportId: data.id });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "AI generation failed" },
      { status: 500 }
    );
  }
}
