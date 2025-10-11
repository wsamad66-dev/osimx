// Homepage types

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
  id: number
  name: string
  url: string
  logoUrl: string
  logoAlt: string
}

export interface HomepageTestimonial {
  id: number
  studentName: string
  quote: string
  rating: number
  country: string
  destination: string
  program: string
  year: number
  avatarUrl: string
}
