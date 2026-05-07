import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LUVPARTNR | Relationship Intelligence System",
  description:
    "Private AI relationship intelligence for case files, timelines, communication analysis, risk scoring, and compatibility decisions.",
};

const signals = [
  "Timeline evidence",
  "Communication patterns",
  "Compatibility signals",
  "Risk and repair markers",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
            Relationship Intelligence System
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
            Understand people before you commit.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            LUVPARTNR turns relationship notes, messages, events, and uncertainty
            into private case files, AI reports, risk scoring, and long-term
            decision support.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/signup" className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black">
              Start private analysis
            </Link>
            <Link href="/sample-report" className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white">
              View sample report
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-zinc-950 p-5">
          <div className="rounded-xl border border-white/10 bg-black p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">Case file</p>
                <h2 className="mt-2 text-xl font-semibold">Commitment decision</h2>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                Private
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {signals.map((signal) => (
                <div key={signal} className="rounded-xl bg-white/[0.04] p-4 text-sm text-white/70">
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/35">
                Report summary
              </div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Strong warmth signals are present, but consistency and conflict
                repair need more evidence before escalating commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3 lg:px-8">
          {[
            ["Facts first", "Separate what happened from what you suspect it means."],
            ["Private memory", "Keep relationship context structured over time."],
            ["Decision support", "Clarify risk, fit, and next questions before major moves."],
          ].map(([title, text]) => (
            <div key={title}>
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
