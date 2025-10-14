// 🍪 COOKIE CONSENT SYSTEM - VISUAL PREVIEW
// This is a reference file showing the UI and flow of the cookie banner

/*
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                     L'ÉTUDIANT ÉTRANGER WEBSITE                             │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │                                                                  │      │
│  │                        HERO SECTION                              │      │
│  │                                                                  │      │
│  └──────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │                        CONTENT                                   │      │
│  │                                                                  │      │
│  └──────────────────────────────────────────────────────────────────┘      │
│                                                                             │
│  ╔═══════════════════════════════════════════════════════════════════╗     │
│  ║                    🍪 COOKIE BANNER                               ║     │
│  ║  ┌────────────────────────────────────────────────────────────┐  ║     │
│  ║  │ [🍪]  🍪 Ce site utilise des cookies                        │  ║     │
│  ║  │       pour améliorer votre expérience et analyser le        │  ║     │
│  ║  │       trafic. En continuant, vous acceptez notre            │  ║     │
│  ║  │       utilisation des cookies conformément à notre          │  ║     │
│  ║  │       politique de confidentialité.                         │  ║     │
│  ║  │                                                              │  ║     │
│  ║  │                    [ ❌ Refuser ]  [ ✅ Accepter ]            │  ║     │
│  ║  └────────────────────────────────────────────────────────────┘  ║     │
│  ╚═══════════════════════════════════════════════════════════════════╝     │
└─────────────────────────────────────────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION FLOW
// ═══════════════════════════════════════════════════════════════════════════

/*
STEP 1: Initial Page Load (No Consent Stored)
┌─────────────────────────────────────────┐
│                                         │
│  Website loads normally                 │
│  ↓                                      │
│  Check localStorage('cookieConsent')    │
│  ↓                                      │
│  Not found? Wait 1 second...            │
│  ↓                                      │
│  Banner slides up from bottom           │
│  with fade-in effect                    │
│                                         │
└─────────────────────────────────────────┘

STEP 2a: User Clicks "Accepter" ✅
┌─────────────────────────────────────────┐
│                                         │
│  Set localStorage:                      │
│    cookieConsent = 'accepted'           │
│    cookieConsentDate = '2025-10-12...'  │
│  ↓                                      │
│  Dispatch 'cookieConsentAccepted' event │
│  ↓                                      │
│  GoogleAnalytics component listens      │
│  ↓                                      │
│  Load GA scripts dynamically            │
│  ↓                                      │
│  Banner slides down with fade-out       │
│  ↓                                      │
│  Banner removed from DOM                │
│                                         │
└─────────────────────────────────────────┘

STEP 2b: User Clicks "Refuser" ❌
┌─────────────────────────────────────────┐
│                                         │
│  Set localStorage:                      │
│    cookieConsent = 'refused'            │
│    cookieConsentDate = '2025-10-12...'  │
│  ↓                                      │
│  Dispatch 'cookieConsentRefused' event  │
│  ↓                                      │
│  NO tracking scripts loaded             │
│  ↓                                      │
│  Banner slides down with fade-out       │
│  ↓                                      │
│  Banner removed from DOM                │
│                                         │
└─────────────────────────────────────────┘

STEP 3: Return Visit (Consent Already Stored)
┌─────────────────────────────────────────┐
│                                         │
│  Website loads                          │
│  ↓                                      │
│  Check localStorage('cookieConsent')    │
│  ↓                                      │
│  Found 'accepted'?                      │
│    → Load GA scripts immediately        │
│    → DON'T show banner                  │
│  ↓                                      │
│  Found 'refused'?                       │
│    → DON'T load any tracking            │
│    → DON'T show banner                  │
│                                         │
└─────────────────────────────────────────┘
*/

// ═══════════════════════════════════════════════════════════════════════════
// MOBILE VIEW
// ═══════════════════════════════════════════════════════════════════════════

/*
┌──────────────────┐
│                  │
│   📱 MOBILE      │
│                  │
│  ┌────────────┐  │
│  │  Content   │  │
│  │            │  │
│  └────────────┘  │
│                  │
│  ╔════════════╗  │
│  ║ 🍪 Banner  ║  │
│  ║            ║  │
│  ║ [🍪] Text  ║  │
│  ║ Cookie msg ║  │
│  ║ continues  ║  │
│  ║ here...    ║  │
│  ║            ║  │
│  ║ [Refuser]  ║  │ ← Full width button
│  ║            ║  │
│  ║ [Accepter] ║  │ ← Full width button
│  ║            ║  │
│  ╚════════════╝  │
└──────────────────┘

Buttons stack vertically on screens < 640px
*/

// ═══════════════════════════════════════════════════════════════════════════
// COLOR SCHEME
// ═══════════════════════════════════════════════════════════════════════════

const COLORS = {
  // Banner Background
  background: 'rgba(31, 41, 55, 0.95)', // gray-800 with 95% opacity
  backdropBlur: 'md',                    // Blurred background
  
  // Border
  border: 'rgb(55, 65, 81)',             // gray-700
  
  // Cookie Icon
  icon: 'rgb(251, 146, 60)',             // orange-400
  
  // Text
  text: 'rgb(255, 255, 255)',            // white
  link: 'rgb(255, 255, 255)',            // white
  linkHover: 'rgb(251, 146, 60)',        // orange-400
  
  // Accept Button
  acceptBg: 'linear-gradient(to right, rgb(249, 115, 22), rgb(234, 88, 12))', // orange-500 to orange-600
  acceptHover: 'linear-gradient(to right, rgb(234, 88, 12), rgb(194, 65, 12))', // orange-600 to orange-700
  acceptText: 'rgb(255, 255, 255)',
  acceptShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)',
  
  // Refuse Button
  refuseBg: 'transparent',
  refuseHover: 'rgb(55, 65, 81)',        // gray-700
  refuseText: 'rgb(209, 213, 219)',      // gray-300
  refuseTextHover: 'rgb(255, 255, 255)', // white
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT STRUCTURE
// ═══════════════════════════════════════════════════════════════════════════

/*
<CookieBanner>
  └── <motion.div> (Animated container)
      └── <div> (Content wrapper with max-width)
          ├── <div> (Message section)
          │   ├── <Cookie icon>
          │   └── <p> (Cookie message text)
          │       └── <a> (Link to privacy policy)
          └── <div> (Buttons section)
              ├── <button> (Refuser)
              └── <button> (Accepter)
*/

// ═══════════════════════════════════════════════════════════════════════════
// ACCESSIBILITY FEATURES
// ═══════════════════════════════════════════════════════════════════════════

const ACCESSIBILITY = {
  // ARIA attributes
  role: 'dialog',
  ariaLive: 'polite',
  ariaLabel: 'Consentement des cookies',
  
  // Keyboard navigation
  tabIndex: {
    refuseButton: 0,  // Focusable
    acceptButton: 0,  // Focusable
  },
  
  // Focus management
  focusRing: {
    refuseButton: '2px solid rgb(107, 114, 128)', // gray-500
    acceptButton: '2px solid rgb(249, 115, 22)',  // orange-500
  },
  
  // Screen reader labels
  buttonLabels: {
    refuse: 'Refuser les cookies',
    accept: 'Accepter les cookies',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATION PARAMETERS
// ═══════════════════════════════════════════════════════════════════════════

const ANIMATIONS = {
  // Entry animation
  initial: {
    y: 100,           // Start 100px below viewport
    opacity: 0,       // Fully transparent
  },
  
  // Visible state
  animate: {
    y: 0,             // Slide to normal position
    opacity: 1,       // Fully opaque
  },
  
  // Exit animation
  exit: {
    y: 100,           // Slide 100px down
    opacity: 0,       // Fade out
  },
  
  // Transition settings
  transition: {
    type: 'spring',   // Spring physics animation
    stiffness: 300,   // How "stiff" the spring is (higher = faster)
    damping: 30,      // Resistance (higher = less bouncy)
    opacity: {
      duration: 0.2,  // Fade duration in seconds
    },
  },
  
  // Delay before showing
  showDelay: 1000,    // Wait 1 second after page load
}

// ═══════════════════════════════════════════════════════════════════════════
// RESPONSIVE BREAKPOINTS
// ═══════════════════════════════════════════════════════════════════════════

const BREAKPOINTS = {
  // Mobile: < 640px
  mobile: {
    buttonsDirection: 'column',      // Stack vertically
    buttonWidth: '100%',             // Full width
    gap: '12px',                     // 12px between buttons
    padding: '16px',                 // 16px padding
    fontSize: '14px',                // Smaller text
  },
  
  // Desktop: >= 640px
  desktop: {
    buttonsDirection: 'row',         // Horizontal layout
    buttonWidth: 'auto',             // Auto width
    gap: '12px',                     // 12px between buttons
    padding: '20px',                 // 20px padding
    fontSize: '16px',                // Normal text
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// USER FLOW DIAGRAM
// ═══════════════════════════════════════════════════════════════════════════

/*
┌──────────────────────────────────────────────────────────────────────────┐
│                         USER JOURNEY                                     │
└──────────────────────────────────────────────────────────────────────────┘

1. FIRST-TIME VISITOR
   ───────────────────
   User arrives → Page loads → Check localStorage → Not found
   → Wait 1s → Banner slides up → User sees options

   Choice A: Click "Accepter"
   ├─ Save 'accepted' to localStorage
   ├─ Trigger analytics initialization
   ├─ Banner slides down
   └─ Continue browsing with tracking

   Choice B: Click "Refuser"
   ├─ Save 'refused' to localStorage
   ├─ NO analytics loaded
   ├─ Banner slides down
   └─ Continue browsing without tracking

2. RETURNING VISITOR (Accepted)
   ────────────────────────────
   User arrives → Page loads → Check localStorage → Found 'accepted'
   → Load analytics immediately → No banner shown → Continue browsing

3. RETURNING VISITOR (Refused)
   ───────────────────────────
   User arrives → Page loads → Check localStorage → Found 'refused'
   → Don't load analytics → No banner shown → Continue browsing

4. USER CHANGES MIND
   ──────────────────
   Navigate to Settings/Privacy page
   → View current consent status
   → Button to "Clear consent"
   → Returns to state #1 (first-time visitor)
*/

// ═══════════════════════════════════════════════════════════════════════════
// TECHNICAL SPECIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════

const TECH_SPECS = {
  framework: 'Next.js 15 (App Router)',
  react: 'React 19',
  typescript: 'TypeScript 5',
  styling: 'Tailwind CSS 3',
  animations: 'Framer Motion 12',
  
  components: {
    CookieBanner: 'Client component',
    GoogleAnalytics: 'Client component',
    FacebookPixel: 'Client component',
  },
  
  storage: {
    type: 'localStorage',
    keys: ['cookieConsent', 'cookieConsentDate'],
    persistence: 'Permanent (until cleared)',
  },
  
  events: {
    accepted: 'cookieConsentAccepted',
    refused: 'cookieConsentRefused',
  },
  
  performance: {
    bundleSize: '~15KB (with Framer Motion)',
    initialDelay: '1000ms',
    animationDuration: '~300ms',
  },
}

// ═══════════════════════════════════════════════════════════════════════════
// TESTING COMMANDS
// ═══════════════════════════════════════════════════════════════════════════

const TESTING = {
  // Show banner again
  clearConsent: () => {
    localStorage.removeItem('cookieConsent')
    localStorage.removeItem('cookieConsentDate')
    location.reload()
  },
  
  // Check current status
  getStatus: () => {
    return {
      consent: localStorage.getItem('cookieConsent'),
      date: localStorage.getItem('cookieConsentDate'),
    }
  },
  
  // Manually accept
  accept: () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    window.dispatchEvent(new Event('cookieConsentAccepted'))
  },
  
  // Manually refuse
  refuse: () => {
    localStorage.setItem('cookieConsent', 'refused')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    window.dispatchEvent(new Event('cookieConsentRefused'))
  },
}

// Copy these commands to browser console for testing:
console.log('🍪 Cookie Consent Testing Commands:')
console.log('TESTING.clearConsent()  - Clear consent and reload')
console.log('TESTING.getStatus()     - Check current status')
console.log('TESTING.accept()        - Manually accept cookies')
console.log('TESTING.refuse()        - Manually refuse cookies')

// ═══════════════════════════════════════════════════════════════════════════
// GDPR COMPLIANCE NOTES
// ═══════════════════════════════════════════════════════════════════════════

const GDPR_COMPLIANCE = {
  requirement: 'EU General Data Protection Regulation (GDPR)',
  
  checklist: {
    '✅ Explicit consent': 'User must actively click Accept',
    '✅ Opt-out option': 'Refuse button clearly visible',
    '✅ No pre-ticked boxes': 'No default selection',
    '✅ Clear information': 'Explains cookie purpose',
    '✅ Privacy policy link': 'Direct link provided',
    '✅ No forced consent': 'Can refuse and still use site',
    '✅ Easy to understand': 'French language, simple text',
    '✅ Accessible': 'WCAG 2.1 AA compliant',
    '✅ Persistent choice': 'Remembered across sessions',
    '✅ Revocable': 'Can clear and choose again',
    '✅ No tracking before consent': 'Scripts load after acceptance',
  },
  
  recommendations: {
    'Update privacy policy': 'List all cookies with purposes',
    'Cookie settings page': 'Allow users to manage consent',
    'Audit regularly': 'Review compliance every 6 months',
    'Keep records': 'Log consent for legal purposes',
  },
}

export { COLORS, ACCESSIBILITY, ANIMATIONS, BREAKPOINTS, TECH_SPECS, TESTING, GDPR_COMPLIANCE }
