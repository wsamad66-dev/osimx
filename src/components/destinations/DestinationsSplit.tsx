'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import InfoPanel from './InfoPanel'
import ImagePanel from './ImagePanel'

// Country data structure
interface Country {
  name: string
  flag: string
  title: string
  description: string
  imageUrl: string
  ctaText: string
  ctaLink: string
  slug: string
}

// Static data (can be replaced with Strapi API)
const COUNTRIES: Country[] = [
  {
    name: 'France',
    flag: '🇫🇷',
    title: 'Étudiez en France',
    description: 'Découvrez nos universités partenaires et vivez la culture française. Excellence académique, patrimoine riche et opportunités de bourses exceptionnelles.',
    imageUrl: '/images/destinations/france.png',
    ctaText: 'Explorer la France',
    ctaLink: '/destinations/france',
    slug: 'france'
  },
  {
    name: 'Italie',
    flag: '🇮🇹',
    title: 'Étudiez en Italie',
    description: "Plongez dans l'art, la culture et l'excellence académique italienne. Des universités prestigieuses dans un cadre historique unique.",
    imageUrl: '/images/destinations/italie.png',
    ctaText: "Explorer l'Italie",
    ctaLink: '/destinations/italie',
    slug: 'italie'
  },
  {
    name: 'Belgique',
    flag: '🇧🇪',
    title: 'Étudiez en Belgique',
    description: 'Un environnement bilingue et accueillant au cœur de l\'Europe. Qualité d\'enseignement reconnue et coût de vie abordable.',
    imageUrl: '/images/destinations/belgique.png',
    ctaText: 'Explorer la Belgique',
    ctaLink: '/destinations/belgique',
    slug: 'belgique'
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    title: 'Étudiez au Canada',
    description: "Terre d'opportunités et d'innovation. Immigration facilitée, universités de renommée mondiale et qualité de vie exceptionnelle.",
    imageUrl: '/images/destinations/canada.png',
    ctaText: 'Explorer le Canada',
    ctaLink: '/destinations/canada',
    slug: 'canada'
  },
  {
    name: 'Chine',
    flag: '🇨🇳',
    title: 'Étudiez en Chine',
    description: 'Technologie, traditions et excellence académique. Découvrez l\'économie la plus dynamique du monde avec des bourses attractives.',
    imageUrl: '/images/destinations/chine.png',
    ctaText: 'Explorer la Chine',
    ctaLink: '/destinations/chine',
    slug: 'chine'
  }
]

export default function DestinationsSplit() {
  const [selectedCountry, setSelectedCountry] = useState<string>('france')

  const activeCountry = COUNTRIES.find(c => c.slug === selectedCountry) || COUNTRIES[0]

  return (
    <section className="relative bg-[#F9FAFB] py-16 md:py-24 px-6 md:px-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#1E3A8A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#EAB308]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-[#1E3A8A]/10 rounded-full text-[#1E3A8A] font-semibold text-sm md:text-base mb-6"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Nos Destinations
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Choisissez Votre{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6]">
              Destination
            </span>
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Explorez nos pays partenaires et découvrez les opportunités qui vous attendent
          </p>
        </motion.div>

        {/* Split Screen Layout */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center mb-12"
        >
          {/* Left Panel - Info */}
          <InfoPanel
            flag={activeCountry.flag}
            title={activeCountry.title}
            description={activeCountry.description}
            ctaText={activeCountry.ctaText}
            ctaLink={activeCountry.ctaLink}
            countryName={activeCountry.slug}
          />

          {/* Right Panel - Image */}
          <ImagePanel
            imageUrl={activeCountry.imageUrl}
            alt={`Vue de ${activeCountry.name}`}
            countryName={activeCountry.slug}
          />
        </motion.div>

        {/* Country Selector Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8"
        >
          {COUNTRIES.map((country) => (
            <motion.button
              key={country.slug}
              onClick={() => setSelectedCountry(country.slug)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                group flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-base md:text-lg
                transition-all duration-300 relative
                ${selectedCountry === country.slug
                  ? 'bg-[#1E3A8A] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-[#1E3A8A] hover:text-white shadow-md'
                }
              `}
            >
              <span className="text-2xl">{country.flag}</span>
              <span>{country.name}</span>
              
              {/* Active underline indicator */}
              {selectedCountry === country.slug && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#EAB308] rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16"
        >
          {[
            { number: '500+', label: 'Universités' },
            { number: '50+', label: 'Programmes' },
            { number: '95%', label: 'Taux de Réussite' },
            { number: '24/7', label: 'Support' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white rounded-xl shadow-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
