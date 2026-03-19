export default function PricingPage() {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "1 basic report per month",
        "Single case file",
        "Limited behavioral insights",
        "Basic scoring metrics",
        "Community support"
      ],
      description: "Perfect for trying out our platform"
    },
    {
      name: "Pro",
      price: "$29",
      features: [
        "Unlimited reports",
        "Unlimited case files",
        "Advanced behavioral scoring",
        "Emotional intelligence analysis",
        "Relationship pattern tracking",
        "Priority email support",
        "Export to PDF"
      ],
      description: "For serious relationship analysis"
    },
    {
      name: "Premium",
      price: "$99",
      features: [
        "Everything in Pro",
        "Scenario modeling & predictions",
        "Evolving memory system",
        "Multi-relationship tracking",
        "API access",
        "Custom report templates",
        "Dedicated support",
        "Early feature access"
      ],
      description: "For professionals & power users"
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Pricing</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Transform Your Relationship Intelligence</h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          From basic insights to comprehensive behavioral analysis. Choose your level and unlock deeper understanding of relationship dynamics.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.name} className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-white/20 transition-all duration-300">
              <div className="text-sm text-zinc-400 mb-2">{tier.name}</div>
              <div className="text-4xl font-semibold mb-2">{tier.price}<span className="text-base text-zinc-400"> / month</span></div>
              <p className="text-sm text-zinc-400 mb-6">{tier.description}</p>
              <ul className="space-y-3 text-sm text-zinc-300">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Value Differentiation Section */}
        <section className="mt-24 border-t border-zinc-800 pt-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Why Upgrade to Premium?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-400">
              Our premium tiers deliver unmatched relationship intelligence that evolves with your needs
            </p>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4">
                  <span className="text-xl">∞</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Unlimited Reports</h3>
                <p className="text-zinc-400">Analyze every interaction without limits. Build comprehensive behavioral profiles.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-4">
                  <span className="text-xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Deeper Intelligence</h3>
                <p className="text-zinc-400">Advanced emotional analysis and pattern recognition that goes beyond surface-level insights.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-4">
                  <span className="text-xl">🔄</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Evolving Memory</h3>
                <p className="text-zinc-400">Our AI learns and adapts, providing increasingly accurate insights over time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access CTA Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Join Our Exclusive Early Access Program
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Be among the first to experience LUVPARTNR's revolutionary relationship intelligence platform. Early access members receive exclusive benefits and priority support.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/early-access"
                  className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-sm font-semibold text-white transition hover:from-purple-700 hover:to-pink-700"
                >
                  Reserve Your Spot Now
                </a>
                <a
                  href="/pricing"
                  className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  View All Features
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
