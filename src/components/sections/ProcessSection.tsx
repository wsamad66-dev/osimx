'use client'

import { useState, useEffect, useRef } from 'react'

const processSteps = [
  {
    id: 1,
    icon: '🎯',
    title: 'Évaluation & Orientation',
    description: 'Analyse complète de votre profil académique, définition de vos objectifs d\'études et identification des meilleures universités françaises correspondant à votre projet.',
    duration: '1-2 semaines',
    tasks: [
      'Analyse du profil académique',
      'Définition des objectifs d\'études',
      'Sélection des universités cibles',
      'Plan d\'action personnalisé'
    ]
  },
  {
    id: 2,
    icon: '📋',
    title: 'Préparation du Dossier',
    description: 'Constitution méticuleuse de votre dossier d\'admission avec tous les documents requis, optimisé pour maximiser vos chances d\'acceptation.',
    duration: '3-4 semaines',
    tasks: [
      'Collecte et vérification des documents',
      'Rédaction lettres de motivation',
      'Préparation CV académique',
      'Traductions certifiées'
    ]
  },
  {
    id: 3,
    icon: '🎓',
    title: 'Candidature & Admission',
    description: 'Soumission stratégique de vos candidatures via Campus France et suivi personnalisé jusqu\'à l\'obtention de votre lettre d\'admission.',
    duration: '2-8 semaines',
    tasks: [
      'Soumission candidatures Campus France',
      'Suivi des dossiers en temps réel',
      'Communication avec universités',
      'Négociation conditions d\'admission'
    ]
  },
  {
    id: 4,
    icon: '✈️',
    title: 'Démarches Visa',
    description: 'Accompagnement complet pour l\'obtention de votre visa étudiant, préparation à l\'entretien consulaire et suivi jusqu\'à l\'obtention.',
    duration: '4-6 semaines',
    tasks: [
      'Préparation dossier visa complet',
      'Simulation d\'entretien consulaire',
      'Prise de rendez-vous consulat',
      'Suivi procédure visa'
    ]
  },
  {
    id: 5,
    icon: '🏠',
    title: 'Logement & Préparatifs',
    description: 'Recherche et sécurisation de votre logement en France, préparation de votre arrivée et organisation des premiers pas.',
    duration: '2-3 semaines',
    tasks: [
      'Recherche logement CROUS/privé',
      'Réservation et garanties',
      'Préparation checklist départ',
      'Information vie étudiante'
    ]
  },
  {
    id: 6,
    icon: '🌟',
    title: 'Installation & Suivi',
    description: 'Accompagnement à votre arrivée en France, aide aux démarches administratives et suivi continu pour garantir votre réussite.',
    duration: 'Continu',
    tasks: [
      'Accueil à l\'arrivée en France',
      'Démarches administratives (CAF, banque)',
      'Orientation universitaire',
      'Suivi académique et personnel'
    ]
  }
]

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step') || '0')
            setVisibleSteps(prev => [...new Set([...prev, stepIndex])])
          }
        })
      },
      { threshold: 0.3 }
    )

    const stepElements = document.querySelectorAll('.process-step')
    stepElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h100v100h-100z' fill='none'/%3E%3Cpath d='m0 0 50 50-50 50v-100' fill='%23001F3F'/%3E%3Cpath d='m50 0 50 50-50 50v-100' fill='%23FFD700'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl text-blue-900 mb-6">
            Votre Parcours Vers la France
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Un processus structuré et éprouvé, adapté à chaque étudiant pour maximiser vos chances de succès. 
            De l'évaluation initiale à votre installation en France, nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-500 to-blue-900 h-full hidden lg:block"></div>

          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={`process-step flex items-center mb-20 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}
              data-step={step.id}
            >
              {/* Step Content */}
              <div className={`w-full lg:w-5/12 ${
                visibleSteps.includes(step.id) 
                  ? 'transform translate-x-0 opacity-100' 
                  : index % 2 === 0 
                    ? 'transform -translate-x-10 opacity-0' 
                    : 'transform translate-x-10 opacity-0'
              } transition-all duration-1000`}
              style={{ transitionDelay: `${index * 200}ms` }}>
                <div 
                  className={`bg-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group ${
                    activeStep === step.id ? 'ring-4 ring-yellow-500 scale-105' : ''
                  }`}
                  onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                >
                  {/* Step Header */}
                  <div className="flex items-start mb-6">
                    <div className="text-5xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-montserrat font-bold text-xl text-blue-900 mb-2">
                        {step.title}
                      </h3>
                      <div className="text-yellow-600 font-semibold text-sm bg-yellow-100 rounded-full px-3 py-1 inline-block">
                        ⏱️ {step.duration}
                      </div>
                    </div>
                  </div>

                  {/* Step Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Task List - Expandable */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    activeStep === step.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-blue-900 mb-3">Tâches incluses :</h4>
                      <ul className="space-y-2">
                        {step.tasks.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Number Circle */}
              <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-yellow-500 rounded-full items-center justify-center shadow-lg z-10 group-hover:scale-125 transition-transform duration-300">
                <span className="font-bold text-2xl text-blue-900">{step.id}</span>
              </div>

              {/* Mobile Step Number */}
              <div className="lg:hidden w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="font-bold text-lg text-blue-900">{step.id}</span>
              </div>

              {/* Spacer */}
              <div className="hidden lg:block w-5/12"></div>
            </div>
          ))}
        </div>

        {/* Success Guarantee */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-12 border border-green-200">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="font-montserrat font-bold text-3xl text-blue-900 mb-4">
              Garantie de Réussite
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Notre processus éprouvé vous garantit les meilleures chances de succès. 
              Avec 95% de taux de réussite visa et plus de 500 étudiants accompagnés, 
              votre projet d'études en France est entre de bonnes mains.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="text-green-600 font-bold">✓</span>
                <span className="ml-2 text-gray-700">Suivi personnalisé</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="text-green-600 font-bold">✓</span>
                <span className="ml-2 text-gray-700">Expertise reconnue</span>
              </div>
              <div className="bg-white rounded-full px-6 py-3 shadow-md">
                <span className="text-green-600 font-bold">✓</span>
                <span className="ml-2 text-gray-700">Accompagnement continu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}