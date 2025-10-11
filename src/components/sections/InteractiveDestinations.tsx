'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Users, Building2, TrendingUp, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useDynamicCountry, defaultCountries } from '@/hooks/useDynamicCountry'
import { useScrollReveal, fadeUpVariants } from '@/hooks/useScrollReveal'

export function InteractiveDestinations() {
  const { selectedCountry, selectedCountryId, selectCountry, countries } = useDynamicCountry(defaultCountries)
  const { ref, variants } = useScrollReveal({ threshold: 0.2 })

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/destinations-background.png"
          alt="Background"
          fill
          className="object-cover opacity-15"
          priority={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/92 to-white/85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={variants}
          className="text-center mb-16"
        >
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Destinations populaires
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 px-4 sm:px-0"
          >
            Votre avenir commence par le{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                bon choix
              </span>
              <span className="absolute bottom-1 sm:bottom-2 left-0 right-0 h-3 sm:h-4 bg-orange-400/30 blur-sm -z-10" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            Découvrez les meilleures destinations académiques au monde et transformez vos ambitions en réalité
          </motion.p>
        </motion.div>

        {/* Interactive Layout */}
        <div className="grid lg:grid-cols-[350px_1fr] gap-6 md:gap-8 items-start">
          {/* Left: Country Selector Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:space-y-3 overflow-x-auto lg:overflow-x-visible -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex lg:flex-col gap-3 min-w-max lg:min-w-0">
            {countries.map((country, index) => (
              <motion.button
                key={country.id}
                onClick={() => selectCountry(country.id)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-[280px] lg:w-full text-left p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group snap-center ${
                  selectedCountryId === country.id
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/20'
                    : 'bg-white/70 backdrop-blur-sm border-gray-200 hover:border-blue-300 hover:shadow-lg'
                }`}
                aria-label={`Sélectionner ${country.name}`}
                aria-pressed={selectedCountryId === country.id}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                    {country.flag}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base sm:text-lg mb-1 ${
                      selectedCountryId === country.id ? 'text-blue-700' : 'text-gray-900'
                    }`}>
                      {country.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{country.tagline}</p>
                  </div>
                  {selectedCountryId === country.id ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-5 h-5 text-white" />
                    </motion.div>
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                  )}
                </div>
              </motion.button>
            ))}
            </div>
          </motion.div>

          {/* Right: Dynamic Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCountryId}
              initial={{ opacity: 0, x: 30, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden border border-gray-200"
            >
              {/* Image Header with Stats Overlay */}
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <motion.div
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedCountry.image}
                    alt={`Étudier ${selectedCountry.name === 'Canada' || selectedCountry.name === 'Chine' ? 'au' : 'en'} ${selectedCountry.name}`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${selectedCountry.color} opacity-70`} />
                </motion.div>

                {/* Country name overlay */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl sm:text-6xl md:text-7xl mb-2"
                  >
                    {selectedCountry.flag}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                  >
                    Étudier {selectedCountry.name === 'Canada' || selectedCountry.name === 'Chine' ? 'au' : 'en'} {selectedCountry.name}
                  </motion.h3>
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: Users, value: selectedCountry.students, label: 'Étudiants', delay: 0.2 },
                    { icon: Building2, value: selectedCountry.universities, label: 'Universités', delay: 0.3 },
                    { icon: TrendingUp, value: selectedCountry.successRate, label: 'Réussite', delay: 0.4 }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stat.delay }}
                      className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 text-center"
                    >
                      <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-base sm:text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-[10px] sm:text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-4 sm:mb-6"
                >
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {selectedCountry.tagline}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                    {selectedCountry.description}
                  </p>
                </motion.div>

                {/* Highlights Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="grid sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8"
                >
                  {selectedCountry.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{highlight}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    href={selectedCountry.ctaLink}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    aria-label={selectedCountry.ctaText}
                  >
                    <span>{selectedCountry.ctaText}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
