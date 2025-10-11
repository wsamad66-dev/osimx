'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote, MapPin, GraduationCap, Star } from 'lucide-react'

interface StudentTestimonialProps {
  name: string
  country: string
  university: string
  program?: string
  quote: string
  image: string
  year?: string
  rating?: number
  flag?: string
}

export function StudentTestimonial({
  name,
  country,
  university,
  program,
  quote,
  image,
  year = '2024',
  rating = 5,
  flag,
}: StudentTestimonialProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-primary-200">
        <Quote className="w-12 h-12" fill="currentColor" />
      </div>

      {/* Header: Student Info */}
      <div className="flex items-start gap-4 mb-4 relative z-10">
        {/* Student Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-primary-100 shadow-md">
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Country Flag Badge */}
          {flag && (
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-xl">
              {flag}
            </div>
          )}
        </div>

        {/* Student Details */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-navy-900">{name}</h4>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <GraduationCap className="w-4 h-4 text-primary-500" />
            <span>{university}</span>
          </div>
          {program && (
            <p className="text-xs text-gray-500 mt-1">{program}</p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(rating)].map((_, index) => (
          <Star key={index} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>

      {/* Testimonial Quote */}
      <blockquote className="relative">
        <p className="text-gray-700 italic leading-relaxed mb-4 font-serif text-base">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      {/* Footer: Location & Year */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="font-medium">{country}</span>
        </div>
        <span className="text-xs text-gray-400">{year}</span>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-1 h-24 bg-gradient-to-b from-primary-500 to-orange-500 rounded-tr-full rounded-br-full" />
    </motion.div>
  )
}

// Preset testimonials data
export const testimonialsData: StudentTestimonialProps[] = [
  {
    name: 'Aminata Diallo',
    country: 'Canada',
    university: 'Université de Montréal',
    program: 'Master en Informatique',
    quote: "L'Étudiant Étranger m'a accompagnée à chaque étape. Grâce à eux, j'ai obtenu mon admission et mon visa en seulement 3 mois. Je réalise aujourd'hui mon rêve au Canada !",
    image: '/images/testimonials/aminata.jpg',
    year: '2024',
    rating: 5,
    flag: '🇨🇦',
  },
  {
    name: 'Mohamed Ben Ali',
    country: 'France',
    university: 'Sciences Po Paris',
    program: 'Master en Relations Internationales',
    quote: "Un service exceptionnel ! L'équipe est très professionnelle et réactive. J'ai été accepté à Sciences Po et j'ai même obtenu une bourse. Je recommande à 200% !",
    image: '/images/testimonials/mohamed.jpg',
    year: '2024',
    rating: 5,
    flag: '🇫🇷',
  },
  {
    name: 'Sophie Kouassi',
    country: 'USA',
    university: 'UC Berkeley',
    program: 'MBA',
    quote: "Berkeley était un rêve inaccessible pour moi. Grâce au coaching personnalisé et à l'aide pour le dossier, j'ai été admise avec une bourse de 50%. Incroyable !",
    image: '/images/testimonials/sophie.jpg',
    year: '2023',
    rating: 5,
    flag: '🇺🇸',
  },
  {
    name: 'Ibrahim Traoré',
    country: 'Royaume-Uni',
    university: 'Imperial College London',
    program: 'Master en Ingénierie',
    quote: "Le processus était complexe mais l'équipe m'a guidé avec patience. J'étudie maintenant à Londres dans une des meilleures universités du monde. Merci infiniment !",
    image: '/images/testimonials/ibrahim.jpg',
    year: '2024',
    rating: 5,
    flag: '🇬🇧',
  },
]
