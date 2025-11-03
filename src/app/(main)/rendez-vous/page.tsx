import type { Metadata } from 'next'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export const metadata: Metadata = {
  title: 'Prendre Rendez-vous | L\'Étudiant Étranger',
  description: 'Réservez votre consultation gratuite de 30 minutes avec nos experts. Nous vous accompagnons dans votre projet d\'études à l\'étranger.',
  openGraph: {
    title: 'Prendre Rendez-vous | L\'Étudiant Étranger',
    description: 'Consultation gratuite pour votre projet d\'études à l\'étranger',
    type: 'website',
  },
}

export default function RendezVousPage() {
  return (
    <div className="min-h-screen">
      <AppointmentForm variant="section" />
    </div>
  )
}
