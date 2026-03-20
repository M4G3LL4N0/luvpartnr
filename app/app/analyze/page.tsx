"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze-entry", {
        method: "POST",
        body: JSON.stringify({ input }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      let message = "An unknown error occurred";

      if (err instanceof Error) {
        message = err.message;
      }

      setResult({ error: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-semibold">Analyze</h1>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl bg-white/10 p-4 text-white outline-none"
          placeholder="Paste message or situation..."
        />

        <button
          onClick={handleAnalyze}
          className="rounded-xl bg-white text-black px-6 py-3 font-medium"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <pre className="rounded-xl bg-white/5 p-4 text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
}
