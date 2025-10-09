'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface InfoPanelProps {
  flag: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  countryName: string
}

export default function InfoPanel({
  flag,
  title,
  description,
  ctaText,
  ctaLink,
  countryName
}: InfoPanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={countryName}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-white rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] p-8 md:p-12 h-full flex flex-col justify-center"
      >
        {/* Flag */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-6xl md:text-7xl mb-6"
        >
          {flag}
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-6 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8"
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href={ctaLink}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#EAB308] to-[#FACC15] hover:from-[#FACC15] hover:to-[#EAB308] text-gray-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-200 transition-all duration-300 hover:scale-105 group"
          >
            {ctaText}
            <svg
              className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1E3A8A]/5 to-transparent rounded-bl-[100px] -z-10" />
      </motion.div>
    </AnimatePresence>
  )
}
