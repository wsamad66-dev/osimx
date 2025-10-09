import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { EnhancedNavigation } from '@/components/layout/EnhancedNavigation'
import { EnhancedFooter } from '@/components/layout/EnhancedFooter'
import { WhatsAppWidget } from '@/components/widgets/WhatsAppWidget'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID

export const metadata: Metadata = {
  title: {
    template: '%s | L\'Étudiant à l\'Étranger',
    default: 'L\'Étudiant à l\'Étranger - Votre avenir en France commence aujourd\'hui',
  },
  description: 'Accompagnement pour étudiants africains souhaitant étudier en France : admission, visa, logement et plus. Étudier en France depuis l\'Afrique, c\'est possible !',
  keywords: 'étudier en France depuis l\'Afrique, visa étudiant France, accompagnement études France, bourses études France',
  openGraph: {
    title: 'L\'Étudiant à l\'Étranger - Études en France pour étudiants africains',
    description: 'Accompagnement complet pour étudier en France : admission universitaire, visa, logement et installation. Plus de 3500 étudiants accompagnés avec 95% de succès.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L\'Étudiant à l\'Étranger - Votre avenir en France',
    description: 'Accompagnement pour étudiants africains souhaitant étudier en France',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {FB_PIXEL_ID && (
          <>
            <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${FB_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                width="1"
                height="1"
                alt=""
                style={{ display: 'none' }}
              />
            </noscript>
          </>
        )}

        {/* Schema.org Structured Data */}
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: "L'Étudiant à l'Étranger",
            description: 'Accompagnement complet pour études à l\'étranger pour étudiants africains',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com',
            telephone: process.env.NEXT_PUBLIC_PHONE_MAIN || '+33 1 23 45 67 89',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'FR',
              addressLocality: 'Paris',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500',
            },
            sameAs: [
              process.env.NEXT_PUBLIC_FACEBOOK_URL,
              process.env.NEXT_PUBLIC_INSTAGRAM_URL,
              process.env.NEXT_PUBLIC_LINKEDIN_URL,
              process.env.NEXT_PUBLIC_TWITTER_URL,
            ].filter(Boolean),
          })}
        </Script>
      </head>
      <body className="font-inter bg-white text-gray-900">
        <EnhancedNavigation />
        <main className="min-h-screen">
          {children}
        </main>
        <EnhancedFooter />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
