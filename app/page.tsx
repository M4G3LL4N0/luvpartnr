import type { Metadata } from "next";
import { MarketingGraphicsStack } from "@/components/MarketingGraphicsStack";
import { ProcessFlowSection } from "@/components/ProcessFlowSection";
import { HeroProductPanel } from "@/components/HeroProductPanel";
import { TrustStrip } from "@/components/TrustStrip";
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
    <main className="relative min-h-screen overflow-x-hidden text-white motion-fade-up">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <TrustStrip />
        </div>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" aria-hidden />

        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-fuchsia-200/70">
            Relationship Intelligence System
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-br from-white via-fuchsia-50 to-white/85 bg-clip-text text-transparent">
              Understand people
            </span>{" "}
            <span className="text-white/90">before you commit.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            LUVPARTNR turns relationship notes, messages, events, and uncertainty
            into private case files, AI reports, risk scoring, and long-term
            decision support.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-200 via-white to-violet-100 px-7 py-3 text-center text-sm font-semibold text-slate-900 shadow-[0_14px_48px_rgba(232,121,249,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_56px_rgba(232,121,249,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-200/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Start private analysis
            </Link>
            <Link
              href="/sample-report"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-center text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View sample report
            </Link>
          </div>
        </div>

        <div className="relative rounded-[1.35rem] border border-white/12 bg-white/[0.05] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-6">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45">Case file</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">Commitment decision</h2>
              </div>
              <div className="rounded-full border border-fuchsia-300/25 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-100/90">
                Private
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {signals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-xl border border-white/8 bg-white/[0.04] p-4 text-sm text-white/72 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                >
                  {signal}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">Report summary</div>
              <p className="mt-3 text-sm leading-6 text-white/65">
                Strong warmth signals are present, but consistency and conflict
                repair need more evidence before escalating commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.04] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/[0.04] via-transparent to-violet-500/[0.04]" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-10 lg:px-8">
          {[
            ["Facts first", "Separate what happened from what you suspect it means."],
            ["Private memory", "Keep relationship context structured over time."],
            ["Decision support", "Clarify risk, fit, and next questions before major moves."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-white/8 bg-black/20 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/15 sm:p-6">
              <h2 className="font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6"><HeroProductPanel /></section>
      <ProcessFlowSection />
    <MarketingGraphicsStack />
    </main>
  );
}
