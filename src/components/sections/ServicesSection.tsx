'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Compass, FileCheck, Plane, Home, BookOpen, Users, Check, ArrowRight, Shield } from 'lucide-react'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

const services = [
  {
    id: 'orientation',
    icon: Compass,
    title: 'Orientation',
    description: 'Analyse de profil et conseil sur les meilleures universités adaptées à vos objectifs',
    features: [
      'Évaluation complète de votre profil académique',
      'Conseil personnalisé sur les destinations',
      'Sélection des universités et programmes',
      'Plan d\'action sur mesure'
    ]
  },
  {
    id: 'dossier',
    icon: FileCheck,
    title: 'Constitution de Dossier',
    description: 'Préparation complète de votre dossier d\'admission et de candidature',
    features: [
      'Vérification de tous les documents requis',
      'Rédaction de lettre de motivation',
      'CV académique optimisé',
      'Relecture et corrections professionnelles'
    ]
  },
  {
    id: 'admission',
    icon: BookOpen,
    title: 'Admission',
    description: 'Soumission et suivi de vos candidatures jusqu\'à l\'obtention de l\'admission',
    features: [
      'Soumission des candidatures en temps voulu',
      'Suivi régulier avec les universités',
      'Négociation des délais si nécessaire',
      'Support jusqu\'à la confirmation finale'
    ]
  },
  {
    id: 'visa',
    icon: Plane,
    title: 'Accompagnement Visa',
    description: 'Préparation et accompagnement complet pour l\'obtention de votre visa étudiant',
    features: [
      'Préparation complète du dossier visa',
      'Simulation d\'entretien consulaire',
      'Prise de rendez-vous et suivi',
      'Support jusqu\'à l\'obtention du visa'
    ]
  },
  {
    id: 'installation',
    icon: Home,
    title: 'Installation',
    description: 'Aide au logement et accompagnement pour vos premiers pas dans votre nouveau pays',
    features: [
      'Recherche de logement (CROUS, privé)',
      'Aide aux démarches administratives',
      'Ouverture de compte bancaire',
      'Orientation et intégration sur place'
    ]
  },
  {
    id: 'suivi',
    icon: Users,
    title: 'Suivi Post-Arrivée',
    description: 'Accompagnement continu après votre arrivée pour assurer votre réussite',
    features: [
      'Support académique et administratif',
      'Aide à l\'intégration sociale',
      'Conseils pour prolongation de titre de séjour',
      'Réseau d\'anciens étudiants'
    ]
  }
]

const packs = [
  {
    id: 'basic',
    name: 'Basic',
    price: '299€',
    description: 'Pour les étudiants autonomes qui ont besoin d\'un coup de pouce',
    features: [
      'Orientation personnalisée',
      'Aide à la constitution du dossier',
      'Liste des universités recommandées',
      'Support par email (72h)',
      'Guide d\'installation PDF'
    ],
    highlighted: false,
    color: 'gray'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '699€',
    description: 'Accompagnement complet de l\'admission au visa',
    features: [
      'Tous les services Basic',
      'Soumission des candidatures',
      'Suivi des admissions',
      'Préparation complète visa',
      'Simulation entretien consulaire',
      'Support WhatsApp prioritaire',
      'Aide recherche logement'
    ],
    highlighted: true,
    color: 'blue',
    badge: '⭐ Le plus populaire'
  },
  {
    id: 'vip',
    name: 'VIP',
    price: '1,299€',
    description: 'Service premium tout-inclus avec conseiller dédié',
    features: [
      'Tous les services Premium',
      'Conseiller personnel dédié',
      'Appels vidéo illimités',
      'Accompagnement sur place',
      'Aide installation complète',
      'Suivi 12 mois post-arrivée',
      'Accès réseau alumni',
      'Garantie satisfaction'
    ],
    highlighted: false,
    color: 'green'
  }
]

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="services" className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #F3F4F6 50%, #FFFFFF 100%)' }}>
      {/* Pattern overlay - more visible */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(38, 165, 222, 0.1), transparent 50%)' }}></div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(242, 145, 0, 0.08), transparent 50%)' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-gray-900 mb-4">
            Nos <span className="text-[#0B5FFF]">Services</span> d&apos;Accompagnement
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
            Un accompagnement étape par étape pour maximiser vos chances de réussite
          </p>
        </div>

        {/* Services Timeline */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card
                  key={service.id}
                  className="group cursor-pointer border-2 border-gray-100 hover:border-[#0B5FFF] rounded-2xl transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <CardContent className="p-6">
                    {/* Step Number */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#0B5FFF]/10 p-3 rounded-xl group-hover:bg-[#0B5FFF] group-hover:text-white transition-all">
                          <IconComponent className="w-6 h-6 text-[#0B5FFF] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-sm font-bold text-gray-400">ÉTAPE {index + 1}</span>
                      </div>
                      <ArrowRight className={`w-5 h-5 text-[#0B5FFF] transition-transform ${selectedService === service.id ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Service Info */}
                    <h3 className="font-poppins font-bold text-xl text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 font-inter">
                      {service.description}
                    </p>

                    {/* Features (Expandable) */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      selectedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-2 pt-4 border-t border-gray-100">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                            <Check className="w-4 h-4 text-[#2ECC71] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-poppins font-bold text-3xl text-gray-900 mb-3">
              Choisissez votre <span className="text-[#0B5FFF]">formule</span>
            </h3>
            <p className="text-gray-600 font-inter">
              Des options adaptées à tous les besoins et budgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packs.map((pack) => (
              <Card
                key={pack.id}
                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                  pack.highlighted
                    ? 'border-4 border-[#0B5FFF] shadow-2xl scale-105'
                    : 'border-2 border-gray-200 hover:border-[#0B5FFF] hover:shadow-xl'
                }`}
              >
                {pack.badge && (
                  <div className="bg-[#0B5FFF] text-white text-center py-2 px-4 text-sm font-bold">
                    {pack.badge}
                  </div>
                )}

                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h4 className="font-poppins font-bold text-2xl text-gray-900 mb-2">
                      {pack.name}
                    </h4>
                    <div className="text-4xl font-bold text-[#0B5FFF] mb-2">
                      {pack.price}
                    </div>
                    <p className="text-sm text-gray-600 font-inter">
                      {pack.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-5 h-5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full py-6 rounded-xl font-bold ${
                      pack.highlighted
                        ? 'bg-[#0B5FFF] hover:bg-[#0949CC] text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    }`}
                  >
                    Choisir {pack.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-[#0B5FFF] to-[#0949CC] rounded-2xl p-10 text-white text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-[#2ECC71]" />
          <h3 className="font-poppins font-bold text-2xl mb-3">
            Vous êtes prêt ? Nous aussi.
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto font-inter">
            Pas sûr du pays ou du programme ? Nous vous guidons gratuitement pour choisir la meilleure option pour votre profil.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold px-8 py-6 rounded-xl shadow-lg"
          >
            🚀 Démarrer mon projet maintenant
          </Button>
        </div>
      </div>

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
