import { Suspense } from 'react'
import { getDocuments } from '@/lib/sanity/queries/admin'
import DocumentsList from '@/components/admin/DocumentsList'

export const revalidate = 30

function DocumentsSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  )
}

async function DocumentsContent() {
  const documents = await getDocuments()

  return <DocumentsList documents={documents} />
}

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
        <p className="mt-1 text-sm text-gray-500">
          Vérifiez et gérez les documents des étudiants
        </p>
      </div>

      {/* Content */}
      <Suspense fallback={<DocumentsSkeleton />}>
        <DocumentsContent />
      </Suspense>
    </div>
  )
}
