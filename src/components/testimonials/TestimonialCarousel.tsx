'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import TestimonialCard from './TestimonialCard'
import type { Testimonial } from '@/lib/sanity/client'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showCTA, setShowCTA] = useState(false)
  const [viewedCount, setViewedCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const AUTO_SLIDE_INTERVAL = 6000 // 6 seconds
  const PROGRESS_UPDATE_RATE = 60 // 60fps

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setProgress(0)
    setViewedCount((prev) => prev + 1)
  }, [testimonials.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setProgress(0)
  }, [testimonials.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
  }, [])

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return

    // Clear existing intervals
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)

    // Progress bar animation
    const progressIncrement = 100 / (AUTO_SLIDE_INTERVAL / (1000 / PROGRESS_UPDATE_RATE))
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + progressIncrement
      })
    }, 1000 / PROGRESS_UPDATE_RATE)

    // Auto-slide to next
    intervalRef.current = setInterval(goToNext, AUTO_SLIDE_INTERVAL)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    }
  }, [isAutoPlaying, goToNext])

  // Show CTA after 3 testimonials
  useEffect(() => {
    if (viewedCount > 0 && viewedCount % 3 === 0) {
      setShowCTA(true)
      // Auto-hide CTA after 5 seconds
      const timeout = setTimeout(() => setShowCTA(false), 5000)
      return () => clearTimeout(timeout)
    }
  }, [viewedCount])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === ' ') {
        e.preventDefault()
        setIsAutoPlaying((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrev])

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-xl">Aucun témoignage disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      role="region"
      aria-label="Carrousel de témoignages étudiants"
      aria-live="polite"
    >
      {/* Testimonial Cards */}
      <div className="relative min-h-[500px] md:min-h-[400px]">
        <AnimatePresence mode="wait">
          <TestimonialCard
            key={testimonials[currentIndex]._id}
            testimonial={testimonials[currentIndex]}
            isActive={true}
            index={currentIndex}
          />
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#26a5de] via-[#f29100] to-[#232d6e]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
          aria-label="Progression automatique"
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-8 gap-4">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f29100] focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Dot Pagination */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des témoignages">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f29100] ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-[#26a5de] to-[#f29100]'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Aller au témoignage ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
              role="tab"
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#f29100] focus:ring-offset-2 focus:ring-offset-transparent"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Play/Pause Control */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#f29100]"
          aria-label={isAutoPlaying ? 'Mettre en pause le défilement automatique' : 'Activer le défilement automatique'}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span className="text-sm">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="text-sm">Lecture</span>
            </>
          )}
        </button>
      </div>

      {/* Slide-in CTA after 3 testimonials */}
      <AnimatePresence>
        {showCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f29100] to-[#ff9e0a] text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_10px_40px_rgba(242,145,0,0.5)] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#f29100]/50"
              aria-label="Parler à un conseiller"
            >
              <span className="text-2xl">💬</span>
              <span>Parler à un conseiller</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="text-2xl"
              >
                →
              </motion.div>

              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#f29100] blur-xl opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setShowCTA(false)}
              className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white backdrop-blur-sm transition-all duration-300"
              aria-label="Fermer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Counter Display */}
      <div className="text-center mt-6 text-white/70 text-sm">
        Témoignage {currentIndex + 1} sur {testimonials.length}
      </div>

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
