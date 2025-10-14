# 🍪 Cookie Consent System - Documentation

## Overview

A complete GDPR-compliant cookie consent system for L'Étudiant Étranger website. This implementation ensures compliance with EU privacy regulations while providing a smooth user experience.

---

## 📁 Files Created

### 1. Components
- **`src/components/CookieBanner.tsx`** - Main cookie consent banner component
- **`src/components/GoogleAnalytics.tsx`** - Conditional Google Analytics loader
- **`src/components/FacebookPixel.tsx`** - Conditional Facebook Pixel loader

### 2. Utilities
- **`src/lib/cookieConsent.ts`** - Helper functions for managing consent state

### 3. Types
- **`src/types/global.d.ts`** - TypeScript declarations for tracking scripts

---

## 🎯 Features

### Cookie Banner
✅ **Fixed bottom position** - Non-intrusive design  
✅ **French language** - "Ce site utilise des cookies..."  
✅ **Two clear buttons** - Accept ✅ / Refuse ❌  
✅ **localStorage persistence** - Choice remembered forever  
✅ **Smooth animations** - Slide up with fade-in (Framer Motion)  
✅ **Mobile responsive** - Stacks vertically on small screens  
✅ **Accessible** - ARIA labels, keyboard navigation, focus states  
✅ **Dark theme** - Gray-800 background with white text  
✅ **Privacy policy link** - Direct link to `/politique-confidentialite`  
✅ **Event dispatching** - Notifies other components when consent changes  

### Tracking Scripts
✅ **Conditional loading** - Only load if user accepted cookies  
✅ **Google Analytics** - With consent mode support  
✅ **Facebook Pixel** - Dynamic initialization after consent  
✅ **Event listeners** - Auto-reload when consent is given  

---

## 🚀 Usage

### Basic Implementation

The cookie banner is already integrated into your root layout:

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

### Using Utility Functions

```tsx
import { 
  hasAcceptedCookies, 
  getCookieConsent,
  clearCookieConsent 
} from '@/lib/cookieConsent'

// Check if user accepted cookies
if (hasAcceptedCookies()) {
  // Load tracking scripts
  console.log('User accepted cookies')
}

// Get current consent status
const status = getCookieConsent() // 'accepted' | 'refused' | null

// Clear consent (useful for testing)
clearCookieConsent()
```

### Custom Callbacks

```tsx
<CookieBanner 
  onAccept={() => {
    console.log('User accepted cookies!')
    // Your custom logic here
  }}
  onRefuse={() => {
    console.log('User refused cookies')
    // Your custom logic here
  }}
/>
```

### Listening to Consent Events

```tsx
useEffect(() => {
  const handleAccept = () => {
    console.log('Cookies accepted!')
    // Initialize your tracking scripts
  }

  window.addEventListener('cookieConsentAccepted', handleAccept)
  
  return () => {
    window.removeEventListener('cookieConsentAccepted', handleAccept)
  }
}, [])
```

---

## 🎨 Customization

### Styling

The banner uses Tailwind CSS classes. Customize colors in `CookieBanner.tsx`:

```tsx
// Background
className="bg-gray-800/95 backdrop-blur-md" // Change gray-800 to your color

// Accept button
className="bg-gradient-to-r from-orange-500 to-orange-600" // Change to your brand colors

// Cookie icon color
<Cookie className="w-6 h-6 text-orange-400" /> // Change text-orange-400
```

### Text Content

Update the message in `CookieBanner.tsx`:

```tsx
<p className="text-white text-sm sm:text-base leading-relaxed">
  <span className="font-semibold">🍪 Your custom message</span>
  {' '}More details about cookie usage...
</p>
```

### Animation Speed

Adjust animation parameters:

```tsx
transition={{ 
  type: 'spring',
  stiffness: 300,  // Higher = faster
  damping: 30,     // Higher = less bouncy
}}
```

---

## 🔧 Configuration

### Google Analytics Setup

1. Get your GA4 Measurement ID from Google Analytics
2. Update in `layout.tsx`:

```tsx
<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
```

### Facebook Pixel Setup

1. Add Facebook Pixel to your layout:

```tsx
import FacebookPixel from '@/components/FacebookPixel'

// In your layout
<FacebookPixel pixelId="YOUR_PIXEL_ID" />
```

### Adding Other Tracking Scripts

Follow the same pattern as `GoogleAnalytics.tsx`:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { hasAcceptedCookies } from '@/lib/cookieConsent'

export default function YourTracker() {
  const [consentGiven, setConsentGiven] = useState(false)

  useEffect(() => {
    if (hasAcceptedCookies()) {
      setConsentGiven(true)
      // Initialize your tracker
    }

    const handleAccept = () => {
      setConsentGiven(true)
      // Initialize your tracker
    }

    window.addEventListener('cookieConsentAccepted', handleAccept)
    return () => window.removeEventListener('cookieConsentAccepted', handleAccept)
  }, [])

  if (!consentGiven) return null

  return (
    // Your tracking script here
  )
}
```

---

## 📊 LocalStorage Data

The system stores two items in localStorage:

```javascript
// Consent status
localStorage.getItem('cookieConsent') // 'accepted' | 'refused'

// Consent date (ISO string)
localStorage.getItem('cookieConsentDate') // '2025-10-12T14:30:00.000Z'
```

---

## 🔒 GDPR Compliance

### ✅ What Makes This GDPR-Compliant

1. **Explicit Consent** - User must actively click Accept
2. **Opt-out Option** - User can refuse cookies
3. **No Tracking Before Consent** - Scripts only load after acceptance
4. **Persistent Choice** - Decision saved in localStorage
5. **Clear Information** - Explains cookie usage in French
6. **Privacy Policy Link** - Direct link to full policy
7. **Easy to Revoke** - User can clear consent and decide again

### 📝 GDPR Checklist

- [x] Cookie banner appears before any tracking
- [x] User can refuse cookies
- [x] Tracking scripts only load after acceptance
- [x] Clear information about cookie usage
- [x] Link to privacy policy
- [x] Consent is stored and remembered
- [x] No pre-checked boxes or forced consent
- [x] Accessible to all users

### ⚠️ Additional Recommendations

1. **Privacy Policy** - Update `/politique-confidentialite` with:
   - List of cookies used
   - Purpose of each cookie
   - Duration of storage
   - Third-party services (GA, Facebook)
   - User rights (access, deletion, etc.)

2. **Cookie Management Page** - Consider adding a page where users can:
   - View current consent status
   - Change their decision
   - Delete all cookies

3. **Regular Updates** - Check consent expiry with `isConsentExpired()`

---

## 🧪 Testing

### Test Cookie Banner Appearance

```javascript
// In browser console:
localStorage.removeItem('cookieConsent')
localStorage.removeItem('cookieConsentDate')
// Refresh page - banner should appear
```

### Test Accept Flow

1. Clear localStorage
2. Refresh page
3. Click "Accepter"
4. Open DevTools → Application → Local Storage
5. Verify `cookieConsent: "accepted"`
6. Check Network tab for GA scripts

### Test Refuse Flow

1. Clear localStorage
2. Refresh page
3. Click "Refuser"
4. Verify no tracking scripts loaded
5. Verify `cookieConsent: "refused"` in localStorage

### Test Persistence

1. Accept or refuse cookies
2. Navigate to different pages
3. Banner should not reappear
4. Close and reopen browser
5. Banner should still not appear

---

## 🐛 Troubleshooting

### Banner Doesn't Appear

**Issue**: Banner not showing even after clearing localStorage  
**Solution**: 
- Check browser console for errors
- Verify `CookieBanner` is imported in layout
- Make sure component is client-side (`'use client'`)

### Tracking Scripts Not Loading

**Issue**: GA not working after accepting cookies  
**Solution**:
- Verify measurement ID is correct
- Check Network tab for script requests
- Clear cache and hard reload
- Check browser console for errors

### Banner Appears Every Time

**Issue**: Choice not persisted  
**Solution**:
- Check if localStorage is enabled in browser
- Verify no errors in console
- Check if browser is in incognito/private mode (localStorage cleared on close)

### Styling Issues

**Issue**: Banner looks broken or overlaps content  
**Solution**:
- Check `z-index` (should be 9999)
- Verify Tailwind CSS is configured properly
- Check for CSS conflicts with other components

---

## 🎯 Best Practices

### 1. Test in All Browsers
- Chrome, Firefox, Safari, Edge
- Desktop and mobile versions

### 2. Test Accessibility
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader compatibility
- High contrast mode

### 3. Monitor Performance
- Lazy load tracking scripts
- Use `strategy="afterInteractive"` for Next.js Script
- Minimize bundle size

### 4. Update Privacy Policy
- List all cookies and their purposes
- Explain data collection practices
- Provide contact information

### 5. Regular Audits
- Review consent rates
- Check for tracking errors
- Update cookie list as needed

---

## 📱 Mobile Considerations

The banner is fully responsive:

- **Small screens** (< 640px): Buttons stack vertically, full width
- **Large screens** (≥ 640px): Buttons side-by-side, auto width
- **Touch-friendly**: Large tap targets (44px minimum)
- **Readable text**: 14px mobile, 16px desktop

---

## 🌍 Internationalization

To add more languages:

```tsx
// Create a translations object
const translations = {
  fr: {
    message: "Ce site utilise des cookies...",
    accept: "Accepter",
    refuse: "Refuser"
  },
  en: {
    message: "This site uses cookies...",
    accept: "Accept",
    refuse: "Decline"
  }
}

// Use in component
const t = translations[locale]
```

---

## 📚 Resources

- [GDPR Official Website](https://gdpr.eu/)
- [Google Analytics Consent Mode](https://support.google.com/analytics/answer/9976101)
- [Cookie Consent Best Practices](https://www.cookiebot.com/en/gdpr-cookies/)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)

---

## 💡 Future Enhancements

Consider adding:

1. **Granular Consent** - Separate toggles for different cookie types:
   - Essential cookies (always on)
   - Analytics cookies (optional)
   - Marketing cookies (optional)
   - Social media cookies (optional)

2. **Cookie Settings Page** - Dedicated page at `/parametres-cookies`

3. **Consent Expiry** - Auto-prompt after 1 year using `isConsentExpired()`

4. **Cookie Details Modal** - Expandable list of all cookies used

5. **A/B Testing** - Test different banner designs and copy

---

## 🆘 Support

If you encounter issues:

1. Check this documentation
2. Review browser console for errors
3. Test in different browsers
4. Clear cache and localStorage
5. Verify all imports and file paths

---

## ✅ Summary

You now have a complete, GDPR-compliant cookie consent system:

- ✅ Beautiful, accessible cookie banner
- ✅ Conditional tracking script loading
- ✅ Utility functions for consent management
- ✅ TypeScript support
- ✅ Mobile-friendly design
- ✅ Smooth animations
- ✅ Event-driven architecture
- ✅ Easy to customize and extend

**Next Steps:**
1. Replace `"G-XXXXXXXXXX"` with your real Google Analytics ID
2. Update privacy policy page with cookie details
3. Test thoroughly in all browsers
4. Deploy and monitor consent rates

Bon courage! 🚀
