'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Play, Pause } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import type { Testimonial } from '@/lib/sanity/client'

interface TestimonialCardProps {
  testimonial: Testimonial
  isActive: boolean
  index: number
}

export default function TestimonialCard({ testimonial, isActive, index }: TestimonialCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Sentiment-based glow colors
  const sentimentColors = {
    excited: 'shadow-[0_0_30px_rgba(242,145,0,0.6)] border-orange-500/50',
    grateful: 'shadow-[0_0_30px_rgba(38,165,222,0.6)] border-blue-500/50',
    confident: 'shadow-[0_0_30px_rgba(35,45,110,0.6)] border-[#232d6e]/50',
    happy: 'shadow-[0_0_30px_rgba(147,51,234,0.6)] border-purple-500/50',
  }

  const sentimentGlow = sentimentColors[testimonial.sentiment] || sentimentColors.happy

  // Handle voice playback
  const toggleVoice = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`relative w-full h-full ${isActive ? sentimentGlow : ''}`}
    >
      {/* Glassmorphism Card */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl border-2 border-white/20 p-8 md:p-12 h-full overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'linear-gradient(135deg, #26a5de 0%, #232d6e 50%, #f29100 100%)',
              'linear-gradient(135deg, #f29100 0%, #26a5de 50%, #232d6e 100%)',
              'linear-gradient(135deg, #232d6e 0%, #f29100 50%, #26a5de 100%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        {/* Content Grid */}
        <div className="relative z-10 grid md:grid-cols-[200px_1fr] gap-8 items-center">
          {/* Student Image with Scale Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 100 }}
            className="mx-auto"
          >
            <div className="relative w-40 h-40 md:w-48 md:h-48">
              <Image
                src={testimonial.studentImage}
                alt={`Photo de ${testimonial.studentName}`}
                fill
                className="rounded-full object-cover ring-4 ring-white/30 shadow-2xl"
                sizes="(max-width: 768px) 160px, 192px"
              />
              {/* Rating Badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#f29100] to-[#ff9e0a] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{testimonial.rating}</span>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Content */}
          <div className="space-y-4">
            {/* Student Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {testimonial.studentName}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-white/90">
                <span className="flex items-center gap-1">
                  <span className="text-2xl">{testimonial.originFlag}</span>
                  <span>{testimonial.originCountry}</span>
                </span>
                <span className="text-white/50">→</span>
                <span className="flex items-center gap-1">
                  <span className="text-2xl">{testimonial.destinationFlag}</span>
                  <span>{testimonial.destinationCountry}</span>
                </span>
              </div>
              <p className="text-[#f29100] font-semibold mt-2">
                {testimonial.degree} • {testimonial.programName} • {testimonial.graduationYear}
              </p>
            </motion.div>

            {/* Testimonial Quote with Fade Animation */}
            <motion.blockquote
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/95 text-lg md:text-xl italic leading-relaxed"
            >
              "{testimonial.testimonialText}"
            </motion.blockquote>

            {/* Star Rating with Slide-Up Animation */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-2"
              aria-label={`Note: ${testimonial.rating} sur 5 étoiles`}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Star
                    className={`w-6 h-6 ${
                      i < testimonial.rating
                        ? 'fill-[#f29100] text-[#f29100]'
                        : 'fill-white/20 text-white/20'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Voice Playback Button (Optional) */}
            {testimonial.voiceUrl && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                onClick={toggleVoice}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300 backdrop-blur-sm"
                aria-label={isPlaying ? 'Mettre en pause le témoignage vocal' : 'Écouter le témoignage vocal'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Écouter le témoignage</span>
                  </>
                )}
              </motion.button>
            )}

            {/* Hidden Audio Element */}
            {testimonial.voiceUrl && (
              <audio ref={audioRef} src={testimonial.voiceUrl} preload="metadata" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
