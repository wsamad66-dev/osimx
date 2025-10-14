'use client'

import Link from 'next/link'

const footerSections = {
  services: {
    title: 'Nos Services',
    items: [
      'Admission Universitaire',
      'Accompagnement Visa',
      'Logement & Installation',
      'Préparation Linguistique'
    ]
  },
  ressources: {
    title: 'Ressources',
    items: [
      'Guides Gratuits',
      'Blog',
      'FAQ',
      'Calculateur de Coûts'
    ]
  },
  contact: {
    title: 'Contact',
    items: [
      'Consultation Gratuite',
      'Support Client',
      'Partenariats',
      'À propos'
    ]
  }
}

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.74v-4.2h-3.8c-4.2 0-5.04 3.1-5.04 5.1v2.1h-2.4v4.2h2.4V22h4.9v-10.4h3.3l.7-4.2z' },
  { name: 'LinkedIn', href: '#', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', href: '#', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
]

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-montserrat font-bold text-2xl mb-4">
              L'Étudiant à l'Étranger
            </h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Votre partenaire de confiance pour réaliser votre rêve d'études en France. 
              Plus de 500 étudiants accompagnés avec succès depuis 2018.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors duration-300 group"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 fill-current text-white group-hover:text-blue-900" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-montserrat font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-blue-100 hover:text-yellow-500 transition-colors duration-200 hover:underline"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Success Stats */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">500+</div>
              <div className="text-blue-100">Étudiants Accompagnés</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">95%</div>
              <div className="text-blue-100">Taux de Succès Visa</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">20+</div>
              <div className="text-blue-100">Universités Partenaires</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-blue-100 text-sm">
            © 2025 L'Étudiant à l'Étranger. Tous droits réservés.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="#" className="text-blue-100 hover:text-yellow-500 text-sm transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="#" className="text-blue-100 hover:text-yellow-500 text-sm transition-colors">
              Conditions d'Utilisation
            </Link>
            <Link href="#" className="text-blue-100 hover:text-yellow-500 text-sm transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}