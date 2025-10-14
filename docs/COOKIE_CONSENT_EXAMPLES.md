# 🎯 Cookie Consent - Integration Examples

## Example 1: Basic Integration (Already Done!)

```tsx
// src/app/layout.tsx
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
```

---

## Example 2: With Callbacks

```tsx
// src/app/layout.tsx
'use client'

import CookieBanner from '@/components/CookieBanner'

export default function Layout({ children }) {
  const handleAccept = () => {
    console.log('User accepted cookies! 🎉')
    // Initialize tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cookie_consent_accepted')
    }
  }

  const handleRefuse = () => {
    console.log('User refused cookies ❌')
    // Log refusal for analytics
    console.log('Consent refused at:', new Date().toISOString())
  }

  return (
    <>
      {children}
      <CookieBanner 
        onAccept={handleAccept}
        onRefuse={handleRefuse}
      />
    </>
  )
}
```

---

## Example 3: Conditional Content Based on Consent

```tsx
'use client'

import { useState, useEffect } from 'react'
import { hasAcceptedCookies } from '@/lib/cookieConsent'

export default function MarketingSection() {
  const [showAds, setShowAds] = useState(false)

  useEffect(() => {
    // Check if user accepted cookies
    if (hasAcceptedCookies()) {
      setShowAds(true)
    }

    // Listen for consent changes
    const handleAccept = () => setShowAds(true)
    const handleRefuse = () => setShowAds(false)

    window.addEventListener('cookieConsentAccepted', handleAccept)
    window.addEventListener('cookieConsentRefused', handleRefuse)

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleAccept)
      window.removeEventListener('cookieConsentRefused', handleRefuse)
    }
  }, [])

  if (showAds) {
    return (
      <div className="ads-section">
        <h2>Nos partenaires</h2>
        {/* Google Ads or other tracking-dependent content */}
      </div>
    )
  }

  return (
    <div className="promotional-section">
      <h2>Nos services</h2>
      {/* Non-tracking alternative content */}
    </div>
  )
}
```

---

## Example 4: Cookie Settings Page

```tsx
// src/app/parametres-cookies/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { getCookieConsent, clearCookieConsent, getConsentDate } from '@/lib/cookieConsent'

export default function CookieSettingsPage() {
  const [consent, setConsent] = useState<'accepted' | 'refused' | null>(null)
  const [consentDate, setConsentDate] = useState<Date | null>(null)

  useEffect(() => {
    setConsent(getCookieConsent())
    setConsentDate(getConsentDate())
  }, [])

  const handleClearConsent = () => {
    clearCookieConsent()
    setConsent(null)
    setConsentDate(null)
    alert('Vos préférences ont été réinitialisées. Rechargez la page pour voir le bandeau.')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Paramètres des cookies</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Votre choix actuel</h2>
        
        {consent === 'accepted' && (
          <div className="flex items-center gap-3 text-green-600">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-semibold">Cookies acceptés</p>
              <p className="text-sm text-gray-600">
                Vous avez accepté les cookies le {consentDate?.toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        )}
        
        {consent === 'refused' && (
          <div className="flex items-center gap-3 text-red-600">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-semibold">Cookies refusés</p>
              <p className="text-sm text-gray-600">
                Vous avez refusé les cookies le {consentDate?.toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        )}
        
        {consent === null && (
          <div className="flex items-center gap-3 text-gray-600">
            <span className="text-2xl">❓</span>
            <p>Aucun choix enregistré</p>
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Modifier vos préférences</h2>
        <p className="text-gray-700 mb-4">
          Vous pouvez réinitialiser votre choix et voir à nouveau le bandeau de cookies.
        </p>
        <button
          onClick={handleClearConsent}
          className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
        >
          Réinitialiser mes préférences
        </button>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">À propos des cookies</h2>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">📊 Cookies analytiques</h3>
          <p className="text-sm text-gray-600">
            Google Analytics - Nous utilisons ces cookies pour comprendre comment vous utilisez notre site.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">🎯 Cookies marketing</h3>
          <p className="text-sm text-gray-600">
            Facebook Pixel - Ces cookies nous aident à vous montrer des publicités pertinentes.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold mb-2">⚙️ Cookies essentiels</h3>
          <p className="text-sm text-gray-600">
            Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
          </p>
        </div>
      </div>
    </div>
  )
}
```

---

## Example 5: Tracking Custom Events After Consent

```tsx
'use client'

import { useEffect } from 'react'
import { hasAcceptedCookies } from '@/lib/cookieConsent'

export default function ContactForm() {
  const trackFormSubmission = () => {
    // Only track if user accepted cookies
    if (hasAcceptedCookies() && window.gtag) {
      window.gtag('event', 'form_submission', {
        form_name: 'contact_form',
        form_location: 'contact_page'
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Your form logic here
    submitForm()
    
    // Track the event
    trackFormSubmission()
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Envoyer</button>
    </form>
  )
}
```

---

## Example 6: Delayed Tracking Script

```tsx
'use client'

import { useEffect, useState } from 'react'
import { hasAcceptedCookies } from '@/lib/cookieConsent'
import Script from 'next/script'

export default function HotjarTracking() {
  const [loadHotjar, setLoadHotjar] = useState(false)

  useEffect(() => {
    if (hasAcceptedCookies()) {
      setLoadHotjar(true)
    }

    const handleAccept = () => setLoadHotjar(true)
    window.addEventListener('cookieConsentAccepted', handleAccept)
    
    return () => {
      window.removeEventListener('cookieConsentAccepted', handleAccept)
    }
  }, [])

  if (!loadHotjar) return null

  return (
    <Script
      id="hotjar"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  )
}
```

---

## Example 7: A/B Testing Different Banner Messages

```tsx
// src/components/CookieBannerVariant.tsx
'use client'

import { useState, useEffect } from 'react'
import CookieBanner from './CookieBanner'

export default function CookieBannerWithABTest() {
  const [variant, setVariant] = useState<'A' | 'B'>('A')

  useEffect(() => {
    // Randomly assign variant
    setVariant(Math.random() > 0.5 ? 'A' : 'B')
  }, [])

  const handleAccept = () => {
    // Track which variant was accepted
    if (window.gtag) {
      window.gtag('event', 'cookie_consent_accepted', {
        variant: variant
      })
    }
  }

  const handleRefuse = () => {
    // Track which variant was refused
    if (window.gtag) {
      window.gtag('event', 'cookie_consent_refused', {
        variant: variant
      })
    }
  }

  // Customize message based on variant
  const customMessage = variant === 'A'
    ? "🍪 Ce site utilise des cookies pour améliorer votre expérience."
    : "🍪 Nous utilisons des cookies pour vous offrir une meilleure navigation."

  return (
    <CookieBanner 
      onAccept={handleAccept}
      onRefuse={handleRefuse}
    />
  )
}
```

---

## Example 8: Multiple Tracking Services

```tsx
// src/app/layout.tsx
import GoogleAnalytics from '@/components/GoogleAnalytics'
import FacebookPixel from '@/components/FacebookPixel'
import CookieBanner from '@/components/CookieBanner'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* All tracking services respect cookie consent */}
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
        <FacebookPixel pixelId="123456789" />
        {/* Add more tracking services here */}
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
```

---

## Example 9: Check Consent in API Routes

```tsx
// src/app/api/track/route.ts
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // In API routes, you can't access localStorage
  // Instead, you could use cookies or check on client-side
  
  // If you want to track server-side, consider using cookies instead:
  const cookieStore = cookies()
  const consent = cookieStore.get('cookieConsent')?.value
  
  if (consent === 'accepted') {
    // Track the event
    await trackEvent(body.event)
  }
  
  return NextResponse.json({ tracked: consent === 'accepted' })
}
```

---

## Example 10: Consent Expiry Check

```tsx
'use client'

import { useEffect } from 'react'
import { isConsentExpired, clearCookieConsent } from '@/lib/cookieConsent'

export default function ConsentExpiryChecker() {
  useEffect(() => {
    // Check if consent is older than 1 year
    if (isConsentExpired(365)) {
      // Clear old consent
      clearCookieConsent()
      // Banner will show again on next render
      window.location.reload()
    }
  }, [])

  return null // This component doesn't render anything
}

// Add to layout:
// <ConsentExpiryChecker />
```

---

## Testing Commands (Browser Console)

```javascript
// Show banner again
localStorage.removeItem('cookieConsent')
localStorage.removeItem('cookieConsentDate')
location.reload()

// Check current status
console.log('Consent:', localStorage.getItem('cookieConsent'))
console.log('Date:', localStorage.getItem('cookieConsentDate'))

// Manually accept
localStorage.setItem('cookieConsent', 'accepted')
localStorage.setItem('cookieConsentDate', new Date().toISOString())
window.dispatchEvent(new Event('cookieConsentAccepted'))

// Manually refuse
localStorage.setItem('cookieConsent', 'refused')
localStorage.setItem('cookieConsentDate', new Date().toISOString())
window.dispatchEvent(new Event('cookieConsentRefused'))
```

---

## 🎯 Quick Tips

1. **Always check consent before loading tracking** - Use `hasAcceptedCookies()`
2. **Listen for consent events** - React to real-time consent changes
3. **Test both flows** - Accept AND refuse scenarios
4. **Mobile testing** - Verify responsive design
5. **Performance** - Lazy load tracking scripts after consent
6. **Privacy policy** - Keep it updated with all cookies used
7. **Accessibility** - Test keyboard navigation and screen readers
8. **Logging** - Track consent rates in your analytics

---

**Need help?** Check `/docs/COOKIE_CONSENT_GUIDE.md` for full documentation!
