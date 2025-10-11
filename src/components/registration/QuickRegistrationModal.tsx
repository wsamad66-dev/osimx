'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, X, CheckCircle2, Sparkles, User, Mail, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { STATS } from '@/config/stats'

const quickRegistrationSchema = z.object({
  fullName: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/, "Numéro invalide (ex: +221771234567)"),
})

type QuickRegistrationData = z.infer<typeof quickRegistrationSchema>

interface QuickRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuickRegistrationModal({ isOpen, onClose }: QuickRegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
      const response = await fetch('/api/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          step1: {
            firstName: data.fullName.split(' ')[0],
            lastName: data.fullName.split(' ').slice(1).join(' ') || data.fullName.split(' ')[0],
            email: data.email,
            phone: data.phone,
            dateOfBirth: new Date().toISOString().split('T')[0], // Placeholder
            nationality: 'À compléter',
            countryOfResidence: 'À compléter',
          },
          step2: {
            currentEducationLevel: 'bachelor',
            desiredDegree: 'master',
            fieldOfStudy: 'À compléter',
            preferredCountry: 'À compléter',
            preferredUniversity: 'À compléter',
            intendedStartDate: new Date().toISOString().split('T')[0],
          },
          step3: {
            documents: [], // Quick registration without documents
          },
          step4: {
            password: 'Temporary123!',
            confirmPassword: 'Temporary123!',
          },
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'inscription")
      }

      setIsSuccess(true)

      // Fermer automatiquement après 3 secondes
      setTimeout(() => {
        handleClose()
      }, 3000)
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
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 bg-gray-50 border-0 shadow-2xl overflow-hidden rounded-2xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Success State */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 sm:p-10 text-center bg-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Inscription réussie ! 🎉
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              Nous avons bien reçu votre demande.
            </p>
            <p className="text-base text-gray-500">
              Notre équipe vous contactera sous <span className="font-semibold text-blue-600">2 heures</span> pour finaliser votre dossier.
            </p>
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                📧 Email de confirmation envoyé
              </p>
            </div>
          </motion.div>
        ) : (
          <>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
