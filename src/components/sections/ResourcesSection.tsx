'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const resourceCategories = [
  {
    id: 1,
    icon: '📚',
    title: 'Guides Téléchargeables',
    description: 'Documentation complète pour préparer votre projet d\'études en France',
    resources: [
      {
        name: 'Guide Complet Campus France',
        description: 'Processus de candidature étape par étape',
        format: 'PDF - 45 pages',
        popular: true
      },
      {
        name: 'Checklist Documents Visa',
        description: 'Liste exhaustive des pièces requises',
        format: 'PDF - 12 pages',
        popular: true
      },
      {
        name: 'Budget Étudiant France 2024',
        description: 'Coûts détaillés par ville et région',
        format: 'Excel + PDF - 20 pages',
        popular: false
      },
      {
        name: 'Packing List pour la France',
        description: 'Que emporter pour votre installation',
        format: 'PDF - 8 pages',
        popular: false
      }
    ],
    color: 'blue'
  },
  {
    id: 2,
    icon: '🎥',
    title: 'Vidéos Éducatives',
    description: 'Tutoriels vidéo pour vous guider dans chaque étape',
    resources: [
      {
        name: 'Simulation Entretien Consulaire',
        description: '10 questions types et réponses modèles',
        format: 'Vidéo - 25 min',
        popular: true
      },
      {
        name: 'Vie Étudiante à Paris',
        description: 'Témoignages et conseils pratiques',
        format: 'Vidéo - 18 min',
        popular: false
      },
      {
        name: 'Recherche de Logement CROUS',
        description: 'Procédure pas à pas avec demo',
        format: 'Vidéo - 15 min',
        popular: true
      },
      {
        name: 'Système Universitaire Français',
        description: 'Comprendre LMD, ECTS et évaluations',
        format: 'Vidéo - 20 min',
        popular: false
      }
    ],
    color: 'yellow'
  },
  {
    id: 3,
    icon: '🧮',
    title: 'Outils Interactifs',
    description: 'Calculateurs et outils pour planifier votre projet',
    resources: [
      {
        name: 'Calculateur de Coûts d\'Études',
        description: 'Estimez votre budget selon la ville',
        format: 'Outil web interactif',
        popular: true
      },
      {
        name: 'Test de Niveau Français',
        description: 'Évaluez votre niveau B1/B2/C1',
        format: 'Quiz interactif - 30 min',
        popular: false
      },
      {
        name: 'Finder d\'Universités',
        description: 'Trouvez votre programme idéal',
        format: 'Base de données interactive',
        popular: true
      },
      {
        name: 'Timeline Personnalisée',
        description: 'Planifiez vos démarches mois par mois',
        format: 'Outil de planification',
        popular: false
      }
    ],
    color: 'green'
  },
  {
    id: 4,
    icon: '📝',
    title: 'Templates & Modèles',
    description: 'Documents pré-formatés pour accélérer vos démarches',
    resources: [
      {
        name: 'Modèle Lettre de Motivation',
        description: '5 exemples par domaine d\'études',
        format: 'Word + PDF',
        popular: true
      },
      {
        name: 'CV Format Européen',
        description: 'Template CV optimisé pour la France',
        format: 'Word + PDF',
        popular: true
      },
      {
        name: 'Lettre de Recommandation',
        description: 'Guide pour vos professeurs',
        format: 'Word template',
        popular: false
      },
      {
        name: 'Plan Financier Personnel',
        description: 'Budget détaillé pour visa',
        format: 'Excel template',
        popular: false
      }
    ],
    color: 'purple'
  }
]

const blogPosts = [
  {
    title: 'Nouvelles Réformes Visa Étudiant 2024',
    excerpt: 'Découvrez les derniers changements dans les procédures de visa étudiant pour la France.',
    date: '15 Janvier 2024',
    readTime: '5 min',
    category: 'Visa',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e21bcf0-84d6-43c8-867d-f29e565ea233.png'
  },
  {
    title: 'Top 10 des Villes Étudiantes Françaises',
    excerpt: 'Classement des meilleures destinations pour les étudiants internationaux en 2024.',
    date: '10 Janvier 2024',
    readTime: '8 min',
    category: 'Vie Étudiante',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8c404d3b-a8c0-4a13-86bb-34e02de18410.png'
  },
  {
    title: 'Bourses Eiffel 2024 : Guide Complet',
    excerpt: 'Tout savoir sur les bourses d\'excellence du gouvernement français pour étudiants étrangers.',
    date: '5 Janvier 2024',
    readTime: '12 min',
    category: 'Bourses',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1954451c-0698-44ad-a538-375651003ef3.png'
  }
]

export function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState(1)
  const [emailForDownload, setEmailForDownload] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)

  const handleResourceDownload = () => {
    setShowEmailModal(true)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the email submission
    console.log('Email for download:', emailForDownload)
    setShowEmailModal(false)
    setEmailForDownload('')
    // Show success message or trigger download
  }

  const currentCategory = resourceCategories.find(cat => cat.id === activeCategory)

  return (
    <section id="ressources" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23001F3F' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-40z'/%3E%3Cpath d='m40 40v-40l-40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl text-blue-900 mb-6">
            Espace Ressources Étudiants
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Accédez gratuitement à notre bibliothèque complète de ressources : guides détaillés, 
            outils interactifs, vidéos explicatives et templates pour réussir votre projet d'études en France.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {resourceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-900 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Content */}
          {currentCategory && (
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{currentCategory.icon}</div>
                <h3 className="font-montserrat font-bold text-2xl text-blue-900 mb-3">
                  {currentCategory.title}
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {currentCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentCategory.resources.map((resource, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-md transition-all duration-300 group border"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-lg text-blue-900 group-hover:text-blue-700">
                        {resource.name}
                      </h4>
                      {resource.popular && (
                        <span className="bg-yellow-500 text-blue-900 px-2 py-1 rounded-full text-xs font-bold">
                          ⭐ Populaire
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs bg-gray-200 px-3 py-1 rounded-full">
                        {resource.format}
                      </span>
                      <Button
                        onClick={handleResourceDownload}
                        size="sm"
                        className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-semibold rounded-full px-4"
                      >
                        📥 Télécharger
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Blog Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="font-montserrat font-bold text-3xl text-blue-900 mb-4">
              Blog & Actualités
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Restez informés des dernières actualités sur les études en France, 
              les changements de réglementations et nos conseils d'experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    width={400}
                    height={192}
                  />
                  <div className="absolute top-4 left-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
                    {post.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime} de lecture</span>
                  </div>
                  
                  <h4 className="font-montserrat font-bold text-lg text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-500 transition-colors">
                    <span>Lire la suite</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-blue-900 text-white hover:bg-blue-800 font-semibold px-8 py-3 rounded-full"
            >
              📖 Voir tous les articles
            </Button>
          </div>
        </div>

        {/* FAQ Quick Access */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="font-montserrat font-bold text-3xl text-blue-900 mb-4">
              Questions Fréquemment Posées
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions les plus courantes 
              sur les procédures, coûts, délais et conditions d'études en France.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Quel est le coût total des études en France ?',
              'Combien de temps pour obtenir un visa ?',
              'Comment trouver un logement étudiant ?',
              'Quelles sont les conditions d\'admission ?',
              'Comment obtenir une bourse d\'études ?',
              'Peut-on travailler avec un visa étudiant ?'
            ].map((question, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-4 hover:bg-yellow-50 hover:border-yellow-500 border-2 border-transparent transition-all duration-300 cursor-pointer group"
              >
                <p className="text-blue-900 font-medium group-hover:text-yellow-600 transition-colors">
                  {question}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 py-3 rounded-full"
            >
              💬 Voir toute la FAQ
            </Button>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl p-12 text-white">
            <div className="text-5xl mb-4">📬</div>
            <h3 className="font-montserrat font-bold text-3xl mb-4">
              Restez Informé des Dernières Actualités
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Recevez chaque semaine nos conseils d'experts, les dernières informations 
              sur les visas et nos nouvelles ressources exclusives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 bg-white border-0 focus:ring-4 focus:ring-yellow-500 focus:outline-none"
              />
              <Button className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 py-3 rounded-full whitespace-nowrap">
                🚀 S'abonner gratuitement
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal for Downloads */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">📧</div>
              <h3 className="font-montserrat font-bold text-2xl text-blue-900 mb-2">
                Téléchargement Gratuit
              </h3>
              <p className="text-gray-600">
                Entrez votre email pour recevoir votre ressource gratuitement
              </p>
            </div>

            <form onSubmit={handleEmailSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  value={emailForDownload}
                  onChange={(e) => setEmailForDownload(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-4 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  variant="outline"
                  className="flex-1 rounded-full"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-blue-900 hover:bg-yellow-400 rounded-full font-bold"
                >
                  📥 Télécharger
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}