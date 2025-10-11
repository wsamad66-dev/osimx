import type { Metadata } from 'next'
import { HeroSectionServer } from '@/components/hero/HeroSectionServer'
import { AnimatedStatsSection } from '@/components/sections/AnimatedStatsSection'
import { InteractiveDestinations } from '@/components/sections/InteractiveDestinations'
import TestimonialsGrid from '@/components/testimonials/TestimonialsGrid'
import { FinalCTASection } from '@/components/sections/FinalCTASection'
import { FloatingCTA } from '@/components/widgets/FloatingCTA'

export const metadata: Metadata = {
  title: 'L\'Étudiant à l\'Étranger - Réalisez vos rêves d\'études à l\'étranger',
  description: 'Accompagnement professionnel personnalisé pour étudiants africains vers l\'Europe, le Canada et l\'Asie. Plus de 95% de taux de réussite depuis 2018.',
  keywords: [
    'études à l\'étranger',
    'étudier au Canada',
    'étudier en France',
    'visa étudiant',
    'admission université',
    'bourses d\'études',
    'accompagnement étudiants africains',
  ].join(', '),
  openGraph: {
    title: 'L\'Étudiant à l\'Étranger - Réalisez vos rêves d\'études à l\'étranger',
    description: 'Accompagnement professionnel pour étudiants africains. 95% de taux de réussite.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSectionServer />
      <AnimatedStatsSection />
      <InteractiveDestinations />
      <TestimonialsGrid />
      <FinalCTASection />
      <FloatingCTA />
    </>
  )
}
