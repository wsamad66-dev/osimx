'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, GraduationCap, TrendingUp, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

interface DestinationCardProps {
  country: string
  countryCode: string
  universities: number
  successRate: number
  image: string
  studentsCount: number
  averageCost?: string
  topUniversities?: string[]
  popularPrograms?: string[]
  link: string
}

export function DestinationCard({
  country,
  countryCode,
  universities,
  successRate,
  image,
  studentsCount,
  averageCost = '10,000€ - 20,000€',
  topUniversities = [],
  popularPrograms = [],
  link,
}: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={`Étudier en ${country}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Country Flag/Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
          <span className="text-2xl">{countryCode}</span>
        </div>

        {/* Success Rate Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-md font-bold text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          {successRate}% de réussite
        </div>

        {/* Country Name Overlay */}
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">{country}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-700">
            <GraduationCap className="w-5 h-5 text-primary-600" />
            <span className="font-semibold">{universities} universités</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">{studentsCount}+ étudiants</span>
          </div>
        </div>

        {/* Cost */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Coût annuel moyen</p>
          <p className="text-lg font-bold text-navy-900">{averageCost}</p>
        </div>

        {/* Top Universities (if provided) */}
        {topUniversities.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Universités partenaires:</p>
            <div className="flex flex-wrap gap-2">
              {topUniversities.slice(0, 2).map((uni, index) => (
                <span key={index} className="text-xs bg-primary-50 text-primary-700 px-3 py-1 rounded-full">
                  {uni}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Popular Programs (if provided) */}
        {popularPrograms.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Programmes populaires:</p>
            <div className="flex flex-wrap gap-2">
              {popularPrograms.slice(0, 3).map((program, index) => (
                <span key={index} className="text-xs bg-gold-50 text-gold-700 px-3 py-1 rounded-full">
                  {program}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link href={link}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all group"
          >
            Découvrir {country}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>

      {/* Hover Effect Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-500 transition-all pointer-events-none"
        initial={false}
      />
    </motion.div>
  )
}

// Preset destinations data
export const destinationsData: DestinationCardProps[] = [
  {
    country: 'Canada',
    countryCode: '🇨🇦',
    universities: 120,
    successRate: 92,
    image: '/images/destinations/canada.jpg',
    studentsCount: 3500,
    averageCost: '12,000€ - 25,000€',
    topUniversities: ['Université de Montréal', 'Université McGill'],
    popularPrograms: ['Informatique', 'Ingénierie', 'Commerce'],
    link: '/destinations/canada',
  },
  {
    country: 'France',
    countryCode: '🇫🇷',
    universities: 85,
    successRate: 89,
    image: '/images/destinations/france.jpg',
    studentsCount: 4200,
    averageCost: '5,000€ - 15,000€',
    topUniversities: ['Sorbonne Université', 'Sciences Po'],
    popularPrograms: ['Médecine', 'Droit', 'Arts'],
    link: '/destinations/france',
  },
  {
    country: 'USA',
    countryCode: '🇺🇸',
    universities: 150,
    successRate: 85,
    image: '/images/destinations/usa.jpg',
    studentsCount: 2800,
    averageCost: '25,000€ - 50,000€',
    topUniversities: ['UC Berkeley', 'MIT'],
    popularPrograms: ['Business', 'Tech', 'Médecine'],
    link: '/destinations/usa',
  },
  {
    country: 'Royaume-Uni',
    countryCode: '🇬🇧',
    universities: 95,
    successRate: 88,
    image: '/images/destinations/uk.jpg',
    studentsCount: 1900,
    averageCost: '15,000€ - 30,000€',
    topUniversities: ['Oxford', 'Cambridge'],
    popularPrograms: ['Finance', 'Droit', 'Ingénierie'],
    link: '/destinations/uk',
  },
]
