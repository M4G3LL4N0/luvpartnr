import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR | Relationship Intelligence System",
  description:
    "AI-powered relationship intelligence platform for compatibility assessment, risk analysis, and long-term decision-making. Navigate complex relationships with data-driven insights.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-2xl px-6 py-24 lg:px-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="mt-12 text-4xl md:text-5xl font-bold tracking-tight">
            Understand the Relationship Before You Commit
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl mx-auto">
            LUVPARTNR is a Relationship Intelligence System that analyzes interactions,
            detects patterns, and helps you avoid costly mistakes.
          </p>
        </section>

        {/* Value Proposition */}
        <section className="mt-20 grid gap-8 md:grid-cols-2">
          <div className="bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-6xl font-bold">Analyze Interactions</div>
              <p className="mt-2 text-zinc-400">Deep analysis of communication patterns and relational dynamics.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-6xl font-bold">Detect Patterns</div>
              <p className="mt-2 text-zinc-400">AI identifies hidden signals and behavioral trends.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-6xl font-bold">Avoid Mistakes</div>
              <p className="mt-2 text-zinc-400">Predict risks and receive actionable guidance.</p>
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section className="mt-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12">
            <h2 className="text-2xl font-semibold text-white">Product Preview</h2>
            <div className="mt-6 rounded-lg bg-zinc-800 overflow-hidden">
              <div className="relative w-full h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative p-4">
                <p className="text-xs text-zinc-400">Interactive relationship dashboard</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 text-center">
          <a
            href="/app"
            className="mt-12 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Begin Analysis
          </a>
        </section>
      </div>
    </main>
  );
}
