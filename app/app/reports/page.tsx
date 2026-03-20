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
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Reports</h1>
        <p className="text-gray-400 mb-8 text-center">View and manage your generated reports.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports?.map((report) => (
            <div key={report.id} className="bg-gray-900/50 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{report.title}</h2>
                <p className="text-sm text-gray-400 mb-2">{new Date(report.created_at).toLocaleDateString()}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-white/10 rounded-full px-3 py-1 text-sm font-medium text-gray-400">{typeof report.overall_score === 'number' ? report.overall_score.toFixed(1) : 'N/A'}</div>
                    <div className="ml-4 text-sm text-gray-400">Overall Score</div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">Case File</div>
                </div>
                <div className="flex items-center">
                  <Link href={`/app/cases/${report.case_file_id}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{(report.case_file_id || '—')}</Link>
                </div>
              </div>
              <div className="p-6">
                <Link href={`./${report.id}`} className="text-indigo-400 hover:text-indigo-300 transition-colors text-lg font-medium">View Details</Link>
              </div>
            </div>
          ))}
          {reports?.length === 0 && (
            <div className="p-8 text-center text-gray-400">No reports found. Create a report from a case file.</div>
          )}
        </div>
      </div>
    </div>
  );
}
