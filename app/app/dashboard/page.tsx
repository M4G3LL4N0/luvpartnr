import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white">
      <SubpageVisual variant="dashboard" />
      {/* Existing premium section */}
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 p-6">
          {/* ... existing premium content ... */}
        </aside>

        {/* Main content */}
        <section className="p-8">
          {/* ... existing content ... */}

          {/* Enhanced Upgrade CTA Section */}
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-white mb-4">Upgrade to Premium</h2>
              <div className="flex items-center justify-center">
                <Link
                  href="/api/checkout"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-xl text-white transition-colors hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  Upgrade Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
