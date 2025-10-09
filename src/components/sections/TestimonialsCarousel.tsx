'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { useScrollReveal, fadeUpVariants } from '@/hooks/useScrollReveal'

interface Testimonial {
  id: number
  name: string
  country: string
  destination: string
  image: string
  rating: number
  quote: string
  program: string
  year: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aminata Diallo',
    country: 'Sénégal',
    destination: 'France',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    quote: "Grâce à L'Étudiant à l'Étranger, j'ai pu réaliser mon rêve d'étudier en France. L'équipe m'a accompagnée de A à Z, de l'admission à l'obtention du visa. Un service exceptionnel !",
    program: 'Master en Finance',
    year: '2024'
  },
  {
    id: 2,
    name: 'Kwame Mensah',
    country: 'Ghana',
    destination: 'Canada',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    quote: "Le processus était clair, transparent et rapide. J'ai été accepté dans une université canadienne en moins de 3 mois. Le support 24/7 m'a vraiment rassuré durant tout le parcours.",
    program: 'Ingénieur Informatique',
    year: '2023'
  },
  {
    id: 3,
    name: 'Fatima Bouazza',
    country: 'Maroc',
    destination: 'Belgique',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
    quote: "Une expérience incroyable ! L'équipe a géré toutes mes démarches administratives et m'a aidée à obtenir une bourse complète. Je recommande à 100% !",
    program: 'Doctorat en Médecine',
    year: '2024'
  },
  {
    id: 4,
    name: 'Ibrahim Koné',
    country: 'Côte d\'Ivoire',
    destination: 'Italie',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 5,
    quote: "J'hésitais à faire le grand saut, mais l'accompagnement personnalisé m'a donné confiance. Aujourd'hui, je vis mon rêve italien grâce à cette équipe formidable.",
    program: 'Master en Design',
    year: '2023'
  },
  {
    id: 5,
    name: 'Aisha Mohammed',
    country: 'Nigeria',
    destination: 'Chine',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
    rating: 5,
    quote: "La Chine était un choix audacieux, mais avec leur expertise, tout s'est déroulé parfaitement. J'ai même obtenu une bourse du gouvernement chinois. Merci infiniment !",
    program: 'MBA International',
    year: '2024'
  }
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const { ref, variants } = useScrollReveal({ threshold: 0.2 })

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(!isAutoPlaying)
  }, [isAutoPlaying])

  // Auto-rotation logic
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused, goToNext])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-200 font-semibold text-sm">
              Témoignages authentiques
            </span>
          </motion.div>

          <motion.h2 
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6"
          >
            Ce que disent nos{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                étudiants
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-4 bg-amber-400/30 blur-sm -z-10" />
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeUpVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Des milliers d'étudiants ont transformé leur vie grâce à notre accompagnement
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotateY: 10 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-[350px_1fr] gap-8 p-8 md:p-12">
                {/* Left: User Info */}
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Profile Image */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl opacity-50" />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* User Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-gray-600">
                      {currentTestimonial.country} → {currentTestimonial.destination}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </motion.div>

                  {/* Program Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200"
                  >
                    <span className="text-sm font-semibold text-blue-700">
                      {currentTestimonial.program}
                    </span>
                    <span className="text-xs text-gray-600">
                      Promotion {currentTestimonial.year}
                    </span>
                  </motion.div>
                </div>

                {/* Right: Quote */}
                <div className="flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                  >
                    {/* Quote Icon */}
                    <Quote className="absolute -top-4 -left-2 w-16 h-16 text-blue-200 opacity-50" />
                    
                    {/* Quote Text */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 relative z-10 italic"
                    >
                      "{currentTestimonial.quote}"
                    </motion.p>

                    {/* Decorative gradient bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="p-3 rounded-full bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500'
                      : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                  aria-current={index === currentIndex}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="p-3 rounded-full bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="p-3 rounded-full bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:scale-110 shadow-lg ml-4"
              aria-label={isAutoPlaying ? 'Mettre en pause' : 'Reprendre'}
            >
              {isAutoPlaying ? (
                <Pause className="w-6 h-6 text-gray-700" />
              ) : (
                <Play className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6 text-white/70 text-sm"
          >
            {currentIndex + 1} / {testimonials.length}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
