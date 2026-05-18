"use client";
export function HeroProductPanel() {
  return (
    <div className="relative w-full" aria-label="Product preview">
      <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-rose-500/20 to-transparent blur-2xl" aria-hidden />
      <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 ring-1 ring-rose-500/20 backdrop-blur sm:p-6">
        <p className="text-xs font-semibold uppercase text-rose-300">Conversation map</p>
        <span className="ml-2 rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-300">Relationship coaching</span>
        <div className="mt-4 grid grid-cols-3 gap-2"><div key="Patterns" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Patterns</p><p className="mt-0.5 text-sm font-semibold text-white">3</p></div><div key="Repair" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Repair</p><p className="mt-0.5 text-sm font-semibold text-white">2</p></div><div key="Next" className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"><p className="text-[10px] uppercase text-slate-500">Next</p><p className="mt-0.5 text-sm font-semibold text-white">Tonight</p></div></div>
        <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3 space-y-2"><div key="Reflect" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">1</span>Reflect</div><div key="Reframe" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">2</span>Reframe</div><div key="Practice" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">3</span>Practice</div><div key="Follow-up" className="flex items-center gap-2 text-xs text-slate-300"><span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-[10px]">4</span>Follow-up</div></div>
        <p className="mt-4 text-[10px] text-slate-500">Sample metrics — local review only.</p>
      </div>
    </div>
  );
}