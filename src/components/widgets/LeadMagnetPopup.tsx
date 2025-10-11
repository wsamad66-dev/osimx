'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, CheckCircle, Mail } from 'lucide-react'

interface LeadMagnetPopupProps {
  delay?: number
  trigger?: 'time' | 'exit-intent' | 'scroll'
}

export function LeadMagnetPopup({ delay = 15000, trigger = 'time' }: LeadMagnetPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if already shown in this session
    if (sessionStorage.getItem('leadMagnetShown')) {
      return
    }

    if (trigger === 'time') {
      const timer = setTimeout(() => {
        if (!hasShown) {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem('leadMagnetShown', 'true')
        }
      }, delay)

      return () => clearTimeout(timer)
    }

    if (trigger === 'exit-intent') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0 && !hasShown) {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem('leadMagnetShown', 'true')
        }
      }

      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }

    if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        
        if (scrollPercentage > 50 && !hasShown) {
          setIsOpen(true)
          setHasShown(true)
          sessionStorage.setItem('leadMagnetShown', 'true')
        }
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [delay, trigger, hasShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_magnet', {
        event_category: 'lead_generation',
        event_label: 'guide_download',
      })
    }

    // Here you would normally send to your backend/CRM
    console.log('Lead magnet submission:', { name, email })

    setIsSubmitted(true)

    // Auto-close after 5 seconds
    setTimeout(() => {
      setIsOpen(false)
    }, 5000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-gradient-to-br from-white via-white to-orange-50 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <div className="p-8 md:p-12">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-100 to-gold-100 rounded-2xl mb-6 shadow-lg"
              >
                <Download className="w-10 h-10 text-orange-600" />
              </motion.div>

              {/* Headline */}
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4 leading-tight">
                📚 Guide Gratuit: <br />
                <span className="text-primary-600">&quot;Les 10 erreurs à éviter&quot;</span>
              </h2>

              <p className="text-lg text-gray-700 mb-6">
                Téléchargez notre guide exclusif pour maximiser vos chances d&apos;admission à l&apos;étranger
              </p>

              {/* Benefits */}
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md border border-orange-100">
                <h3 className="font-semibold text-gray-800 mb-4">Ce que vous allez recevoir :</h3>
                <ul className="space-y-3">
                  {[
                    '✅ Les 10 erreurs critiques qui ruinent vos chances',
                    '✅ Notre checklist de 15 points pour réussir',
                    '✅ Templates de lettres de motivation gagnantes',
                    '✅ Liste des bourses méconnues (jusqu\'à 20,000€)',
                    '✅ Calendrier détaillé mois par mois',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Social Proof */}
              <p className="text-center text-sm text-gray-600 mb-6">
                <strong className="text-primary-600">+2,000 étudiants</strong> l&apos;ont déjà téléchargé
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Votre prénom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <Download className="w-6 h-6" />
                  Télécharger mon guide gratuit
                </motion.button>
              </form>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Vos données sont 100% sécurisées. Pas de spam, promis.
              </p>
            </div>
          ) : (
            /* Success State */
            <div className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
              >
                <CheckCircle className="w-16 h-16 text-green-600" />
              </motion.div>

              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                🎉 Merci {name} !
              </h2>

              <p className="text-lg text-gray-700 mb-6">
                Votre guide a été envoyé à <strong>{email}</strong>
              </p>

              <div className="bg-primary-50 rounded-xl p-6 mb-6">
                <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <p className="text-gray-700">
                  Vérifiez votre boîte de réception (et vos spams) pour télécharger votre guide.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-semibold transition-all"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200/30 to-gold-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-primary-200/30 to-navy-200/30 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
