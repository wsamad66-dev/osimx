'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimationFrame } from 'framer-motion'

/**
 * Partner logo interface
 */
export interface Partner {
  name: string
  logo: string
  country?: string
  _key?: string
}

/**
 * PartnersBanner Props
 */
interface PartnersBannerProps {
  /** List of partners with logos */
  partners?: Partner[]
  /** Animation speed (lower = faster, default: 50) */
  speed?: number
  /** Pause animation on hover (default: true) */
  pauseOnHover?: boolean
  /** Section title (default: "🎓 Ils nous font confiance") */
  title?: string
  /** Show title (default: true) */
  showTitle?: boolean
}

/**
 * Default partners list (fallback)
 */
const defaultPartners: Partner[] = [
  { name: 'Université de la Sorbonne', logo: '/images/partners/sorbonne.png', country: 'France', _key: 'sorbonne' },
  { name: 'Université de Montréal', logo: '/images/partners/udem.png', country: 'Canada', _key: 'udem' },
  { name: 'UCLouvain', logo: '/images/partners/uclouvain.png', country: 'Belgique', _key: 'uclouvain' },
  { name: 'Université Laval', logo: '/images/partners/ulaval.png', country: 'Canada', _key: 'ulaval' },
  { name: 'HEC Montréal', logo: '/images/partners/hec-montreal.png', country: 'Canada', _key: 'hec' },
  { name: 'Sciences Po', logo: '/images/partners/sciences-po.png', country: 'France', _key: 'sciencespo' },
  { name: 'McGill University', logo: '/images/partners/mcgill.png', country: 'Canada', _key: 'mcgill' },
  { name: 'Polytechnique Montréal', logo: '/images/partners/polytechnique.png', country: 'Canada', _key: 'poly' },
]

/**
 * PartnersBanner Component
 * 
 * Displays partner university logos in an infinite scrolling banner
 * with smooth animations and hover effects.
 * 
 * @example
 * ```tsx
 * <PartnersBanner 
 *   partners={customPartners} 
 *   speed={30}
 *   pauseOnHover={true}
 * />
 * ```
 */
export function PartnersBanner({
  partners = defaultPartners,
  speed = 50,
  pauseOnHover = true,
  title = "🎓 Ils nous font confiance",
  showTitle = true,
}: PartnersBannerProps) {
  const [isPaused, setIsPaused] = React.useState(false)
  const scrollRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Duplicate partners array for seamless loop
  const duplicatedPartners = [...partners, ...partners, ...partners]

  // Smooth infinite scroll animation
  useAnimationFrame((time, delta) => {
    if (!isPaused && containerRef.current) {
      // Increment scroll position
      scrollRef.current -= delta / speed
      
      // Get container width to calculate reset point
      const containerWidth = containerRef.current.scrollWidth / 3
      
      // Reset when we've scrolled through one full set
      if (Math.abs(scrollRef.current) >= containerWidth) {
        scrollRef.current = 0
      }
      
      // Apply transform
      containerRef.current.style.transform = `translateX(${scrollRef.current}px)`
    }
  })

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plus de <span className="font-semibold text-blue-600">100+ universités partenaires</span> dans le monde entier
            </p>
          </motion.div>
        )}

        {/* Scrolling Banner Container */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling logos wrapper */}
          <div
            className="overflow-hidden py-8"
            onMouseEnter={() => pauseOnHover && setIsPaused(true)}
            onMouseLeave={() => pauseOnHover && setIsPaused(false)}
          >
            <div
              ref={containerRef}
              className="flex gap-12 sm:gap-16 items-center will-change-transform"
              style={{ width: 'max-content' }}
            >
              {duplicatedPartners.map((partner, index) => (
                <LogoCard
                  key={`${partner._key || partner.name}-${index}`}
                  partner={partner}
                  isPaused={isPaused}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500">
            🌍 Partenariats dans <span className="font-semibold">15 pays</span> • 
            🎓 <span className="font-semibold">10,000+</span> étudiants placés
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Individual Partner Logo Card
 */
interface LogoCardProps {
  partner: Partner
  isPaused: boolean
}

function LogoCard({ partner, isPaused }: LogoCardProps) {
  return (
    <motion.div
      className="relative group flex-shrink-0 w-40 h-24 sm:w-48 sm:h-28 bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Logo image */}
      <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
        <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500">
          <Image
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 160px, 192px"
            onError={(e) => {
              // Fallback for missing images
              const target = e.target as HTMLImageElement
              target.src = '/images/partners/placeholder.png'
            }}
          />
        </div>
      </div>

      {/* Hover overlay with university name */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-3">
        <div className="text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs sm:text-sm font-semibold leading-tight">
            {partner.name}
          </p>
          {partner.country && (
            <p className="text-blue-100 text-xs mt-1">
              {partner.country}
            </p>
          )}
        </div>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
        animate={isPaused ? {} : { x: ['0%', '200%'] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

/**
 * Variant: Compact Partners Banner (for footer or smaller sections)
 */
export function CompactPartnersBanner({
  partners = defaultPartners,
  speed = 40,
}: Pick<PartnersBannerProps, 'partners' | 'speed'>) {
  const scrollRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const duplicatedPartners = [...partners, ...partners, ...partners]

  useAnimationFrame((time, delta) => {
    if (containerRef.current) {
      scrollRef.current -= delta / speed
      const containerWidth = containerRef.current.scrollWidth / 3
      
      if (Math.abs(scrollRef.current) >= containerWidth) {
        scrollRef.current = 0
      }
      
      containerRef.current.style.transform = `translateX(${scrollRef.current}px)`
    }
  })

  return (
    <div className="relative py-8 bg-gray-50 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
      
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-8 items-center will-change-transform"
          style={{ width: 'max-content' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner._key || partner.name}-${index}`}
              className="relative w-24 h-16 sm:w-32 sm:h-20 bg-white rounded-lg shadow-sm flex-shrink-0 p-3 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain p-2"
                sizes="128px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
