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
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">
          Product
        </div>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          Private relationship intelligence, structured for clarity.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          LUVPARTNR helps users evaluate trust, compatibility, communication
          patterns, and long-term relationship dynamics through premium AI-assisted
          analysis and ongoing private case tracking.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h2 className="text-2xl font-semibold">{feature.title}</h2>
              <p className="mt-4 text-zinc-400">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
