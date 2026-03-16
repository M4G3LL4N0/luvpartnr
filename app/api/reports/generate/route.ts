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

  // Fetch most recent 30 entries
  const { data: entries, error: entriesError } = await supabase
    .from("case_entries")
    .select("id, entry_type, content, created_at")
    .eq("case_file_id", caseFileId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(30);

  if (entriesError) {
    return NextResponse.json(
      { error: "Failed to fetch case entries" },
      { status: 400 }
    );
  }

  // Build grounded system prompt
  const prompt = `
You are a relationship intelligence analyst. Generate a structured report based on the following case data. Focus strictly on the provided entries and avoid assumptions.

CASE FILE DETAILS:
- Title: ${caseFile.title}
- Subject Name: ${caseFile.subject_name || "Not provided"}
- Relationship Stage: ${caseFile.relationship_stage || "Not provided"}
- Created At: ${new Date(caseFile.created_at).toLocaleDateString()}

RECENT ENTRIES (last 30):
${entries
  .slice(-30) // Ensure we only use up to 30 entries
  .map(
    (entry) => `
- [${new Date(entry.created_at).toLocaleDateString()}] ${entry.entry_type.toUpperCase()}: ${entry.content}`
  )
  .join("\n")}

REQUIRED OUTPUT STRUCTURE:
{
  "executiveSummary": "2-3 sentence summary of key insights",
  "scores": {
    "trustworthiness": number (0-100),
    "emotionalMaturity": number (0-100),
    "consistency": number (0-100),
    "compatibility": number (0-100),
    "communicationQuality": number (0-100),
    "relationshipRisk": number (0-100)
  },
  "observedFacts": ["specific facts from entries"],
  "strongInferences": ["logical conclusions from facts"],
  "weakInferences": ["uncertain or speculative conclusions"],
  "missingInformation": ["specific data gaps"],
  "redFlags": ["specific concerns"],
  "greenFlags": ["positive indicators"],
  "nextSteps": ["actionable recommendations"],
  "longTermOutlook": {
    "oneYear": "projection",
    "fiveYears": "projection",
    "twentyYears": "projection"
  },
  "overallScore": number (0-100)
}

Rules:
1. Base all analysis strictly on provided entries
2. Use 50 as neutral default for missing data
3. Keep all arrays with exact required lengths
4. Output ONLY valid JSON
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
      "observedFacts",
      "strongInferences",
      "weakInferences",
      "missingInformation",
      "redFlags",
      "greenFlags",
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

    // Validate array lengths
    if (!Array.isArray(report.observedFacts) || report.observedFacts.length < 3) {
      report.observedFacts = ["Insufficient data for observed facts"];
    }
    if (!Array.isArray(report.strongInferences) || report.strongInferences.length < 3) {
      report.strongInferences = ["Insufficient data for strong inferences"];
    }
    if (!Array.isArray(report.weakInferences) || report.weakInferences.length < 3) {
      report.weakInferences = ["Insufficient data for weak inferences"];
    }
    if (!Array.isArray(report.missingInformation) || report.missingInformation.length < 4) {
      report.missingInformation = [
        "Stress response patterns",
        "Financial behavior history",
        "Conflict resolution consistency",
        "Long-term life goals",
      ];
    }
    if (!Array.isArray(report.redFlags) || report.redFlags.length < 3) {
      report.redFlags = ["Insufficient data for red flag analysis"];
    }
    if (!Array.isArray(report.greenFlags) || report.greenFlags.length < 3) {
      report.greenFlags = ["Insufficient data for green flag analysis"];
    }
    if (!Array.isArray(report.nextSteps) || report.nextSteps.length < 3) {
      report.nextSteps = [
        "Gather more detailed communication records",
        "Observe behavior over next 30 days",
        "Consider professional relationship counseling if concerns persist",
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

    // Calculate overallScore
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
        weightedSum += report.scores[key] * weight;
        totalWeight += weight;
      }
    }
    report.overallScore = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50;

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
