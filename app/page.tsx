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
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Understand the Relationship Before You Commit
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            LUVPARTNR is a Relationship Intelligence System that analyzes interactions,
            detects patterns, and helps you avoid costly mistakes.
          </p>
        </section>

        {/* Value Proposition */}
        <section className="mt-16 space-y-6 sm:mt-20 sm:space-y-8 md:grid md:grid-cols-2 md:gap-8">
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Analyze Interactions</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">Deep analysis of communication patterns and relational dynamics.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Detect Patterns</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">AI identifies hidden signals and behavioral trends.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Avoid Mistakes</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">Predict risks and receive actionable guidance.</p>
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section className="mt-16 sm:mt-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Product Preview</h2>
            <div className="mt-6 rounded-lg bg-zinc-800 overflow-hidden">
              <div className="relative w-full h-64 sm:h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative p-4">
                <p className="text-xs text-zinc-400">Interactive relationship dashboard</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 sm:mt-20 text-center">
          <a
            href="/app"
            className="mt-8 sm:mt-12 inline-flex items-center justify-center rounded-full bg-white px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-black transition hover:bg-zinc-200 min-w-[200px] sm:min-w-auto"
          >
            Begin Analysis
          </a>
        </section>
      </div>
    </main>
  );
}
