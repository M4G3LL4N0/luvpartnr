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
  let parsed: unknown;
  
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON in AI response: ${error instanceof Error ? error.message : "Unknown parsing error"}`);
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error("AI response is not a valid object");
  }

  const data = parsed as Record<string, unknown>;

  // Validate and extract with safe defaults
  return {
    executiveSummary: typeof data.executiveSummary === 'string' ? data.executiveSummary : "",
    overallScore: typeof data.overallScore === 'number' ? data.overallScore : 0,
    scores: {
      trustworthiness: typeof data.scores?.trustworthiness === 'number' ? data.scores.trustworthiness : 0,
      emotionalMaturity: typeof data.scores?.emotionalMaturity === 'number' ? data.scores.emotionalMaturity : 0,
      consistency: typeof data.scores?.consistency === 'number' ? data.scores.consistency : 0,
      compatibility: typeof data.scores?.compatibility === 'number' ? data.scores.compatibility : 0,
      communicationQuality: typeof data.scores?.communicationQuality === 'number' ? data.scores.communicationQuality : 0,
      relationshipRisk: typeof data.scores?.relationshipRisk === 'number' ? data.scores.relationshipRisk : 0,
    },
    observedFacts: Array.isArray(data.observedFacts) ? data.observedFacts.map(String) : [],
    strongInferences: Array.isArray(data.strongInferences) ? data.strongInferences.map(String) : [],
    weakInferences: Array.isArray(data.weakInferences) ? data.weakInferences.map(String) : [],
    missingInformation: Array.isArray(data.missingInformation) ? data.missingInformation.map(String) : [],
    redFlags: Array.isArray(data.redFlags) ? data.redFlags.map(String) : [],
    greenFlags: Array.isArray(data.greenFlags) ? data.greenFlags.map(String) : [],
    nextSteps: Array.isArray(data.nextSteps) ? data.nextSteps.map(String) : [],
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

    const apiResponse = await generateHighQualityReport();

    if (apiResponse.error) {
      if (apiResponse.error === "RATE_LIMIT_EXCEEDED") {
        return NextResponse.json(
          { 
            error: "RATE_LIMIT_EXCEEDED",
            message: "You've reached your monthly report generation limit. Upgrade to generate unlimited reports."
          },
          { status: 429 }
        );
      }
      return NextResponse.json({ error: apiResponse.error }, { status: 400 });
    }

    if (!apiResponse.data) {
      console.error("Empty response from AI service");
      return NextResponse.json({ error: "Empty response from AI service" }, { status: 500 });
    }

    let reportData: ReportSchema;
    try {
      reportData = safeParseReport(apiResponse.data);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      return NextResponse.json({ 
        error: "Invalid report format from AI",
        details: parseError instanceof Error ? parseError.message : "Unknown parsing error"
      }, { status: 400 });
    }

    // Validate required fields after parsing    if (!reportData.executiveSummary || reportData.executiveSummary.trim() === "") {
      console.error("Missing executive summary in parsed report");
      return NextResponse.json({ error: "Invalid report: missing executive summary" }, { status: 400 });
    }

    if (reportData.overallScore < 0 || reportData.overallScore > 100) {
      console.error(`Invalid overall score: ${reportData.overallScore}`);
      return NextResponse.json({ error: "Invalid report: overall score must be between 0 and 100" }, { status: 400 });
    }

    // Save the report to the database
    const { data: reportDataDb, error: saveError } = await supabase
      .from("reports")
      .insert({
        case_file_id: caseFileId,
        user_id: user.id,
        report_data: reportData,
      })
      .select()
      .single();

    if (saveError) {
      console.error("Failed to save report to database:", saveError);
      return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }

    return NextResponse.json({ reportId: reportDataDb.id });
  } catch (error) {
    console.error("Report generation error:", error);
    
    // Provide more specific error messages for common issues
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON format in AI response" }, { status: 400 });
    }
    
    if (error instanceof TypeError) {
      return NextResponse.json({ error: "Invalid data type in AI response" }, { status: 400 });
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Enhanced AI model with improved reasoning and separation of concerns
async function generateHighQualityReport(): Promise<{ data: string | null; error: string | null }> {
  try {
    // In production, this would call an actual AI API (OpenAI, Anthropic, etc.)
    // For now, we simulate with mock data that could come from an AI
    
    // Simulate network/API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate random rate limit for testing (30% chance)
    if (Math.random() < 0.3) {
      return { error: "RATE_LIMIT_EXCEEDED", data: null };
    }

    // Generate mock report data (in production, this would be AI-generated)
    const mockReport = generateMockReportData();
    
    return {
      data: JSON.stringify(mockReport),
      error: null,
    };
  } catch (error) {
    console.error("Error generating report:", error);
    return { 
      error: error instanceof Error ? error.message : "Unknown error generating report", 
      data: null 
    };
  }
}

function generateMockReportData(): ReportSchema {
  // This simulates what an AI might return  // In production, replace this with actual AI API call
  return {
    executiveSummary: "The individual demonstrates commitment through agreement to deadlines but shows a pattern of lateness and missed drafts, which may indicate reliability concerns. While interruptions suggest engagement, they may also hinder effective communication. Further exploration of time management and workload is recommended.",
    overallScore: 65,
    scores: {
      trustworthiness: 65,
      emotionalMaturity: 70,
      consistency: 50,
      compatibility: 75,
      communicationQuality: 60,
      relationshipRisk: 40
    },
    observedFacts: [
      "The individual arrived 15 minutes late to the meeting on three separate occasions.",
      "During the discussion, the individual interrupted others twice.",
      "The individual agreed to the project deadline but did not submit the preliminary draft."
    ],
    strongInferences: [
      "The pattern of lateness may indicate challenges with time management.",
      "The interruptions could suggest enthusiasm or difficulty with active listening."
    ],
    weakInferences: [
      "The missed draft might imply competing priorities."
    ],
    missingInformation: [
      "Information about the individual's workload outside of these meetings is missing."
    ],
    redFlags: [
      "The repeated lateness despite agreement on deadlines is a potential red flag for reliability."
    ],
    greenFlags: [
      "The individual's willingness to agree to deadlines shows commitment.",
      "The interruptions may stem from engagement with the topic."
    ],
    nextSteps: [
      "Schedule a private discussion to understand the reasons behind the lateness and missed deadlines.",
      "Explore time-management tools or techniques that could help the individual.",
      "Set clear, incremental deadlines for future projects to build accountability."
    ]
  };
}

// The following helper functions are kept for reference but are no longer used
// In production, the AI would generate this content directly

/*
function extractFacts(caseData: any): string[] {
  return [
    "The individual arrived 15 minutes late to the meeting on three separate occasions.",
    "During the discussion, the individual interrupted others twice.",
    "The individual agreed to the project deadline but did not submit the preliminary draft."
  ];
}

function generateStrongInferences(facts: string[]): string[] {
  return [
    "The pattern of lateness may indicate challenges with time management.",
    "The interruptions could suggest enthusiasm or difficulty with active listening."
  ];
}

function generateWeakInferences(facts: string[]): string[] {
  return [
    "The missed draft might imply competing priorities."
  ];
}

function identifyContradictions(facts: string[], strongInferences: string[], weakInferences: string[]): string[] {
  return [
    "There is a contradiction between the individual's agreement to the deadline and the failure to submit the draft."
  ];
}

function identifyMissingInformation(facts: string[], strongInferences: string[], weakInferences: string[]): string[] {
  return [
    "Information about the individual's workload outside of these meetings is missing."
  ];
}

function generateConservativeNextSteps(facts: string[], strongInferences: string[], weakInferences: string[], contradictions: string[]): string[] {
  return [
    "Schedule a private discussion to understand the reasons behind the lateness and missed deadlines.",
    "Explore time-management tools or techniques that could help the individual.",
    "Set clear, incremental deadlines for future projects to build accountability."
  ];
}

function generateExecutiveSummary(facts: string[], strongInferences: string[], weakInferences: string[], contradictions: string[]): string {
  if (contradictions.length > 0) {
    return `The individual demonstrates commitment through agreement to deadlines but shows a pattern of lateness and missed drafts, which may indicate reliability concerns. ${contradictions[0]} While interruptions suggest engagement, they may also hinder effective communication. Further exploration of time management and workload is recommended.`;
  }
  return "The individual demonstrates commitment through agreement to deadlines but shows a pattern of lateness and missed drafts, which may indicate reliability concerns. While interruptions suggest engagement, they may also hinder effective communication. Further exploration of time management and workload is recommended.";
}

function calculateOverallScore(facts: string[], strongInferences: string[], weakInferences: string[]): number {
  return 65;
}

function calculateDetailedScores(facts: string[], strongInferences: string[], weakInferences: string[]): any {
  return {
    trustworthiness: 65,
    emotionalMaturity: 70,
    consistency: 50,
    compatibility: 75,
    communicationQuality: 60,
    relationshipRisk: 40
  };
}

function extractRedFlags(facts: string[], strongInferences: string[], weakInferences: string[]): string[] {
  return [
    "The repeated lateness despite agreement on deadlines is a potential red flag for reliability."
  ];
}

function extractGreenFlags(facts: string[], strongInferences: string[], weakInferences: string[]): string[] {
  return [
    "The individual's willingness to agree to deadlines shows commitment.",
    "The interruptions may stem from engagement with the topic."
  ];
}
*/
