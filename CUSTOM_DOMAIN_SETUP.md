# 🌐 Configuration Domaine Custom - Guide Complet

## 🎯 Pourquoi un domaine custom ?

✅ **URL fixe** : Plus besoin de mettre à jour Google OAuth à chaque déploiement  
✅ **Professionnel** : `osimx.com` au lieu de `osimx-xxx.vercel.app`  
✅ **Simple** : Configure une fois, ça marche pour toujours  

---

## 📋 Option 1 : Tu as DÉJÀ un domaine

Si tu as déjà acheté un domaine (ex: `osimx.com`, `osimx.fr`, etc.) :

### Étape 1 : Ajouter le domaine dans Vercel

```bash
npx vercel domains add osimx.com
```

Remplace `osimx.com` par ton vrai domaine.

### Étape 2 : Configurer les DNS

Vercel te donnera des instructions comme :

```
Add these DNS records to your domain:

Type    Name    Value
CNAME   www     cname.vercel-dns.com
A       @       76.76.21.21
```

Va dans ton registrar (OVH, Namecheap, GoDaddy, etc.) et ajoute ces enregistrements.

### Étape 3 : Attendre la propagation DNS (5-30 minutes)

```bash
# Vérifier le statut
npx vercel domains ls
```

---

## 📋 Option 2 : Tu n'as PAS encore de domaine

### Acheter un domaine pas cher :

**Recommandations** :
- **Namecheap** : https://www.namecheap.com (~$10/an pour `.com`)
- **Porkbun** : https://porkbun.com (~$9/an pour `.com`)
- **OVH** : https://www.ovh.com (~15€/an pour `.fr`)
- **Vercel** : Tu peux aussi acheter directement via Vercel

### Domaines gratuits (temporaires) :

Pour tester sans payer :
- **Vercel subdomain** : `osimx.vercel.app` (gratuit, mais moins flexible)
- **.is-a.dev** : https://github.com/is-a-dev/register (gratuit pour dev)
- **Freenom** : `.tk`, `.ml`, `.ga` (gratuit mais peu fiable)

---

## 🚀 Configuration complète avec domaine custom

### Étape 1 : Ajouter le domaine

```bash
# Remplace par ton domaine
npx vercel domains add osimx.com
```

### Étape 2 : Configurer comme domaine de production

```bash
npx vercel --prod
```

Vercel détectera automatiquement ton domaine custom.

### Étape 3 : Mettre à jour NEXTAUTH_URL

```bash
# Supprimer l'ancienne
npx vercel env rm NEXTAUTH_URL production --yes

# Ajouter la nouvelle
echo "https://osimx.com" | npx vercel env add NEXTAUTH_URL production
```

### Étape 4 : Mettre à jour Google Cloud Console

1. **Va sur** : https://console.cloud.google.com/apis/credentials
2. **Clique sur ton OAuth Client ID**
3. **Dans "URIs de redirection autorisés", REMPLACE par** :

```
http://localhost:3000/api/auth/callback/google
https://osimx.com/api/auth/callback/google
```

4. **Clique "ENREGISTRER"**

### Étape 5 : Redéployer

```bash
npx vercel --prod
```

### Étape 6 : Tester

```bash
# Ouvrir dans le navigateur
open https://osimx.com/admin
```

---

## 🎯 Configuration recommandée : avec www

Pour supporter à la fois `osimx.com` ET `www.osimx.com` :

```bash
# Ajouter le domaine principal
npx vercel domains add osimx.com

# Ajouter le sous-domaine www
npx vercel domains add www.osimx.com
```

Vercel redirigera automatiquement `www` vers le domaine principal.

---

## 📝 Après configuration

### Variables d'environnement :

```bash
NEXTAUTH_URL=https://osimx.com
NEXTAUTH_SECRET=[généré automatiquement]
GOOGLE_CLIENT_ID=[votre client ID]
GOOGLE_CLIENT_SECRET=[votre secret]
```

### Google OAuth URIs :

```
http://localhost:3000/api/auth/callback/google
https://osimx.com/api/auth/callback/google
```

**C'EST TOUT !** Plus besoin de changer quoi que ce soit à l'avenir ! ✅

---

## 🔧 Commandes utiles

### Lister les domaines configurés

```bash
npx vercel domains ls
```

### Retirer un domaine

```bash
npx vercel domains rm osimx.com
```

### Vérifier le statut DNS

```bash
dig osimx.com +short
# Devrait retourner l'IP de Vercel : 76.76.21.21
```

### Forcer la propagation SSL

```bash
npx vercel certs issue osimx.com
```

---

## 🆘 Problèmes courants

### "Domain is already in use"

**Cause** : Le domaine est déjà utilisé par un autre projet Vercel  
**Solution** : 
```bash
npx vercel domains rm osimx.com --scope autre-projet
npx vercel domains add osimx.com
```

### "DNS not configured"

**Cause** : Les enregistrements DNS ne pointent pas vers Vercel  
**Solution** : Vérifie dans ton registrar que tu as bien ajouté les enregistrements DNS

### "Invalid certificate"

**Cause** : SSL pas encore provisionné  
**Solution** : Attends 5-10 minutes, ou force avec :
```bash
npx vercel certs issue osimx.com
```

### "ERR_TOO_MANY_REDIRECTS"

**Cause** : Conflit entre Vercel et ton registrar  
**Solution** : Désactive le "SSL/TLS" ou "HTTPS redirect" dans ton registrar

---

## 💰 Coûts

| Service | Coût |
|---------|------|
| **Domaine .com** | ~$10/an |
| **Domaine .fr** | ~15€/an |
| **Hébergement Vercel** | **GRATUIT** (Hobby plan) |
| **SSL Certificate** | **GRATUIT** (inclus Vercel) |
| **Bandwidth** | **GRATUIT** (100GB/mois) |

**Total** : ~$10/an (juste le domaine) 🎉

---

## 🎯 Prochaines étapes

1. Achète un domaine (ou utilise un existant)
2. Configure les DNS
3. Attends 5-30 minutes la propagation
4. Met à jour Google OAuth
5. Redéploie
6. Profite de ton site avec une vraie URL ! 🚀

---

## 📞 Besoin d'aide ?

**Vercel Support** : https://vercel.com/support  
**DNS Checker** : https://dnschecker.org  
**SSL Checker** : https://www.sslshopper.com/ssl-checker.html

---

**Dernière mise à jour** : 15 octobre 2025
