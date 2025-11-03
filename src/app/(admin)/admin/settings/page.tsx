import { Suspense } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { getDestinations, getTeamMembers } from '@/lib/sanity/queries/admin'
import RoleGuard from '@/components/admin/RoleGuard'

export const revalidate = 60

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

async function SettingsContent() {
  const [destinations, team] = await Promise.all([
    getDestinations(),
    getTeamMembers(),
  ])

  return (
    <div className="space-y-6">
      {/* Destinations */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Destinations</h3>
            <p className="text-sm text-gray-500 mt-1">
              {destinations.length} destination{destinations.length !== 1 ? 's' : ''} configurée
              {destinations.length !== 1 ? 's' : ''}
            </p>
          </div>
          <RoleGuard allowedRoles={['admin']}>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              Ajouter
            </button>
          </RoleGuard>
        </div>

        <div className="space-y-3">
          {destinations.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Aucune destination configurée. Ajoutez-en via Sanity Studio.
            </p>
          ) : (
            destinations.map((dest: any) => (
              <div
                key={dest._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{dest.flag || '🌍'}</span>
                  <div>
                    <p className="font-medium text-gray-900">{dest.name}</p>
                    <p className="text-sm text-gray-500">
                      {dest.code} • Équipe: {dest.teamAssigned}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      dest.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {dest.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Membres de l&apos;équipe</h3>
            <p className="text-sm text-gray-500 mt-1">
              {team.length} membre{team.length !== 1 ? 's' : ''} actif{team.length !== 1 ? 's' : ''}
            </p>
          </div>
          <RoleGuard allowedRoles={['admin']}>
            <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
              Ajouter
            </button>
          </RoleGuard>
        </div>

        <div className="space-y-3">
          {team.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Aucun membre d&apos;équipe configuré. Ajoutez-en via Sanity Studio.
            </p>
          ) : (
            team.map((member: any) => (
              <div
                key={member._id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">
                    {member.currentLeadCount || 0} leads actifs
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : member.role === 'cm'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {member.role.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Configuration</h4>
        <p className="text-sm text-blue-800">
          Pour modifier ces paramètres, utilisez Sanity Studio à{' '}
          <a href="/studio" className="underline font-medium" target="_blank" rel="noopener noreferrer">
            /studio
          </a>
          . Les destinations et membres d&apos;équipe sont synchronisés automatiquement.
        </p>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gray-100 rounded-lg">
          <SettingsIcon className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
          <p className="text-sm text-gray-500">
            Gérez les destinations et l&apos;équipe
          </p>
        </div>
      </div>

      {/* Content */}
      <Suspense fallback={<SettingsSkeleton />}>
        <SettingsContent />
      </Suspense>
    </div>
  )
}
