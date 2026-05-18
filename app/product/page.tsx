import { SubpageVisual } from "@/components/SubpageVisual";
export default function ProductPage() {
  const features = [
    {
      title: "Relationship intelligence reports",
      text: "Turn messages, notes, observations, and timelines into structured insight.",
    },
    {
      title: "Risk scoring",
      text: "Assess instability, inconsistency, manipulation signals, and long-term relationship risk.",
    },
    {
      title: "Compatibility mapping",
      text: "Compare communication style, values, habits, emotional fit, and long-term alignment.",
    },
    {
      title: "Communication forensics",
      text: "Analyze blame shifting, vagueness, warmth changes, accountability, and reciprocity.",
    },
    {
      title: "Case file tracking",
      text: "Keep a private ongoing record of events, conflicts, promises, repairs, and timeline changes.",
    },
    {
      title: "Missing information detection",
      text: "Identify what you still do not know and what questions matter before deeper commitment.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 py-12 text-white sm:px-6 lg:px-8">
      <SubpageVisual variant="default" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(800px_circle_at_20%_-10%,rgba(244,114,182,0.12),transparent_50%),radial-gradient(600px_circle_at_90%_20%,rgba(167,139,250,0.1),transparent_45%)]" aria-hidden />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Product
        </div>

        <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">
          Private relationship intelligence, structured for clarity.
        </h1>

        <p className="mt-6 max-w-3xl text-base sm:text-lg leading-8 text-zinc-400">
          LUVPARTNR helps users evaluate trust, compatibility, communication
          patterns, and long-term relationship dynamics through premium AI-assisted
          analysis and ongoing private case tracking.
        </p>

        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.35rem] border border-white/12 bg-white/[0.06] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/25 hover:bg-white/[0.08]"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-semibold">{feature.title}</h2>
                <svg 
                  className="w-6 h-6 text-zinc-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
