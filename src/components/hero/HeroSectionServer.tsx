import { client } from '../../../lib/sanity.client'
import { HERO_QUERY, type HeroContent } from '@/lib/sanity-queries'
import { HeroSection } from './HeroSection'

export async function HeroSectionServer() {
  // Fetch hero content from Sanity
  const heroData = await client.fetch<HeroContent>(HERO_QUERY, {}, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })

  // Fallback if no hero content found
  if (!heroData) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232d6e] to-[#26a5de]">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">Hero Content Not Found</h1>
          <p className="text-white/80">Please create hero content in Sanity Studio.</p>
          <a 
            href="/studio" 
            className="inline-block mt-6 px-6 py-3 bg-white text-[#232d6e] rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Go to Studio
          </a>
        </div>
      </section>
    )
  }

  return <HeroSection heroData={heroData} />
}
