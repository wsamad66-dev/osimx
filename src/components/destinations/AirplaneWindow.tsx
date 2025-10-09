'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface AirplaneWindowProps {
  imageUrl: string
  title: string
  subtitle: string
  buttonText: string
  slug: string
  isSelected: boolean
  onClick: () => void
  index: number
}

export default function AirplaneWindow({
  imageUrl,
  title,
  subtitle,
  buttonText,
  slug,
  isSelected,
  onClick,
  index
}: AirplaneWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      onClick={onClick}
    >
      {/* Airplane Window Container */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50">
        {/* Background Image (Country View) */}
        <motion.div
          animate={{
            scale: isSelected ? 1.1 : 1,
            opacity: isSelected ? 1 : 0.85
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={`Vue aérienne de ${title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index === 0}
          />
        </motion.div>

        {/* Airplane Window Frame Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Window frame shadow */}
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
          
          {/* Window reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-3xl" />
        </div>

        {/* Content Overlay (appears on selected or hover) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isSelected ? 1 : 0,
            y: isSelected ? 0 : 20
          }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-6 md:p-8 rounded-3xl"
        >
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ 
              y: isSelected ? 0 : 10, 
              opacity: isSelected ? 1 : 0 
            }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-2"
          >
            {title}
          </motion.h3>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ 
              y: isSelected ? 0 : 10, 
              opacity: isSelected ? 1 : 0 
            }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-center text-sm md:text-base mb-6 max-w-xs"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ 
              y: isSelected ? 0 : 10, 
              opacity: isSelected ? 1 : 0 
            }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`/destinations/${slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={(e) => e.stopPropagation()}
            >
              {buttonText}
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* Selected Border Indicator */}
        {isSelected && (
          <motion.div
            layoutId="selectedBorder"
            className="absolute inset-0 rounded-3xl border-4 border-yellow-400 pointer-events-none"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}

        {/* Hover Ring Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-3xl ring-4 ring-blue-400/50 pointer-events-none"
        />
      </div>

      {/* Country Label (always visible) */}
      <motion.div
        animate={{
          scale: isSelected ? 1.05 : 1,
          fontWeight: isSelected ? 700 : 600
        }}
        className="mt-4 text-center"
      >
        <h4 className={`text-lg md:text-xl transition-colors duration-300 ${
          isSelected ? 'text-blue-600 font-bold' : 'text-gray-700 font-semibold'
        }`}>
          {title.split(' ')[2] || title.split(' ')[1]} {/* Extract country name */}
        </h4>
      </motion.div>
    </motion.div>
  )
}
