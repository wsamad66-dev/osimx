'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { generateSEO } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  GraduationCap, 
  Users, 
  Award, 
  Globe, 
  Heart,
  Target,
  CheckCircle
} from 'lucide-react'
import Image from 'next/image'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

const teamMembers = [
  {
    name: 'Dr. Aminata Diallo',
    role: 'Directrice & Fondatrice',
    bio: 'Ancienne diplomate avec 15 ans d\'expérience en éducation internationale',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=300&h=300&fit=crop&crop=face',
    specialties: ['Diplomatie éducative', 'Relations internationales', 'Campus France']
  },
  {
    name: 'Mohamed Ben Ahmed',
    role: 'Conseiller Senior',
    bio: 'Expert en admissions universitaires françaises depuis 12 ans',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    specialties: ['Admissions', 'Bourses d\'études', 'Orientation académique']
  },
  {
    name: 'Sarah Konaté',
    role: 'Spécialiste Visa & Immigration',
    bio: 'Ancienne consultante en immigration avec un taux de succès de 98%',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    specialties: ['Procédures visa', 'Dossiers consulaires', 'Immigration étudiante']
  }
]

const milestones = [
  {
    year: '2018',
    event: 'Création de L\'Étudiant à l\'Étranger',
    description: 'Première agence d\'accompagnement dédiée aux étudiants africains'
  },
  {
    year: '2019',
    event: '100 premiers étudiants accompagnés',
    description: 'Franchissement du cap des 100 dossiers traités avec succès'
  },
  {
    year: '2020',
    event: 'Partenariats universitaires',
    description: 'Signature des premiers accords avec 15 universités françaises'
  },
  {
    year: '2021',
    event: 'Expansion digitale',
    description: 'Lancement de la plateforme en ligne et services à distance'
  },
  {
    year: '2022',
    event: '500 étudiants accompagnés',
    description: 'Consolidation de notre position de leader sur le marché'
  },
  {
    year: '2023',
    event: 'Reconnaissance officielle',
    description: 'Certification Campus France et prix d\'excellence'
  },
  {
    year: '2024',
    event: '1000+ étudiants',
    description: 'Dépassement du millier d\'étudiants accompagnés avec succès'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Excellence & Bienveillance',
    description: 'Nous croyons qu\'un accompagnement de qualité passe par l\'écoute et la personnalisation de nos services.'
  },
  {
    icon: Target,
    title: 'Objectifs Concrets',
    description: 'Chaque étudiant a des objectifs uniques. Nous adaptons notre stratégie pour maximiser ses chances de réussite.'
  },
  {
    icon: Globe,
    title: 'Pont Culturel',
    description: 'Nous facilitons l\'intégration culturelle et académique pour une expérience d\'études enrichissante.'
  },
  {
    icon: CheckCircle,
    title: 'Résultats Prouvés',
    description: 'Notre taux de succès de 95% témoigne de l\'efficacité de notre méthode d\'accompagnement.'
  }
]

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-montserrat font-bold text-4xl lg:text-6xl mb-6">
            À Propos de Nous
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Depuis 2018, nous accompagnons les étudiants africains dans leur rêve d'étudier en France. 
            <span className="text-yellow-400 font-semibold"> Plus qu'une agence, nous sommes vos partenaires de réussite.</span>
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 border-2 border-blue-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <GraduationCap className="w-16 h-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl text-blue-900">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Démocratiser l'accès à l'enseignement supérieur français pour les étudiants africains 
                  en offrant un accompagnement personnalisé, transparent et efficace. Nous croyons que 
                  chaque étudiant mérite l'excellence éducative, indépendamment de son origine.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-yellow-100 hover:shadow-xl transition-shadow">
              <CardHeader>
                <Award className="w-16 h-16 text-yellow-600 mb-4" />
                <CardTitle className="text-2xl text-blue-900">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Devenir le pont éducatif de référence entre l'Afrique et la France, créant une 
                  communauté d'étudiants africains épanouis et performants dans le système 
                  éducatif français, futurs leaders de demain.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-blue-900 mb-6">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ce qui nous guide dans chaque interaction avec nos étudiants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <value.icon className="w-12 h-12 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-blue-900">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-blue-900 mb-6">
              Notre Équipe d'Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés dédiés à votre réussite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-blue-900 mb-2">{member.name}</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 mb-3">{member.role}</Badge>
                  <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                  <div className="space-y-2">
                    {member.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs mr-2"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-blue-900 mb-6">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              7 années d'accompagnement et d'innovation au service de l'éducation
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="flex-1">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardContent>
                      <div className="flex items-center gap-4 mb-3">
                        <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
                          {milestone.year}
                        </Badge>
                        <h3 className="font-bold text-xl text-blue-900">
                          {milestone.event}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl mb-6">
            Rejoignez Notre Communauté de Réussite
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Plus de 1000 étudiants nous font déjà confiance. À votre tour de réaliser votre rêve français !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 py-4 text-lg"
            >
              Consultation Gratuite
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/'}
              className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 text-lg"
            >
              Retour Accueil
            </Button>
          </div>
        </div>
      </section>

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}