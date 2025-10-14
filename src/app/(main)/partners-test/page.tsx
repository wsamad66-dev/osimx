import { PartnersBanner, CompactPartnersBanner } from '@/components/home/PartnersBanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Partenaires | L\'Étudiant Étranger',
  description: 'Plus de 100 universités partenaires dans le monde entier',
}

export default function PartnersTestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Partenaires Universitaires
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Un réseau mondial de plus de 100 universités prestigieuses
          </p>
        </div>
      </div>

      {/* Partners Banner - Version Complète */}
      <PartnersBanner />

      {/* Section informative */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Un réseau international de confiance
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Nous travaillons en étroite collaboration avec les meilleures institutions 
              académiques du monde pour vous offrir les meilleures opportunités d'études.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-gray-600">Universités Partenaires</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                <div className="text-gray-600">Pays Couverts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-gray-600">Étudiants Placés</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Banner Example */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Version Compacte</h3>
          <p className="text-sm text-gray-600">Parfait pour le footer ou les sections secondaires</p>
        </div>
        <CompactPartnersBanner speed={60} />
      </div>

      {/* Destinations par pays */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Nos destinations privilégiées
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { flag: '🇫🇷', country: 'France', count: '25+' },
              { flag: '🇨🇦', country: 'Canada', count: '30+' },
              { flag: '🇧🇪', country: 'Belgique', count: '15+' },
              { flag: '🇺🇸', country: 'USA', count: '20+' },
            ].map((dest) => (
              <div 
                key={dest.country}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{dest.flag}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{dest.country}</h3>
                <p className="text-blue-600 font-semibold">{dest.count} universités</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à rejoindre nos 10,000+ étudiants ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bénéficiez de notre réseau de partenaires pour réaliser votre projet d'études à l'étranger
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
            Démarrer mon projet
          </button>
        </div>
      </div>
    </div>
  )
}
