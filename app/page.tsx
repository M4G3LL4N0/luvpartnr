import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR | Strategic Relationship Intelligence",
  description:
    "AI-powered relationship intelligence platform for compatibility assessment, risk analysis, and long-term decision-making. Navigate complex relationships with data-driven insights.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-5xl">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Strategic Intelligence Platform
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl leading-tight">
            Navigate Complex Relationships with AI-Driven Intelligence
          </h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-zinc-400">
            LUVPARTNR provides objective, data-driven analysis of relationship dynamics to help you make informed decisions about compatibility, risk, and long-term potential.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="/app"
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Begin Analysis
            </a>
            <a
              href="/sample-report"
              className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
            >
              View Sample Report
            </a>
          </div>
        </div>

        {/* Value Proposition Grid */}
        <section className="mt-32">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Core Capabilities
          </div>
          <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Compatibility Analysis",
                text: "Objective assessment of relationship foundations and long-term compatibility factors.",
              },
              {
                title: "Risk Assessment Framework",
                text: "Identify potential risks and develop mitigation strategies for complex relationship dynamics.",
              },
              {
                title: "Trust & Integrity Scoring",
                text: "Data-driven evaluation of trust factors and relationship integrity metrics.",
              },
              {
                title: "Communication Pattern Analysis",
                text: "Insights into communication effectiveness and relationship interaction patterns.",
              },
              {
                title: "Long-Term Projection Modeling",
                text: "Strategic forecasting of relationship trajectory and potential outcomes.",
              },
              {
                title: "Privacy-First Architecture",
                text: "Enterprise-grade security with end-to-end encryption and data sovereignty guarantees.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-zinc-600 hover:bg-zinc-900/70"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <h2 className="text-xl font-semibold text-white relative">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-zinc-400 relative">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ethical Framework Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Ethical Framework
          </div>
          <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                Designed for Responsible Decision-Making
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                LUVPARTNR is built on a foundation of ethical AI usage and responsible relationship assessment. Our platform provides insights, not certainties, and is designed to support thoughtful decision-making rather than replace human judgment.
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white">Our Commitment</h3>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                    <li>• Privacy by design architecture</li>
                    <li>• Transparent algorithmic decision-making</li>
                    <li>• Human oversight of AI recommendations</li>
                    <li>• Continuous ethical framework refinement</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Usage Guidelines</h3>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                    <li>• For personal relationship insights only</li>
                    <li>• Not for surveillance or monitoring</li>
                    <li>• Requires informed consent</li>
                    <li>• Complements, not replaces, human connection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access CTA Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-12 text-center">
            <div className="mx-auto max-w-3xl">
              <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Early Access Program
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Join Our Strategic Partnership Program
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Be among the first to experience LUVPARTNR's revolutionary relationship intelligence platform. Early access participants receive priority implementation support and influence on product development.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="/early-access"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Request Strategic Access
                </a>
                <a
                  href="/pricing"
                  className="rounded-full border border-zinc-700 px-8 py-4 text-sm font-medium text-white transition hover:bg-zinc-900"
                >
                  Explore Enterprise Solutions
                </a>
              </div>
              <p className="mt-8 text-sm text-zinc-400">
                Limited strategic partnerships available - secure your position in our exclusive early access cohort
              </p>
            </div>
          </div>
        </section>

        {/* Market Position Section */}
        <section className="mt-32 border-t border-zinc-800 pt-20">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-12">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-semibold tracking-tight">
                The Future of Relationship Intelligence
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-400">
                As relationships become increasingly complex in our digital age, LUVPARTNR provides the analytical framework needed to navigate interpersonal dynamics with clarity and confidence.
              </p>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">85%</div>
                  <div className="mt-2 text-sm text-zinc-400">of strategic decisions involve relationship assessment</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">3.2x</div>
                  <div className="mt-2 text-sm text-zinc-400">improved decision accuracy with data insights</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">94%</div>
                  <div className="mt-2 text-sm text-zinc-400">of users report better relationship clarity</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
