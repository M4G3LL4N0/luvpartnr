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

function ReplyCard({
  label,
  text,
}: {
  label: string;
  text?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 shadow-lg transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">{label}</span>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1 rounded-full border border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition ${copied ? "border-green-500 text-green-400" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
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
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Message Analyzer</h1>
        <p className="text-zinc-400 mb-8 text-lg">Get a premium, instant breakdown of any message. Paste below:</p>

        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-lg">
          <textarea
            className="w-full p-4 bg-black border border-white/10 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-zinc-700 transition"
            rows={5}
            placeholder="Paste message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={analyze}
            disabled={loading || !message.trim()}
            className="mt-4 bg-gradient-to-r from-white to-zinc-200 text-black px-7 py-3 rounded-full font-semibold text-base shadow hover:from-zinc-100 hover:to-white transition disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {result && (
          <div className="mt-10">
            {result.error ? (
              <div className="text-red-400 bg-zinc-900 border border-red-500/30 rounded-xl p-6 mt-4">
                <div className="font-semibold mb-2">Error:</div>
                <div>{result.error}</div>
                {result.raw && (
                  <pre className="mt-2 text-xs text-zinc-400 whitespace-pre-wrap">{result.raw}</pre>
                )}
              </div>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">Tone</div>
                    <div className="text-xl font-semibold text-white">{result.tone}</div>
                  </div>
                  <div className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">Intent</div>
                    <div className="text-xl font-semibold text-white">{result.intent}</div>
                  </div>
                  <div className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">Emotional State</div>
                    <div className="text-xl font-semibold text-white">{result.emotionalState}</div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                    <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">Risk Level</div>
                    <div className="text-lg font-semibold text-white">{result.riskLevel}</div>
                  </div>
                  {result.hiddenSignals && result.hiddenSignals.length > 0 && (
                    <div className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl p-5 shadow">
                      <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-2">Hidden Signals</div>
                      <ul className="list-disc list-inside text-zinc-300 text-base">
                        {result.hiddenSignals.map((signal, i) => (
                          <li key={i}>{signal}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {result.suggestedReplies && (
                  <div className="mt-10">
                    <div className="text-lg font-semibold mb-4 text-white">Suggested Replies</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <ReplyCard label="Neutral" text={result.suggestedReplies.neutral} />
                      <ReplyCard label="Confident" text={result.suggestedReplies.confident} />
                      <ReplyCard label="Assertive" text={result.suggestedReplies.assertive} />
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
