'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

import type { HomepageCTA } from '@/types/homepage'

interface CTABannerProps {
  cta?: HomepageCTA
}

const FALLBACK_CTA: HomepageCTA = {
  headline: 'Prêt à commencer votre parcours ?',
  description: "Réservez votre consultation gratuite avec un expert et découvrez comment nous transformons votre projet d'études en réussite concrète.",
  primaryCta: {
    label: 'Consultation gratuite',
    href: '/contact',
  },
  secondaryCta: {
    label: 'Découvrir nos services',
    href: '/services',
  },
  whatsappNumber: '+33756891234',
}

export function CTABanner({ cta = FALLBACK_CTA }: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-royal-blue py-24 sm:py-32">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal-blue via-vivid-blue to-purple-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnptMC00djJoLTJ2LTJoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />

      {/* Decorative circles */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-400/10 blur-3xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-6 text-center sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Headline */}
          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {cta.headline}
          </h2>

          {/* Subtitle */}
          <p className="max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
            {cta.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {/* Primary Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                href={cta.primaryCta.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-yellow-400 px-8 py-4 text-base font-bold text-royal-blue shadow-2xl shadow-gold/40 transition-all duration-300 hover:shadow-3xl hover:shadow-gold/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Phone className="h-5 w-5" />
                {cta.primaryCta.label}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Secondary Button */}
            {cta.secondaryCta && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Link
                  href={cta.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/80 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {cta.secondaryCta.label}
                </Link>
              </motion.div>
            )}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span>Réponse sous 24h</span>
            </div>
            <div className="h-4 w-px bg-white/20" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span>Sans engagement</span>
            </div>
            <div className="h-4 w-px bg-white/20" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
              <span>100% confidentiel</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
