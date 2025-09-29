'use client'

import { HeroSection } from '@/components/sections/HeroSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ResourcesSection } from '@/components/sections/ResourcesSection'
import { StatsSection } from '@/components/sections/StatsSection'

export default function HomePage() {
  return (
    <div className="pt-20">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <AboutSection />
      <ResourcesSection />
    </div>
  )
}