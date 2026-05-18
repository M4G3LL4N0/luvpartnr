import { SubpageVisual } from "@/components/SubpageVisual";
const principles = [
  "Use information you have legitimate access to.",
  "Treat AI outputs as interpretations, not proof.",
  "Separate observed facts from inferences and missing information.",
  "Do not use LUVPARTNR for stalking, harassment, revenge, or surveillance.",
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white lg:px-8">
      <SubpageVisual variant="default" />
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">Privacy and ethics</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
          Private by design. Conservative by policy.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
          LUVPARTNR is decision-support software for reflection and relationship
          intelligence. It is not a spying tool, lie detector, diagnosis engine,
          or gossip product.
        </p>

        <div className="mt-10 space-y-4">
          {principles.map((principle) => (
            <div key={principle} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-white/70">
              {principle}
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="text-xl font-semibold">Interpretation boundary</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Reports can help you organize signals and decide what questions to
            ask next. They should not be used as clinical conclusions, accusations,
            or substitutes for professional legal, medical, or mental health advice.
          </p>
        </section>
      </div>
    </main>
  );
}
