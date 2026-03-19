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
    return <div className="p-10 text-white bg-black rounded-xl">Report not found</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900 text-white p-10">
      <div className="max-w-3xl mx-auto rounded-xl border border-white/10 bg-slate-800 p-12 shadow-lg">
        <h1 className="text-5xl font-bold text-center tracking-tight mb-4">
          {report.title}
        </h1>
        <p className="text-lg text-zinc-300 text-center mb-8">{report.summary}</p>

        {/* Trust & seriousness cue */}
        <p className="text-sm text-zinc-400 text-center mt-6 italic">
          Your insights, securely generated.
        </p>

        {/* Subtle CTA back to the main product */}
        <Link
          href="/product"
          className="mt-8 inline-block bg-white/20 text-gray-800 font-medium py-2 px-6 rounded-lg transition hover:bg-white/30"
        >
          Explore the Platform
        </Link>
      </div>
    </main>
  );
}
