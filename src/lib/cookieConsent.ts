/**
 * Cookie Consent Utilities
 * Helper functions for managing GDPR cookie consent
 */

export type ConsentStatus = 'accepted' | 'refused' | null

/**
 * Get the current cookie consent status
 */
export function getCookieConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null
  
  const consent = localStorage.getItem('cookieConsent')
  
  if (consent === 'accepted' || consent === 'refused') {
    return consent as ConsentStatus
  }
  
  return null
}

/**
 * Check if user has accepted cookies
 */
export function hasAcceptedCookies(): boolean {
  return getCookieConsent() === 'accepted'
}

/**
 * Check if user has refused cookies
 */
export function hasRefusedCookies(): boolean {
  return getCookieConsent() === 'refused'
}

/**
 * Get the date when consent was given
 */
export function getConsentDate(): Date | null {
  if (typeof window === 'undefined') return null
  
  const dateStr = localStorage.getItem('cookieConsentDate')
  
  if (dateStr) {
    return new Date(dateStr)
  }
  
  return null
}

/**
 * Clear cookie consent (useful for testing or user preference changes)
 */
export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('cookieConsent')
  localStorage.removeItem('cookieConsentDate')
}

/**
 * Check if consent is older than specified days (for re-prompting)
 */
export function isConsentExpired(days: number = 365): boolean {
  const consentDate = getConsentDate()
  
  if (!consentDate) return true
  
  const daysSinceConsent = Math.floor(
    (Date.now() - consentDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  return daysSinceConsent > days
}

/**
 * Set cookie consent programmatically
 */
export function setCookieConsent(status: 'accepted' | 'refused'): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('cookieConsent', status)
  localStorage.setItem('cookieConsentDate', new Date().toISOString())
  
  // Dispatch event
  const eventName = status === 'accepted' ? 'cookieConsentAccepted' : 'cookieConsentRefused'
  window.dispatchEvent(new Event(eventName))
}
