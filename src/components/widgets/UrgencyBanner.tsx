'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertCircle, Users, TrendingUp, X } from 'lucide-react'

interface UrgencyBannerProps {
  type?: 'countdown' | 'limited-spots' | 'live-activity' | 'seasonal'
  initialSpots?: number
  deadline?: Date
  dismissible?: boolean
}

export function UrgencyBanner({
  type = 'limited-spots',
  initialSpots = 3,
  deadline,
  dismissible = true,
}: UrgencyBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 6, minutes: 45, seconds: 30 })
  const [spotsLeft, setSpotsLeft] = useState(initialSpots)
  const [liveCount, setLiveCount] = useState(15)

  // Countdown timer
  useEffect(() => {
    if (type !== 'countdown') return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [type])

  // Simulate spot reduction
  useEffect(() => {
    if (type !== 'limited-spots') return

    const interval = setInterval(() => {
      setSpotsLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 2)))
    }, 120000) // Every 2 minutes

    return () => clearInterval(interval)
  }, [type])

  // Live activity counter
  useEffect(() => {
    if (type !== 'live-activity') return

    const interval = setInterval(() => {
      setLiveCount(prev => Math.max(10, prev + Math.floor(Math.random() * 5) - 2))
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [type])

  if (!isVisible) return null

  const renderContent = () => {
    switch (type) {
      case 'countdown':
        return (
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 animate-bounce-subtle" />
            <span className="hidden md:inline">
              🚨 Inscriptions ferment dans:
            </span>
            <span className="md:hidden">🚨 Fermeture dans:</span>
            <div className="flex items-center gap-2 font-mono font-bold">
              <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.days}j</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span>:</span>
              <span className="bg-white/20 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="hidden sm:inline">:</span>
              <span className="bg-white/20 px-2 py-1 rounded hidden sm:inline">
                {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>
        )

      case 'limited-spots':
        return (
          <div className="flex items-center gap-4">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span className="hidden md:inline">
              🚨 Plus que <strong>{spotsLeft} places disponibles</strong> pour la rentrée de Septembre
            </span>
            <span className="md:hidden">
              🚨 <strong>{spotsLeft} places</strong> restantes
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-5 h-5" />
            </motion.div>
          </div>
        )

      case 'live-activity':
        return (
          <div className="flex items-center gap-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <Users className="w-5 h-5" />
            <span className="hidden md:inline">
              <strong>{liveCount} étudiants</strong> consultent ce programme en ce moment
            </span>
            <span className="md:hidden">
              <strong>{liveCount}</strong> en ligne
            </span>
          </div>
        )

      case 'seasonal':
        return (
          <div className="flex items-center gap-4">
            <AlertCircle className="w-5 h-5" />
            <span className="hidden md:inline">
              🎓 <strong>Rentrée 2025:</strong> Dernières places disponibles pour nos programmes premium
            </span>
            <span className="md:hidden">
              🎓 Dernières places 2025
            </span>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-center relative">
            {renderContent()}

            {dismissible && (
              <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Multi-banner component that can show multiple urgency types
export function UrgencyBanners() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const banners = [
    { type: 'limited-spots' as const, duration: 10000 },
    { type: 'countdown' as const, duration: 10000 },
    { type: 'live-activity' as const, duration: 10000 },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, banners[currentBanner].duration)

    return () => clearInterval(interval)
  }, [currentBanner, banners])

  return <UrgencyBanner type={banners[currentBanner].type} dismissible={false} />
}
