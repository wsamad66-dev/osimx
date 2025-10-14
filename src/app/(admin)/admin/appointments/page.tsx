import { Calendar, ExternalLink } from 'lucide-react'

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Rendez-vous</h2>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos rendez-vous et intégrations Cal.com
        </p>
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-lg border border-gray-200 p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Intégration Cal.com à venir
          </h3>

          <p className="text-gray-600 mb-8">
            Cette page affichera tous vos rendez-vous synchronisés depuis Cal.com via webhooks.
            Les données de leads avec <code className="px-2 py-1 bg-gray-100 rounded text-sm">meetingDate</code> seront
            automatiquement liées.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h4 className="font-semibold text-blue-900 mb-3">Configuration requise :</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <span>Créer un compte Cal.com et configurer vos types d&apos;événements</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <span>
                  Ajouter un webhook pointant vers{' '}
                  <code className="bg-white px-1.5 py-0.5 rounded">/api/webhooks/cal</code>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <span>
                  Créer le schéma Sanity <code className="bg-white px-1.5 py-0.5 rounded">appointment</code> avec
                  référence au lead
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <span>
                  Créer la route API <code className="bg-white px-1.5 py-0.5 rounded">app/api/webhooks/cal/route.ts</code>
                </span>
              </li>
            </ul>
          </div>

          <a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span>Visiter Cal.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
