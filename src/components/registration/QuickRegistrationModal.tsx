'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, X, CheckCircle2, Sparkles, User, Mail, Phone, Calendar, Globe } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { STATS } from '@/config/stats'

const quickRegistrationSchema = z.object({
  fullName: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, "Numéro invalide (ex: +221771234567)"),
  country: z.string().optional(),
})

type QuickRegistrationData = z.infer<typeof quickRegistrationSchema>

interface QuickRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

// Countries list organized by region - MOVED OUTSIDE COMPONENT TO BE CONSTANT
const COUNTRIES = [
  // Afrique
  { value: 'DZ', label: 'Algérie', flag: '🇩🇿', region: 'Afrique' },
  { value: 'BJ', label: 'Bénin', flag: '🇧🇯', region: 'Afrique' },
  { value: 'BF', label: 'Burkina Faso', flag: '🇧🇫', region: 'Afrique' },
  { value: 'CM', label: 'Cameroun', flag: '🇨🇲', region: 'Afrique' },
  { value: 'CI', label: "Côte d'Ivoire", flag: '🇨🇮', region: 'Afrique' },
  { value: 'EG', label: 'Égypte', flag: '🇪🇬', region: 'Afrique' },
  { value: 'GA', label: 'Gabon', flag: '🇬🇦', region: 'Afrique' },
  { value: 'GH', label: 'Ghana', flag: '🇬🇭', region: 'Afrique' },
  { value: 'GN', label: 'Guinée', flag: '🇬🇳', region: 'Afrique' },
  { value: 'KE', label: 'Kenya', flag: '🇰🇪', region: 'Afrique' },
  { value: 'MA', label: 'Maroc', flag: '🇲🇦', region: 'Afrique' },
  { value: 'MU', label: 'Maurice', flag: '🇲🇺', region: 'Afrique' },
  { value: 'NG', label: 'Nigéria', flag: '🇳🇬', region: 'Afrique' },
  { value: 'CD', label: 'RD Congo', flag: '🇨🇩', region: 'Afrique' },
  { value: 'SN', label: 'Sénégal', flag: '🇸🇳', region: 'Afrique' },
  { value: 'TG', label: 'Togo', flag: '🇹🇬', region: 'Afrique' },
  { value: 'TN', label: 'Tunisie', flag: '🇹🇳', region: 'Afrique' },
  
  // Europe
  { value: 'BE', label: 'Belgique', flag: '🇧🇪', region: 'Europe' },
  { value: 'FR', label: 'France', flag: '🇫🇷', region: 'Europe' },
  { value: 'DE', label: 'Allemagne', flag: '🇩🇪', region: 'Europe' },
  { value: 'IT', label: 'Italie', flag: '🇮🇹', region: 'Europe' },
  { value: 'ES', label: 'Espagne', flag: '🇪🇸', region: 'Europe' },
  { value: 'PT', label: 'Portugal', flag: '🇵🇹', region: 'Europe' },
  { value: 'GB', label: 'Royaume-Uni', flag: '🇬🇧', region: 'Europe' },
  { value: 'CH', label: 'Suisse', flag: '🇨🇭', region: 'Europe' },
  
  // Amérique du Nord
  { value: 'CA', label: 'Canada', flag: '🇨🇦', region: 'Amérique' },
  { value: 'US', label: 'États-Unis', flag: '🇺🇸', region: 'Amérique' },
  { value: 'MX', label: 'Mexique', flag: '🇲🇽', region: 'Amérique' },
  
  // Asie & Moyen-Orient
  { value: 'CN', label: 'Chine', flag: '🇨🇳', region: 'Asie' },
  { value: 'IN', label: 'Inde', flag: '🇮🇳', region: 'Asie' },
  { value: 'ID', label: 'Indonésie', flag: '🇮🇩', region: 'Asie' },
  { value: 'JP', label: 'Japon', flag: '🇯🇵', region: 'Asie' },
  { value: 'LB', label: 'Liban', flag: '🇱🇧', region: 'Asie' },
  { value: 'MY', label: 'Malaisie', flag: '🇲🇾', region: 'Asie' },
  { value: 'AE', label: 'Émirats Arabes Unis', flag: '🇦🇪', region: 'Asie' },
  { value: 'SA', label: 'Arabie Saoudite', flag: '🇸🇦', region: 'Asie' },
  { value: 'VN', label: 'Vietnam', flag: '🇻🇳', region: 'Asie' },
]

// Group countries by region for better UX - PRE-COMPUTED
const COUNTRY_GROUPS = COUNTRIES.reduce((acc, country) => {
  if (!acc[country.region]) {
    acc[country.region] = []
  }
  acc[country.region].push(country)
  return acc
}, {} as Record<string, typeof COUNTRIES>)

export function QuickRegistrationModal({ isOpen, onClose }: QuickRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showZcalModal, setShowZcalModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickRegistrationData>({
    resolver: zodResolver(quickRegistrationSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: QuickRegistrationData) => {
    setIsSubmitting(true)

    try {
      // Save lead to Sanity via /api/save-lead
      const leadResponse = await fetch('/api/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          country: data.country || '',
        }),
      })

      if (!leadResponse.ok) {
        console.warn('Lead save warning:', await leadResponse.text())
        // Continue anyway - lead saving is not critical
      }

      // Send client welcome email
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: data.email,
            name: data.fullName,
            phone: data.phone,
            country: data.country || 'Non spécifié',
            type: 'client-welcome',
          }),
        })
      } catch (emailError) {
        console.warn('Client email failed (non-critical):', emailError)
      }

      // Send copy of client welcome email to team
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: process.env.NEXT_PUBLIC_TEAM_EMAIL || 'teametudantetranger@gmail.com',
            name: data.fullName,
            email: data.email, // ✅ Adresse email du client
            phone: data.phone,
            country: data.country || 'Non spécifié',
            type: 'client-welcome', // Même email que le client
          }),
        })
      } catch (emailError) {
        console.warn('Team copy email failed (non-critical):', emailError)
      }

      // Send team notification email
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: process.env.NEXT_PUBLIC_TEAM_EMAIL || 'teametudantetranger@gmail.com',
            name: data.fullName,
            email: data.email, // ✅ Adresse email du client
            phone: data.phone,
            country: data.country || 'Non spécifié',
            type: 'team-notification',
          }),
        })
      } catch (emailError) {
        console.warn('Team email failed (non-critical):', emailError)
      }

      // Track event in GA4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'appointment_form_submitted', {
          event_category: 'engagement',
          event_label: data.country || 'no_country',
        })
      }

      // Try to register student (but don't fail if account exists)
      try {
        const response = await fetch('/api/register-student', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            step1: {
              firstName: data.fullName.split(' ')[0],
              lastName: data.fullName.split(' ').slice(1).join(' ') || data.fullName.split(' ')[0],
              email: data.email,
              phone: data.phone,
              dateOfBirth: new Date().toISOString().split('T')[0],
              nationality: 'À compléter',
              countryOfResidence: data.country || 'À compléter',
            },
            step2: {
              currentEducationLevel: 'bachelor',
              desiredDegree: 'master',
              fieldOfStudy: 'À compléter',
              preferredCountry: data.country || 'À compléter',
              preferredUniversity: 'À compléter',
              intendedStartDate: new Date().toISOString().split('T')[0],
            },
            step3: {
              documents: [],
            },
            step4: {
              password: 'Temporary123!',
              confirmPassword: 'Temporary123!',
            },
          }),
        })

        const result = await response.json()

        // If account already exists, that's fine - continue to booking
        if (!response.ok && result.error && !result.error.includes('existe déjà')) {
          console.warn('Student registration warning:', result.error)
        }
      } catch (studentError) {
        console.warn('Student registration error (continuing anyway):', studentError)
      }

      // ✅ Fermer le formulaire immédiatement
      setIsSuccess(false)
      reset()
      onClose()

      // ✅ Ouvrir le calendrier Zcal juste après
      setTimeout(() => {
        setShowZcalModal(true)
      }, 300) // Petit délai pour une transition fluide
      
    } catch (error) {
      console.error('Registration error:', error)
      alert(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return
    setIsSuccess(false)
    reset()
    onClose()
  }

  return (
    <>
      {/* Formulaire d'inscription */}
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg p-0 bg-gray-50 border-0 shadow-2xl overflow-hidden rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
          <VisuallyHidden>
            <DialogTitle>
              Formulaire de consultation gratuite
            </DialogTitle>
          </VisuallyHidden>
          
          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-10 space-y-4 sm:space-y-6 bg-white">
              {/* Title */}
              <div className="text-center mb-4 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Commencez gratuitement
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Remplissez ces informations pour votre consultation gratuite
                </p>
              </div>

              {/* Nom complet */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm sm:text-base font-medium text-gray-700">
                  Nom complet <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Jean Dupont"
                    className={`h-12 sm:h-14 pl-10 sm:pl-12 text-sm sm:text-base bg-white border-gray-200 rounded-xl ${
                      errors.fullName
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.fullName.message}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="jean.dupont@example.com"
                    className={`h-12 sm:h-14 pl-10 sm:pl-12 text-sm sm:text-base bg-white border-gray-200 rounded-xl ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base font-medium text-gray-700">
                  WhatsApp / Téléphone <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+221 77 123 45 67"
                    className={`h-12 sm:h-14 pl-10 sm:pl-12 text-sm sm:text-base bg-white border-gray-200 rounded-xl ${
                      errors.phone
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.phone.message}
                  </motion.p>
                )}
                {!errors.phone && (
                  <p className="text-xs text-gray-500">
                    Format international (ex: +221771234567)
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm sm:text-base font-medium text-gray-700">
                  Pays d&apos;origine
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none z-10" />
                  <select
                    id="country"
                    {...register('country')}
                    className={`w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-10 text-sm sm:text-base bg-white border-gray-200 rounded-xl appearance-none cursor-pointer transition-all ${
                      errors.country
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'
                    }`}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>🌍 Sélectionnez votre pays</option>
                    {Object.entries(COUNTRY_GROUPS).map(([region, regionCountries]) => (
                      <optgroup key={region} label={`━━━ ${region} ━━━`}>
                        {regionCountries.map((country) => (
                          <option key={country.value} value={country.label}>
                            {country.flag} {country.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.country && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600"
                  >
                    {errors.country.message}
                  </motion.p>
                )}
                {!errors.country && (
                  <p className="text-xs text-gray-500">
                    💡 Votre pays de résidence actuel
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <span className="block sm:hidden">Ma consultation gratuite</span>
                )}
                {!isSubmitting && (
                  <span className="hidden sm:block">Obtenir ma consultation gratuite</span>
                )}
              </Button>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-3 sm:pt-4 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span>Réponse sous 2h</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span>100% Gratuit</span>
                </div>
              </div>

              {/* Social proof */}
              <div className="text-center pt-2 border-t border-gray-100">
                <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                  <span className="font-semibold text-blue-600">{STATS.studentsHelped}</span> {STATS.studentsHelpedText}
                </p>
              </div>
            </form>
        </DialogContent>
      </Dialog>

      {/* zcal Booking Modal - Indépendant du formulaire */}
      <AnimatePresence>
        {showZcalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={(e) => {
              // Only close if clicking the backdrop (not the modal content)
              if (e.target === e.currentTarget) {
                setShowZcalModal(false)
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      📅 Choisissez votre créneau
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Consultation gratuite de 30 minutes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowZcalModal(false)
                  }}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Fermer"
                  type="button"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* zcal iframe with improved settings */}
              <div className="relative w-full h-[600px] overflow-hidden bg-white">
                <iframe
                  src="https://zcal.co/i/CW2aTnAb"
                  className="w-full h-full border-0"
                  title="Réservation de consultation"
                  allow="payment; camera; microphone"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                  loading="eager"
                  onLoad={() => {
                    console.log('✅ Calendrier Zcal chargé')
                    // Track when zcal loads
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'appointment_calendar_loaded', {
                        event_category: 'engagement',
                      })
                    }
                  }}
                  onError={() => {
                    console.error('❌ Erreur chargement Zcal')
                  }}
                />
              </div>

              {/* Modal Footer with better instructions */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-start gap-2">
                  <div className="text-blue-500 flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-700">
                    <strong>Cliquez sur une date</strong> dans le calendrier pour voir les créneaux disponibles, puis sélectionnez l'heure qui vous convient.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
