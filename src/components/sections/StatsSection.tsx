'use client'

import { useState, useEffect, useRef } from 'react'

const stats = [
  {
    id: 1,
    label: 'Étudiants Accompagnés',
    value: 500,
    suffix: '+',
    icon: '🎓',
    description: 'Depuis 2018'
  },
  {
    id: 2,
    label: 'Taux de Succès Visa',
    value: 95,
    suffix: '%',
    icon: '✈️',
    description: 'Succès garanti'
  },
  {
    id: 3,
    label: 'Universités Partenaires',
    value: 20,
    suffix: '+',
    icon: '🏛️',
    description: 'À travers la France'
  },
  {
    id: 4,
    label: 'Pays d\'Origine',
    value: 15,
    suffix: '+',
    icon: '🌍',
    description: 'À travers l\'Afrique'
  }
]

function AnimatedCounter({ value, suffix, isVisible }: { value: number, suffix: string, isVisible: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    const stepDuration = duration / steps

    let currentCount = 0
    const timer = setInterval(() => {
      currentCount += stepValue
      if (currentCount >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(currentCount))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value, isVisible])

  return (
    <span className="text-4xl lg:text-5xl font-bold text-yellow-500">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-white mb-4">
            Notre Impact en Chiffres
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Des résultats concrets qui témoignent de notre expertise et de notre engagement 
            envers la réussite de nos étudiants
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`text-center transform transition-all duration-1000 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                
                <div className="mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={isVisible}
                  />
                </div>
                
                <h3 className="font-semibold text-white text-lg mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-blue-200 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-blue-100 text-lg mb-8">
            Reconnu et approuvé par les institutions françaises
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-semibold">Campus France Certifié</span>
            </div>
            <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-semibold">Partenaire Officiel</span>
            </div>
            <div className="bg-white/10 px-6 py-3 rounded-full border border-white/20">
              <span className="text-white font-semibold">Agréé OFII</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}