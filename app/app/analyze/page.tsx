"use client";

import { useState } from "react";

type AnalyzeResult = {
  tone?: string;
  intent?: string;
  emotionalState?: string;
  riskLevel?: string;
  hiddenSignals?: string[];
  suggestedResponses?: {
    neutral?: string;
    confident?: string;
    assertive?: string;
  };
  error?: string;
};

function ReplyCard({
  label,
  text,
  onCopy,
}: {
  label: string;
  text?: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 shadow-lg transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">{label}</span>
        <button
          onClick={onCopy}
          className={`text-xs px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition flex items-center gap-1 ${copied ? "border-green-500 text-green-400" : ""}`}
        >
          {copied ? (
            <>
              ✅
              <span className="self-hidden">Copied!</span>
            </>
          ) : (
            "Copy"
          )}
        </button>
      </div>
      <div className="text-base text-zinc-100 whitespace-pre-line">{text}</div>
    </div>
  );
}

export default function AnalyzePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {
      // Fallback if clipboard fails
      alert("Copy failed. Try again.");
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Message Analyzer
          </h1>
          <p className="text-zinc-400 mb-4 text-lg">
            Premium, instant breakdown of any message. Paste below for actionable insights.
          </p>
        </section>

        {/* Input Section */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-lg">
          <textarea
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-zinc-700 transition"
            rows={5}
            placeholder="Paste message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            required
          />

          <button
            onClick={analyze}
            disabled={loading || !message.trim()}
            className="mt-4 w-full bg-gradient-to-r from-white to-zinc-200 text-black px-7 py-3 rounded-full font-semibold text-base shadow hover:from-zinc-100 hover:to-white transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin text-zinc-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Analyze"
            )}
          </button>
        </div>

        {/* Result Display */}
        {result ? (
          <div className="mt-10 space-y-8">
            {/* Error Handling */}
            {result.error ? (
              <div className="rounded-xl p-6 bg-zinc-900 border border-red-500/30">
                <div className="font-semibold text-red-400 mb-2">Error:</div>
                <div className="whitespace-pre-wrap text-red-400">{result.error}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Core Metrics */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                  <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Tone</div>
                  <div className="text-xl font-semibold text-white">{result.tone}</div>
                </div>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                  <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Intent</div>
                  <div className="text-xl font-semibold text-white">{result.intent}</div>
                </div>
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                  <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Emotional State</div>
                  <div className="text-xl font-semibold text-white">{result.emotionalState}</div>
                </div>

                {/* Risk & Hidden Signals */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                  <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Risk Level</div>
                  <div className="text-lg font-semibold text-white">{result.riskLevel}</div>
                </div>

                {result.hiddenSignals && result.hiddenSignals.length > 0 ? (
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Hidden Signals</div>
                    <ul className="list-disc list-inside text-zinc-300 text-base space-y-1">
                      {result.hiddenSignals.map((signal, i) => (
                        <li key={i}>{signal}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">Hidden Signals</div>
                    <div className="text-zinc-400 italic">None detected</div>
                  </div>
                )}

                {/* Suggested Replies */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                  <div className="text-lg font-semibold text-white mb-4">Suggested Replies</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <ReplyCard
                      label="Neutral"
                      text={result.suggestedResponses?.neutral}
                      onCopy={() => copyToClipboard(result.suggestedResponses?.neutral || "")}
                    />
                    <ReplyCard
                      label="Confident"
                      text={result.suggestedResponses?.confident}
                      onCopy={() => copyToClipboard(result.suggestedResponses?.confident || "")}
                    />
                    <ReplyCard
                      label="Assertive"
                      text={result.suggestedResponses?.assertive}
                      onCopy={() => copyToClipboard(result.suggestedResponses?.assertive || "")}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 text-center text-zinc-400">
            <p className="text-lg mb-2">Analyze a message to get started</p>
            <p className="text-sm">Paste any text above and press “Analyze”.</p>
          </div>
        )}
      </div>
    </main>
  );
}
