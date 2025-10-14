'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle } from 'lucide-react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulation d'envoi (à remplacer par votre API newsletter)
    setTimeout(() => {
      setStatus('success')
      setMessage('Merci ! Vous recevrez bientôt nos meilleurs conseils.')
      setEmail('')
      
      // Reset après 5 secondes
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
    }, 1500)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="my-16 py-12 px-8 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Icône */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6"
        >
          <Mail className="w-8 h-8 text-white" />
        </motion.div>

        {/* Titre */}
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
          Recevez nos meilleurs conseils
        </h3>
        
        {/* Description */}
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Guides exclusifs, témoignages d'étudiants, astuces visa et opportunités de bourses. 
          Rejoignez plus de <span className="font-bold">10 000 étudiants</span> qui nous font confiance.
        </p>

        {/* Formulaire ou message de succès */}
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 text-white bg-white/20 backdrop-blur-sm rounded-xl py-4 px-6"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold">{message}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 rounded-xl bg-white/90 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {status === 'loading' ? (
                <>
                  <span className="animate-spin">⏳</span>
                  <span>Envoi...</span>
                </>
              ) : (
                <>
                  <span>S'inscrire</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Note de confidentialité */}
        <p className="text-sm text-white/70 mt-6">
          🔒 Vos données sont sécurisées. Désinscription en 1 clic.
        </p>
      </div>
    </motion.section>
  )
}
