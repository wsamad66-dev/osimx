# ⚡ GUIDE RAPIDE - 5 MINUTES

## 🎯 Votre site est déployé SANS authentification

**URL actuelle** : https://osimx-7af7l9gqf-ouassim-samads-projects.vercel.app

✅ Pages publiques fonctionnent (home, blog, destinations, contact)  
❌ Admin inaccessible (pas encore d'auth configurée)

---

## 🔐 Activer l'authentification en 5 minutes

### 🔵 Méthode 1 : Google OAuth (LA PLUS SIMPLE)

#### Étape 1 : Google Cloud Console
```
1. Allez sur https://console.cloud.google.com/apis/credentials
2. Créez un projet (si nouveau) ou sélectionnez-en un
3. Cliquez "Créer des identifiants" → "ID client OAuth 2.0"
4. Type d'application : "Application Web"
5. Nom : "OSIMX Admin"
```

#### Étape 2 : Configurer les redirections
```
URI de redirection autorisées :
  http://localhost:3000/api/auth/callback/google
  https://osimx.vercel.app/api/auth/callback/google
```

✅ **URL FIXE** : `osimx.vercel.app` ne changera plus, configuration permanente !

#### Étape 3 : Copier les clés
Vous obtiendrez :
- **Client ID** : quelque-chose.apps.googleusercontent.com
- **Client Secret** : GOCSPX-xxxxx

#### Étape 4 : Ajouter sur Vercel
```bash
echo "VOTRE_CLIENT_ID" | npx vercel env add GOOGLE_CLIENT_ID production
echo "VOTRE_CLIENT_SECRET" | npx vercel env add GOOGLE_CLIENT_SECRET production
```

#### Étape 5 : Redéployer
```bash
npx vercel --prod
```

**C'EST TOUT !** ✅

---

### ⚫ Méthode 2 : GitHub OAuth (ALTERNATIVE)

#### Étape 1 : GitHub Settings
```
1. https://github.com/settings/developers
2. "New OAuth App"
3. Application name : "OSIMX Admin"
4. Homepage URL : https://osimx-7af7l9gqf-ouassim-samads-projects.vercel.app
5. Callback URL : https://osimx-7af7l9gqf-ouassim-samads-projects.vercel.app/api/auth/callback/github
```

#### Étape 2 : Ajouter sur Vercel
```bash
echo "VOTRE_CLIENT_ID" | npx vercel env add GITHUB_ID production
echo "VOTRE_CLIENT_SECRET" | npx vercel env add GITHUB_SECRET production
```

#### Étape 3 : Redéployer
```bash
npx vercel --prod
```

---

## 🎉 Après configuration

1. Allez sur https://votre-site.vercel.app/admin
2. Vous serez redirigé vers `/auth/signin`
3. Cliquez "Continuer avec Google" (ou GitHub)
4. Authentifiez-vous
5. Vous êtes redirigé vers `/admin` ✅

---

## 🔒 Restreindre l'accès (Optionnel)

Pour n'autoriser que votre email :

```bash
echo "votre-email@gmail.com" | npx vercel env add ALLOWED_ADMIN_EMAILS production
npx vercel --prod
```

---

## 📋 Checklist

- [ ] Compte Google Cloud créé
- [ ] OAuth credentials créés
- [ ] URI de redirection configurées
- [ ] Variables ajoutées sur Vercel
- [ ] Site redéployé
- [ ] Connexion testée sur `/admin`

---

## 💡 Besoin d'aide ?

Lisez la doc complète : `docs/NEXTAUTH_COMPLETE.md`

Ou posez-moi des questions ! 😊
