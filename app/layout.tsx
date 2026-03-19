import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "LUVPARTNR",
  description:
    "Private AI relationship intelligence for compatibility, trust, risk, and long-term decision-making.",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-white/70 transition hover:text-white"
    >
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
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">LP</span>
              </div>
              <span className="text-lg font-bold tracking-[0.1em]">LUVPARTNR</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
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
          <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-16 text-sm text-white/70 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LP</span>
                </div>
                <div className="text-lg font-bold tracking-[0.1em]">LUVPARTNR</div>
              </div>
              <p className="text-white/80">
                Private AI relationship intelligence for clearer decisions, better judgment, and more structured emotional insight.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              <div>
                <div className="font-semibold text-white mb-4">Product</div>
                <div className="space-y-3">
                  <NavLink href="/product">Features</NavLink>
                  <NavLink href="/pricing">Pricing</NavLink>
                  <NavLink href="/sample-report">Sample Report</NavLink>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-4">Company</div>
                <div className="space-y-3">
                  <NavLink href="/investor">Investor</NavLink>
                  <NavLink href="/privacy">Privacy</NavLink>
                  <NavLink href="#">Terms</NavLink>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-4">Resources</div>
                <div className="space-y-3">
                  <NavLink href="#">Documentation</NavLink>
                  <NavLink href="#">Support</NavLink>
                  <NavLink href="#">Blog</NavLink>
                </div>
              </div>
              <div>
                <div className="font-semibold text-white mb-4">Connect</div>
                <div className="space-y-3">
                  <NavLink href="#">Twitter</NavLink>
                  <NavLink href="#">LinkedIn</NavLink>
                  <NavLink href="#">Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
