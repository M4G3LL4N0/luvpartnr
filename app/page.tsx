import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR | Relationship Intelligence Platform",
  description:
    "Private AI-powered relationship intelligence for compatibility, trust assessment, and long-term decision-making. Turn uncertainty into strategic clarity.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-5xl">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Strategic Relationship Insights
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl leading-tight">
            Elevate Your Decision-Making with AI-Driven Relationship Intelligence
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
            LUVPARTNR empowers you to make informed, data-driven decisions about your relationships, leveraging AI analysis of compatibility, trust, and long-term potential.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/app"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Unlock Private Analysis
            </a>
            <a
              href="/sample-report"
              className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
            >
              Explore Sample Insights
            </a>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <section className="mt-32">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Key Benefits
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Data-Driven Decision-Making",
                text: "Make informed choices with objective analysis of relationship dynamics.",
              },
              {
                title: "Risk Assessment and Mitigation",
                text: "Identify potential risks and develop strategies to navigate complex relationship challenges.",
              },
              {
                title: "Compatibility and Long-Term Potential",
                text: "Evaluate the foundation for a successful, long-term connection with AI-driven insights.",
              },
              {
                title: "Emotional Intelligence and Awareness",
                text: "Develop a deeper understanding of your emotional landscape and its impact on relationships.",
              },
              {
                title: "Private and Secure Analysis",
                text: "Trust our secure, private platform to safeguard your personal information and relationship data.",
              },
              {
                title: "Actionable Recommendations",
                text: "Receive personalized guidance to enhance your relationships and achieve your goals.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm"
              >
                <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

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

        {/* Final CTA Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Empower Your Relationship Decisions
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Discover how LUVPARTNR's AI-driven relationship intelligence can help you navigate complex relationships and make informed decisions.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/pricing"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Explore Pricing Options
                </a>
                <a
                  href="/investor"
                  className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  Learn About Investment Opportunities
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
