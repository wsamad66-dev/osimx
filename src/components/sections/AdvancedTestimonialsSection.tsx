'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Play, Pause, ChevronLeft, ChevronRight, Star, MapPin, GraduationCap, Calendar, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// 🎯 TypeScript Interface for Advanced Testimonial
interface Testimonial {
  id: string
  name: string
  photo: string
  quote: string
  rating: number
  country: {
    origin: string
    destination: string
    originFlag: string
    destinationFlag: string
  }
  program: {
    degree: string
    field: string
    year: number
  }
  voiceUrl?: string // Optional voice testimonial
  sentiment: 'excited' | 'grateful' | 'confident' | 'happy'
  videoUrl?: string
}

// 🎨 Sentiment-based colors for glow effects
const sentimentColors = {
  excited: {
    from: '#f29100',
    to: '#ff9e0a',
    glow: 'rgba(242, 145, 0, 0.4)'
  },
  grateful: {
    from: '#26a5de',
    to: '#1d8bc4',
    glow: 'rgba(38, 165, 222, 0.4)'
  },
  confident: {
    from: '#232d6e',
    to: '#1a2556',
    glow: 'rgba(35, 45, 110, 0.4)'
  },
  happy: {
    from: '#26a5de',
    to: '#f29100',
    glow: 'rgba(38, 165, 222, 0.3)'
  }
}

// 📦 Mock Data (Replace with Sanity CMS later)
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aminata Diallo',
    photo: '/user1.svg',
    quote: "Grâce à l'équipe, j'ai obtenu mon admission à HEC Paris en Master Finance. Un accompagnement exceptionnel du début à la fin !",
    rating: 5,
    country: {
      origin: 'Sénégal',
      destination: 'France',
      originFlag: '🇸🇳',
      destinationFlag: '🇫🇷'
    },
    program: {
      degree: 'Master',
      field: 'Finance',
      year: 2024
    },
    sentiment: 'excited',
    voiceUrl: '/audio/aminata.mp3' // Optional
  },
  {
    id: '2',
    name: 'Kwame Mensah',
    photo: '/user2.svg',
    quote: "De l'admission à l'université McGill jusqu'à l'obtention du visa, tout s'est passé sans stress. Je recommande vivement leurs services !",
    rating: 5,
    country: {
      origin: 'Ghana',
      destination: 'Canada',
      originFlag: '🇬🇭',
      destinationFlag: '🇨🇦'
    },
    program: {
      degree: 'Bachelor',
      field: 'Informatique',
      year: 2023
    },
    sentiment: 'grateful'
  },
  {
    id: '3',
    name: 'Fatima El Amrani',
    photo: '/user3.svg',
    quote: "Un service professionnel et attentif. J'ai été acceptée à l'Université de Cambridge pour mon doctorat. Merci infiniment !",
    rating: 5,
    country: {
      origin: 'Maroc',
      destination: 'Royaume-Uni',
      originFlag: '🇲🇦',
      destinationFlag: '🇬🇧'
    },
    program: {
      degree: 'Doctorat',
      field: 'Sciences Politiques',
      year: 2024
    },
    sentiment: 'confident'
  },
  {
    id: '4',
    name: 'Emmanuel Nkrumah',
    photo: '/user4.svg',
    quote: "L'accompagnement personnalisé m'a permis d'obtenir une bourse complète pour mon Master à Berlin. Une expérience transformatrice !",
    rating: 5,
    country: {
      origin: 'Côte d\'Ivoire',
      destination: 'Allemagne',
      originFlag: '🇨🇮',
      destinationFlag: '🇩🇪'
    },
    program: {
      degree: 'Master',
      field: 'Ingénierie',
      year: 2024
    },
    sentiment: 'happy'
  }
]

export function AdvancedTestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCTA, setShowCTA] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  const currentTestimonial = testimonials[currentIndex]
  const sentiment = sentimentColors[currentTestimonial.sentiment]

  // ⏱️ Auto-play carousel (every 6 seconds)
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % testimonials.length
        
        // Show CTA after viewing 3 testimonials
        if (next === 0 || next === 3) {
          setShowCTA(true)
          setTimeout(() => setShowCTA(false), 5000)
        }
        
        return next
      })
      setProgress(0)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPlaying])

  // 📊 Progress bar animation
  useEffect(() => {
    if (!isPlaying) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + (100 / 60) // 6 seconds = 60 frames
      })
    }, 100)

    return () => clearInterval(progressInterval)
  }, [isPlaying, currentIndex])

  // 🎧 Voice playback handler
  const toggleVoice = () => {
    if (!audioRef.current) return

    if (isVoicePlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsVoicePlaying(!isVoicePlaying)
  }

  // 🎯 Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setProgress(0)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setProgress(0)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-[#232d6e] to-[#1a2556]">
      {/* Animated Background Gradient */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#26a5de]/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#f29100]/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Star className="w-4 h-4 text-[#f29100]" />
            <span className="text-white font-semibold text-sm">
              Plus de 3500 étudiants nous font confiance
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
            Ils ont réalisé leur{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#f29100] via-[#ff9e0a] to-[#f29100] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                rêve
              </span>
              <span className="absolute bottom-2 left-0 h-3 w-full bg-[#f29100]/30 blur-sm -z-10" />
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les témoignages authentiques de nos étudiants qui ont transformé leur avenir
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onHoverStart={() => setIsPlaying(false)}
              onHoverEnd={() => setIsPlaying(true)}
              className="relative"
            >
              {/* Sentiment Glow Effect */}
              <div 
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-50 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${sentiment.glow} 0%, transparent 70%)`
                }}
              />

              {/* Card Content */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="grid md:grid-cols-[auto,1fr] gap-8 items-center">
                  {/* Student Photo + Voice */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative"
                  >
                    {/* Photo */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                      <div 
                        className="absolute inset-0 rounded-full blur-xl opacity-60"
                        style={{
                          background: `linear-gradient(135deg, ${sentiment.from}, ${sentiment.to})`
                        }}
                      />
                      <Image
                        src={currentTestimonial.photo}
                        alt={currentTestimonial.name}
                        width={160}
                        height={160}
                        className="relative z-10 w-full h-full rounded-full object-cover border-4 border-white/20"
                      />

                      {/* Voice Play Button (if available) */}
                      {currentTestimonial.voiceUrl && (
                        <motion.button
                          onClick={toggleVoice}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute bottom-0 right-0 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-[#f29100] to-[#ff9e0a] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
                        >
                          {isVoicePlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5 ml-1" />
                          )}
                        </motion.button>
                      )}
                    </div>

                    {/* Country Flags */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center gap-2 mt-4"
                    >
                      <span className="text-3xl">{currentTestimonial.country.originFlag}</span>
                      <span className="text-white/60">→</span>
                      <span className="text-3xl">{currentTestimonial.country.destinationFlag}</span>
                    </motion.div>
                  </motion.div>

                  {/* Quote Content */}
                  <div className="space-y-6">
                    {/* Quote Icon */}
                    <Quote className="w-12 h-12 text-[#f29100] opacity-50" />

                    {/* Quote Text */}
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light italic"
                    >
                      "{currentTestimonial.quote}"
                    </motion.p>

                    {/* Student Info */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      {/* Name + Rating */}
                      <div className="flex items-center gap-4 flex-wrap">
                        <h3 className="text-2xl font-bold text-white">
                          {currentTestimonial.name}
                        </h3>
                        <div className="flex gap-1">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#f29100] text-[#f29100]" />
                          ))}
                        </div>
                      </div>

                      {/* Program Badges */}
                      <div className="flex flex-wrap gap-3">
                        {/* Degree Badge */}
                        <div 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r backdrop-blur-sm border border-white/20"
                          style={{
                            backgroundImage: `linear-gradient(135deg, ${sentiment.from}20, ${sentiment.to}20)`
                          }}
                        >
                          <GraduationCap className="w-4 h-4 text-white" />
                          <span className="text-white font-medium text-sm">
                            {currentTestimonial.program.degree} en {currentTestimonial.program.field}
                          </span>
                        </div>

                        {/* Year Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                          <Calendar className="w-4 h-4 text-white" />
                          <span className="text-white font-medium text-sm">
                            {currentTestimonial.program.year}
                          </span>
                        </div>

                        {/* Destination Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                          <MapPin className="w-4 h-4 text-white" />
                          <span className="text-white font-medium text-sm">
                            {currentTestimonial.country.destination}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-8 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${sentiment.from}, ${sentiment.to})`
                    }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
              </div>

              {/* Hidden Audio Element */}
              {currentTestimonial.voiceUrl && (
                <audio
                  ref={audioRef}
                  src={currentTestimonial.voiceUrl}
                  onEnded={() => setIsVoicePlaying(false)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setProgress(0)
                  }}
                  className={`transition-all ${
                    index === currentIndex
                      ? 'w-12 h-3 rounded-full'
                      : 'w-3 h-3 rounded-full'
                  }`}
                  style={{
                    background: index === currentIndex
                      ? `linear-gradient(90deg, ${sentiment.from}, ${sentiment.to})`
                      : 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Play/Pause Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              {isPlaying ? 'Pause auto-play' : 'Resume auto-play'}
            </button>
          </div>
        </div>

        {/* CTA Slide-in (after 3 testimonials) */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed bottom-8 right-8 z-50 max-w-sm"
            >
              <div className="bg-gradient-to-r from-[#f29100] to-[#ff9e0a] rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">
                      Prêt à réaliser votre rêve ?
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      Parlez à un conseiller et commencez votre parcours aujourd'hui
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#f29100] font-bold hover:bg-gray-100 transition-colors"
                    >
                      Parler à un conseiller
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <button
                    onClick={() => setShowCTA(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
