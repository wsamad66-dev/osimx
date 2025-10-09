'use client'

import Link from 'next/link'
import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Creative Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-lg shadow-blue-100 border border-blue-100 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Plus de 2000 étudiants accompagnés avec succès
            </span>
          </div>

          {/* Hero Title with Gradient */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gray-900">Réalisez vos rêves</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              d&apos;études à l&apos;étranger
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Accompagnement personnalisé de <span className="font-semibold text-gray-900">A à Z</span> pour étudier en France, 
            au Canada, en Belgique et dans d&apos;autres destinations prestigieuses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/contact"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Consultation Gratuite
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/services"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Découvrir nos services
            </Link>
          </div>

          {/* Stats with Creative Design */}
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">95%</div>
              </div>
              <div className="text-sm font-medium text-gray-600">Taux de réussite</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">2000+</div>
              <div className="text-sm font-medium text-gray-600">Étudiants accompagnés</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">15+</div>
              <div className="text-sm font-medium text-gray-600">Pays destinations</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
