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

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Executive Summary</h2>
              <p className="text-gray-300 whitespace-pre-wrap">
                {reportData.executive_summary || 'No executive summary provided.'}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Scores</h2>
              <div className="space-y-2">
                {['trustworthiness', 'emotionalMaturity', 'consistency', 'compatibility', 'communicationQuality', 'relationshipRisk'].map((key) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="text-sm text-gray-300">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}:</span>
                    <span className="text-sm text-gray-300">
                      {typeof reportData.scores?.[key] === 'number' ? reportData.scores?.[key].toFixed(1) : 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Red Flags</h2>
              <ul className="space-y-2">
                {reportData.red_flags?.map((flag, index) => (
                  <li key={index} className="text-gray-300">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Green Flags</h2>
              <ul className="space-y-2">
                {reportData.green_flags?.map((flag, index) => (
                  <li key={index} className="text-gray-300">
                    {flag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Missing Information</h2>
              <ul className="space-y-2">
                {reportData.missing_info?.map((info, index) => (
                  <li key={index} className="text-gray-300">
                    {info}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-3">Next Steps</h2>
              <ul className="space-y-2">
                {reportData.next_steps?.map((step, index) => (
                  <li key={index} className="text-gray-300">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

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
