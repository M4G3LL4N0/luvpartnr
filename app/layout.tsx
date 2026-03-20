import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LUVPARTNR",
  description:
    "Private AI relationship intelligence for compatibility, trust, risk, and long-term decision-making.",
};

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="text-sm text-zinc-400 transition hover:text-white">
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="text-sm font-semibold tracking-[0.25em]">
              LUVPARTNR
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              <NavLink href="/product">Product</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/investor">Investor</NavLink>
              <NavLink href="/sample-report">Sample Report</NavLink>
              <NavLink href="/privacy">Privacy</NavLink>
              <NavLink href="/app">App</NavLink>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-zinc-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="font-semibold tracking-[0.25em] text-white">LUVPARTNR</div>
              <p className="mt-2 max-w-xl">
                Private AI relationship intelligence for clearer decisions, better judgment,
                and more structured emotional insight.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/product">Product</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/investor">Investor</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/app">App</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
