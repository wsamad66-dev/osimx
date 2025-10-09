'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Users, Globe, Sparkles, Award, Target } from 'lucide-react'
import Link from 'next/link'
import { fadeUpVariants, staggerContainerVariants } from '@/hooks/useScrollReveal'

export function EnhancedHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#26a5de] via-[#232d6e] to-[#232d6e]">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-[#26a5de]/40 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tl from-[#f29100]/40 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-radial from-[#26a5de]/30 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Premium Badge */}
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white font-semibold text-sm">
                #1 Agence d'accompagnement étudiants africains
              </span>
            </motion.div>

            {/* Main Headline with Animated Gradient */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
            >
              <span className="text-white">
                Transformez votre{' '}
              </span>
              <motion.span
                className="relative inline-block"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                <span className="relative z-10 bg-gradient-to-r from-[#f29100] via-[#ff9e0a] to-[#f29100] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
                  avenir
                </span>
                <motion.span
                  animate={{ 
                    width: ['0%', '100%', '100%'],
                    opacity: [0, 1, 1]
                  }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute bottom-2 left-0 h-3 bg-[#f29100]/30 blur-sm -z-10"
                />
              </motion.span>
              <span className="text-white">
                {' '}avec des études à l'étranger
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={fadeUpVariants}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Accompagnement complet et personnalisé pour étudiants africains.
              <span className="text-white font-semibold"> De l'admission au visa</span>,
              nous transformons votre rêve en réalité.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6"
            >
              {[
                { icon: CheckCircle, text: '95% de réussite', color: 'text-[#f29100]' },
                { icon: Users, text: '3500+ étudiants', color: 'text-[#26a5de]' },
                { icon: Globe, text: '25+ pays', color: 'text-[#ffffff]' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm text-white font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#f29100] to-[#ff9e0a] hover:from-[#ff9e0a] hover:to-[#f29100] text-white font-bold transition-all duration-300 shadow-lg shadow-[#f29100]/50 hover:shadow-xl hover:shadow-[#f29100]/60 hover:scale-105 overflow-hidden"
                aria-label="Démarrer mon projet d'études à l'étranger"
              >
                {/* Shine effect */}
                <motion.span
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Démarrer mon projet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm hover:scale-105"
                aria-label="Découvrir nos services"
              >
                Découvrir nos services
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats Cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { 
                  icon: Award, 
                  value: '95%', 
                  label: 'Taux de réussite',
                  color: 'from-[#f29100] to-[#d97e00]',
                  delay: 0
                },
                { 
                  icon: Users, 
                  value: '3500+', 
                  label: 'Étudiants aidés',
                  color: 'from-[#26a5de] to-[#1d8bc4]',
                  delay: 0.1
                },
                { 
                  icon: Target, 
                  value: '200+', 
                  label: 'Universités',
                  color: 'from-[#232d6e] to-[#1a2556]',
                  delay: 0.2
                },
                { 
                  icon: Globe, 
                  value: '25+', 
                  label: 'Pays partenaires',
                  color: 'from-[#26a5de] to-[#26a5de]',
                  delay: 0.3
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariants}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <stat.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#f29100]/20 to-[#ff9e0a]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#26a5de]/20 to-[#232d6e]/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
        aria-label="Défiler vers le bas"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
