import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4hv0dnh9',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const navigationData = {
  _id: 'main-navigation',
  _type: 'navigation',
  title: 'Header Principal',
  logo: {
    text: "L'Étudiant à l'Étranger",
  },
  menuItems: [
    {
      _key: 'accueil',
      label: 'Accueil',
      link: '/',
      order: 1,
      hasDropdown: false,
    },
    {
      _key: 'services',
      label: 'Services',
      link: '/services',
      order: 2,
      hasDropdown: true,
      dropdownItems: [
        { _key: 'admission', label: 'Admission', link: '/services/admission' },
        { _key: 'visa', label: 'Visa', link: '/services/visa' },
        { _key: 'logement', label: 'Logement', link: '/services/logement' },
      ],
    },
    {
      _key: 'destinations',
      label: 'Destinations',
      link: '/destinations',
      order: 3,
      hasDropdown: true,
      dropdownItems: [
        { _key: 'france', label: 'France', link: '/destinations/france' },
        { _key: 'canada', label: 'Canada', link: '/destinations/canada' },
        { _key: 'belgique', label: 'Belgique', link: '/destinations/belgique' },
        { _key: 'allemagne', label: 'Allemagne', link: '/destinations/allemagne' },
        { _key: 'espagne', label: 'Espagne', link: '/destinations/espagne' },
        { _key: 'chine', label: 'Chine', link: '/destinations/chine' },
      ],
    },
  ],
  ctaButton: {
    text: 'Démarrer',
    link: '#',
    style: 'black',
    openModal: true,
  },
  isActive: true,
}

async function createNavigation() {
  try {
    const result = await client.createOrReplace(navigationData)
    console.log('✅ Navigation created successfully!')
    console.log('Document ID:', result._id)
  } catch (error) {
    console.error('❌ Error creating navigation:', error)
  }
}

createNavigation()
