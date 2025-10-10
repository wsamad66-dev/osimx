'use client'

import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Amadou Diallo',
    country: 'Sénégal',
    destination: 'France',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    text: 'Grâce à L\'Étudiant à l\'Étranger, j\'ai obtenu mon admission à l\'Université Paris-Saclay. L\'équipe m\'a accompagné à chaque étape avec professionnalisme.',
    rating: 5,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    name: 'Fatima Touré',
    country: 'Mali',
    destination: 'Canada',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    text: 'Un accompagnement professionnel et humain. Mon visa canadien a été approuvé en moins de 3 mois! Je recommande vivement leurs services.',
    rating: 5,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Jean-Pierre Kouassi',
    country: 'Côte d\'Ivoire',
    destination: 'Belgique',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    text: 'Excellente agence! J\'ai été accepté dans 3 universités belges. L\'équipe est réactive et très compétente. Merci pour tout!',
    rating: 5,
    color: 'from-green-500 to-teal-500'
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full text-sm font-semibold text-yellow-600 mb-4">
            <Quote className="w-4 h-4" />
            Témoignages
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ce que disent nos{' '}
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              étudiants
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Plus de 2000 étudiants nous ont fait confiance
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-500"
            >
              {/* Quote Icon */}
              <div className={`absolute -top-4 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white shadow-lg`}>
                <Quote className="w-6 h-6" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-6 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.country} → {testimonial.destination}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Rejoignez des milliers d&apos;étudiants satisfaits
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-2xl">★</span>
            ))}
            <span className="ml-2 text-xl font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-500">(2000+ avis)</span>
          </div>
        </div>
      </div>
    </section>
  )
}
