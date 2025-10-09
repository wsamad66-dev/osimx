'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ImagePanelProps {
  imageUrl: string
  alt: string
  countryName: string
}

export default function ImagePanel({ imageUrl, alt, countryName }: ImagePanelProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={countryName}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.15)] group"
      >
        {/* Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Decorative corner accent */}
        <div className="absolute top-4 right-4 w-16 h-16 border-t-4 border-r-4 border-[#EAB308] rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-4 border-l-4 border-[#EAB308] rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Subtle shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  )
}
