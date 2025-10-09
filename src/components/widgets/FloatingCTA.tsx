'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, UserPlus } from 'lucide-react'
import { useCTAFloat } from '@/hooks/useCTAFloat'
import { RegistrationModal } from '@/components/registration/RegistrationModal'

export function FloatingCTA() {
  const { isVisible } = useCTAFloat({ showAfterScrollPercent: 50, hideBeforeEndPercent: 95 })
  const [isDismissed, setIsDismissed] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  if (isDismissed) return null

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Mobile Version (Bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 overflow-hidden"
              aria-label="S'inscrire maintenant"
            >
              {/* Breathing animation background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
              />
              
              {/* Shine effect */}
              <motion.div
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />

              <UserPlus className="w-5 h-5 relative z-10" />
              <span className="relative z-10">S'inscrire maintenant</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10"
              >
                ✨
              </motion.span>
            </button>

            {/* Dismiss button for mobile */}
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsDismissed(true)
              }}
              className="absolute -top-2 -right-2 p-1.5 bg-gray-900 rounded-full text-white shadow-lg hover:bg-gray-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Desktop Version (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-8 left-8 z-50 hidden md:block"
          >
            <div className="relative">
              {/* Pulse rings */}
              <motion.span
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-orange-500"
              />
              <motion.span
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 0, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full bg-orange-400"
              />

              {/* Main button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 overflow-hidden hover:scale-105"
                aria-label="S'inscrire maintenant"
              >
                {/* Breathing animation background */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                />
                
                {/* Rotating gradient */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                {/* Icon with bounce */}
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="relative z-10"
                >
                  <UserPlus className="w-5 h-5" />
                </motion.div>
                
                <span className="relative z-10 whitespace-nowrap">S'inscrire maintenant</span>
                
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  ✨
                </motion.span>
              </button>

              {/* Dismiss button */}
              <button
                onClick={() => setIsDismissed(true)}
                className="absolute -top-2 -right-2 p-1.5 bg-gray-900 rounded-full text-white shadow-lg hover:bg-gray-800 transition-colors hover:scale-110"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

            {/* WhatsApp button removed - using WhatsAppWidget in layout instead */}
          </>
        )}
      </AnimatePresence>

      {/* Registration Modal - Outside AnimatePresence to prevent conflicts */}
      {isModalOpen && (
        <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
