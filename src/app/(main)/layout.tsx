import { EnhancedNavigationServer } from '@/components/layout/EnhancedNavigationServer'
import { EnhancedFooter } from '@/components/layout/EnhancedFooter'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <EnhancedNavigationServer />
      {children}
      <EnhancedFooter />
    </>
  )
}
