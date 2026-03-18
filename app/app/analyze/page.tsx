"use client";

import { useState } from "react";

type AnalyzeResult = {
  tone?: string;
  intent?: string;
  emotionalState?: string;
  riskLevel?: string;
  hiddenSignals?: string[];
  suggestedReplies?: {
    neutral?: string;
    confident?: string;
    assertive?: string;
  };
  error?: string;
  raw?: string;
};

export default function AnalyzePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data);
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
          <div className="mt-8 p-6 border border-white/10 rounded-xl bg-white/5">
            {result.error ? (
              <div className="text-red-400">
                <div className="font-semibold mb-2">Error:</div>
                <div>{result.error}</div>
                {result.raw && (
                  <pre className="mt-2 text-xs text-zinc-400 whitespace-pre-wrap">{result.raw}</pre>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <div>
                    <span className="font-semibold">Tone:</span> {result.tone}
                  </div>
                  <div>
                    <span className="font-semibold">Intent:</span> {result.intent}
                  </div>
                  <div>
                    <span className="font-semibold">Emotional State:</span> {result.emotionalState}
                  </div>
                  <div>
                    <span className="font-semibold">Risk Level:</span> {result.riskLevel}
                  </div>
                </div>
                {result.hiddenSignals && result.hiddenSignals.length > 0 && (
                  <div className="mb-4">
                    <div className="font-semibold mb-1">Hidden Signals:</div>
                    <ul className="list-disc list-inside text-zinc-300">
                      {result.hiddenSignals.map((signal, i) => (
                        <li key={i}>{signal}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {result.suggestedReplies && (
                  <div>
                    <div className="font-semibold mb-1">Suggested Replies:</div>
                    <div className="mb-2">
                      <span className="font-semibold">Neutral:</span>
                      <div className="ml-2 text-zinc-200 whitespace-pre-line">{result.suggestedReplies.neutral}</div>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Confident:</span>
                      <div className="ml-2 text-zinc-200 whitespace-pre-line">{result.suggestedReplies.confident}</div>
                    </div>
                    <div>
                      <span className="font-semibold">Assertive:</span>
                      <div className="ml-2 text-zinc-200 whitespace-pre-line">{result.suggestedReplies.assertive}</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
