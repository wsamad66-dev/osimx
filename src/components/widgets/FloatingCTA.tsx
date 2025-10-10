'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, UserPlus } from 'lucide-react'
import { useCTAFloat } from '@/hooks/useCTAFloat'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

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
            {/* Mobile Version (Bottom) - Simplifié */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-200 animate-pulse-subtle"
              aria-label="S'inscrire maintenant"
            >
              <UserPlus className="w-5 h-5" />
              <span>S'inscrire maintenant</span>
              <span>✨</span>
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

          {/* Desktop Version (Bottom Right) - Simplifié */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
          >
            <div className="relative">
              {/* Main button - Animation CSS uniquement */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-200 hover:scale-105 animate-pulse-subtle"
                aria-label="S'inscrire maintenant"
              >
                <UserPlus className="w-5 h-5" />
                <span className="whitespace-nowrap">S'inscrire maintenant</span>
                <span>✨</span>
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
        <QuickRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
