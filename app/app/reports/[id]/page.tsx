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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="../"
        className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
      >
        &larr; Back to Reports
      </Link>
      <h1 className="text-3xl font-bold mb-6">{report.title}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Report Details
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Created: {new Date(report.created_at).toLocaleString()}
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">ID</dt>
              <dd className="mt-1 text-sm text-gray-900">{report.id}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Updated At</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(report.updated_at).toLocaleString()}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {report.description || 'No description provided.'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
