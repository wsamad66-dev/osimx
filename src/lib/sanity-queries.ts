// Types for Sanity Hero Content

export interface HeroBenefit {
  icon: string
  title: string
  description: string
  _key?: string
}

export interface HeroContent {
  _id: string
  _type: 'hero'
  headline: string
  subheadline: string
  primaryCtaText: string
  secondaryCtaText?: string
  benefits: HeroBenefit[]
  heroImage?: {
    asset: {
      _id: string
      url: string
    }
    hotspot?: {
      x: number
      y: number
    }
  }
  isActive: boolean
}

// GROQ query to fetch active hero content
export const HERO_QUERY = `
  *[_type == "hero" && isActive == true][0] {
    _id,
    _type,
    headline,
    subheadline,
    primaryCtaText,
    secondaryCtaText,
    benefits[] {
      _key,
      icon,
      title,
      description
    },
    heroImage {
      asset-> {
        _id,
        url
      },
      hotspot
    },
    isActive
  }
`
