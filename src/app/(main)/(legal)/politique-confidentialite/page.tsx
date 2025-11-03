import type { Metadata } from 'next';
import { 
  Shield, 
  Database, 
  Eye, 
  Lock, 
  Cookie, 
  UserCheck, 
  Mail, 
  Calendar, 
  AlertTriangle,
  FileText,
  CheckCircle,
  Clock
} from 'lucide-react';
import { PDFExportButton } from '@/components/legal/PDFExportButton';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | L\'Étudiant Étranger',
  description: 'Politique de confidentialité et protection des données personnelles conforme au RGPD de L\'Étudiant Étranger.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full mb-6">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Votre vie privée est importante pour nous. Découvrez comment nous collectons, utilisons et protégeons vos données personnelles.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm sm:text-base text-gray-400">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <PDFExportButton pageTitle="Politique de Confidentialité" className="bg-white text-black hover:bg-gray-100" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-gray-50 border-l-4 border-black p-6 rounded-r-lg mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Engagement RGPD</h2>
                <p className="text-gray-700 leading-relaxed">
                  L'Étudiant Étranger s'engage à protéger votre vie privée et vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Responsable du traitement */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                1. Responsable du Traitement
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-4">
                Le responsable du traitement des données personnelles est :
              </p>
              
              <div className="space-y-3 bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">L'Étudiant Étranger SARL</p>
                    <p className="text-gray-600 text-sm">SIRET : 123 456 789 00012</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Email de contact DPO :</span>{' '}
                      <a href="mailto:privacy@letudiantetranger.com" className="text-black hover:text-gray-700 underline">
                        privacy@letudiantetranger.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Données collectées */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                2. Données Personnelles Collectées
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Nous collectons les données suivantes lorsque vous utilisez nos services :
              </p>

              {/* Données d'inscription */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  📝 Données d'inscription et de contact
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Nom et prénom</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Adresse email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Numéro de téléphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Pays de résidence</span>
                  </li>
                </ul>
              </div>

              {/* Données de projet */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  🎓 Données relatives à votre projet d'études
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Destination souhaitée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Niveau d'études</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Domaine d'études souhaité</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Budget prévisionnel</span>
                  </li>
                </ul>
              </div>

              {/* Données techniques */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  💻 Données techniques et de navigation
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Adresse IP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Type de navigateur et version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Pages visitées et durée de visite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Données de cookies (voir section dédiée)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Finalités */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                3. Finalités du Traitement
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-black pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📞 Gestion de votre demande</h3>
                  <p className="text-gray-700 text-sm">
                    Traiter et répondre à vos demandes de consultation gratuite et d'accompagnement personnalisé.
                  </p>
                </div>

                <div className="border-l-4 border-gray-600 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📧 Communication</h3>
                  <p className="text-gray-700 text-sm">
                    Vous envoyer des informations sur nos services, des conseils pour votre projet d'études et des newsletters (avec votre consentement).
                  </p>
                </div>

                <div className="border-l-4 border-gray-700 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📊 Amélioration de nos services</h3>
                  <p className="text-gray-700 text-sm">
                    Analyser l'utilisation de notre plateforme pour améliorer l'expérience utilisateur et nos services.
                  </p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">🔒 Sécurité</h3>
                  <p className="text-gray-700 text-sm">
                    Assurer la sécurité de notre plateforme, prévenir la fraude et respecter nos obligations légales.
                  </p>
                </div>

                <div className="border-l-4 border-gray-900 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">📈 Statistiques</h3>
                  <p className="text-gray-700 text-sm">
                    Réaliser des statistiques anonymisées sur l'utilisation de notre site et nos services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Base légale */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                4. Base Légale du Traitement
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Consentement :</span> Pour l'envoi de communications marketing et newsletters.
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Exécution du contrat :</span> Pour la fourniture de nos services d'accompagnement.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Intérêt légitime :</span> Pour l'amélioration de nos services et la sécurité de la plateforme.
                  </p>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <span className="font-semibold text-gray-900">Obligation légale :</span> Pour la conservation de certaines données requises par la loi.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Durée de conservation */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                5. Durée de Conservation
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Vos données personnelles sont conservées pendant les durées suivantes :
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Données de contact et de projet</h3>
                    <p className="text-gray-700 text-sm">
                      <span className="font-medium">3 ans</span> à compter de votre dernier contact avec nos services, puis archivage pendant 5 ans pour respecter nos obligations légales.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Données de navigation</h3>
                    <p className="text-gray-700 text-sm">
                      <span className="font-medium">13 mois</span> maximum pour les cookies et traceurs (conformément aux recommandations de la CNIL).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Consentement marketing</h3>
                    <p className="text-gray-700 text-sm">
                      <span className="font-medium">3 ans</span> à compter du dernier contact. Vous pouvez retirer votre consentement à tout moment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Vos droits RGPD */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                6. Vos Droits
              </h2>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-300 p-6 sm:p-8 mb-6">
              <p className="text-gray-700 font-medium mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ Droit d'accès</h3>
                  <p className="text-gray-700 text-sm">
                    Obtenir une copie de vos données personnelles.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">✏️ Droit de rectification</h3>
                  <p className="text-gray-700 text-sm">
                    Corriger vos données inexactes ou incomplètes.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">🗑️ Droit à l'effacement</h3>
                  <p className="text-gray-700 text-sm">
                    Demander la suppression de vos données personnelles.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">⏸️ Droit à la limitation</h3>
                  <p className="text-gray-700 text-sm">
                    Limiter le traitement de vos données.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">🚫 Droit d'opposition</h3>
                  <p className="text-gray-700 text-sm">
                    Vous opposer au traitement de vos données.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2">📦 Droit à la portabilité</h3>
                  <p className="text-gray-700 text-sm">
                    Récupérer vos données dans un format structuré.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comment exercer vos droits ?
              </h3>
              <p className="text-gray-700 mb-4">
                Pour exercer l'un de ces droits, contactez-nous par email à :
              </p>
              <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                <Mail className="w-6 h-6 text-black" />
                <a 
                  href="mailto:privacy@letudiantetranger.com" 
                  className="text-black hover:text-gray-700 font-semibold text-lg underline"
                >
                  privacy@letudiantetranger.com
                </a>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Nous nous engageons à répondre à votre demande dans un délai de <span className="font-semibold">1 mois</span> maximum. Vous devrez fournir une preuve d'identité pour garantir la sécurité de vos données.
              </p>
              <p className="text-gray-600 text-sm mt-3">
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la{' '}
                <a 
                  href="https://www.cnil.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-700 underline"
                >
                  CNIL (Commission Nationale de l'Informatique et des Libertés)
                </a>.
              </p>
            </div>
          </section>

          {/* Section 7: Cookies */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Cookie className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                7. Cookies et Traceurs
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser notre audience.
              </p>

              {/* Cookies essentiels */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Cookies essentiels (obligatoires)
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                </p>
                <ul className="space-y-2 text-gray-700 text-sm ml-4">
                  <li>• Cookies de session pour la navigation</li>
                  <li>• Cookies de sécurité pour protéger votre compte</li>
                  <li>• Cookies de préférence de langue</li>
                </ul>
              </div>

              {/* Cookies analytiques */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gray-600" />
                  Cookies analytiques (avec consentement)
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                  Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer nos services.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Google Analytics 4 (GA4)</span> - Analyse d'audience et statistiques de visite
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Hotjar</span> - Analyse du comportement utilisateur et cartes de chaleur
                  </p>
                </div>
              </div>

              {/* Gestion des cookies */}
              <div className="bg-gray-50 border-l-4 border-black p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Gestion de vos cookies</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Vous pouvez à tout moment modifier vos préférences de cookies via les paramètres de votre navigateur ou notre bannière de consentement.
                </p>
                <p className="text-gray-700 text-sm">
                  Pour plus d'informations sur la gestion des cookies :{' '}
                  <a 
                    href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 underline"
                  >
                    Guide CNIL sur les cookies
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: Sécurité */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                8. Sécurité des Données
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Accès non autorisé</p>
                    <p className="text-gray-600 text-xs mt-1">Protection par authentification</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Perte de données</p>
                    <p className="text-gray-600 text-xs mt-1">Sauvegardes régulières</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Divulgation accidentelle</p>
                    <p className="text-gray-600 text-xs mt-1">Chiffrement des données sensibles</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-red-50 rounded-lg p-4">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">Modification non autorisée</p>
                    <p className="text-gray-600 text-xs mt-1">Contrôles d'accès stricts</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  Mesures de sécurité mises en place
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Certificat SSL/TLS pour le chiffrement des communications (HTTPS)</li>
                  <li>• Hébergement sécurisé chez Vercel avec infrastructure redondante</li>
                  <li>• Accès aux données limité aux personnes autorisées uniquement</li>
                  <li>• Surveillance et détection des incidents de sécurité</li>
                  <li>• Mises à jour régulières de nos systèmes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 9: Transferts de données */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                9. Partage et Transfert de Données
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-6">
                Vos données personnelles ne sont <span className="font-semibold text-gray-900">jamais vendues</span> à des tiers. Elles peuvent être partagées uniquement dans les cas suivants :
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-green-600 pl-4 bg-green-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">✅ Prestataires de services</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Nous faisons appel à des prestataires de confiance qui traitent vos données en notre nom :
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-4">
                    <li>• Vercel (hébergement du site)</li>
                    <li>• Sanity (gestion de contenu)</li>
                    <li>• Services d'emailing (newsletters)</li>
                    <li>• Services d'analyse (GA4, Hotjar)</li>
                  </ul>
                  <p className="text-gray-600 text-xs mt-3">
                    Ces prestataires sont contractuellement tenus de garantir la sécurité et la confidentialité de vos données.
                  </p>
                </div>

                <div className="border-l-4 border-gray-600 pl-4 bg-gray-50 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">⚖️ Obligations légales</h3>
                  <p className="text-gray-700 text-sm">
                    Nous pouvons divulguer vos données si la loi l'exige (réquisition judiciaire, lutte contre la fraude, etc.).
                  </p>
                </div>

                <div className="border-l-4 border-gray-800 pl-4 bg-gray-100 p-4 rounded-r-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">🌍 Transferts hors UE</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Certains de nos prestataires sont situés hors de l'Union Européenne (notamment aux États-Unis). Ces transferts sont encadrés par :
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1 ml-4">
                    <li>• Clauses contractuelles types de la Commission Européenne</li>
                    <li>• Certifications appropriées (Privacy Shield successeurs)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Modifications */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                10. Modifications de la Politique
              </h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <p className="text-gray-700 mb-4">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment pour refléter :
              </p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Les évolutions de nos services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>Les changements légaux et réglementaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <span>L'amélioration de la protection de vos données</span>
                </li>
              </ul>
              <div className="bg-gray-50 border-l-4 border-black p-4 rounded-r-lg">
                <p className="text-gray-700 text-sm">
                  En cas de modification importante, nous vous en informerons par email ou via une notification sur notre site. La date de dernière mise à jour est indiquée en haut de cette page.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl shadow-xl p-8 sm:p-10 text-white text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Des questions sur vos données ?
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions concernant la protection de vos données personnelles.
            </p>
            <a
              href="mailto:privacy@letudiantetranger.com"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Contactez notre DPO
            </a>
            <p className="mt-4 text-sm text-gray-400">
              Réponse garantie sous 48h
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
