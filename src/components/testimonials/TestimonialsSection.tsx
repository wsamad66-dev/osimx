'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import TestimonialCarousel from './TestimonialCarousel'
import { getTestimonials, type Testimonial } from '@/lib/sanity/client'

// Mock data fallback (for development/demo purposes)
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    _id: '1',
    studentName: 'Aminata Diallo',
    studentImage: 'https://i.pravatar.cc/400?img=47',
    originCountry: 'Sénégal',
    destinationCountry: 'France',
    originFlag: '🇸🇳',
    destinationFlag: '🇫🇷',
    programName: 'Finance',
    degree: 'Master',
    graduationYear: 2024,
    testimonialText:
      "Grâce à l'équipe, j'ai obtenu mon admission à HEC Paris. Un accompagnement exceptionnel du début à la fin !",
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
      'J\'ai reçu une bourse complète pour l\'Université de Toronto. L\'équipe m\'a guidé à chaque étape avec patience et professionnalisme.',
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
      'Mon rêve de devenir médecin au King\'s College London est devenu réalité. Merci infiniment pour votre soutien et vos conseils précieux !',
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
      'J\'étudie maintenant à la TU Munich avec une bourse complète. Le processus était simple et transparent grâce à cette équipe incroyable.',
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
      'J\'ai été acceptée à l\'Université de Louvain avec une bourse. Le soutien était remarquable, professionnel et humain à la fois.',
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
      'MBA à Stanford ! Je n\'y croyais pas au départ. L\'équipe a su mettre en valeur mon profil et m\'a aidé à obtenir un financement complet.',
    rating: 5,
    sentiment: 'excited',
  },
]

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK_TESTIMONIALS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getTestimonials()
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          // Using mock data - this is expected in development
          if (process.env.NODE_ENV === 'development') {
            console.log('📝 Using mock testimonials. To connect Sanity CMS, see TESTIMONIALS_SETUP.md')
          }
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error)
        // Fallback to mock data
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      id="temoignages"
      aria-labelledby="testimonials-heading"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#232d6e] via-[#26a5de] to-[#f29100]"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundSize: '200% 200%',
        }}
      />

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-[#232d6e]/30" />

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-[#26a5de]/30 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-[#f29100]/30 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#f29100]" />
            Témoignages Authentiques
          </motion.div>

          {/* Title */}
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Ce que disent nos{' '}
            <span className="bg-gradient-to-r from-[#f29100] via-[#ff9e0a] to-[#26a5de] bg-clip-text text-transparent">
              étudiants
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Plus de <strong className="text-[#f29100]">5 000+ étudiants africains</strong> ont réalisé
            leur rêve d'étudier à l'étranger avec notre accompagnement personnalisé.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  className="w-16 h-16 border-4 border-white/30 border-t-[#f29100] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-white/70">Chargement des témoignages...</p>
              </div>
            </div>
          ) : (
            <TestimonialCarousel testimonials={testimonials} />
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { label: 'Étudiants accompagnés', value: '5 000+', icon: '🎓' },
            { label: 'Taux de réussite', value: '98%', icon: '✅' },
            { label: 'Pays partenaires', value: '25+', icon: '🌍' },
            { label: 'Bourses obtenues', value: '€12M+', icon: '💰' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 150 }}
              className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
