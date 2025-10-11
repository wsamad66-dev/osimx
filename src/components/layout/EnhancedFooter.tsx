'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp,
  Send,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { CONTACT } from '@/config/contact'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const quickLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Ressources', href: '/resources' },
  { label: 'Témoignages', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
]

const destinations = [
  { label: 'France 🇫🇷', href: '/destinations/france' },
  { label: 'Canada 🇨🇦', href: '/destinations/canada' },
  { label: 'Belgique 🇧🇪', href: '/destinations/belgique' },
  { label: 'Italie 🇮🇹', href: '/destinations/italie' },
  { label: 'Chine 🇨🇳', href: '/destinations/chine' },
]

const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
  { label: 'Conditions d\'utilisation', href: '/conditions-utilisation' },
]

const socialLinks = [
  { icon: Facebook, href: CONTACT.social.facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Instagram, href: CONTACT.social.instagram, label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: Linkedin, href: CONTACT.social.linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: Twitter, href: CONTACT.social.twitter, label: 'Twitter', color: 'hover:bg-sky-500' },
]

export function EnhancedFooter() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)
  
  const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubscribing(false)
    setSubscribeSuccess(true)
    setEmail('')
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubscribeSuccess(false), 3000)
  }

  return (
    <footer ref={ref as React.RefObject<HTMLElement>} className="relative bg-gradient-to-b from-gray-900 via-[#1a2347] to-black border-t border-white/5 overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-orange-600/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Logo & Description (spans 4 cols) */}
          <motion.div 
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white font-poppins group-hover:text-blue-400 transition-colors">
                  L'Étudiant à l'Étranger
                </h3>
              </div>
            </Link>
            <p className="text-gray-400 text-sm font-inter leading-relaxed">
              Votre partenaire de confiance pour réaliser vos rêves d'études à l'étranger. 
              Accompagnement personnalisé et support complet depuis 2018.
            </p>
            
            {/* Social Icons - Enhanced */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-white transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    {/* Glow effect */}
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Pulse ring */}
                    <motion.span
                      className="absolute inset-0 rounded-xl border-2 border-white/50"
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ scale: 1.2, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    <social.icon className="h-5 w-5 relative z-10" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Newsletter */}
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h4 className="text-white font-bold font-poppins mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Newsletter
              </h4>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre email"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all duration-300 font-inter text-sm"
                    disabled={isSubscribing || subscribeSuccess}
                  />
                  {/* Glow on focus */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubscribing || subscribeSuccess}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold font-inter text-sm flex items-center justify-center gap-2 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  whileHover={{ scale: subscribeSuccess ? 1 : 1.02 }}
                  whileTap={{ scale: subscribeSuccess ? 1 : 0.98 }}
                >
                  {isSubscribing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.div>
                      Inscription...
                    </>
                  ) : subscribeSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Inscrit avec succès !
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      S'abonner
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Column 2: Quick Links (spans 2 cols) */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold text-white mb-6 font-poppins">Liens rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group relative inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 font-inter text-sm"
                  >
                    <span className="absolute left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 -bottom-0.5" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Destinations (spans 3 cols) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold text-white mb-6 font-poppins">Destinations populaires</h4>
            <ul className="space-y-3">
              {destinations.map((dest, index) => (
                <motion.li 
                  key={dest.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Link
                    href={dest.href}
                    className="group relative inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 font-inter text-sm"
                  >
                    <span className="absolute left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300 -bottom-0.5" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {dest.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact (spans 3 cols) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="text-lg font-bold text-white mb-6 font-poppins">Nous contacter</h4>
            <ul className="space-y-5">
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-1">Email</p>
                  <a
                    href={`mailto:${CONTACT.email.main}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors font-inter text-sm"
                  >
                    {CONTACT.email.main}
                  </a>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-600/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-1">Téléphone</p>
                  <a
                    href={`tel:${CONTACT.phone.main.replace(/\s/g, '')}`}
                    className="text-gray-300 hover:text-green-400 transition-colors font-inter text-sm"
                  >
                    {CONTACT.phone.display}
                  </a>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-600/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-inter mb-1">Adresse</p>
                  <span className="text-gray-300 font-inter text-sm">
                    {CONTACT.address}
                  </span>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm font-inter text-center md:text-left">
              © 2025 L'Étudiant à l'Étranger. Tous droits réservés. Réalisé avec{' '}
              <span className="text-red-500">❤️</span> pour votre avenir.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-blue-400 transition-colors font-inter text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 group"
            aria-label="Scroll to top"
          >
            {/* Button */}
            <div className="relative">
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Main button */}
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/50 transition-all duration-300">
                <motion.div
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowUp className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}
