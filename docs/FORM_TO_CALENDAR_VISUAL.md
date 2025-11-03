# 📱 Guide Visuel : Formulaire → Calendrier

## 🎬 Flux Utilisateur (Nouveau)

```
┌─────────────────────────────────────────┐
│                                         │
│   🏠 PAGE D'ACCUEIL                    │
│                                         │
│   [Commencez maintenant] ← Clic        │
│                                         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  ✏️  FORMULAIRE D'INSCRIPTION          │
│                                         │
│  Nom complet:     [Jean Dupont      ]  │
│  Email:           [jean@example.com ]  │
│  Téléphone:       [+221 77 123 45 67]  │
│  Pays:            [Sénégal          ]  │
│                                         │
│  [Réserver ma consultation] ← Clic     │
│                                         │
└─────────────────────────────────────────┘
                  ↓
          ⏱️ 300ms de transition
                  ↓
┌─────────────────────────────────────────┐
│  ✅ FORMULAIRE SE FERME                │
│     (Animation fade out)                │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  📅 CALENDRIER ZCAL S'OUVRE            │
│     (Animation fade in + slide up)      │
│                                         │
│   ┌───────────────────────────────┐   │
│   │ 📅 Choisissez votre créneau   │   │
│   ├───────────────────────────────┤   │
│   │                               │   │
│   │   [Calendrier interactif]     │   │
│   │                               │   │
│   │   Lu Ma Me Je Ve Sa Di        │   │
│   │   15 16 17 18 19 20 21        │   │
│   │                               │   │
│   └───────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
                  ↓
          Client choisit un créneau
                  ↓
┌─────────────────────────────────────────┐
│  ✅ RENDEZ-VOUS CONFIRMÉ               │
│                                         │
│  📧 Emails envoyés:                    │
│  • Client reçoit confirmation          │
│  • Team reçoit notification            │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📧 Flux des Emails (3 emails envoyés)

```
┌──────────────────────────────────────────────────────┐
│  CLIENT SOUMET LE FORMULAIRE                         │
└──────────────────────────────────────────────────────┘
                      ↓
        ┌─────────────┴─────────────┐
        │                           │
        ↓                           ↓
┌─────────────────┐      ┌─────────────────────────┐
│  📧 EMAIL #1    │      │  📧 EMAIL #2 + #3       │
│                 │      │                         │
│  À: Client      │      │  À: Team                │
│  Type: Welcome  │      │  Type: Welcome + Alert  │
│                 │      │                         │
│  Contenu:       │      │  Email #2 (copie):      │
│  🎉 Bienvenue   │      │  🎉 Bienvenue (copie)   │
│  ✅ Confirmé    │      │                         │
│  📞 Contact     │      │  Email #3 (action):     │
│                 │      │  🔔 Nouveau lead        │
│                 │      │  👤 Infos client        │
│                 │      │  [WhatsApp] [Email]     │
└─────────────────┘      └─────────────────────────┘

  jean@example.com         teametudantetranger@gmail.com
```

---

## 🎨 États du Composant

```typescript
// État initial
isOpen: false        // Formulaire fermé
isSubmitting: false  // Pas en train de soumettre
showZcalModal: false // Calendrier fermé

// Clic sur "Commencez maintenant"
isOpen: true         // ✅ Formulaire ouvert
isSubmitting: false
showZcalModal: false

// Clic sur "Réserver ma consultation"
isOpen: true
isSubmitting: true   // ✅ Envoi en cours...
showZcalModal: false

// Après soumission réussie (immédiatement)
isOpen: false        // ✅ Formulaire fermé
isSubmitting: false
showZcalModal: false

// 300ms plus tard
isOpen: false
isSubmitting: false
showZcalModal: true  // ✅ Calendrier ouvert
```

---

## 🔄 Timeline (Séquence temporelle)

```
T=0ms     : Client clique "Réserver ma consultation"
            ↓
T=10ms    : setIsSubmitting(true) → Afficher loader
            ↓
T=50ms    : fetch('/api/save-lead') → Sauvegarder dans Sanity
            ↓
T=200ms   : fetch('/api/send-email') × 3 → Envoyer emails
            ↓
T=500ms   : fetch('/api/register-student') → Créer compte
            ↓
T=800ms   : onClose() → FERMER le formulaire
            ↓ (Animation fade out du Dialog)
            ↓
T=1100ms  : setTimeout(() => setShowZcalModal(true), 300)
            ↓
T=1400ms  : Calendrier Zcal apparaît (fade in + slide up)
            ↓
T=1600ms  : Animation terminée, calendrier visible
```

---

## 📊 Comparaison Avant/Après

### ❌ AVANT (Ancien flux - 4 étapes)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│              │     │              │     │              │     │              │
│  Formulaire  │ --> │  Message de  │ --> │  Clic pour   │ --> │  Calendrier  │
│              │     │   succès     │     │  continuer   │     │              │
│              │     │              │     │              │     │              │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
    Remplir         ✅ Inscription        ⚠️ Étape          Choisir
                      réussie !           inutile !          créneau
```

**Problèmes :**
- ⚠️ Étape supplémentaire (message de succès)
- ⚠️ Client doit cliquer pour continuer
- ⚠️ Friction dans le parcours
- ⚠️ Risque d'abandon

### ✅ APRÈS (Nouveau flux - 2 étapes)

```
┌──────────────┐     ┌──────────────┐
│              │     │              │
│  Formulaire  │ --> │  Calendrier  │
│              │     │              │
│              │     │              │
└──────────────┘     └──────────────┘
    Remplir          Choisir
                     créneau
              (300ms)
```

**Avantages :**
- ✅ Flux direct et fluide
- ✅ Pas d'étape inutile
- ✅ Guidage automatique
- ✅ Meilleure conversion

---

## 🎯 Composants React (Architecture)

```tsx
<QuickRegistrationModal>
  │
  ├── <Dialog open={isOpen}>              ← Formulaire
  │   │
  │   └── <DialogContent>
  │       │
  │       └── <form onSubmit={onSubmit}>
  │           ├── <Input name="fullName" />
  │           ├── <Input name="email" />
  │           ├── <Input name="phone" />
  │           ├── <Select name="country" />
  │           └── <Button type="submit">
  │                 Réserver ma consultation
  │               </Button>
  │
  └── <AnimatePresence>                   ← Calendrier
      │
      └── {showZcalModal && (
            <motion.div>                   ← Backdrop
              │
              └── <motion.div>             ← Modal
                  │
                  ├── <div>                ← Header
                  │     📅 Choisissez votre créneau
                  │     <button onClick={close}>[X]</button>
                  │   </div>
                  │
                  ├── <iframe              ← Calendrier Zcal
                  │     src="https://zcal.co/i/CW2aTnAb"
                  │   />
                  │
                  └── <div>                ← Footer
                        💡 Cliquez sur une date...
                      </div>
            </motion.div>
          )}
```

**Séparation claire :**
- **Dialog** : Formulaire d'inscription (contrôlé par `isOpen`)
- **AnimatePresence** : Calendrier Zcal (contrôlé par `showZcalModal`)
- Pas de dépendance entre les deux

---

## 🎭 Animations (Framer Motion)

### Fermeture du formulaire
```typescript
// Radix UI Dialog animation native
<Dialog open={isOpen}>
  // Fade out automatique quand isOpen = false
</Dialog>
```

### Ouverture du calendrier
```typescript
// Backdrop (fond noir transparent)
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  // Modal calendrier
  <motion.div
    initial={{ 
      scale: 0.95,    // Légèrement réduit
      opacity: 0,     // Invisible
      y: 20           // 20px vers le bas
    }}
    animate={{ 
      scale: 1,       // Taille normale
      opacity: 1,     // Visible
      y: 0            // Position normale
    }}
    transition={{ 
      type: 'spring', // Animation ressort
      damping: 25,    // Amortissement
      stiffness: 300  // Rigidité
    }}
  >
    {/* Calendrier Zcal */}
  </motion.div>
</motion.div>
```

**Effet visuel :**
```
Backdrop: 🌫️ Fondu progressif (0% → 60% opacité)
Modal:    📈 Apparition du bas + zoom + fondu
          (slide up + scale up + fade in)
```

---

## 🔧 Code Clé (Extrait simplifié)

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)

  try {
    // 1. Sauvegarder lead
    await fetch('/api/save-lead', { ... })

    // 2. Envoyer emails (3 emails)
    await fetch('/api/send-email', { to: data.email, type: 'client-welcome' })
    await fetch('/api/send-email', { to: TEAM_EMAIL, type: 'client-welcome' })
    await fetch('/api/send-email', { to: TEAM_EMAIL, type: 'team-notification' })

    // 3. Créer compte étudiant
    await fetch('/api/register-student', { ... })

    // ✅ FERMER le formulaire immédiatement
    setIsSuccess(false)
    reset()
    onClose()  // ← Ferme le Dialog

    // ✅ OUVRIR le calendrier après 300ms
    setTimeout(() => {
      setShowZcalModal(true)  // ← Affiche le calendrier
    }, 300)

  } catch (error) {
    alert('Erreur: ' + error.message)
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 📱 Responsive (Mobile vs Desktop)

### Mobile (< 640px)
```
┌──────────────────┐
│                  │
│   FORMULAIRE     │  max-w-lg (90% largeur)
│                  │  p-4 (padding réduit)
│                  │  text-sm (texte petit)
│                  │
│  [Réserver]      │
│                  │
└──────────────────┘
        ↓ 300ms
┌──────────────────┐
│                  │
│   CALENDRIER     │  max-w-2xl (95% largeur)
│                  │  h-[600px] (hauteur fixe)
│   [Calendrier]   │  Scroll vertical si besoin
│                  │
│  [Fermer X]      │
│                  │
└──────────────────┘
```

### Desktop (≥ 1024px)
```
                    ┌────────────────────────────┐
                    │                            │
                    │       FORMULAIRE           │  max-w-lg (500px)
                    │                            │  p-10 (padding large)
                    │   [Réserver]               │  text-base (normal)
                    │                            │
                    └────────────────────────────┘
                              ↓ 300ms
        ┌──────────────────────────────────────────┐
        │                                          │
        │            CALENDRIER                    │  max-w-2xl (800px)
        │                                          │  h-[600px]
        │   ┌────────────────────────────┐        │  Centré
        │   │                            │        │
        │   │   [Calendrier interactif]  │        │
        │   │                            │        │
        │   └────────────────────────────┘        │
        │                                          │
        │   [Fermer X]                             │
        │                                          │
        └──────────────────────────────────────────┘
```

---

## ⚡ Performance

### Temps de chargement
```
Formulaire :        < 100ms   (React component)
Soumission API :    ~500ms    (save lead + emails)
Transition :        300ms     (setTimeout)
Calendrier Zcal :   ~2s       (iframe externe)

TOTAL :             ~3s       (de soumission à calendrier visible)
```

### Optimisations
- ✅ Lazy loading du calendrier (seulement si `showZcalModal = true`)
- ✅ Emails envoyés en parallèle (non-bloquant si erreur)
- ✅ Animation 60fps (GPU-accelerated avec Framer Motion)
- ✅ Iframe Zcal avec `loading="eager"` (chargement immédiat)

---

## 🐛 Gestion d'erreurs (Schéma)

```
┌──────────────────────────────────────┐
│  Client soumet le formulaire         │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│  Validation Zod (côté client)       │
│  • Email valide ?                    │
│  • Téléphone valide ?                │
│  • Nom rempli ?                      │
└──────────────────────────────────────┘
         ↓ OK           ↓ ERREUR
         │              └──> ❌ Afficher message sous champ
         ↓
┌──────────────────────────────────────┐
│  Enregistrer lead dans Sanity        │
└──────────────────────────────────────┘
         ↓ OK           ↓ ERREUR
         │              └──> ⚠️ Log warning, continuer quand même
         ↓
┌──────────────────────────────────────┐
│  Envoyer 3 emails                    │
└──────────────────────────────────────┘
         ↓ OK           ↓ ERREUR
         │              └──> ⚠️ Log warning, continuer quand même
         ↓
┌──────────────────────────────────────┐
│  Créer compte étudiant               │
└──────────────────────────────────────┘
         ↓ OK           ↓ ERREUR (compte existe)
         │              └──> ⚠️ Log warning, continuer quand même
         ↓
┌──────────────────────────────────────┐
│  ✅ Fermer formulaire                │
│  ✅ Ouvrir calendrier                │
└──────────────────────────────────────┘
```

**Philosophie :** Ne jamais bloquer le flux principal (prise de RDV) pour des erreurs non-critiques (email, compte).

---

## 📞 Debugging (Console logs)

### Logs attendus lors d'une soumission réussie

```bash
# Serveur Next.js (Terminal)
Lead created: RpaCvKagR22GaRVs5l0QGx
📧 Email à envoyer: { to: 'jean@example.com', type: 'client-welcome' }
✅ Email envoyé: <c2ecb172-eaeb-1fb2-5b5f-e14f1fd761b3@gmail.com>
📧 Email à envoyer: { to: 'teametudantetranger@gmail.com', type: 'client-welcome' }
✅ Email envoyé: <8e918f2f-abf7-2b4c-de2e-bf48a236ee26@gmail.com>
📧 Email à envoyer: { to: 'teametudantetranger@gmail.com', type: 'team-notification' }
✅ Email envoyé: <1a7f5c3e-9d4b-8e2a-3f6c-d5b8e9a2c4f7@gmail.com>

# Navigateur (Console DevTools)
✅ Calendrier Zcal chargé
```

### En cas de problème

```bash
# Si calendrier ne s'ouvre pas
console.log('showZcalModal:', showZcalModal)  // Doit être true
console.log('setTimeout exécuté')             // Vérifier le setTimeout

# Si formulaire ne se ferme pas
console.log('isOpen:', isOpen)                // Doit être false
console.log('onClose() appelé')               // Vérifier l'appel

# Si emails non reçus
console.error('Email failed:', error)         // Erreur SMTP ?
```

---

## ✅ Checklist de test

### Test 1 : Flux complet (Happy path)
- [ ] Ouvrir http://localhost:3000
- [ ] Cliquer "Commencez maintenant"
- [ ] Formulaire s'ouvre
- [ ] Remplir tous les champs
- [ ] Cliquer "Réserver ma consultation"
- [ ] Loader s'affiche (bouton désactivé)
- [ ] Formulaire se ferme après ~1s
- [ ] Calendrier Zcal s'ouvre après 300ms
- [ ] Calendrier est interactif
- [ ] On peut sélectionner une date

### Test 2 : Emails
- [ ] Vérifier console serveur : 3 emails envoyés
- [ ] Vérifier boîte mail client : 1 email reçu
- [ ] Vérifier boîte mail team : 2 emails reçus
- [ ] Email client contient infos personnalisées
- [ ] Email team contient boutons d'action

### Test 3 : Erreurs
- [ ] Soumettre formulaire vide → Messages d'erreur
- [ ] Soumettre email invalide → Message d'erreur
- [ ] Couper internet et soumettre → Message d'erreur
- [ ] Vérifier que calendrier ne s'ouvre pas en cas d'erreur

### Test 4 : Responsive
- [ ] Tester sur mobile (< 640px)
- [ ] Tester sur tablette (640-1024px)
- [ ] Tester sur desktop (> 1024px)
- [ ] Vérifier que tout est lisible
- [ ] Vérifier que boutons sont cliquables

### Test 5 : Performance
- [ ] Mesurer temps de soumission (< 1s)
- [ ] Mesurer temps de transition (300ms)
- [ ] Mesurer temps de chargement Zcal (< 3s)
- [ ] Vérifier animations à 60fps

---

## 🎉 Succès !

Si tous les tests passent :
- ✅ Le flux formulaire → calendrier est opérationnel
- ✅ Les emails sont envoyés correctement
- ✅ L'expérience utilisateur est fluide
- ✅ Le code est prêt pour la production

---

**Date :** 17 octobre 2025  
**Version :** 1.0  
