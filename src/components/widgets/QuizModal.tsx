'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, MapPin, DollarSign, GraduationCap, Calendar, Sparkles } from 'lucide-react'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

interface QuizStep {
  id: number
  question: string
  icon: any
  options: { label: string; value: string; emoji?: string }[]
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [recommendedDestination, setRecommendedDestination] = useState<any>(null)

  const quizSteps: QuizStep[] = [
    {
      id: 1,
      question: 'Quel est votre budget annuel prévu pour vos études ?',
      icon: DollarSign,
      options: [
        { label: 'Moins de 10,000€', value: 'low', emoji: '💰' },
        { label: '10,000€ - 20,000€', value: 'medium', emoji: '💵' },
        { label: '20,000€ - 30,000€', value: 'high', emoji: '💸' },
        { label: 'Plus de 30,000€', value: 'very-high', emoji: '💎' },
      ],
    },
    {
      id: 2,
      question: 'Quel domaine d\'études vous intéresse ?',
      icon: GraduationCap,
      options: [
        { label: 'Informatique & Tech', value: 'tech', emoji: '💻' },
        { label: 'Commerce & Finance', value: 'business', emoji: '📊' },
        { label: 'Ingénierie', value: 'engineering', emoji: '⚙️' },
        { label: 'Médecine & Santé', value: 'health', emoji: '🏥' },
        { label: 'Arts & Sciences Humaines', value: 'arts', emoji: '🎨' },
      ],
    },
    {
      id: 3,
      question: 'Quelle langue préférez-vous pour étudier ?',
      icon: MapPin,
      options: [
        { label: 'Français', value: 'french', emoji: '🇫🇷' },
        { label: 'Anglais', value: 'english', emoji: '🇬🇧' },
        { label: 'Les deux', value: 'both', emoji: '🌍' },
      ],
    },
    {
      id: 4,
      question: 'Quand souhaitez-vous commencer ?',
      icon: Calendar,
      options: [
        { label: 'Dans 3-6 mois', value: 'soon', emoji: '⚡' },
        { label: 'Dans 6-12 mois', value: 'medium', emoji: '📅' },
        { label: 'Dans plus d\'un an', value: 'later', emoji: '🗓️' },
      ],
    },
  ]

  const calculateRecommendation = () => {
    const budget = answers[1]
    const language = answers[3]
    const timing = answers[4]

    // Simple recommendation logic
    if (language === 'french' && budget === 'low') {
      return {
        country: 'France',
        flag: '🇫🇷',
        reason: 'Excellent rapport qualité-prix avec des frais universitaires abordables',
        universities: ['Sorbonne', 'Sciences Po', 'Université de Paris'],
        avgCost: '5,000€ - 15,000€',
        successRate: 89,
      }
    } else if (budget === 'medium' || budget === 'high') {
      return {
        country: 'Canada',
        flag: '🇨🇦',
        reason: 'Opportunités d\'immigration post-études et excellente qualité de vie',
        universities: ['Université de Montréal', 'McGill', 'UBC'],
        avgCost: '12,000€ - 25,000€',
        successRate: 92,
      }
    } else if (language === 'english' && budget === 'very-high') {
      return {
        country: 'USA',
        flag: '🇺🇸',
        reason: 'Meilleures universités au monde et réseaux professionnels exceptionnels',
        universities: ['MIT', 'Stanford', 'UC Berkeley'],
        avgCost: '25,000€ - 50,000€',
        successRate: 85,
      }
    } else {
      return {
        country: 'Royaume-Uni',
        flag: '🇬🇧',
        reason: 'Programmes courts (1 an) et diplômes reconnus internationalement',
        universities: ['Oxford', 'Cambridge', 'Imperial College'],
        avgCost: '15,000€ - 30,000€',
        successRate: 88,
      }
    }
  }

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [quizSteps[currentStep].id]: value })
    
    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 300)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const recommendation = calculateRecommendation()
    setRecommendedDestination(recommendation)
    setShowResults(true)

    // Track event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_quiz', {
        event_category: 'engagement',
        event_label: 'quiz_completed',
      })
    }

    // Here you would normally send to your backend/CRM
    console.log('Quiz submission:', { name, email, answers, recommendation })
  }

  const progress = ((currentStep + 1) / quizSteps.length) * 100

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="h-2 bg-gray-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-orange-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    key={currentStep}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full mb-4"
                  >
                    {(() => {
                      const Icon = quizSteps[currentStep].icon
                      return Icon ? <Icon className="w-8 h-8 text-primary-600" /> : null
                    })()}
                  </motion.div>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                    Trouvez votre destination idéale
                  </h2>
                  <p className="text-gray-600">
                    Question {currentStep + 1} sur {quizSteps.length}
                  </p>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      {quizSteps[currentStep].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3">
                      {quizSteps[currentStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            answers[quizSteps[currentStep].id] === option.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300 bg-white'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                            <span className="font-medium text-gray-800">{option.label}</span>
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Retour
                  </button>

                  {currentStep === quizSteps.length - 1 && answers[quizSteps[currentStep].id] && (
                    <form onSubmit={handleSubmit} className="flex-1 ml-4">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Votre prénom"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <input
                          type="email"
                          placeholder="Votre email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          Voir mes résultats
                          <Sparkles className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Results Screen */
            <div className="p-8">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                  className="text-6xl mb-4"
                >
                  {recommendedDestination.flag}
                </motion.div>
                <h2 className="text-3xl font-bold text-navy-900 mb-2">
                  Votre destination idéale : {recommendedDestination.country}
                </h2>
                <p className="text-lg text-gray-600">
                  {recommendedDestination.reason}
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-orange-50 rounded-xl p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Universités recommandées:</h4>
                    <ul className="space-y-2">
                      {recommendedDestination.universities.map((uni: string, index: number) => (
                        <li key={index} className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary-600" />
                          <span>{uni}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Informations clés:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span>Coût: {recommendedDestination.avgCost}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold-600" />
                        <span>{recommendedDestination.successRate}% de taux de réussite</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  Nous avons envoyé un guide détaillé à <strong>{email}</strong>
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
                >
                  Commencer mon accompagnement
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
