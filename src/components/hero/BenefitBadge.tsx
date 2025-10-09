'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Users, Globe, CheckCircle, Star } from 'lucide-react'
import type { HeroBenefit } from '@/lib/sanity-queries'

// Icon mapping
const iconMap = {
  shield: Shield,
  clock: Clock,
  users: Users,
  globe: Globe,
  check: CheckCircle,
  star: Star,
}

interface BenefitBadgeProps {
  benefit: HeroBenefit
  index: number
}

export function BenefitBadge({ benefit, index }: BenefitBadgeProps) {
  const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || CheckCircle

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-[#26a5de]/30">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#26a5de]/5 to-[#232d6e]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#26a5de] to-[#232d6e] mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-[#232d6e] mb-2 group-hover:text-[#26a5de] transition-colors duration-300">
            {benefit.title}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {benefit.description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#f29100]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  )
}
