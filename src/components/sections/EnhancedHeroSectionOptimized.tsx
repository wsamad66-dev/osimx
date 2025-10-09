'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, CheckCircle, Users, Globe, Sparkles, Award, Target } from 'lucide-react'
import Link from 'next/link'

// Lazy load framer-motion animations
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false })
const MotionSpan = dynamic(() => import('framer-motion').then(mod => mod.motion.span), { ssr: false })

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function EnhancedHeroSectionOptimized() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#1e40af] to-[#7c3aed]">
      {/* Simplified Background - static gradients for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-20 -left-20 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-primary-400/30 to-transparent rounded-full blur-3xl opacity-40"
        />
        <div 
          className="absolute -bottom-20 -right-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-gradient-to-tl from-amber-500/30 to-transparent rounded-full blur-3xl opacity-40"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-amber-200 font-semibold text-sm">
                #1 Agence d'accompagnement étudiants africains
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="text-white">
                Transformez votre{' '}
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                  avenir
                </span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-amber-400/30 blur-sm -z-10" />
              </span>
              <span className="text-white">
                {' '}avec des études à l'étranger
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Accompagnement complet et personnalisé pour étudiants africains.
              <span className="text-white font-semibold"> De l'admission au visa</span>,
              nous transformons votre rêve en réalité.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6">
              {[
                { icon: CheckCircle, text: '95% de réussite', color: 'text-green-400' },
                { icon: Users, text: '3500+ étudiants', color: 'text-blue-400' },
                { icon: Globe, text: '25+ pays', color: 'text-amber-400' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-sm text-white font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold transition-all duration-300 shadow-lg shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/60 hover:scale-105"
              >
                <span className="relative flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Démarrer mon projet
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm hover:scale-105"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>

          {/* Right Column - Stats Cards */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { 
                  icon: Award, 
                  value: '95%', 
                  label: 'Taux de réussite',
                  color: 'from-green-500 to-green-700'
                },
                { 
                  icon: Users, 
                  value: '3500+', 
                  label: 'Étudiants aidés',
                  color: 'from-blue-500 to-blue-700'
                },
                { 
                  icon: Target, 
                  value: '200+', 
                  label: 'Universités',
                  color: 'from-amber-500 to-amber-700'
                },
                { 
                  icon: Globe, 
                  value: '25+', 
                  label: 'Pays partenaires',
                  color: 'from-orange-500 to-orange-700'
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2"
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <stat.icon className="w-8 h-8 text-white/60 group-hover:text-white transition-colors mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Simple CSS animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:block opacity-0 animate-fade-in [animation-delay:2s]">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2 animate-bounce-slow">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
    </section>
  )
}
