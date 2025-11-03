# 📧 Configuration Gmail pour l'Envoi d'Emails

## 🎯 Vue d'ensemble

Le système utilise **votre compte Gmail** pour envoyer des emails automatiquement.
- ✅ **100% GRATUIT** (pas besoin de service payant)
- ✅ **500 emails/jour** (limite Gmail)
- ✅ **Configuration en 5 minutes**

## 🚀 Configuration Rapide (5 minutes)

### Étape 1: Activer la validation en 2 étapes

1. Allez sur: https://myaccount.google.com/security
2. Cliquez sur **"Validation en deux étapes"**
3. Suivez les instructions pour l'activer
4. ⚠️ **OBLIGATOIRE** pour créer un mot de passe d'application

### Étape 2: Créer un mot de passe d'application

1. Une fois la validation en 2 étapes activée, retournez sur: https://myaccount.google.com/security
2. Descendez jusqu'à **"Mots de passe d'application"**
3. Cliquez dessus
4. Sélectionnez:
   - **Application**: Mail
   - **Appareil**: Autre (appareil personnalisé)
   - **Nom**: "L'Étudiant Étranger"
5. Cliquez sur **"Générer"**
6. **Copiez le mot de passe** de 16 caractères (exemple: `abcd efgh ijkl mnop`)

### Étape 3: Ajouter dans .env.local

Ouvrez `/Users/asf/Documents/GitHub/osimx/.env.local` et ajoutez:

```bash
# Votre email Gmail
GMAIL_USER=votre-email@gmail.com

# Le mot de passe d'application (16 caractères, avec ou sans espaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Email de votre équipe
TEAM_EMAIL=contact@letudiantetranger.com
```

### Étape 4: Tester

```bash
# Le serveur doit être lancé
npm run dev

# Inscrivez un étudiant test sur le site
# Vérifiez:
# 1. Console serveur → "✅ Email envoyé"
# 2. Votre boîte Gmail → Email reçu
```

## ✅ C'est tout !

Les emails seront maintenant **réellement envoyés** depuis votre Gmail.

---

## 📊 Limites Gmail

| Limite | Valeur |
|--------|--------|
| Emails/jour | 500 emails |
| Destinataires/email | 1 |
| Taille max | 25 MB |
| Pièces jointes | Oui |

**Parfait pour commencer !** Si vous dépassez 500 emails/jour, considérez un service professionnel.

---

## 🔧 Dépannage

### ❌ Erreur: "Invalid login"

**Solution 1**: Vérifiez que la validation en 2 étapes est activée
- https://myaccount.google.com/security

**Solution 2**: Régénérez un nouveau mot de passe d'application
- Supprimez l'ancien
- Créez-en un nouveau
- Mettez à jour `.env.local`

**Solution 3**: Vérifiez que vous utilisez bien le **mot de passe d'application** (16 caractères) et pas votre mot de passe Gmail normal

### ❌ Erreur: "Username and Password not accepted"

**Cause**: Vous utilisez votre mot de passe Gmail normal au lieu du mot de passe d'application.

**Solution**: 
1. Créez un mot de passe d'application (voir Étape 2)
2. Utilisez ce mot de passe dans `GMAIL_APP_PASSWORD`

### ❌ Emails non reçus

**Vérifications**:
1. ✅ Console serveur montre "✅ Email envoyé" ?
2. ✅ Vérifiez le dossier **Spam**
3. ✅ Vérifiez l'adresse email du destinataire
4. ✅ Vérifiez les logs Gmail: https://mail.google.com/mail/u/0/#sent

### ❌ Erreur: "Daily sending quota exceeded"

**Cause**: Vous avez dépassé 500 emails/jour

**Solutions**:
- Attendez 24 heures
- Utilisez plusieurs comptes Gmail
- Passez à un service professionnel (Resend, SendGrid)

---

## 🔒 Sécurité

### ✅ Bonnes Pratiques

1. **Ne partagez JAMAIS** votre mot de passe d'application
2. **Ne commitez JAMAIS** `.env.local` dans Git
3. Utilisez un **email dédié** pour l'envoi (exemple: `noreply@votre-domaine.com`)
4. Révoquez les mots de passe d'application inutilisés

### 🔑 Gérer les mots de passe d'application

Pour voir/supprimer vos mots de passe d'application:
1. https://myaccount.google.com/security
2. Mots de passe d'application
3. Liste de tous vos mots de passe
4. Cliquez sur "Supprimer" pour révoquer

---

## 💡 Conseils

### Email Professionnel

Pour un email professionnel (ex: `noreply@letudiantetranger.com`):

**Option 1: Gmail avec domaine personnalisé** (Gratuit)
1. Configurez Gmail avec votre domaine
2. Utilisez ce compte dans `GMAIL_USER`

**Option 2: Google Workspace** ($6/mois)
1. Créez un compte Google Workspace
2. Email professionnel inclus
3. 2000 emails/jour (au lieu de 500)

### Templates Personnalisés

Les templates d'emails sont dans:
```
src/lib/email-templates.ts
```

Modifiez:
- Couleurs
- Textes
- Logo (ajoutez une image)
- Boutons

### Test en Local

Pour tester sans envoyer de vrais emails:

```typescript
// src/app/api/send-email/route.ts
// Commentez la ligne d'envoi:
// await transporter.sendMail(...)

// Et ajoutez:
console.log('📧 EMAIL TEST:', emailData.subject)
```

---

## 🆚 Gmail vs Resend

| Critère | Gmail | Resend |
|---------|-------|--------|
| Prix | **Gratuit** | Gratuit (100/jour) puis $20/mois |
| Limite/jour | 500 | 100 (gratuit) / illimité (payant) |
| Setup | 5 minutes | 10 minutes |
| Domaine perso | Oui (avec config) | Oui (facile) |
| Analytics | Non | Oui |
| Support | Community | Email/Chat |

**Recommandation**:
- **< 500 emails/jour**: Gmail ✅
- **> 500 emails/jour**: Resend ou SendGrid

---

## 📚 Ressources

- **Gmail App Passwords**: https://support.google.com/accounts/answer/185833
- **Gmail Limits**: https://support.google.com/mail/answer/22839
- **Nodemailer Docs**: https://nodemailer.com/
- **Troubleshooting**: https://nodemailer.com/usage/troubleshooting/

---

## ✅ Checklist

- [ ] Validation en 2 étapes activée sur Gmail
- [ ] Mot de passe d'application créé
- [ ] `GMAIL_USER` ajouté dans `.env.local`
- [ ] `GMAIL_APP_PASSWORD` ajouté dans `.env.local`
- [ ] `TEAM_EMAIL` configuré
- [ ] Nodemailer installé (`npm install nodemailer`)
- [ ] Serveur relancé (`npm run dev`)
- [ ] Test d'inscription effectué
- [ ] Email client reçu
- [ ] Email équipe reçu

---

**🎉 Système prêt !** Les emails sont maintenant envoyés depuis votre Gmail gratuitement.
