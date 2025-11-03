'use client'

import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { updateLeadStatus, assignLead } from '@/app/actions/leads'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

interface Lead {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  destination?: string
  program?: string
  status: string
  assignedTo: string
  createdAt: string
}

const statusLabels: Record<string, string> = {
  new: '🆕 Nouveau',
  contacted: '📞 Contacté',
  meeting: '📅 RDV',
  converted: '✅ Converti',
  lost: '❌ Perdu',
}

const teamLabels: Record<string, string> = {
  unassigned: 'Non assigné',
  cm: 'CM',
  fr: 'FR',
}

export default function LeadRow({ lead }: { lead: Lead }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    setIsMenuOpen(false)
    
    const result = await updateLeadStatus(lead._id, newStatus)
    
    if (!result.success) {
      alert(result.error || 'Erreur lors de la mise à jour')
    }
    
    setIsLoading(false)
  }

  const handleTeamChange = async (newTeam: string) => {
    setIsLoading(true)
    setIsMenuOpen(false)
    
    const result = await assignLead(lead._id, newTeam)
    
    if (!result.success) {
      alert(result.error || 'Erreur lors de l\'assignation')
    }
    
    setIsLoading(false)
  }

  const relativeDate = formatDistanceToNow(new Date(lead.createdAt), {
    addSuffix: true,
    locale: fr,
  })

  return (
    <tr className={isLoading ? 'opacity-50' : ''}>
      {/* Name */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium text-gray-900">
          {lead.firstName} {lead.lastName}
        </div>
      </td>

      {/* Contact */}
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{lead.email}</div>
        {lead.phone && <div className="text-xs text-gray-500">{lead.phone}</div>}
      </td>

      {/* Destination */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {lead.destination || '-'}
        {lead.program && <div className="text-xs text-gray-500">{lead.program}</div>}
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800">
          {statusLabels[lead.status] || lead.status}
        </span>
      </td>

      {/* Team */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700">
          {teamLabels[lead.assignedTo] || lead.assignedTo}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {relativeDate}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            disabled={isLoading}
            className="p-1 rounded hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                {/* Status submenu */}
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Changer le statut
                </div>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleStatusChange(value)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {label}
                  </button>
                ))}

                <div className="border-t border-gray-200 my-1" />

                {/* Team submenu */}
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Assigner à
                </div>
                {Object.entries(teamLabels).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleTeamChange(value)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
