import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LUVPARTNR | The Operating System for High-Stakes Relationships",
  description:
    "The world's first Relationship Intelligence Platform. Transform ambiguity into clarity with AI-powered insights for life's most important decisions.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center">
          <h1 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            The Intelligence Layer for Life's Most Important Decisions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            LUVPARTNR transforms relationship ambiguity into structured insight. 
            Our AI-powered platform helps you navigate high-stakes decisions with clarity and confidence.
          </p>
        </section>

        {/* Value Proposition */}
        <section className="mt-16 space-y-6 sm:mt-20 sm:space-y-8 md:grid md:grid-cols-3 md:gap-8">
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Clarity</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">Transform emotional ambiguity into structured insight.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Confidence</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">Make high-stakes decisions with AI-powered intelligence.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-white text-4xl sm:text-5xl font-bold">Control</div>
              <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">Navigate complex relationships with precision and foresight.</p>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Trusted by Strategic Thinkers
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Professionals across industries use LUVPARTNR to make better relationship decisions
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-zinc-400 mt-2">Accuracy</div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-sm text-zinc-400 mt-2">Insights Shared</div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-2xl font-bold">92%</div>
              <div className="text-sm text-zinc-400 mt-2">User Satisfaction</div>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="text-sm text-zinc-400 mt-2">Rating</div>
            </div>
          </div>
        </section>

        {/* Product Preview */}
        <section className="mt-16 sm:mt-20">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-12">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">Product Preview</h2>
            <div className="mt-6 rounded-lg bg-zinc-800 overflow-hidden">
              <div className="relative w-full h-64 sm:h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="relative p-4">
                <p className="text-xs text-zinc-400">Interactive relationship dashboard</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 sm:mt-20 text-center">
          <a
            href="/app"
            className="mt-8 sm:mt-12 inline-flex items-center justify-center rounded-full bg-white px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold text-black transition hover:bg-zinc-200 min-w-[200px] sm:min-w-auto"
          >
            Begin Analysis
          </a>
        </section>
      </div>
    </main>
  );
}
