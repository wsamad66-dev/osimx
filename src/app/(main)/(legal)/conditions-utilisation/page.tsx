import type { Metadata } from 'next'
import { ScrollText, CheckCircle, AlertCircle, UserCheck, FileCheck } from 'lucide-react'
import { PDFExportButton } from '@/components/legal/PDFExportButton'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation | L\'Étudiant Étranger',
  description: 'Conditions générales d\'utilisation du site L\'Étudiant Étranger. Règles d\'accès et d\'utilisation de nos services.',
}

export default function ConditionsUtilisationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
          {/* Header */}
          <div className="mb-8 pb-6 border-b-2 border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <ScrollText className="w-8 h-8 text-primary-600" />
                <h1 className="text-3xl sm:text-4xl font-bold text-navy-900">
                  Conditions Générales d'Utilisation
                </h1>
              </div>
              <PDFExportButton pageTitle="Conditions Générales d'Utilisation" />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              Dernière mise à jour : 11 octobre 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-8 p-6 bg-primary-50 rounded-xl border-l-4 border-primary-600">
            <p className="text-gray-800 leading-relaxed">
              Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») régissent l'utilisation 
              du site <strong>letudiantetranger.com</strong> (ci-après « le Site ») édité par{' '}
              <strong>L'Étudiant Étranger</strong>. En accédant et en utilisant le Site, vous acceptez 
              sans réserve les présentes CGU.
            </p>
          </div>

          {/* 1. Objet */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                1. Objet
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Le Site <strong>L'Étudiant Étranger</strong> a pour objet de proposer aux étudiants 
                francophones des services d'accompagnement personnalisé pour leurs projets d'études 
                à l'étranger, notamment :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Conseil et orientation sur les destinations d'études</li>
                <li>Aide à la constitution de dossiers d'admission</li>
                <li>Accompagnement pour les démarches visa</li>
                <li>Mise en relation avec des universités partenaires</li>
                <li>Suivi personnalisé tout au long du processus</li>
              </ul>
            </div>
          </section>

          {/* 2. Conditions d'accès */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                2. Conditions d'accès
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-lg font-semibold text-navy-800">2.1 Accès libre</h3>
              <p>
                L'accès au Site est gratuit et ouvert à tous les internautes. Toutefois, certaines 
                fonctionnalités avancées peuvent nécessiter une inscription préalable.
              </p>

              <h3 className="text-lg font-semibold text-navy-800">2.2 Inscription</h3>
              <p>
                L'inscription sur le Site est gratuite. Elle nécessite de fournir des informations 
                exactes et à jour (nom, prénom, email, téléphone). L'utilisateur s'engage à ne créer 
                qu'un seul compte personnel.
              </p>

              <h3 className="text-lg font-semibold text-navy-800">2.3 Moyens techniques</h3>
              <p>
                L'utilisateur doit disposer des moyens techniques nécessaires pour accéder au Site : 
                connexion Internet, navigateur web récent, etc. Il reste seul responsable du bon 
                fonctionnement de son équipement informatique.
              </p>
            </div>
          </section>

          {/* 3. Services proposés */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              3. Services proposés
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>L'Étudiant Étranger</strong> propose les services suivants :
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-navy-800 mb-1">Consultation gratuite</h4>
                  <p className="text-sm">Première prise de contact et analyse du projet</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-navy-800 mb-1">Orientation personnalisée</h4>
                  <p className="text-sm">Conseil sur les destinations et programmes</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-navy-800 mb-1">Accompagnement visa</h4>
                  <p className="text-sm">Aide à la préparation des dossiers</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-semibold text-navy-800 mb-1">Suivi post-admission</h4>
                  <p className="text-sm">Support durant les premières démarches</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Responsabilités */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-navy-900">
                4. Responsabilités
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h3 className="text-lg font-semibold text-navy-800">4.1 Responsabilité de L'Étudiant Étranger</h3>
              <p>
                <strong>L'Étudiant Étranger</strong> s'efforce de fournir des informations à jour 
                et exactes. Toutefois, la société ne peut être tenue responsable :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Des erreurs ou omissions dans les informations fournies</li>
                <li>Des interruptions temporaires du Site pour maintenance</li>
                <li>Des décisions prises par les universités ou autorités consulaires</li>
                <li>Des changements de réglementation dans les pays de destination</li>
                <li>De l'utilisation frauduleuse des services par des tiers</li>
              </ul>

              <h3 className="text-lg font-semibold text-navy-800 mt-6">4.2 Responsabilité de l'utilisateur</h3>
              <p>
                L'utilisateur s'engage à :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir des informations exactes et véridiques</li>
                <li>Maintenir la confidentialité de ses identifiants de connexion</li>
                <li>Ne pas utiliser le Site à des fins illicites ou frauduleuses</li>
                <li>Respecter la propriété intellectuelle de L'Étudiant Étranger</li>
                <li>Ne pas tenter de perturber le fonctionnement du Site</li>
              </ul>
            </div>
          </section>

          {/* 5. Propriété intellectuelle */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              5. Propriété intellectuelle
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Tous les contenus présents sur le Site (textes, images, vidéos, logos, design, etc.) 
                sont protégés par le droit d'auteur et appartiennent à <strong>L'Étudiant Étranger</strong> 
                ou à ses partenaires.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication 
                de ces différents éléments est strictement interdite sans l'accord exprès par écrit de 
                L'Étudiant Étranger.
              </p>
            </div>
          </section>

          {/* 6. Comportement utilisateur */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              6. Comportement de l'utilisateur
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                L'utilisateur s'engage à ne pas :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Publier de contenu illicite, diffamatoire, raciste ou pornographique</li>
                <li>Usurper l'identité d'autrui</li>
                <li>Envoyer des messages non sollicités (spam)</li>
                <li>Tenter de pirater ou compromettre la sécurité du Site</li>
                <li>Collecter des données personnelles d'autres utilisateurs</li>
                <li>Utiliser des robots ou scripts automatisés</li>
              </ul>
              <p className="mt-4 p-4 bg-red-50 border-l-4 border-red-600 rounded">
                <strong>⚠️ Attention :</strong> Tout manquement à ces règles peut entraîner la 
                suspension immédiate du compte et des poursuites judiciaires si nécessaire.
              </p>
            </div>
          </section>

          {/* 7. Protection des données */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              7. Protection des données personnelles
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les données personnelles collectées sur le Site sont traitées conformément à notre{' '}
                <a href="/politique-confidentialite" className="text-primary-600 hover:underline font-semibold">
                  Politique de Confidentialité
                </a>{' '}
                et au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </div>
          </section>

          {/* 8. Modification des CGU */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              8. Modification des CGU
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>L'Étudiant Étranger</strong> se réserve le droit de modifier les présentes 
                CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle 
                par email ou via une notification sur le Site.
              </p>
              <p>
                La poursuite de l'utilisation du Site après modification des CGU vaut acceptation des 
                nouvelles conditions.
              </p>
            </div>
          </section>

          {/* 9. Résiliation */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              9. Résiliation
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                L'utilisateur peut supprimer son compte à tout moment en contactant{' '}
                <a href="mailto:contact@letudiantetranger.com" className="text-primary-600 hover:underline">
                  contact@letudiantetranger.com
                </a>.
              </p>
              <p>
                <strong>L'Étudiant Étranger</strong> se réserve le droit de suspendre ou supprimer 
                tout compte en cas de violation des présentes CGU, sans préavis ni indemnité.
              </p>
            </div>
          </section>

          {/* 10. Loi applicable */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              10. Loi applicable et juridiction
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Les présentes CGU sont régies par le droit français. Tout litige relatif à 
                l'interprétation ou à l'exécution des présentes sera soumis, à défaut d'accord 
                amiable, aux tribunaux compétents de Paris, France.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="bg-primary-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-navy-900 mb-3">
                📧 Questions sur les CGU ?
              </h3>
              <p className="text-gray-700 mb-4">
                Pour toute question concernant les conditions d'utilisation, contactez-nous :
              </p>
              <a 
                href="mailto:contact@letudiantetranger.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
