import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppShellPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 p-6">
          <div className="text-sm font-semibold tracking-[0.25em]">LUVPARTNR</div>
          <div className="mt-6 text-sm text-zinc-400">{user.email}</div>
          <nav className="mt-10 space-y-3 text-sm text-zinc-400">
            <div className="rounded-xl bg-white/10 px-3 py-2 text-white">Dashboard</div>
            <div className="px-3 py-2">Case Files</div>
            <div className="px-3 py-2">Reports</div>
            <div className="px-3 py-2">Timeline</div>
            <div className="px-3 py-2">Settings</div>
          </nav>
        </aside>

        <section className="p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Authenticated app</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Private relationship dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Next step: case files, entries, reports, and real product workflows.
          </p>
        </section>
      </div>
    </main>
  );
}
