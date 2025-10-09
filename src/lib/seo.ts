import type { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}

export function generateSEO({
  title = "L'Étudiant à l'Étranger - Réalisez vos rêves d'études à l'étranger",
  description = "Accompagnement professionnel personnalisé pour étudiants africains vers l'Europe, le Canada et l'Asie. Plus de 95% de taux de réussite depuis 2018.",
  keywords = [
    'études à l\'étranger',
    'étudier au Canada',
    'étudier en France',
    'visa étudiant',
    'admission université',
    'bourses d\'études',
    'accompagnement étudiants africains',
  ],
  image = '/og-image.jpg',
  url = 'https://yourdomain.com',
  type = 'website',
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      type: type as 'website' | 'article',
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
