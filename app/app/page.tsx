import Link from "next/link";
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
            <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
              LUVPARTNR
            </Link>
            <Link href="/app" className="block rounded-xl bg-white/10 px-3 py-2 text-white">
              Dashboard
            </Link>
            <Link href="/app/cases" className="block px-3 py-2 hover:bg-white/10 rounded-xl transition">
              Case Files
            </Link>
            <Link href="/app/reports" className="block px-3 py-2 hover:bg-white/10 rounded-xl transition">
              Reports
            </Link>
            <Link href="/app/timeline" className="block px-3 py-2 hover:bg-white/10 rounded-xl transition">
              Timeline
            </Link>
            <Link href="/app/settings" className="block px-3 py-2 hover:bg-white/10 rounded-xl transition">
              Settings
            </Link>
            <Link href="/logout" className="block px-3 py-2 hover:bg-white/10 rounded-xl transition text-red-400">
              Logout
            </Link>
          </nav>
        </aside>

        <section className="p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-zinc-400 max-w-2xl">
              Welcome back, {user.email}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <h2 className="mb-4 text-xl font-semibold">Recent Case Files</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Johnson Family Matter</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Last updated: Today • 3 new entries
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Smith Acquisition</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Last updated: Yesterday • 1 new entry
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Williams Estate Planning</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Last updated: 2 days ago • No new entries
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-span-1">
              <h2 className="mb-4 text-xl font-semibold">Recent Reports</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Relationship Health Assessment</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Generated: Today • 87% compatibility score
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Communication Patterns Analysis</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Generated: Yesterday • 4 key insights
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                  <h3 className="font-medium text-white">Conflict Resolution Report</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Generated: 2 days ago • 3 recommended actions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
