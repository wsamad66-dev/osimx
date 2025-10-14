import { Suspense } from 'react'
import { getLeads } from '@/lib/sanity/queries/admin'
import LeadsTable from '@/components/admin/LeadsTable'

export const revalidate = 30

function TableSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-64" />
        <div className="h-64 bg-gray-100 rounded" />
      </div>
    </div>
  )
}

async function LeadsContent() {
  const leads = await getLeads()

  return <LeadsTable leads={leads} />
}

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez et suivez tous vos leads
          </p>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<TableSkeleton />}>
        <LeadsContent />
      </Suspense>
    </div>
  )
}
