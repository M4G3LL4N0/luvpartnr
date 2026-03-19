import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
  missingInformation: string[];
  redFlags: string[];
  greenFlags: string[];
  nextSteps: string[];
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
    observedFacts: Array.isArray(parsed.observedFacts) ? parsed.observedFacts : [],
    strongInferences: Array.isArray(parsed.strongInferences) ? parsed.strongInferences : [],
    weakInferences: Array.isArray(parsed.weakInferences) ? parsed.weakInferences : [],
    missingInformation: Array.isArray(parsed.missingInformation) ? parsed.missingInformation : [],
    redFlags: Array.isArray(parsed.redFlags) ? parsed.redFlags : [],
    greenFlags: Array.isArray(parsed.greenFlags) ? parsed.greenFlags : [],
    nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
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

  try {
    const { caseFileId } = await req.json();

    if (!caseFileId) {
      return NextResponse.json({ error: "Case file ID required" }, { status: 400 });
    }

    // Simulate API call that might return a limit error
    const mockApiResponse = await simulateApiCall();

    if (mockApiResponse.error === "RATE_LIMIT_EXCEEDED") {
      return NextResponse.json(
        { 
          error: "RATE_LIMIT_EXCEEDED",
          message: "You've reached your monthly report generation limit. Upgrade to generate unlimited reports."
        },
        { status: 429 }
      );
    }

    if (mockApiResponse.error) {
      return NextResponse.json({ error: mockApiResponse.error }, { status: 400 });
    }

    // Save the report to the database
    const { data: reportData, error: saveError } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        report_data: mockApiResponse.data,
      })
      .select()
      .single();

    if (saveError) {
      return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }

    return NextResponse.json({ reportId: reportData.id });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Mock function to simulate API call that might return limit errors
async function simulateApiCall() {
  // Simulate random chance of hitting rate limit (for testing)
  if (Math.random() < 0.3) {
    return { error: "RATE_LIMIT_EXCEEDED" };
  }

  // Simulate successful API response
  return {
    data: {
      executiveSummary: "This is a sample executive summary.",
      overallScore: 75,
      scores: {
        trustworthiness: 80,
        emotionalMaturity: 70,
        consistency: 75,
        compatibility: 85,
        communicationQuality: 70,
        relationshipRisk: 30,
      },
      observedFacts: ["Fact 1", "Fact 2", "Fact 3"],
      strongInferences: ["Inference 1", "Inference 2"],
      weakInferences: ["Weak inference 1"],
      missingInformation: ["Missing info 1"],
      redFlags: ["Red flag 1"],
      greenFlags: ["Green flag 1", "Green flag 2"],
      nextSteps: ["Step 1", "Step 2"],
    },
  };
}
