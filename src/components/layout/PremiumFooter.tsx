'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { CONTACT } from '@/config/contact'

const quickLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

const destinations = [
  { label: 'Canada', href: '/destinations/canada' },
  { label: 'France', href: '/destinations/france' },
  { label: 'Allemagne', href: '/destinations/allemagne' },
  { label: 'États-Unis', href: '/destinations/usa' },
]

const legalLinks = [
  { label: 'Mentions légales', href: '/legal/mentions' },
  { label: 'Politique de confidentialité', href: '/legal/privacy' },
  { label: 'CGU', href: '/legal/terms' },
]

export function PremiumFooter() {
  return (
    <footer className="bg-brand-navy border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold text-white font-poppins">
                L'Étudiant à l'Étranger
              </h3>
            </Link>
            <p className="text-white/70 text-sm font-inter leading-relaxed">
              Votre partenaire de confiance pour réaliser vos rêves d'études à l'étranger. 
              Accompagnement personnalisé depuis 2018.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              <Link
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-brand-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-brand-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href={CONTACT.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-brand-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={CONTACT.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-brand-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-poppins">Liens rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-primary transition-colors font-inter text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Destinations */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-poppins">Destinations</h4>
            <ul className="space-y-3">
              {destinations.map((dest) => (
                <li key={dest.href}>
                  <Link
                    href={dest.href}
                    className="text-white/70 hover:text-brand-primary transition-colors font-inter text-sm"
                  >
                    {dest.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 font-poppins">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`mailto:${CONTACT.email.main}`}
                    className="text-white/70 hover:text-brand-primary transition-colors font-inter text-sm"
                  >
                    {CONTACT.email.main}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a
                    href={`tel:${CONTACT.phone.main.replace(/\s/g, '')}`}
                    className="text-white/70 hover:text-brand-primary transition-colors font-inter text-sm"
                  >
                    {CONTACT.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/70 font-inter text-sm">
                    {CONTACT.address}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E293B]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm font-inter">
              © 2025 L'Étudiant à l'Étranger. Tous droits réservés.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/60 hover:text-brand-primary transition-colors font-inter text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
