"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateReportButton({
  caseFileId,
}: {
  caseFileId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGenerate() {
    try {
      setLoading(true);

      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseFileId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate report");
      }

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate report";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
    >
      {loading ? "Generating..." : "Generate Report"}
    </button>
  );
}
