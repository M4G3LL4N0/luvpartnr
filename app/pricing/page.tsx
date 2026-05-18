import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

const tiers = [
  {
    name: "Private",
    price: "$19",
    description: "For one person making clearer relationship decisions.",
    features: ["3 active case files", "10 AI reports/month", "Message analyzer", "Private report history"],
  },
  {
    name: "Strategist",
    price: "$49",
    description: "For users tracking multiple relationships or longer timelines.",
    features: ["Unlimited case files", "Unlimited reports", "Advanced risk scoring", "Longitudinal memory"],
    featured: true,
  },
  {
    name: "Professional",
    price: "$149",
    description: "For coaches, therapists, mediators, and serious advisory use.",
    features: ["Client-ready exports", "Structured reflection templates", "Priority support", "Future team tools"],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white lg:px-8">
      <SubpageVisual variant="pricing" />
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">Pricing</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Relationship intelligence priced for serious decisions.
        </h1>
        <p className="mt-5 max-w-2xl text-white/65">
          Start privately, upgrade when case memory, recurring reports, and
          deeper analysis become part of your decision process.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <section
              key={tier.name}
              className={`rounded-2xl border p-6 ${
                tier.featured ? "border-white/35 bg-white/[0.08]" : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{tier.name}</h2>
                {tier.featured ? (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                    Best fit
                  </span>
                ) : null}
              </div>
              <div className="mt-5 text-4xl font-semibold">
                {tier.price}
                <span className="text-base font-normal text-white/45"> / month</span>
              </div>
              <p className="mt-4 min-h-12 text-sm leading-6 text-white/60">{tier.description}</p>
              <ul className="mt-6 space-y-3 text-sm text-white/70">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                href="/signup"
                className={`mt-8 block rounded-full px-5 py-3 text-center text-sm font-semibold ${
                  tier.featured ? "bg-white text-black" : "border border-white/15 text-white"
                }`}
              >
                Start private analysis
              </Link>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold">Trust boundary</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
            LUVPARTNR does not sell gossip, surveillance, lie detection, or
            diagnosis. It sells structured private reasoning for people trying to
            make better relationship decisions.
          </p>
        </section>
      </div>
    </main>
  );
}
