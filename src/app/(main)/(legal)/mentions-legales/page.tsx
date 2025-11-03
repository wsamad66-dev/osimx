import type { Metadata } from 'next'
import { FileText, Building2, Mail, Phone, Globe, Shield } from 'lucide-react'
import { PDFExportButton } from '@/components/legal/PDFExportButton'

export const metadata: Metadata = {
  title: 'Mentions Légales | L\'Étudiant Étranger',
  description: 'Mentions légales du site L\'Étudiant Étranger - Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation.',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary-600" />
                <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">
                  Mentions Légales
                </h1>
              </div>
              <PDFExportButton pageTitle="Mentions Légales" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Dernière mise à jour : 11 octobre 2025
            </p>
          </div>

          {/* 1. Éditeur du site */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                1. Éditeur du site
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <p className="text-gray-800">
                <span className="font-semibold">Raison sociale :</span> L'Étudiant Étranger
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Forme juridique :</span> SARL (Société à Responsabilité Limitée)
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Capital social :</span> 10 000 €
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">SIRET :</span> 123 456 789 00012
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">TVA intracommunautaire :</span> FR12123456789
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 text-primary-600 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Email :</span>{' '}
                  <a href="mailto:contact@letudiantetranger.com" className="text-primary-600 hover:underline">
                    contact@letudiantetranger.com
                  </a>
                </span>
              </p>
              <p className="text-gray-800 flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 text-primary-600 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Téléphone :</span>{' '}
                  <a href="tel:+33600000000" className="text-primary-600 hover:underline">
                    +33 6 00 00 00 00
                  </a>
                </span>
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Siège social :</span> 12 rue des Études, 75001 Paris, France
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Directeur de publication :</span> Ouassim Samad
              </p>
            </div>
          </section>

          {/* 2. Hébergeur */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                2. Hébergement
              </h2>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <p className="text-gray-800">
                <span className="font-semibold">Nom de l'hébergeur :</span> Vercel Inc.
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Adresse :</span> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Site web :</span>{' '}
                <a 
                  href="https://vercel.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  https://vercel.com
                </a>
              </p>
            </div>
          </section>

          {/* 3. Propriété intellectuelle */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                3. Propriété intellectuelle
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                L'ensemble des contenus présents sur le site <strong>letudiantetranger.com</strong> (textes, 
                graphismes, logos, icônes, images, vidéos, sons, logiciels, bases de données, etc.) est la 
                propriété exclusive de <strong>L'Étudiant Étranger</strong>, à l'exception des éléments 
                expressément identifiés comme appartenant à des tiers.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf 
                autorisation écrite préalable de L'Étudiant Étranger.
              </p>
              <p>
                Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient 
                sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux 
                dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </div>
          </section>

          {/* 4. Limitation de responsabilité */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              4. Limitation de responsabilité
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>L'Étudiant Étranger</strong> s'efforce d'assurer au mieux l'exactitude et la mise 
                à jour des informations diffusées sur ce site, dont elle se réserve le droit de corriger, 
                à tout moment et sans préavis, le contenu.
              </p>
              <p>
                Toutefois, <strong>L'Étudiant Étranger</strong> ne peut garantir l'exactitude, la précision 
                ou l'exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p>
                En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
              </p>
              <p>
                <strong>L'Étudiant Étranger</strong> ne pourra être tenue responsable de dommages matériels 
                liés à l'utilisation du site. De plus, l'utilisateur s'engage à accéder au site en utilisant 
                un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération 
                mis à jour.
              </p>
            </div>
          </section>

          {/* 5. Crédits */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              5. Crédits
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Conception et développement :</span> L'Étudiant Étranger
              </p>
              <p>
                <span className="font-semibold">Icônes :</span> Lucide Icons (MIT License)
              </p>
              <p>
                <span className="font-semibold">Photographies :</span> Unsplash, Pexels (licences libres de droits)
              </p>
              <p>
                <span className="font-semibold">Framework :</span> Next.js par Vercel
              </p>
              <p>
                <span className="font-semibold">CMS :</span> Sanity
              </p>
            </div>
          </section>

          {/* 6. Loi applicable */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              6. Loi applicable et juridiction
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les présentes mentions légales sont soumises au droit français. En cas de litige et à défaut 
                d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles 
                de compétence en vigueur.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-navy-900 mb-3">
                📧 Besoin de plus d'informations ?
              </h3>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant les mentions légales, n'hésitez pas à nous contacter :
              </p>
              <a 
                href="mailto:contact@letudiantetranger.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
