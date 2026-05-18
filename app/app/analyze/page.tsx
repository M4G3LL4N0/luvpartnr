"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

type AnalysisResult = {
  tone?: string;
  intent?: string;
  emotionalState?: string;
  riskLevel?: "low" | "medium" | "high";
  hiddenSignals?: string[];
  suggestedResponses?: {
    neutral?: string;
    confident?: string;
    assertive?: string;
  };
  error?: string;
};

export default function AnalyzePage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!message.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze-message", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = (await res.json()) as AnalysisResult;
      setResult(data);
    } catch (err) {
      setResult({
        error: err instanceof Error ? err.message : "Analysis failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
            Message analyzer
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            Read the signal before you respond.
          </h1>
          <p className="mt-5 max-w-xl text-white/65">
            Paste a message or draft a reply. LUVPARTNR separates tone, intent,
            risk, and response options without claiming certainty about the person.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-white/60">
            Built for communication review, not surveillance. Use messages you
            have legitimate access to and treat the output as structured judgment
            support.
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-64 w-full resize-y rounded-xl border border-white/10 bg-black p-4 text-sm leading-6 text-white outline-none placeholder:text-white/30 focus:border-white/30"
            placeholder="Paste a message, conflict exchange, or reply draft..."
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/40">{message.length} characters</p>
            <button
              onClick={handleAnalyze}
              disabled={loading || !message.trim()}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze message"}
            </button>
          </div>

          {result ? (
            <div className="mt-6 space-y-4">
              {result.error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {[
                      ["Tone", result.tone],
                      ["Intent", result.intent],
                      ["State", result.emotionalState],
                      ["Risk", result.riskLevel],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="text-xs uppercase tracking-[0.18em] text-white/35">
                          {label}
                        </div>
                        <div className="mt-2 text-sm font-medium capitalize text-white">
                          {value || "Unknown"}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <h2 className="font-semibold">Signals to review</h2>
                    <ul className="mt-3 space-y-2 text-sm text-white/65">
                      {(result.hiddenSignals ?? ["No strong hidden signals detected."]).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-3 md:grid-cols-3">
                    {[
                      ["Neutral", result.suggestedResponses?.neutral],
                      ["Confident", result.suggestedResponses?.confident],
                      ["Assertive", result.suggestedResponses?.assertive],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-white/10 bg-black p-4">
                        <div className="text-sm font-semibold">{label}</div>
                        <p className="mt-3 text-sm leading-6 text-white/65">{value}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
