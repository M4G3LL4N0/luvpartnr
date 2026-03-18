import { createClient } from "@/lib/supabase/server";

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
    return <div className="p-10 text-white bg-black">Report not found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-semibold">{report.title}</h1>
      <p className="mt-4 text-zinc-400">{report.summary}</p>
    </main>
  );
}
