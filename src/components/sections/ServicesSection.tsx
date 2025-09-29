'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const services = [
  {
    id: 1,
    icon: '🎓',
    title: 'Admission Universitaire',
    description: 'Sélection et inscription dans les meilleures universités françaises adaptées à votre profil.',
    features: [
      'Analyse de profil personnalisée',
      'Sélection d\'universités ciblées',
      'Préparation complète du dossier',
      'Suivi jusqu\'à l\'admission'
    ],
    price: 'À partir de 299€',
    popular: false
  },
  {
    id: 2,
    icon: '✈️',
    title: 'Accompagnement Visa',
    description: 'Préparation complète des documents et accompagnement pour obtenir votre visa étudiant.',
    features: [
      'Préparation documents visa',
      'Simulation d\'entretien',
      'Suivi rendez-vous consulat',
      'Support jusqu\'à l\'obtention'
    ],
    price: 'À partir de 199€',
    popular: true
  },
  {
    id: 3,
    icon: '🏠',
    title: 'Logement & Installation',
    description: 'Recherche de logement et orientation complète pour votre installation en France.',
    features: [
      'Recherche logement CROUS',
      'Colocation et résidences privées',
      'Aide aux démarches administratives',
      'Orientation sur place'
    ],
    price: 'À partir de 149€',
    popular: false
  },
  {
    id: 4,
    icon: '📚',
    title: 'Préparation Linguistique',
    description: 'Cours de français et préparation aux tests DELF/TCF pour réussir vos études.',
    features: [
      'Cours de français personnalisés',
      'Préparation DELF/TCF',
      'Français académique',
      'Suivi continu des progrès'
    ],
    price: 'À partir de 99€',
    popular: false
  },
  {
    id: 5,
    icon: '💰',
    title: 'Recherche de Bourses',
    description: 'Identification et candidature aux bourses Eiffel, Campus France et autres aides financières.',
    features: [
      'Analyse d\'éligibilité',
      'Préparation candidatures',
      'Bourses Eiffel & Campus France',
      'Aides régionales et privées'
    ],
    price: 'À partir de 249€',
    popular: false
  },
  {
    id: 6,
    icon: '🎯',
    title: 'Accompagnement Complet',
    description: 'Formule tout-inclus avec suivi personnalisé de A à Z pour garantir votre réussite.',
    features: [
      'Tous les services inclus',
      'Conseiller dédié personnel',
      'Suivi continu 12 mois',
      'Garantie satisfaction'
    ],
    price: 'À partir de 799€',
    popular: true
  }
]

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<number | null>(null)

  const scrollToContact = () => {
    const contactSection = document.querySelector('#contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/contact'
    }
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl text-blue-900 mb-6">
            Nos Services d'Accompagnement
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            De l'admission à l'installation, nous vous guidons pas à pas dans votre projet d'études en France. 
            Choisissez la formule qui correspond le mieux à vos besoins.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                selectedService === service.id ? 'scale-105 ring-4 ring-yellow-500' : 'hover:scale-105'
              }`}
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-blue-900 px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                  ⭐ Populaire
                </div>
              )}

              {/* Service Icon */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Service Content */}
              <div className="mb-6">
                <h3 className="font-montserrat font-bold text-xl text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className={`transition-all duration-500 overflow-hidden ${
                selectedService === service.id ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
              }`}>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {service.price}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    scrollToContact()
                  }}
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6"
                >
                  Choisir
                </Button>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
            </div>
          ))}
        </div>

        {/* Process Overview */}
        <div className="text-center">
          <h3 className="font-montserrat font-bold text-2xl text-blue-900 mb-8">
            Comment ça marche ?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h4 className="font-semibold text-lg text-blue-900 mb-2">1. Consultation</h4>
              <p className="text-gray-600">Évaluez votre profil et définissez vos objectifs avec nos experts</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📋
              </div>
              <h4 className="font-semibold text-lg text-blue-900 mb-2">2. Préparation</h4>
              <p className="text-gray-600">Nous préparons et soumettons votre dossier complet</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✈️
              </div>
              <h4 className="font-semibold text-lg text-blue-900 mb-2">3. Installation</h4>
              <p className="text-gray-600">Accompagnement sur place pour visa, logement et intégration</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-white">
            <h3 className="font-montserrat font-bold text-3xl mb-4">
              Prêt à commencer votre aventure française ?
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Rejoignez les centaines d'étudiants qui ont réalisé leur rêve grâce à notre accompagnement personnalisé.
            </p>
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-10 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
            >
              🚀 Demander une consultation gratuite
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}