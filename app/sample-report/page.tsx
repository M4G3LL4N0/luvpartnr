export default function SampleReportPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Sample report</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Structured relationship intelligence, at a glance.</h1>

        <div className="mt-12 space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Executive summary</h2>
            <p className="mt-4 text-zinc-400">
              Strong emotional interest is present, but consistency and accountability remain under-proven. Current evidence supports caution before deeper commitment.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Red flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-400">
                <li>• warmth-to-distance shifts</li>
                <li>• limited accountability after conflict</li>
                <li>• inconsistent follow-through</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">Green flags</h2>
              <ul className="mt-4 space-y-3 text-zinc-400">
                <li>• genuine emotional warmth</li>
                <li>• some evidence of empathy</li>
                <li>• positive engagement when stable</li>
              </ul>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Missing information</h2>
            <p className="mt-4 text-zinc-400">
              There is still limited evidence on stress response, money habits, real conflict repair, and long-term life alignment.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Recommended next steps</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• observe consistency over the next 30 days</li>
              <li>• ask direct questions about accountability and long-term goals</li>
              <li>• avoid escalating commitment until evidence improves</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
