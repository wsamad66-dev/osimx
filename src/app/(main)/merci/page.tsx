import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Calendar, Home, ArrowRight, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Merci ! | L\'Étudiant Étranger',
  description: 'Merci pour votre confiance. Nous avons hâte de vous accompagner dans votre projet d\'études à l\'étranger.',
}

export default function MerciPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy-900 mb-4">
            Merci pour votre confiance !
          </h1>
          <p className="text-xl text-gray-600">
            Votre rendez-vous est confirmé
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 mb-8">
          <div className="space-y-6">
            {/* Confirmation Message */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-green-900 mb-2">
                    Rendez-vous enregistré avec succès
                  </h2>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Vous recevrez un <strong>email de confirmation</strong> avec tous les détails de votre consultation dans quelques instants. 
                    Pensez à vérifier votre dossier spam si vous ne le voyez pas.
                  </p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div>
              <h3 className="text-xl font-bold text-navy-900 mb-4">
                Prochaines étapes
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Vérifiez votre email</p>
                    <p className="text-sm text-gray-600">
                      Vous recevrez un lien de visioconférence pour votre consultation
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Préparez vos questions</p>
                    <p className="text-sm text-gray-600">
                      Notez vos objectifs et questions pour tirer le meilleur parti de votre consultation
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rejoignez la consultation</p>
                    <p className="text-sm text-gray-600">
                      À l'heure prévue, cliquez sur le lien dans votre email de confirmation
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-navy-900 mb-3">
                Besoin d'aide ?
              </h3>
              <div className="space-y-2 text-sm">
                <a 
                  href="mailto:contact@letudiantetranger.com"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contact@letudiantetranger.com
                </a>
                <a 
                  href="tel:+33123456789"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          <Link
            href="/resources"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white text-blue-600 font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all"
          >
            <span>Explorer nos ressources</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Nous sommes impatients de vous accompagner dans votre projet d'études à l'étranger ! 🌍✨
        </p>
      </div>
    </div>
  )
}
