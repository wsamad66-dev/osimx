'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

const contactReasons = [
  { value: 'admission', label: 'Admission & choix de cursus', icon: '🎓' },
  { value: 'visa', label: 'Visa & formalités', icon: '✈️' },
  { value: 'logement', label: 'Logement & installation', icon: '🏠' },
  { value: 'bourses', label: 'Bourses & financement', icon: '💰' },
  { value: 'preparation', label: 'Préparation linguistique', icon: '📚' },
  { value: 'other', label: 'Autre demande', icon: '💬' }
]

const supportFeatures = [
  {
    icon: '⏰',
    title: 'Support 24/7',
    subtitle: 'Réponses rapides'
  },
  {
    icon: '👨‍🎓',
    title: 'Conseillers experts',
    subtitle: 'Expérience terrain'
  },
  {
    icon: '🎯',
    title: 'Suivi personnalisé',
    subtitle: 'Accompagnement dédié'
  },
  {
    icon: '🏆',
    title: '95% de succès',
    subtitle: 'Résultats prouvés'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    interest: '',
    studyLevel: '',
    budget: '',
    timeline: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        interest: '',
        studyLevel: '',
        budget: '',
        timeline: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-blend-overlay"
             style={{
               backgroundImage: 'url("https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80")',
               opacity: 0.3
             }}
        />
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-montserrat font-bold text-4xl lg:text-5xl text-white mb-6">
              Commencez Votre Projet d'Études
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Remplissez le formulaire ci-dessous pour une consultation gratuite. 
              Nos experts vous recontacteront sous 24h avec un plan personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Left Side - Branding & Info */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              {/* Gradient Overlays */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Brand */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-900">LÉ</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">L'Étudiant à l'Étranger</h3>
                    <p className="text-blue-200 text-sm">Guidance • Admissions • Vie étudiante</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white mb-4">
                  Des études en France ?
                  <span className="block text-yellow-400 mt-2">On vous guide, pas à pas.</span>
                </h2>
                
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Avec plus de 500 étudiants accompagnés et 95% de réussite aux visas, 
                  nous transformons votre rêve d'études en France en réalité.
                </p>

                {/* Support Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {supportFeatures.map((feature, index) => (
                    <div key={index} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <div className="text-white font-semibold text-sm">{feature.title}</div>
                          <div className="text-blue-200 text-xs">{feature.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white/10 rounded-full px-4 py-2 text-sm text-white border border-white/20">
                    ✅ Consultation gratuite
                  </div>
                  <div className="bg-white/10 rounded-full px-4 py-2 text-sm text-white border border-white/20">
                    🏆 95% de succès visa
                  </div>
                  <div className="bg-white/10 rounded-full px-4 py-2 text-sm text-white border border-white/20">
                    ⚡ Réponse sous 24h
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  📋 Formulaire de Contact
                </h3>
                <p className="text-blue-100">
                  Décrivez votre projet d'études. Plus vous donnez de détails, 
                  mieux nous pourrons vous accompagner.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl">
                  <div className="flex items-center gap-3 text-green-200">
                    <span className="text-2xl">✅</span>
                    <div>
                      <div className="font-semibold">Message envoyé avec succès !</div>
                      <div className="text-sm">Nous vous recontacterons sous 24h.</div>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
                  <div className="flex items-center gap-3 text-red-200">
                    <span className="text-2xl">❌</span>
                    <div>
                      <div className="font-semibold">Erreur lors de l'envoi</div>
                      <div className="text-sm">Veuillez réessayer ou nous contacter directement.</div>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-blue-200">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                      placeholder="Votre nom et prénom"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-blue-200">
                      Adresse email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-blue-200">
                      Téléphone (WhatsApp de préférence)
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                      placeholder="+221 XX XXX XX XX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium text-blue-200">
                      Pays de résidence *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-blue-900">Sélectionnez votre pays</option>
                      <option value="senegal" className="bg-blue-900">🇸🇳 Sénégal</option>
                      <option value="cote-ivoire" className="bg-blue-900">🇨🇮 Côte d'Ivoire</option>
                      <option value="mali" className="bg-blue-900">🇲🇱 Mali</option>
                      <option value="burkina" className="bg-blue-900">🇧🇫 Burkina Faso</option>
                      <option value="niger" className="bg-blue-900">🇳🇪 Niger</option>
                      <option value="guinea" className="bg-blue-900">🇬🇳 Guinée</option>
                      <option value="cameroon" className="bg-blue-900">🇨🇲 Cameroun</option>
                      <option value="morocco" className="bg-blue-900">🇲🇦 Maroc</option>
                      <option value="tunisia" className="bg-blue-900">🇹🇳 Tunisie</option>
                      <option value="ghana" className="bg-blue-900">🇬🇭 Ghana</option>
                      <option value="nigeria" className="bg-blue-900">🇳🇬 Nigeria</option>
                      <option value="other" className="bg-blue-900">🌍 Autre</option>
                    </select>
                  </div>
                </div>

                {/* Study Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium text-blue-200">
                      Principal besoin *
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-blue-900">Choisir un service</option>
                      {contactReasons.map(reason => (
                        <option key={reason.value} value={reason.value} className="bg-blue-900">
                          {reason.icon} {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="studyLevel" className="text-sm font-medium text-blue-200">
                      Niveau d'études visé
                    </label>
                    <select
                      id="studyLevel"
                      name="studyLevel"
                      value={formData.studyLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-blue-900">Sélectionner le niveau</option>
                      <option value="licence" className="bg-blue-900">🎓 Licence (BAC+3)</option>
                      <option value="master" className="bg-blue-900">🎯 Master (BAC+5)</option>
                      <option value="doctorat" className="bg-blue-900">📚 Doctorat (BAC+8)</option>
                      <option value="autre" className="bg-blue-900">📋 Autre formation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium text-blue-200">
                      Budget prévu (EUR/an)
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-blue-900">Budget approximatif</option>
                      <option value="5000-8000" className="bg-blue-900">💰 5 000 - 8 000 EUR</option>
                      <option value="8000-12000" className="bg-blue-900">💰 8 000 - 12 000 EUR</option>
                      <option value="12000-20000" className="bg-blue-900">💰 12 000 - 20 000 EUR</option>
                      <option value="20000+" className="bg-blue-900">💰 Plus de 20 000 EUR</option>
                      <option value="unsure" className="bg-blue-900">❓ Je ne sais pas encore</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-sm font-medium text-blue-200">
                      Échéance souhaitée
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors"
                    >
                      <option value="" className="bg-blue-900">Quand partir ?</option>
                      <option value="septembre-2024" className="bg-blue-900">🍂 Septembre 2024</option>
                      <option value="janvier-2025" className="bg-blue-900">❄️ Janvier 2025</option>
                      <option value="septembre-2025" className="bg-blue-900">🍂 Septembre 2025</option>
                      <option value="flexible" className="bg-blue-900">📅 Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-blue-200">
                    Décrivez votre projet d'études *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-blue-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-colors resize-none"
                    placeholder="Parlez-nous de votre parcours académique, vos objectifs d'études en France, votre domaine d'intérêt, vos questions spécifiques... Plus vous donnez de détails, mieux nous pourrons vous conseiller !"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 hover:from-yellow-400 hover:to-yellow-500 font-bold py-4 px-8 rounded-xl text-lg transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-3">⏳</span>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <span className="mr-3">🚀</span>
                      Envoyer ma demande
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-blue-200">
                  <p>
                    ⚡ <strong>Réponse garantie sous 24h ouvrées</strong>
                  </p>
                  <p className="mt-1">
                    🔒 Vos données sont protégées et ne seront jamais partagées
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Autres moyens de nous contacter
              </h3>
              <p className="text-blue-100">
                Choisissez le canal qui vous convient le mieux
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">📞</div>
                <h4 className="text-white font-semibold mb-2">Appelez-nous</h4>
                <p className="text-blue-200 text-sm mb-4">Consultation téléphonique gratuite</p>
                <p className="text-yellow-400 font-semibold">+33 1 XX XX XX XX</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">💬</div>
                <h4 className="text-white font-semibold mb-2">WhatsApp</h4>
                <p className="text-blue-200 text-sm mb-4">Chat direct avec nos conseillers</p>
                <p className="text-yellow-400 font-semibold">+221 XX XXX XX XX</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl mb-4">📧</div>
                <h4 className="text-white font-semibold mb-2">Email</h4>
                <p className="text-blue-200 text-sm mb-4">Pour questions détaillées</p>
                <p className="text-yellow-400 font-semibold">contact@letudiant-etranger.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}