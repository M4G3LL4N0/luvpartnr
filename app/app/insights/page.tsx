import React, { useEffect, useState } from 'react';
import { createClient } from 'lib/supabase/client';
import { Link } from 'next/link';
import { Alert } from 'components/Alert';
import { Chart } from 'components/Chart'; // Assuming a premium chart component exists

export default function InsightsPage() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      const supabase = createClient();
      const { data, error: supabaseError } = await supabase
        .from('global_insights')
        .select('*')
        .single();

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        setInsights(data);
      }

      setLoading(false);
    };

    fetchInsights();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-black text-white text-center py-20">
      <h1 className="text-4xl font-bold">Loading Global Insights...</h1>
      <div className="mt-8">
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black text-white text-center py-20">
      <h1 className="text-4xl font-bold">Error Fetching Insights</h1>
      <Alert type="error" message={error} onClose={() => setError(null)} />
    </div>
  );

  if (!insights) return (
    <div className="min-h-screen bg-black text-white text-center py-20">
      <h1 className="text-4xl font-bold">No Insights Available</h1>
      <p className="mt-4 text-lg">Premium analysis requires active subscription.</p>
      <Link href="/app/pricing" className="mt-6 text-white underline">
        Upgrade to Premium
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-900 border-b border-white/10 px-6 py-8">
        <h1 className="text-5xl font-bold tracking-widest">
          Cross-Relationship Pattern Analysis
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Premium intelligence derived from cross-case pattern recognition
        </p>
      </header>

      <main className="px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {insights?.insightData?.map((insight, index) => (
            <div key={index} className="bg-zinc-800 border border-white/10 rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-white/70" fill="currentColor">
                    <path d="M10 20v-6m0 0v-6m0 0v-6m-4 8h8m-8 0h8" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  {insight.category}
                </h2>
              </div>
              <div className="text-lg mb-4">
                {insight.description}
              </div>
              <div className="text-sm text-zinc-400">
                {insight.metrics?.map((metric, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <span className="text-zinc-300 mr-2">
                      {metric.label}
                    </span>
                    <div className="flex-shrink-0">
                      <Chart data={metric.value} type="bar" color="#fff" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {showPaywall && (
          <div className="text-center mt-12">
            <h2 className="text-4xl font-bold">Premium Features Unlocked</h2>
            <p className="mt-4 text-lg">
              Full pattern analysis requires a premium subscription.
            </p>
            <Link href="/app/pricing" className="mt-6 text-white underline">
              Upgrade Now
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
