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

// ========================================
// BLOG TYPES & QUERIES
// ========================================

export interface BlogAuthor {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  bio?: any[] // Portable Text
  role?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    email?: string
  }
}

export interface BlogPost {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      _id: string
      url: string
    }
    alt: string
    caption?: string
  }
  excerpt: string
  content: any[] // Portable Text
  author: BlogAuthor
  category: string
  tags?: string[]
  publishedAt: string
  estimatedReadingTime?: number
  featured?: boolean
  relatedPosts?: BlogPost[]
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      _id: string
      url: string
    }
    alt: string
  }
  excerpt: string
  author: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
  category: string
  publishedAt: string
  estimatedReadingTime?: number
  featured?: boolean
}

// Query pour récupérer tous les articles (avec pagination)
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc, featured desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    "author": author-> {
      name,
      image {
        asset-> {
          url
        }
      }
    },
    category,
    publishedAt,
    estimatedReadingTime,
    featured
  }
`

// Query pour compter le total d'articles
export const BLOG_POSTS_COUNT_QUERY = `
  count(*[_type == "blogPost"])
`

// Query pour récupérer les articles par catégorie
export const BLOG_POSTS_BY_CATEGORY_QUERY = `
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    "author": author-> {
      name,
      image {
        asset-> {
          url
        }
      }
    },
    category,
    publishedAt,
    estimatedReadingTime,
    featured
  }
`

// Query pour récupérer un article complet par slug
export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt,
      caption
    },
    excerpt,
    content,
    "author": author-> {
      _id,
      name,
      slug,
      image {
        asset-> {
          _id,
          url
        }
      },
      bio,
      role,
      socialLinks
    },
    category,
    tags,
    publishedAt,
    estimatedReadingTime,
    featured,
    "relatedPosts": relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      mainImage {
        asset-> {
          url
        },
        alt
      },
      excerpt,
      category,
      publishedAt
    },
    seoTitle,
    seoDescription,
    seoKeywords
  }
`

// Query pour récupérer les articles mis en avant (featured)
export const BLOG_FEATURED_POSTS_QUERY = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    excerpt,
    "author": author-> {
      name
    },
    category,
    publishedAt
  }
`

// Query pour récupérer les articles récents
export const BLOG_RECENT_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    excerpt,
    category,
    publishedAt
  }
`

// Query pour recherche d'articles
export const BLOG_SEARCH_QUERY = `
  *[_type == "blogPost" && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    $searchTerm in tags[]
  )] | order(publishedAt desc) [0...20] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset-> {
        url
      },
      alt
    },
    excerpt,
    "author": author-> {
      name
    },
    category,
    publishedAt,
    tags
  }
`

// Query pour récupérer toutes les catégories utilisées
export const BLOG_CATEGORIES_QUERY = `
  array::unique(*[_type == "blogPost"].category)
`

// Query pour récupérer tous les slugs (pour generateStaticParams)
export const BLOG_SLUGS_QUERY = `
  *[_type == "blogPost"].slug.current
`
