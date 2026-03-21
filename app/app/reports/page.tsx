import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const supabase = await createClient();
  const { data: reports, error } = await supabase
    .from('reports')
    .select('id, title, created_at, overall_score, case_file_id')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-red-900/30 border border-red-700 rounded-md p-6 max-w-md">
          <p className="text-red-200">Error loading reports. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Premium header */}
        <div className="border-b border-white/10 bg-gradient-to-b from-indigo-900/30 to-black pb-12 pt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Relationship Reports
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-400">
                Comprehensive behavioral insights on all your cases
              </p>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          {reports?.length ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="group relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold leading-6 text-white">
                        {report.title}
                      </h3>
                      {report.overall_score !== null && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-900/40 border border-indigo-500/30">
                          <span className="text-indigo-300 font-medium">
                            {report.overall_score.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col space-y-3">
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="mr-2">📅</span>
                        <span>
                          {new Date(report.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {report.case_file_id && (
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="mr-2">📁</span>
                          <Link
                            href={`/app/cases/${report.case_file_id}`}
                            className="text-indigo-400 hover:text-indigo-300 transition-colors hover:underline"
                          >
                            View Case File
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <Link
                        href={`/app/reports/${report.id}`}
                        className="inline-flex items-center font-medium text-indigo-400 hover:text-indigo-300 transition-colors group-hover:underline"
                      >
                        View Full Report
                        <svg
                          className="ml-1 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto max-w-md">
                <svg
                  className="mx-auto h-12 w-12 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-white">
                  No reports generated
                </h3>
                <p className="mt-2 text-gray-400">
                  Create your first report by visiting a case file and clicking
                  "Generate Report".
                </p>
                <div className="mt-6">
                  <Link
                    href="/app/cases"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    View Cases
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
