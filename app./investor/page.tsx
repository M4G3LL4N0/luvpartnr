export default function InvestorPage() {
  const sections = [
    {
      title: "Category creation",
      text: "We are creating relationship intelligence: a new software category for evaluating, monitoring, and predicting high-stakes personal relationships. No systematic tool exists for what is arguably life's most consequential domain.",
    },
    {
      title: "Why now",
      text: "Three converging forces: (1) delayed commitment and rising relationship complexity, (2) AI's ability to model human dynamics, and (3) a generation that expects data-driven decisions for major life choices.",
    },
    {
      title: "Market behavior shift",
      text: "Users are moving from reactive counseling to proactive intelligence. They want continuous relationship monitoring, not just crisis intervention. This creates a recurring need for structured tracking and analysis.",
    },
    {
      title: "Product wedge",
      text: "We start with a consumer subscription for serious daters and reconciliation evaluators. Our wedge is a compatibility scoring engine combined with a case file system that users update regularly—turning relationship management into a disciplined practice.",
    },
    {
      title: "Recurring usage & retention logic",
      text: "Users log interactions, receive monthly risk reports, and get alerts for pattern changes. The product becomes a habit because relationship decisions are ongoing and emotionally charged. Retention compounds as users build years of personal history in the system.",
    },
    {
      title: "Moat",
      text: "Our defensibility comes from a structured relationship ontology, entrenched user workflows, longitudinal case data, and strong category branding. Switching costs increase as users accumulate history and rely on our scoring for major decisions.",
    },
    {
      title: "Data advantage",
      text: "We collect structured relationship data—interaction logs, conflict patterns, milestone tracking—that is impossible to replicate. Over time, we build predictive models for relationship outcomes that improve with more data, creating a self-reinforcing advantage.",
    },
    {
      title: "Business model",
      text: "Consumer subscriptions ($20-50/month) with tiered features. Then premium reports and exports ($100-500/report). Professional plans for coaches/therapists ($100/month). Enterprise for research institutions and insurance underwriting.",
    },
    {
      title: "Expansion path",
      text: "From individual consumers to couples (shared accounts), then to professionals (coaches, therapists) as a tool for their clients, and finally to enterprises (research, insurance, legal) for relationship risk assessment.",
    },
    {
      title: "Long-term platform vision",
      text: "We become the central nervous system for relationship intelligence. Our ontology and data become the standard for understanding human connections. We enable a new class of relationship-aware applications and services that integrate with our platform.",
    },
  ];

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Investor</div>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">
          The relationship intelligence platform.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-400">
          LUVPARTNR transforms relationship ambiguity into structured, recurring insight. We provide a scientific framework for evaluating, monitoring, and predicting relationship outcomes.
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
