import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR | Relationship Intelligence Platform",
  description:
    "Private AI-powered relationship intelligence for compatibility, trust assessment, and long-term decision-making. Turn uncertainty into strategic clarity.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-5xl">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Relationship Intelligence Platform
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl leading-tight">
            Transform relationship ambiguity into strategic clarity.
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
            LUVPARTNR provides private AI-powered analysis of compatibility, trust, communication patterns, and long-term potential. Make confident decisions with structured intelligence, not guesswork.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/app"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Start private analysis
            </a>
            <a
              href="/sample-report"
              className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
            >
              View sample report
            </a>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <div className="mt-32 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Structured Intelligence",
              text: "Transform conversations, notes, and observations into clear, actionable insights with our proprietary analysis framework.",
            },
            {
              title: "Risk Quantification",
              text: "Assess emotional risk, inconsistency patterns, and manipulation signals with objective scoring systems.",
            },
            {
              title: "Compatibility Mapping",
              text: "Compare values, habits, and emotional alignment to evaluate long-term fit beyond surface chemistry.",
            },
            {
              title: "Communication Forensics",
              text: "Detect vagueness, blame shifting, and accountability trends in dialogue patterns over time.",
            },
            {
              title: "Timeline Tracking",
              text: "Maintain a private, chronological record of events, promises, conflicts, and relationship evolution.",
            },
            {
              title: "Gap Analysis",
              text: "Identify critical unknowns and essential questions before escalating commitment.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Privacy & Ethics Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Privacy & Ethics
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Built for discretion, clarity, and responsible use.
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              LUVPARTNR is a reflective decision-support platform, not a surveillance tool. We help you think more clearly with the information you already have—responsibly, privately, and ethically. Our outputs are interpretations, not certainties, and never substitute for professional advice.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Serious decision-support for serious relationships.
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Make confident relationship decisions with AI-powered analysis of trust, compatibility, and long-term potential.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/pricing"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  View pricing
                </a>
                <a
                  href="/investor"
                  className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  Investor overview
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
