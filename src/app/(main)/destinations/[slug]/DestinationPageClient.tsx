'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'
import { CheckCircle2, Quote, Calendar, GraduationCap, Globe, TrendingUp, Heart } from 'lucide-react'

interface DestinationData {
  slug: string
  name: string
  flag: string
  hero: {
    title: string
    description: string
    image: string
  }
  advantages: Array<{
    icon: string
    title: string
    description: string
  }>
  universities: Array<{
    name: string
    location: string
    programs: string
  }>
  admissionProcess: Array<{
    step: number
    title: string
    description: string
  }>
  costs: {
    tuition: string
    housing: string
    living: string
    scholarships: string
  }
  testimonial: {
    name: string
    program: string
    university: string
    quote: string
    image: string
  }
}

interface DestinationPageClientProps {
  destination: DestinationData
}

export default function DestinationPageClient({ destination }: DestinationPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showZcalModal, setShowZcalModal] = useState(false)

  // Map icon names to components
  const iconMap: Record<string, any> = {
    GraduationCap,
    Globe,
    TrendingUp,
    Heart,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
              <span className="text-6xl">{destination.flag}</span>
              <span className="text-white font-semibold text-lg">{destination.name}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {destination.hero.title}
            </h1>
            
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              {destination.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Commencer mon projet gratuitement
              </button>
              
              <button
                onClick={() => setShowZcalModal(true)}
                className="px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-blue-500/30 transition-all duration-200"
              >
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Consultation gratuite
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. AVANTAGES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Étudier en {destination.name} ?
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les avantages uniques qui font de {destination.name} une destination d'excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destination.advantages.map((advantage, index) => {
              const Icon = iconMap[advantage.icon] || GraduationCap
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {advantage.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 3. UNIVERSITÉS PARTENAIRES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Universités Partenaires
            </h2>
            <p className="text-xl text-gray-600">
              Nous collaborons avec les meilleures institutions en {destination.name}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.universities.map((university, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {university.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {university.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {university.location}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium">
                    {university.programs}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESSUS D'ADMISSION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Processus d'Admission Simplifié
            </h2>
            <p className="text-xl text-gray-600">
              Nous vous accompagnons à chaque étape de votre parcours
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destination.admissionProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">
                      {step.step}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < destination.admissionProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COÛTS & BOURSES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Coûts & Opportunités de Financement
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur le budget et les bourses disponibles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">💰</span>
                Frais de Scolarité
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {destination.costs.tuition}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🏠</span>
                Logement
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {destination.costs.housing}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🛒</span>
                Coût de Vie
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {destination.costs.living}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="text-3xl">🎓</span>
                Bourses Disponibles
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {destination.costs.scholarships}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TÉMOIGNAGE ÉTUDIANT */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Témoignage d'un Étudiant
            </h2>
            <p className="text-xl text-blue-100">
              Découvrez l'expérience de nos étudiants en {destination.name}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-white/20"
          >
            <Quote className="w-12 h-12 text-white/60 mb-6" />
            
            <p className="text-xl text-white leading-relaxed mb-8 italic">
              "{destination.testimonial.quote}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img 
                  src={destination.testimonial.image} 
                  alt={destination.testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <p className="text-white font-bold text-lg">
                  {destination.testimonial.name}
                </p>
                <p className="text-blue-200 text-sm">
                  {destination.testimonial.program}
                </p>
                <p className="text-blue-300 text-sm">
                  {destination.testimonial.university}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Prêt à Commencer Votre Aventure en {destination.name} ?
            </h2>
            
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Rejoignez des milliers d'étudiants qui ont réalisé leur rêve d'études à l'étranger. 
              Notre équipe d'experts vous accompagne gratuitement à chaque étape.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Démarrer mon inscription gratuite
              </button>
              
              <button
                onClick={() => setShowZcalModal(true)}
                className="px-10 py-5 bg-gray-100 text-gray-900 rounded-xl font-bold hover:bg-gray-200 transition-all duration-200"
              >
                <Calendar className="inline-block w-5 h-5 mr-2" />
                Planifier un appel
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-blue-50 p-6 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Accompagnement Gratuit</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Experts Certifiés</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Taux de Réussite 98%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration Modal */}
      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* zcal Modal */}
      {showZcalModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">
                  Réserver votre consultation gratuite
                </h3>
              </div>
              <button
                onClick={() => setShowZcalModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="h-[calc(90vh-100px)]">
              <iframe
                src="https://zcal.co/letudiantetranger/consultation"
                className="w-full h-full"
                frameBorder="0"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
