import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GenerateReportButton from "./report-button";

type ReportJson = {
  executiveSummary?: string;
  scores?: Record<string, number | string>;
  observedFacts?: string[];
  strongInferences?: string[];
  weakInferences?: string[];
  missingInformation?: string[];
  redFlags?: string[];
  greenFlags?: string[];
  nextSteps?: string[];
  longTermOutlook?: {
    oneYear?: string;
    fiveYears?: string;
    twentyYears?: string;
  };
};

export default async function CaseReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: latestReport } = await supabase
    .from("reports")
    .select("*")
    .eq("case_file_id", id)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const reportData = (latestReport?.report_json ?? {}) as ReportJson;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Report
            </div>
            <h1 className="mt-4 text-4xl font-semibold">
              Relationship intelligence report
            </h1>
          </div>
          <GenerateReportButton caseFileId={id} />
        </div>

        {!latestReport ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-400">
            No report yet. Generate your first report.
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Executive Summary</h2>
              <p className="mt-4 text-zinc-300">
                {reportData.executiveSummary || latestReport.summary}
              </p>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
