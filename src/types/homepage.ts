// Homepage-related TypeScript type definitions

export interface HomepageCTA {
  headline: string
  description: string
  primaryCta: {
    label: string
    href: string
  }
  secondaryCta?: {
    label: string
    href: string
  }
  whatsappNumber?: string
}

export interface HomepagePartner {
  name: string
  logo: string
  url?: string
}
