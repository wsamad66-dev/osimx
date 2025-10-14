// ============================================
// EXEMPLE D'INTÉGRATION SUR LA HOMEPAGE
// ============================================

import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export default function HomePage() {
  return (
    <>
      {/* =========================
          HERO SECTION AVEC CTA
          ========================= */}
      <section className="hero bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Étudiez à l'étranger en toute sérénité
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Accompagnement personnalisé de A à Z pour réaliser vos rêves d'études internationales
          </p>
          
          {/* CTA qui scroll vers le formulaire */}
          <AppointmentCTA 
            text="Réserver ma consultation gratuite 🎓"
            scrollTo="rendez-vous"
            variant="secondary"
            size="lg"
          />
        </div>
      </section>

      {/* =========================
          SECTION DESTINATIONS
          ========================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Destinations populaires
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Cards de destinations */}
            <div className="card">France 🇫🇷</div>
            <div className="card">Canada 🇨🇦</div>
            <div className="card">USA 🇺🇸</div>
            <div className="card">UK 🇬🇧</div>
          </div>
          
          {/* CTA dans la section */}
          <div className="text-center mt-12">
            <AppointmentCTA 
              text="Discutons de votre projet"
              scrollTo="rendez-vous"
              variant="outline"
              size="md"
            />
          </div>
        </div>
      </section>

      {/* =========================
          SECTION TÉMOIGNAGES
          ========================= */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ils nous font confiance
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Testimonials cards */}
          </div>
        </div>
      </section>

      {/* =========================
          SECTION FORMULAIRE DE RDV
          ID = "rendez-vous" pour le scroll
          ========================= */}
      <div id="rendez-vous">
        <AppointmentForm variant="section" />
      </div>

      {/* =========================
          SECTION FAQ
          ========================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Questions fréquentes
          </h2>
          {/* FAQ items */}
          
          {/* CTA en fin de FAQ */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Vous avez d'autres questions ?
            </p>
            <AppointmentCTA 
              text="Parlons-en ensemble"
              variant="primary"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        {/* Footer content */}
      </footer>
    </>
  )
}

// ============================================
// ALTERNATIVE: CTA QUI NAVIGUE VERS /rendez-vous
// ============================================

export function AlternativeHomePage() {
  return (
    <>
      <section className="hero">
        <h1>Étudiez à l'étranger</h1>
        
        {/* Navigate to /rendez-vous page */}
        <AppointmentCTA 
          text="Prendre rendez-vous"
          href="/rendez-vous"  // Navigue vers la page dédiée
          variant="primary"
          size="lg"
        />
      </section>
    </>
  )
}

// ============================================
// VARIANTES DU BOUTON CTA
// ============================================

export function CTAVariants() {
  return (
    <div className="space-y-4">
      {/* Primary - Blue-Purple gradient */}
      <AppointmentCTA 
        text="Consultation gratuite"
        variant="primary"
        size="lg"
      />

      {/* Secondary - Orange-Pink gradient */}
      <AppointmentCTA 
        text="Réserver maintenant"
        variant="secondary"
        size="md"
      />

      {/* Outline - White with blue border */}
      <AppointmentCTA 
        text="En savoir plus"
        variant="outline"
        size="sm"
      />

      {/* Avec scroll */}
      <AppointmentCTA 
        text="Prendre RDV"
        scrollTo="appointment-section"
        variant="primary"
      />

      {/* Avec navigation */}
      <AppointmentCTA 
        text="Réserver"
        href="/rendez-vous"
        variant="secondary"
      />

      {/* Custom className */}
      <AppointmentCTA 
        text="Contact"
        className="mt-8 w-full"
        variant="primary"
      />
    </div>
  )
}

// ============================================
// VARIANTES DU FORMULAIRE
// ============================================

export function FormVariants() {
  return (
    <div className="space-y-8">
      {/* Section variant - Avec background */}
      <AppointmentForm variant="section" />

      {/* Inline variant - Simple */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <AppointmentForm variant="inline" />
      </div>

      {/* Avec callback onSuccess */}
      <AppointmentForm 
        variant="section"
        onSuccess={() => {
          console.log('Success!')
          // Rediriger ou afficher un message
        }}
      />

      {/* Custom className */}
      <AppointmentForm 
        variant="inline"
        className="max-w-xl mx-auto"
      />
    </div>
  )
}

// ============================================
// INTÉGRATION DANS UN MODAL
// ============================================

'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ouvrir le formulaire
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl max-w-2xl w-full">
            <AppointmentForm 
              variant="inline"
              onSuccess={() => setIsOpen(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}

// ============================================
// STICKY CTA EN BAS DE PAGE
// ============================================

'use client'

import { useEffect, useState } from 'react'
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'

export function StickyAppointmentCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Afficher après 500px de scroll
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <AppointmentCTA 
        text="Réserver"
        variant="primary"
        size="md"
      />
    </div>
  )
}

// ============================================
// POPUP APRÈS TEMPS SUR LA PAGE
// ============================================

'use client'

import { useEffect, useState } from 'react'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export function TimedPopup() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Afficher après 30 secondes
    const timer = setTimeout(() => {
      setShowPopup(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full relative">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <AppointmentForm 
          variant="inline"
          onSuccess={() => setShowPopup(false)}
        />
      </div>
    </div>
  )
}

// ============================================
// MULTIPLE CTA DANS UNE SECTION
// ============================================

export function MultipleCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Prêt à concrétiser votre projet ?
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Choisissez l'option qui vous convient le mieux
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Option 1: Consultation immédiate */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Consultation immédiate</h3>
            <p className="text-gray-600 mb-6">Réservez votre créneau maintenant</p>
            <AppointmentCTA 
              text="Réserver"
              variant="primary"
              size="md"
              className="w-full"
            />
          </div>

          {/* Option 2: En savoir plus */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Explorer nos services</h3>
            <p className="text-gray-600 mb-6">Découvrez comment nous pouvons vous aider</p>
            <AppointmentCTA 
              text="En savoir plus"
              href="/services"
              variant="outline"
              size="md"
              className="w-full"
            />
          </div>

          {/* Option 3: Contact direct */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Nous contacter</h3>
            <p className="text-gray-600 mb-6">Une question ? Écrivez-nous</p>
            <AppointmentCTA 
              text="Contact"
              href="/contact"
              variant="secondary"
              size="md"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
