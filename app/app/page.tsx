import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: caseFiles } = await supabase
    .from("case_files")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: reports } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 p-6">
          <div className="text-sm font-semibold tracking-[0.25em]">LUVPARTNR</div>
          <div className="mt-4 text-sm text-zinc-400">{user.email}</div>

          <nav className="mt-10 space-y-3 text-sm text-zinc-400">
            <Link
              href="/app"
              className="block rounded-xl bg-white/10 px-3 py-2 text-white"
            >
              Dashboard
            </Link>
            <Link href="/app/cases" className="block px-3 py-2 hover:text-white">
              Case Files
            </Link>
            <Link href="/app/reports" className="block px-3 py-2 hover:text-white">
              Reports
            </Link>
            <Link href="/logout" className="block px-3 py-2 hover:text-white">
              Logout
            </Link>
          </nav>
        </aside>

        <section className="p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                Dashboard
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">
                Your private relationship intelligence workspace
              </h1>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Manage case files, review reports, and keep a structured record of
                relationship events, signals, and decisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/app/cases/new"
                className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
              >
                New Case File
              </Link>
              <Link
                href="/app/reports"
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white"
              >
                View Reports
              </Link>
              <form action="/api/checkout" method="post">
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
                >
                  Upgrade
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">Case Files</div>
              <div className="mt-2 text-3xl font-semibold">{caseFiles?.length ?? 0}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">Reports</div>
              <div className="mt-2 text-3xl font-semibold">{reports?.length ?? 0}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-zinc-400">Status</div>
              <div className="mt-2 text-lg font-semibold">
                {caseFiles?.length > 0 ? caseFiles[0].alert_level || 'low' : 'low'}
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recent Case Files</h2>
                <Link href="/app/cases" className="text-sm text-zinc-400 hover:text-white">
                  View all
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {(caseFiles ?? []).length === 0 ? (
                  <div className="text-zinc-400">No case files yet.</div>
                ) : (
                  (caseFiles ?? []).map((item) => (
                    <Link
                      key={item.id}
                      href={`/app/cases/${item.id}`}
                      className="block rounded-2xl border border-white/10 bg-black/30 p-4"
                    >
                      <div className="text-lg font-medium">{item.title}</div>
                      <div className="mt-1 text-sm text-zinc-400">
                        {item.subject_name || "Unnamed subject"} ·{" "}
                        {item.relationship_stage || "Unspecified stage"}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Recent Reports</h2>
                <Link href="/app/reports" className="text-sm text-zinc-400 hover:text-white">
                  View all
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {(reports ?? []).length === 0 ? (
                  <div className="text-zinc-400">No reports yet.</div>
                ) : (
                  (reports ?? []).map((report) => (
                    <Link
                      key={report.id}
                      href={`/app/reports/${report.id}`}
                      className="block rounded-2xl border border-white/10 bg-black/30 p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-lg font-medium">{report.title}</div>
                          <div className="mt-1 text-sm text-zinc-400">
                            {report.summary || "Saved relationship intelligence report"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                            Score
                          </div>
                          <div className="mt-1 text-2xl font-semibold">
                            {report.overall_score ?? "—"}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
