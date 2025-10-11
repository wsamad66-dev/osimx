'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, Shield, Star, TrendingUp } from 'lucide-react'

export function TrustSection() {
  const universityPartners = [
    { name: 'Université de Montréal', logo: '/images/partners/udem.png', country: '🇨🇦' },
    { name: 'Sorbonne Université', logo: '/images/partners/sorbonne.png', country: '🇫🇷' },
    { name: 'UC Berkeley', logo: '/images/partners/berkeley.png', country: '🇺🇸' },
    { name: 'Imperial College', logo: '/images/partners/imperial.png', country: '🇬🇧' },
    { name: 'McGill University', logo: '/images/partners/mcgill.png', country: '🇨🇦' },
    { name: 'Sciences Po', logo: '/images/partners/sciencespo.png', country: '🇫🇷' },
  ]

  const certifications = [
    {
      icon: Shield,
      title: 'Certifié par l\'Office Franco-Québécois',
      description: 'Partenaire officiel pour la jeunesse',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Award,
      title: 'Prix d\'Excellence 2024',
      description: 'Meilleur service d\'accompagnement étudiant',
      color: 'text-gold-600',
      bgColor: 'bg-gold-50',
    },
    {
      icon: Star,
      title: '4.9/5 sur TrustPilot',
      description: 'Basé sur 247+ avis vérifiés',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: TrendingUp,
      title: '85% de Taux de Réussite',
      description: 'Nos étudiants obtiennent leur visa',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

  const mediaLogos = [
    { name: 'Le Monde', logo: '/images/media/lemonde.png' },
    { name: 'Le Figaro Étudiant', logo: '/images/media/figaro.png' },
    { name: 'Jeune Afrique', logo: '/images/media/jeuneafrique.png' },
    { name: 'L\'Étudiant', logo: '/images/media/letudiant.png' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Ils nous font <span className="text-primary-600">confiance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Plus de 10,000 étudiants accompagnés vers les meilleures universités du monde
          </p>
        </motion.div>

        {/* University Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Nos Universités Partenaires
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {universityPartners.map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center justify-center group"
              >
                <div className="w-full h-20 relative mb-3 grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-center text-gray-600 font-medium mb-1">
                  {partner.name}
                </p>
                <span className="text-lg">{partner.country}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className={`${cert.bgColor} rounded-2xl p-6 border-2 border-transparent hover:border-${cert.color.split('-')[1]}-200 transition-all`}
              >
                <div className={`${cert.color} mb-4`}>
                  <cert.icon className="w-12 h-12" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Media Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Ils parlent de nous
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {mediaLogos.map((media, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="relative w-32 h-16 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <Image
                  src={media.logo}
                  alt={media.name}
                  fill
                  className="object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-50 to-blue-50 px-8 py-4 rounded-full border border-green-200">
            <Shield className="w-6 h-6 text-green-600" />
            <p className="text-gray-700">
              <strong className="text-green-600">100% sécurisé</strong> • Remboursement garanti si refus injustifié
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
