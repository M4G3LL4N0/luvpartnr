import { useEffect, useState } from 'react';

export default function ProfileInsightsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileInsights() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/profile-insights');
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProfileInsights();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="mt-4 text-zinc-400">Loading your behavioral insights...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex h-12 w-12 items-center justify-center bg-red-500/20 rounded-lg">
            <span className="text-red-400">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold">Unable to load insights</h2>
          <p className="text-zinc-400 max-w-xl">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium px-6 py-3 rounded-xl transition-shadow hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-center">
          Your Behavioral Profile
        </h1>
        <p className="mb-12 text-center text-zinc-400 max-w-2xl mx-auto">
          A reflective overview of your interaction patterns, strengths, and areas for growth.
        </p>

        <div className="grid gap-8">
          {/* Strengths */}
          <section className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Behavioral Strengths
            </h2>
            <ul className="space-y-3 text-zinc-300">
              {data.strengths?.map((strength: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex h-3 w-3 items-center justify-center bg-purple-600/20 text-purple-400 rounded-full shrink-0">
                    ◆
                  </span>
                  <span className="ml-3">{strength}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Weaknesses */}
          <section className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Areas for Growth
            </h2>
            <ul className="space-y-3 text-zinc-300">
              {data.weaknesses?.map((weakness: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex h-3 w-3 items-center justify-center bg-pink-600/20 text-pink-400 rounded-full shrink-0">
                    ◇
                  </span>
                  <span className="ml-3">{weakness}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recurring Patterns */}
          <section className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Recurring Patterns
            </h2>
            <ul className="space-y-3 text-zinc-300">
              {data.patterns?.map((pattern: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex h-3 w-3 items-center justify-center bg-indigo-600/20 text-indigo-400 rounded-full shrink-0">
                    ∞
                  </span>
                  <span className="ml-3">{pattern}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Potential Risks */}
          <section className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Considerations & Risks
            </h2>
            <ul className="space-y-3 text-zinc-300">
              {data.risks?.map((risk: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="flex h-3 w-3 items-center justify-center bg-red-600/20 text-red-400 rounded-full shrink-0">
                    !
                  </span>
                  <span className="ml-3">{risk}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center text-zinc-500">
          <p className="text-sm">
            Insights are generated from your interaction history and are meant for reflective purposes only.
          </p>
        </div>
      </div>
    </main>
  );
}
