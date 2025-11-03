'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  BookOpen, 
  Globe, 
  GraduationCap, 
  FileText,
  Heart,
  Zap,
  X
} from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'admission' | 'visa' | 'finance' | 'vie'
  tags: string[]
  helpful?: number
}

const faqData: FAQItem[] = [
  // Général
  {
    id: '1',
    question: 'Comment L\'Étudiant à l\'Étranger peut-il m\'aider?',
    answer: 'Nous vous accompagnons à chaque étape : choix du pays et de l\'université, constitution du dossier, demande de visa, recherche de logement, et suivi jusqu\'à votre installation. Notre équipe d\'experts vous guide gratuitement avec un taux de réussite de 98%.',
    category: 'general',
    tags: ['accompagnement', 'services', 'gratuit'],
    helpful: 234
  },
  {
    id: '2',
    question: 'Vos services sont-ils vraiment gratuits?',
    answer: 'Oui, absolument! Notre accompagnement de base est 100% gratuit. Nous sommes rémunérés par les universités partenaires. Vous ne payez que les frais officiels (visa, traduction de documents, etc.).',
    category: 'general',
    tags: ['gratuit', 'prix', 'coûts'],
    helpful: 189
  },
  {
    id: '3',
    question: 'Combien de temps prend le processus complet?',
    answer: 'En moyenne, le processus complet prend 3 à 6 mois. Cela dépend du pays choisi, de la rapidité de constitution de votre dossier, et des délais administratifs. Nous vous accompagnons à chaque étape pour optimiser les délais.',
    category: 'general',
    tags: ['délais', 'temps', 'durée'],
    helpful: 156
  },
  
  // Admission
  {
    id: '4',
    question: 'Quels sont les critères d\'admission?',
    answer: 'Les critères varient selon le pays et l\'université. Généralement : diplômes requis (bac, licence, etc.), niveau de langue (français, anglais), relevés de notes satisfaisants, et lettre de motivation convaincante. Nous évaluons votre profil gratuitement.',
    category: 'admission',
    tags: ['critères', 'admission', 'diplômes'],
    helpful: 312
  },
  {
    id: '5',
    question: 'Puis-je étudier sans le IELTS/TOEFL?',
    answer: 'Oui, c\'est possible dans plusieurs universités! Certaines acceptent des certificats alternatifs, d\'autres proposent des cours de langue préparatoires. Nous connaissons toutes les options pour votre profil.',
    category: 'admission',
    tags: ['langue', 'tests', 'IELTS', 'TOEFL'],
    helpful: 267
  },
  {
    id: '6',
    question: 'Comment choisir la bonne université?',
    answer: 'Nous analysons ensemble : votre domaine d\'études, votre budget, vos préférences de localisation, le classement des universités, les opportunités post-diplôme, et votre profil académique. Notre expertise vous aide à faire le meilleur choix.',
    category: 'admission',
    tags: ['université', 'choix', 'orientation'],
    helpful: 198
  },

  // Visa
  {
    id: '7',
    question: 'Quels documents sont nécessaires pour le visa étudiant?',
    answer: 'Documents types : passeport valide, lettre d\'admission, preuve de moyens financiers, assurance santé, certificat de naissance, diplômes traduits. La liste exacte varie selon le pays. Nous vous fournissons un checklist personnalisé.',
    category: 'visa',
    tags: ['visa', 'documents', 'dossier'],
    helpful: 289
  },
  {
    id: '8',
    question: 'Quel est le taux d\'acceptation des visas?',
    answer: 'Avec notre accompagnement, le taux d\'acceptation est de 98%! Nous préparons méticuleusement votre dossier et vous entraînons pour l\'entretien. Nos experts connaissent les exigences exactes de chaque ambassade.',
    category: 'visa',
    tags: ['visa', 'taux', 'réussite'],
    helpful: 245
  },
  {
    id: '9',
    question: 'Combien de temps prend l\'obtention du visa?',
    answer: 'Les délais varient : 2-4 semaines (France), 4-8 semaines (Canada), 3-6 semaines (USA). Nous vous aidons à déposer votre demande au bon moment pour éviter tout retard dans votre rentrée universitaire.',
    category: 'visa',
    tags: ['visa', 'délais', 'temps'],
    helpful: 178
  },

  // Finance
  {
    id: '10',
    question: 'Quelles sont les bourses disponibles?',
    answer: 'De nombreuses bourses existent! Bourses gouvernementales (Eiffel, DAAD, CSC), bourses universitaires (mérite, excellence), bourses privées. Nous vous aidons à identifier et postuler aux bourses pour lesquelles vous êtes éligible.',
    category: 'finance',
    tags: ['bourses', 'financement', 'aide'],
    helpful: 421
  },
  {
    id: '11',
    question: 'Quel budget prévoir pour les études à l\'étranger?',
    answer: 'Budget moyen : 8,000-15,000€/an (France), 15,000-30,000$/an (Canada), variables selon le pays. Inclut : frais de scolarité, logement, nourriture, transport, assurance. Nous créons un budget personnalisé pour votre projet.',
    category: 'finance',
    tags: ['budget', 'coûts', 'prix'],
    helpful: 356
  },
  {
    id: '12',
    question: 'Puis-je travailler pendant mes études?',
    answer: 'Oui! La plupart des pays permettent aux étudiants de travailler : 20h/semaine (France, Canada, UK), temps plein pendant les vacances. Cela aide à couvrir vos dépenses quotidiennes. Nous vous informons des règles spécifiques à chaque pays.',
    category: 'finance',
    tags: ['travail', 'job', 'emploi'],
    helpful: 298
  },

  // Vie étudiante
  {
    id: '13',
    question: 'Comment trouver un logement étudiant?',
    answer: 'Plusieurs options : résidences universitaires (économiques), appartements partagés, familles d\'accueil. Nous vous aidons à trouver un logement avant votre départ et vous conseillons sur les meilleures options selon votre budget.',
    category: 'vie',
    tags: ['logement', 'hébergement', 'appartement'],
    helpful: 267
  },
  {
    id: '14',
    question: 'Comment m\'adapter à la vie à l\'étranger?',
    answer: 'Nous offrons un accompagnement complet : orientation pré-départ, connexion avec d\'autres étudiants, conseils culturels, groupe WhatsApp communautaire. Plus de 10,000 étudiants sont passés par là, vous ne serez jamais seul!',
    category: 'vie',
    tags: ['adaptation', 'culture', 'vie'],
    helpful: 234
  },
  {
    id: '15',
    question: 'Y a-t-il une communauté d\'étudiants?',
    answer: 'Absolument! Nous avons une communauté active de 500+ étudiants partout dans le monde. Groupes WhatsApp par pays, événements mensuels, système de parrainage. Vous intégrerez un réseau solidaire dès votre inscription.',
    category: 'vie',
    tags: ['communauté', 'réseau', 'étudiants'],
    helpful: 189
  }
]

const categories = [
  { id: 'all', name: 'Tout', icon: BookOpen, color: 'blue' },
  { id: 'general', name: 'Général', icon: HelpCircle, color: 'purple' },
  { id: 'admission', name: 'Admission', icon: GraduationCap, color: 'green' },
  { id: 'visa', name: 'Visa', icon: FileText, color: 'orange' },
  { id: 'finance', name: 'Finance', icon: Zap, color: 'yellow' },
  { id: 'vie', name: 'Vie Étudiante', icon: Heart, color: 'pink' }
]

export function AdvancedFAQ() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItemId, setOpenItemId] = useState<string | null>(null)
  const [helpfulItems, setHelpfulItems] = useState<Set<string>>(new Set())
  const [showAll, setShowAll] = useState(false)

  // Filter FAQs
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Show only 3 by default, or all if showAll is true or searching/filtering
  const displayedFAQs = (showAll || searchQuery || selectedCategory !== 'all') 
    ? filteredFAQs 
    : filteredFAQs.slice(0, 3)

  const hasMore = filteredFAQs.length > 3 && !showAll && !searchQuery && selectedCategory === 'all'

  const toggleItem = (id: string) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  const markHelpful = (id: string) => {
    if (!helpfulItems.has(id)) {
      setHelpfulItems(new Set([...helpfulItems, id]))
    }
  }

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId)
    return category?.color || 'blue'
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-200/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          >
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-semibold text-sm">Questions Fréquentes</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
            Tout ce que vous devez{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                savoir
              </span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-blue-400/30 blur-sm -z-10" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Trouvez rapidement des réponses à vos questions sur les études à l'étranger
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une question... (ex: visa, bourses, admission)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-5 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Search results count */}
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-3 text-center"
            >
              {displayedFAQs.length} résultat{displayedFAQs.length !== 1 ? 's' : ''} trouvé{displayedFAQs.length !== 1 ? 's' : ''}
            </motion.p>
          )}

          {/* Show count when filtered by category */}
          {!searchQuery && selectedCategory !== 'all' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-3 text-center"
            >
              {displayedFAQs.length} question{displayedFAQs.length !== 1 ? 's' : ''} dans cette catégorie
            </motion.p>
          )}

          {/* Show count in default view */}
          {!searchQuery && selectedCategory === 'all' && !showAll && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600 mt-3 text-center"
            >
              Affichage de {displayedFAQs.length} sur {filteredFAQs.length} questions
            </motion.p>
          )}
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.id
            
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  group relative px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r from-${category.color}-500 to-${category.color}-600 text-white shadow-lg shadow-${category.color}-500/30`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  {category.name}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence mode="wait">
            {displayedFAQs.length > 0 ? (
              displayedFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <div
                    className={`
                      bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
                      ${openItemId === faq.id 
                        ? 'border-blue-500 shadow-xl shadow-blue-500/10' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                      }
                    `}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full text-left p-6 flex items-start gap-4"
                    >
                      <div className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${openItemId === faq.id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                          : 'bg-gray-100 group-hover:bg-blue-50'
                        }
                      `}>
                        <HelpCircle className={`w-5 h-5 ${openItemId === faq.id ? 'text-white' : 'text-gray-600'}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 pr-8">
                          {faq.question}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: openItemId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className={`w-6 h-6 ${openItemId === faq.id ? 'text-blue-600' : 'text-gray-400'}`} />
                      </motion.div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence>
                      {openItemId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pl-20">
                            <div className="prose prose-lg max-w-none">
                              <p className="text-gray-700 leading-relaxed mb-6">
                                {faq.answer}
                              </p>
                            </div>

                            {/* Helpful section */}
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                              <span className="text-sm text-gray-600">Cette réponse vous a été utile?</span>
                              <button
                                onClick={() => markHelpful(faq.id)}
                                disabled={helpfulItems.has(faq.id)}
                                className={`
                                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                                  ${helpfulItems.has(faq.id)
                                    ? 'bg-green-100 text-green-700 cursor-default'
                                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'
                                  }
                                `}
                              >
                                <Heart className={`w-4 h-4 ${helpfulItems.has(faq.id) ? 'fill-green-700' : ''}`} />
                                <span className="text-sm font-medium">
                                  {helpfulItems.has(faq.id) ? 'Merci!' : 'Oui'}
                                </span>
                              </button>
                              {faq.helpful && (
                                <span className="text-sm text-gray-500">
                                  {faq.helpful + (helpfulItems.has(faq.id) ? 1 : 0)} personnes ont trouvé cela utile
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-600 mb-6">
                  Essayez d'autres mots-clés ou changez de catégorie
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More Button */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-8"
            >
              <motion.button
                onClick={() => setShowAll(true)}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-3">
                  <span>Voir toutes les questions</span>
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-sm">
                    {filteredFAQs.length} questions
                  </span>
                </span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                />
              </motion.button>
            </motion.div>
          )}

          {/* Show Less Button (when all are shown) */}
          {showAll && !searchQuery && selectedCategory === 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pt-8"
            >
              <motion.button
                onClick={() => {
                  setShowAll(false)
                  // Scroll back to FAQ section
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronDown className="w-5 h-5 rotate-180" />
                </motion.span>
                Voir moins
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Vous n'avez pas trouvé votre réponse?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Notre équipe d'experts est là pour répondre à toutes vos questions personnalisées
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
                  Parler à un conseiller
                </button>
                <button className="px-8 py-4 bg-blue-500/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-bold hover:bg-blue-500/30 transition-all duration-200">
                  Consulter nos guides
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
