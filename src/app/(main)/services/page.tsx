import type { Metadata } from 'next'
import { CheckCircle, GraduationCap, FileText, Home, Plane, DollarSign, Users, Clock } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nos Services | L\'Étudiant Étranger - Accompagnement Complet',
  description: 'De l\'admission à votre arrivée : accompagnement admission, visa, logement, bourses. Un service tout-en-un pour étudier à l\'étranger en toute sérénité.',
  keywords: 'accompagnement études étranger, admission université, visa étudiant, logement étudiant, bourses études',
}

export default function ServicesPage() {
  const services = [
    {
      icon: GraduationCap,
      title: 'Accompagnement Admission',
      description: 'Nous vous guidons dans le choix de votre université et programme, et vous accompagnons dans la constitution d\'un dossier d\'admission gagnant.',
      features: [
        'Analyse de votre profil académique',
        'Sélection des universités adaptées',
        'Rédaction lettres de motivation',
        'Préparation entretiens',
        'Suivi des candidatures',
      ],
      price: 'À partir de 500€',
      duration: '2-3 mois',
      successRate: '92%',
    },
    {
      icon: FileText,
      title: 'Assistance Visa',
      description: 'Maximisez vos chances d\'obtenir votre visa étudiant avec notre expertise et notre accompagnement personnalisé.',
      features: [
        'Vérification documents requis',
        'Constitution dossier visa',
        'Préparation entretien ambassade',
        'Suivi de votre demande',
        'Garantie remboursement si refus',
      ],
      price: 'À partir de 300€',
      duration: '1-2 mois',
      successRate: '85%',
    },
    {
      icon: Home,
      title: 'Recherche Logement',
      description: 'Trouvez votre logement idéal avant votre arrivée. Résidences étudiantes, appartements, colocations vérifiées.',
      features: [
        'Recherche logement personnalisée',
        'Visite virtuelle des logements',
        'Négociation avec propriétaires',
        'Aide à la signature du bail',
        'Réseau de logements vérifiés',
      ],
      price: 'À partir de 200€',
      duration: '2-4 semaines',
      successRate: '98%',
    },
    {
      icon: DollarSign,
      title: 'Bourses d\'Études',
      description: 'Accédez à notre base de données exclusive de bourses et augmentez vos chances d\'obtenir un financement.',
      features: [
        'Base de 500+ bourses disponibles',
        'Identification bourses adaptées',
        'Aide rédaction candidature',
        'Suivi des deadlines',
        'Conseils stratégiques',
      ],
      price: 'À partir de 150€',
      duration: '1-2 mois',
      successRate: '45%',
    },
    {
      icon: Plane,
      title: 'Préparation au Départ',
      description: 'Partez serein avec notre accompagnement complet : assurances, billets, documents administratifs, orientation culturelle.',
      features: [
        'Checklist départ complète',
        'Orientation culturelle',
        'Aide billets d\'avion',
        'Assurances étudiants',
        'Guide d\'installation',
      ],
      price: 'À partir de 100€',
      duration: '1 mois',
      successRate: '100%',
    },
    {
      icon: Users,
      title: 'Formule Tout-en-Un',
      description: 'L\'accompagnement complet de A à Z. De votre première candidature à votre installation dans votre nouveau pays.',
      features: [
        'Tous les services inclus',
        'Conseiller dédié 7j/7',
        'Garantie satisfaction',
        'Support illimité',
        'Économisez 30%',
      ],
      price: 'À partir de 1,200€',
      duration: '4-6 mois',
      successRate: '95%',
      featured: true,
    },
  ]

  const processSteps = [
    {
      step: '1',
      title: 'Consultation Gratuite',
      description: 'Discutez avec un conseiller pour définir vos besoins',
      duration: '30 min',
    },
    {
      step: '2',
      title: 'Proposition Personnalisée',
      description: 'Recevez un plan d\'action sur mesure',
      duration: '24h',
    },
    {
      step: '3',
      title: 'Accompagnement',
      description: 'Nous gérons toutes les démarches',
      duration: '2-6 mois',
    },
    {
      step: '4',
      title: 'Réussite',
      description: 'Vous partez étudier à l\'étranger !',
      duration: 'À vie',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-navy-900 via-navy-800 to-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nos Services d&apos;<span className="text-orange-400">Accompagnement</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              De l&apos;admission à votre arrivée, nous vous accompagnons à chaque étape de votre projet
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Clock className="w-5 h-5 inline mr-2" />
                Réponse en 24h
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <Users className="w-5 h-5 inline mr-2" />
                Conseillers experts
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <CheckCircle className="w-5 h-5 inline mr-2" />
                85% de réussite
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all ${
                  service.featured ? 'border-4 border-orange-500 transform scale-105' : 'border border-gray-200'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    ⭐ Le Plus Populaire
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${service.featured ? 'bg-orange-100' : 'bg-primary-100'}`}>
                    <service.icon className={`w-8 h-8 ${service.featured ? 'text-orange-600' : 'text-primary-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-900">{service.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{service.description}</p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Taux de réussite</span>
                    <span className="text-green-600 font-bold">{service.successRate}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 text-sm">Durée moyenne</span>
                    <span className="text-gray-800 font-semibold">{service.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Tarif</span>
                    <span className="text-navy-900 font-bold text-lg">{service.price}</span>
                  </div>
                </div>

                <Link href="/contact">
                  <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    service.featured
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}>
                    Commencer maintenant
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              Comment ça <span className="text-primary-600">fonctionne</span> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple et transparent en 4 étapes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {processSteps.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-orange-500 text-white rounded-2xl mb-6 text-3xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-primary-600 font-semibold">{item.duration}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-orange-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à commencer votre aventure ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Réservez votre consultation gratuite de 30 minutes avec un expert
          </p>
          <Link href="/contact">
            <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl transition-all">
              Réserver ma consultation gratuite
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
