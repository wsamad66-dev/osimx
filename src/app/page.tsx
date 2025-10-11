import { Metadata } from 'next'

import { Hero } from '@/components/sections/Hero'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Services } from '@/components/sections/Services'
import { Destinations } from '@/components/sections/Destinations'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'
import { WhatsAppButton } from '@/components/ui/WhatsAppButton'
import { getHomepageContent } from '@/lib/strapi'

export const metadata: Metadata = {
  title: "L'ÉTUDIANT À L'ÉTRANGER - Réalisez vos rêves d'études à l'étranger",
  description:
    "Agence professionnelle d'accompagnement pour étudiants africains. France, Belgique, Canada, Italie, Chine. Orientation, admission, visa, logement. 95% de taux de réussite.",
  keywords:
    "étudier à l'étranger Afrique, visa étudiant France Canada Belgique, accompagnement études internationales, admission université étrangère, L'ÉTUDIANT À L'ÉTRANGER",
  openGraph: {
    title: "L'ÉTUDIANT À L'ÉTRANGER - Réalisez vos rêves d'études à l'étranger",
    description:
      "Accompagnement complet de A à Z pour étudier en France, Belgique, Canada, Italie ou Chine. Plus de 500 étudiants africains accompagnés avec succès.",
    type: 'website',
    locale: 'fr_FR',
    siteName: "L'ÉTUDIANT À L'ÉTRANGER",
    images: [
      {
        url: 'https://www.letudiantalletranger.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "L'ÉTUDIANT À L'ÉTRANGER - Études à l'étranger",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'ÉTUDIANT À L'ÉTRANGER - Votre partenaire pour étudier à l'étranger",
    description:
      "Agence professionnelle d'accompagnement pour étudiants africains : France, Belgique, Canada, Italie, Chine",
  },
  alternates: {
    canonical: 'https://www.letudiantalletranger.com',
  },
}

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: "L'ÉTUDIANT À L'ÉTRANGER",
  url: 'https://www.letudiantalletranger.com',
  logo: 'https://www.letudiantalletranger.com/logo.png',
  description:
    "Agence premium aidant les étudiants africains à étudier en France, Belgique, Canada, Italie et Chine",
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.facebook.com/letudiantalletranger',
    'https://www.instagram.com/letudiantalletranger',
    'https://www.linkedin.com/company/letudiantalletranger',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '500',
    bestRating: '5',
  },
} as const

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Educational Consulting',
  provider: {
    '@type': 'EducationalOrganization',
    name: "L'ÉTUDIANT À L'ÉTRANGER",
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'Africa',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Study Abroad Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'University Admission Assistance',
          description: 'Complete support for university applications and admissions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Visa Application Support',
          description: 'Expert guidance for student visa applications',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Housing & Integration',
          description: 'Accommodation search and local integration support',
        },
      },
    ],
  },
} as const

export default async function HomePage() {
  const homepage = await getHomepageContent()

  const whatsappNumber = homepage.cta.whatsappNumber ?? '+33756891234'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }} />

      <main>
        <Hero content={homepage.hero} />
        <WhyChooseUs benefits={homepage.benefits} />
        <Services services={homepage.services} />
        <Destinations destinations={homepage.destinations} />
        <Testimonials testimonials={homepage.testimonials} />
        <CTA cta={homepage.cta} />
        <Footer partners={homepage.partners} />
      </main>

      <WhatsAppButton
        phoneNumber={whatsappNumber}
        message="Bonjour, je suis intéressé(e) par vos services d'accompagnement premium pour étudier à l'étranger."
        position="bottom-right"
      />
    </>
  )
}