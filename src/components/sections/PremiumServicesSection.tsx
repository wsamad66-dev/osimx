'use client'

import { useState } from 'react'
import { Compass, FileText, Plane, Package, Check } from 'lucide-react'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

const services = [
  {
    icon: Compass,
    title: 'Orientation',
    description: 'Trouvez le programme qui vous correspond',
    features: [
      'Analyse de profil',
      'Choix de destination',
      'Sélection d\'universités'
    ],
    price: '50 000',
    popular: false
  },
  {
    icon: FileText,
    title: 'Dossier d\'admission',
    description: 'Constitution complète de votre dossier',
    features: [
      'Rédaction CV',
      'Lettre de motivation',
      'Traductions certifiées'
    ],
    price: '150 000',
    popular: false
  },
  {
    icon: Plane,
    title: 'Procédure Visa',
    description: 'Accompagnement visa étudiant',
    features: [
      'Préparation dossier',
      'Simulation entretien',
      'Suivi demande'
    ],
    price: '200 000',
    popular: false
  },
  {
    icon: Package,
    title: 'Pack Complet',
    description: 'Accompagnement de A à Z',
    features: [
      'Tous les services',
      'Suivi prioritaire',
      'Garantie résultat'
    ],
    price: '350 000',
    popular: true
  },
]

export function PremiumServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-indigo-50 rounded-full text-sm font-semibold text-indigo-600 mb-4">
            Nos offres
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Des services adaptés à{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              chaque besoin
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Choisissez la formule qui correspond à votre projet d&apos;études
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative group rounded-3xl p-8 transition-all duration-300 ${
                service.popular
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white scale-105 shadow-2xl'
                  : 'bg-white border-2 border-gray-200 hover:border-indigo-600 hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-gray-900 text-sm font-bold rounded-full shadow-lg">
                  ⭐ Populaire
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                service.popular
                  ? 'bg-white/20 text-white'
                  : 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
              }`}>
                <service.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 ${
                service.popular ? 'text-white' : 'text-gray-900'
              }`}>
                {service.title}
              </h3>

              {/* Description */}
              <p className={`mb-6 ${
                service.popular ? 'text-indigo-100' : 'text-gray-600'
              }`}>
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      service.popular ? 'text-yellow-300' : 'text-green-500'
                    }`} />
                    <span className={`text-sm ${
                      service.popular ? 'text-white' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mb-6">
                <div className={`text-3xl font-bold ${
                  service.popular ? 'text-white' : 'text-indigo-600'
                }`}>
                  {service.price}
                  <span className="text-lg font-normal"> FCFA</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className={`block w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                  service.popular
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg'
                }`}
              >
                Choisir ce pack
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          �� Tous nos packs incluent un suivi personnalisé et une garantie de satisfaction
        </p>
      </div>

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
