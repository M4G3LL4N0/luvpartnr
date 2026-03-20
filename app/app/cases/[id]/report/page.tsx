import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GenerateReportButton from "./report-button";

type ReportJson = {
  executiveSummary?: string;
  overallScore?: number;
  scores?: Record<string, number>;
  observedFacts?: string[];
  strongInferences?: string[];
  weakInferences?: string[];
  redFlags?: string[];
  greenFlags?: string[];
  missingInformation?: string[];
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

  const report = (latestReport?.report_json ?? {}) as ReportJson;

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
            No report yet. Generate your first report.
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Executive summary</h2>
              <p className="mt-4 text-zinc-300">{latestReport.summary}</p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
              {Object.entries(report.scores ?? {}).map(([key, value]) => (
                <div key={key} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="text-sm capitalize text-zinc-400">{key}</div>
                  <div className="mt-2 text-3xl font-semibold">{String(value)}</div>
                </div>
              ))}
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Observed facts</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.observedFacts ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Strong inferences</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.strongInferences ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Weak inferences</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.weakInferences ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Missing information</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.missingInformation ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Red flags</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.redFlags ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h2 className="text-2xl font-semibold">Green flags</h2>
                <ul className="mt-4 space-y-3 text-zinc-300">
                  {(report.greenFlags ?? []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Next steps</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.nextSteps ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Long-term outlook</h2>
              <div className="mt-4 space-y-4 text-zinc-300">
                <p><strong className="text-white">1 year:</strong> {report.longTermOutlook?.oneYear ?? "—"}</p>
                <p><strong className="text-white">5 years:</strong> {report.longTermOutlook?.fiveYears ?? "—"}</p>
                <p><strong className="text-white">20 years:</strong> {report.longTermOutlook?.twentyYears ?? "—"}</p>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
