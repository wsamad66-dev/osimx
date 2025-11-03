# 📧 Fix: Emails ne Fonctionnent Pas en Production

**Date:** 3 novembre 2025  
**Problème:** Les inscriptions envoient des emails en local mais pas sur https://osimx.vercel.app/  
**Statut:** 🔄 EN COURS - Redéploiement forcé

---

## 🐛 Symptômes

- ✅ **Local (localhost:3000):** Emails reçus sur `teametudantetranger@gmail.com`
- ❌ **Production (osimx.vercel.app):** Aucun email reçu
- 📝 **Formulaire:** Inscription rapide se soumet sans erreur apparente

---

## 🔍 Diagnostic

### Variables d'Environnement Requises

```bash
GMAIL_USER=etudaintetrangerapi@gmail.com
GMAIL_APP_PASSWORD=rycyrmgqquinwvln
NEXT_PUBLIC_TEAM_EMAIL=teametudantetranger@gmail.com
```

### Vérification sur Vercel

1. Aller sur https://vercel.com/ouassim-samads-projects/osimx
2. Settings > Environment Variables
3. Vérifier que ces 3 variables existent pour "Production"

---

## ✅ Solution Appliquée

### 1. Variables Ajoutées sur Vercel

Les variables ont été ajoutées via CLI:
```bash
npx vercel env add GMAIL_USER production
npx vercel env add GMAIL_APP_PASSWORD production
npx vercel env add NEXT_PUBLIC_TEAM_EMAIL production
```

**Note:** Si erreur "already exists" → les variables existent déjà ✅

### 2. Redéploiement Forcé

Commit: `bc1b7f7` - Force redéploiement pour charger les variables

```bash
git commit --allow-empty -m "chore: Force redéploiement Vercel pour variables Gmail"
git push origin ouassimsamad-dev
```

---

## 🧪 Comment Tester

### Test Complet en Production

1. **Attendre 2-3 minutes** que Vercel termine le build
2. **Aller sur:** https://osimx.vercel.app/
3. **Cliquer:** Bouton "Inscription Rapide" ou "Je m'inscris"
4. **Remplir le formulaire:**
   - Nom: Test Production
   - Email: votre-email@test.com
   - Téléphone: +221 77 123 4567
   - Pays: Sénégal
5. **Soumettre**
6. **Vérifier:** `teametudantetranger@gmail.com` (email de l'équipe)
   - Délai: 30 secondes à 2 minutes
   - Dossier spam si pas dans boîte de réception

### Vérifier les Logs Vercel

1. Dashboard Vercel > Deployments
2. Cliquer sur le dernier déploiement
3. Onglet "Functions"
4. Chercher `/api/send-email`
5. Regarder les logs pour:
   - `📧 Email à envoyer:` → Données du formulaire
   - `✅ Email envoyé:` → Succès
   - `❌ Erreur envoi email:` → Erreur

---

## 🔧 Code Impliqué

### API Route: `/api/send-email`

**Fichier:** `src/app/api/send-email/route.ts`

```typescript
// Configuration Gmail avec Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,           // ← Doit être défini sur Vercel
    pass: process.env.GMAIL_APP_PASSWORD,   // ← Doit être défini sur Vercel
  },
})

// Envoyer l'email
const info = await transporter.sendMail({
  from: `"L'Étudiant Étranger" <${process.env.GMAIL_USER}>`,
  to: to,  // teametudantetranger@gmail.com
  subject: emailData.subject,
  html: emailData.html,
})
```

### Composant: QuickRegistrationModal

**Fichier:** `src/components/registration/QuickRegistrationModal.tsx`

```typescript
// Envoi email à l'équipe
const emailResponse = await fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    to: process.env.NEXT_PUBLIC_TEAM_EMAIL || 'teametudantetranger@gmail.com',
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    country: data.country,
    type: 'team-notification',
  }),
})
```

---

## 🚨 Problèmes Possibles

### 1. Variables Non Chargées

**Symptôme:** Email ne part pas, erreur "Auth failed" dans les logs

**Solution:**
```bash
# Re-créer les variables sur Vercel
npx vercel env rm GMAIL_USER production
npx vercel env rm GMAIL_APP_PASSWORD production
npx vercel env add GMAIL_USER production
npx vercel env add GMAIL_APP_PASSWORD production

# Forcer nouveau déploiement
git commit --allow-empty -m "fix: Re-configure Gmail env vars"
git push
```

### 2. Mot de Passe d'Application Gmail Invalide

**Symptôme:** Erreur "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:**
1. Aller sur https://myaccount.google.com/apppasswords
2. Connecté avec `etudaintetrangerapi@gmail.com`
3. Créer un nouveau mot de passe d'application
4. Remplacer sur Vercel:
   ```bash
   npx vercel env rm GMAIL_APP_PASSWORD production
   echo "NOUVEAU_MOT_DE_PASSE" | npx vercel env add GMAIL_APP_PASSWORD production
   ```

### 3. Gmail Bloque l'Envoi

**Symptôme:** Emails ne partent pas, pas d'erreur dans les logs

**Vérifications:**
- Aller sur https://myaccount.google.com/notifications
- Vérifier les alertes de sécurité
- Si Gmail bloque: Autoriser "Applications moins sécurisées" (déconseillé)
- **Mieux:** Utiliser OAuth2 au lieu du mot de passe d'application

### 4. Rate Limiting Gmail

**Symptôme:** Premiers emails passent, puis plus rien

**Limites Gmail:**
- 500 emails/jour pour compte gratuit
- 100 emails/jour pour nouveaux comptes

**Solution:**
- Monitorer le nombre d'emails envoyés
- Implémenter un système de queue si besoin
- Passer à un service professionnel (SendGrid, Mailgun, etc.)

---

## 📊 Monitoring

### Logs à Surveiller

**Dans Vercel Functions:**
```
📧 Email à envoyer: { to: 'teametudantetranger@gmail.com', ... }
✅ Email envoyé: <message-id>
```

**Si erreur:**
```
❌ Erreur envoi email: Error: Invalid login: 535-5.7.8
```

### Métriques

- **Taux de succès:** 100% attendu
- **Délai d'envoi:** < 5 secondes
- **Taux d'ouverture:** Vérifier dans Gmail

---

## 🎯 Checklist de Validation

Avant de déclarer "ça marche":

- [ ] Variables présentes dans Vercel Dashboard
- [ ] Build production réussi sans erreur
- [ ] Test formulaire en production
- [ ] Email reçu dans `teametudantetranger@gmail.com`
- [ ] Email bien formaté avec toutes les infos
- [ ] Délai < 2 minutes
- [ ] Pas dans spam

---

## 📚 Ressources

- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Nodemailer Gmail:** https://nodemailer.com/usage/using-gmail/
- **Vercel Env Vars:** https://vercel.com/docs/concepts/projects/environment-variables
- **API Route:** `src/app/api/send-email/route.ts`

---

## 🔄 Timeline

- **14:30** - Variables ajoutées sur Vercel
- **14:32** - Commit `bc1b7f7` forcé pour redéploiement
- **14:35** - Build Vercel en cours
- **14:38** - Test à effectuer sur osimx.vercel.app

---

**Créé le:** 3 novembre 2025  
**Auteur:** Assistant de Développement  
**Statut:** 🔄 EN ATTENTE DE TEST PRODUCTION
