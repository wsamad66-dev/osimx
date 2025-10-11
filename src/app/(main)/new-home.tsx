'use client'

import { useState } from 'react'
import { NewHeroSection } from '@/components/hero/NewHeroSection'
import { TrustSection } from '@/components/sections/TrustSection'
import { DestinationCard, destinationsData } from '@/components/sections/DestinationCard'
import { StudentTestimonial, testimonialsData } from '@/components/sections/StudentTestimonial'
import { UrgencyBanners } from '@/components/widgets/UrgencyBanner'
import { QuizModal } from '@/components/widgets/QuizModal'
import { LeadMagnetPopup } from '@/components/widgets/LeadMagnetPopup'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'

export default function NewHomePage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Étudiants accompagnés',
      color: 'text-primary-600',
    },
    {
      icon: Award,
      value: '85%',
      label: 'Taux de réussite',
      color: 'text-green-600',
    },
    {
      icon: BookOpen,
      value: '15',
      label: 'Pays partenaires',
      color: 'text-orange-600',
    },
  ]

  return (
    <>
      {/* Urgency Banner */}
      <UrgencyBanners />

      {/* Hero Section */}
      <NewHeroSection 
        onOpenQuiz={() => setIsQuizOpen(true)} 
        onContactClick={() => window.location.href = '/contact'}
      />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-bold text-navy-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Destinations Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Trouvez votre <span className="text-primary-600">destination idéale</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Nous vous accompagnons vers les meilleures universités dans 15 pays
            </p>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              🎯 Faire le quiz (2 min)
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationsData.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard {...destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Ils ont <span className="text-orange-600">réussi</span> avec nous
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les témoignages de nos étudiants qui étudient maintenant à l&apos;étranger
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <StudentTestimonial {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Comment ça <span className="text-primary-600">fonctionne</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un accompagnement personnalisé en 4 étapes simples
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '1',
                title: 'Quiz Personnalisé',
                description: 'Découvrez votre destination idéale en 2 minutes',
                icon: '🎯',
              },
              {
                step: '2',
                title: 'Consultation Gratuite',
                description: 'Un conseiller analyse votre profil et vos objectifs',
                icon: '📞',
              },
              {
                step: '3',
                title: 'Accompagnement',
                description: 'Dossier d\'admission, visa, logement - on s\'occupe de tout',
                icon: '✨',
              },
              {
                step: '4',
                title: 'Destination Atteinte',
                description: 'Vous commencez vos études à l\'étranger !',
                icon: '🎓',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-orange-500 text-white rounded-2xl mb-6 text-4xl shadow-lg">
                  {item.icon}
                </div>
                <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 text-8xl font-bold text-gray-100">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTASection />

      {/* Quiz Modal */}
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Lead Magnet Popup */}
      <LeadMagnetPopup delay={30000} trigger="time" />
    </>
  )
}
