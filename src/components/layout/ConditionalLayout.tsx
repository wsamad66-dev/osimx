'use client'

import { usePathname } from 'next/navigation'
import { EnhancedNavigation } from '@/components/layout/EnhancedNavigation'
import { EnhancedFooter } from '@/components/layout/EnhancedFooter'
import type { NavigationContent } from '@/lib/sanity-queries'

interface ConditionalLayoutProps {
  children: React.ReactNode
  navigationData: NavigationContent | null
}

export function ConditionalLayout({ children, navigationData }: ConditionalLayoutProps) {
  const pathname = usePathname()

  // Pages légales sans header ni footer
  const isLegalPage = pathname?.startsWith('/mentions-legales') ||
                      pathname?.startsWith('/politique-confidentialite') ||
                      pathname?.startsWith('/conditions-utilisation')

  if (isLegalPage) {
    return <>{children}</>
  }

  return (
    <>
      <EnhancedNavigation navigationData={navigationData} />
      {children}
      <EnhancedFooter />
    </>
  )
}
