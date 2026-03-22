import { redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";
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

  async function deleteEntry(formData: FormData) {
    "use server";

    const entryId = String(formData.get("entryId") || "");
    const caseId = String(formData.get("caseId") || "");

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !entryId || !caseId) {
      return;
    }

    await supabase
      .from("case_entries")
      .delete()
      .eq("id", entryId)
      .eq("user_id", user.id);

    revalidatePath(`/app/cases/${caseId}`);
  }

  const { data: caseFile } = await supabase
    .from("case_files")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  const { data: entries } = await supabase
    .from("case_entries")
    .select("*")
    .eq("case_file_id", id)
    .eq("user_id", user.id)
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
              <span className="text-white/80">{caseFile.relationship_type}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
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

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Timeline</h2>

          <div className="mt-6 space-y-4">
            {(entries ?? []).length === 0 ? (
              <div className="text-zinc-400">No entries yet.</div>
            ) : (
              (entries ?? []).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl border border-white/10 bg-black/30 p-6 hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between gap-4">
                      <div>
                        <div className="text-sm uppercase tracking-[0.15em] text-zinc-400">
                          {entry.entry_type}
                        </div>
                        {entry.tags?.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {entry.tags.map((tag: string) => (
                              <span 
                                key={tag} 
                                className="rounded-full border border-purple-400/20 bg-purple-400/10 px-2.5 py-1 text-xs text-purple-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                    </div>
                    <p className="whitespace-pre-wrap text-zinc-300">
                      {entry.content}
                    </p>
                    <div className="flex shrink-0 gap-2 self-end">
                      <Link
                        href={`/app/cases/${id}/entries/${entry.id}/edit`}
                        className="rounded-full border border-white/15 px-4 py-2 text-xs text-white"
                      >
                        Edit
                      </Link>

                      <form action={deleteEntry}>
                        <input type="hidden" name="entryId" value={entry.id} />
                        <input type="hidden" name="caseId" value={id} />
                        <button
                          type="submit"
                          className="rounded-full border border-red-500/30 px-4 py-2 text-xs text-red-300"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
