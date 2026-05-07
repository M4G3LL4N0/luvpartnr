import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

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

export default async function ReportDetailPage({
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

  const { data: reportRow } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!reportRow) {
    redirect("/app/reports");
  }

  function isReportJson(obj: unknown): obj is ReportJson {
    const value = obj as Partial<ReportJson> | null;
    return (
      typeof obj === 'object' &&
      value !== null &&
      (value.executiveSummary === undefined || typeof value.executiveSummary === 'string') &&
      (value.overallScore === undefined || typeof value.overallScore === 'number') &&
      (value.scores === undefined || typeof value.scores === 'object') &&
      (value.observedFacts === undefined || Array.isArray(value.observedFacts)) &&
      (value.strongInferences === undefined || Array.isArray(value.strongInferences)) &&
      (value.weakInferences === undefined || Array.isArray(value.weakInferences)) &&
      (value.redFlags === undefined || Array.isArray(value.redFlags)) &&
      (value.greenFlags === undefined || Array.isArray(value.greenFlags)) &&
      (value.missingInformation === undefined || Array.isArray(value.missingInformation)) &&
      (value.nextSteps === undefined || Array.isArray(value.nextSteps)) &&
      (value.longTermOutlook === undefined || typeof value.longTermOutlook === 'object')
    );
  }

  const report: ReportJson = isReportJson(reportRow.report_json) ? reportRow.report_json : {};

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Report Detail
          </div>
          <h1 className="mt-4 text-4xl font-semibold">{reportRow.title}</h1>
          <p className="mt-3 text-zinc-400">
            {reportRow.summary || "Relationship intelligence report"}
          </p>
        </div>

        <div className="mt-10 space-y-6">
          {/* Share Insight Section */}
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Share Key Insights</h2>
            <p className="mt-4 text-zinc-300">
              Found this analysis helpful? You can safely share key insights with trusted connections.
            </p>
            <div className="mt-6">
              <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-zinc-300">
                {reportRow.summary || report.executiveSummary || "Shareable summary will appear here once the report is complete."}
              </div>
              <p className="mt-3 text-xs text-zinc-400">
                Share responsibly - insights are most powerful when used thoughtfully
              </p>
            </div>
          </section>
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Executive summary</h2>
            <p className="mt-4 text-zinc-300">
              {report.executiveSummary || reportRow.summary || "No summary available."}
            </p>
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
                {(report.observedFacts ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Strong inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.strongInferences ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Weak inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.weakInferences ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Missing information</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.missingInformation ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Red flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.redFlags ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Green flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.greenFlags ?? []).map((item: string) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Next steps</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {(report.nextSteps ?? []).map((item: string) => (
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
      </div>
    </main>
  );
}
