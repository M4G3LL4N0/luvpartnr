import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { caseFileId } = await req.json();

  // Fetch case file
  const { data: caseFile, error: caseFileError } = await supabase
    .from("case_files")
    .select("id, title, subject_name, relationship_stage, created_at")
    .eq("id", caseFileId)
    .eq("user_id", user.id)
    .single();

  if (caseFileError || !caseFile) {
    return NextResponse.json(
      { error: "Case file not found or access denied" },
      { status: 404 }
    );
  }

  // Fetch case entries
  const { data: entries, error: entriesError } = await supabase
    .from("case_entries")
    .select("id, entry_type, content, created_at")
    .eq("case_file_id", caseFileId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  if (entriesError) {
    return NextResponse.json(
      { error: "Failed to fetch case entries" },
      { status: 400 }
    );
  }

  // Build prompt for OpenAI
  const prompt = `
You are a relationship intelligence analyst. Analyze the following case file and entries to generate a structured relationship intelligence report.

CASE FILE DETAILS:
- Title: ${caseFile.title}
- Subject Name: ${caseFile.subject_name || "Not provided"}
- Relationship Stage: ${caseFile.relationship_stage || "Not provided"}
- Created At: ${new Date(caseFile.created_at).toLocaleDateString()}

CASE ENTRIES (${entries.length} total):
${entries
  .map(
    (entry) => `
- [${new Date(entry.created_at).toLocaleDateString()}] ${entry.entry_type.toUpperCase()}: ${entry.content}`
  )
  .join("\n")}
  
Generate a JSON object with EXACTLY this structure (no additional fields, no markdown):
{
  "executiveSummary": "string (2-3 sentences summarizing key insights)",
  "scores": {
    "trustworthiness": number (0-100),
    "emotionalMaturity": number (0-100),
    "consistency": number (0-100),
    "compatibility": number (0-100),
    "communicationQuality": number (0-100),
    "relationshipRisk": number (0-100)
  },
  "redFlags": ["string", "string", "string"],
  "greenFlags": ["string", "string", "string"],
  "missingInformation": ["string", "string", "string", "string"],
  "nextSteps": ["string", "string", "string"],
  "longTermOutlook": {
    "oneYear": "string",
    "fiveYears": "string",
    "twentyYears": "string"
  },
  "overallScore": number (0-100)
}

Rules:
1. Base all scores and insights strictly on the provided case entries
2. If information is insufficient for a score, use 50 as neutral default
3. Red flags should be specific concerns observed in the entries
4. Green flags should be positive behaviors observed in the entries
5. Missing information should be specific gaps in the data provided
6. Next steps should be actionable recommendations based on the analysis
7. Long term outlook should be realistic projections based on current trajectory
8. Overall score should be weighted average of the six scores (trustworthiness 20%, emotionalMaturity 20%, consistency 15%, compatibility 15%, communicationQuality 15%, relationshipRisk 15% inverted)
9. Output ONLY valid JSON, no other text
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a relationship intelligence analyst that outputs only valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const reportText = completion.choices[0].message.content;
    if (!reportText) {
      throw new Error("Empty response from OpenAI");
    }

    let report;
    try {
      report = JSON.parse(reportText);
    } catch (parseError) {
      console.error("Failed to parse OpenAI response:", reportText);
      throw new Error("Invalid JSON response from OpenAI");
    }

    // Validate required fields
    const requiredFields = [
      "executiveSummary",
      "scores",
      "redFlags",
      "greenFlags",
      "missingInformation",
      "nextSteps",
      "longTermOutlook",
      "overallScore",
    ];
    for (const field of requiredFields) {
      if (!(field in report)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate scores structure
    const scoreKeys = [
      "trustworthiness",
      "emotionalMaturity",
      "consistency",
      "compatibility",
      "communicationQuality",
      "relationshipRisk",
    ];
    for (const key of scoreKeys) {
      if (
        typeof report.scores[key] !== "number" ||
        report.scores[key] < 0 ||
        report.scores[key] > 100
      ) {
        report.scores[key] = 50; // Reset to neutral if invalid
      }
    }

    // Validate arrays have exactly 3 items (except missingInformation which should have 4)
    if (!Array.isArray(report.redFlags) || report.redFlags.length !== 3) {
      report.redFlags = ["Insufficient data for red flag analysis"];
    }
    if (!Array.isArray(report.greenFlags) || report.greenFlags.length !== 3) {
      report.greenFlags = ["Insufficient data for green flag analysis"];
    }
    if (
      !Array.isArray(report.missingInformation) ||
      report.missingInformation.length !== 4
    ) {
      report.missingInformation = [
        "Stress response",
        "Financial habits",
        "Conflict repair consistency",
        "Long-term life alignment",
      ];
    }
    if (!Array.isArray(report.nextSteps) || report.nextSteps.length !== 3) {
      report.nextSteps = [
        "Gather more information about the subject",
        "Observe behavior over next 30 days",
        "Consider professional consultation if concerns persist",
      ];
    }

    // Validate longTermOutlook structure
    if (
      !report.longTermOutlook ||
      typeof report.longTermOutlook.oneYear !== "string" ||
      typeof report.longTermOutlook.fiveYears !== "string" ||
      typeof report.longTermOutlook.twentyYears !== "string"
    ) {
      report.longTermOutlook = {
        oneYear: "Insufficient data for one-year projection",
        fiveYears: "Insufficient data for five-year projection",
        twentyYears: "Insufficient data for twenty-year projection",
      };
    }

    // Validate overallScore
    if (
      typeof report.overallScore !== "number" ||
      report.overallScore < 0 ||
      report.overallScore > 100
    ) {
      // Calculate weighted average if scores are valid
      const weights = {
        trustworthiness: 0.2,
        emotionalMaturity: 0.2,
        consistency: 0.15,
        compatibility: 0.15,
        communicationQuality: 0.15,
        relationshipRisk: 0.15,
      };
      let weightedSum = 0;
      let totalWeight = 0;
      for (const [key, weight] of Object.entries(weights)) {
        if (typeof report.scores[key] === "number") {
          // Invert relationshipRisk for calculation (lower risk = higher score)
          const value =
            key === "relationshipRisk" ? 100 - report.scores[key] : report.scores[key];
          weightedSum += value * weight;
          totalWeight += weight;
        }
      }
      report.overallScore =
        totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50;
    }

    // Save report to database
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
      throw error;
    }

    return NextResponse.json({ reportId: data.id });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report: " + (error as Error).message },
      { status: 500 }
    );
  }
}
