import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: 'index, follow',
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout simple sans header ni footer pour les pages légales
  return <>{children}</>
}
