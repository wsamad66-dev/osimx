# 🔐 Configuration de l'Authentification NextAuth.js

## ✅ NextAuth.js est maintenant installé !

NextAuth.js est une solution d'authentification **100% gratuite** qui fonctionne avec Google, GitHub, et plein d'autres providers.

## 📋 Pour activer l'authentification :

### Option 1 : Google OAuth (Recommandé)

1. **Créer des identifiants Google** :
   - Allez sur https://console.cloud.google.com/apis/credentials
   - Créez un nouveau projet (ou sélectionnez-en un)
   - Cliquez sur **"Créer des identifiants"** → **"ID client OAuth 2.0"**
   - Type d'application : **Application Web**
   - URI de redirection autorisées :
     ```
     http://localhost:3000/api/auth/callback/google
     https://votre-domaine.vercel.app/api/auth/callback/google
     ```

2. **Copier les clés** :
   - Copiez le **Client ID** et le **Client Secret**
   - Mettez-les dans `.env.local` :
     ```env
     GOOGLE_CLIENT_ID=votre-client-id
     GOOGLE_CLIENT_SECRET=votre-client-secret
     ```

### Option 2 : GitHub OAuth

1. **Créer une OAuth App GitHub** :
   - Allez sur https://github.com/settings/developers
   - Cliquez sur **"New OAuth App"**
   - Application name : `OSIMX Admin`
   - Homepage URL : `http://localhost:3000`
   - Authorization callback URL : `http://localhost:3000/api/auth/callback/github`

2. **Copier les clés** :
   - Copiez le **Client ID**
   - Générez un **Client Secret**
   - Mettez-les dans `.env.local` :
     ```env
     GITHUB_ID=votre-client-id
     GITHUB_SECRET=votre-client-secret
     ```

## 🔒 Sécurité : Liste blanche d'emails

Pour restreindre l'accès admin à certains emails uniquement :

```env
ALLOWED_ADMIN_EMAILS=votre-email@gmail.com,autre-admin@gmail.com
```

Si cette variable est vide, **tous** les utilisateurs authentifiés auront accès.

## 🚀 Déploiement sur Vercel

1. Ajoutez les variables d'environnement sur Vercel :
   ```bash
   npx vercel env add NEXTAUTH_SECRET
   npx vercel env add NEXTAUTH_URL
   npx vercel env add GOOGLE_CLIENT_ID
   npx vercel env add GOOGLE_CLIENT_SECRET
   ```

2. Pour `NEXTAUTH_URL` en production, utilisez :
   ```
   https://votre-domaine.vercel.app
   ```

## 📦 Fichiers créés

- `src/app/api/auth/[...nextauth]/route.ts` - Configuration NextAuth
- `src/app/auth/signin/page.tsx` - Page de connexion personnalisée
- `src/middleware.ts` - Protection des routes admin
- `src/components/providers/SessionProvider.tsx` - Provider de session
- `types/next-auth.d.ts` - Types TypeScript

## 🎨 Personnalisation

La page de connexion est dans `src/app/auth/signin/page.tsx`.
Vous pouvez la personnaliser avec votre logo, couleurs, etc.

## 📝 Tester en local

1. Configurez au moins un provider (Google ou GitHub)
2. Redémarrez le serveur : `npm run dev`
3. Allez sur http://localhost:3000/admin
4. Vous serez redirigé vers la page de connexion
5. Connectez-vous avec Google ou GitHub
6. Vous serez redirigé vers `/admin` une fois connecté

## 🆘 Besoin d'aide ?

- Documentation NextAuth : https://next-auth.js.org
- Google OAuth : https://console.cloud.google.com
- GitHub OAuth : https://github.com/settings/developers
