import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

const examples = [
  "Commitment decision file",
  "Post-conflict pattern review",
  "Friendship trust audit",
];

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-6xl">
        <Link href="/app" className="text-sm text-white/55 hover:text-white">
          Back to workspace
        </Link>
        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">
              Case files
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
              Private files for meaningful relationships.
            </h1>
            <p className="mt-4 max-w-2xl text-white/65">
              Each file keeps timeline entries, message notes, reports, and
              relationship memory separated by person or situation.
            </p>
          </div>
          <Link href="/app/cases/new" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Create case
          </Link>
        </div>

        <section className="mt-10 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold">No live case list connected here yet.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Use the create flow to add real Supabase-backed case files. A strong
            first file usually includes the relationship type, the current decision,
            and the most important timeline events.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {examples.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-black p-4 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
