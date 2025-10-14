'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
        { label: 'Admission', link: '/services', _key: 's1' },
        { label: 'Visa', link: '/services', _key: 's2' },
        { label: 'Logement', link: '/services', _key: 's3' },
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
      {/* Advanced Scroll Progress Bar with Multiple Effects */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[100]"
        style={{ scaleX }}
      >
        {/* Main gradient bar with animated glow */}
        <motion.div
          className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 relative"
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 30px rgba(147, 51, 234, 0.5)',
              '0 0 20px rgba(249, 115, 22, 0.5)',
              '0 0 30px rgba(59, 130, 246, 0.5)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Moving shine effect */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Sparkle particles */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-3/4 w-1 h-1 bg-white rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Static Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 lg:pl-8 lg:pr-28 relative">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group relative z-10 hover:opacity-90 transition-opacity">
              {navData.logo?.image?.asset?.url ? (
                /* Logo image depuis Sanity */
                <Image
                  src={navData.logo.image.asset.url}
                  alt={navData.logo.text || "Logo"}
                  width={400}
                  height={120}
                  className="h-16 w-auto object-contain"
                  priority
                />
              ) : (
                /* Fallback SVG si pas d'image */
                <>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z" fill="#1F2937"/>
                    <path d="M15 15C15 12.2386 17.2386 10 20 10C22.7614 10 25 12.2386 25 15V20C25 22.7614 22.7614 25 20 25C17.2386 25 15 22.7614 15 20V15Z" fill="white"/>
                  </svg>
                  <span className="text-xl font-semibold text-gray-900">
                    {navData.logo?.text || "L'Étudiant à l'Étranger"}
                  </span>
                </>
              )}
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2 z-10">
              {navData.menuItems.map((link) => (
                <div
                  key={link._key}
                  className="relative group"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                    if (link.hasDropdown) setOpenDropdown(link.label)
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
                  }}
                >
                  {link.hasDropdown ? (
                    <motion.button
                      className="flex items-center gap-1 text-gray-500 transition-colors duration-200 relative"
                      whileHover={{ 
                        scale: 1.05,
                        color: '#111827'
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                      <motion.div
                        animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                      
                      {/* Animated underline for dropdown button */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                  ) : (
                    <Link
                      href={link.link}
                      className={`relative block ${
                        link.label === 'Accueil'
                          ? 'text-gray-900 font-semibold'
                          : 'text-gray-500'
                      }`}
                    >
                      <motion.span
                        className="inline-block"
                        whileHover={{ 
                          scale: 1.05,
                          color: '#111827'
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.span>
                      
                      {/* Animated underline */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: '100%', opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                      
                      {/* Shimmer effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-0 group-hover:opacity-100"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        style={{ pointerEvents: 'none' }}
                      />
                    </Link>
                  )}

                  {/* Dropdown Menu - Cascade Animation + Animated Border */}
                  {link.hasDropdown && link.dropdownItems && openDropdown === link.label && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      onMouseEnter={() => {
                        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
                      }}
                      onMouseLeave={() => {
                        closeTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200)
                      }}
                    >
                      {/* Animated Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #f97316, #3b82f6)',
                          backgroundSize: '300% 100%',
                          padding: '2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude',
                        }}
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      
                      {/* Dropdown Content with Cascade */}
                      <div className="relative bg-white rounded-xl py-2">
                        {link.dropdownItems.map((item, index) => (
                          <motion.div
                            key={item._key}
                            initial={{ 
                              opacity: 0, 
                              x: -30,
                              y: -10,
                              scale: 0.9
                            }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              y: 0,
                              scale: 1
                            }}
                            transition={{ 
                              delay: index * 0.08,
                              duration: 0.3,
                              ease: 'easeOut'
                            }}
                          >
                            <Link
                              href={item.link}
                              className="block px-4 py-3 text-gray-700 hover:text-blue-600 transition-all duration-150 text-sm relative group overflow-hidden"
                            >
                              {/* Animated shine on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                              />
                              
                              <motion.span
                                className="relative z-10 flex items-center gap-2"
                                whileHover={{ x: 6 }}
                                transition={{ duration: 0.2 }}
                              >
                                <motion.span
                                  className="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100"
                                  initial={{ scale: 0 }}
                                  whileHover={{ scale: 1 }}
                                  transition={{ duration: 0.2 }}
                                />
                                {item.label}
                              </motion.span>
                              
                              {/* Gradient background on hover */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 opacity-0"
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button - Enhanced with Shimmer + Gradient Overlay */}
            <div className="hidden lg:flex items-center">
              <motion.button
                onClick={() => navData.ctaButton.openModal ? setIsModalOpen(true) : window.location.href = navData.ctaButton.link}
                className={`relative px-8 py-3 rounded-xl font-medium text-white overflow-hidden group ${
                  navData.ctaButton.style === 'blue'
                    ? 'bg-blue-600'
                    : navData.ctaButton.style === 'orange'
                    ? 'bg-orange-500'
                    : 'bg-black'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Base gradient overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: navData.ctaButton.style === 'blue'
                      ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))'
                      : navData.ctaButton.style === 'orange'
                      ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.8), rgba(236, 72, 153, 0.8), rgba(249, 115, 22, 0.8))'
                      : 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(55, 65, 81, 0.8), rgba(0, 0, 0, 0.8))',
                    backgroundSize: '200% 200%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  }}
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow: navData.ctaButton.style === 'blue'
                      ? '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)'
                      : navData.ctaButton.style === 'orange'
                      ? '0 0 20px rgba(249, 115, 22, 0.6), 0 0 40px rgba(236, 72, 153, 0.4)'
                      : '0 0 20px rgba(0, 0, 0, 0.6), 0 0 40px rgba(55, 65, 81, 0.4)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Pulsing border */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    border: '2px solid',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  }}
                  animate={{
                    borderColor: [
                      'rgba(255, 255, 255, 0.3)',
                      'rgba(255, 255, 255, 0.8)',
                      'rgba(255, 255, 255, 0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  {navData.ctaButton.text}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
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

      {/* Creative Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Animated Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-orange-900/80 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Animated floating particles */}
              <motion.div
                className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-40 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"
                animate={{
                  y: [0, 20, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* Menu Panel with Advanced Animations */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                opacity: { duration: 0.2 }
              }}
              className="fixed top-0 right-0 bottom-0 w-[90%] max-w-sm bg-white z-50 lg:hidden shadow-2xl overflow-hidden"
            >
              {/* Animated Gradient Header */}
              <div className="relative h-40 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  style={{ backgroundSize: '200% 200%' }}
                />
                
                {/* Floating circles in header */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    x: [0, -20, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <Sparkles className="w-10 h-10 text-white mb-3" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-bold text-xl"
                  >
                    Navigation
                  </motion.p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60px' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="h-1 bg-white/40 rounded-full mt-2"
                  />
                </div>
              </div>

              {/* Scrollable Navigation Content */}
              <div className="overflow-y-auto h-[calc(100vh-160px)] custom-scrollbar">
                <div className="p-6 space-y-3">
                  {navData.menuItems.map((link, index) => (
                    <motion.div
                      key={link._key}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
                    >
                      <Link
                        href={link.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group relative block"
                      >
                        <motion.div
                          className="relative py-4 px-5 rounded-2xl overflow-hidden"
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Gradient background on hover */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-orange-50 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Animated border */}
                          <motion.div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                            style={{
                              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #f97316, #3b82f6)',
                              backgroundSize: '300% 100%',
                              padding: '2px',
                              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude',
                            }}
                            animate={{
                              backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          
                          <span className="relative flex items-center justify-between text-gray-700 group-hover:text-blue-600 font-medium transition-colors">
                            <span className="flex items-center gap-3">
                              <motion.span
                                className="w-2 h-2 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100"
                                animate={{ scale: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              {link.label}
                            </span>
                            <motion.span 
                              className="text-gray-400 group-hover:text-blue-600"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </span>
                        </motion.div>
                      </Link>

                      {/* Animated Dropdown for mobile */}
                      {link.hasDropdown && link.dropdownItems && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ delay: 0.1 * index + 0.2 }}
                          className="ml-4 mt-2 space-y-1 overflow-hidden"
                        >
                          {link.dropdownItems.map((item, subIndex) => (
                            <motion.div
                              key={item._key}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index + 0.3 + 0.05 * subIndex }}
                            >
                              <Link
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-4 text-sm text-gray-600 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200"
                              >
                                <span className="flex items-center gap-2">
                                  <span className="w-1 h-1 bg-blue-400 rounded-full" />
                                  {item.label}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Animated CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navData.menuItems.length + 0.2 }}
                    className="pt-6"
                  >
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        if (navData.ctaButton.openModal) {
                          setIsModalOpen(true)
                        } else {
                          window.location.href = navData.ctaButton.link
                        }
                      }}
                      className="relative w-full px-6 py-5 rounded-2xl font-bold text-white shadow-xl overflow-hidden"
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Animated gradient background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                      
                      {/* Shimmer overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      
                      <span className="relative flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        {navData.ctaButton.text}
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Decorative footer text with animation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-8 pb-4 text-center"
                  >
                    <p className="text-sm text-gray-500 font-inter">
                      Transformez votre avenir avec nous ✨
                    </p>
                  </motion.div>
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
