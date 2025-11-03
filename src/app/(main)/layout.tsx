import { client, isSanityConfigured } from '@/lib/sanity/client'
import { NAVIGATION_QUERY } from '@/lib/sanity-queries'
import type { NavigationContent } from '@/lib/sanity-queries'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch navigation data from Sanity
  let navigationData: NavigationContent | null = null

  if (isSanityConfigured && client) {
    try {
      navigationData = await client.fetch<NavigationContent>(
        NAVIGATION_QUERY,
        {},
        { next: { revalidate: 60 } }
      )
    } catch (error) {
      console.error('Error fetching navigation from Sanity:', error)
    }
  }

  return (
    <ConditionalLayout navigationData={navigationData}>
      {children}
    </ConditionalLayout>
  )
}
