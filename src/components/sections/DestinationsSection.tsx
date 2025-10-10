'use client'

import Link from 'next/link'
import { MapPin, Users, TrendingUp } from 'lucide-react'

const destinations = [
  {
    country: 'France',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    students: '500+',
    description: 'Excellence académique et opportunités de bourses',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    country: 'Canada',
    flag: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop',
    students: '300+',
    description: 'Immigration facile et vie étudiante enrichissante',
    gradient: 'from-red-600 to-orange-600'
  },
  {
    country: 'Belgique',
    flag: '🇧🇪',
    image: 'https://images.unsplash.com/photo-1559564484-e48a671ba9db?w=800&h=600&fit=crop',
    students: '200+',
    description: 'Qualité d\'enseignement et coût de vie abordable',
    gradient: 'from-yellow-600 to-amber-600'
  },
  {
    country: 'Allemagne',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop',
    students: '150+',
    description: 'Études gratuites et économie forte',
    gradient: 'from-gray-700 to-gray-900'
  },
]

export function DestinationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-sm font-semibold text-green-600 mb-4">
            <MapPin className="w-4 h-4" />
            Nos destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Étudiez dans les{' '}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              meilleures destinations
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Plus de 15 pays à travers le monde pour réaliser votre rêve
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <Link
              key={index}
              href={`/destinations/${dest.country.toLowerCase()}`}
              className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.country}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {/* Flag & Students */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                  <div className="text-4xl">{dest.flag}</div>
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                    <Users className="w-4 h-4 text-green-600" />
                    <span>{dest.students}</span>
                  </div>
                </div>

                {/* Trending Icon */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-green-600 group-hover:to-teal-600 transition-all duration-300">
                  {dest.country}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {dest.description}
                </p>
              </div>

              {/* Hover Border Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${dest.gradient} opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500`}></div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-green-200 transition-all duration-300"
          >
            Voir toutes les destinations
            <MapPin className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
