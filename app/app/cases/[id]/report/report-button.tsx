"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  caseFileId: string;
};

export default function GenerateReportButton({ caseFileId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseFileId }),
      });

      if (!res.ok) return;

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black hover:opacity-90 disabled:opacity-60"
    >
      {loading ? "Generating..." : "Generate Report"}
    </button>
  );
}
