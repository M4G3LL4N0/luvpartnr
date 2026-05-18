import { redirect } from "next/navigation";
import { SubpageVisual } from "@/components/SubpageVisual";
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

export default async function PublicReportDetailPage({
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

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report) redirect("/app/reports");

  const reportJson = (report.report_json ?? {}) as ReportJson;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-5xl">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Report
          </div>
          <h1 className="mt-4 text-4xl font-semibold">{report.title}</h1>
          <p className="mt-3 text-zinc-400">
            {report.summary || "Saved relationship intelligence report"}
          </p>
        </div>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Executive summary</h2>
            <p className="mt-4 text-zinc-300">
              {reportJson.executiveSummary || report.summary || "No summary available."}
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {Object.entries(reportJson.scores ?? {}).map(([key, value]) => (
              <div
                key={key}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-sm capitalize text-zinc-400">{key}</div>
                <div className="mt-2 text-3xl font-semibold">{String(value)}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Observed facts</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.observedFacts ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Strong inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.strongInferences ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Weak inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.weakInferences ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Missing information</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.missingInformation ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Red flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.redFlags ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Green flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportJson.greenFlags ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Next steps</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {(reportJson.nextSteps ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Long-term outlook</h2>
            <div className="mt-4 space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">1 year:</strong>{" "}
                {reportJson.longTermOutlook?.oneYear ?? "—"}
              </p>
              <p>
                <strong className="text-white">5 years:</strong>{" "}
                {reportJson.longTermOutlook?.fiveYears ?? "—"}
              </p>
              <p>
                <strong className="text-white">20 years:</strong>{" "}
                {reportJson.longTermOutlook?.twentyYears ?? "—"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
