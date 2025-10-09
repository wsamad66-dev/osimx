import { useState } from 'react'

export interface CountryData {
  id: string
  name: string
  flag: string
  tagline: string
  description: string
  image: string
  students: string
  universities: string
  successRate: string
  highlights: string[]
  ctaText: string
  ctaLink: string
  color: string
}

/**
 * Custom hook for managing dynamic country selection
 * Handles state and provides methods for country switching
 */
export function useDynamicCountry(countries: CountryData[], initialCountryId?: string) {
  const [selectedCountryId, setSelectedCountryId] = useState<string>(
    initialCountryId || countries[0]?.id || ''
  )

  const selectedCountry = countries.find(c => c.id === selectedCountryId) || countries[0]

  const selectCountry = (countryId: string) => {
    if (countries.some(c => c.id === countryId)) {
      setSelectedCountryId(countryId)
    }
  }

  const selectNextCountry = () => {
    const currentIndex = countries.findIndex(c => c.id === selectedCountryId)
    const nextIndex = (currentIndex + 1) % countries.length
    setSelectedCountryId(countries[nextIndex].id)
  }

  const selectPreviousCountry = () => {
    const currentIndex = countries.findIndex(c => c.id === selectedCountryId)
    const prevIndex = currentIndex === 0 ? countries.length - 1 : currentIndex - 1
    setSelectedCountryId(countries[prevIndex].id)
  }

  return {
    selectedCountry,
    selectedCountryId,
    selectCountry,
    selectNextCountry,
    selectPreviousCountry,
    countries
  }
}

/**
 * Default country data
 */
export const defaultCountries: CountryData[] = [
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    tagline: 'Excellence académique européenne',
    description: 'Découvrez le système éducatif français réputé mondialement. Frais universitaires abordables, bourses disponibles, et une culture riche à explorer.',
    image: '/images/destinations/france.png',
    students: '2800+',
    universities: '45+',
    successRate: '95%',
    highlights: [
      'Frais universitaires publics bas (€170-€650/an)',
      'Système de bourses diversifié',
      'Permis de travail 20h/semaine',
      'Patrimoine culturel exceptionnel'
    ],
    ctaText: 'Explorer la France',
    ctaLink: '/destinations/france',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    tagline: 'Qualité de vie exceptionnelle',
    description: 'Le Canada offre une éducation de classe mondiale et des opportunités d\'immigration facilitées. Idéal pour construire votre avenir.',
    image: '/images/destinations/canada.png',
    students: '3500+',
    universities: '50+',
    successRate: '97%',
    highlights: [
      'Permis de travail post-études (3 ans)',
      'Immigration facilitée après études',
      'Société multiculturelle accueillante',
      'Salaires élevés pour étudiants'
    ],
    ctaText: 'Explorer le Canada',
    ctaLink: '/destinations/canada',
    color: 'from-red-600 to-red-800'
  },
  {
    id: 'belgique',
    name: 'Belgique',
    flag: '🇧🇪',
    tagline: 'Carrefour européen',
    description: 'Position centrale en Europe, coût de vie abordable, et système éducatif bilingue de qualité. Parfait pour l\'Europe.',
    image: '/images/destinations/belgique.png',
    students: '1500+',
    universities: '35+',
    successRate: '93%',
    highlights: [
      'Frais universitaires compétitifs',
      'Proximité avec toute l\'Europe',
      'Enseignement bilingue (FR/NL)',
      'Vie étudiante dynamique'
    ],
    ctaText: 'Explorer la Belgique',
    ctaLink: '/destinations/belgique',
    color: 'from-yellow-600 to-amber-700'
  },
  {
    id: 'italie',
    name: 'Italie',
    flag: '🇮🇹',
    tagline: 'Art, culture et innovation',
    description: 'L\'Italie combine excellence académique, patrimoine culturel incomparable, et coût de vie accessible.',
    image: '/images/destinations/italie.png',
    students: '450+',
    universities: '25+',
    successRate: '88%',
    highlights: [
      'Coût de vie très abordable',
      'Excellence en design et mode',
      'Patrimoine historique unique',
      'Bourses du gouvernement italien'
    ],
    ctaText: 'Explorer l\'Italie',
    ctaLink: '/destinations/italie',
    color: 'from-green-700 to-green-900'
  },
  {
    id: 'chine',
    name: 'Chine',
    flag: '🇨🇳',
    tagline: 'Innovation et opportunités',
    description: 'La Chine offre des bourses généreuses, une technologie de pointe, et des opportunités de carrière exceptionnelles.',
    image: '/images/destinations/chine.png',
    students: '800+',
    universities: '40+',
    successRate: '90%',
    highlights: [
      'Bourses complètes disponibles',
      'Technologie de pointe',
      'Marché du travail dynamique',
      'Expérience culturelle unique'
    ],
    ctaText: 'Explorer la Chine',
    ctaLink: '/destinations/chine',
    color: 'from-red-700 to-red-900'
  }
]
