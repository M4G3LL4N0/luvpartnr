import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR",
  description:
    "Private AI relationship intelligence for compatibility, trust, risk, and long-term decision-making.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-4xl">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Private AI relationship intelligence
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
            Turn relationship confusion into structured insight.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            LUVPARTNR helps users analyze compatibility, communication,
            trust, emotional risk, and long-term relationship potential
            through private AI-powered reports and ongoing case tracking.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/app"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Start private analysis
            </a>
            <a
              href="/sample-report"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/5"
            >
              See sample report
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Relationship intelligence reports",
              text: "Turn messy conversations, notes, and behavioral observations into clear structured analysis.",
            },
            {
              title: "Risk scoring",
              text: "Assess inconsistency, emotional instability, manipulation signals, and long-term risk.",
            },
            {
              title: "Compatibility mapping",
              text: "Compare values, habits, emotional style, and long-term relationship fit.",
            },
            {
              title: "Communication forensics",
              text: "Analyze vagueness, blame shifting, warmth changes, and accountability patterns.",
            },
            {
              title: "Case file tracking",
              text: "Keep a private timeline of events, promises, conflicts, and major relationship signals.",
            },
            {
              title: "Missing information detection",
              text: "See what you still do not know and what questions matter most before committing.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Privacy and ethics
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Built for discretion, clarity, and responsible use.
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              LUVPARTNR is not a spying tool, lie detector, or diagnosis engine.
              It is a reflective decision-support platform designed to help users
              think more clearly with the information they already have.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
            <div className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                LUVPARTNR
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Serious decision-support for serious relationships.
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Evaluate trust, compatibility, communication patterns, and
                long-term potential with more structure and less guesswork.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/pricing"
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
                >
                  View pricing
                </a>
                <a
                  href="/investor"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/5"
                >
                  Investor overview
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
