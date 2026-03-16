import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: caseFile } = await supabase
    .from("case_files")
    .select("*")
    .eq("id", id)
    .single();

  const { data: entries } = await supabase
    .from("case_entries")
    .select("*")
    .eq("case_file_id", id)
    .order("created_at", { ascending: false });

  if (!caseFile) redirect("/app/cases");

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Case file
            </div>
            <h1 className="mt-4 text-4xl font-semibold">{caseFile.title}</h1>
            <p className="mt-3 text-zinc-400">
              {caseFile.subject_name || "Unnamed subject"} ·{" "}
              {caseFile.relationship_stage || "Unspecified stage"}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/app/cases/${id}/add-entry`}
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            >
              Add entry
            </Link>
            <Link
              href={`/app/cases/${id}/report`}
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white"
            >
              View report
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Timeline</h2>
          <div className="mt-6 space-y-4">
            {(entries ?? []).map((entry) => (
              <div
                key={entry.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm uppercase tracking-[0.15em] text-zinc-400">
                      {entry.entry_type}
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-zinc-300">
                      {entry.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/app/cases/${id}/entries/${entry.id}/edit`}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs text-white"
                    >
                      Edit
                    </Link>
                    {entry.user_id === user.id && (
                      <button
                        type="button"
                        className="rounded-full border border-red-500 px-3 py-1 text-sm text-red-500"
                        onClick={() => {
                          supabase
                            .from("case_entries")
                            .delete()
                            .eq("id", entry.id)
                            .eq("user_id", user.id)
                            .single()
                            .then(() => {
                              window.location.reload();
                            })
                            .catch((err) => {
                              alert("Failed to delete entry: " + err.message);
                            });
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
