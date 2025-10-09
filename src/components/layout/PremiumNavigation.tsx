'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Ressources' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/contact', label: 'Contact' },
]

export function PremiumNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">É</span>
            </div>
            <span className={`text-xl font-bold font-poppins transition-colors duration-300 ${
              isScrolled ? 'text-brand-navy' : 'text-white'
            }`}>
              L'Étudiant à l'Étranger
            </span>
          </Link>

          {/* Nav Links - Center (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 font-inter group ${
                  isScrolled
                    ? 'text-gray-700 hover:text-brand-primary hover:bg-brand-primary/10'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-primary/0 to-brand-orange/0 group-hover:from-brand-primary/10 group-hover:to-brand-orange/10 transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* CTA Button - Right (Desktop) */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group relative inline-flex items-center px-6 py-3 rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange-dark transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative font-poppins">Démarrer</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled
                ? 'text-brand-navy hover:bg-brand-primary/10'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:hidden overflow-hidden"
            >
              <div className={`py-6 space-y-2 ${isScrolled ? '' : 'bg-white/95 backdrop-blur-xl rounded-2xl mt-4'}`}>
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 rounded-xl text-brand-navy hover:text-brand-primary hover:bg-brand-primary/10 font-medium transition-all duration-300 font-inter"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-4 rounded-xl bg-brand-orange text-white font-bold hover:bg-brand-orange-dark transition-all duration-300 shadow-lg font-poppins"
                  >
                    Démarrer mon projet
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
