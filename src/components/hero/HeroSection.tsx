'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BenefitBadge } from './BenefitBadge'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'
import { PortableTextRenderer } from './PortableTextRenderer'
import type { HeroContent } from '@/lib/sanity-queries'
import { STATS } from '@/config/stats'

interface HeroSectionProps {
  heroData: HeroContent
  onRegisterClick?: () => void
}

export function HeroSection({ heroData, onRegisterClick }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <section className="relative bg-gray-50 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left column: Text content */}
          <div className="max-w-2xl">
            {/* Urgency Badge */}
            {heroData.urgencyBadge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 mb-6"
              >
                <span className="text-sm font-semibold text-blue-700">{heroData.urgencyBadge}</span>
              </motion.div>
            )}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight"
            >
              <PortableTextRenderer
                value={heroData.headline}
                className="text-gray-900"
              />
            </motion.h1>

            {/* Subheadline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed"
            >
              <PortableTextRenderer
                value={heroData.subheadline}
                className="text-gray-600"
              />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-10 sm:mb-12 md:mb-16"
            >
              <Button
                onClick={handleRegister}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-7 text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Commencer mon projet gratuitement
              </Button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-3 sm:gap-4 bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-gray-100"
            >
              {/* Student Avatars */}
              <div className="flex -space-x-3">
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Étudiant"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-md object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Étudiant"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-md object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=45"
                    alt="Étudiant"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-md object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150?img=33"
                    alt="Étudiant"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-md object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 border-white shadow-md flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm relative">
                  10K+
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col">
                <p className="text-gray-900 font-bold text-base sm:text-lg">
                  500+ étudiants
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  déjà accompagnés
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative lg:block hidden"
          >
            {/* Main Image */}
            <motion.div
              className="relative rounded-3xl overflow-hidden bg-gray-200 shadow-2xl"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {heroData.heroImage?.asset?.url ? (
                <img
                  src={heroData.heroImage.asset.url}
                  alt="Student success"
                  className="w-full h-[600px] object-cover"
                />
              ) : (
                <div className="w-full h-[600px] bg-gradient-to-br from-gray-200 to-gray-300"></div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Registration Modal */}
      <QuickRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
