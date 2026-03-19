import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AppDashboardPage() {
  const supabase = await createClient();
  const { data: { user }, } = await supabase.auth.getUser();
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

  // Route to onboarding if no case files exist
  if (!caseFiles || caseFiles.length === 0) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        {/* Premium Sidebar */}
        <aside className="border-r border-white/10 p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">LP</span>
            </div>
            <div className="text-lg sm:text-xl font-bold tracking-[0.1em]">LUVPARTNR</div>
          </div>
          <div className="space-y-1">
            <div className="px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-[0.15em] mb-2">Workspace</div>
            <Link href="/app" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white text-sm font-medium border border-white/20" >
              <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xs">📊</span>
              </div>
              Dashboard
            </Link>
            <Link href="/app/cases" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-all border border-transparent hover:border-white/10">
              <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xs">📁</span>
              </div>
              Case Files
            </Link>
            <Link href="/app/reports" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-all border border-transparent hover:border-white/10">
              <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xs">📈</span>
              </div>
              Reports
            </Link>
          </div>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-[0.15em] mb-2">Account</div>
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm font-medium text-white">{user.email}</div>
              <div className="text-xs text-white/50 mt-1 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Premium Member
              </div>
            </div>
            <Link href="/logout" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-sm text-white/70 hover:text-white transition-all border border-transparent hover:border-white/10 mt-2">
              <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-xs">🚪</span>
              </div>
              Logout
            </Link>
          </div>
        </aside>
        {/* Main Content */}
        <section className="p-4 sm:p-8">
          {/* Enhanced Header */}
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-xs font-medium text-white">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Welcome back
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight"> Your Relationship Intelligence Hub </h1>
              <p className="mt-3 text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed"> Analyze communication patterns, assess compatibility, and make informed decisions about your relationships with AI-powered insights. </p>
            </div>
            {/* Premium CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/app/cases/new" className="group relative overflow-hidden rounded-full bg-white px-6 sm:px-7 py-3 sm:py-4 text-sm font-semibold text-black transition-all hover:scale-105 hover:shadow-lg min-w-[160px] sm:min-w-auto" >
                <span className="relative z-10">New Analysis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              <Link href="/app/reports" className="rounded-full border border-white/20 px-6 sm:px-7 py-3 sm:py-4 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 transition-all hover:shadow-lg min-w-[160px] sm:min-w-auto" >
                View Reports
              </Link>
              <form action="/api/checkout" method="post">
                <button type="submit" className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 sm:px-7 py-3 sm:py-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg min-w-[160px] sm:min-w-auto" >
                  <span className="relative z-10">Upgrade Pro</span>
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-opacity"></div>
                </button>
              </form>
            </div>
            {/* Enhanced Stats Grid */}
            <div className="mt-12 sm:mt-16 grid gap-4 sm:gap-6 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6 transition-all hover:border-white/20 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Case Files</div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                    📁
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-4xl font-bold">{caseFiles?.length ?? 0}</div>
                <div className="mt-1 text-xs text-white/50">Active analyses</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6 transition-all hover:border-white/20 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Reports</div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                    📊                   </div>
                </div>
                <div className="mt-3 text-2xl sm:text-4xl font-bold">{reports?.length ?? 0}</div>
                <div className="mt-1 text-xs text-white/50">Generated insights</div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6 transition-all hover:border-white/20 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Alert Level</div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                    ⚠️
                  </div>
                </div>
                <div className="mt-3 text-2xl sm:text-4xl font-bold"> {(caseFiles && caseFiles.length > 0) ? (caseFiles[0]?.alert_level || 'low') : 'low'} </div>
                <div className="mt-1 text-xs text-white/50">Current status</div>
              </div>
            </div>
            {/* Enhanced Recent Content */}
            <div className="mt-12 sm:mt-20 grid gap-6 sm:gap-8 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold">Recent Case Files</h2>
                  <Link href="/app/cases" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                    View all →                  </Link>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {(caseFiles ?? []).length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-white/50">
                      <div className="text-3xl sm:text-4xl mb-4">📋</div>
                      <div className="text-base sm:text-lg font-medium mb-2">No case files yet</div>
                      <div className="text-sm">Start your first analysis</div>
                    </div>
                  ) : (
                    (caseFiles ?? []).map((item, index) => (
                      <Link key={item.id} href={`/app/cases/${item.id}`} className="block group rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5 transition-all hover:border-white/20 hover:bg-white/5 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-base sm:text-lg font-semibold group-hover:text-white transition-colors">
                              {item.title}
                            </div>
                            <div className="mt-2 flex items-center gap-3 text-sm text-white/60">
                              <span>{item.subject_name || "Unnamed subject"}</span>
                              <span>·</span>
                              <span>{item.relationship_stage || "Unspecified stage"}</span>
                            </div>
                          </div>
                          <div className="ml-3 sm:ml-4 flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${ item.alert_level === 'high' ? 'bg-red-500' : item.alert_level === 'medium' ? 'bg-yellow-500' : 'bg-green-500' }`}></div>
                            <span className="text-xs text-white/50">
                              {new Date(item.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold">Recent Reports</h2>
                  <Link href="/app/reports" className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                    View all →
                  </Link>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {(reports ?? []).length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-white/50">
                      <div className="text-3xl sm:text-4xl mb-4">📈</div>
                      <div className="text-base sm:text-lg font-medium mb-2">No reports yet</div>
                      <div className="text-sm">Generate your first analysis</div>
                    </div>
                  ) : (
                    (reports ?? []).map((report, index) => (
                      <Link key={report.id} href={`/app/reports/${report.id}`} className="block group rounded-xl border border-white/10 bg-black/30 p-4 sm:p-5 transition-all hover:border-white/20 hover:bg-white/5 hover:shadow-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-base sm:text-lg font-semibold group-hover:text-white transition-colors">
                              {report.title}
                            </div>
                            <div className="mt-2 text-sm text-white/60 leading-relaxed">
                              {report.summary || "AI-generated relationship analysis"}
                            </div>
                          </div>
                          <div className="ml-3 sm:ml-4 flex flex-col items-end gap-3">
                            <div className="text-xs uppercase tracking-[0.1em] text-white/50">
                              Score
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold">
                              {report.overall_score ?? "—"}
                            </div>
                            <div className="text-xs text-white/50">
                              {new Date(report.created_at).toLocaleDateString()}
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
      </div>
    </main>
  );
}
