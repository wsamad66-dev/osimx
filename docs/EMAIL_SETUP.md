# 📧 Configuration du Système d'Emails

## Vue d'ensemble

Le système d'emails automatiques envoie 2 emails lors de chaque inscription:

1. **Email Client** → Envoyé à l'étudiant qui s'inscrit
   - Message de bienvenue personnalisé
   - Récapitulatif de ses informations
   - Prochaines étapes
   - Coordonnées de contact

2. **Email Équipe** → Envoyé à votre équipe commerciale
   - Notification de nouvelle inscription
   - Détails du prospect (nom, email, téléphone, pays)
   - Boutons d'action rapides (WhatsApp, Email, Appel)
   - Rappel de contacter sous 2 heures

## 🎨 Templates

Les templates HTML sont dans `/src/lib/email-templates.ts`:

- `getClientWelcomeEmail()` - Email de bienvenue client
- `getTeamNotificationEmail()` - Notification équipe

Personnalisez-les avec vos couleurs, logos et messages.

## ⚙️ Configuration

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (100 emails/jour gratuits)
3. Vérifiez votre domaine ou utilisez le domaine de test

### 2. Obtenir votre clé API

1. Dans le dashboard Resend, allez dans **API Keys**
2. Créez une nouvelle clé API
3. Copiez la clé (elle commence par `re_...`)

### 3. Configurer les variables d'environnement

Ajoutez dans `.env.local`:

```bash
# Resend API Key
RESEND_API_KEY=re_votre_cle_api_ici
```

### 4. Installer le package Resend

```bash
npm install resend
```

### 5. Activer l'envoi d'emails

Dans `/src/app/api/send-email/route.ts`, décommentez les lignes:

```typescript
// Ligne 3: décommenter
import { Resend } from 'resend'

// Ligne 5: décommenter
const resend = new Resend(process.env.RESEND_API_KEY)

// Lignes 32-50: décommenter tout le bloc Resend
```

### 6. Configurer l'email de l'équipe

Dans `/src/components/registration/QuickRegistrationModal.tsx`, ligne 136:

```typescript
to: 'votre-email@letudiantetranger.com', // Changez cet email
```

### 7. Vérifier votre domaine (Production)

Pour envoyer depuis `@letudiantetranger.com`:

1. Dans Resend dashboard → **Domains**
2. Ajoutez votre domaine
3. Configurez les enregistrements DNS (SPF, DKIM)
4. Attendez la vérification (~24h)

**En attendant**, vous pouvez utiliser:
```typescript
from: 'onboarding@resend.dev' // Email de test Resend
```

## 🧪 Test en Développement

Actuellement, les emails sont **simulés** (pas envoyés):

```bash
# Dans la console du serveur, vous verrez:
📧 Email à envoyer: {
  to: 'client@email.com',
  subject: '🎉 Bienvenue à L\'Étudiant Étranger !',
  type: 'client-welcome',
  name: 'John Doe',
  phone: '+221 77 123 45 67',
  country: 'Sénégal'
}
```

Pour tester les **vrais emails**:

1. Configurez Resend (étapes 1-5 ci-dessus)
2. Inscrivez un étudiant test
3. Vérifiez votre boîte email

## 📝 Personnalisation

### Changer le sujet de l'email

Dans `/src/lib/email-templates.ts`:

```typescript
export const getClientWelcomeEmail = (data) => {
  return {
    subject: '🎉 Votre nouveau sujet ici !', // ← Modifiez ici
    html: `...`
  }
}
```

### Changer le design

Les emails utilisent des **tableaux HTML** pour compatibilité maximum:

- **Couleurs**: Cherchez `background-color`, `color` dans le HTML
- **Logo**: Ajoutez `<img src="https://votre-logo.png">`
- **Texte**: Modifiez directement dans le template

### Ajouter des images

```html
<img 
  src="https://votre-cdn.com/image.png" 
  alt="Description" 
  style="max-width: 100%; height: auto;"
/>
```

**Important**: Utilisez des URLs absolues (pas de chemins relatifs).

## 🚀 Déploiement Vercel

1. Allez dans votre projet Vercel
2. **Settings** → **Environment Variables**
3. Ajoutez `RESEND_API_KEY` avec votre clé
4. Redéployez le projet

## 📊 Monitoring

Dans Resend dashboard:
- **Emails** → Liste de tous les emails envoyés
- **Logs** → Détails de livraison, erreurs
- **Analytics** → Taux d'ouverture, clics

## ⚠️ Limites

### Plan Gratuit Resend:
- 100 emails/jour
- 3,000 emails/mois
- Domaine de test inclus

### Plan Pro ($20/mois):
- 50,000 emails/mois
- Domaine personnalisé vérifié
- Support prioritaire

## 🔒 Sécurité

✅ **Ne commitez JAMAIS** votre `RESEND_API_KEY` dans Git  
✅ Utilisez `.env.local` (ignoré par Git)  
✅ Ajoutez la clé uniquement dans Vercel Environment Variables  

## 🐛 Dépannage

### Erreur: "Resend is not defined"

→ Vous avez oublié d'installer le package:
```bash
npm install resend
```

### Erreur: "API key is invalid"

→ Vérifiez que `RESEND_API_KEY` est bien définie dans `.env.local`

### Emails non reçus

1. Vérifiez les **logs serveur** (console)
2. Vérifiez le dashboard Resend → **Emails**
3. Regardez dans **spam/courrier indésirable**
4. Vérifiez la vérification du domaine (production)

### Emails en spam

→ Configurez SPF, DKIM, DMARC dans vos DNS (après vérification domaine)

## 📞 Support

- **Resend Docs**: https://resend.com/docs
- **Templates HTML**: https://resend.com/docs/send-with-react
- **Vérification domaine**: https://resend.com/docs/dashboard/domains

## ✅ Checklist de Production

- [ ] Compte Resend créé
- [ ] Clé API obtenue
- [ ] `RESEND_API_KEY` ajoutée à Vercel
- [ ] Package `resend` installé
- [ ] Code décommenté dans `send-email/route.ts`
- [ ] Email équipe configuré dans `QuickRegistrationModal.tsx`
- [ ] Domaine vérifié (optionnel mais recommandé)
- [ ] Test d'inscription effectué
- [ ] Emails reçus (client + équipe)
- [ ] Templates personnalisés avec votre branding

---

**Status actuel**: 🟡 En simulation (logs console)  
**Pour activer**: Suivez les étapes 1-6 ci-dessus
