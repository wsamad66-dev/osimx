'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import type { HomepagePartner } from '@/types/homepage'

const FALLBACK_PARTNERS: HomepagePartner[] = [
  {
    id: 1,
    name: 'Campus France',
    url: 'https://www.campusfrance.org',
    logoUrl: '/images/partners/partner1.png',
    logoAlt: 'Campus France',
  },
  {
    id: 2,
    name: 'UNESCO',
    url: 'https://www.unesco.org',
    logoUrl: '/images/partners/partner2.png',
    logoAlt: 'UNESCO',
  },
  {
    id: 3,
    name: 'European Commission',
    url: 'https://ec.europa.eu',
    logoUrl: '/images/partners/partner3.png',
    logoAlt: 'European Commission',
  },
  {
    id: 4,
    name: 'British Council',
    url: 'https://www.britishcouncil.org',
    logoUrl: '/images/partners/partner4.png',
    logoAlt: 'British Council',
  },
  {
    id: 5,
    name: 'DAAD Germany',
    url: 'https://www.daad.de',
    logoUrl: '/images/partners/partner5.png',
    logoAlt: 'DAAD Germany',
  },
  {
    id: 6,
    name: 'Study in Canada',
    url: 'https://www.educanada.ca',
    logoUrl: '/images/partners/partner6.png',
    logoAlt: 'Study in Canada',
  },
]

interface PartnersProps {
  partners?: HomepagePartner[]
}

export function Partners({ partners = FALLBACK_PARTNERS }: PartnersProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    // Duplicate logos for seamless infinite scroll
    const scrollerInner = scroller.querySelector('[data-scroller-inner]')
    if (!scrollerInner) return

    const scrollerContent = Array.from(scrollerInner.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement
      duplicatedItem.setAttribute('aria-hidden', 'true')
      scrollerInner.appendChild(duplicatedItem)
    })

    // Infinite scroll animation
    let animationId: number
    let currentPosition = 0
    const speed = 0.5 // pixels per frame

    const animate = () => {
      currentPosition -= speed
      const halfWidth = scrollerInner.scrollWidth / 2

      if (Math.abs(currentPosition) >= halfWidth) {
        currentPosition = 0
      }

      scrollerInner.setAttribute(
        'style',
        `transform: translateX(${currentPosition}px)`
      )

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [partners])

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center rounded-full bg-blue-600/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Nos Partenaires
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nos partenaires de confiance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Nous collaborons avec les meilleures universités et institutions dans le monde
          </p>
        </motion.div>

        {/* Infinite Scroll Logo Carousel */}
        <div
          ref={scrollerRef}
          className="group relative overflow-hidden"
          onMouseEnter={() => {
            const scroller = scrollerRef.current?.querySelector('[data-scroller-inner]') as HTMLElement
            if (scroller) scroller.style.animationPlayState = 'paused'
          }}
          onMouseLeave={() => {
            const scroller = scrollerRef.current?.querySelector('[data-scroller-inner]') as HTMLElement
            if (scroller) scroller.style.animationPlayState = 'running'
          }}
        >
          {/* Fade gradients on edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />

          {/* Scrolling container */}
          <div
            data-scroller-inner
            className="flex items-center gap-12 will-change-transform lg:gap-16"
          >
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="group/logo flex h-24 w-40 flex-shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 lg:w-48"
              >
                {partner.logoUrl ? (
                  <a
                    href={partner.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-full w-full items-center justify-center p-4"
                    aria-label={`Visiter ${partner.name}`}
                  >
                    <Image
                      src={partner.logoUrl}
                      alt={partner.logoAlt ?? partner.name}
                      width={180}
                      height={80}
                      className="h-auto w-full max-w-full object-contain opacity-70 transition-opacity duration-300 group-hover/logo:opacity-100"
                    />
                  </a>
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                    <span className="text-center text-sm font-semibold text-gray-500">
                      {partner.name}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partner count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm font-medium text-gray-600">
            <span className="font-bold text-vivid-blue">{partners.length}+ partenaires</span>{' '}
            accrédités internationalement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
