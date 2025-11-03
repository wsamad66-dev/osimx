'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Award, TrendingUp, Calendar, X } from 'lucide-react'
import Image from 'next/image'
import { getTestimonials, type Testimonial } from '@/lib/sanity/client'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

// Mock data - Témoignages par destination
const MOCK_TESTIMONIALS: Testimonial[] = [
  // FRANCE 🇫🇷
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
    studentName: 'Youssef Benjelloun',
    studentImage: 'https://i.pravatar.cc/400?img=33',
    originCountry: 'Maroc',
    destinationCountry: 'France',
    originFlag: '🇲🇦',
    destinationFlag: '🇫🇷',
    programName: 'Sciences Politiques',
    degree: 'Master',
    graduationYear: 2025,
    testimonialText:
      "Sciences Po Paris ! L'équipe m'a aidé à rédiger une lettre de motivation percutante. Admis avec une bourse d'excellence.",
    rating: 5,
    sentiment: 'confident',
  },
  
  // CANADA 🇨🇦
  {
    _id: '3',
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
      "Bourse complète pour l'Université de Toronto ! L'équipe m'a aidé à préparer un dossier en béton armé.",
    rating: 5,
    sentiment: 'grateful',
    featured: true,
  },
  {
    _id: '4',
    studentName: 'Fatou Sall',
    studentImage: 'https://i.pravatar.cc/400?img=45',
    originCountry: 'Sénégal',
    destinationCountry: 'Canada',
    originFlag: '🇸🇳',
    destinationFlag: '🇨🇦',
    programName: 'Génie Civil',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "Polytechnique Montréal avec bourse de 20,000$ CAD ! Le processus de visa était rapide grâce à leur expertise.",
    rating: 5,
    sentiment: 'excited',
  },

  // BELGIQUE 🇧🇪
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
      "UCLouvain + bourse d'excellence de 10,000€ ! Le soutien était remarquable et humain. Merci infiniment !",
    rating: 5,
    sentiment: 'grateful',
  },
  {
    _id: '6',
    studentName: 'Mohamed Traore',
    studentImage: 'https://i.pravatar.cc/400?img=51',
    originCountry: 'Guinée',
    destinationCountry: 'Belgique',
    originFlag: '🇬🇳',
    destinationFlag: '🇧🇪',
    programName: 'Médecine',
    degree: 'Doctorat',
    graduationYear: 2025,
    testimonialText:
      "Université Libre de Bruxelles pour mon doctorat ! L'équipe a géré tous les aspects administratifs complexes.",
    rating: 5,
    sentiment: 'confident',
  },

  // ALLEMAGNE 🇩🇪
  {
    _id: '7',
    studentName: 'Ibrahim Touré',
    studentImage: 'https://i.pravatar.cc/400?img=33',
    originCountry: 'Côte d\'Ivoire',
    destinationCountry: 'Allemagne',
    originFlag: '🇨🇮',
    destinationFlag: '🇩🇪',
    programName: 'Ingénierie Mécanique',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "TU Munich avec une bourse DAAD de 850€/mois ! Le processus était simple et l'équipe connaît parfaitement le système allemand.",
    rating: 5,
    sentiment: 'happy',
    featured: true,
  },
  {
    _id: '8',
    studentName: 'Mariam Diaby',
    studentImage: 'https://i.pravatar.cc/400?img=49',
    originCountry: 'Burkina Faso',
    destinationCountry: 'Allemagne',
    originFlag: '🇧🇫',
    destinationFlag: '🇩🇪',
    programName: 'Data Science',
    degree: 'Master',
    graduationYear: 2025,
    testimonialText:
      "TU Berlin en Data Science ! Études gratuites en Allemagne + job étudiant trouvé rapidement. Un rêve devenu réalité.",
    rating: 5,
    sentiment: 'excited',
  },

  // ESPAGNE 🇪🇸
  {
    _id: '9',
    studentName: 'Karim Benali',
    studentImage: 'https://i.pravatar.cc/400?img=52',
    originCountry: 'Algérie',
    destinationCountry: 'Espagne',
    originFlag: '🇩🇿',
    destinationFlag: '🇪🇸',
    programName: 'Architecture',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "Université de Barcelone ! Le climat, la culture et l'excellence académique. L'équipe a rendu le rêve possible.",
    rating: 5,
    sentiment: 'happy',
  },
  {
    _id: '10',
    studentName: 'Sophia Kamara',
    studentImage: 'https://i.pravatar.cc/400?img=48',
    originCountry: 'Sierra Leone',
    destinationCountry: 'Espagne',
    originFlag: '🇸🇱',
    destinationFlag: '🇪🇸',
    programName: 'Business International',
    degree: 'Master',
    graduationYear: 2025,
    testimonialText:
      "IE Business School Madrid avec une bourse de 18,000€ ! Processus fluide et équipe toujours disponible.",
    rating: 5,
    sentiment: 'grateful',
  },

  // CHINE 🇨🇳
  {
    _id: '11',
    studentName: 'Emmanuel Okon',
    studentImage: 'https://i.pravatar.cc/400?img=14',
    originCountry: 'Nigeria',
    destinationCountry: 'Chine',
    originFlag: '🇳🇬',
    destinationFlag: '🇨🇳',
    programName: 'Relations Internationales',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "Bourse complète du gouvernement chinois à Peking University ! Une expérience unique et un investissement pour l'avenir.",
    rating: 5,
    sentiment: 'excited',
  },
  {
    _id: '12',
    studentName: 'Aissatou Ba',
    studentImage: 'https://i.pravatar.cc/400?img=46',
    originCountry: 'Mauritanie',
    destinationCountry: 'Chine',
    originFlag: '🇲🇷',
    destinationFlag: '🇨🇳',
    programName: 'Commerce International',
    degree: 'Bachelor',
    graduationYear: 2025,
    testimonialText:
      "Shanghai Jiao Tong University ! Bourse CSC obtenue facilement grâce à l'accompagnement expert de l'équipe.",
    rating: 5,
    sentiment: 'confident',
  },
]

export default function TestimonialsGrid() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK_TESTIMONIALS)
  const [selectedFilter, setSelectedFilter] = useState<'all' | string>('all')
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)
  const [showZcalModal, setShowZcalModal] = useState(false)

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
              <button 
                onClick={() => setIsRegistrationModalOpen(true)}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Commencer gratuitement
              </button>
              <button 
                onClick={() => setShowZcalModal(true)}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-colors"
              >
                Parler à un conseiller
              </button>
            </div>
          </div>
        </motion.div>

        {/* Registration Modal */}
        <QuickRegistrationModal 
          isOpen={isRegistrationModalOpen} 
          onClose={() => setIsRegistrationModalOpen(false)} 
        />

        {/* zcal Appointment Modal */}
        <AnimatePresence>
          {showZcalModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
              onClick={() => setShowZcalModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                        Parler à un conseiller
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Consultation gratuite de 30 minutes
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowZcalModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* zcal iframe */}
                <div className="relative w-full h-[600px] overflow-hidden">
                  <iframe
                    src="https://zcal.co/i/CW2aTnAb"
                    className="w-full h-full border-0"
                    title="Réservation de consultation"
                    onLoad={() => {
                      // Track when zcal loads
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'appointment_calendar_loaded', {
                          event_category: 'engagement',
                          event_label: 'testimonials_cta',
                        })
                      }
                    }}
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-xs text-center text-gray-600">
                    💡 Sélectionnez un créneau qui vous convient dans le calendrier ci-dessus
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { 
              value: '5 000+', 
              label: 'Étudiants accompagnés',
              gradient: 'from-blue-500 to-cyan-500',
              bgGradient: 'from-blue-50 to-cyan-50'
            },
            { 
              value: '98%', 
              label: 'Taux de réussite',
              gradient: 'from-green-500 to-emerald-500',
              bgGradient: 'from-green-50 to-emerald-50'
            },
            { 
              value: '25+', 
              label: 'Pays partenaires',
              gradient: 'from-purple-500 to-pink-500',
              bgGradient: 'from-purple-50 to-pink-50'
            },
            { 
              value: '€12M+', 
              label: 'En bourses obtenues',
              gradient: 'from-orange-500 to-red-500',
              bgGradient: 'from-orange-50 to-red-50'
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="relative group"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl transition-all duration-300 group-hover:shadow-xl`} />
              
              {/* Content */}
              <div className="relative text-center p-6 md:p-8">
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} 
                     style={{ padding: '2px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} 
                />
                
                {/* Value with gradient text */}
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 transition-transform duration-300 group-hover:scale-110`}>
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base text-gray-700 font-medium">
                  {stat.label}
                </div>
                
                {/* Decorative dot */}
                <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
