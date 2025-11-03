import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function seedHomepageContent() {
  console.log('🌱 Création du contenu de la page d\'accueil...\n')

  try {
    // 1. Expertise Section
    console.log('📊 Création de la section Expertise...')
    const expertise = await client.createOrReplace({
      _id: 'expertise-section',
      _type: 'expertise',
      title: 'Une expertise prouvée',
      subtitle: 'Des chiffres qui parlent d\'eux-mêmes',
      stats: [
        {
          _key: 'students',
          number: '500+',
          label: 'Étudiants accompagnés',
          icon: '👥'
        },
        {
          _key: 'success',
          number: '95%',
          label: 'Taux de réussite',
          icon: '🎓'
        },
        {
          _key: 'countries',
          number: '15+',
          label: 'Pays partenaires',
          icon: '🌍'
        },
        {
          _key: 'experience',
          number: '10 ans',
          label: 'D\'expérience',
          icon: '⭐'
        }
      ]
    })
    console.log('✅ Expertise créée:', expertise._id)

    // 2. Services Section
    console.log('\n🛠️  Création de la section Services...')
    const services = await client.createOrReplace({
      _id: 'services-section',
      _type: 'services',
      title: 'Nos Services',
      subtitle: 'Un accompagnement complet pour votre réussite',
      servicesList: [
        {
          _key: 'orientation',
          title: 'Orientation Académique',
          description: 'Nous vous aidons à choisir le programme et l\'université qui correspondent à vos objectifs de carrière.',
          icon: '🎯',
          features: [
            'Analyse de votre profil',
            'Sélection des universités',
            'Choix du programme adapté',
            'Planification de carrière'
          ]
        },
        {
          _key: 'admission',
          title: 'Assistance Administrative',
          description: 'Nous gérons toutes les démarches administratives pour votre inscription et votre visa.',
          icon: '📋',
          features: [
            'Préparation des dossiers',
            'Demande d\'admission',
            'Demande de visa',
            'Suivi des candidatures'
          ]
        },
        {
          _key: 'logement',
          title: 'Logement & Installation',
          description: 'Nous vous aidons à trouver un logement et à vous installer dans votre nouveau pays.',
          icon: '🏠',
          features: [
            'Recherche de logement',
            'Assistance à l\'installation',
            'Ouverture de compte bancaire',
            'Formalités locales'
          ]
        },
        {
          _key: 'suivi',
          title: 'Suivi Personnalisé',
          description: 'Un accompagnement continu tout au long de votre parcours académique.',
          icon: '💼',
          features: [
            'Conseiller dédié',
            'Support 7j/7',
            'Aide aux démarches',
            'Réseau d\'anciens étudiants'
          ]
        }
      ]
    })
    console.log('✅ Services créés:', services._id)

    // 3. Testimonials Section
    console.log('\n💬 Création de la section Témoignages...')
    const testimonials = await client.createOrReplace({
      _id: 'testimonials-section',
      _type: 'testimonials',
      title: 'Témoignages',
      subtitle: 'Ce que disent nos étudiants',
      testimonialsList: [
        {
          _key: 'marie',
          name: 'Marie Dubois',
          role: 'Étudiante en Commerce',
          content: 'Grâce à OSIMX, j\'ai pu réaliser mon rêve d\'étudier au Canada. L\'équipe a été présente à chaque étape et m\'a guidée avec professionnalisme.',
          rating: 5,
          country: 'Canada'
        },
        {
          _key: 'ahmed',
          name: 'Ahmed Ben Ali',
          role: 'Étudiant en Ingénierie',
          content: 'Un accompagnement exceptionnel du début à la fin. Les démarches administratives ont été simplifiées et j\'ai obtenu mon visa sans problème.',
          rating: 5,
          country: 'France'
        },
        {
          _key: 'sophie',
          name: 'Sophie Martin',
          role: 'Étudiante en Design',
          content: 'L\'équipe OSIMX m\'a aidée à trouver l\'université parfaite pour mes études de design en Italie. Je recommande vivement leurs services !',
          rating: 5,
          country: 'Italy'
        },
        {
          _key: 'karim',
          name: 'Karim Hassan',
          role: 'Étudiant en Médecine',
          content: 'Service professionnel et attentionné. Mon conseiller était toujours disponible pour répondre à mes questions. Merci OSIMX !',
          rating: 5,
          country: 'USA'
        }
      ]
    })
    console.log('✅ Témoignages créés:', testimonials._id)

    // 4. FAQ Section
    console.log('\n❓ Création de la section FAQ...')
    const faq = await client.createOrReplace({
      _id: 'faq-section',
      _type: 'faq',
      title: 'Questions Fréquentes',
      subtitle: 'Tout ce que vous devez savoir',
      questions: [
        {
          _key: 'q1',
          question: 'Combien de temps prend le processus d\'admission ?',
          answer: 'Le processus complet prend généralement entre 3 et 6 mois, selon le pays et l\'université choisis. Nous vous recommandons de commencer vos démarches au moins 8 mois avant la rentrée.',
          category: 'inscriptions'
        },
        {
          _key: 'q2',
          question: 'Quels sont les frais de service ?',
          answer: 'Nos frais varient selon le package choisi et les services requis. Contactez-nous pour un devis personnalisé gratuit. Le premier rendez-vous de conseil est toujours gratuit.',
          category: 'general'
        },
        {
          _key: 'q3',
          question: 'Aidez-vous pour l\'obtention du visa ?',
          answer: 'Oui, nous vous accompagnons dans toutes les démarches de demande de visa : préparation du dossier, prise de rendez-vous, préparation à l\'entretien, et suivi de votre demande.',
          category: 'visa'
        },
        {
          _key: 'q4',
          question: 'Proposez-vous une aide au logement ?',
          answer: 'Oui, nous vous aidons à trouver un logement adapté à votre budget (résidence universitaire, appartement, colocation). Nous avons des partenaires dans chaque pays.',
          category: 'logement'
        },
        {
          _key: 'q5',
          question: 'Puis-je obtenir une bourse d\'études ?',
          answer: 'Oui, nous vous informons sur les bourses disponibles et vous aidons à constituer vos dossiers de candidature pour maximiser vos chances d\'obtention.',
          category: 'financement'
        },
        {
          _key: 'q6',
          question: 'Quel niveau de langue est requis ?',
          answer: 'Cela dépend du pays et de l\'université. Généralement, un niveau B2 est requis (IELTS 6.0, TOEFL 80, ou équivalent). Nous pouvons vous orienter vers des cours de langue si nécessaire.',
          category: 'general'
        },
        {
          _key: 'q7',
          question: 'Comment se passe le suivi une fois sur place ?',
          answer: 'Nous restons à votre disposition même après votre arrivée. Vous bénéficiez d\'un support continu pour toutes vos questions administratives, académiques ou pratiques.',
          category: 'general'
        },
        {
          _key: 'q8',
          question: 'Puis-je travailler pendant mes études ?',
          answer: 'Oui, dans la plupart des pays, les étudiants internationaux peuvent travailler à temps partiel (généralement 20h/semaine). Nous vous informons sur les règles spécifiques à chaque pays.',
          category: 'general'
        }
      ]
    })
    console.log('✅ FAQ créée:', faq._id)

    // 5. CTA Section
    console.log('\n🎯 Création de la section Call to Action...')
    const cta = await client.createOrReplace({
      _id: 'cta-section',
      _type: 'cta',
      title: 'Prêt à commencer votre aventure ?',
      subtitle: 'Contactez-nous dès aujourd\'hui pour une consultation gratuite',
      buttonText: 'Commencer maintenant',
      buttonLink: '/student-registration',
      backgroundColor: 'blue',
      features: [
        {
          _key: 'f1',
          text: '✅ Consultation initiale gratuite'
        },
        {
          _key: 'f2',
          text: '✅ Réponse sous 24h'
        },
        {
          _key: 'f3',
          text: '✅ Accompagnement personnalisé'
        },
        {
          _key: 'f4',
          text: '✅ Support 7j/7'
        }
      ]
    })
    console.log('✅ CTA créé:', cta._id)

    console.log('\n✨ Contenu de la page d\'accueil créé avec succès !')
    console.log('\n📍 Accédez à votre Sanity Studio: http://localhost:3000/studio')
    console.log('   Vous pouvez maintenant modifier tout le contenu !\n')

  } catch (error) {
    console.error('❌ Erreur lors de la création du contenu:', error)
    process.exit(1)
  }
}

seedHomepageContent()
