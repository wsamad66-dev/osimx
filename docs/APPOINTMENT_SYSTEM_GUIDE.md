# 📅 Système de Prise de Rendez-vous - Guide Complet

## 🎯 Vue d'ensemble

Système complet de réservation de consultations avec:
- ✅ Formulaire de contact avec validation
- ✅ Modal popup avec zcal intégré
- ✅ Sauvegarde automatique dans Sanity CMS
- ✅ Tracking Google Analytics (GA4)
- ✅ Page de confirmation
- ✅ Design responsive mobile + desktop

---

## 📁 Fichiers créés

### 1. Schéma Sanity
**`sanity/schemas/lead.ts`**
- Stocke les informations des leads (étudiants intéressés)
- Champs: name, email, phone, country, status, notes, appointmentBooked, etc.
- Statuts: pending, contacted, converted, lost
- Vue d'administration avec emojis et filtres

### 2. Composant principal
**`src/components/appointment/AppointmentForm.tsx`**
- Formulaire avec 4 champs (nom, email, téléphone, pays)
- Validation côté client
- Modal animé avec Framer Motion
- Iframe zcal: `https://zcal.co/letudiantetranger/consultation`
- Message de succès après réservation
- Tracking GA4 intégré

### 3. API Route
**`src/app/api/save-lead/route.ts`**
- POST: Sauvegarde le lead dans Sanity
- GET: Récupère les leads (pour admin)
- Validation des données
- Gestion d'erreurs

### 4. Page de rendez-vous
**`src/app/(main)/rendez-vous/page.tsx`**
- Page dédiée avec le formulaire
- URL: `/rendez-vous`
- SEO optimisé

### 5. Page de remerciement
**`src/app/(main)/merci/page.tsx`**
- Confirmation après réservation
- URL: `/merci`
- Instructions pour l'étudiant
- Liens de contact

### 6. Bouton CTA
**`src/components/appointment/AppointmentCTA.tsx`**
- Bouton réutilisable pour homepage
- 3 variants: primary, secondary, outline
- 3 sizes: sm, md, lg
- Peut scroller ou naviguer

---

## 🚀 Utilisation

### Ajouter le formulaire sur une page

```tsx
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export default function Page() {
  return <AppointmentForm variant="section" />
}
```

### Ajouter un bouton CTA

```tsx
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'

// Naviguer vers /rendez-vous
<AppointmentCTA text="Réserver maintenant" variant="primary" size="lg" />

// Scroller vers une section
<AppointmentCTA 
  text="Prendre RDV" 
  scrollTo="appointment-section" 
  variant="secondary" 
/>
```

### Sur la homepage

```tsx
// Dans src/app/page.tsx
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export default function HomePage() {
  return (
    <>
      {/* Hero section avec CTA */}
      <section>
        <h1>Étudiez à l'étranger</h1>
        <AppointmentCTA 
          text="Consultation gratuite"
          scrollTo="rendez-vous"
          size="lg"
        />
      </section>

      {/* Section formulaire */}
      <div id="rendez-vous">
        <AppointmentForm variant="section" />
      </div>
    </>
  )
}
```

---

## 🎨 Props du composant AppointmentForm

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | Classes CSS additionnelles |
| `variant` | `'inline' \| 'section'` | `'section'` | Style d'affichage |
| `onSuccess` | `() => void` | `undefined` | Callback après succès |

**Variants:**
- `section`: Formulaire dans une section avec background (pour pages dédiées)
- `inline`: Formulaire simple sans section wrapper (pour intégration personnalisée)

---

## 🎨 Props du composant AppointmentCTA

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `'Prendre rendez-vous maintenant'` | Texte du bouton |
| `variant` | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Style du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `className` | `string` | `''` | Classes CSS additionnelles |
| `scrollTo` | `string` | `undefined` | ID de l'élément vers lequel scroller |
| `href` | `string` | `'/rendez-vous'` | URL de navigation |

---

## 📊 Schéma Sanity - Champs

```typescript
{
  name: string              // Nom complet (requis)
  email: string             // Email (requis, validation)
  phone: string             // Téléphone (optionnel)
  country: string           // Pays d'intérêt (liste prédéfinie)
  status: string            // pending | contacted | converted | lost
  source: string            // Source du lead (défaut: 'appointment_form')
  notes: text               // Notes administrateur
  appointmentBooked: bool   // Si rendez-vous réservé
  appointmentDate: datetime // Date du rendez-vous
  createdAt: datetime       // Date de création
}
```

---

## 🔧 Configuration zcal

### URL du calendrier
```
https://zcal.co/letudiantetranger/consultation
```

### Intégration iframe
```tsx
<iframe
  src="https://zcal.co/letudiantetranger/consultation"
  width="100%"
  height="100%"
  frameBorder="0"
  title="Réserver votre consultation"
/>
```

### Personnalisation zcal
1. Connectez-vous à https://zcal.co
2. Allez dans "Settings" > "Booking Page"
3. Personnalisez:
   - Durée: 30 minutes
   - Buffer time: 15 minutes
   - Disponibilité: Lun-Ven 9h-18h
   - Questions personnalisées
   - Email de confirmation

---

## 📈 Google Analytics (GA4)

### Events trackés

#### 1. Formulaire soumis
```javascript
gtag('event', 'appointment_form_submitted', {
  event_category: 'engagement',
  event_label: country || 'no_country'
})
```

#### 2. Rendez-vous réservé
```javascript
gtag('event', 'appointment_booked', {
  event_category: 'conversion',
  event_label: country || 'no_country',
  value: 1
})
```

### Configuration GA4
Ajoutez dans `src/app/layout.tsx`:

```tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🎯 Flux utilisateur

### Étape 1: Remplir le formulaire
1. L'étudiant arrive sur `/rendez-vous` ou clique sur un CTA
2. Remplit: Nom (requis), Email (requis), Téléphone, Pays
3. Clique sur "Réserver ma consultation gratuite"

### Étape 2: Validation & Sauvegarde
1. Validation côté client (champs requis, format email)
2. Envoi à `/api/save-lead`
3. Sauvegarde dans Sanity avec status "pending"
4. Event GA4: `appointment_form_submitted`

### Étape 3: Modal zcal
1. Modal s'ouvre avec animation Framer Motion
2. Iframe zcal chargée
3. L'étudiant sélectionne date/heure
4. Réservation confirmée sur zcal

### Étape 4: Confirmation
1. L'étudiant ferme le modal
2. Message de succès s'affiche (toast vert)
3. Event GA4: `appointment_booked`
4. Formulaire se reset
5. Option: redirection vers `/merci`

---

## 🎨 Design & Animations

### Couleurs
- Primary: `from-blue-600 to-purple-600`
- Success: `green-500`
- Error: `red-500`
- Background: `from-blue-50 to-white`

### Animations Framer Motion
- **Form submit button**: Scale on hover/tap
- **Modal**: Fade in background + scale content
- **Success toast**: Slide up from bottom

### Icons (Lucide React)
- Calendar: Calendrier/RDV
- User: Nom
- Mail: Email
- Phone: Téléphone
- Globe: Pays
- CheckCircle2: Succès
- X: Fermer modal

---

## 📱 Responsive Design

### Mobile (< 640px)
- Formulaire: padding réduit
- Modal: 90% viewport height
- Boutons: full width
- Iframe zcal: hauteur optimisée

### Tablet (640px - 1024px)
- Layout 2 colonnes pour certains champs
- Modal: 80% largeur max

### Desktop (> 1024px)
- Formulaire: max-width 512px (max-w-lg)
- Modal: max-width 896px (max-w-4xl)
- Effets hover optimisés

---

## 🔐 Validation & Sécurité

### Validation côté client
```typescript
- Nom: required, non vide
- Email: required, format valide (/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
- Téléphone: optionnel
- Pays: optionnel (liste prédéfinie)
```

### Validation côté serveur
```typescript
- Vérification champs requis
- Validation format email
- Sanitization des données
- Rate limiting (à ajouter)
```

### Recommandations sécurité
1. Ajouter un CAPTCHA (hCaptcha, reCAPTCHA)
2. Rate limiting API (Vercel Edge Config)
3. Validation stricte des données
4. Logs des tentatives suspectes

---

## 📧 Email notifications (Optionnel)

### Configuration Resend (recommandé)
```bash
npm install resend
```

```typescript
// src/app/api/save-lead/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'L\'Étudiant Étranger <noreply@letudiantetranger.com>',
  to: email,
  subject: 'Votre demande de consultation',
  html: `<p>Bonjour ${name},...</p>`
})
```

### Variables d'environnement
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## 🛠️ Maintenance & Admin

### Accéder aux leads dans Sanity Studio
1. Ouvrez `http://localhost:3000/studio`
2. Naviguez vers "Leads & Rendez-vous"
3. Filtrez par statut (pending, contacted, etc.)
4. Ajoutez des notes, changez le statut

### API Admin (GET /api/save-lead)
```bash
# Récupérer tous les leads
curl http://localhost:3000/api/save-lead

# Filtrer par statut
curl http://localhost:3000/api/save-lead?status=pending
```

### Statistiques
Créez un dashboard admin pour voir:
- Nombre de leads par jour/semaine/mois
- Taux de conversion (pending → converted)
- Pays les plus populaires
- Source des leads

---

## 🐛 Troubleshooting

### Le modal ne s'ouvre pas
- Vérifiez que Framer Motion est installé: `npm install framer-motion`
- Vérifiez les erreurs console

### L'API ne sauvegarde pas
- Vérifiez les credentials Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`)
- Vérifiez que le schéma `lead` est déployé
- Regardez les logs dans Vercel

### zcal ne charge pas
- Vérifiez l'URL: `https://zcal.co/letudiantetranger/consultation`
- Testez l'URL directement dans le navigateur
- Vérifiez que le compte zcal est actif

### GA4 ne track pas
- Vérifiez que gtag est chargé (`window.gtag`)
- Utilisez GA4 DebugView pour tester
- Vérifiez le Measurement ID

---

## ✅ Checklist de déploiement

- [ ] Schéma Sanity déployé (`sanity deploy`)
- [ ] Variables d'environnement configurées sur Vercel
- [ ] zcal account configuré et calendrier publié
- [ ] GA4 configuré avec les bons events
- [ ] Tests mobile + desktop
- [ ] Email notifications testées (si configurées)
- [ ] Page `/merci` accessible
- [ ] Page `/rendez-vous` accessible
- [ ] CTA ajouté sur homepage
- [ ] Links footer mis à jour

---

## 🚀 Prochaines améliorations

### Phase 2
- [ ] CAPTCHA pour anti-spam
- [ ] Email automatique de confirmation
- [ ] SMS reminder 24h avant RDV
- [ ] Dashboard admin avancé
- [ ] Export CSV des leads

### Phase 3
- [ ] Intégration CRM (Hubspot, Pipedrive)
- [ ] Chatbot AI pour pré-qualification
- [ ] Multi-langue (EN, ES, AR)
- [ ] A/B testing formulaire
- [ ] Video call intégré (alternative à zcal)

---

## 📞 Support

En cas de problème:
1. Vérifiez les logs Vercel
2. Testez en local avec `npm run dev`
3. Consultez la doc Sanity: https://www.sanity.io/docs
4. Doc zcal: https://zcal.co/help

---

**Créé le:** 11 octobre 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready
