// lib/sanity/client.ts
import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Check if Sanity is configured
const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const isSanityConfigured = Boolean(
  SANITY_PROJECT_ID && 
  SANITY_PROJECT_ID !== 'your-project-id' && 
  SANITY_PROJECT_ID !== 'your_project_id_here'
)

// Sanity Configuration (only create client if configured)
export const client: SanityClient | null = isSanityConfigured ? createClient({
  projectId: SANITY_PROJECT_ID!,
  dataset: SANITY_DATASET,
  useCdn: true, // Use CDN for faster response
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Only needed for write operations
}) : null

// Image URL Builder (only if client exists)
const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) {
    return { url: () => '' }
  }
  return builder.image(source)
}

// GROQ Queries
export const testimonialsQuery = `
  *[_type == "testimonial" && published == true] | order(orderRank asc, _createdAt desc) {
    _id,
    studentName,
    "studentImage": studentImage.asset->url,
    originCountry,
    destinationCountry,
    originFlag,
    destinationFlag,
    programName,
    degree,
    graduationYear,
    testimonialText,
    rating,
    "voiceUrl": voiceTestimonial.asset->url,
    sentiment,
    featured
  }
`

// Fetch testimonials
export async function getTestimonials() {
  // If Sanity is not configured, return empty array to use mock data
  if (!isSanityConfigured || !client) {
    if (process.env.NODE_ENV === 'development') {
      console.info('ℹ️ Sanity CMS not configured. Using mock testimonials. See TESTIMONIALS_SETUP.md to connect.')
    }
    return []
  }

  try {
    const testimonials = await client.fetch(testimonialsQuery)
    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials from Sanity:', error)
    return []
  }
}

// TypeScript Interface
export interface Testimonial {
  _id: string
  studentName: string
  studentImage: string
  originCountry: string
  destinationCountry: string
  originFlag: string
  destinationFlag: string
  programName: string
  degree: string
  graduationYear: number
  testimonialText: string
  rating: number
  voiceUrl?: string
  sentiment: 'excited' | 'grateful' | 'confident' | 'happy'
  featured?: boolean
}
