"use client";

import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
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

        const { data: reportData, error: fetchError } = await supabase
          .from("reports")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single();

        if (fetchError) throw fetchError;
        setReport(reportData);
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
    const textToCopy = report
      ? (report.report_json?.executiveSummary || report.summary)
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
        <div className="mx-auto max-w-6xl">
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
        <div className="mx-auto max-w-6xl">
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <Link
              href="/app/reports"
              className="mt-4 inline-block rounded-full border border-white/15 px-5 py-3 text-sm text-white"
            >
              Back to Reports
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!report) {
    router.push("/app/reports");
    return null;
  }

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

          <div className="flex flex-wrap items-center gap-3">
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
            <Link
              href="/app/reports"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white hover:bg-white/5 transition-colors"
            >
              Back to Reports
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold">Executive Summary</h2>
            </div>
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
