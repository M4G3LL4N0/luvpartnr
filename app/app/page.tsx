import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

const modules = [
  {
    title: "Case files",
    href: "/app/cases",
    text: "Create private relationship files, track context, and keep important signals out of memory fog.",
  },
  {
    title: "Reports",
    href: "/app/reports",
    text: "Review generated intelligence reports, scores, missing information, and long-term outlooks.",
  },
  {
    title: "Message analyzer",
    href: "/app/analyze",
    text: "Evaluate tone, intent, risk, and response options before important conversations.",
  },
];

export default function AppDashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
          Private intelligence workspace
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Organize the relationship evidence before emotion rewrites it.
        </h1>
        <p className="mt-5 max-w-2xl text-white/65">
          LUVPARTNR is a structured case system for timelines, message analysis,
          report generation, and calmer relationship decisions over time.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/app/cases/new" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            New case file
          </Link>
          <Link href="/app/analyze" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white">
            Analyze message
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25 hover:bg-white/[0.07]"
            >
              <h2 className="text-lg font-semibold">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{module.text}</p>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-white/35">
            Empty-state guidance
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">
            Start with one case, add three factual timeline entries, then generate
            a report. The system works best when it has concrete events, exact
            message language, and unresolved questions to reason over.
          </p>
        </section>
      </div>
    </main>
  );
}
