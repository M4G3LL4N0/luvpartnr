import { SubpageVisual } from "@/components/SubpageVisual";
const sections = [
  {
    title: "Category",
    text: "Relationship Intelligence OS: a private system of record for emotionally high-stakes decisions where memory, messages, and judgment are usually scattered.",
  },
  {
    title: "Wedge",
    text: "Start with daters and commitment-stage users who already feel the cost of ambiguity. Expand into friendships, family, work, coaching, and mediated reflection.",
  },
  {
    title: "Moat",
    text: "Longitudinal case memory, structured relationship ontology, report history, private user-owned context, and a brand that refuses gossip mechanics.",
  },
  {
    title: "Business model",
    text: "Consumer subscriptions first, then professional plans, exports, guided workflows, Stripe billing, and eventually relationship-intelligence APIs.",
  },
];

export default function InvestorPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white lg:px-8">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">Investor narrative</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          A new private software layer for relationship decisions.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
          People already analyze relationships. They do it in notes apps, group
          chats, memory, and panic. LUVPARTNR turns that behavior into a serious,
          private, structured intelligence system.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <h2 className="text-2xl font-semibold">{section.title}</h2>
              <p className="mt-4 leading-7 text-white/60">{section.text}</p>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-7">
          <h2 className="text-2xl font-semibold">Why now</h2>
          <p className="mt-4 max-w-4xl leading-7 text-white/60">
            AI can now synthesize messy context, but users need a product that
            constrains interpretation, preserves privacy, and keeps uncertainty
            visible. That is the product discipline behind LUVPARTNR.
          </p>
        </section>
      </div>
    </main>
  );
}
