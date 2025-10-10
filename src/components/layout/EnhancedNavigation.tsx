'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sparkles, ChevronDown } from 'lucide-react'
import { QuickRegistrationModal } from '@/components/registration/QuickRegistrationModal'
import type { NavigationContent } from '@/lib/sanity-queries'

interface EnhancedNavigationProps {
  navigationData?: NavigationContent
}

// Fallback data
const defaultNavData: NavigationContent = {
  _id: 'default',
  _type: 'navigation',
  title: 'Default Navigation',
  logo: {
    text: "L'Étudiant à l'Étranger",
  },
  menuItems: [
    { label: 'Accueil', link: '/', order: 1, _key: '1' },
    {
      label: 'Services',
      link: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Admission', link: '/services/admission', _key: 's1' },
        { label: 'Visa', link: '/services/visa', _key: 's2' },
        { label: 'Logement', link: '/services/logement', _key: 's3' },
      ],
      order: 2,
      _key: '2',
    },
    {
      label: 'Destinations',
      link: '/destinations',
      hasDropdown: true,
      dropdownItems: [
        { label: 'France', link: '/destinations/france', _key: 'd1' },
        { label: 'Canada', link: '/destinations/canada', _key: 'd2' },
        { label: 'Belgique', link: '/destinations/belgique', _key: 'd3' },
        { label: 'Allemagne', link: '/destinations/allemagne', _key: 'd4' },
        { label: 'Espagne', link: '/destinations/espagne', _key: 'd5' },
        { label: 'Chine', link: '/destinations/chine', _key: 'd6' },
      ],
      order: 3,
      _key: '3',
    },
  ],
  ctaButton: {
    text: 'Démarrer',
    link: '#',
    style: 'black',
    openModal: true,
  },
  isActive: true,
}

export function EnhancedNavigation({ navigationData }: EnhancedNavigationProps) {
  const navData = navigationData || defaultNavData
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const { scrollYProgress } = useScroll()

  // Smooth progress bar animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 lg:pl-8 lg:pr-28 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10 hover:opacity-90 transition-opacity">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z" fill="#1F2937"/>
                <path d="M15 15C15 12.2386 17.2386 10 20 10C22.7614 10 25 12.2386 25 15V20C25 22.7614 22.7614 25 20 25C17.2386 25 15 22.7614 15 20V15Z" fill="white"/>
              </svg>
              <span className="text-xl font-semibold text-gray-900">
                L'Étudiant à l'Étranger
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2 z-10">
              {navData.menuItems.map((link) => (
                <div
                  key={link._key}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                    if (link.hasDropdown) setOpenDropdown(link.label)
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
                  }}
                >
                  {link.hasDropdown ? (
                    <button
                      className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <Link
                      href={link.link}
                      className={`flex items-center gap-1 transition-colors duration-200 ${
                        link.label === 'Accueil'
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {link.hasDropdown && link.dropdownItems && openDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 mt-2 py-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
                      onMouseEnter={() => {
                        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                      }}
                      onMouseLeave={() => {
                        closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
                      }}
                    >
                      {link.dropdownItems.map((item) => (
                        <Link
                          key={item._key}
                          href={item.link}
                          className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => navData.ctaButton.openModal ? setIsModalOpen(true) : window.location.href = navData.ctaButton.link}
                className={`px-8 py-3 rounded-xl font-medium text-white transition-colors duration-200 ${
                  navData.ctaButton.style === 'blue'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : navData.ctaButton.style === 'orange'
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-black hover:bg-gray-900'
                }`}
              >
                {navData.ctaButton.text}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl transition-all duration-200 text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Enhanced Mobile Menu */}
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
              {/* Gradient header - Simplifié */}
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
                {navData.menuItems.map((link) => (
                  <div key={link._key}>
                    <Link
                      href={link.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group relative block py-4 px-5 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition-all duration-200 font-inter"
                    >
                      <span className="flex items-center justify-between">
                        {link.label}
                        <span className="text-gray-400 group-hover:text-blue-600">→</span>
                      </span>
                    </Link>

                    {/* Dropdown pour mobile */}
                    {link.hasDropdown && link.dropdownItems && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.dropdownItems.map((item) => (
                          <Link
                            key={item._key}
                            href={item.link}
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
                      if (navData.ctaButton.openModal) {
                        setIsModalOpen(true)
                      } else {
                        window.location.href = navData.ctaButton.link
                      }
                    }}
                    className={`w-full text-center px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      navData.ctaButton.style === 'blue'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : navData.ctaButton.style === 'orange'
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-black hover:bg-gray-900'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    {navData.ctaButton.text}
                  </button>
                </div>

                {/* Decorative bottom text */}
                <div className="pt-8 text-center">
                  <p className="text-sm text-gray-500 font-inter">
                    Transformez votre avenir avec nous ✨
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <QuickRegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
