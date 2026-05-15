"use client";

import Link from "next/link";
import { useState } from "react";

function IconMenu(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={props.className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

const links = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/investor", label: "Investor" },
  { href: "/sample-report", label: "Sample Report" },
  { href: "/privacy", label: "Privacy" },
  { href: "/app", label: "App" },
];

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-sm text-zinc-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md"
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/55 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xs font-semibold tracking-[0.28em] text-white sm:text-sm"
          onClick={() => setOpen(false)}
        >
          <span className="bg-gradient-to-r from-fuchsia-100 via-white to-violet-100 bg-clip-text text-transparent">
            LUVPARTNR
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-fuchsia-300/30 hover:bg-white/[0.1] md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950/90 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-xl px-3 py-2.5 text-sm text-zinc-200 transition hover:bg-white/[0.06] hover:text-white"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <p className="px-3 pt-2 text-[11px] leading-relaxed text-zinc-500">
              Private decision support — not therapy or legal advice. Analyze only information you have rights to use.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
