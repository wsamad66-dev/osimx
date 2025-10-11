import type { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  robots: 'index, follow',
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout simple sans header ni footer pour les pages légales
  // Ce layout remplace complètement le layout parent (main)
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}
