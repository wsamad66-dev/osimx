'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const heroImages = [
  'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e33ac1c1-14ac-4153-8832-a92255fae303.png',
  'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1bde2eae-6a84-4b1d-b8ee-d81025034cfa.png',
  'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b1b618e1-d69e-4270-8e19-c73f822d5aa8.png'
]

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToContact = () => {
    window.location.href = '/contact'
  }

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,31,63,0.7), rgba(0,31,63,0.7)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: isLoaded ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 20s ease-out'
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-32 w-4 h-4 bg-yellow-500 rounded-full animate-pulse opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transform transition-all duration-1000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="font-montserrat font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Votre avenir en France
            <span className="block text-yellow-500 mt-2">commence aujourd'hui</span>
          </h1>
          
          <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Nous accompagnons les étudiants africains dans toutes les étapes pour étudier en France : 
            <span className="text-yellow-400 font-semibold"> admission, visa, logement et plus</span>
          </p>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
              <div className="text-sm text-blue-100">Étudiants accompagnés</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-500 mb-2">95%</div>
              <div className="text-sm text-blue-100">Taux de succès visa</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-yellow-500 mb-2">20+</div>
              <div className="text-sm text-blue-100">Universités partenaires</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-8 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              🚀 Postuler maintenant
            </Button>
            <Button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
            >
              📚 Découvrir nos services
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-yellow-500 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  )
}