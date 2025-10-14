import type { Metadata } from 'next'
import { AdvancedFAQ } from '@/components/sections/AdvancedFAQ'

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes | L\'Étudiant à l\'Étranger',
  description: 'Trouvez les réponses à toutes vos questions sur les études à l\'étranger : admission, visa, bourses, logement, et bien plus encore.',
  keywords: [
    'FAQ études à l\'étranger',
    'questions visa étudiant',
    'admission université',
    'bourses d\'études',
    'coût études à l\'étranger',
    'questions fréquentes',
  ].join(', '),
  openGraph: {
    title: 'FAQ - Questions Fréquentes | L\'Étudiant à l\'Étranger',
    description: 'Toutes les réponses à vos questions sur les études à l\'étranger',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <AdvancedFAQ />
    </main>
  )
}
