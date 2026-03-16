import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report) redirect("/app/reports");

  const reportData = (report.report_json ?? {}) as ReportJson;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Saved report
            </div>
            <h1 className="mt-4 text-4xl font-semibold">{report.title}</h1>
            <p className="mt-3 max-w-3xl text-zinc-400">
              {report.summary || "Relationship intelligence report"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/app/reports"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white"
            >
              Back to Reports
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Executive Summary</h2>
            <p className="mt-4 text-zinc-300">
              {reportData.executiveSummary || report.summary}
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {Object.entries(reportData.scores || {}).map(([key, value]) => (
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
              <h2 className="text-2xl font-semibold">Observed Facts</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.observedFacts || []).map((fact: string, idx: number) => (
                  <li key={idx}>• {fact}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Strong Inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.strongInferences || []).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Weak Inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.weakInferences || []).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Missing Information</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.missingInformation || []).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Red Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.redFlags || []).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Green Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(reportData.greenFlags || []).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Next Steps</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {(reportData.nextSteps || []).map((item: string, idx: number) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Long-Term Outlook</h2>
            <div className="mt-4 space-y-4 text-zinc-300">
              <p>
                <strong className="text-white">1 year:</strong>{" "}
                {reportData.longTermOutlook?.oneYear || "Not provided"}
              </p>
              <p>
                <strong className="text-white">5 years:</strong>{" "}
                {reportData.longTermOutlook?.fiveYears || "Not provided"}
              </p>
              <p>
                <strong className="text-white">20 years:</strong>{" "}
                {reportData.longTermOutlook?.twentyYears || "Not provided"}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
