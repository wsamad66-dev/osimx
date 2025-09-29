'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const teamMembers = [
  {
    name: 'Dr. Marie Dubois',
    role: 'Directrice & Fondatrice',
    experience: '15 ans d\'expérience',
    speciality: 'Admissions universitaires',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6ef5615b-0225-4d19-b094-f22aff3910de.png',
    bio: 'Ancienne responsable des admissions internationales à Sciences Po, elle a accompagné plus de 1000 étudiants.'
  },
  {
    name: 'Mamadou Sy',
    role: 'Consultant Senior',
    experience: '8 ans d\'expérience',
    speciality: 'Procédures visa',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/18777eb6-f929-416e-a5b8-01d8579e0cf6.png',
    bio: 'Expert en droit de l\'immigration étudiante, taux de succès visa de 98% sur ses dossiers.'
  },
  {
    name: 'Sarah Johnson',
    role: 'Responsable Logement',
    experience: '6 ans d\'expérience',
    speciality: 'Installation étudiante',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2899a069-a773-46c1-8ad1-71480a964ed0.png',
    bio: 'Spécialiste du logement étudiant, elle a développé un réseau unique avec les universités françaises.'
  }
]

const companyValues = [
  {
    icon: '🤝',
    title: 'Confiance',
    description: 'Transparence totale dans nos processus et tarification. Votre succès est notre priorité absolue.'
  },
  {
    icon: '⭐',
    title: 'Excellence',
    description: 'Standards de qualité les plus élevés dans chaque service. Nous visons toujours l\'excellence.'
  },
  {
    icon: '❤️',
    title: 'Proximité',
    description: 'Accompagnement personnalisé et humain. Chaque étudiant bénéficie d\'un suivi sur mesure.'
  },
  {
    icon: '🌍',
    title: 'Diversité',
    description: 'Ouverture à tous les profils et toutes les ambitions. La diversité fait notre richesse.'
  }
]

const achievements = [
  {
    year: '2018',
    milestone: 'Création de L\'Étudiant à l\'Étranger',
    description: 'Lancement de notre mission d\'accompagnement des étudiants africains'
  },
  {
    year: '2019',
    milestone: '50 premiers étudiants accompagnés',
    description: 'Premiers succès et développement de notre expertise'
  },
  {
    year: '2020',
    milestone: 'Partenariats avec 10 universités',
    description: 'Extension de notre réseau universitaire en France'
  },
  {
    year: '2021',
    milestone: 'Taux de succès visa : 95%',
    description: 'Atteinte de notre objectif d\'excellence en procédures visa'
  },
  {
    year: '2022',
    milestone: '300 étudiants accompagnés',
    description: 'Consolidation de notre position de leader'
  },
  {
    year: '2023',
    milestone: '500+ étudiants, 20+ universités',
    description: 'Expansion majeure et reconnaissance internationale'
  },
  {
    year: '2024',
    milestone: 'Services digitaux innovants',
    description: 'Lancement de notre plateforme de suivi en ligne'
  }
]

export function AboutSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)
  const [visibleAchievements, setVisibleAchievements] = useState<number[]>([])
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleAchievements(prev => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.5 }
    )

    const achievementElements = document.querySelectorAll('.achievement-item')
    achievementElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="apropos" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23001F3F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl text-blue-900 mb-6">
            À Propos de Notre Mission
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Depuis 2018, nous sommes les pionniers de l'accompagnement des étudiants africains 
            vers l'excellence académique française. Notre expertise unique et notre engagement 
            sincère font de nous le partenaire de confiance pour votre avenir.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="font-montserrat font-bold text-3xl text-blue-900 mb-6">
              Notre Histoire
            </h3>
            <div className="space-y-6 text-gray-600">
              <p className="leading-relaxed">
                <strong className="text-blue-900">L'Étudiant à l'Étranger</strong> est né d'une vision simple mais ambitieuse : 
                permettre à chaque étudiant africain de réaliser son rêve d'études en France, 
                indépendamment de ses origines ou de ses moyens financiers.
              </p>
              <p className="leading-relaxed">
                Fondée par <strong>Dr. Marie Dubois</strong>, ancienne responsable des admissions 
                internationales à Sciences Po, notre agence combine expertise académique française 
                et compréhension profonde des défis spécifiques aux étudiants africains.
              </p>
              <p className="leading-relaxed">
                Aujourd'hui, avec <strong className="text-yellow-600">plus de 500 étudiants accompagnés</strong> 
                et un <strong className="text-yellow-600">taux de succès de 95%</strong> pour les visas, 
                nous sommes fiers d'être le pont entre l'Afrique et l'excellence académique française.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center bg-blue-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-900">500+</div>
                <div className="text-sm text-gray-600">Étudiants</div>
              </div>
              <div className="text-center bg-yellow-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-yellow-600">95%</div>
                <div className="text-sm text-gray-600">Succès Visa</div>
              </div>
              <div className="text-center bg-green-50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-600">20+</div>
                <div className="text-sm text-gray-600">Universités</div>
              </div>
            </div>
          </div>

          <div>
            <Image 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8078f7c5-078f-41b9-ab9d-87714686dab2.png"
              alt="Campus universitaire français avec étudiants internationaux"
              className="rounded-3xl shadow-2xl w-full object-cover h-96"
              width={500}
              height={384}
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h3 className="font-montserrat font-bold text-3xl text-blue-900 text-center mb-12">
            Nos Valeurs Fondamentales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="font-montserrat font-bold text-xl text-blue-900 mb-4">
                  {value.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h3 className="font-montserrat font-bold text-3xl text-blue-900 text-center mb-12">
            Notre Équipe d'Experts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                  activeTeamMember === index ? 'ring-4 ring-yellow-500 scale-105' : ''
                }`}
                onClick={() => setActiveTeamMember(activeTeamMember === index ? null : index)}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={256}
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                    {member.experience}
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-montserrat font-bold text-xl text-blue-900 mb-2">
                    {member.name}
                  </h4>
                  <p className="text-yellow-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.speciality}</p>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    activeTeamMember === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-gray-600 text-sm leading-relaxed pt-4 border-t border-gray-200">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={achievementsRef} className="mb-20">
          <h3 className="font-montserrat font-bold text-3xl text-blue-900 text-center mb-12">
            Notre Parcours d'Excellence
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-500 to-blue-900 h-full hidden lg:block"></div>

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`achievement-item flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                  data-index={index}
                >
                  {/* Achievement Content */}
                  <div className={`w-full lg:w-5/12 ${
                    visibleAchievements.includes(index)
                      ? 'transform translate-x-0 opacity-100'
                      : index % 2 === 0
                        ? 'transform -translate-x-10 opacity-0'
                        : 'transform translate-x-10 opacity-0'
                  } transition-all duration-1000`}
                  style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500">
                      <div className="text-yellow-600 font-bold text-lg mb-2">
                        {achievement.year}
                      </div>
                      <h4 className="font-montserrat font-bold text-lg text-blue-900 mb-3">
                        {achievement.milestone}
                      </h4>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full items-center justify-center shadow-lg z-10">
                    <span className="text-blue-900 font-bold text-sm">
                      {achievement.year.slice(-2)}
                    </span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-white">
            <h3 className="font-montserrat font-bold text-3xl mb-6">
              Rejoignez Notre Histoire de Succès
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Avec notre expertise reconnue et notre passion pour votre réussite, 
              votre projet d'études en France devient une réalité accessible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 py-3 rounded-full text-lg transition-all duration-300 hover:scale-105"
              >
                🤝 Rencontrer l'équipe
              </button>
              <button
                onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-blue-900 font-bold px-8 py-3 rounded-full text-lg transition-all duration-300"
              >
                📚 Découvrir nos services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}