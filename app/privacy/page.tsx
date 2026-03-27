export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Privacy and ethics</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Built for discretion and responsible use.</h1>

        <div className="mt-10 space-y-6 text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Our Core Principles</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>All analysis is conducted privately and securely</li>
              <li>Data is encrypted end-to-end and never shared</li>
              <li>Users retain full control over their information</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Responsible Use Policy</h2>
            <p>
              LUVPARTNR is a decision-support tool, not a surveillance system. Users must only analyze 
              information they have lawful access to according to our ethical guidelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Interpretation Framework</h2>
            <p>
              All outputs are structured interpretations based on behavioral patterns. They are not 
              clinical diagnoses, not proof of wrongdoing, and not a substitute for professional advice.
            </p>
          </section>

          <section className="mt-8 p-6 rounded-2xl border border-white/10 bg-white/5">
            <h3 className="text-lg font-semibold text-white">Important Disclaimer</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Results are interpretations, not certainties, and should be used as one input among many.
            </p>
            <div className="mt-4 text-xs text-zinc-500">
              For full details, please review our Terms of Service and Privacy Policy.
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
