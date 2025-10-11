'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Globe, Star, Users, ArrowRight, Phone, Clock } from 'lucide-react'
import Image from 'next/image'

interface NewHeroSectionProps {
  onOpenQuiz?: () => void
  onContactClick?: () => void
}

export function NewHeroSection({ onOpenQuiz, onContactClick }: NewHeroSectionProps) {
  const [recentStudentsCount, setRecentStudentsCount] = useState(12)
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 6, minutes: 45 })

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentStudentsCount(prev => prev + Math.floor(Math.random() * 2))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59 }
        }
        return prev
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const trustBadges = [
    { icon: CheckCircle, text: '85% de taux de réussite', color: 'text-green-500' },
    { icon: Globe, text: '15 pays partenaires', color: 'text-blue-500' },
    { icon: Star, text: '4.9/5 satisfaction', color: 'text-yellow-500' },
  ]

  const studentAvatars = [
    { src: '/user1.svg', alt: 'Marie', name: 'Marie' },
    { src: '/user2.svg', alt: 'Ahmed', name: 'Ahmed' },
    { src: '/user3.svg', alt: 'Sophie', name: 'Sophie' },
    { src: '/user4.svg', alt: 'Lucas', name: 'Lucas' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-primary-600 pt-20 pb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Urgency Banner */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4"
      >
        <div className="bg-warning text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-3 text-sm md:text-base font-semibold">
          <Clock className="w-5 h-5 animate-bounce-subtle" />
          <span className="hidden md:inline">🚨 Plus que 3 places disponibles pour la rentrée de Septembre</span>
          <span className="md:hidden">🚨 3 places restantes</span>
          <span className="ml-2">•</span>
          <span className="font-mono">
            {timeLeft.days}j {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m
          </span>
        </div>
      </motion.div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Votre avenir commence par le{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-gold-400 via-orange-400 to-gold-500 bg-clip-text text-transparent">
                bon choix
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-gold-400/30 to-orange-400/30 blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle with Social Proof */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-light"
          >
            🎓 <strong className="font-semibold">10,000+ étudiants</strong> ont transformé leurs rêves d&apos;études à l&apos;étranger
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-6 py-3 flex items-center gap-3 shadow-lg hover:bg-white/15 transition-all"
              >
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
                <span className="text-white font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(242, 145, 0, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenQuiz}
              className="group relative bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-orange-lg hover:shadow-orange-lg transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                🎯 Trouver ma destination idéale
                <span className="text-sm font-normal">(2 min)</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onContactClick}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-5 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Parler à un conseiller
            </motion.button>
          </motion.div>

          {/* Social Proof - Recent Activity */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              {/* Student Avatars */}
              <div className="flex items-center -space-x-3">
                {studentAvatars.map((avatar, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full border-3 border-white/30 bg-gradient-to-br from-primary-400 to-navy-600 flex items-center justify-center overflow-hidden">
                      <Image
                        src={avatar.src}
                        alt={avatar.alt}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  className="w-12 h-12 rounded-full border-3 border-white/30 bg-gradient-to-br from-gold-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  +{recentStudentsCount}
                </motion.div>
              </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <p className="text-white font-semibold text-lg">
                  <motion.span
                    key={recentStudentsCount}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gold-400"
                  >
                    {recentStudentsCount} étudiants
                  </motion.span>{' '}
                  ont choisi leur destination cette semaine
                </p>
                <p className="text-white/70 text-sm mt-1">
                  <Users className="w-4 h-4 inline mr-1" />
                  15 personnes consultent ce programme en ce moment
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recent Registrations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-white/60 text-sm"
          >
            <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Marie et Ahmed viennent de s&apos;inscrire pour le Canada
            </span>
          </motion.div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
