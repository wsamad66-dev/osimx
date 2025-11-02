'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Users, Globe, Target, TrendingUp, Building2, CheckCircle, Star } from 'lucide-react'
import { useAnimatedCounter, usePercentageCounter, usePlusCounter } from '@/hooks/useAnimatedCounter'
import { useScrollReveal, fadeUpVariants } from '@/hooks/useScrollReveal'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

interface StatCardProps {
  icon: React.ElementType
  value: number
  suffix?: string
  prefix?: string
  label: string
  description: string
  color: string
  delay?: number
  isPercentage?: boolean
  isPlus?: boolean
}

function StatCard({ 
  icon: Icon, 
  value, 
  suffix, 
  prefix, 
  label, 
  description,
  color, 
  delay = 0,
  isPercentage = false,
  isPlus = false
}: StatCardProps) {
  const percentageCounter = usePercentageCounter(value, 2000, delay * 100)
  const plusCounter = usePlusCounter(value, 2000, delay * 100)
  const regularCounter = useAnimatedCounter({ end: value, duration: 2000, delay: delay * 100 })

  const counter = isPercentage ? percentageCounter : isPlus ? plusCounter : regularCounter
  const displayValue = isPercentage 
    ? percentageCounter.formattedValue 
    : isPlus 
    ? plusCounter.formattedValue 
    : `${prefix || ''}${counter.displayValue}${suffix || ''}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-4">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Value - Attach ref here for animation trigger */}
        <div 
          ref={counter.ref}
          className="text-5xl font-extrabold text-gray-900 group-hover:text-white transition-colors duration-300 mb-2"
        >
          {displayValue}
        </div>

        {/* Label */}
        <div className="text-xl font-bold text-gray-800 group-hover:text-white/95 transition-colors duration-300 mb-2">
          {label}
        </div>

        {/* Description */}
        <div className="text-sm text-gray-600 group-hover:text-white/80 transition-colors duration-300">
          {description}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${color} rounded-bl-full`} />
      </div>

      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        animate={{
          translateX: ['100%', '-100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 5,
          ease: 'linear'
        }}
      />
    </motion.div>
  )
}

export function AnimatedStatsSection() {
  const { ref, variants } = useScrollReveal({ threshold: 0.2 })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stats = [
    {
      icon: Award,
      value: 95,
      label: 'Taux de réussite',
      description: 'Visa et admission garantis',
      color: 'from-green-500 to-green-700',
      isPercentage: true,
      delay: 0
    },
    {
      icon: Users,
      value: 3500,
      label: 'Étudiants accompagnés',
      description: 'Depuis 2018',
      color: 'from-blue-500 to-blue-700',
      isPlus: true,
      delay: 0.1
    },
    {
      icon: Globe,
      value: 25,
      label: 'Pays partenaires',
      description: 'Europe, Amérique, Asie',
      color: 'from-purple-500 to-purple-700',
      isPlus: true,
      delay: 0.2
    },
    {
      icon: Building2,
      value: 200,
      label: 'Universités',
      description: 'Partenaires certifiés',
      color: 'from-amber-500 to-amber-700',
      isPlus: true,
      delay: 0.3
    },
    {
      icon: Target,
      value: 100,
      label: 'Programmes disponibles',
      description: 'Licence, Master, Doctorat',
      color: 'from-orange-500 to-orange-700',
      isPlus: true,
      delay: 0.4
    },
    {
      icon: TrendingUp,
      value: 98,
      label: 'Satisfaction client',
      description: 'Avis vérifiés',
      color: 'from-pink-500 to-pink-700',
      isPercentage: true,
      delay: 0.5
    },
    {
      icon: CheckCircle,
      value: 24,
      label: 'Support disponible',
      description: '7 jours sur 7',
      suffix: '/7',
      color: 'from-cyan-500 to-cyan-700',
      delay: 0.6
    },
    {
      icon: Star,
      value: 5,
      label: 'Note moyenne',
      description: 'Sur Google & Trustpilot',
      suffix: '/5',
      color: 'from-yellow-500 to-yellow-700',
      delay: 0.7
    }
  ]

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            x: [-50, 50, -50],
            y: [-30, 30, -30]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [50, -50, 50],
            y: [30, -30, 30]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">
              Nos chiffres parlent d'eux-mêmes
            </span>
          </motion.div>

          <motion.h2 
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
          >
            Une expertise{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                prouvée
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-4 bg-blue-400/30 blur-sm -z-10" />
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeUpVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Des résultats concrets qui témoignent de notre engagement à faire réussir chaque étudiant
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Rejoindre nos étudiants"
          >
            <Star className="w-6 h-6" />
            <span>Rejoignez nos 500+ étudiants satisfaits</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </div>
        </motion.div>
      </div>

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
