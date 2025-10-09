'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/services', label: 'Services' },
  { href: '/resources', label: 'Ressources' },
  { href: '/testimonials', label: 'Témoignages' },
  { href: '/contact', label: 'Contact' },
]

export function EnhancedNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth progress bar animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-gray-200/50'
            : 'bg-gradient-to-b from-black/30 via-black/10 to-transparent backdrop-blur-sm'
        }`}
      >
        {/* Animated gradient orb on scroll */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-3xl" />
          </motion.div>
        )}

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Enhanced with animation */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10">
              <motion.div 
                className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 2 }}
                />
                <Sparkles className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <motion.span 
                className={`text-xl font-bold font-poppins transition-all duration-500 ${
                  isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                L'Étudiant à l'Étranger
              </motion.span>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-1 relative z-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 font-inter group ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white/95 hover:text-white'
                    }`}
                  >
                    {/* Background glow on hover */}
                    <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      isScrolled 
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
                        : 'bg-white/10 backdrop-blur-sm'
                    }`} />
                    
                    {/* Text */}
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Animated underline */}
                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 w-0 group-hover:w-4/5 transition-all duration-300`} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA Button - Enhanced */}
            <motion.div 
              className="hidden lg:block relative z-10"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold font-poppins overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
                />
                
                {/* Pulse rings */}
                <motion.span
                  className="absolute inset-0 rounded-xl border-2 border-orange-400"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                
                <Sparkles className="w-4 h-4 text-white relative z-10" />
                <span className="text-white relative z-10">Démarrer</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 relative z-10 ${
                isScrolled
                  ? 'text-gray-900 hover:bg-blue-500/10'
                  : 'text-white hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.95 }}
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
            </motion.button>
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
              {/* Gradient header */}
              <div className="relative h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-600/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white font-bold font-poppins text-lg">Menu</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group relative block py-4 px-5 rounded-xl text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 font-inter overflow-hidden"
                    >
                      {/* Hover background */}
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                      
                      {/* Border accent */}
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-600 to-purple-600 group-hover:h-full transition-all duration-300 rounded-full" />
                      
                      <span className="relative z-10 flex items-center justify-between">
                        {link.label}
                        <motion.span
                          className="text-gray-400 group-hover:text-blue-600"
                          initial={{ x: -10, opacity: 0 }}
                          whileHover={{ x: 0, opacity: 1 }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group relative block w-full text-center px-6 py-4 rounded-xl font-bold font-poppins overflow-hidden shadow-lg"
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600" />
                    
                    {/* Animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    <span className="relative z-10 text-white flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Démarrer mon projet
                    </span>
                  </Link>
                </motion.div>

                {/* Decorative bottom text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-8 text-center"
                >
                  <p className="text-sm text-gray-500 font-inter">
                    Transformez votre avenir avec nous ✨
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
