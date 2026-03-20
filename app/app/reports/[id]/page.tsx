import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default async function ReportDetailPage({ params, }: { params: Promise<{ id: string }>; }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
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

  const report = (reportRow.report_json ?? {}) as ReportJson;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-center mb-12">
          <div className="w-full md:w-1/2 p-6">
            <h1 className="text-4xl font-semibold mb-6">{reportRow.title}</h1>
            <p className="text-lg text-gray-400 mb-6">{reportRow.summary || "Relationship intelligence report"}</p>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <div className="bg-gray-900/20 border border-white/10 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Report Overview</h2>
              <p className="text-gray-400">Generated on: {new Date(reportRow.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 p-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Executive Summary</h2>
              <p className="mt-4 text-zinc-300">{report.executiveSummary || reportRow.summary || "No summary available."}</p>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Key Metrics</h2>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(report.scores ?? {}).map(([key, value]) => (
                  <div key={key} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <div className="text-sm capitalize text-zinc-400">{key}</div>
                    <div className="mt-2 text-3xl font-semibold">{String(value)}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="w-full md:w-1/2 p-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Observed Facts</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.observedFacts ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Strong Inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.strongInferences ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Weak Inferences</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.weakInferences ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Missing Information</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.missingInformation ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Red Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.redFlags ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Green Flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.greenFlags ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
              <ul className="mt-4 space-y-3 text-zinc-300">
                {(report.nextSteps ?? []).map((item) => (
                  <li key={item} className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-gray-900/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{item}</div>
                    <div className="ml-4 text-sm text-gray-400">•</div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Long-Term Outlook</h2>
              <div className="mt-4 space-y-4 text-zinc-300">
                <p><strong className="text-white">1 year:</strong> {report.longTermOutlook?.oneYear ?? "—"}</p>
                <p><strong className="text-white">5 years:</strong> {report.longTermOutlook?.fiveYears ?? "—"}</p>
                <p><strong className="text-white">20 years:</strong> {report.longTermOutlook?.twentyYears ?? "—"}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
