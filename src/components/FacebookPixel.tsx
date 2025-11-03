'use client'

import { useEffect, useState } from 'react'
import { hasAcceptedCookies } from '@/lib/cookieConsent'

interface FacebookPixelProps {
  pixelId: string
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    // Check initial consent status
    const checkConsent = () => {
      if (hasAcceptedCookies()) {
        setConsentGiven(true)
        initFacebookPixel()
      }
    }

    checkConsent()

    // Listen for consent changes
    const handleConsentAccepted = () => {
      setConsentGiven(true)
      initFacebookPixel()
    }

    const handleConsentRefused = () => {
      setConsentGiven(false)
    }

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted)
    window.addEventListener('cookieConsentRefused', handleConsentRefused)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted)
      window.removeEventListener('cookieConsentRefused', handleConsentRefused)
    }
  }, [pixelId])

  const initFacebookPixel = () => {
    if (typeof window === 'undefined' || (window as any).fbq) return

    // Initialize Facebook Pixel
    // eslint-disable-next-line prefer-rest-params, prefer-spread, @typescript-eslint/no-unused-expressions
    ;(function(f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) {
      if (f.fbq) return
      n = f.fbq = function(...args: any[]) {
        if (n.callMethod) {
          n.callMethod(...args)
        } else {
          n.queue.push(args)
        }
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    )

    const fbq = (window as any).fbq
    fbq('init', pixelId)
    fbq('track', 'PageView')
  }

  // Only render noscript pixel if consent is given
  if (!consentGiven) {
    return null
  }

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
        alt="Facebook pixel"
      />
    </noscript>
  )
}
