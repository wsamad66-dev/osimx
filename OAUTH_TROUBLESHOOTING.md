# 🔧 Google OAuth - Guide de Dépannage

## ❌ Erreur 400 : "The server cannot process the request"

### Cause principale
L'URI de redirection dans votre code **NE CORRESPOND PAS** à celle configurée dans Google Cloud Console.

---

## ✅ Solution étape par étape

### 1️⃣ Vérifier l'URL de votre déploiement actuel

```bash
npx vercel ls | head -3
```

Exemple de sortie :
```
Age     Deployment                                                     Status
8m      https://osimx-865dx14n5-ouassim-samads-projects.vercel.app     ● Ready
```

**Copiez l'URL complète** (exemple: `https://osimx-865dx14n5-ouassim-samads-projects.vercel.app`)

---

### 2️⃣ Aller dans Google Cloud Console

1. **Allez sur** : https://console.cloud.google.com/apis/credentials
2. **Sélectionnez votre projet**
3. **Cliquez sur votre "ID client OAuth 2.0"** (commence par `198269525191-...`)

---

### 3️⃣ Mettre à jour les URIs de redirection

Dans la section **"URIs de redirection autorisés"**, vous devez avoir **EXACTEMENT** :

```
http://localhost:3000/api/auth/callback/google
https://osimx-865dx14n5-ouassim-samads-projects.vercel.app/api/auth/callback/google
```

⚠️ **REMPLACEZ** `osimx-865dx14n5` par votre URL de déploiement actuelle !

**Cliquez "ENREGISTRER"** en bas de la page.

---

### 4️⃣ Mettre à jour la variable d'environnement Vercel

```bash
# Supprimer l'ancienne
npx vercel env rm NEXTAUTH_URL production --yes

# Ajouter la nouvelle (REMPLACEZ par votre URL)
echo "https://osimx-VOTRE-ID-ouassim-samads-projects.vercel.app" | npx vercel env add NEXTAUTH_URL production
```

---

### 5️⃣ Redéployer

```bash
npx vercel --prod
```

Attendez 2-3 minutes que le build se termine.

---

### 6️⃣ Tester

1. Allez sur `https://votre-site.vercel.app/admin`
2. Cliquez "Continuer avec Google"
3. Authentifiez-vous
4. Vous devriez être redirigé vers `/admin` ✅

---

## 🔍 Autres erreurs possibles

### Erreur : "redirect_uri_mismatch"

**Cause** : L'URI ne correspond PAS exactement  
**Solution** : Vérifiez caractère par caractère (http vs https, trailing slash, etc.)

### Erreur : "access_denied"

**Cause** : L'utilisateur a refusé l'accès ou le client ID est invalide  
**Solution** : Revérifiez vos credentials Google

### Erreur : "invalid_client"

**Cause** : GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET invalide  
**Solution** : Regénérez les credentials dans Google Cloud Console

---

## 📋 Checklist de vérification

- [ ] Google Cloud Console : URI de redirection configurée
- [ ] Vercel : Variable NEXTAUTH_URL mise à jour
- [ ] URI correspond EXACTEMENT entre Google et Vercel
- [ ] Pas de trailing slash (`/`) à la fin
- [ ] `https://` (pas `http://`) pour production
- [ ] Site redéployé après modifications

---

## 💡 Astuce : Utiliser un domaine personnalisé

Si vous avez un domaine (ex: `osimx.com`), ajoutez-le dans Vercel :

```bash
npx vercel domains add osimx.com
```

Puis dans Google Cloud Console :
```
https://osimx.com/api/auth/callback/google
```

Et dans Vercel :
```bash
echo "https://osimx.com" | npx vercel env add NEXTAUTH_URL production
```

Cela évitera de changer l'URI à chaque déploiement !

---

## 🆘 Besoin d'aide ?

1. Vérifiez que l'URL dans Google Console est **identique** à celle de Vercel
2. Attendez 1-2 minutes après avoir modifié Google Console (cache)
3. Essayez en navigation privée / incognito
4. Vérifiez les logs Vercel : `npx vercel logs [URL]`

---

**Dernière mise à jour** : 15 octobre 2025
