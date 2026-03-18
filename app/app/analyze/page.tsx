"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);

    const res = await fetch("/api/analyze-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-semibold">Analyze Message</h1>

        <textarea
          className="w-full mt-6 p-4 bg-black border border-white/10 rounded-xl"
          rows={6}
          placeholder="Paste message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={analyze}
          disabled={loading}
          className="mt-4 bg-white text-black px-6 py-3 rounded-full"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div className="mt-8 p-6 border border-white/10 rounded-xl bg-white/5 whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}
