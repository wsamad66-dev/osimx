'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StepIndicator } from './StepIndicator'
import { Step1PersonalInfo } from './Step1PersonalInfo'
import { Step2EducationInfo } from './Step2EducationInfo'
import { Step3DocumentUpload } from './Step3DocumentUpload'
import { Step4Security } from './Step4Security'
import { Loader2 } from 'lucide-react'
import type {
  PersonalInfo,
  EducationInfo,
  DocumentUpload,
  Security,
  RegistrationData,
} from '@/lib/registration-schemas'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    personalInfo?: PersonalInfo
    educationInfo?: EducationInfo
    documentUpload?: DocumentUpload
    security?: Security
  }>({})

  const handleStep1Complete = (data: PersonalInfo) => {
    setFormData((prev) => ({ ...prev, personalInfo: data }))
    setCurrentStep(2)
  }

  const handleStep2Complete = (data: EducationInfo) => {
    setFormData((prev) => ({ ...prev, educationInfo: data }))
    setCurrentStep(3)
  }

  const handleStep3Complete = (data: DocumentUpload) => {
    setFormData((prev) => ({ ...prev, documentUpload: data }))
    setCurrentStep(4)
  }

  const handleStep4Complete = async (data: Security) => {
    // Prepare data in the format expected by API
    const registrationPayload = {
      step1: formData.personalInfo!,
      step2: formData.educationInfo!,
      step3: formData.documentUpload!,
      step4: data,
    }

    setIsSubmitting(true)
    console.log('📤 Submitting registration...')
    
    try {
      const response = await fetch('/api/register-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationPayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'inscription')
      }

      console.log('✅ Registration successful:', result)

      // Show success message (you can replace this with a toast/notification)
      alert(`🎉 Inscription réussie!\n\nBienvenue ${formData.personalInfo?.firstName}!\n\nVous recevrez un email de confirmation sous peu.`)

      // Reset form and close modal
      setFormData({})
      setCurrentStep(1)
      onClose()
    } catch (error) {
      console.error('❌ Registration error:', error)
      alert(
        `❌ Erreur d'inscription:\n\n${
          error instanceof Error
            ? error.message
            : 'Une erreur est survenue. Veuillez réessayer.'
        }`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClose = () => {
    if (isSubmitting) return // Prevent closing during submission
    setCurrentStep(1)
    setFormData({})
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-[#232d6e] to-[#26a5de] bg-clip-text text-transparent">
            Inscription Étudiant
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-1">Rejoignez des milliers d'étudiants déjà inscrits</p>
        </DialogHeader>

        <div className="px-6 pb-6 bg-white">
          {/* Step Indicator */}
          <div className="py-4">
            <StepIndicator 
              currentStep={currentStep} 
              totalSteps={4}
              steps={[
                { title: 'Informations', description: 'Données personnelles' },
                { title: 'Éducation', description: 'Parcours académique' },
                { title: 'Documents', description: 'Pièces justificatives' },
                { title: 'Sécurité', description: 'Mot de passe' },
              ]}
            />
          </div>

          {/* Step Content */}
          <div className="py-4">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <Step1PersonalInfo
                  key="step1"
                  defaultValues={formData.personalInfo}
                  onNext={handleStep1Complete}
                />
              )}
              {currentStep === 2 && (
                <Step2EducationInfo
                  key="step2"
                  defaultValues={formData.educationInfo}
                  onNext={handleStep2Complete}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <Step3DocumentUpload
                  key="step3"
                  defaultValues={formData.documentUpload}
                  onNext={handleStep3Complete}
                  onBack={handleBack}
                />
              )}
              {currentStep === 4 && (
                <Step4Security
                  key="step4"
                  defaultValues={formData.security}
                  onNext={handleStep4Complete}
                  onBack={handleBack}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-3 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
                className="flex-1 h-12 border-2 border-gray-300 hover:border-[#26a5de] hover:bg-[#26a5de]/5 hover:text-[#26a5de] font-semibold transition-all"
              >
                ← Précédent
              </Button>
            ) : (
              <div className="flex-1"></div>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={() => {
                  // Trigger form submission of current step
                  const submitButton = document.querySelector(
                    `#step${currentStep}-submit`
                  ) as HTMLButtonElement
                  submitButton?.click()
                }}
                className="flex-1 h-12 bg-gradient-to-r from-[#f29100] to-[#ff9933] hover:from-[#ff9933] hover:to-[#f29100] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Continuer →
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  const submitButton = document.querySelector(
                    '#step4-submit'
                  ) as HTMLButtonElement
                  submitButton?.click()
                }}
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Inscription en cours...
                  </>
                ) : (
                  'Finaliser l\'inscription'
                )}
              </Button>
            )}
          </div>

          {/* Progress text */}
          <p className="text-center text-sm text-gray-500 pt-2 pb-2">
            <span className="font-semibold text-[#26a5de]">Étape {currentStep}</span> sur 4
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
