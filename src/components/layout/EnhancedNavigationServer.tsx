import { client, isSanityConfigured } from '@/lib/sanity/client'
import { NAVIGATION_QUERY } from '@/lib/sanity-queries'
import type { NavigationContent } from '@/lib/sanity-queries'
import { EnhancedNavigation } from './EnhancedNavigation'

// Fallback data if Sanity is not configured
const fallbackData: NavigationContent = {
  _id: 'fallback',
  _type: 'navigation',
  title: 'L\'Étudiant Étranger',
  logo: {
    text: "L'Étudiant Étranger",
  },
  menuItems: [
    { label: 'Accueil', link: '/', order: 1, _key: '1' },
    {
      label: 'Nos Services',
      link: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Accompagnement Admission', link: '/services', _key: 's1' },
        { label: 'Assistance Visa', link: '/services', _key: 's2' },
        { label: 'Recherche Logement', link: '/services', _key: 's3' },
        { label: 'Bourses d\'Études', link: '/services', _key: 's4' },
        { label: 'Préparation au Départ', link: '/services', _key: 's5' },
      ],
      order: 2,
      _key: '2',
    },
    {
      label: 'Destinations',
      link: '/destinations',
      hasDropdown: true,
      dropdownItems: [
        { label: '🇨🇦 Canada', link: '/destinations/canada', _key: 'd1' },
        { label: '🇫🇷 France', link: '/destinations/france', _key: 'd2' },
        { label: '🇺🇸 USA', link: '/destinations/usa', _key: 'd3' },
        { label: '🇬🇧 Royaume-Uni', link: '/destinations/uk', _key: 'd4' },
        { label: '🇩🇪 Allemagne', link: '/destinations/allemagne', _key: 'd5' },
        { label: '🇧🇪 Belgique', link: '/destinations/belgique', _key: 'd6' },
        { label: '🇪🇸 Espagne', link: '/destinations/espagne', _key: 'd7' },
        { label: '🇨🇳 Chine', link: '/destinations/chine', _key: 'd8' },
      ],
      order: 3,
      _key: '3',
    },
    { label: 'Réussites', link: '/reussites', order: 4, _key: '4' },
    { label: 'Blog & Conseils', link: '/blog', order: 5, _key: '5' },
    { label: 'Contact', link: '/contact', order: 6, _key: '6' },
  ],
  ctaButton: {
    text: '🎯 Étudier à l\'étranger',
    link: '#quiz-destination',
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
