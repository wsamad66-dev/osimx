import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DestinationPageClient from './DestinationPageClient'

// Define destination data structure
interface DestinationData {
  slug: string
  name: string
  flag: string
  hero: {
    title: string
    description: string
    image: string
  }
  advantages: Array<{
    icon: string
    title: string
    description: string
  }>
  universities: Array<{
    name: string
    location: string
    programs: string
  }>
  admissionProcess: Array<{
    step: number
    title: string
    description: string
  }>
  costs: {
    tuition: string
    housing: string
    living: string
    scholarships: string
  }
  testimonial: {
    name: string
    program: string
    university: string
    quote: string
    image: string
  }
}

// Destination data for all countries
const destinationsData: Record<string, DestinationData> = {
  france: {
    slug: 'france',
    name: 'France',
    flag: '🇫🇷',
    hero: {
      title: 'Étudier en France',
      description: 'Rejoignez l\'excellence académique française et vivez une expérience culturelle unique dans le cœur de l\'Europe.',
      image: '/images/destinations/france-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Excellence Académique',
        description: 'Universités de renommée mondiale et diplômes reconnus internationalement'
      },
      {
        icon: 'Globe',
        title: 'Culture et Art de Vivre',
        description: 'Immersion dans la langue française et découverte d\'un patrimoine culturel exceptionnel'
      },
      {
        icon: 'TrendingUp',
        title: 'Opportunités de Carrière',
        description: 'Accès à un marché du travail dynamique et des opportunités professionnelles variées'
      },
      {
        icon: 'Heart',
        title: 'Qualité de Vie',
        description: 'Système de santé de qualité, transports efficaces et cadre de vie agréable'
      }
    ],
    universities: [
      {
        name: 'Sorbonne Université',
        location: 'Paris',
        programs: 'Sciences, Lettres, Médecine'
      },
      {
        name: 'École Polytechnique',
        location: 'Palaiseau',
        programs: 'Ingénierie, Sciences'
      },
      {
        name: 'Sciences Po',
        location: 'Paris',
        programs: 'Sciences Politiques, Relations Internationales'
      },
      {
        name: 'HEC Paris',
        location: 'Jouy-en-Josas',
        programs: 'Commerce, Management'
      },
      {
        name: 'Université PSL',
        location: 'Paris',
        programs: 'Sciences, Arts, Humanités'
      },
      {
        name: 'Université Grenoble Alpes',
        location: 'Grenoble',
        programs: 'Sciences, Ingénierie'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Consultation Gratuite',
        description: 'Évaluation de votre profil et orientation vers les programmes adaptés'
      },
      {
        step: 2,
        title: 'Préparation du Dossier',
        description: 'Assistance complète pour constituer votre dossier de candidature'
      },
      {
        step: 3,
        title: 'Demande de Visa',
        description: 'Accompagnement pour l\'obtention de votre visa étudiant'
      },
      {
        step: 4,
        title: 'Préparation au Départ',
        description: 'Aide pour le logement, l\'assurance et votre installation en France'
      }
    ],
    costs: {
      tuition: '170€ - 600€/an (universités publiques), 3,000€ - 20,000€/an (écoles privées)',
      housing: '400€ - 800€/mois selon la ville',
      living: '800€ - 1,200€/mois',
      scholarships: 'Bourses Eiffel, bourses CROUS, bourses d\'établissement disponibles'
    },
    testimonial: {
      name: 'Youssef Bennani',
      program: 'Master en Informatique',
      university: 'Sorbonne Université',
      quote: 'Étudier en France a transformé ma carrière. La qualité de l\'enseignement et les opportunités professionnelles sont exceptionnelles. L\'équipe m\'a accompagné à chaque étape.',
      image: '/user1.svg'
    }
  },
  canada: {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    hero: {
      title: 'Étudier au Canada',
      description: 'Découvrez un système éducatif de classe mondiale dans un pays accueillant et multiculturel offrant d\'excellentes perspectives d\'avenir.',
      image: '/images/destinations/canada-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Système Éducatif de Qualité',
        description: 'Universités classées parmi les meilleures au monde avec des standards académiques élevés'
      },
      {
        icon: 'Globe',
        title: 'Société Multiculturelle',
        description: 'Environnement accueillant et diversifié, idéal pour les étudiants internationaux'
      },
      {
        icon: 'TrendingUp',
        title: 'Immigration Post-Études',
        description: 'Possibilités de résidence permanente facilitées pour les diplômés'
      },
      {
        icon: 'Heart',
        title: 'Sécurité et Qualité de Vie',
        description: 'L\'un des pays les plus sûrs au monde avec un excellent système de santé'
      }
    ],
    universities: [
      {
        name: 'Université de Toronto',
        location: 'Toronto, Ontario',
        programs: 'Sciences, Ingénierie, Commerce'
      },
      {
        name: 'McGill University',
        location: 'Montréal, Québec',
        programs: 'Médecine, Droit, Sciences'
      },
      {
        name: 'University of British Columbia',
        location: 'Vancouver, BC',
        programs: 'Sciences, Arts, Commerce'
      },
      {
        name: 'Université de Montréal',
        location: 'Montréal, Québec',
        programs: 'Sciences, Santé, Humanités'
      },
      {
        name: 'University of Alberta',
        location: 'Edmonton, Alberta',
        programs: 'Ingénierie, Sciences, Business'
      },
      {
        name: 'McMaster University',
        location: 'Hamilton, Ontario',
        programs: 'Médecine, Ingénierie, Sciences'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Évaluation et Orientation',
        description: 'Analyse de votre profil et sélection des programmes et universités adaptés'
      },
      {
        step: 2,
        title: 'Candidature',
        description: 'Préparation et soumission de votre dossier de candidature complet'
      },
      {
        step: 3,
        title: 'Permis d\'Études',
        description: 'Assistance pour l\'obtention de votre permis d\'études canadien'
      },
      {
        step: 4,
        title: 'Installation',
        description: 'Aide pour le logement, l\'ouverture de compte bancaire et votre arrivée'
      }
    ],
    costs: {
      tuition: '13,000$ - 35,000$ CAD/an selon le programme et l\'université',
      housing: '400$ - 1,500$ CAD/mois selon la ville',
      living: '1,000$ - 1,800$ CAD/mois',
      scholarships: 'Bourses d\'excellence, bourses gouvernementales et institutionnelles disponibles'
    },
    testimonial: {
      name: 'Amina Khalil',
      program: 'MBA',
      university: 'University of Toronto',
      quote: 'Le Canada m\'a offert bien plus qu\'une éducation de qualité. J\'ai trouvé un environnement multiculturel stimulant et de réelles opportunités de carrière. Le soutien reçu a été exceptionnel.',
      image: '/user2.svg'
    }
  },
  belgique: {
    slug: 'belgique',
    name: 'Belgique',
    flag: '🇧🇪',
    hero: {
      title: 'Étudier en Belgique',
      description: 'Plongez dans un système éducatif d\'excellence au cœur de l\'Europe, dans un pays multilingue et accueillant.',
      image: '/images/destinations/belgique-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Éducation de Qualité',
        description: 'Universités reconnues internationalement avec des frais de scolarité abordables'
      },
      {
        icon: 'Globe',
        title: 'Position Stratégique',
        description: 'Au cœur de l\'Europe, proche de grandes capitales européennes'
      },
      {
        icon: 'TrendingUp',
        title: 'Environnement Multilingue',
        description: 'Opportunité d\'apprendre le français, le néerlandais et l\'anglais'
      },
      {
        icon: 'Heart',
        title: 'Vie Étudiante Dynamique',
        description: 'Culture riche, vie sociale active et coût de la vie raisonnable'
      }
    ],
    universities: [
      {
        name: 'Université Catholique de Louvain',
        location: 'Louvain-la-Neuve',
        programs: 'Sciences, Médecine, Humanités'
      },
      {
        name: 'KU Leuven',
        location: 'Louvain',
        programs: 'Ingénierie, Sciences, Médecine'
      },
      {
        name: 'Université Libre de Bruxelles',
        location: 'Bruxelles',
        programs: 'Sciences, Droit, Économie'
      },
      {
        name: 'Université de Liège',
        location: 'Liège',
        programs: 'Sciences, Ingénierie, Médecine'
      },
      {
        name: 'Université de Gand',
        location: 'Gand',
        programs: 'Sciences, Arts, Médecine'
      },
      {
        name: 'Vrije Universiteit Brussel',
        location: 'Bruxelles',
        programs: 'Sciences, Ingénierie, Santé'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Orientation Personnalisée',
        description: 'Identification des programmes adaptés à votre profil académique'
      },
      {
        step: 2,
        title: 'Constitution du Dossier',
        description: 'Préparation de votre dossier d\'admission et équivalence des diplômes'
      },
      {
        step: 3,
        title: 'Visa et Séjour',
        description: 'Accompagnement pour l\'obtention de votre visa étudiant'
      },
      {
        step: 4,
        title: 'Installation en Belgique',
        description: 'Aide au logement, inscription communale et démarches administratives'
      }
    ],
    costs: {
      tuition: '835€ - 4,175€/an selon la communauté et le programme',
      housing: '300€ - 700€/mois',
      living: '700€ - 1,000€/mois',
      scholarships: 'Bourses d\'excellence, ARES, bourses régionales disponibles'
    },
    testimonial: {
      name: 'Karim Mansouri',
      program: 'Master en Ingénierie',
      university: 'UCLouvain',
      quote: 'La Belgique offre un excellent rapport qualité-prix pour les études supérieures. L\'ambiance internationale et la proximité avec d\'autres pays européens sont des atouts majeurs.',
      image: '/user3.svg'
    }
  },
  allemagne: {
    slug: 'allemagne',
    name: 'Allemagne',
    flag: '🇩🇪',
    hero: {
      title: 'Étudier en Allemagne',
      description: 'Profitez d\'une éducation gratuite de classe mondiale dans la première économie européenne avec d\'excellentes opportunités de carrière.',
      image: '/images/destinations/allemagne-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Éducation Gratuite',
        description: 'Pas de frais de scolarité dans les universités publiques'
      },
      {
        icon: 'Globe',
        title: 'Innovation et Recherche',
        description: 'Leader mondial en ingénierie, technologie et recherche scientifique'
      },
      {
        icon: 'TrendingUp',
        title: 'Marché du Travail Dynamique',
        description: 'Excellentes opportunités d\'emploi après les études'
      },
      {
        icon: 'Heart',
        title: 'Qualité de Vie Élevée',
        description: 'Infrastructure moderne, transports efficaces et vie étudiante active'
      }
    ],
    universities: [
      {
        name: 'Technical University of Munich',
        location: 'Munich',
        programs: 'Ingénierie, Sciences, Technologie'
      },
      {
        name: 'Ludwig Maximilian University',
        location: 'Munich',
        programs: 'Sciences, Médecine, Humanités'
      },
      {
        name: 'Heidelberg University',
        location: 'Heidelberg',
        programs: 'Médecine, Sciences, Droit'
      },
      {
        name: 'Humboldt University',
        location: 'Berlin',
        programs: 'Sciences, Arts, Humanités'
      },
      {
        name: 'RWTH Aachen University',
        location: 'Aachen',
        programs: 'Ingénierie, Sciences'
      },
      {
        name: 'University of Freiburg',
        location: 'Freiburg',
        programs: 'Sciences, Médecine, Humanités'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Consultation et Planification',
        description: 'Évaluation de votre profil et choix des universités allemandes'
      },
      {
        step: 2,
        title: 'Apprentissage de l\'Allemand',
        description: 'Préparation linguistique et certification (TestDaF/DSH)'
      },
      {
        step: 3,
        title: 'Candidature et Visa',
        description: 'Soumission du dossier via Uni-Assist et demande de visa'
      },
      {
        step: 4,
        title: 'Arrivée en Allemagne',
        description: 'Aide au logement, compte bloqué et inscription administrative'
      }
    ],
    costs: {
      tuition: 'Gratuit (universités publiques) + 150€-350€ de frais administratifs/semestre',
      housing: '300€ - 700€/mois selon la ville',
      living: '850€ - 1,200€/mois',
      scholarships: 'DAAD, Erasmus+, bourses institutionnelles disponibles'
    },
    testimonial: {
      name: 'Mehdi Alaoui',
      program: 'Master en Mécanique',
      university: 'TU Munich',
      quote: 'L\'Allemagne m\'a offert une éducation de qualité sans frais de scolarité. Les opportunités de stage et d\'emploi dans l\'industrie sont exceptionnelles. Un choix que je recommande vivement.',
      image: '/user4.svg'
    }
  },
  espagne: {
    slug: 'espagne',
    name: 'Espagne',
    flag: '🇪🇸',
    hero: {
      title: 'Étudier en Espagne',
      description: 'Vivez une expérience académique enrichissante dans un pays méditerranéen chaleureux avec une culture dynamique et un coût de vie abordable.',
      image: '/images/destinations/espagne-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Universités de Prestige',
        description: 'Établissements reconnus avec des programmes en espagnol et en anglais'
      },
      {
        icon: 'Globe',
        title: 'Culture et Lifestyle',
        description: 'Climat agréable, richesse culturelle et art de vivre méditerranéen'
      },
      {
        icon: 'TrendingUp',
        title: 'Coût de Vie Abordable',
        description: 'Frais de scolarité et coût de la vie raisonnables comparés à d\'autres pays européens'
      },
      {
        icon: 'Heart',
        title: 'Langue Internationale',
        description: 'Maîtrise de l\'espagnol, langue parlée par 500 millions de personnes'
      }
    ],
    universities: [
      {
        name: 'Universidad Complutense de Madrid',
        location: 'Madrid',
        programs: 'Lettres, Sciences, Droit'
      },
      {
        name: 'Universidad de Barcelona',
        location: 'Barcelone',
        programs: 'Sciences, Médecine, Arts'
      },
      {
        name: 'Universidad Autónoma de Madrid',
        location: 'Madrid',
        programs: 'Sciences, Droit, Médecine'
      },
      {
        name: 'Universidad Politécnica de Cataluña',
        location: 'Barcelone',
        programs: 'Ingénierie, Architecture'
      },
      {
        name: 'Universidad de Sevilla',
        location: 'Séville',
        programs: 'Humanités, Sciences, Ingénierie'
      },
      {
        name: 'IE University',
        location: 'Madrid',
        programs: 'Business, Droit, Relations Internationales'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Orientation et Sélection',
        description: 'Choix des universités et programmes adaptés à votre profil'
      },
      {
        step: 2,
        title: 'Préparation Linguistique',
        description: 'Cours d\'espagnol et préparation au DELE si nécessaire'
      },
      {
        step: 3,
        title: 'Admission et Visa',
        description: 'Soumission du dossier et obtention du visa étudiant'
      },
      {
        step: 4,
        title: 'Installation en Espagne',
        description: 'Aide au logement, NIE et intégration dans la vie étudiante'
      }
    ],
    costs: {
      tuition: '750€ - 2,500€/an (universités publiques), 6,000€ - 18,000€/an (privées)',
      housing: '250€ - 600€/mois selon la ville',
      living: '700€ - 1,000€/mois',
      scholarships: 'Bourses MAEC-AECID, Erasmus+, bourses universitaires disponibles'
    },
    testimonial: {
      name: 'Fatima Zahra',
      program: 'Licence en Communication',
      university: 'Universidad de Barcelona',
      quote: 'L\'Espagne combine parfaitement qualité académique et qualité de vie. L\'ambiance chaleureuse et les opportunités d\'apprentissage de la langue font toute la différence.',
      image: '/user1.svg'
    }
  },
  chine: {
    slug: 'chine',
    name: 'Chine',
    flag: '🇨🇳',
    hero: {
      title: 'Étudier en Chine',
      description: 'Découvrez une puissance éducative mondiale avec des universités modernes, des bourses généreuses et une immersion dans une culture millénaire.',
      image: '/images/destinations/chine-hero.jpg'
    },
    advantages: [
      {
        icon: 'GraduationCap',
        title: 'Universités de Rang Mondial',
        description: 'Établissements classés parmi les meilleurs avec des programmes en anglais'
      },
      {
        icon: 'Globe',
        title: 'Immersion Culturelle Unique',
        description: 'Découverte d\'une civilisation millénaire et apprentissage du mandarin'
      },
      {
        icon: 'TrendingUp',
        title: 'Bourses Généreuses',
        description: 'Programme de bourses du gouvernement chinois couvrant frais et logement'
      },
      {
        icon: 'Heart',
        title: 'Coût de Vie Abordable',
        description: 'Vie étudiante économique avec infrastructure moderne'
      }
    ],
    universities: [
      {
        name: 'Tsinghua University',
        location: 'Pékin',
        programs: 'Ingénierie, Sciences, Business'
      },
      {
        name: 'Peking University',
        location: 'Pékin',
        programs: 'Sciences, Humanités, Droit'
      },
      {
        name: 'Fudan University',
        location: 'Shanghai',
        programs: 'Sciences, Médecine, Sciences Sociales'
      },
      {
        name: 'Zhejiang University',
        location: 'Hangzhou',
        programs: 'Ingénierie, Sciences, Médecine'
      },
      {
        name: 'Shanghai Jiao Tong University',
        location: 'Shanghai',
        programs: 'Ingénierie, Médecine, Business'
      },
      {
        name: 'University of Science and Technology',
        location: 'Hefei',
        programs: 'Sciences, Physique, Ingénierie'
      }
    ],
    admissionProcess: [
      {
        step: 1,
        title: 'Orientation et Bourses',
        description: 'Sélection des universités et candidature aux bourses CSC'
      },
      {
        step: 2,
        title: 'Candidature Universitaire',
        description: 'Soumission du dossier complet aux universités choisies'
      },
      {
        step: 3,
        title: 'Visa Étudiant',
        description: 'Obtention du visa X1 ou X2 selon la durée d\'études'
      },
      {
        step: 4,
        title: 'Arrivée en Chine',
        description: 'Accueil à l\'aéroport, logement sur campus et enregistrement'
      }
    ],
    costs: {
      tuition: '2,500$ - 10,000$ USD/an (souvent couvert par bourses CSC)',
      housing: '100$ - 400$ USD/mois (sur campus)',
      living: '300$ - 600$ USD/mois',
      scholarships: 'Bourses CSC (Chinese Government Scholarship) couvrant 100% des frais + allocation mensuelle'
    },
    testimonial: {
      name: 'Omar El Idrissi',
      program: 'Master en Intelligence Artificielle',
      university: 'Tsinghua University',
      quote: 'Étudier en Chine avec une bourse CSC a été l\'opportunité de ma vie. La qualité de l\'enseignement en IA et les opportunités de recherche sont exceptionnelles. Une expérience transformatrice.',
      image: '/user2.svg'
    }
  }
}

// Generate metadata for each destination
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const destination = destinationsData[slug]
  
  if (!destination) {
    return {
      title: 'Destination Non Trouvée',
    }
  }

  return {
    title: `Étudier en ${destination.name} | L'Étudiant à l'Étranger`,
    description: destination.hero.description,
  }
}

// Generate static params for all destinations
export async function generateStaticParams() {
  return Object.keys(destinationsData).map((slug) => ({
    slug,
  }))
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = destinationsData[slug]

  if (!destination) {
    notFound()
  }

  return <DestinationPageClient destination={destination} />
}
