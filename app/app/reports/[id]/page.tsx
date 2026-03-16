import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const { data: report, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !report) {
    notFound();
  }

  // Parse report_json if it exists
  const reportData = report.report_json ? JSON.parse(report.report_json) : {};

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="../"
          className="text-indigo-400 hover:text-indigo-300 mb-6 inline-flex items-center text-sm font-medium transition-colors"
        >
          <span className="mr-2">←</span> Back to Reports
        </Link>

        <div className="bg-gray-900/50 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-white mb-2">{report.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
              <span>Created: {new Date(report.created_at).toLocaleString()}</span>
              {report.overall_score !== undefined && (
                <span className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-xs font-medium">
                  Score: {typeof report.overall_score === 'number' ? report.overall_score.toFixed(1) : report.overall_score}
                </span>
              )}
              {report.case_file_id && (
                <Link
                  href={`/app/cases/${report.case_file_id}`}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium hover:bg-gray-700 transition-colors"
                >
                  Case: {report.case_file_id}
                </Link>
              )}
            </div>

            {/* Executive Summary */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Executive Summary</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {reportData.executive_summary || 'No executive summary provided.'}
              </p>
            </div>

            {/* Score Overview Cards */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Score Overview</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(reportData.scores ?? {}).map(([key, value]) => (
                  <div                    key={key}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 flex flex-col items-center justify-center"
                  >
                    <div className="text-sm capitalize text-zinc-400 font-medium">
                      {key}
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-white">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Observed Facts */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Observed Facts</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.observedFacts?.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Strong Inferences */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Strong Inferences</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.strongInferences?.map((inf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{inf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weak Inferences */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Weak Inferences</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.weakInferences?.map((inf, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-sm mr-2">•</span>
                    <span className="flex-1">{inf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Red Flags</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.red_flags?.map((flag, idx) => (
                  <li key={idx} className="text-gray-300">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Green Flags */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Green Flags</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.green_flags?.map((flag, idx) => (
                  <li key={idx} className="text-gray-300">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Information */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Missing Information</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.missing_info?.map((info, idx) => (
                  <li key={idx} className="text-gray-300">
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Steps */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
              <ul className="space-y-2 text-gray-300">
                {reportData.next_steps?.map((step, idx) => (
                  <li key={idx} className="text-gray-300">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Long-Term Outlook */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Long-Term Outlook</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {reportData.long_term_outlook || 'No long-term outlook provided.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
