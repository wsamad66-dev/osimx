'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, User, Mail, Phone, Globe, CheckCircle2, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  country: string
}

interface AppointmentFormProps {
  /** Optional className for custom styling */
  className?: string
  /** Show as inline form or as a section */
  variant?: 'inline' | 'section'
  /** Callback after successful booking */
  onSuccess?: () => void
}

const countries = [
  { value: '', label: 'Sélectionnez un pays' },
  { value: 'france', label: 'France 🇫🇷' },
  { value: 'canada', label: 'Canada 🇨🇦' },
  { value: 'usa', label: 'États-Unis 🇺🇸' },
  { value: 'uk', label: 'Royaume-Uni 🇬🇧' },
  { value: 'belgique', label: 'Belgique 🇧🇪' },
  { value: 'suisse', label: 'Suisse 🇨🇭' },
  { value: 'allemagne', label: 'Allemagne 🇩🇪' },
  { value: 'italie', label: 'Italie 🇮🇹' },
  { value: 'espagne', label: 'Espagne 🇪🇸' },
  { value: 'chine', label: 'Chine 🇨🇳' },
  { value: 'autre', label: 'Autre' },
]

export function AppointmentForm({ className = '', variant = 'section', onSuccess }: AppointmentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Save lead to Sanity
      const response = await fetch('/api/save-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to save lead')
      }

      // Track event in GA4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'appointment_form_submitted', {
          event_category: 'engagement',
          event_label: formData.country || 'no_country',
        })
      }

      // Show modal with zcal
      setShowModal(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setShowSuccess(true)

    // Track booking event in GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'appointment_booked', {
        event_category: 'conversion',
        event_label: formData.country || 'no_country',
        value: 1,
      })
    }

    // Reset form
    setFormData({ name: '', email: '', phone: '', country: '' })

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false)
      onSuccess?.()
    }, 5000)
  }

  const formContent = (
    <>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-navy-900 mb-2">
          Prendre un rendez-vous
        </h2>
        <p className="text-gray-600">
          Réservez votre consultation gratuite de 30 minutes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="Votre nom complet"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              placeholder="votre.email@exemple.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Téléphone <span className="text-gray-400 text-xs">(optionnel)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+33 6 12 34 56 78"
            />
          </div>
        </div>

        {/* Country Field */}
        <div>
          <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">
            Pays d'intérêt <span className="text-gray-400 text-xs">(optionnel)</span>
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              Réserver ma consultation gratuite
            </>
          )}
        </motion.button>

        {/* Privacy Notice */}
        <p className="text-xs text-gray-500 text-center">
          En soumettant ce formulaire, vous acceptez notre{' '}
          <a href="/politique-confidentialite" className="text-blue-600 hover:text-blue-700 underline">
            politique de confidentialité
          </a>
        </p>
      </form>
    </>
  )

  return (
    <>
      {/* Form Section */}
      {variant === 'section' ? (
        <section className={`py-16 px-4 bg-gradient-to-b from-blue-50 to-white ${className}`}>
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8">
            {formContent}
          </div>
        </section>
      ) : (
        <div className={`bg-white rounded-2xl shadow-lg p-8 ${className}`}>
          {formContent}
        </div>
      )}

      {/* Zcal Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] relative shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 group"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-2xl font-bold mb-2">
                  Choisissez votre créneau
                </h3>
                <p className="text-blue-100">
                  Sélectionnez la date et l'heure qui vous conviennent le mieux
                </p>
              </div>

              {/* Zcal Iframe */}
              <div className="h-[calc(100%-120px)] overflow-auto">
                <iframe
                  src="https://zcal.co/i/CW2aTnAb"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  className="w-full h-full"
                  title="Réserver votre consultation"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-md"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Rendez-vous confirmé !</h4>
              <p className="text-sm text-green-100">
                Vous recevrez un email de confirmation sous peu.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
