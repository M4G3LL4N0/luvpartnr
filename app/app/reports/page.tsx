import Link from "next/link";

const reportModules = [
  "Overall relationship score",
  "Observed facts vs. inferences",
  "Red flags and green flags",
  "Missing information",
  "One, five, and twenty year outlook",
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/app" className="text-sm text-white/55 hover:text-white">
          Back to workspace
        </Link>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">
              Report history
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Decision support that keeps its reasoning visible.
            </h1>
            <p className="mt-4 max-w-2xl text-white/65">
              Reports should show what is known, what is inferred, what remains
              unknown, and what decisions deserve caution.
            </p>
          </div>
          <Link href="/app/cases" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Open cases
          </Link>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-5">
          {reportModules.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm leading-6 text-white/70">{item}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-dashed border-white/15 bg-zinc-950 p-8">
          <h2 className="text-xl font-semibold">No report index data shown yet.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Generate a report from a case file to create a saved report row. The
            detail route already renders the full report schema for authenticated
            reports.
          </p>
        </section>
      </div>
    </main>
  );
}
