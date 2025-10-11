// Types for Navigation
export interface NavigationDropdownItem {
  label: string
  link: string
  description?: string
  _key?: string
}

export interface NavigationMenuItem {
  label: string
  link: string
  hasDropdown?: boolean
  dropdownItems?: NavigationDropdownItem[]
  order: number
  _key?: string
}

export interface NavigationContent {
  _id: string
  _type: 'navigation'
  title: string
  logo: {
    text: string
    image?: {
      asset: {
        _id: string
        url: string
      }
    }
  }
  menuItems: NavigationMenuItem[]
  ctaButton: {
    text: string
    link: string
    style: 'black' | 'blue' | 'orange'
    openModal: boolean
  }
  isActive: boolean
}

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
  headline: any[] // Portable Text
  subheadline: any[] // Portable Text
  urgencyBadge?: string
  studentsCount?: string
  studentsCountText?: string
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

// GROQ query to fetch active navigation
export const NAVIGATION_QUERY = `
  *[_type == "navigation" && isActive == true][0] {
    _id,
    _type,
    title,
    logo {
      text,
      image {
        asset-> {
          _id,
          url
        }
      }
    },
    menuItems[] | order(order asc) {
      _key,
      label,
      link,
      hasDropdown,
      dropdownItems[] {
        _key,
        label,
        link,
        description
      },
      order
    },
    ctaButton {
      text,
      link,
      style,
      openModal
    },
    isActive
  }
`

// GROQ query to fetch active hero content
export const HERO_QUERY = `
  *[_type == "hero" && isActive == true][0] {
    _id,
    _type,
    headline,
    subheadline,
    urgencyBadge,
    studentsCount,
    studentsCountText,
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
