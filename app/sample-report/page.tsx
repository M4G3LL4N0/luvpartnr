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
            <h2 className="text-2xl font-semibold">Observed Facts</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Repeated patterns of emotional openness during stable periods</li>
              <li>• Documented instances of conflict resolution attempts</li>
              <li>• Consistent communication frequency over 4 weeks</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Strong Inferences</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• High potential for long-term compatibility if consistency improves</li>
              <li>• Emotional maturity may develop with structured accountability</li>
              <li>• Shared values in core relationship areas</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Weak Inferences</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Limited evidence of conflict resolution effectiveness</li>
              <li>• Inconsistent demonstration of reliability</li>
              <li>• Unverified long-term life goals alignment</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Missing Information</h2>
            <p className="mt-4 text-zinc-400">
              Critical gaps include stress response patterns, financial behavior transparency, and documented conflict repair processes. Long-term life alignment requires further validation.
            </p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Red Flags</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Emotional withdrawal during stress</li>
              <li>• Avoidance of accountability in past conflicts</li>
              <li>• Inconsistent follow-through on commitments</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Green Flags</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Willingness to discuss relationship challenges</li>
              <li>• Demonstrated empathy in vulnerable moments</li>
              <li>• Positive engagement during stable interactions</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Next Steps</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li>• Monitor consistency over the next 30 days</li>
              <li>• Request specific examples of accountability in past conflicts</li>
              <li>• Avoid escalating commitment until evidence improves</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">Long-Term Outlook</h2>
            <p className="mt-4 text-zinc-400">
              With demonstrated improvement in consistency and accountability, this relationship shows moderate potential for long-term stability. However, significant risks remain if current patterns persist. Strategic investment in communication and shared goal-setting is recommended.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
