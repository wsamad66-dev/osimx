# ✅ Phase 5 Complete: Registration API & Database

## 📋 Overview

Phase 5 implémente l'API complète d'inscription des étudiants avec création de documents dans Sanity, hachage des mots de passe, et liens vers les documents uploadés.

---

## 🎯 Objectifs Atteints

### ✅ 1. Schema Student Mis à Jour
- Tous les champs des 4 étapes inclus
- Références Sanity pour les documents uploadés
- Champ `passwordHash` (bcrypt) masqué dans Studio
- Token de vérification email
- Status de l'application (pending, approved, etc.)
- Métadonnées (registeredAt, emailVerified, notes)

### ✅ 2. API `/api/register-student` Complète
- Validation complète des 4 étapes
- Vérification d'email en double
- Hachage de mot de passe avec bcrypt (10 rounds)
- Génération de token de vérification email
- Création de document student dans Sanity
- Liens vers assets Sanity uploadés
- Gestion d'erreurs robuste

### ✅ 3. Liens Documents ↔ Student
- Documents référencés via Sanity `_ref`
- Structure: `file.asset._ref = assetId`
- Métadonnées: name, mimeType, size, uploadedAt
- Visibles dans Sanity Studio

### ✅ 4. Sécurité
- Mot de passe haché (bcrypt, 10 salt rounds)
- Jamais stocké en clair
- Token de vérification (32 bytes random hex)
- Validation stricte côté serveur

### ✅ 5. Intégration Frontend
- RegistrationModal mis à jour
- Format payload: `{ step1, step2, step3, step4 }`
- Messages d'erreur contextuels
- Success feedback utilisateur

---

## 📁 Fichiers Modifiés/Créés

### 1. **`sanity/schemas/student.ts`** (Mis à jour)

**Champs ajoutés:**
```typescript
{
  // Step 1
  firstName, lastName, email, phone,
  dateOfBirth, nationality, countryOfResidence,
  
  // Step 2
  currentEducationLevel, desiredDegree, fieldOfStudy,
  preferredCountry, preferredUniversity, intendedStartDate,
  
  // Step 3
  documents: [
    {
      file: { asset: { _ref: assetId } }, // ← Sanity reference
      name, mimeType, size, uploadedAt
    }
  ],
  
  // Step 4
  passwordHash, // bcrypt hashed
  
  // Metadata
  status, emailVerified, verificationToken,
  registeredAt, notes
}
```

**Preview amélioré:**
```
✅ Jean Dupont
📝 pending • jean.dupont@email.com
```

---

### 2. **`src/app/api/register-student/route.ts`** (Réécrit)

**Flux complet:**
```typescript
1. Parse body (step1, step2, step3, step4)
2. Validate all fields
3. Check duplicate email
4. Hash password (bcrypt)
5. Generate verification token
6. Prepare document references
7. Create student in Sanity
8. TODO: Send email
9. Return success
```

**Validation:**
- ✅ Email format (regex)
- ✅ Password strength (min 8 chars)
- ✅ Password confirmation match
- ✅ Documents uploaded (assetId présent)
- ✅ Duplicate email check

**Erreurs gérées:**
- 400: Données invalides/incomplètes
- 409: Email déjà existant
- 500: Erreur Sanity/serveur

---

### 3. **`src/components/registration/RegistrationModal.tsx`** (Mis à jour)

**Changements:**
```typescript
// AVANT
body: JSON.stringify({
  personalInfo,
  educationInfo,
  documentUpload,
  security
})

// APRÈS
body: JSON.stringify({
  step1: personalInfo,
  step2: educationInfo,
  step3: documentUpload,
  step4: security
})
```

**Messages améliorés:**
```typescript
// Success
alert(`🎉 Inscription réussie!\n\nBienvenue ${firstName}!\n\nVous recevrez un email de confirmation sous peu.`)

// Error
alert(`❌ Erreur d'inscription:\n\n${error.message}`)
```

---

## 🔐 Sécurité Implémentée

### Password Hashing (bcrypt)
```typescript
import bcrypt from 'bcryptjs'

const saltRounds = 10
const passwordHash = await bcrypt.hash(password, saltRounds)

// Stored in Sanity:
// passwordHash: "$2a$10$..." (60 characters)
```

**Pourquoi bcrypt ?**
- ✅ Industry standard
- ✅ Adaptive (salt rounds ajustables)
- ✅ Résistant aux attaques brute-force
- ✅ Automatique salt generation

### Email Verification Token
```typescript
import crypto from 'crypto'

const verificationToken = crypto.randomBytes(32).toString('hex')
// Example: "a3f7b2c9..." (64 characters hex)
```

**Usage futur:**
```
GET /verify-email?token=a3f7b2c9...
→ Find student with matching token
→ Set emailVerified = true
→ Clear verificationToken
```

---

## 📊 Structure de Données

### Payload d'Inscription
```json
{
  "step1": {
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@email.com",
    "phone": "+33123456789",
    "dateOfBirth": "2000-01-15",
    "nationality": "Français",
    "countryOfResidence": "France"
  },
  "step2": {
    "currentEducationLevel": "licence",
    "desiredDegree": "Master en Informatique",
    "fieldOfStudy": "Informatique",
    "preferredCountry": "Canada",
    "preferredUniversity": "Université de Montréal",
    "intendedStartDate": "2026-09"
  },
  "step3": {
    "documents": [
      {
        "name": "diplome-licence.pdf",
        "type": "application/pdf",
        "size": 2560000,
        "assetId": "file-abc123xyz-pdf",
        "url": "https://cdn.sanity.io/files/..."
      }
    ]
  },
  "step4": {
    "password": "SecureP@ss123",
    "confirmPassword": "SecureP@ss123"
  }
}
```

### Document Sanity Créé
```json
{
  "_type": "student",
  "_id": "student-uuid-here",
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "jean.dupont@email.com",
  "phone": "+33123456789",
  "dateOfBirth": "2000-01-15",
  "nationality": "Français",
  "countryOfResidence": "France",
  "currentEducationLevel": "licence",
  "desiredDegree": "Master en Informatique",
  "fieldOfStudy": "Informatique",
  "preferredCountry": "Canada",
  "preferredUniversity": "Université de Montréal",
  "intendedStartDate": "2026-09",
  "documents": [
    {
      "_type": "object",
      "file": {
        "_type": "file",
        "asset": {
          "_type": "reference",
          "_ref": "file-abc123xyz-pdf"
        }
      },
      "name": "diplome-licence.pdf",
      "mimeType": "application/pdf",
      "size": 2560000,
      "uploadedAt": "2025-10-09T14:15:00Z"
    }
  ],
  "passwordHash": "$2a$10$...",
  "status": "pending",
  "emailVerified": false,
  "verificationToken": "a3f7b2c9...",
  "registeredAt": "2025-10-09T14:15:00Z"
}
```

---

## 🧪 Tests

### Test Manuel (Recommandé)

**1. Test Inscription Complète**
```bash
# Server running on localhost:3000

1. Ouvrir http://localhost:3000
2. Cliquer sur "Inscription"
3. Remplir Step 1 (infos personnelles)
4. Remplir Step 2 (éducation)
5. Uploader 1 document (Step 3)
6. Créer mot de passe (Step 4)
7. Cliquer "S'inscrire"
8. Vérifier message: "🎉 Inscription réussie!"
```

**2. Vérification Sanity Studio**
```bash
# Ouvrir Studio
open http://localhost:3000/studio

# Aller dans "Students"
# Vérifier:
- ✅ Nouveau student visible
- ✅ Nom complet affiché
- ✅ Email correct
- ✅ Status = "📝 pending"
- ✅ Documents attachés (cliquer pour voir)
- ✅ passwordHash présent (masqué dans UI)
```

**3. Test Email Duplicate**
```bash
1. S'inscrire avec email: test@example.com
2. Essayer de s'inscrire à nouveau avec le même email
3. Vérifier erreur: "Un compte avec cet email existe déjà"
```

**4. Test Validation Mot de Passe**
```bash
1. Step 4: Entrer "123" comme mot de passe
2. Vérifier erreur: "Le mot de passe doit contenir au moins 8 caractères"

3. Entrer "Password123" et confirmation "Password456"
4. Vérifier erreur: "Les mots de passe ne correspondent pas"
```

---

### Test API Direct (curl)
```bash
curl -X POST http://localhost:3000/api/register-student \
  -H "Content-Type: application/json" \
  -d '{
    "step1": {
      "firstName": "Test",
      "lastName": "User",
      "email": "test@example.com",
      "phone": "+33123456789",
      "dateOfBirth": "2000-01-01",
      "nationality": "Français",
      "countryOfResidence": "France"
    },
    "step2": {
      "currentEducationLevel": "licence",
      "desiredDegree": "Master",
      "fieldOfStudy": "Informatique",
      "preferredCountry": "Canada",
      "intendedStartDate": "2026-09"
    },
    "step3": {
      "documents": [
        {
          "name": "test.pdf",
          "type": "application/pdf",
          "size": 100000,
          "assetId": "file-test123-pdf",
          "url": "https://cdn.sanity.io/files/..."
        }
      ]
    },
    "step4": {
      "password": "TestPassword123",
      "confirmPassword": "TestPassword123"
    }
  }'

# Expected Response:
{
  "success": true,
  "studentId": "student-...",
  "message": "Inscription réussie! Bienvenue chez L'Étudiant à l'Étranger.",
  "data": {
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "status": "pending"
  }
}
```

---

## 🔄 Flux Complet End-to-End

```
USER                    FRONTEND                   API                      SANITY
  │                        │                         │                         │
  │ 1. Fill Step 1-4       │                         │                         │
  ├───────────────────────>│                         │                         │
  │                        │                         │                         │
  │                        │ 2. POST /register       │                         │
  │                        ├────────────────────────>│                         │
  │                        │                         │                         │
  │                        │                         │ 3. Check duplicate      │
  │                        │                         ├────────────────────────>│
  │                        │                         │<────────────────────────┤
  │                        │                         │   (not found)           │
  │                        │                         │                         │
  │                        │                         │ 4. Hash password        │
  │                        │                         │ (bcrypt)                │
  │                        │                         │                         │
  │                        │                         │ 5. Create student       │
  │                        │                         ├────────────────────────>│
  │                        │                         │<────────────────────────┤
  │                        │                         │   (student created)     │
  │                        │                         │                         │
  │                        │ 6. Success response     │                         │
  │                        │<────────────────────────┤                         │
  │                        │                         │                         │
  │ 7. Success alert       │                         │                         │
  │<───────────────────────┤                         │                         │
  │ "Inscription réussie!" │                         │                         │
```

---

## ⚠️ TODO / Améliorations Futures

### 1. Email Service (Priorité: HAUTE)
```typescript
// À implémenter dans /api/register-student
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'noreply@etudiantetranger.com',
  to: step1.email,
  subject: 'Confirmez votre inscription',
  html: welcomeEmailTemplate({
    firstName: step1.firstName,
    verificationLink: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${verificationToken}`
  })
})
```

**Setup Resend:**
```bash
npm install resend
# Get API key from resend.com
# Add to .env.local: RESEND_API_KEY=re_...
```

### 2. Email Verification Page
```typescript
// src/app/verify-email/page.tsx
export default async function VerifyEmailPage({ searchParams }) {
  const token = searchParams.token
  
  // Find student with matching token
  // Set emailVerified = true
  // Clear verificationToken
  // Show success message
}
```

### 3. Rate Limiting
```typescript
// Protect against spam registrations
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
})

const { success } = await ratelimit.limit(request.ip)
if (!success) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
}
```

### 4. Success Animation
```typescript
// Replace alert() with beautiful modal
import confetti from 'canvas-confetti'

confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 }
})
```

### 5. Login Functionality
```typescript
// src/app/api/auth/login/route.ts
import bcrypt from 'bcryptjs'

const student = await client.fetch(`*[_type == "student" && email == $email][0]`)
const isValid = await bcrypt.compare(password, student.passwordHash)

if (isValid) {
  // Generate session token
  // Return JWT or set cookie
}
```

---

## 📚 Documentation Connexe

- **Phase 4:** [PHASE_4_SANITY_UPLOAD.md](./PHASE_4_SANITY_UPLOAD.md)
- **Phase 6:** [PHASE_6_UX_POLISH.md](./PHASE_6_UX_POLISH.md) (à créer)
- **Sanity Setup:** [SANITY_SETUP_GUIDE.md](./SANITY_SETUP_GUIDE.md)

---

## ✅ Checklist de Validation

- [x] Schema student mis à jour avec tous les champs
- [x] Champ documents avec références Sanity
- [x] API /register-student créée
- [x] Validation complète (email, password, documents)
- [x] Check duplicate email
- [x] Password hashing (bcrypt)
- [x] Token de vérification email généré
- [x] Documents liés au student via _ref
- [x] Frontend mis à jour (payload format)
- [x] Messages d'erreur contextuels
- [x] Test manuel réussi
- [x] Schema déployé sur Sanity
- [ ] Email service configuré (TODO)
- [ ] Page de vérification email (TODO)
- [ ] Rate limiting (TODO)
- [ ] Tests automatisés (Jest) - Future improvement

---

## 🎉 Phase 5 Status: **COMPLETE**

**Prochaine étape:** Phase 6 - UX Polish & Accessibility
- Success animations (confetti)
- Email verification flow
- Improved keyboard navigation
- ARIA labels complètes
- Screen reader support
- Focus management

---

**Date de complétion:** 9 octobre 2025  
**Durée:** ~1.5 heures  
**Fichiers modifiés:** 3  
**Lignes de code:** ~400 LOC  
**Dependencies ajoutées:** bcryptjs, @types/bcryptjs
