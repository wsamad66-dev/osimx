import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full text-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <ShieldX className="w-10 h-10 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Accès non autorisé
          </h1>
          
          <p className="text-gray-600 mb-8">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page. 
            Contactez un administrateur si vous pensez qu'il s'agit d'une erreur.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
            >
              Retour à l'accueil
            </Link>
            
            <Link
              href="/sign-in"
              className="block w-full py-3 px-4 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg transition-colors"
            >
              Se connecter avec un autre compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
