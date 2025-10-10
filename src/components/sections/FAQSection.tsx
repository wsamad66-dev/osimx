'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MessageCircle, Clock, Euro, Award, GraduationCap, FileCheck, Home, CreditCard, MapPin, Shield, HelpCircle } from 'lucide-react'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

// Categorized FAQs with icons for better UX
const faqCategories = [
  {
    category: 'Les Plus Demandées',
    faqs: [
      {
        id: 'faq-1',
        icon: Clock,
        question: 'Quels sont les délais pour commencer les démarches ?',
        answer: 'Nous recommandons de commencer au moins 8-12 mois avant la rentrée universitaire. Pour la France, les admissions se font généralement entre novembre et mars pour une rentrée en septembre. Pour le Canada, il est préférable de commencer 12-18 mois à l\'avance.',
        featured: true
      },
      {
        id: 'faq-2',
        icon: Euro,
        question: 'Combien coûte réellement un accompagnement ?',
        answer: 'Nos formules varient de 299€ (Basic) à 1,299€ (VIP) selon le niveau d\'accompagnement souhaité. La formule Premium à 699€ est la plus populaire et inclut l\'accompagnement complet de l\'admission au visa. Tous nos tarifs sont transparents et sans frais cachés.',
        featured: true
      },
      {
        id: 'faq-3',
        icon: Award,
        question: 'Quel est votre taux de réussite pour les visas ?',
        answer: 'Notre taux de réussite est de 95% pour les demandes de visa étudiant. Nous préparons minutieusement chaque dossier et effectuons des simulations d\'entretien pour maximiser vos chances. Les 5% d\'échecs sont généralement dus à des situations exceptionnelles (antécédents de refus, problèmes de documents civils, etc.).',
        featured: true
      },
    ]
  },
  {
    category: 'Financement & Paiement',
    faqs: [
      {
        id: 'faq-4',
        icon: GraduationCap,
        question: 'Puis-je obtenir une bourse d\'études ?',
        answer: 'Oui, nous vous aidons à identifier et postuler aux bourses disponibles selon votre profil : bourses Eiffel (France), bourses CSC (Chine), bourses gouvernementales canadiennes, etc. De nombreuses bourses couvrent partiellement ou totalement les frais de scolarité et de vie.',
        featured: false
      },
      {
        id: 'faq-8',
        icon: CreditCard,
        question: 'Proposez-vous un paiement échelonné ?',
        answer: 'Oui, nous proposons des facilités de paiement en 2 ou 3 fois sans frais pour toutes nos formules Premium et VIP. Contactez-nous pour discuter d\'un plan de paiement adapté à votre situation.',
        featured: false
      },
    ]
  },
  {
    category: 'Processus & Documents',
    faqs: [
      {
        id: 'faq-7',
        icon: FileCheck,
        question: 'Quels documents dois-je préparer ?',
        answer: 'Les documents de base incluent : diplômes et relevés de notes, passeport valide, CV, lettre de motivation, certificat de naissance, preuves de ressources financières. La liste exacte varie selon la destination et le programme. Nous vous fournirons une checklist complète personnalisée.',
        featured: false
      },
      {
        id: 'faq-9',
        icon: MapPin,
        question: 'Combien de temps prend l\'obtention du visa ?',
        answer: 'Les délais varient selon le pays : France (4-8 semaines après Campus France), Belgique (3-6 mois), Canada (8-12 semaines), Italie (4-6 semaines), Chine (2-4 semaines). Nous vous accompagnons tout au long du processus et vous tenons informé à chaque étape.',
        featured: false
      },
    ]
  },
  {
    category: 'Services & Garanties',
    faqs: [
      {
        id: 'faq-5',
        icon: Shield,
        question: 'Que se passe-t-il si je n\'obtiens pas d\'admission ?',
        answer: 'Nous travaillons avec vous jusqu\'à l\'obtention d\'au moins une admission. Si après tous nos efforts vous n\'obtenez aucune admission dans les universités ciblées, nous proposons des alternatives ou un remboursement partiel selon les conditions de votre formule.',
        featured: false
      },
      {
        id: 'faq-6',
        icon: Home,
        question: 'Aidez-vous à trouver un logement étudiant ?',
        answer: 'Oui, nos formules Premium et VIP incluent une aide à la recherche de logement. Nous vous orientons vers les résidences CROUS, les résidences privées étudiantes, et les options de colocation selon votre budget et vos préférences.',
        featured: false
      },
      {
        id: 'faq-10',
        icon: Award,
        question: 'Offrez-vous une garantie de satisfaction ?',
        answer: 'Notre formule VIP inclut une garantie satisfaction : si vous n\'êtes pas satisfait de notre accompagnement dans les 30 premiers jours, nous vous remboursons intégralement. Pour toutes nos formules, nous nous engageons à vous accompagner jusqu\'à l\'atteinte de vos objectifs.',
        featured: false
      },
    ]
  }
]

// Flatten for Schema.org
const allFaqs = faqCategories.flatMap(cat => cat.faqs)

export function FAQSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-semibold text-sm mb-4">
            <HelpCircle className="w-4 h-4" />
            Questions Fréquentes
          </div>
          <h2 className="font-poppins font-bold text-4xl sm:text-5xl text-brand-navy mb-4">
            Tout ce que vous devez <span className="text-brand-primary">savoir</span>
          </h2>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto">
            Retrouvez les réponses aux questions les plus posées par nos futurs étudiants
          </p>
        </div>

        {/* Categorized FAQs */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category Title */}
              <h3 className="font-poppins font-bold text-xl text-brand-navy mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-brand-orange rounded-full"></span>
                {category.category}
              </h3>

              {/* Category FAQs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <Accordion type="single" collapsible>
                  {category.faqs.map((faq) => {
                    const Icon = faq.icon
                    return (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className={`border-b border-gray-100 last:border-0 transition-all duration-200 ${
                          faq.featured ? 'bg-brand-bg-blue/30' : ''
                        }`}
                      >
                        <AccordionTrigger className="text-left font-poppins font-semibold text-brand-navy hover:text-brand-primary px-6 py-5 group transition-all">
                          <div className="flex items-start gap-4 w-full">
                            {/* Icon */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                              <Icon className="w-5 h-5 text-brand-primary" />
                            </div>

                            {/* Question Text */}
                            <span className="flex-1 text-base sm:text-lg pr-4">
                              {faq.question}
                            </span>

                            {/* Featured Badge */}
                            {faq.featured && (
                              <span className="hidden sm:inline-flex items-center gap-1 bg-brand-orange/10 text-brand-orange px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                Populaire
                              </span>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 font-inter px-6 pb-6 pl-20">
                          <div className="border-l-2 border-brand-primary/20 pl-4">
                            {faq.answer}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Card */}
        <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary-light to-brand-primary rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-navy/20 rounded-full blur-2xl -ml-24 -mb-24"></div>

          <div className="relative text-center">
            {/* Icon with Animation */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8" />
            </div>

            <h3 className="font-poppins font-bold text-2xl sm:text-3xl mb-3">
              Vous avez encore des questions ?
            </h3>
            <p className="text-white/90 mb-8 font-inter text-lg max-w-xl mx-auto">
              Notre équipe d'experts est disponible pour répondre à toutes vos interrogations personnalisées
            </p>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Contactez-nous maintenant
            </Button>

            {/* Trust Indicator */}
            <p className="mt-6 text-sm text-white/70">
              Réponse garantie sous 24h • 7j/7 par WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Schema.org FAQ Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: allFaqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
              }
            }))
          })
        }}
      />

      <QuickRegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  )
}
