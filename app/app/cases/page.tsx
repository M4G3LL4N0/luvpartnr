import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CasesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: caseFiles, error } = await supabase
    .from("case_files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-sm text-zinc-400">Failed to load case files.</div>
          <div className="mt-2 text-sm text-zinc-500">{error.message}</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Case files
            </div>
            <h1 className="mt-4 text-4xl font-semibold">
              Your private relationship files
            </h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Organize each person, relationship stage, and timeline in one place.
            </p>
          </div>

          <Link
            href="/app/cases/new"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
          >
            New case file
          </Link>
        </div>

        <div className="mt-10 grid gap-4">
          {(caseFiles ?? []).length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-zinc-400">
              No case files yet. Create your first private case file.
            </div>
          ) : (
            caseFiles!.map((item) => (
              <Link
                key={item.id}
                href={`/app/cases/${item.id}`}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/[0.07]"
              >
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-zinc-400">
                  {item.subject_name || "Unnamed subject"} ·{" "}
                  {item.relationship_stage || "Unspecified stage"}
                </p>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
