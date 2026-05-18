import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "LUVPARTNR",
  description:
    "Private AI relationship intelligence for compatibility, trust, risk, and long-term decision-making.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-white antialiased">
        <SiteHeader />

        {children}

        <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-zinc-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <div className="font-semibold tracking-[0.25em] text-white">LUVPARTNR</div>
              <p className="mt-2 max-w-xl leading-relaxed text-zinc-400">
                Private AI relationship intelligence for clearer decisions, better judgment,
                and more structured emotional insight.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/product" className="transition hover:text-white">
                Product
              </Link>
              <Link href="/pricing" className="transition hover:text-white">
                Pricing
              </Link>
              <Link href="/investor" className="transition hover:text-white">
                Investor
              </Link>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/app" className="transition hover:text-white">
                App
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
