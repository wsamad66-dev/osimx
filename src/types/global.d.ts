// Global type declarations

interface Window {
  gtag?: (
    command: 'config' | 'event' | 'consent' | 'js',
    targetId: string | Date,
    config?: Record<string, any>
  ) => void
  dataLayer?: any[]
  fbq?: (
    command: 'init' | 'track' | 'trackCustom',
    eventName: string,
    data?: Record<string, any>
  ) => void
  _fbq?: any
}

declare global {
  interface WindowEventMap {
    cookieConsentAccepted: Event
    cookieConsentRefused: Event
  }
}

export {}
