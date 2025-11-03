# 🚀 Déploiement Vercel - L'Étudiant Étranger

## ✅ Variables d'Environnement Configurées

### 📧 **Gmail (Système d'envoi d'emails)**
```bash
GMAIL_USER=etudaintetrangerapi@gmail.com
GMAIL_APP_PASSWORD=rycyrmgqquinwvln
NEXT_PUBLIC_TEAM_EMAIL=teametudantetranger@gmail.com
```

### 📊 **Sanity CMS** 
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=4hv0dnh9
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skT5glBAclhHPHPNCUMZyUWk0kgoUKogX76FGobW2wsqJMqmzPSI3bRt8E9DnjDCQJ8eVLRkZIA3bEAlzxsJf6E04RSLaUD0OBSxU8rmtyXhWvtgYmWVRbJx9O0QOTTcI6mADGvD7i1uNVlOfeet9sKHncq6sGQ3aQuLMRhshx4fc2AovAhy
```

---

## 📝 Changements Déployés

### 🔢 **Mise à jour des statistiques**
- ✅ **10,000+ → 500+ étudiants** partout sur le site
- Fichiers modifiés :
  - `src/app/layout.tsx` (Metadata SEO)
  - `src/components/hero/HeroSection.tsx` (Hero badge)
  - `src/config/stats.ts` (Config globale)
  - `src/app/(main)/destinations/page.tsx` (Page destinations)
  - `src/components/sections/AdvancedFAQ.tsx` (FAQ)
  - `src/components/home/PartnersBanner.tsx` (Banner partenaires)
  - `src/app/(main)/partners-test/page.tsx` (Page test)
  - `sanity/schemas/hero.ts` (Schema Sanity)
  - `scripts/update-hero-stats.ts` (Script MAJ)

### 📧 **Configuration Email**
- ✅ Email équipe : **teametudantetranger@gmail.com**
- ✅ Email API : **etudaintetrangerapi@gmail.com**
- ✅ Système 3 emails :
  1. Email client (bienvenue)
  2. Email équipe (notification)
  3. Email calendrier (formulaire rapide)

---

## 🌐 Déploiement

### **Automatique via GitHub**
Vercel détecte automatiquement les push sur `ouassimsamad-dev` et redéploie.

**Derniers commits :**
```
68a5807 - fix: Corriger erreur de syntaxe dans partners-test/page.tsx + update 10,000+ → 500+
2dd2616 - feat: Mettre à jour statistiques 10,000+ → 500+ étudiants
45e7fa3 - feat: Mettre à jour statistiques 3500+ → 500+ étudiants
```

### **Variables ajoutées sur Vercel**
```bash
npx vercel env add GMAIL_USER production
npx vercel env add GMAIL_APP_PASSWORD production
npx vercel env add NEXT_PUBLIC_TEAM_EMAIL production
```

---

## 🧪 Tests à effectuer en Production

### 1. **Vérifier les statistiques**
- [ ] Page d'accueil : Hero section affiche "500+ étudiants"
- [ ] Page destinations : Stats affichent "500+"
- [ ] Footer/Banner : "500+ étudiants placés"
- [ ] FAQ : "communauté de 500+ étudiants"

### 2. **Tester le système d'emails**
- [ ] Soumettre le formulaire rapide d'inscription
- [ ] Vérifier réception email client à l'adresse fournie
- [ ] Vérifier notification équipe sur **teametudantetranger@gmail.com**
- [ ] Vérifier format des emails (logo, design, contenu)

### 3. **Vérifier Sanity CMS**
- [ ] Accéder à `/studio` en production
- [ ] Vérifier que le contenu s'affiche correctement
- [ ] Modifier une statistique dans "Hero" pour tester

---

## 📍 URLs Importantes

### **Production**
- Site web : `https://osimx-[deployment-id].vercel.app`
- Sanity Studio : `https://[domain]/studio`

### **Tableau de bord Vercel**
- https://vercel.com/ouassim-samads-projects/osimx

### **Logs & Monitoring**
- Voir les logs de build sur Vercel Dashboard
- Vérifier les "Functions" pour les API routes

---

## 🔧 Commandes Utiles

### **Redéployer manuellement**
```bash
npx vercel --prod
```

### **Ajouter une variable d'environnement**
```bash
echo "VALEUR" | npx vercel env add NOM_VARIABLE production
```

### **Lister les variables**
```bash
npx vercel env ls
```

### **Voir les logs en temps réel**
```bash
npx vercel logs [deployment-url] --follow
```

---

## ⚠️ Notes Importantes

1. **Zcal** : Pas encore configuré. À ajouter si nécessaire pour la prise de rendez-vous.

2. **Emails Gmail** : 
   - Limite de 500 emails/jour avec un compte Gmail gratuit
   - Surveiller les quotas si volume élevé
   - Considérer un service professionnel (SendGrid, Mailgun) si dépassement

3. **Sanity** :
   - Plan gratuit : 100k requêtes/mois
   - Token API configuré (lecture + écriture)
   - Studio accessible en production

4. **Performance** :
   - Next.js 15.5.4 avec optimisations automatiques
   - Images optimisées via next/image
   - SSR + ISR activés

---

## 📞 Support

**En cas de problème :**

1. Vérifier les logs Vercel : Dashboard → Deployments → [dernier deploy] → Logs
2. Tester les variables d'environnement : `npx vercel env ls`
3. Vérifier le build local : `npm run build`
4. Redéployer : `npx vercel --prod`

**Contacts techniques :**
- Email équipe : teametudantetranger@gmail.com
- API Email : etudaintetrangerapi@gmail.com

---

**Déploiement effectué le :** 2 novembre 2025  
**Status :** ✅ En cours de déploiement automatique  
**Dernière mise à jour :** Statistiques 10,000+ → 500+ + Configuration emails Gmail
