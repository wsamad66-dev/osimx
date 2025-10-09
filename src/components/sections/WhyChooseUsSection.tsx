'use client'

import { Shield, Headphones, Users, Award, Heart, Globe } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Garantie de résultat',
    description: 'Nous nous engageons à obtenir votre admission ou vous êtes remboursé.',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: Headphones,
    title: 'Accompagnement 24/7',
    description: 'Notre équipe est disponible à tout moment pour répondre à vos questions.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Équipe d\'experts',
    description: 'Conseillers qualifiés avec une expérience internationale reconnue.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Award,
    title: 'Partenariats officiels',
    description: 'Accords directs avec plus de 200 universités dans 25 pays.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Heart,
    title: 'Approche humaine',
    description: 'Un accompagnement personnalisé adapté à votre profil et vos objectifs.',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Globe,
    title: 'Réseau international',
    description: 'Présence dans 15 pays africains et réseau d\'anciens étudiants actif.',
    color: 'from-cyan-500 to-blue-500'
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full text-sm font-semibold text-blue-600 mb-4">
            Nos avantages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pourquoi{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              nous choisir
            </span>
            {' '}?
          </h2>
          <p className="text-xl text-gray-600">
            Une expertise reconnue et un accompagnement de qualité supérieure
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient Border on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 -z-10 blur transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
