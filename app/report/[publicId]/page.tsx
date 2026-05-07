import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function PublicReportPage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const supabase = await createClient();

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("public_id", publicId)
    .single();

  if (!report) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.04] p-8">
          <h1 className="text-3xl font-semibold">Report not found</h1>
          <p className="mt-3 text-white/60">This public report link is unavailable.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">
          Shared relationship intelligence
        </p>
        <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-8">
          <h1 className="text-4xl font-semibold tracking-tight">{report.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/70">
            {report.summary || "Shared summary unavailable."}
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-black p-4 text-sm leading-6 text-white/55">
            This is a limited shared summary. Full private case context, timeline
            entries, and underlying notes are not exposed on public report links.
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold">Create your own private analysis</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
            Build relationship case files, analyze messages, generate reports,
            and keep your private context under your control.
          </p>
          <Link href="/signup" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Start LUVPARTNR
          </Link>
        </section>
      </div>
    </main>
  );
}
