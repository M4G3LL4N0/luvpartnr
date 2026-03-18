"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateReportButton({
  caseFileId,
}: {
  caseFileId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const router = useRouter();

  async function handleGenerate() {
    try {
      setLoading(true);
      setError(null);
      setShowPaywall(false);

      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseFileId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "RATE_LIMIT_EXCEEDED") {
          setShowPaywall(true);
          return;
        }
        throw new Error(data.error || "Failed to generate report");
      }

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate report";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      {/* Error message */}
      {error && (
        <div className="absolute top-8 left-0 right-0 text-center text-red-600 mt-2 text-sm">
          {error}
        </div>
      )}

      {/* Paywall overlay */}
      {showPaywall && (
        <div className="absolute top-8 left-0 right-0 z-10 bg-white rounded-lg shadow-lg p-4 text-black">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Upgrade Required</h3>
            <p className="text-sm mb-3">
              You've reached your monthly report generation limit. Upgrade to generate unlimited reports.
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => router.push("/pricing")}
                className="rounded-full bg-black text-white px-4 py-2 text-sm font-medium"
              >
                Upgrade Now
              </button>
              <button
                onClick={() => setShowPaywall(false)}
                className="rounded-full bg-gray-200 text-black px-4 py-2 text-sm font-medium"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
