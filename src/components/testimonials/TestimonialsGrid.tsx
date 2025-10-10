'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Award, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { getTestimonials, type Testimonial } from '@/lib/sanity/client'

// Mock data
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    _id: '1',
    studentName: 'Aminata Diallo',
    studentImage: 'https://i.pravatar.cc/400?img=47',
    originCountry: 'Sénégal',
    destinationCountry: 'France',
    originFlag: '🇸🇳',
    destinationFlag: '🇫🇷',
    programName: 'Master Finance',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "L'accompagnement était exceptionnel du début à la fin. J'ai obtenu mon admission à HEC Paris et une bourse de 15,000€.",
    rating: 5,
    sentiment: 'excited',
    featured: true,
  },
  {
    _id: '2',
    studentName: 'Kwame Mensah',
    studentImage: 'https://i.pravatar.cc/400?img=12',
    originCountry: 'Ghana',
    destinationCountry: 'Canada',
    originFlag: '🇬🇭',
    destinationFlag: '🇨🇦',
    programName: 'Informatique',
    degree: 'Bachelor',
    graduationYear: 2023,
    testimonialText:
      "Bourse complète pour l'Université de Toronto ! L'équipe m'a aidé à préparer un dossier en béton.",
    rating: 5,
    sentiment: 'grateful',
  },
  {
    _id: '3',
    studentName: 'Fatima El Fassi',
    studentImage: 'https://i.pravatar.cc/400?img=45',
    originCountry: 'Maroc',
    destinationCountry: 'Royaume-Uni',
    originFlag: '🇲🇦',
    destinationFlag: '🇬🇧',
    programName: 'Médecine',
    degree: 'Doctorat',
    graduationYear: 2025,
    testimonialText:
      "King's College London, mon rêve d'enfance ! Le processus était complexe mais l'équipe a su me guider avec expertise.",
    rating: 5,
    sentiment: 'confident',
  },
  {
    _id: '4',
    studentName: 'Ibrahim Touré',
    studentImage: 'https://i.pravatar.cc/400?img=33',
    originCountry: 'Côte d\'Ivoire',
    destinationCountry: 'Allemagne',
    originFlag: '🇨🇮',
    destinationFlag: '🇩🇪',
    programName: 'Ingénierie',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "TU Munich avec une bourse DAAD de 850€/mois ! Le processus était simple et l'équipe connaît le système allemand.",
    rating: 5,
    sentiment: 'happy',
  },
  {
    _id: '5',
    studentName: 'Aïcha Konaté',
    studentImage: 'https://i.pravatar.cc/400?img=44',
    originCountry: 'Mali',
    destinationCountry: 'Belgique',
    originFlag: '🇲🇱',
    destinationFlag: '🇧🇪',
    programName: 'Économie',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "Université de Louvain + bourse d'excellence ! Le soutien était remarquable et humain.",
    rating: 5,
    sentiment: 'grateful',
  },
  {
    _id: '6',
    studentName: 'Omar Diop',
    studentImage: 'https://i.pravatar.cc/400?img=15',
    originCountry: 'Sénégal',
    destinationCountry: 'États-Unis',
    originFlag: '🇸🇳',
    destinationFlag: '🇺🇸',
    programName: 'Business',
    degree: 'MBA',
    graduationYear: 2023,
    testimonialText:
      "MBA à Stanford avec financement complet ! L'équipe a mis en valeur mon profil entrepreneurial.",
    rating: 5,
    sentiment: 'excited',
  },
]

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK_TESTIMONIALS)
  const [selectedFilter, setSelectedFilter] = useState<'all' | string>('all')

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials()
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
      }
    }
    fetchTestimonials()
  }, [])

  // Extract unique destination countries for filter
  const countries = ['all', ...Array.from(new Set(testimonials.map((t) => t.destinationCountry)))]

  const filteredTestimonials =
    selectedFilter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.destinationCountry === selectedFilter)

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-semibold mb-6">
            <Award className="w-4 h-4" />
            98% de Taux de Réussite
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Témoignages de nos{' '}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              étudiants
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Plus de <strong className="text-blue-600">5 000 étudiants</strong> ont transformé leur
            avenir avec notre accompagnement personnalisé. Voici leurs histoires inspirantes.
          </p>

          {/* Country Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedFilter(country)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedFilter === country
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {country === 'all' ? 'Tous' : country}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Featured badge */}
              {testimonial.featured && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  Recommandé
                </div>
              )}

              {/* Student Image */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
                  <Image
                    src={testimonial.studentImage}
                    alt={testimonial.studentName}
                    fill
                    className="relative rounded-full object-cover ring-2 ring-white shadow-md"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {testimonial.studentName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <span>{testimonial.originFlag}</span>
                    <span>→</span>
                    <span>{testimonial.destinationFlag}</span>
                  </div>
                </div>
              </div>

              {/* Program info */}
              <div className="mb-4 pb-4 border-b border-gray-100">
                <p className="text-sm font-semibold text-orange-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  {testimonial.programName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {testimonial.degree} • Promo {testimonial.graduationYear}
                </p>
              </div>

              {/* Testimonial text */}
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                "{testimonial.testimonialText}"
              </blockquote>

              {/* Star rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? 'fill-orange-400 text-orange-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500 font-medium">
                  {testimonial.rating}/5
                </span>
              </div>

              {/* Hover effect gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-transparent to-orange-500/0 group-hover:from-blue-500/5 group-hover:to-orange-500/5 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt à écrire votre success story ?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez les <strong>5 000+ étudiants</strong> qui ont réalisé leur rêve d'études à
              l'étranger avec notre accompagnement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
                🚀 Commencer gratuitement
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-colors">
                📞 Parler à un conseiller
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: '🎓', value: '5 000+', label: 'Étudiants' },
            { icon: '✅', value: '98%', label: 'Taux réussite' },
            { icon: '🌍', value: '25+', label: 'Pays' },
            { icon: '💰', value: '€12M+', label: 'Bourses' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
