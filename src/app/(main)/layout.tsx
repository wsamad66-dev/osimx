'use client'

import { usePathname } from 'next/navigation'
import { EnhancedNavigationServer } from '@/components/layout/EnhancedNavigationServer'
import { EnhancedFooter } from '@/components/layout/EnhancedFooter'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <EnhancedNavigationServer />
      {children}
      <EnhancedFooter />
    </>
  )
}
