'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

interface CookieBannerProps {
  onAccept?: () => void
  onRefuse?: () => void
}

export default function CookieBanner({ onAccept, onRefuse }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent')
    
    if (consent === null) {
      // No choice made yet - show banner after small delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
    
    setIsLoaded(true)
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
    
    // Trigger callback if provided
    if (onAccept) {
      onAccept()
    }
    
    // Reload analytics or other tracking scripts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentAccepted'))
    }
  }

  const handleRefuse = () => {
    localStorage.setItem('cookieConsent', 'refused')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
    
    // Trigger callback if provided
    if (onRefuse) {
      onRefuse()
    }
    
    // Notify that cookies were refused
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('cookieConsentRefused'))
    }
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.2 }
          }}
          className="fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none"
          role="dialog"
          aria-live="polite"
          aria-label="Consentement des cookies"
        >
          <div className="pointer-events-auto bg-gray-800/95 backdrop-blur-md border-t border-gray-700 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Message Section */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <Cookie className="w-6 h-6 text-orange-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      <span className="font-semibold">🍪 Ce site utilise des cookies</span>
                      {' '}pour améliorer votre expérience et analyser le trafic. 
                      En continuant, vous acceptez notre utilisation des cookies conformément à notre{' '}
                      <a 
                        href="/politique-confidentialite" 
                        className="underline hover:text-orange-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        politique de confidentialité
                      </a>.
                    </p>
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-shrink-0">
                  <button
                    onClick={handleRefuse}
                    className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-label="Refuser les cookies"
                  >
                    ❌ Refuser
                  </button>
                  
                  <button
                    onClick={handleAccept}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    aria-label="Accepter les cookies"
                  >
                    ✅ Accepter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
