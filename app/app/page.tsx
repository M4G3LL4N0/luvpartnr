export default function AppShellPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 p-6">
          <div className="text-sm font-semibold tracking-[0.25em]">LUVPARTNR</div>
          <nav className="mt-10 space-y-3 text-sm text-zinc-400">
            <div className="rounded-xl bg-white/10 px-3 py-2 text-white">Dashboard</div>
            <div className="px-3 py-2">Case Files</div>
            <div className="px-3 py-2">Reports</div>
            <div className="px-3 py-2">Timeline</div>
            <div className="px-3 py-2">Settings</div>
          </nav>
        </aside>

        <section className="p-8">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">App preview</div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Private relationship dashboard</h1>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Trustworthiness", "61"],
              ["Emotional Maturity", "73"],
              ["Consistency", "52"],
              ["Compatibility", "64"],
            ].map(([label, score]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-zinc-400">{label}</div>
                <div className="mt-3 text-3xl font-semibold">{score}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Current case file</h2>
            <p className="mt-4 text-zinc-400">
              Strong emotional warmth is present, but accountability and consistency remain materially under-proven.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
