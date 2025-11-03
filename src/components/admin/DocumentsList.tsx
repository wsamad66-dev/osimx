'use client'

import { useState } from 'react'
import { FileText, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react'
import { verifyDocument, rejectDocument } from '@/app/actions/documents'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Document {
  _id: string
  fileName: string
  documentType: string
  fileUrl: string
  status: string
  isVerified: boolean
  uploadedAt: string
  verifiedBy?: string
  verifiedAt?: string
  rejectionReason?: string
  leadId?: {
    firstName: string
    lastName: string
  }
}

interface DocumentsListProps {
  documents: Document[]
}

const docTypeLabels: Record<string, string> = {
  passport: '📄 Passeport',
  diploma: '🎓 Diplôme',
  transcript: '📊 Relevé de notes',
  motivation_letter: '📝 Lettre de motivation',
  cv: '📋 CV',
  financial: '💰 Justificatif financier',
  photo: '📸 Photo',
  certificate: '🏛️ Attestation',
  other: '📄 Autre',
}

const statusIcons = {
  pending: <Clock className="w-5 h-5 text-yellow-500" />,
  approved: <CheckCircle className="w-5 h-5 text-green-500" />,
  rejected: <XCircle className="w-5 h-5 text-red-500" />,
  needs_correction: <AlertCircle className="w-5 h-5 text-orange-500" />,
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
  needs_correction: 'Correction requise',
}

export default function DocumentsList({ documents }: DocumentsListProps) {
  const [loadingDoc, setLoadingDoc] = useState<string | null>(null)

  const handleVerify = async (docId: string) => {
    setLoadingDoc(docId)
    const result = await verifyDocument(docId, 'Current User') // Replace with actual user
    if (!result.success) {
      alert(result.error || 'Erreur lors de la vérification')
    }
    setLoadingDoc(null)
  }

  const handleReject = async (docId: string) => {
    const reason = prompt('Raison du rejet :')
    if (!reason) return

    setLoadingDoc(docId)
    const result = await rejectDocument(docId, reason, 'Current User') // Replace with actual user
    if (!result.success) {
      alert(result.error || 'Erreur lors du rejet')
    }
    setLoadingDoc(null)
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Aucun document à vérifier</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="divide-y divide-gray-200">
        {documents.map((doc) => {
          const isLoading = loadingDoc === doc._id
          const relativeDate = formatDistanceToNow(new Date(doc.uploadedAt), {
            addSuffix: true,
            locale: fr,
          })

          return (
            <div
              key={doc._id}
              className={`p-6 hover:bg-gray-50 transition-colors ${isLoading ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between">
                {/* Left side */}
                <div className="flex items-start space-x-4 flex-1">
                  {/* Status icon */}
                  <div className="pt-1">
                    {statusIcons[doc.status as keyof typeof statusIcons] || statusIcons.pending}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{doc.fileName}</h3>
                      {doc.isVerified && (
                        <span className="flex items-center text-xs text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Vérifié
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                      <span>{docTypeLabels[doc.documentType] || doc.documentType}</span>
                      {doc.leadId && (
                        <span>
                          {doc.leadId.firstName} {doc.leadId.lastName}
                        </span>
                      )}
                      <span>{relativeDate}</span>
                    </div>

                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          doc.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : doc.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : doc.status === 'needs_correction'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {statusLabels[doc.status]}
                      </span>
                    </div>

                    {doc.rejectionReason && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        {doc.rejectionReason}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Voir
                  </a>

                  {doc.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleVerify(doc._id)}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReject(doc._id)}
                        disabled={isLoading}
                        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                      >
                        Rejeter
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
