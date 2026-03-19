"use client";

import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GenerateReportButton from "./report-button";
import { useState, useEffect } from "react";

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

export default function CaseReportPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [latestReport, setLatestReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const { data: reports, error: fetchError } = await supabase
          .from("reports")
          .select("*")
          .eq("case_file_id", id)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (fetchError) throw fetchError;
        setLatestReport(reports?.[0] ?? null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id, router]);

  const handleCopyInsight = async () => {
    const textToCopy = latestReport
      ? (latestReport.report_json?.executiveSummary || latestReport.summary)
      : "No insight available";
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center py-12">
            <p className="text-zinc-400">Loading report...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <div className="mt-4 flex justify-end">
              <GenerateReportButton caseFileId={id} />
            </div>
          </div>
        </div>
      </main>
    );
  }

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
          <div className="flex flex-wrap items-center gap-3">
            {latestReport && (
              <button
                onClick={handleCopyInsight}
                className={`rounded-full border border-white/15 px-5 py-3 text-sm text-white flex items-center gap-2 transition-colors ${
                  copied
                    ? "bg-white/10"
                    : "hover:bg-white/5"
                }`}
                aria-label="Copy executive summary to clipboard"
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      />
                    </svg>
                    Copy Insight
                  </>
                )}
              </button>
            )}
            <GenerateReportButton caseFileId={id} />
          </div>
        </div>

        {!latestReport ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-400">
            No report yet. Generate your first report.
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold">Executive Summary</h2>
              </div>
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
