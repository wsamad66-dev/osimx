# 🎯 Code Snippets - Optimisations Performance

## 📌 Quick Reference

### 1. Navigation avec Dropdown

```tsx
// Structure de données
const navLinks = [
  { href: '/', label: 'Accueil' },
  { 
    href: '/services', 
    label: 'Services',
    dropdown: [
      { href: '/services/admission', label: 'Admission' },
      { href: '/services/visa', label: 'Visa' },
      { href: '/services/logement', label: 'Logement' }
    ]
  },
  { href: '/destinations', label: 'Destinations' }
]

// État pour le dropdown ouvert
const [openDropdown, setOpenDropdown] = useState<string | null>(null)

// Rendu du lien avec dropdown
<div
  key={link.href}
  className="relative"
  onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
  onMouseLeave={() => setOpenDropdown(null)}
>
  <Link
    href={link.href}
    className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${
      isScrolled
        ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
        : 'text-white/95 hover:text-white hover:bg-white/10'
    }`}
  >
    {link.label}
    {link.dropdown && (
      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
        openDropdown === link.label ? 'rotate-180' : ''
      }`} />
    )}
  </Link>

  {/* Dropdown Menu */}
  {link.dropdown && openDropdown === link.label && (
    <div className="absolute top-full left-0 mt-1 py-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100">
      {link.dropdown.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )}
</div>
```

---

### 2. CTA Simplifié avec Animation CSS

```tsx
// CTA Button avec pulse-subtle
<button
  onClick={() => setIsModalOpen(true)}
  className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-poppins bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-pulse-subtle"
>
  <Sparkles className="w-4 h-4" />
  <span>Démarrer mon projet</span>
</button>
```

---

### 3. Badge d'Urgence

```tsx
// Badge avec scarcité et urgence
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 mb-6"
>
  <span className="text-lg">⏰</span>
  <span className="text-sm font-semibold">
    Promotion : 1ère consultation offerte (12 places)
  </span>
</motion.div>
```

---

### 4. Animation CSS Performante

```css
/* Animation pulse-subtle */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.02);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Accessibilité */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-subtle {
    animation: none !important;
  }
}
```

---

### 5. Floating CTA Optimisé

```tsx
// Mobile Version
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 50 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
>
  <button
    onClick={() => setIsModalOpen(true)}
    className="relative flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-200 animate-pulse-subtle"
    aria-label="S'inscrire maintenant"
  >
    <UserPlus className="w-5 h-5" />
    <span>S'inscrire maintenant</span>
    <span>✨</span>
  </button>

  {/* Dismiss button */}
  <button
    onClick={(e) => {
      e.preventDefault()
      setIsDismissed(true)
    }}
    className="absolute -top-2 -right-2 p-1.5 bg-gray-900 rounded-full text-white shadow-lg hover:bg-gray-800 transition-colors"
    aria-label="Fermer"
  >
    <X className="w-4 h-4" />
  </button>
</motion.div>

// Desktop Version
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 50 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="fixed bottom-8 right-8 z-50 hidden md:block"
>
  <div className="relative">
    <button
      onClick={() => setIsModalOpen(true)}
      className="relative flex items-center gap-3 px-6 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-200 hover:scale-105 animate-pulse-subtle"
      aria-label="S'inscrire maintenant"
    >
      <UserPlus className="w-5 h-5" />
      <span className="whitespace-nowrap">S'inscrire maintenant</span>
      <span>✨</span>
    </button>

    <button
      onClick={() => setIsDismissed(true)}
      className="absolute -top-2 -right-2 p-1.5 bg-gray-900 rounded-full text-white shadow-lg hover:bg-gray-800 transition-colors hover:scale-110"
      aria-label="Fermer"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
</motion.div>
```

---

### 6. Hero Section Optimisé

```tsx
export function HeroSection({ heroData }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#232d6e] via-[#26a5de] to-[#232d6e]">
      {/* Background statique simplifié */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-white">
            {/* Badge Urgence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 mb-6"
            >
              <span className="text-lg">⏰</span>
              <span className="text-sm font-semibold">
                Promotion : 1ère consultation offerte (12 places)
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              {heroData.headline}
            </motion.h1>

            {/* CTA Principal Unique */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-[#f29100] to-[#ff9933] hover:from-[#ff9933] hover:to-[#f29100] text-white font-bold px-10 py-7 rounded-xl shadow-2xl hover:shadow-[#f29100]/50 transition-all duration-200 hover:scale-105 group animate-pulse-subtle"
              >
                <span className="text-lg">🚀 Commencer mon projet gratuitement</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <QuickRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
```

---

### 7. Logo Simplifié

```tsx
// Logo sans animations lourdes
<Link href="/" className="flex items-center space-x-3 group relative z-10 hover:opacity-90 transition-opacity">
  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center">
    <Sparkles className="w-6 h-6 text-white" />
  </div>
  <span 
    className={`text-xl font-bold font-poppins transition-colors duration-300 ${
      isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
    }`}
  >
    L'Étudiant à l'Étranger
  </span>
</Link>
```

---

### 8. Mobile Menu Simplifié

```tsx
{/* Mobile Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-y-auto"
      >
        {/* Header simplifié */}
        <div className="relative h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500">
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-bold font-poppins text-lg">Menu</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-6 space-y-2">
          {navLinks.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative block py-4 px-5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 font-inter"
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  <span className="text-gray-400 group-hover:text-blue-600">→</span>
                </span>
              </Link>
              
              {/* Dropdown pour mobile */}
              {link.dropdown && (
                <div className="ml-4 mt-1 space-y-1">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full text-center px-6 py-4 rounded-xl font-bold font-poppins bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Démarrer mon projet
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
```

---

### 9. Transitions Optimisées

```tsx
// ✅ BON: Transitions courtes et performantes
className="transition-all duration-200 ease-out"
className="transition-colors duration-150"
className="transition-transform duration-200"

// ❌ ÉVITER: Transitions longues
className="transition-all duration-700"
className="transition-all duration-500"
```

---

### 10. Imports Nécessaires

```tsx
// Navigation
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

// Hero Section
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'

// Floating CTA
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, UserPlus } from 'lucide-react'
import { useCTAFloat } from '@/hooks/useCTAFloat'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'
```

---

## 🎨 Couleurs du Projet

```css
/* Palette principale */
--blue-primary: #26a5de;
--blue-dark: #232d6e;
--orange-primary: #f29100;
--orange-light: #ff9933;

/* Gradients */
bg-gradient-to-r from-orange-500 to-orange-600
bg-gradient-to-br from-[#232d6e] via-[#26a5de] to-[#232d6e]
bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500
```

---

## 🔍 TypeScript Types

```typescript
// Navigation Link
interface NavLink {
  href: string
  label: string
  dropdown?: {
    href: string
    label: string
  }[]
}

// Modal State
const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

// Dropdown State
const [openDropdown, setOpenDropdown] = useState<string | null>(null)
```

---

**Last Updated**: 9 octobre 2025  
**Usage**: Copy-paste ces snippets dans vos composants  
**Tested**: ✅ TypeScript + Next.js 15 + Tailwind CSS
