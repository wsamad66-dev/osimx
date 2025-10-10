'use client'
<<<<<<< Updated upstream

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#26a5de] to-[#232d6e] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-between gap-10 md:gap-20 max-w-7xl mx-auto w-full flex-col md:flex-row py-12 px-8 md:px-16">
        {/* Text Content with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-center md:text-left"
        >
          <div className="text-xl md:text-2xl text-white/90 mb-5">Erreur 404</div>
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-8 leading-none">
            Hey Buddy
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-10 leading-relaxed">
            Nous ne trouvons pas la page que vous recherchez.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#f29100] text-white px-14 py-5 rounded-full text-lg md:text-xl font-medium tracking-wider hover:bg-[#ff9e0a] transition-colors duration-300 cursor-pointer shadow-lg hover:shadow-[0_10px_25px_rgba(242,145,0,0.4)]"
            >
              RETOUR ACCUEIL
            </motion.button>
          </Link>
        </motion.div>

        {/* Ghost with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -20, 0]
          }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 0.5 },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative"
        >
          <Image
            src="/ghost.png"
            alt="Fantôme 404"
            width={650}
            height={650}
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] xl:w-[650px] xl:h-[650px] object-contain drop-shadow-[0_35px_70px_rgba(0,0,0,0.45)]"
            priority
          />
          {/* Shadow with synchronized animation */}
          <motion.div
            animate={{
              scale: [1, 0.85, 1],
              opacity: [0.6, 0.4, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 md:w-96 lg:w-[450px] h-16 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)'
            }}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="flex justify-center items-center px-8 md:px-16 py-8">
        <div className="flex gap-8 text-white text-base md:text-lg lg:text-xl">
          <span>Contact@etudiantetranger.com</span>
        </div>
      </footer>
=======
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="text-center">
        <h1 className="font-display text-9xl font-bold text-royal-blue">404</h1>
        <h2 className="mt-4 font-display text-3xl font-bold text-gray-900">
          Page non trouvée
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Désolé, la page que vous recherchez n'existe pas.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vivid-blue to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Retour à l'accueil
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:border-vivid-blue hover:bg-blue-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Page précédente
          </button>
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  )
}
