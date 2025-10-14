'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { hasAcceptedCookies } from '@/lib/cookieConsent'

interface GoogleAnalyticsProps {
  measurementId: string
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    // Check initial consent status
    const checkConsent = () => {
      if (hasAcceptedCookies()) {
        setConsentGiven(true)
      }
    }

    checkConsent()

    // Listen for consent changes
    const handleConsentAccepted = () => {
      setConsentGiven(true)
      
      // Initialize GA after consent is given
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
    }

    const handleConsentRefused = () => {
      setConsentGiven(false)
      
      // Disable GA if consent is refused
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
    }

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted)
    window.addEventListener('cookieConsentRefused', handleConsentRefused)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted)
      window.removeEventListener('cookieConsentRefused', handleConsentRefused)
    }
  }, [])

  // Only render scripts if consent is given
  if (!consentGiven) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Set default consent to denied
          gtag('consent', 'default', {
            'analytics_storage': 'granted'
          });
          
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
