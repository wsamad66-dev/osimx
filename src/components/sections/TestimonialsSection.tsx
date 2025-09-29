'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: 'Amina Diallo',
    country: 'Sénégal',
    university: 'Sorbonne Université',
    program: 'Master en Relations Internationales',
    year: '2023',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/754e3a0e-f03d-4787-af09-2b2ea6e6ad7c.png',
    quote: 'Grâce à L\'Étudiant à l\'Étranger, j\'ai obtenu mon visa du premier coup et je suis maintenant à Paris en master. Leur accompagnement a été exceptionnel, surtout pour la préparation de l\'entretien consulaire. Une équipe vraiment professionnelle !',
    rating: 5,
    achievement: 'Visa obtenu en 3 semaines'
  },
  {
    id: 2,
    name: 'Kofi Asante',
    country: 'Ghana',
    university: 'École Centrale Lyon',
    program: 'Ingénierie Mécanique',
    year: '2023',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eb6905e2-efef-4620-8341-c1b08a8f0dbb.png',
    quote: 'Leur accompagnement pour le logement m\'a vraiment facilité la vie. J\'ai eu une place en résidence CROUS dès mon arrivée. Le suivi personnalisé et les conseils pratiques ont fait toute la différence. Je recommande à 100% !',
    rating: 5,
    achievement: 'Logement CROUS obtenu'
  },
  {
    id: 3,
    name: 'Fatou Ndiaye',
    country: 'Côte d\'Ivoire',
    university: 'Sciences Po Paris',
    program: 'Master en Administration Publique',
    year: '2022',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cd71dac6-bb54-420d-864a-ca3d9a2ffe45.png',
    quote: 'L\'équipe m\'a aidée à décrocher une bourse Eiffel ! Leur expertise dans la préparation des dossiers de bourse est remarquable. Aujourd\'hui je suis à Sciences Po grâce à eux. Un investissement qui a changé ma vie.',
    rating: 5,
    achievement: 'Bourse Eiffel obtenue'
  },
  {
    id: 4,
    name: 'Ibrahim Traoré',
    country: 'Mali',
    university: 'Université Lyon 2',
    program: 'Doctorat en Sociologie',
    year: '2023',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6b0c406f-c262-4043-8674-58bbc7597111.png',
    quote: 'Excellent suivi depuis le Mali jusqu\'à mon installation à Lyon. Ils ont même négocié avec l\'université pour obtenir une exemption de frais de scolarité. Service client exceptionnel, toujours disponibles pour répondre aux questions.',
    rating: 5,
    achievement: 'Exemption frais de scolarité'
  },
  {
    id: 5,
    name: 'Aïcha Benali',
    country: 'Maroc',
    university: 'ESSEC Business School',
    program: 'MBA International',
    year: '2022',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a0059e9-6168-447b-87e7-d9f20d664e64.png',
    quote: 'Grâce à leur préparation intensive au français académique, j\'ai pu intégrer l\'ESSEC sans difficulté. Leur méthode pour améliorer le niveau de français est très efficace. Aujourd\'hui je travaille dans une multinationale parisienne.',
    rating: 5,
    achievement: 'Intégration ESSEC réussie'
  },
  {
    id: 6,
    name: 'Samuel Owusu',
    country: 'Ghana',
    university: 'Université de Bordeaux',
    program: 'Master en Viticulture',
    year: '2023',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fcd0bf6b-ccf1-4d87-861a-0352c45c9279.png',
    quote: 'Ils ont identifié un programme unique en viticulture qui correspondait parfaitement à mon projet professionnel. Leur connaissance des universités françaises est impressionnante. Je suis maintenant dans les vignobles bordelais !',
    rating: 5,
    achievement: 'Programme spécialisé trouvé'
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
  }

  return (
    <section id="temoignages" className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-4xl lg:text-5xl text-blue-900 mb-6">
            Nos Étudiants Témoignent
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez les parcours inspirants de nos étudiants qui ont réalisé leur rêve d'études en France. 
            Leurs témoignages authentiques reflètent notre engagement envers votre réussite.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              {/* Student Photo */}
              <div className="md:w-1/3 relative">
                <img 
                  src={testimonials[currentIndex].image}
                  alt={`${testimonials[currentIndex].name} - étudiant ${testimonials[currentIndex].country}`}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ {testimonials[currentIndex].rating}/5
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 text-white rounded-lg p-3 text-sm">
                    <div className="font-bold">{testimonials[currentIndex].achievement}</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="md:w-2/3 p-8 md:p-12">
                <div className="mb-6">
                  <div className="text-6xl text-yellow-500 leading-none mb-4">"</div>
                  <p className="text-lg text-gray-700 leading-relaxed italic">
                    {testimonials[currentIndex].quote}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-montserrat font-bold text-xl text-blue-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].program}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].university} • {testimonials[currentIndex].year}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center bg-blue-900 text-white px-3 py-1 rounded-full text-sm">
                        🌍 {testimonials[currentIndex].country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-900 hover:bg-yellow-500 hover:text-blue-900"
            aria-label="Témoignage précédent"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-900 hover:bg-yellow-500 hover:text-blue-900"
            aria-label="Témoignage suivant"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-yellow-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Success Stats */}
        <div className="mt-20 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg">
            <h3 className="font-montserrat font-bold text-2xl text-blue-900 mb-8">
              Résultats de nos étudiants
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
                <div className="text-gray-600 text-sm">Visas obtenus</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">87%</div>
                <div className="text-gray-600 text-sm">Logement CROUS</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">73%</div>
                <div className="text-gray-600 text-sm">Bourses obtenues</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">100%</div>
                <div className="text-gray-600 text-sm">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="font-montserrat font-bold text-3xl text-blue-900 mb-4">
            Vous aussi, réalisez votre rêve !
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Rejoignez la communauté de nos anciens étudiants qui excellent aujourd'hui 
            dans les meilleures universités françaises.
          </p>
          <Button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            size="lg"
            className="bg-yellow-500 text-blue-900 hover:bg-yellow-400 font-bold px-10 py-4 rounded-full text-lg transform transition-all duration-300 hover:scale-105"
          >
            🌟 Commencer mon projet
          </Button>
        </div>
      </div>
    </section>
  )
}