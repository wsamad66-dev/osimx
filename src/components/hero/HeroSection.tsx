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
                <span className="text-lg">⏰</span>
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
                🚀 Commencer mon projet gratuitement
              </Button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex items-center gap-3 sm:gap-4"
            >
              {/* Avatars */}
              <div className="flex -space-x-2">
                <img
                  src="https://i.pravatar.cc/150?img=1"
                  alt="User"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="User"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="User"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
                />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border-2 border-white flex items-center justify-center">
                  <span className="text-white text-[10px] sm:text-xs font-semibold">{heroData.studentsCount || STATS.studentsHelped}</span>
                </div>
              </div>
              {/* Text */}
              <p className="text-gray-700 text-sm sm:text-base">
                {heroData.studentsCount || STATS.studentsHelped} {heroData.studentsCountText || STATS.studentsHelpedText}
              </p>
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
