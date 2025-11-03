# 🔧 Fix Emails Non Reçus en Production

## ❌ Problème Actuel

**Les emails fonctionnent en local (`localhost:3000`) mais PAS en production (`osimx.vercel.app`)**

### Erreur Détectée

```json
{
  "error": "Échec de l'envoi de l'email",
  "details": "Error: Missing credentials for \"PLAIN\""
}
```

Cette erreur signifie que **les variables d'environnement Gmail ne sont pas chargées** par le code en production.

---

## ✅ Solution Complète

### Étape 1: Vérifier les Variables sur Vercel

Les variables suivantes doivent exister sur Vercel :

```bash
# Vérifier via CLI
npx vercel env ls production | grep -E "GMAIL|TEAM_EMAIL"
```

**Variables requises :**
- `GMAIL_USER` = `etudaintetrangerapi@gmail.com`
- `GMAIL_APP_PASSWORD` = `rycyrmgqquinwvln`
- `NEXT_PUBLIC_TEAM_EMAIL` = `teametudantetranger@gmail.com`

✅ **Ces 3 variables existent déjà sur Vercel**

---

### Étape 2: Forcer Redéploiement

Le problème vient du fait que Vercel n'a pas rechargé les variables après leur ajout.

```bash
# Forcer un nouveau déploiement
git commit --allow-empty -m "fix: Force redéploiement pour charger variables Gmail"
git push
```

✅ **Fait - Commit `63095c8` poussé**

---

### Étape 3: Attendre le Déploiement

⏱️ **ATTENDEZ 3-5 MINUTES** que Vercel termine le build

```bash
# Vérifier le statut du déploiement
npx vercel ls osimx | head -5
```

**Statut attendu :** `● Ready` (pas `● Error` ni `● Building`)

---

### Étape 4: Pointer l'Alias vers le Bon Déploiement

Une fois qu'un déploiement montre `● Ready`, pointez l'alias dessus :

```bash
# Remplacer par l'URL du dernier déploiement Ready
npx vercel alias https://osimx-XXXXXXX-ouassim-samads-projects.vercel.app osimx.vercel.app
```

---

### Étape 5: Tester l'Email en Production

```bash
# Test direct de l'API
curl -X POST https://osimx.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Production",
    "email": "test@example.com",
    "phone": "+221771234567",
    "country": "Sénégal",
    "type": "team-notification"
  }'
```

**Réponse attendue si ça marche :**
```json
{
  "success": true,
  "messageId": "<xxxxx@gmail.com>"
}
```

**Réponse si ça échoue toujours :**
```json
{
  "error": "Échec de l'envoi de l'email",
  "details": "Error: Missing credentials for \"PLAIN\""
}
```

---

## 🔍 Si Ça Ne Marche Toujours Pas

### Option A: Vérifier les Logs Vercel

1. Aller sur https://vercel.com/ouassim-samads-projects/osimx
2. Cliquer sur le dernier déploiement `● Ready`
3. Aller dans l'onglet **"Functions"**
4. Cliquer sur `/api/send-email`
5. Regarder les logs pour voir les erreurs exactes

### Option B: Re-créer les Variables

Parfois Vercel a des problèmes de cache. Supprimez et recréez les variables :

```bash
# Supprimer les anciennes variables
npx vercel env rm GMAIL_USER production
npx vercel env rm GMAIL_APP_PASSWORD production
npx vercel env rm NEXT_PUBLIC_TEAM_EMAIL production

# Les recréer
echo "etudaintetrangerapi@gmail.com" | npx vercel env add GMAIL_USER production
echo "rycyrmgqquinwvln" | npx vercel env add GMAIL_APP_PASSWORD production
echo "teametudantetranger@gmail.com" | npx vercel env add NEXT_PUBLIC_TEAM_EMAIL production

# Forcer redéploiement
git commit --allow-empty -m "fix: Recréer variables Gmail"
git push
```

### Option C: Vérifier Gmail App Password

Le mot de passe d'application Gmail peut expirer. Vérifiez :

1. Allez sur https://myaccount.google.com/apppasswords
2. Connectez-vous avec `etudaintetrangerapi@gmail.com`
3. Créez un **nouveau** mot de passe d'application :
   - Nom : "Vercel Production Email"
   - Copiez le mot de passe généré (16 caractères)
4. Mettez à jour la variable sur Vercel :

```bash
# Remplacer par le nouveau mot de passe
echo "NOUVEAU_MOT_DE_PASSE" | npx vercel env add GMAIL_APP_PASSWORD production --force
```

### Option D: Vérifier le Code API

Le fichier `src/app/api/send-email/route.ts` doit contenir :

```typescript
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,        // ← Important
    pass: process.env.GMAIL_APP_PASSWORD, // ← Important
  },
})
```

**VÉRIFIEZ** qu'il n'y a pas de fautes de frappe dans les noms de variables.

---

## ✅ Checklist de Validation

Après avoir appliqué les corrections, vérifiez :

- [ ] Les 3 variables existent sur Vercel (`npx vercel env ls production`)
- [ ] Le dernier déploiement est `● Ready` (pas d'erreur)
- [ ] L'alias `osimx.vercel.app` pointe vers ce déploiement
- [ ] Le test curl retourne `{"success": true}`
- [ ] Soumission du formulaire "Inscription Rapide" envoie l'email
- [ ] L'email arrive dans `teametudantetranger@gmail.com` (vérifier spam)

---

## 📊 Statut Actuel (3 novembre 2025, ~16h30)

| Item | Statut | Notes |
|------|--------|-------|
| Variables Gmail sur Vercel | ✅ | GMAIL_USER, GMAIL_APP_PASSWORD, NEXT_PUBLIC_TEAM_EMAIL |
| Commit de redéploiement | ✅ | Commit `63095c8` poussé |
| Build Vercel | ❌ | Plusieurs déploiements en `● Error` |
| Alias production | ⚠️ | Pointe vers `osimx-los6vrsb9` (vieux déploiement) |
| Test email production | ❌ | Erreur "Missing credentials for PLAIN" |

### ⚠️ **PROBLÈME ACTUEL : ERREURS DE BUILD VERCEL**

Les derniers déploiements échouent lors du build. Il faut d'abord **résoudre les erreurs de build** avant que les emails puissent fonctionner.

**Actions immédiates :**

1. **Aller sur le dashboard Vercel** : https://vercel.com/ouassim-samads-projects/osimx
2. **Cliquer sur le dernier déploiement en erreur** (rouge)
3. **Lire les logs de build** pour voir l'erreur exacte
4. **Corriger l'erreur** dans le code
5. **Push le fix** → Vercel redéploiera automatiquement
6. **Attendre que le statut soit `● Ready`**
7. **Pointer l'alias** vers ce nouveau déploiement
8. **Tester l'email** avec curl

---

## 📝 Notes Importantes

1. **Les emails fonctionnent en local** → Le code est correct
2. **L'erreur en production** = Variables d'environnement non chargées
3. **Les builds échouent** → Il faut d'abord corriger les erreurs de build Vercel
4. **Une fois le build OK** → L'email devrait fonctionner automatiquement

---

## 🆘 Besoin d'Aide Supplémentaire ?

Si après avoir appliqué toutes ces solutions le problème persiste :

1. **Partagez les logs de build Vercel** (copier/coller l'erreur complète)
2. **Testez en local** pour confirmer que ça marche vraiment
3. **Vérifiez les quotas Gmail** : Max 500 emails/jour pour comptes gratuits
4. **Considérez un service email professionnel** : SendGrid, Mailgun, Resend

---

**Créé le :** 3 novembre 2025  
**Dernier commit :** `63095c8` - Force redéploiement Gmail  
**Statut :** 🔴 EN ATTENTE - Résolution erreurs build Vercel requise
