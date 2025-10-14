'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import LeadRow from './LeadRow'

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

interface LeadsTableProps {
  leads: Lead[]
}

const statusOptions = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'new', label: '🆕 Nouveau' },
  { value: 'contacted', label: '📞 Contacté' },
  { value: 'meeting', label: '📅 RDV programmé' },
  { value: 'converted', label: '✅ Converti' },
  { value: 'lost', label: '❌ Perdu' },
]

const teamOptions = [
  { value: 'all', label: 'Toutes les équipes' },
  { value: 'unassigned', label: 'Non assigné' },
  { value: 'cm', label: 'CM' },
  { value: 'fr', label: 'FR' },
]

export default function LeadsTable({ leads }: LeadsTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [teamFilter, setTeamFilter] = useState('all')

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      search === '' ||
      lead.firstName.toLowerCase().includes(search.toLowerCase()) ||
      lead.lastName.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
    const matchesTeam = teamFilter === 'all' || lead.assignedTo === teamFilter

    return matchesSearch && matchesStatus && matchesTeam
  })

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status and Team filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {teamOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Équipe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Aucun lead trouvé
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => <LeadRow key={lead._id} lead={lead} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600">
          {filteredLeads.length} lead{filteredLeads.length !== 1 ? 's' : ''} sur {leads.length} total
        </p>
      </div>
    </div>
  )
}
