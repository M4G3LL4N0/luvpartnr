import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GenerateReportButton from "./report-button";

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
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Report</div>
            <h1 className="mt-4 text-4xl font-semibold">Relationship intelligence report</h1>
          </div>
          <GenerateReportButton caseFileId={id} />
        </div>

        {!latestReport ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-400">
            No report yet. Generate your first mock report.
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {/* Score Cards */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Score Overview</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(latestReport.report_json.scores).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center"
                  >
                    <div className="text-sm capitalize text-zinc-400 font-medium">
                      {key}
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-white">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Observed Facts */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Observed Facts</h2>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {latestReport.report_json.observedFacts?.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{fact}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Strong Inferences */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Strong Inferences</h2>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {latestReport.report_json.strongInferences?.map((inf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{inf}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Weak Inferences */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Weak Inferences</h2>
              <ul className="mt-4 space-y-2 text-zinc-300">
                {latestReport.report_json.weakInferences?.map((inf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{inf}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Red Flags */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Red Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {latestReport.report_json.redFlags?.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            {/* Green Flags */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Green Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {latestReport.report_json.greenFlags?.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            {/* Missing Information */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Missing Information</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {latestReport.report_json.missingInformation?.map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            {/* Next Steps */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Next Steps</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {latestReport.report_json.nextSteps?.map((step, idx) => (
                  <li key={idx} className="text-zinc-300">
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            {/* Long-Term Outlook */}
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Long-Term Outlook</h2>
              <div className="mt-4 space-y-4 text-zinc-300">
                <p><strong className="text-white">1 year:</strong> {latestReport.report_json.longTermOutlook?.oneYear ?? "N/A"}</p>
                <p><strong className="text-white">5 years:</strong> {latestReport.report_json.longTermOutlook?.fiveYears ?? "N/A"}</p>
                <p><strong className="text-white">20 years:</strong> {latestReport.report_json.longTermOutlook?.twentyYears ?? "N/A"}</p>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
