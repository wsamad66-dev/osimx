import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jqihlnz4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

async function seedHomepage() {
  console.log('🌱 Initialisation du contenu de la page d\'accueil...\n')

  try {
    // Supprimer les documents existants s'ils existent
    console.log('🗑️ Nettoyage des anciens documents...')
    const existingDocs = await client.fetch(`*[_type in ['expertise', 'services', 'testimonials', 'faq', 'cta']]._id`)
    if (existingDocs.length > 0) {
      for (const docId of existingDocs) {
        await client.delete(docId)
      }
      console.log(`✅ ${existingDocs.length} document(s) supprimé(s)\n`)
    } else {
      console.log('✅ Aucun ancien document à supprimer\n')
    }

    // 1. Expertise Section
    console.log('📊 Création de la section Expertise...')
    const expertise = await client.create({
      _type: 'expertise',
      title: 'Une expertise prouvée',
      subtitle: 'Des années d\'expérience au service de votre réussite',
      stats: [
        {
          number: '500+',
          label: 'Étudiants accompagnés',
          icon: '👨‍🎓'
        },
        {
          number: '15+',
          label: 'Années d\'expérience',
          icon: '⭐'
        },
        {
          number: '98%',
          label: 'Taux de satisfaction',
          icon: '💯'
        },
        {
          number: '50+',
          label: 'Destinations',
          icon: '🌍'
        }
      ]
    })
    console.log('✅ Section Expertise créée\n')

    // 2. Services Section
    console.log('🛠️ Création de la section Services...')
    const services = await client.create({
      _type: 'services',
      title: 'Nos services',
      subtitle: 'Un accompagnement complet pour votre projet d\'études à l\'étranger',
      servicesList: [
        {
          title: 'Orientation académique',
          description: 'Nous vous aidons à choisir la meilleure formation selon votre profil et vos objectifs de carrière.',
          icon: '🎓',
          features: [
            'Analyse de votre profil académique',
            'Sélection des meilleures universités',
            'Conseils personnalisés',
            'Accompagnement dans le choix de la formation'
          ]
        },
        {
          title: 'Assistance visa',
          description: 'Un accompagnement complet pour obtenir votre visa étudiant en toute sérénité.',
          icon: '✈️',
          features: [
            'Préparation complète du dossier',
            'Simulation d\'entretien',
            'Suivi jusqu\'à l\'obtention',
            'Conseils pour la demande de visa'
          ]
        },
        {
          title: 'Logement étudiant',
          description: 'Trouvez le logement idéal pour votre séjour à l\'étranger.',
          icon: '🏠',
          features: [
            'Recherche de logement adapté',
            'Réservation sécurisée',
            'Visite virtuelle',
            'Assistance à l\'installation'
          ]
        },
        {
          title: 'Inscription universitaire',
          description: 'Nous gérons toutes vos démarches d\'inscription de A à Z.',
          icon: '📝',
          features: [
            'Constitution du dossier',
            'Traduction de documents',
            'Suivi des candidatures',
            'Accompagnement administratif'
          ]
        }
      ]
    })
    console.log('✅ Section Services créée\n')

    // 3. Testimonials Section
    console.log('💬 Création de la section Témoignages...')
    const testimonials = await client.create({
      _type: 'testimonials',
      title: 'Témoignages',
      subtitle: 'Ce que disent nos étudiants',
      testimonialsList: [
        {
          name: 'Sarah Alami',
          role: 'Étudiante en Marketing Digital',
          content: 'Grâce à OSIMX, j\'ai pu réaliser mon rêve d\'étudier au Canada. L\'équipe m\'a accompagnée à chaque étape, de la sélection de l\'université jusqu\'à l\'obtention de mon visa. Je recommande vivement leurs services !',
          rating: 5,
          country: 'Canada'
        },
        {
          name: 'Mehdi Bennani',
          role: 'Étudiant en Informatique',
          content: 'Un accompagnement professionnel et personnalisé. L\'équipe d\'OSIMX a été très réactive et m\'a aidé à trouver la formation parfaite en France. Merci pour votre soutien !',
          rating: 5,
          country: 'France'
        },
        {
          name: 'Fatima Zahra',
          role: 'Étudiante en Commerce International',
          content: 'Service exceptionnel ! OSIMX m\'a non seulement aidée avec mon inscription, mais aussi avec la recherche de logement et l\'obtention de mon visa pour les États-Unis. Je suis très satisfaite.',
          rating: 5,
          country: 'USA'
        }
      ]
    })
    console.log('✅ Section Témoignages créée\n')

    // 4. FAQ Section
    console.log('❓ Création de la section FAQ...')
    const faq = await client.create({
      _type: 'faq',
      title: 'Questions fréquentes',
      subtitle: 'Tout ce que vous devez savoir sur nos services',
      questions: [
        {
          question: 'Quels sont les délais pour obtenir un visa étudiant ?',
          answer: 'Les délais varient selon le pays de destination. En général, comptez entre 2 et 6 mois pour l\'ensemble de la procédure. Nous vous accompagnons à chaque étape pour optimiser ces délais.',
          category: 'visa'
        },
        {
          question: 'Combien coûtent vos services ?',
          answer: 'Nos tarifs dépendent du type d\'accompagnement souhaité. Nous proposons des formules personnalisées adaptées à votre budget et vos besoins. Contactez-nous pour un devis gratuit.',
          category: 'general'
        },
        {
          question: 'Puis-je m\'inscrire en cours d\'année ?',
          answer: 'Oui, c\'est possible pour certaines formations et destinations. Nous vous aidons à identifier les meilleures opportunités selon vos dates de disponibilité.',
          category: 'inscriptions'
        },
        {
          question: 'Aidez-vous à trouver un logement ?',
          answer: 'Absolument ! Nous disposons d\'un réseau de partenaires dans de nombreuses villes et pouvons vous aider à trouver un logement adapté à vos besoins et votre budget.',
          category: 'logement'
        },
        {
          question: 'Proposez-vous des solutions de financement ?',
          answer: 'Oui, nous vous orientons vers des bourses d\'études, des prêts étudiants et d\'autres solutions de financement adaptées à votre situation.',
          category: 'financement'
        },
        {
          question: 'Quels documents sont nécessaires pour l\'inscription ?',
          answer: 'Les documents requis varient selon la destination et la formation. Généralement : diplômes, relevés de notes, lettre de motivation, CV, certificat de langue, et passeport. Nous vous fournissons une liste personnalisée.',
          category: 'inscriptions'
        },
        {
          question: 'Accompagnez-vous dans la préparation des tests de langue ?',
          answer: 'Oui, nous pouvons vous orienter vers des centres de préparation aux tests comme IELTS, TOEFL, DELF, etc., et vous donner des conseils pour optimiser vos résultats.',
          category: 'general'
        },
        {
          question: 'Que faire si ma demande de visa est refusée ?',
          answer: 'Nous analysons les raisons du refus et vous accompagnons pour préparer une nouvelle demande avec un dossier renforcé. Notre taux de réussite est de 98% après accompagnement.',
          category: 'visa'
        }
      ]
    })
    console.log('✅ Section FAQ créée\n')

    // 5. CTA Section
    console.log('🎯 Création de la section CTA...')
    const cta = await client.create({
      _type: 'cta',
      title: 'Prêt à commencer votre aventure ?',
      subtitle: 'Rejoignez des centaines d\'étudiants qui ont réalisé leur rêve avec OSIMX',
      buttonText: 'Inscription gratuite',
      buttonLink: '/student-registration',
      backgroundColor: 'blue',
      features: [
        'Consultation gratuite',
        'Accompagnement personnalisé',
        'Support 7j/7',
        'Taux de réussite 98%'
      ]
    })
    console.log('✅ Section CTA créée\n')

    console.log('🎉 Toutes les sections de la page d\'accueil ont été créées avec succès !')
    console.log('\n📝 Vous pouvez maintenant les modifier dans Sanity Studio :')
    console.log('👉 http://localhost:3000/studio/structure')
    console.log('\n✨ Sections disponibles :')
    console.log('   📊 Expertise - Statistiques de l\'agence')
    console.log('   🛠️ Services - Liste des services proposés')
    console.log('   💬 Témoignages - Avis des étudiants')
    console.log('   ❓ FAQ - Questions fréquentes')
    console.log('   🎯 CTA - Appel à l\'action')

  } catch (error) {
    console.error('❌ Erreur lors de la création du contenu:', error)
    throw error
  }
}

// Exécuter le script
seedHomepage()
  .then(() => {
    console.log('\n✅ Script terminé avec succès !')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error)
    process.exit(1)
  })
