/**
 * Script de seed pour créer des articles de blog de démonstration
 * Usage: npm run seed:blog
 */

import { client } from '../lib/sanity.client'

// Sample authors
const authors = [
  {
    _type: 'author',
    name: 'Sophie Martin',
    slug: { current: 'sophie-martin' },
    role: 'Conseillère en mobilité internationale',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Avec plus de 10 ans d\'expérience dans l\'accompagnement des étudiants internationaux, Sophie est spécialisée dans les démarches administratives et les stratégies de réussite académique. Elle a aidé plus de 500 étudiants à réaliser leur rêve d\'études à l\'étranger.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sophie-martin',
      twitter: 'https://twitter.com/sophiemartin',
      email: 'sophie@letudiantetranger.com',
    },
  },
  {
    _type: 'author',
    name: 'Ahmed Ben Salah',
    slug: { current: 'ahmed-ben-salah' },
    role: 'Expert en visas et bourses',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ahmed est diplômé en droit international et spécialisé dans les procédures de visa et les opportunités de financement pour étudiants. Son expertise couvre particulièrement les destinations européennes et nord-américaines.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ahmed-ben-salah',
      email: 'ahmed@letudiantetranger.com',
    },
  },
  {
    _type: 'author',
    name: 'Marie Dubois',
    slug: { current: 'marie-dubois' },
    role: 'Ancienne étudiante internationale',
    bio: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Marie a étudié en France, au Canada et au Royaume-Uni. Elle partage aujourd\'hui son expérience et ses conseils pratiques pour aider les futurs étudiants à éviter les pièges et à profiter au maximum de leur aventure internationale.',
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ],
    socialLinks: {
      twitter: 'https://twitter.com/mariedubois',
      email: 'marie@letudiantetranger.com',
    },
  },
]

// Sample blog posts
const posts = [
  {
    _type: 'post',
    title: 'Guide Complet pour Étudier en France en 2025',
    slug: { current: 'guide-complet-etudier-en-france-2025' },
    excerpt:
      'Découvrez tout ce qu\'il faut savoir pour réussir vos études en France : procédures d\'admission, coûts, vie étudiante et opportunités de carrière.',
    category: 'études-france',
    tags: ['france', 'campus-france', 'visa-étudiant', 'guide-complet'],
    publishedAt: new Date('2025-01-15').toISOString(),
    estimatedReadingTime: 12,
    featured: true,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Pourquoi choisir la France ?' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'La France accueille chaque année plus de 400 000 étudiants internationaux, ce qui en fait la 6ème destination mondiale. Le pays offre une qualité d\'enseignement reconnue mondialement avec des frais de scolarité accessibles dans les universités publiques.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'info',
        title: 'Bon à savoir',
        content:
          'Les frais de scolarité dans les universités publiques françaises sont parmi les plus bas d\'Europe : environ 170€ pour une Licence, 243€ pour un Master et 380€ pour un Doctorat.',
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Procédure Campus France en 5 étapes' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'La procédure Campus France est obligatoire pour la plupart des étudiants internationaux souhaitant étudier en France. Voici les étapes clés :',
          },
        ],
      },
    ],
    seoTitle: 'Étudier en France 2025 : Guide Complet & Procédure Campus France',
    seoDescription:
      'Guide complet 2025 pour étudier en France : procédure Campus France, coûts, visas, bourses et conseils pratiques. Tout ce qu\'il faut savoir !',
    seoKeywords: [
      'étudier en france',
      'campus france',
      'visa étudiant france',
      'universités françaises',
    ],
  },
  {
    _type: 'post',
    title: 'Les 10 Meilleures Bourses pour Étudiants Internationaux',
    slug: { current: 'meilleures-bourses-etudiants-internationaux' },
    excerpt:
      'Découvrez les programmes de bourses les plus généreux au monde : montants, critères d\'éligibilité et conseils pour maximiser vos chances.',
    category: 'bourses',
    tags: ['bourses', 'financement', 'eiffel', 'fulbright', 'chevening'],
    publishedAt: new Date('2025-01-10').toISOString(),
    estimatedReadingTime: 10,
    featured: true,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: '1. Bourse Eiffel (France)' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'La bourse Eiffel est l\'une des plus prestigieuses bourses françaises. Elle couvre 1 181€ par mois pour les Masters et 1 700€ pour les Doctorats, plus une couverture santé et des frais de voyage.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'student',
        title: 'Témoignage',
        content:
          'La bourse Eiffel m\'a permis de me concentrer à 100% sur mes études sans stress financier. Je recommande vivement de postuler ! - Aïcha, Maroc',
      },
    ],
    seoTitle: 'Top 10 Bourses pour Étudiants Internationaux 2025',
    seoDescription:
      'Guide des 10 meilleures bourses internationales : Eiffel, Fulbright, Chevening, DAAD. Montants, critères et conseils de candidature.',
    seoKeywords: [
      'bourses étudiants internationaux',
      'bourse eiffel',
      'fulbright',
      'chevening',
      'financement études',
    ],
  },
  {
    _type: 'post',
    title: 'Comment Obtenir son Visa Étudiant : Guide Pratique',
    slug: { current: 'comment-obtenir-visa-etudiant-guide' },
    excerpt:
      'Tout ce qu\'il faut savoir sur les démarches de visa étudiant : documents requis, délais, entretien et astuces pour éviter les refus.',
    category: 'visa-documents',
    tags: ['visa', 'documents', 'procédure', 'conseils'],
    publishedAt: new Date('2025-01-08').toISOString(),
    estimatedReadingTime: 8,
    featured: false,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Documents essentiels pour le visa' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Quel que soit le pays de destination, certains documents sont systématiquement requis pour une demande de visa étudiant.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'warning',
        title: 'Attention aux délais',
        content:
          'Commencez vos démarches de visa au moins 3 mois avant votre date de départ prévue. Les délais peuvent varier de 2 semaines à 2 mois selon les pays.',
      },
    ],
    seoTitle: 'Visa Étudiant : Guide Complet pour Réussir sa Demande 2025',
    seoDescription:
      'Guide pratique du visa étudiant : documents requis, procédure, délais, entretien et conseils d\'experts pour éviter le refus.',
    seoKeywords: [
      'visa étudiant',
      'demande visa',
      'documents visa',
      'entretien consulat',
    ],
  },
  {
    _type: 'post',
    title: 'Étudier au Canada : Tout sur les Permis d\'Études',
    slug: { current: 'etudier-au-canada-permis-etudes' },
    excerpt:
      'Le Canada attire des milliers d\'étudiants chaque année. Découvrez comment obtenir votre permis d\'études, les coûts et les meilleures universités.',
    category: 'études-canada',
    tags: ['canada', 'permis-études', 'universités-canadiennes'],
    publishedAt: new Date('2025-01-05').toISOString(),
    estimatedReadingTime: 9,
    featured: true,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Le système éducatif canadien' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Le Canada possède l\'un des meilleurs systèmes éducatifs au monde avec des universités régulièrement classées dans le top 100 mondial.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'tip',
        title: 'Astuce budget',
        content:
          'Les universités québécoises offrent souvent des frais réduits pour les étudiants francophones. Renseignez-vous sur les accords bilatéraux avec votre pays.',
      },
    ],
    seoTitle: 'Étudier au Canada 2025 : Guide du Permis d\'Études',
    seoDescription:
      'Guide complet pour étudier au Canada : permis d\'études, meilleures universités, coûts, travail étudiant et immigration post-diplôme.',
    seoKeywords: [
      'étudier au canada',
      'permis études canada',
      'universités canadiennes',
      'immigration canada',
    ],
  },
  {
    _type: 'post',
    title: 'Trouver un Logement Étudiant à l\'Étranger',
    slug: { current: 'trouver-logement-etudiant-etranger' },
    excerpt:
      'Résidence universitaire, colocation ou studio ? Découvrez tous nos conseils pour trouver le logement idéal et éviter les arnaques.',
    category: 'logement',
    tags: ['logement', 'colocation', 'résidence', 'conseils'],
    publishedAt: new Date('2025-01-03').toISOString(),
    estimatedReadingTime: 7,
    featured: false,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Les différentes options de logement' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Trouver un logement est souvent l\'une des premières préoccupations des étudiants internationaux. Plusieurs options s\'offrent à vous.',
          },
        ],
      },
    ],
    seoTitle: 'Logement Étudiant à l\'Étranger : Guide Pratique 2025',
    seoDescription:
      'Comment trouver un logement étudiant à l\'étranger : résidence, colocation, studio. Budget, conseils et sites recommandés.',
    seoKeywords: [
      'logement étudiant',
      'colocation',
      'résidence universitaire',
      'appartement étudiant',
    ],
  },
  {
    _type: 'post',
    title: 'Les 5 Erreurs à Éviter dans votre Dossier de Candidature',
    slug: { current: 'erreurs-eviter-dossier-candidature' },
    excerpt:
      'Maximisez vos chances d\'admission en évitant ces 5 erreurs courantes dans les lettres de motivation, CV et dossiers académiques.',
    category: 'conseils',
    tags: ['candidature', 'lettre-motivation', 'cv', 'admission'],
    publishedAt: new Date('2025-01-01').toISOString(),
    estimatedReadingTime: 6,
    featured: false,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Erreur n°1 : Lettre de motivation générique' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Une lettre de motivation doit être personnalisée pour chaque programme et université. Les comités d\'admission repèrent immédiatement les lettres standardisées.',
          },
        ],
      },
      {
        _type: 'advancedQuote',
        quote:
          'La personnalisation de votre dossier est la clé. Montrez que vous connaissez vraiment le programme et expliquez pourquoi vous êtes le candidat idéal.',
        author: 'Dr. Laurent Michaud',
        role: 'Directeur des admissions, École de Commerce',
      },
    ],
    seoTitle: '5 Erreurs Fatales dans un Dossier de Candidature Universitaire',
    seoDescription:
      'Évitez ces 5 erreurs courantes dans votre dossier de candidature universitaire : lettre de motivation, CV, documents. Conseils d\'experts.',
    seoKeywords: [
      'dossier candidature',
      'lettre motivation',
      'erreurs admission',
      'conseils candidature',
    ],
  },
  {
    _type: 'post',
    title: 'Témoignage : Mon Année d\'Échange au Royaume-Uni',
    slug: { current: 'temoignage-echange-royaume-uni' },
    excerpt:
      'Marie raconte son expérience d\'une année d\'échange à l\'Université de Manchester : défis, découvertes et conseils pour futurs étudiants.',
    category: 'testimonials',
    tags: ['témoignage', 'royaume-uni', 'échange', 'expérience'],
    publishedAt: new Date('2024-12-28').toISOString(),
    estimatedReadingTime: 5,
    featured: false,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: 'Les premiers jours' }],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Mon arrivée à Manchester en septembre 2024 a été à la fois excitante et intimidante. L\'université organise une semaine d\'orientation pour les étudiants internationaux, ce qui m\'a beaucoup aidée.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'student',
        title: 'Mon conseil principal',
        content:
          'N\'ayez pas peur de sortir de votre zone de confort dès le début. Rejoignez des clubs, participez aux événements sociaux et faites l\'effort de parler anglais même si c\'est difficile au début.',
      },
    ],
    seoTitle: 'Témoignage Étudiant : Une Année au Royaume-Uni',
    seoDescription:
      'Témoignage d\'une étudiante française ayant passé un an à l\'Université de Manchester : conseils pratiques, défis et opportunités.',
    seoKeywords: [
      'témoignage étudiant',
      'royaume-uni',
      'université manchester',
      'année échange',
    ],
  },
  {
    _type: 'post',
    title: 'Études aux États-Unis : Le Guide du Test SAT et TOEFL',
    slug: { current: 'etudes-usa-guide-sat-toefl' },
    excerpt:
      'Tout ce qu\'il faut savoir sur les tests SAT et TOEFL pour intégrer les universités américaines : préparation, scores requis et astuces.',
    category: 'études-usa',
    tags: ['usa', 'sat', 'toefl', 'tests', 'préparation'],
    publishedAt: new Date('2024-12-25').toISOString(),
    estimatedReadingTime: 11,
    featured: false,
    content: [
      {
        _type: 'block',
        style: 'h2',
        children: [
          { _type: 'span', text: 'Comprendre le test SAT' },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Le SAT (Scholastic Assessment Test) est un test standardisé utilisé par la plupart des universités américaines pour évaluer les candidats au Bachelor.',
          },
        ],
      },
      {
        _type: 'callout',
        type: 'tip',
        title: 'Stratégie de préparation',
        content:
          'Commencez votre préparation au moins 6 mois avant la date du test. Utilisez des ressources gratuites comme Khan Academy qui offre une préparation officielle au SAT.',
      },
    ],
    seoTitle: 'SAT et TOEFL : Guide Complet pour Étudier aux USA 2025',
    seoDescription:
      'Tout savoir sur les tests SAT et TOEFL pour les universités américaines : préparation, scores requis, dates, coûts et conseils d\'experts.',
    seoKeywords: [
      'sat test',
      'toefl',
      'étudier aux usa',
      'universités américaines',
      'préparation tests',
    ],
  },
]

async function seedBlog() {
  console.log('🌱 Démarrage du seed du blog...\n')

  try {
    // 1. Créer les auteurs
    console.log('📝 Création des auteurs...')
    const createdAuthors = []
    for (const author of authors) {
      const result = await client.create(author)
      createdAuthors.push(result)
      console.log(`✅ Auteur créé: ${author.name}`)
    }

    // 2. Créer les articles avec références aux auteurs
    console.log('\n📚 Création des articles...')
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const authorIndex = i % createdAuthors.length
      const postWithAuthor = {
        ...post,
        author: {
          _type: 'reference',
          _ref: createdAuthors[authorIndex]._id,
        },
      }
      const result = await client.create(postWithAuthor)
      console.log(`✅ Article créé: ${post.title}`)
    }

    console.log('\n✨ Seed du blog terminé avec succès!')
    console.log(
      `\n📊 Résumé:\n- ${createdAuthors.length} auteurs créés\n- ${posts.length} articles créés\n`
    )
    console.log(
      '🚀 Vous pouvez maintenant visiter http://localhost:3000/blog pour voir les articles!\n'
    )
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error)
    process.exit(1)
  }
}

// Exécuter le seed
seedBlog()
