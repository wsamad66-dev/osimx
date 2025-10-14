# 🎓 Partners Banner Component

Une section de bannière défilante pour afficher les logos des universités et partenaires de manière élégante et professionnelle.

## 🌟 Fonctionnalités

- ✅ **Défilement infini** avec animation fluide
- ✅ **Responsive** (mobile et desktop)
- ✅ **Effet grayscale** → couleur au survol
- ✅ **Scale up** au survol
- ✅ **Pause automatique** au survol
- ✅ **Vitesse configurable**
- ✅ **Support Sanity CMS**
- ✅ **Effets de brillance** (shine effect)
- ✅ **Dégradés de fondu** sur les bords
- ✅ **Version compacte** pour footer

## 📦 Installation

Le composant est déjà créé dans `/src/components/home/PartnersBanner.tsx`

### Dépendances requises

```json
{
  "framer-motion": "^11.x",
  "next": "^14.x",
  "react": "^18.x"
}
```

## 🚀 Usage Basique

### 1. Utilisation par défaut

```tsx
import { PartnersBanner } from '@/components/home/PartnersBanner'

export default function HomePage() {
  return (
    <div>
      {/* Vos autres sections */}
      <PartnersBanner />
      {/* Suite du contenu */}
    </div>
  )
}
```

### 2. Configuration personnalisée

```tsx
<PartnersBanner 
  title="🌍 Nos partenaires dans le monde"
  speed={30}
  pauseOnHover={true}
  showTitle={true}
/>
```

### 3. Liste de partenaires personnalisée

```tsx
const customPartners = [
  { 
    name: 'Harvard University', 
    logo: '/images/partners/harvard.png', 
    country: 'USA',
    _key: 'harvard' 
  },
  { 
    name: 'Oxford University', 
    logo: '/images/partners/oxford.png', 
    country: 'UK',
    _key: 'oxford' 
  },
]

<PartnersBanner partners={customPartners} />
```

### 4. Version compacte (pour footer)

```tsx
import { CompactPartnersBanner } from '@/components/home/PartnersBanner'

<CompactPartnersBanner speed={40} />
```

## 🎨 Props API

### PartnersBanner

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `partners` | `Partner[]` | defaultPartners | Liste des partenaires à afficher |
| `speed` | `number` | 50 | Vitesse du défilement (plus bas = plus rapide) |
| `pauseOnHover` | `boolean` | true | Mettre en pause au survol |
| `title` | `string` | "🎓 Ils nous font confiance" | Titre de la section |
| `showTitle` | `boolean` | true | Afficher le titre |

### Partner Interface

```typescript
interface Partner {
  name: string          // Nom de l'université
  logo: string         // Chemin vers le logo
  country?: string     // Pays (optionnel)
  _key?: string       // Identifiant unique
}
```

## 📁 Structure des Logos

Placez vos logos dans `/public/images/partners/`:

```
/public/images/partners/
  ├── sorbonne.png
  ├── udem.png
  ├── uclouvain.png
  ├── ulaval.png
  ├── hec-montreal.png
  ├── sciences-po.png
  ├── mcgill.png
  ├── polytechnique.png
  └── placeholder.png
```

### Recommandations pour les logos

- **Format**: PNG avec fond transparent
- **Dimensions**: ~300x200px (optimales)
- **Poids**: < 50KB par image
- **Couleur**: Couleur complète (le grayscale est appliqué en CSS)
- **Qualité**: Haute résolution pour affichage net

## 🔌 Intégration avec Sanity CMS

### 1. Le schéma est déjà créé

Le fichier `/sanity/schemas/partner.ts` est prêt à l'emploi.

### 2. Ajouter des partenaires dans Sanity Studio

1. Ouvrez Sanity Studio : `npm run sanity`
2. Créez un nouveau document "Partenaires / Universités"
3. Remplissez les champs et uploadez le logo
4. Définissez l'ordre d'affichage

### 3. Fetcher depuis Sanity

```tsx
import { client } from '@/lib/sanity.client'

async function HomePage() {
  // Requête GROQ pour récupérer les partenaires actifs
  const partners = await client.fetch(`
    *[_type == "partner" && isActive == true] | order(order asc) {
      name,
      "logo": logo.asset->url,
      country,
      _id
    }
  `)

  return (
    <PartnersBanner partners={partners} />
  )
}
```

### 4. Version avec ISR (Incremental Static Regeneration)

```tsx
// Dans votre page (App Router)
export const revalidate = 3600 // Revalider toutes les heures

export default async function HomePage() {
  const partners = await getPartners()
  
  return <PartnersBanner partners={partners} />
}

async function getPartners() {
  const partners = await client.fetch(`
    *[_type == "partner" && isActive == true] | order(order asc) {
      name,
      "logo": logo.asset->url,
      country
    }
  `, {}, { next: { revalidate: 3600 } })
  
  return partners
}
```

## 🎨 Personnalisation CSS

### Modifier les couleurs

```tsx
// Dans votre fichier tailwind.config.ts, ajoutez vos couleurs
// Le composant utilise: blue-600, orange-100, gray-50, etc.

// Ou modifiez directement dans PartnersBanner.tsx:
<div className="bg-gradient-to-b from-your-color-50 to-white">
```

### Modifier l'effet hover

Dans `PartnersBanner.tsx`, ligne ~185:

```tsx
whileHover={{ scale: 1.08, y: -6 }} // Scale plus grand et lift plus haut
```

### Changer la vitesse par défaut

```tsx
speed={30} // Plus rapide
speed={100} // Plus lent
```

## 📱 Responsive Design

Le composant s'adapte automatiquement:

- **Mobile** (< 640px): Logos 160px, gaps réduits
- **Tablet** (640px-1024px): Logos 192px
- **Desktop** (> 1024px): Pleine taille

## 🧪 Tests

```tsx
// Test avec différentes configurations
<PartnersBanner 
  partners={[
    { name: 'Test 1', logo: '/test1.png', country: 'Test' }
  ]}
  speed={20}
  pauseOnHover={false}
  showTitle={false}
/>
```

## 🚀 Performance

- **Animation GPU-accelerated** via Framer Motion
- **Will-change transform** pour optimisation
- **Images Next.js optimisées** avec lazy loading
- **Grayscale CSS** au lieu de filtres SVG
- **Seamless loop** sans re-render

## 🐛 Troubleshooting

### Les logos ne s'affichent pas

1. Vérifiez que les images sont dans `/public/images/partners/`
2. Vérifiez les chemins: `/images/partners/nom.png` (pas `./` ou `../`)
3. Consultez la console pour les erreurs 404

### L'animation saccade

1. Réduisez le nombre de partenaires dupliqués
2. Augmentez la valeur de `speed`
3. Vérifiez que les images sont optimisées (< 50KB)

### Les logos ne deviennent pas colorés au hover

1. Vérifiez que vos logos sont en couleur (pas déjà en grayscale)
2. Testez avec `grayscale-0` directement dans le CSS

## 📚 Exemples Complets

### Homepage complète

```tsx
import { PartnersBanner } from '@/components/home/PartnersBanner'
import { Hero } from '@/components/home/Hero'
import { Services } from '@/components/home/Services'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <PartnersBanner />
      {/* Autres sections */}
    </main>
  )
}
```

### Avec données Sanity

```tsx
import { PartnersBanner } from '@/components/home/PartnersBanner'
import { client } from '@/lib/sanity.client'

export const revalidate = 3600

export default async function PartnersPage() {
  const partners = await client.fetch(`
    *[_type == "partner" && isActive == true] | order(order asc) {
      name,
      "logo": logo.asset->url,
      country,
      description,
      website
    }
  `)

  return (
    <div>
      <PartnersBanner 
        partners={partners}
        title="🌍 Nos Partenaires Internationaux"
        speed={40}
      />
    </div>
  )
}
```

## 🎉 Résultat Final

Le composant affiche une bannière élégante avec:
- ✨ Animation fluide et infinie
- 🎨 Transition grayscale → couleur
- 🔍 Zoom et lift au survol
- ⏸️ Pause automatique au hover
- 📱 Parfaitement responsive
- 🚀 Performant et optimisé

## 📞 Support

Pour toute question ou amélioration:
- Consultez la documentation de Framer Motion
- Vérifiez les props dans le code source
- Testez avec différentes configurations

---

**Créé pour L'Étudiant Étranger** 🎓
