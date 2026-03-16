export default function PricingPage() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: ["1 basic report per month", "1 case file", "Limited inputs"],
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Unlimited reports", "Saved case files", "Advanced scoring"],
    },
    {
      name: "Premium",
      price: "$99",
      features: ["Multiple case files", "Scenario modeling", "Export-ready reports"],
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Pricing</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Simple pricing for serious users.</h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Start free, then unlock deeper reports, saved history, case tracking, and premium intelligence features.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <div className="text-sm text-zinc-400">{tier.name}</div>
              <div className="mt-3 text-4xl font-semibold">{tier.price}<span className="text-base text-zinc-400"> / month</span></div>
              <ul className="mt-6 space-y-3 text-sm text-zinc-300">
                {tier.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Early Access CTA Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Join Our Early Access Program
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Be among the first to experience LUVPARTNR's revolutionary relationship intelligence platform. Early access members receive exclusive benefits and priority support.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/early-access"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Request Early Access
                </a>
                <a
                  href="/pricing"
                  className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  View Pricing Plans
                </a>
              </div>
              <p className="mt-8 text-sm text-zinc-400">
                Limited spots available - join now to secure your place in our exclusive early access program
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
