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
            Precision relationship intelligence for confident decisions.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            LUVPARTNR provides private AI-powered analysis of compatibility, trust, communication patterns, and long-term potential—turning uncertainty into strategic clarity.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/app"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Begin private analysis
            </a>
            <a
              href="/sample-report"
              className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:bg-white/5"
            >
              View sample report
            </a>
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Structured analysis",
              text: "Transform conversations, notes, and observations into clear, actionable insights.",
            },
            {
              title: "Risk assessment",
              text: "Quantify emotional risk, inconsistency, and manipulation signals.",
            },
            {
              title: "Compatibility mapping",
              text: "Compare values, habits, and emotional alignment for long-term fit.",
            },
            {
              title: "Communication patterns",
              text: "Detect vagueness, blame shifting, and accountability trends.",
            },
            {
              title: "Timeline tracking",
              text: "Maintain a private record of events, promises, and conflicts.",
            },
            {
              title: "Gap analysis",
              text: "Identify unknowns and critical questions before commitment.",
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
              LUVPARTNR is a reflective decision-support platform, not a surveillance tool. We help you think more clearly with the information you already have, responsibly and privately.
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
                Make confident relationship decisions with AI-powered analysis of trust, compatibility, and long-term potential.
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
