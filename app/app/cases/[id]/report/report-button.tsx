"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GenerateReportButton({ caseFileId }: { caseFileId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleGenerate() {
    setLoading(true);

    const res = await fetch("/api/reports/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caseFileId }),
    });

    setLoading(false);

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
    >
      {loading ? "Generating..." : "Generate mock report"}
    </button>
  );
}
