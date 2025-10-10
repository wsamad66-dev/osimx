import { client, isSanityConfigured } from '@/lib/sanity/client'
import { NAVIGATION_QUERY } from '@/lib/sanity-queries'
import type { NavigationContent } from '@/lib/sanity-queries'
import { EnhancedNavigation } from './EnhancedNavigation'

// Fallback data if Sanity is not configured
const fallbackData: NavigationContent = {
  _id: 'fallback',
  _type: 'navigation',
  title: 'Default Navigation',
  logo: {
    text: "L'Étudiant à l'Étranger",
  },
  menuItems: [
    { label: 'Accueil', link: '/', order: 1, _key: '1' },
    {
      label: 'Services',
      link: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Admission', link: '/services/admission', _key: 's1' },
        { label: 'Visa', link: '/services/visa', _key: 's2' },
        { label: 'Logement', link: '/services/logement', _key: 's3' },
      ],
      order: 2,
      _key: '2',
    },
    {
      label: 'Destinations',
      link: '/destinations',
      hasDropdown: true,
      dropdownItems: [
        { label: 'France', link: '/destinations/france', _key: 'd1' },
        { label: 'Canada', link: '/destinations/canada', _key: 'd2' },
        { label: 'Belgique', link: '/destinations/belgique', _key: 'd3' },
        { label: 'Allemagne', link: '/destinations/allemagne', _key: 'd4' },
        { label: 'Espagne', link: '/destinations/espagne', _key: 'd5' },
        { label: 'Chine', link: '/destinations/chine', _key: 'd6' },
      ],
      order: 3,
      _key: '3',
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

export async function EnhancedNavigationServer() {
  let navigationData: NavigationContent | null = null

  // Only fetch from Sanity if configured
  if (isSanityConfigured && client) {
    try {
      navigationData = await client.fetch<NavigationContent>(NAVIGATION_QUERY, {}, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      })
    } catch (error) {
      console.error('Error fetching navigation from Sanity:', error)
    }
  }

  const navData = navigationData || fallbackData

  return <EnhancedNavigation navigationData={navData} />
}
