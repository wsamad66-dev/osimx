'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import AirplaneWindow from './AirplaneWindow'

// Country data structure matching your Strapi model
export interface Country {
  name: string
  ctaTitle: string
  ctaSubtitle: string
  imageUrl: string
  buttonText: string
  slug: string
}

// Static data (replace with Strapi API call later)
const COUNTRIES: Country[] = [
  {
    name: 'France',
    ctaTitle: 'Étudiez en France 🇫🇷',
    ctaSubtitle: 'Découvrez nos universités partenaires',
    imageUrl: '/images/destinations/france.png',
    buttonText: 'Explorer la France',
    slug: 'france'
  },
  {
    name: 'Italie',
    ctaTitle: 'Étudiez en Italie 🇮🇹',
    ctaSubtitle: 'Culture, art et excellence académique',
    imageUrl: '/images/destinations/italie.png',
    buttonText: "Explorer l'Italie",
    slug: 'italie'
  },
  {
    name: 'Belgique',
    ctaTitle: 'Étudiez en Belgique 🇧🇪',
    ctaSubtitle: 'Un environnement bilingue et accueillant',
    imageUrl: '/images/destinations/belgique.png',
    buttonText: 'Explorer la Belgique',
    slug: 'belgique'
  },
  {
    name: 'Canada',
    ctaTitle: 'Étudiez au Canada 🇨🇦',
    ctaSubtitle: "Terre d'opportunités et d'innovation",
    imageUrl: '/images/destinations/canada.png',
    buttonText: 'Explorer le Canada',
    slug: 'canada'
  },
  {
    name: 'Chine',
    ctaTitle: 'Étudiez en Chine 🇨🇳',
    ctaSubtitle: 'Technologie, traditions et excellence',
    imageUrl: '/images/destinations/chine.png',
    buttonText: 'Explorer la Chine',
    slug: 'chine'
  }
]

export default function DestinationsSection() {
  const [selectedCountry, setSelectedCountry] = useState<string>('france')

  return (
    <section 
      aria-label="Destinations d'études"
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          {/* Airplane icon */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 rounded-full">
              <svg 
                className="w-8 h-8 text-blue-600" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
              <span className="text-blue-600 font-semibold text-sm md:text-base">
                Destinations Populaires
              </span>
            </div>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choisissez Votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Destination
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explorez nos pays partenaires et découvrez les opportunités d'études 
            qui vous attendent à travers le monde.
          </p>
        </motion.div>

        {/* Airplane Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mb-12">
          {COUNTRIES.map((country, index) => (
            <AirplaneWindow
              key={country.slug}
              {...country}
              title={country.ctaTitle}
              subtitle={country.ctaSubtitle}
              isSelected={selectedCountry === country.slug}
              onClick={() => setSelectedCountry(country.slug)}
              index={index}
            />
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mt-16 md:mt-20"
        >
          {[
            { number: '500+', label: 'Universités Partenaires' },
            { number: '50+', label: 'Programmes Disponibles' },
            { number: '95%', label: 'Taux de Réussite' },
            { number: '24/7', label: 'Support Dédié' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6 text-lg">
            Vous ne trouvez pas votre destination idéale ?
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Contactez nos conseillers
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
