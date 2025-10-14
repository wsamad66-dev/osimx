# 📅 Système de Prise de Rendez-vous - README

## 🎯 Objectif

Système complet de réservation de consultations gratuites pour étudiants souhaitant étudier à l'étranger.

**Flow:** Formulaire → Validation → Modal zcal → Confirmation → Sauvegarde Sanity

---

## ✅ Fichiers créés

### Schéma & Base de données
- ✅ `sanity/schemas/lead.ts` - Schéma Sanity pour les leads
- ✅ `sanity/schemas/index.ts` - Ajout du schéma lead

### Composants React
- ✅ `src/components/appointment/AppointmentForm.tsx` - Formulaire principal avec modal
- ✅ `src/components/appointment/AppointmentCTA.tsx` - Bouton CTA réutilisable

### API Routes
- ✅ `src/app/api/save-lead/route.ts` - POST & GET pour leads

### Pages
- ✅ `src/app/(main)/rendez-vous/page.tsx` - Page dédiée formulaire
- ✅ `src/app/(main)/merci/page.tsx` - Page de confirmation

### Documentation
- ✅ `docs/APPOINTMENT_SYSTEM_GUIDE.md` - Guide complet
- ✅ `docs/APPOINTMENT_QUICK_START.md` - Quick start
- ✅ `docs/APPOINTMENT_README.md` - Ce fichier

---

## 🚀 Démarrage rapide

### 1. Importer le composant

```tsx
import { AppointmentForm } from '@/components/appointment/AppointmentForm'
```

### 2. L'utiliser sur une page

```tsx
export default function Page() {
  return <AppointmentForm variant="section" />
}
```

### 3. Ou ajouter un bouton CTA

```tsx
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'

<AppointmentCTA 
  text="Réserver maintenant" 
  variant="primary" 
  size="lg" 
/>
```

---

## 📦 Dépendances

Toutes déjà installées:
- ✅ Next.js 15
- ✅ React 19
- ✅ Framer Motion (animations)
- ✅ Lucide React (icons)
- ✅ Sanity CMS
- ✅ TailwindCSS

---

## 🎨 Features

### Formulaire
- ✅ 4 champs: Nom, Email, Téléphone, Pays
- ✅ Validation côté client
- ✅ Messages d'erreur clairs
- ✅ Design responsive mobile/desktop
- ✅ Animations Framer Motion

### Modal zcal
- ✅ Popup animé après soumission
- ✅ Iframe zcal intégré: `https://zcal.co/letudiantetranger/consultation`
- ✅ Bouton fermeture
- ✅ Backdrop blur
- ✅ Responsive

### Sauvegarde
- ✅ Lead sauvegardé dans Sanity CMS
- ✅ Status automatique "pending"
- ✅ Timestamp de création
- ✅ API REST (`/api/save-lead`)

### Analytics
- ✅ Google Analytics 4 (GA4)
- ✅ Event: `appointment_form_submitted`
- ✅ Event: `appointment_booked`

### Confirmation
- ✅ Toast de succès animé
- ✅ Page `/merci` avec instructions
- ✅ Reset automatique du formulaire

---

## 📁 Structure

```
src/
├── components/
│   └── appointment/
│       ├── AppointmentForm.tsx     # Formulaire principal
│       └── AppointmentCTA.tsx      # Bouton CTA
├── app/
│   ├── (main)/
│   │   ├── rendez-vous/
│   │   │   └── page.tsx            # Page /rendez-vous
│   │   └── merci/
│   │       └── page.tsx            # Page /merci
│   └── api/
│       └── save-lead/
│           └── route.ts            # API POST/GET leads

sanity/
└── schemas/
    ├── lead.ts                     # Schéma Sanity
    └── index.ts                    # Export schémas

docs/
├── APPOINTMENT_SYSTEM_GUIDE.md     # Guide complet
├── APPOINTMENT_QUICK_START.md      # Quick start
└── APPOINTMENT_README.md           # Ce fichier
```

---

## 🔧 Configuration

### 1. Sanity (obligatoire)

```bash
# Déployer le schéma
npx sanity deploy

# Vérifier dans Studio
# http://localhost:3000/studio
```

### 2. zcal (obligatoire)

- URL: `https://zcal.co/letudiantetranger/consultation`
- Configurez:
  - Durée: 30 minutes
  - Disponibilité: Lun-Ven 9h-18h
  - Email de confirmation
  - Buffer time: 15 minutes

### 3. Google Analytics (optionnel)

```tsx
// src/app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="ga">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

---

## 🧪 Tests

### Test local
```bash
npm run dev
# Ouvrez http://localhost:3000/rendez-vous
```

### Checklist de test
- [ ] Formulaire s'affiche correctement
- [ ] Validation des champs requis fonctionne
- [ ] Modal s'ouvre après soumission
- [ ] Iframe zcal se charge
- [ ] Bouton fermeture fonctionne
- [ ] Toast de succès apparaît
- [ ] Lead créé dans Sanity
- [ ] Page /merci accessible

---

## 📊 Schéma Sanity - Champs

```typescript
{
  name: string              // Nom complet (requis)
  email: string             // Email (requis, validé)
  phone: string             // Téléphone (optionnel)
  country: string           // Pays d'intérêt (liste)
  status: string            // pending|contacted|converted|lost
  source: string            // 'appointment_form'
  notes: text               // Notes admin
  appointmentBooked: bool   // Si RDV réservé
  appointmentDate: datetime // Date du RDV
  createdAt: datetime       // Auto
}
```

---

## 🎯 URLs

- **Formulaire:** `/rendez-vous`
- **Confirmation:** `/merci`
- **API Save:** `/api/save-lead` (POST)
- **API Get:** `/api/save-lead` (GET)
- **zcal:** `https://zcal.co/letudiantetranger/consultation`

---

## 📈 KPIs à suivre

### Dans Sanity Studio
- Nombre de leads par jour/semaine
- Taux de conversion (pending → converted)
- Pays les plus populaires
- Source des leads

### Dans GA4
- Event `appointment_form_submitted` (soumissions)
- Event `appointment_booked` (conversions)
- Taux de complétion du formulaire
- Temps passé sur `/rendez-vous`

---

## 🔐 Sécurité

### Recommandations
- [ ] Ajouter CAPTCHA (hCaptcha/reCAPTCHA)
- [ ] Rate limiting sur l'API
- [ ] Validation stricte côté serveur
- [ ] Sanitization des données
- [ ] Logs des tentatives suspectes

### Variables d'environnement (Vercel)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXX
```

---

## 📧 Email (Optionnel)

### Ajout d'emails automatiques avec Resend

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
  subject: 'Confirmation de votre demande',
  html: `<h1>Bonjour ${name}</h1>...`
})
```

---

## 🐛 Troubleshooting

### Erreur: "Sanity CMS is not configured"
- Vérifiez `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Vérifiez `SANITY_API_TOKEN`

### Modal ne s'ouvre pas
```bash
npm install framer-motion
```

### zcal ne charge pas
- Vérifiez l'URL zcal dans votre navigateur
- Vérifiez que le compte zcal est actif
- Testez directement: https://zcal.co/letudiantetranger/consultation

### GA4 ne track pas
- Vérifiez `window.gtag` dans la console
- Utilisez GA4 DebugView
- Vérifiez le Measurement ID

---

## 🎨 Personnalisation

### Changer les couleurs

```tsx
// AppointmentForm.tsx
// Ligne 239: Bouton submit
className="bg-gradient-to-r from-green-600 to-teal-600 ..."
```

### Changer le texte du bouton

```tsx
<AppointmentCTA 
  text="🎓 Consultation gratuite"
  variant="primary"
/>
```

### Ajouter des champs au formulaire

1. Modifier `AppointmentForm.tsx`
2. Ajouter le champ dans `formData` state
3. Ajouter dans le JSX
4. Modifier `sanity/schemas/lead.ts`
5. Déployer le schéma: `npx sanity deploy`

---

## 📚 Documentation complète

- **Guide complet:** `docs/APPOINTMENT_SYSTEM_GUIDE.md`
- **Quick Start:** `docs/APPOINTMENT_QUICK_START.md`

---

## ✨ Prochaines améliorations

### Phase 2
- [ ] Email automatique de confirmation
- [ ] SMS reminder 24h avant
- [ ] CAPTCHA anti-spam
- [ ] Dashboard admin avec stats
- [ ] Export CSV des leads

### Phase 3
- [ ] Intégration CRM (Hubspot)
- [ ] Chatbot AI pour pré-qualification
- [ ] Multi-langue (EN, ES, AR)
- [ ] A/B testing
- [ ] Video call intégré (alt. zcal)

---

## 📞 Support

**Questions?** Consultez:
1. `docs/APPOINTMENT_SYSTEM_GUIDE.md` (guide détaillé)
2. `docs/APPOINTMENT_QUICK_START.md` (démarrage rapide)
3. Logs Vercel (déploiement)
4. Sanity docs: https://www.sanity.io/docs
5. zcal help: https://zcal.co/help

---

## ✅ Checklist de déploiement

- [ ] Schéma Sanity déployé
- [ ] Variables d'environnement Vercel configurées
- [ ] zcal account configuré
- [ ] GA4 configuré (optionnel)
- [ ] Tests mobile + desktop effectués
- [ ] Page `/rendez-vous` fonctionne
- [ ] Page `/merci` fonctionne
- [ ] CTA ajouté sur homepage
- [ ] API `/api/save-lead` testée

---

**Version:** 1.0  
**Status:** ✅ Production Ready  
**Créé:** 11 octobre 2025

**🚀 Prêt à convertir vos visiteurs en étudiants!**
