# 🚀 Quick Start - Intégration Système de Rendez-vous

## Étape 1: Ajouter sur la Homepage

### Option A: Section complète avec formulaire

```tsx
// src/app/page.tsx
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export default function HomePage() {
  return (
    <>
      {/* Votre contenu existant */}
      <HeroSection />
      <DestinationsSection />
      
      {/* Ajoutez la section de prise de rendez-vous */}
      <AppointmentForm variant="section" />
      
      <TestimonialsSection />
      <Footer />
    </>
  )
}
```

### Option B: Bouton CTA qui navigue vers /rendez-vous

```tsx
// src/app/page.tsx
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'

export default function HomePage() {
  return (
    <section className="hero">
      <h1>Étudiez à l'étranger en toute sérénité</h1>
      <p>Accompagnement personnalisé de A à Z</p>
      
      {/* Bouton qui navigue vers /rendez-vous */}
      <AppointmentCTA 
        text="Réserver ma consultation gratuite"
        variant="primary"
        size="lg"
      />
    </section>
  )
}
```

### Option C: Bouton qui scroll vers le formulaire

```tsx
// src/app/page.tsx
import { AppointmentCTA } from '@/components/appointment/AppointmentCTA'
import { AppointmentForm } from '@/components/appointment/AppointmentForm'

export default function HomePage() {
  return (
    <>
      {/* Hero avec CTA */}
      <section className="hero">
        <h1>Étudiez à l'étranger en toute sérénité</h1>
        
        {/* Bouton qui scroll vers le formulaire */}
        <AppointmentCTA 
          text="Consultation gratuite 30 min"
          scrollTo="appointment"
          variant="primary"
          size="lg"
        />
      </section>
      
      {/* Autres sections... */}
      <DestinationsSection />
      <TestimonialsSection />
      
      {/* Formulaire avec ID pour le scroll */}
      <div id="appointment">
        <AppointmentForm variant="section" />
      </div>
    </>
  )
}
```

---

## Étape 2: Personnaliser les styles

### Personnaliser le bouton CTA

```tsx
<AppointmentCTA 
  text="🎓 Je veux étudier à l'étranger"
  variant="secondary"  // primary | secondary | outline
  size="lg"           // sm | md | lg
  className="mt-8"    // Classes Tailwind additionnelles
/>
```

### Personnaliser le formulaire

```tsx
<AppointmentForm 
  variant="inline"    // inline pour intégration personnalisée
  className="max-w-2xl mx-auto"
  onSuccess={() => {
    // Action après succès
    console.log('Rendez-vous réservé!')
    // Rediriger vers /merci
    router.push('/merci')
  }}
/>
```

---

## Étape 3: Configurer Sanity

### 1. Déployer le schéma
```bash
cd /Users/asf/Documents/GitHub/osimx
npx sanity deploy
```

### 2. Vérifier dans Sanity Studio
1. Ouvrez http://localhost:3000/studio
2. Vous devriez voir "Leads & Rendez-vous 📅" dans le menu
3. Testez l'ajout d'un lead manuellement

---

## Étape 4: Tester le système

### Test local
```bash
npm run dev
```

### 1. Tester le formulaire
- Ouvrez http://localhost:3000/rendez-vous
- Remplissez le formulaire
- Cliquez sur "Réserver ma consultation gratuite"

### 2. Vérifier le modal
- Le modal avec zcal devrait s'ouvrir
- Testez le bouton de fermeture
- Vérifiez que l'iframe se charge

### 3. Vérifier Sanity
- Retournez dans Sanity Studio
- Vérifiez qu'un nouveau lead est créé
- Status devrait être "📝 Nouveau"

### 4. Tester GA4 (si configuré)
- Ouvrez Chrome DevTools > Network
- Filtrez par "collect"
- Soumettez le formulaire
- Vérifiez les events: `appointment_form_submitted`

---

## Étape 5: Déployer

### Préparer le déploiement
```bash
# Vérifier qu'il n'y a pas d'erreurs
npm run build

# Si tout est OK, commit
git add .
git commit -m "feat: Add appointment booking system with zcal integration"
git push origin ouassimsamad-dev
```

### Déploiement automatique sur Vercel
- Vercel détecte automatiquement le push
- Le build se lance
- Vérifiez sur https://letudiantetranger.com/rendez-vous

---

## Variables d'environnement

### Assurez-vous que ces variables sont configurées sur Vercel:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token

# Google Analytics (optionnel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 🎯 Résultat attendu

### ✅ Formulaire fonctionnel
- Validation des champs
- Messages d'erreur clairs
- Design responsive

### ✅ Modal zcal
- S'ouvre après soumission
- Iframe zcal chargée
- Bouton fermeture fonctionnel
- Animation fluide

### ✅ Sauvegarde Sanity
- Lead créé dans Sanity
- Toutes les données présentes
- Status "pending"

### ✅ Page confirmation
- Message de succès
- Instructions claires
- Liens de retour

---

## 🐛 Dépannage rapide

### Le formulaire ne soumet pas
```bash
# Vérifiez la console du navigateur
# Vérifiez que l'API répond
curl -X POST http://localhost:3000/api/save-lead \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

### Le modal ne s'ouvre pas
```bash
# Vérifiez que Framer Motion est installé
npm list framer-motion

# Si non installé
npm install framer-motion
```

### Sanity ne sauvegarde pas
```bash
# Vérifiez les variables d'environnement
echo $NEXT_PUBLIC_SANITY_PROJECT_ID

# Vérifiez le token
# Dans sanity.io > API > Tokens
# Créez un token avec permission "Editor"
```

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Consultez `docs/APPOINTMENT_SYSTEM_GUIDE.md`
2. Vérifiez les logs Vercel
3. Testez en local avec `npm run dev`
4. Contactez le support

---

**Prêt à booster vos conversions!** 🚀📅
