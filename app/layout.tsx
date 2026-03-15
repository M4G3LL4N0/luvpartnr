import.
"./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR",
  description:
    "Private AI relationship intelligence for compatibility, trust, risk, and long-term decision-making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="fixed top-0 left-0 right-0 z-10 bg-black/90 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto px-6 py-4 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-2xl font-bold text-white">LUVPARTNR</div>
              </div>
              <div className="hidden md:flex">
                <a
                  href="/app"
                  className="px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Product
                </a>
                <a
                  href="/pricing"
                  className="px-4 py-2 text-sm font-medium text-white/70 transition hover:opacity-90"
                >
                  Pricing
                </a>
                <a
                  href="/investor"
                  className="px-4 py-2 text-sm font-medium text-white/70 transition hover:opacity-90"
                >
                  Investor
                </a>
                <a
                  href="/sample-report"
                  className="px-4 py-2 text-sm font-medium text-white/70 transition hover:opacity-90"
                >
                  Sample Report
                </a>
                <a
                  href="/privacy"
                  className="px-4 py-2 text-sm font-medium text-white/70 transition hover:opacity-90"
                >
                  Privacy
                </a>
              </div>
            </div>
          </nav>
        </header>

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

        <footer className="mt-auto border-t border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6 py-4 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-zinc-400">
                © 2023 LUVPARTNR. All rights reserved.
              </div>
              <div className="flex space-x-4">
                <a
                  href="/privacy"
                  className="text-sm text-zinc-400 transition hover:text-zinc-300"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-zinc-400 transition hover:text-zinc-300"
                >
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
