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

  const handleUpgrade = async () => {
    // Create a form to POST to checkout endpoint
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/checkout";
    document.body.appendChild(form);
    form.submit();
  };

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

      {/* Paywall modal */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h3 className="font-semibold mb-2 text-center">Unlock Full Intelligence</h3>
            <p className="text-sm mb-6 text-center">
              Get unlimited reports and deeper insights
            </p>
            <div className="space-y-3">
              <button
                onClick={handleUpgrade}
                className="w-full rounded-full bg-black text-white px-4 py-2 text-sm font-medium"
              >
                Upgrade
              </button>
              <button
                onClick={() => setShowPaywall(false)}
                className="w-full rounded-full bg-gray-200 text-black px-4 py-2 text-sm font-medium"
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
