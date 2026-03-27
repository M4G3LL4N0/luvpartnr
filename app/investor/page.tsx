export default function InvestorPage() {
  const sections = [
    {
      title: "Category Creation",
      text: "We're building the Relationship Intelligence category - a new software layer for high-stakes personal decisions. Starting with romantic relationships, expanding to broader relational intelligence.",
    },
    {
      title: "Market Expansion",
      text: "Our wedge: serious daters and commitment-stage users. Expansion path: reconciliation evaluators, family dynamics, business partnerships, and high-stakes personal relationships.",
    },
    {
      title: "Revenue Model",
      text: "Premium subscriptions first, then enterprise licenses, API access, white-label solutions, and professional tools for coaches, therapists, and mediators.",
    },
    {
      title: "Competitive Moat",
      text: "Our structured relationship ontology, longitudinal case data, evolving AI models, and category-defining brand create a durable competitive advantage.",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Investor</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          A new software category for high-stakes personal decisions.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-400">
          LUVPARTNR transforms relationship ambiguity into structured recurring insight through case files, scoring,
          compatibility analysis, and long-term risk modeling.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 text-zinc-400">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
