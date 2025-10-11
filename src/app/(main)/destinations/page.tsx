import type { Metadata } from 'next'
import { DestinationCard } from '@/components/sections/DestinationCard'
import { destinationsData } from '@/components/sections/DestinationCard'
import { MapPin, TrendingUp, DollarSign, Clock, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Destinations | L\'Étudiant Étranger - Canada, France, USA, UK et plus',
  description: 'Découvrez nos destinations d\'études : Canada, France, USA, UK, Allemagne, Belgique. Comparez les universités, coûts et opportunités.',
  keywords: 'étudier au Canada, étudier en France, étudier aux USA, étudier au UK, universités partenaires',
}

export default function DestinationsPage() {
  const destinationComparison = [
    {
      criterion: 'Coût annuel moyen',
      canada: '12,000€ - 25,000€',
      france: '5,000€ - 15,000€',
      usa: '25,000€ - 50,000€',
      uk: '15,000€ - 30,000€',
    },
    {
      criterion: 'Durée Master',
      canada: '1-2 ans',
      france: '2 ans',
      usa: '1-2 ans',
      uk: '1 an',
    },
    {
      criterion: 'Immigration post-études',
      canada: '⭐⭐⭐⭐⭐',
      france: '⭐⭐⭐',
      usa: '⭐⭐',
      uk: '⭐⭐⭐',
    },
    {
      criterion: 'Bourses disponibles',
      canada: 'Nombreuses',
      france: 'Très nombreuses',
      usa: 'Compétitives',
      uk: 'Modérées',
    },
    {
      criterion: 'Langue',
      canada: '🇫🇷 🇬🇧',
      france: '🇫🇷',
      usa: '🇬🇧',
      uk: '🇬🇧',
    },
  ]

  const popularPrograms = [
    {
      name: 'Informatique & Tech',
      countries: ['🇨🇦 Canada', '🇺🇸 USA', '🇬🇧 UK'],
      avgSalary: '60,000€ - 90,000€',
      demand: 'Très élevée',
    },
    {
      name: 'Commerce & Finance',
      countries: ['🇫🇷 France', '🇬🇧 UK', '🇨🇦 Canada'],
      avgSalary: '45,000€ - 75,000€',
      demand: 'Élevée',
    },
    {
      name: 'Ingénierie',
      countries: ['🇨🇦 Canada', '🇩🇪 Allemagne', '🇺🇸 USA'],
      avgSalary: '50,000€ - 80,000€',
      demand: 'Très élevée',
    },
    {
      name: 'Médecine & Santé',
      countries: ['🇫🇷 France', '🇧🇪 Belgique', '🇨🇦 Canada'],
      avgSalary: '55,000€ - 95,000€',
      demand: 'Très élevée',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Découvrez votre <span className="text-orange-400">destination idéale</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              15 pays partenaires • 500+ universités • 10,000+ étudiants accompagnés
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <MapPin className="w-5 h-5 inline mr-2" />
                15 pays
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <TrendingUp className="w-5 h-5 inline mr-2" />
                85% de réussite
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Users className="w-5 h-5 inline mr-2" />
                500+ universités
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Nos <span className="text-primary-600">destinations populaires</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cliquez sur une destination pour en savoir plus sur les universités, coûts et opportunités
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.isArray(destinationsData) && destinationsData.map((destination, index) => (
              <div key={index}>
                <DestinationCard {...destination} />
              </div>
            ))}
          </div>

          {/* Additional Destinations */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-navy-900 mb-6 text-center">
              Autres destinations disponibles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { flag: '🇩🇪', name: 'Allemagne', count: 75 },
                { flag: '🇧🇪', name: 'Belgique', count: 45 },
                { flag: '🇪🇸', name: 'Espagne', count: 60 },
                { flag: '🇮🇹', name: 'Italie', count: 50 },
                { flag: '🇨🇳', name: 'Chine', count: 80 },
                { flag: '🇯🇵', name: 'Japon', count: 40 },
                { flag: '🇦🇺', name: 'Australie', count: 55 },
                { flag: '🇸🇬', name: 'Singapour', count: 30 },
                { flag: '🇦🇪', name: 'Émirats', count: 25 },
                { flag: '🇿🇦', name: 'Afr. du Sud', count: 35 },
                { flag: '🇧🇷', name: 'Brésil', count: 40 },
                { flag: '🇲🇽', name: 'Mexique', count: 30 },
              ].map((dest, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 hover:bg-primary-50 rounded-xl p-4 text-center transition-all cursor-pointer border border-gray-200 hover:border-primary-300"
                >
                  <div className="text-4xl mb-2">{dest.flag}</div>
                  <p className="font-semibold text-gray-800 text-sm">{dest.name}</p>
                  <p className="text-xs text-gray-500">{dest.count} universités</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Comparez les <span className="text-primary-600">destinations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tableau comparatif des principales destinations
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-primary-600 to-navy-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Critère</th>
                  <th className="px-6 py-4 text-center">🇨🇦 Canada</th>
                  <th className="px-6 py-4 text-center">🇫🇷 France</th>
                  <th className="px-6 py-4 text-center">🇺🇸 USA</th>
                  <th className="px-6 py-4 text-center">🇬🇧 UK</th>
                </tr>
              </thead>
              <tbody>
                {destinationComparison.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-800">{row.criterion}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.canada}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.france}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.usa}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Programmes <span className="text-orange-600">populaires</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les domaines d&apos;études les plus demandés par destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {popularPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-navy-900 mb-4">{program.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destinations recommandées</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {program.countries.map((country, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Salaire moyen
                    </span>
                    <span className="font-bold text-green-600">{program.avgSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Demande
                    </span>
                    <span className="font-bold text-orange-600">{program.demand}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trouvez votre destination en 2 minutes
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Répondez à quelques questions et découvrez la destination parfaite pour votre profil
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all">
            🎯 Faire le quiz maintenant
          </button>
        </div>
      </section>
    </div>
  )
}
