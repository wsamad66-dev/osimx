import { createClient } from '@sanity/client'
import { v4 as uuidv4 } from 'uuid'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// 20 sujets SEO-optimisés pour études à l'étranger
const topics = [
  {
    title: "Guide Complet: Étudier au Canada en 2025 - Procédures et Conseils",
    slug: "etudier-canada-2025-guide-complet",
    excerpt: "Découvrez tout ce qu'il faut savoir pour étudier au Canada en 2025: démarches, coûts, universités et conseils pratiques pour réussir votre projet.",
    category: "etudes-canada",
    tags: ["canada", "études", "immigration", "universités"],
    featured: true,
  },
  {
    title: "Visa Étudiant France: Démarches Complètes et Délais 2025",
    slug: "visa-etudiant-france-demarches-2025",
    excerpt: "Guide détaillé pour obtenir votre visa étudiant français: documents requis, procédure Campus France, délais et taux de réussite.",
    category: "visa-documents",
    tags: ["france", "visa", "campus-france", "démarches"],
    featured: true,
  },
  {
    title: "Top 10 Bourses d'Études au Canada pour Étudiants Étrangers 2025",
    slug: "bourses-etudes-canada-etudiants-etrangers-2025",
    excerpt: "Liste complète des meilleures bourses disponibles au Canada: montants, critères d'éligibilité et procédures de candidature.",
    category: "bourses-financement",
    tags: ["bourses", "canada", "financement", "aide-financière"],
    featured: true,
  },
  {
    title: "Étudier en Allemagne Gratuitement: Universités Sans Frais de Scolarité",
    slug: "etudier-allemagne-gratuitement-universites",
    excerpt: "Découvrez comment étudier gratuitement en Allemagne: liste des universités publiques, coût de vie et démarches d'admission.",
    category: "etudes-allemagne",
    tags: ["allemagne", "gratuit", "universités-publiques"],
    featured: false,
  },
  {
    title: "Campus France: Comment Réussir votre Entretien en 2025",
    slug: "campus-france-reussir-entretien-2025",
    excerpt: "Conseils pratiques et questions fréquentes pour réussir votre entretien Campus France et maximiser vos chances d'obtenir le visa.",
    category: "conseils",
    tags: ["campus-france", "entretien", "préparation", "visa"],
    featured: false,
  },
  {
    title: "Logement Étudiant au Canada: Guide des Options et Prix 2025",
    slug: "logement-etudiant-canada-options-prix-2025",
    excerpt: "Trouvez votre logement étudiant au Canada: résidences universitaires, colocations, studios et conseils pour économiser.",
    category: "vie-etudiante",
    tags: ["canada", "logement", "résidence", "colocation"],
    featured: false,
  },
  {
    title: "Équivalence de Diplômes: Reconnaissance Internationale Expliquée",
    slug: "equivalence-diplomes-reconnaissance-internationale",
    excerpt: "Tout savoir sur l'équivalence de diplômes à l'international: procédures, organismes reconnus et pays partenaires.",
    category: "procedures",
    tags: ["équivalence", "diplômes", "reconnaissance"],
    featured: false,
  },
  {
    title: "Travailler Pendant ses Études au Canada: Droits et Limites 2025",
    slug: "travailler-pendant-etudes-canada-droits-2025",
    excerpt: "Guide complet sur le travail étudiant au Canada: heures autorisées, types d'emploi, salaires et impact sur le permis d'études.",
    category: "vie-etudiante",
    tags: ["canada", "travail", "emploi-étudiant", "permis"],
    featured: false,
  },
  {
    title: "Meilleures Universités en France pour Étudiants Étrangers 2025",
    slug: "meilleures-universites-france-etudiants-etrangers-2025",
    excerpt: "Classement et présentation des meilleures universités françaises: critères d'admission, programmes et opportunités.",
    category: "etudes-france",
    tags: ["france", "universités", "classement", "admission"],
    featured: true,
  },
  {
    title: "Budget Étudiant France: Coût de Vie Réel en 2025",
    slug: "budget-etudiant-france-cout-vie-2025",
    excerpt: "Calculez votre budget étudiant en France: logement, nourriture, transport, loisirs et astuces pour économiser.",
    category: "conseils",
    tags: ["france", "budget", "coût-de-vie", "économies"],
    featured: false,
  },
  {
    title: "Assurance Santé Étudiante à l'Étranger: Guide Complet 2025",
    slug: "assurance-sante-etudiante-etranger-guide-2025",
    excerpt: "Tout sur l'assurance santé pour étudiants internationaux: couverture obligatoire, comparatif et conseils de choix.",
    category: "procedures",
    tags: ["assurance", "santé", "couverture", "obligatoire"],
    featured: false,
  },
  {
    title: "Permis de Travail Post-Diplôme Canada: Comment l'Obtenir",
    slug: "permis-travail-post-diplome-canada-obtenir",
    excerpt: "Guide du PTPD au Canada: conditions d'éligibilité, démarches, durée et opportunités de résidence permanente.",
    category: "immigration",
    tags: ["canada", "ptpd", "post-diplôme", "immigration"],
    featured: true,
  },
  {
    title: "Étudier en Espagne: Universités, Visa et Coût en 2025",
    slug: "etudier-espagne-universites-visa-cout-2025",
    excerpt: "Guide complet pour étudier en Espagne: meilleures universités, procédure de visa et budget prévisionnel.",
    category: "etudes-espagne",
    tags: ["espagne", "universités", "visa", "budget"],
    featured: false,
  },
  {
    title: "Documents Requis pour Visa Étudiant: Liste Complète par Pays",
    slug: "documents-requis-visa-etudiant-liste-pays",
    excerpt: "Checklist complète des documents nécessaires pour votre visa étudiant selon votre destination: France, Canada, Allemagne.",
    category: "visa-documents",
    tags: ["visa", "documents", "checklist", "démarches"],
    featured: false,
  },
  {
    title: "Apprendre le Français pour Étudier en France: Niveaux et Tests",
    slug: "apprendre-francais-etudier-france-niveaux-tests",
    excerpt: "Niveau de français requis pour étudier en France: DELF, DALF, TCF et ressources pour progresser rapidement.",
    category: "conseils",
    tags: ["français", "langue", "delf", "tcf"],
    featured: false,
  },
  {
    title: "Résidence Permanente Canada après Études: Étapes Complètes",
    slug: "residence-permanente-canada-apres-etudes-etapes",
    excerpt: "Du permis d'études à la résidence permanente au Canada: programmes disponibles, critères et délais de traitement.",
    category: "immigration",
    tags: ["canada", "résidence-permanente", "immigration", "entrée-express"],
    featured: true,
  },
  {
    title: "Bourses Eiffel Excellence: Comment Candidater et Réussir 2025",
    slug: "bourses-eiffel-excellence-candidater-reussir-2025",
    excerpt: "Guide complet des bourses Eiffel: critères d'éligibilité, dossier de candidature, calendrier et taux de sélection.",
    category: "bourses-financement",
    tags: ["bourses-eiffel", "france", "excellence", "master"],
    featured: true,
  },
  {
    title: "Études de Médecine à l'Étranger: Pays Accessibles et Reconnaissance",
    slug: "etudes-medecine-etranger-pays-reconnaissance",
    excerpt: "Où étudier la médecine à l'étranger: pays sans concours, coûts, reconnaissance des diplômes et retour possible.",
    category: "programmes-specifiques",
    tags: ["médecine", "santé", "études-supérieures", "reconnaissance"],
    featured: false,
  },
  {
    title: "Québec vs Ontario: Quelle Province Choisir pour Étudier au Canada",
    slug: "quebec-ontario-province-choisir-etudier-canada",
    excerpt: "Comparatif détaillé Québec-Ontario: universités, coûts, immigration, emploi et qualité de vie pour étudiants.",
    category: "etudes-canada",
    tags: ["québec", "ontario", "canada", "comparatif"],
    featured: false,
  },
  {
    title: "Calendrier des Admissions Universitaires 2025-2026: Dates Clés",
    slug: "calendrier-admissions-universitaires-2025-2026-dates",
    excerpt: "Toutes les dates importantes pour vos candidatures universitaires: deadlines, rentrées et procédures par pays.",
    category: "procedures",
    tags: ["admissions", "calendrier", "deadlines", "candidatures"],
    featured: false,
  },
]

// Contenu détaillé pour chaque article
const generateContent = (topic: typeof topics[0]) => {
  return [
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Introduction', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: `Dans ce guide complet, nous allons explorer en détail tout ce que vous devez savoir sur ${topic.title.toLowerCase()}. Que vous soyez en phase de recherche ou prêt à entamer vos démarches, ce guide vous accompagnera pas à pas.`,
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Points Clés à Retenir', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Démarches administratives complètes et détaillées',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Budget prévisionnel et options de financement',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Conseils pratiques basés sur des expériences réelles',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Ressources utiles et contacts importants',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Étape par Étape', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: "Suivez ces étapes essentielles pour réussir votre projet d'études à l'étranger:",
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{ _type: 'span', text: '1. Recherche et Planification', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'La première étape consiste à bien rechercher vos options. Prenez le temps de comparer les programmes, les universités et les destinations. Considérez vos objectifs de carrière et votre budget.',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{ _type: 'span', text: '2. Préparation du Dossier', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Rassemblez tous les documents nécessaires: diplômes, relevés de notes, lettres de recommandation, tests de langue. Assurez-vous que tous vos documents sont traduits et certifiés si nécessaire.',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h3',
      children: [{ _type: 'span', text: '3. Candidature et Admission', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: "Soumettez vos candidatures en respectant les deadlines. Personnalisez chaque lettre de motivation et mettez en valeur vos points forts. N'hésitez pas à candidater à plusieurs programmes pour maximiser vos chances.",
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'callout',
      _key: uuidv4(),
      type: 'info',
      content: [
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: "💡 Conseil: Commencez vos démarches au moins 6 mois avant la rentrée souhaitée pour avoir le temps de bien préparer votre dossier.",
              _key: uuidv4(),
            },
          ],
          markDefs: [],
        },
      ],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Aspects Financiers', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Le budget est un élément crucial de votre projet. Voici une estimation des coûts à prévoir:',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Frais de scolarité: Variable selon le pays et le programme',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Logement: 400-800€/mois selon la ville',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Vie quotidienne: 300-500€/mois',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'bullet',
      children: [
        {
          _type: 'span',
          text: 'Assurance santé: 30-100€/mois',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Conseils Pratiques', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Voici nos meilleurs conseils pour maximiser vos chances de réussite:',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          text: 'Anticipez et préparez-vous à l\'avance',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          text: 'Soignez votre dossier et vos documents',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          text: 'Profitez des ressources et accompagnements disponibles',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      listItem: 'number',
      children: [
        {
          _type: 'span',
          text: 'Restez motivé et persévérant',
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'h2',
      children: [{ _type: 'span', text: 'Conclusion', _key: uuidv4() }],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: uuidv4(),
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: "Réussir son projet d'études à l'étranger demande de la préparation, mais c'est une expérience enrichissante qui ouvre de nombreuses opportunités. Avec les bonnes informations et un accompagnement adapté, votre rêve est à portée de main.",
          _key: uuidv4(),
        },
      ],
      markDefs: [],
    },
    {
      _type: 'callout',
      _key: uuidv4(),
      type: 'success',
      content: [
        {
          _type: 'block',
          _key: uuidv4(),
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: "🎓 Besoin d'aide personnalisée? Notre équipe d'experts est là pour vous accompagner à chaque étape. Prenez rendez-vous pour un bilan gratuit!",
              _key: uuidv4(),
            },
          ],
          markDefs: [],
        },
      ],
    },
  ]
}

async function createAuthor() {
  const author = {
    _type: 'blogAuthor',
    _id: `author-osimx-${uuidv4()}`,
    name: "Équipe de L'Étudiant Étranger",
    slug: {
      _type: 'slug',
      current: 'equipe-osimx',
    },
    role: 'Conseillers en Orientation Internationale',
    bio: [
      {
        _type: 'block',
        _key: uuidv4(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Experts en mobilité internationale avec plus de 10 ans d'expérience dans l'accompagnement d'étudiants vers leur projet d'études à l'étranger.",
            _key: uuidv4(),
          },
        ],
        markDefs: [],
      },
    ],
  }

  const result = await client.create(author)
  console.log('✅ Auteur créé:', result._id)
  return result._id
}

async function createArticle(topic: typeof topics[0], authorId: string) {
  const article = {
    _type: 'blogPost',
    title: topic.title,
    slug: {
      _type: 'slug',
      current: topic.slug,
    },
    excerpt: topic.excerpt,
    content: generateContent(topic),
    category: topic.category,
    tags: topic.tags,
    featured: topic.featured,
    author: {
      _type: 'reference',
      _ref: authorId,
    },
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: topic.title,
      metaDescription: topic.excerpt,
      keywords: topic.tags.join(', '),
    },
  }

  const result = await client.create(article)
  console.log(`✅ Article créé: ${topic.title}`)
  return result
}

async function main() {
  console.log('🚀 Démarrage de la génération de 20 articles SEO...\n')

  try {
    // Créer l'auteur
    console.log('📝 Création de l\'auteur...')
    const authorId = await createAuthor()
    console.log(`✅ Auteur créé avec ID: ${authorId}\n`)

    // Créer les 20 articles
    console.log('📚 Création des 20 articles...\n')

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i]
      console.log(`[${i + 1}/20] Création: ${topic.title}`)
      await createArticle(topic, authorId)

      // Petit délai pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('\n🎉 SUCCÈS! 20 articles créés avec succès!')
    console.log('\n📊 Résumé:')
    console.log(`- Total articles: ${topics.length}`)
    console.log(`- Articles en vedette: ${topics.filter(t => t.featured).length}`)
    console.log(`- Catégories: ${[...new Set(topics.map(t => t.category))].length}`)
    console.log('\n🔗 Accédez à Sanity Studio pour voir vos articles:')
    console.log('   https://osimx.vercel.app/studio')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
