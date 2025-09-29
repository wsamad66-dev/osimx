import type { Metadata } from 'next'
import { Montserrat, Roboto } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '700']
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['300', '400', '500']
})

export const metadata: Metadata = {
  title: 'L\'Étudiant à l\'Étranger - Votre avenir en France commence aujourd\'hui',
  description: 'Accompagnement pour étudiants africains souhaitant étudier en France : admission, visa, logement et plus. Étudier en France depuis l\'Afrique, c\'est possible !',
  keywords: 'étudier en France depuis l\'Afrique, visa étudiant France, accompagnement études France, bourses études France',
  openGraph: {
    title: 'L\'Étudiant à l\'Étranger - Études en France pour étudiants africains',
    description: 'Accompagnement complet pour étudier en France : admission universitaire, visa, logement et installation. Plus de 500 étudiants accompagnés avec 95% de succès.',
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
    google: 'your-google-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        {/* Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'FB_PIXEL_ID');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}} 
               src="https://www.facebook.com/tr?id=FB_PIXEL_ID&ev=PageView&noscript=1"/>
        </noscript>
      </head>
      <body className="font-roboto bg-gray-50 text-gray-700">
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}