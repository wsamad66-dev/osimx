# 🎉 SITE EN PRODUCTION - Configuration Finale

## 🌐 URL de Production

### Domaine Principal (FIXE) :
```
https://osimx.vercel.app
```

✅ **Cette URL ne changera plus jamais !**  
✅ Plus besoin de mettre à jour Google OAuth à chaque déploiement  
✅ URL courte et professionnelle

---

## 🔐 Configuration Google OAuth

### URIs de redirection autorisées (FINALES) :

Va sur : https://console.cloud.google.com/apis/credentials

Dans ton OAuth Client ID, configure **EXACTEMENT** ces deux URIs :

```
http://localhost:3000/api/auth/callback/google
https://osimx.vercel.app/api/auth/callback/google
```

⚠️ **IMPORTANT** : 
- Pas de trailing slash `/` à la fin
- Respecte majuscules/minuscules
- `https://` pour production, `http://` pour localhost

---

## ⚙️ Variables d'environnement Vercel

Toutes configurées ✅ :

```bash
NEXTAUTH_URL=https://osimx.vercel.app
NEXTAUTH_SECRET=[auto-généré]
GOOGLE_CLIENT_ID=198269525191-fnn13pjojf7a34vs5s552p2vhfsra6vq.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-*** (masqué pour sécurité)
```

---

## 🚀 Déploiement

### Pour déployer les futures mises à jour :

```bash
# Commit tes changements
git add -A
git commit -m "feat: Nouvelle fonctionnalité"
git push origin ouassimsamad-dev

# Déployer en production
npx vercel --prod

# Assigner automatiquement à osimx.vercel.app
npx vercel alias
```

Le domaine `osimx.vercel.app` sera automatiquement mis à jour !

---

## 🧪 Tester l'authentification

### Étape 1 : Accéder au site
```
https://osimx.vercel.app/admin
```

### Étape 2 : Connexion
- Tu seras redirigé vers `/auth/signin`
- Clique **"Continuer avec Google"**
- Authentifie-toi avec ton compte Google

### Étape 3 : Accès admin
- Après authentification, tu seras redirigé vers `/admin`
- Tu auras accès au dashboard complet

---

## 🔒 Sécurité : Restreindre l'accès

### Autoriser uniquement ton email :

```bash
# Ajouter la liste des emails autorisés
echo "ton-email@gmail.com" | npx vercel env add ALLOWED_ADMIN_EMAILS production

# Redéployer
npx vercel --prod
```

### Autoriser plusieurs emails :

```bash
# Sépare par des virgules (sans espaces)
echo "admin@gmail.com,manager@gmail.com,owner@gmail.com" | npx vercel env add ALLOWED_ADMIN_EMAILS production

# Redéployer
npx vercel --prod
```

⚠️ Si `ALLOWED_ADMIN_EMAILS` n'est pas définie, **TOUS les comptes Google** peuvent se connecter !

---

## 📋 Checklist Finale

### Configuration Google OAuth :
- [x] Projet Google Cloud créé
- [x] OAuth Client ID créé
- [ ] **URIs de redirection mises à jour avec `osimx.vercel.app`**
- [x] Client ID et Secret ajoutés à Vercel

### Configuration Vercel :
- [x] Domaine `osimx.vercel.app` assigné
- [x] Variable `NEXTAUTH_URL` configurée
- [x] Variables OAuth configurées
- [x] Site déployé

### Sécurité :
- [ ] **Configurer `ALLOWED_ADMIN_EMAILS`** (recommandé)
- [ ] Tester la connexion
- [ ] Vérifier que seuls les admins peuvent accéder

---

## 🎯 Prochaines étapes

### 1. Mettre à jour Google OAuth URIs
**Action immédiate** : Va sur Google Cloud Console et met à jour les URIs avec `https://osimx.vercel.app/api/auth/callback/google`

### 2. Tester l'authentification
```bash
open https://osimx.vercel.app/admin
```

### 3. Configurer la whitelist email (optionnel mais recommandé)
```bash
echo "ton-email@gmail.com" | npx vercel env add ALLOWED_ADMIN_EMAILS production
npx vercel --prod
```

---

## 📊 URLs du projet

| Type | URL |
|------|-----|
| **Production** | https://osimx.vercel.app |
| **Admin Dashboard** | https://osimx.vercel.app/admin |
| **Auth Sign-In** | https://osimx.vercel.app/auth/signin |
| **Sanity Studio** | https://osimx.vercel.app/studio |
| **Vercel Dashboard** | https://vercel.com/ouassim-samads-projects/osimx |
| **GitHub Repo** | https://github.com/wsamad66-dev/osimx |

---

## 🐛 Dépannage

### Erreur 400 de Google OAuth
**Solution** : Vérifie que l'URI dans Google Console est **exactement** `https://osimx.vercel.app/api/auth/callback/google`

### "Access Denied"
**Solution** : Configure `ALLOWED_ADMIN_EMAILS` si tu as une whitelist, ou vérifie que ton email Google est autorisé

### Site inaccessible
**Solution** : 
```bash
# Vérifier le statut
npx vercel ls | head -3

# Redéployer si nécessaire
npx vercel --prod
```

### Variables d'environnement non prises en compte
**Solution** : Les variables sont appliquées au **prochain** déploiement. Redéploie après modification :
```bash
npx vercel --prod
```

---

## 💡 Conseils

1. **Bookmarke ces URLs** :
   - Admin : https://osimx.vercel.app/admin
   - Google OAuth : https://console.cloud.google.com/apis/credentials
   - Vercel Dashboard : https://vercel.com/ouassim-samads-projects/osimx

2. **Git workflow** :
   ```bash
   git add -A
   git commit -m "ton message"
   git push
   npx vercel --prod
   ```

3. **Monitoring** :
   ```bash
   # Voir les logs en temps réel
   npx vercel logs https://osimx.vercel.app
   
   # Voir les déploiements
   npx vercel ls
   ```

---

## 🎊 Félicitations !

Ton site est maintenant :
✅ Déployé sur un domaine fixe (`osimx.vercel.app`)  
✅ Authentification Google OAuth configurée  
✅ Prêt pour la production  
✅ Facile à maintenir (plus de changements d'URL)

**Il ne reste qu'à mettre à jour les URIs dans Google Cloud Console et tester !** 🚀

---

**Dernière mise à jour** : 15 octobre 2025  
**Statut** : ✅ Production Ready
