import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout vide pour le Studio - pas de header/footer
  return <>{children}</>
}
