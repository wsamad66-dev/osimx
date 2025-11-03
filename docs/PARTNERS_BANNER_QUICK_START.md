# 🚀 Partners Banner - Guide de Démarrage Rapide

## ⚡ Installation en 3 étapes

### 1️⃣ Le composant est prêt !
Le fichier `PartnersBanner.tsx` est déjà créé dans `/src/components/home/`

### 2️⃣ Ajoutez vos logos
Placez vos logos d'universités dans `/public/images/partners/`:
- Format: PNG transparent (recommandé)
- Taille: ~300x200px
- Nommez-les clairement: `sorbonne.png`, `mcgill.png`, etc.

### 3️⃣ Utilisez le composant

```tsx
import { PartnersBanner } from '@/components/home/PartnersBanner'

export default function HomePage() {
  return (
    <main>
      {/* Vos sections */}
      <PartnersBanner />
    </main>
  )
}
```

## 🎨 Voir en action

Visitez la page de test : **http://localhost:3000/partners-test**

## 🎯 Options rapides

### Changer la vitesse
```tsx
<PartnersBanner speed={30} /> {/* Plus rapide */}
<PartnersBanner speed={100} /> {/* Plus lent */}
```

### Changer le titre
```tsx
<PartnersBanner title="🌍 Nos partenaires internationaux" />
```

### Désactiver la pause au survol
```tsx
<PartnersBanner pauseOnHover={false} />
```

### Liste personnalisée
```tsx
const partners = [
  { name: 'Sorbonne', logo: '/images/partners/sorbonne.png', country: 'France' },
  { name: 'McGill', logo: '/images/partners/mcgill.png', country: 'Canada' },
]

<PartnersBanner partners={partners} />
```

## 📱 Version compacte (pour footer)

```tsx
import { CompactPartnersBanner } from '@/components/home/PartnersBanner'

<CompactPartnersBanner />
```

## 🔌 Avec Sanity CMS (optionnel)

Le schéma est déjà créé ! Pour l'utiliser :

1. Redémarrez Sanity Studio: `npm run sanity`
2. Ajoutez vos partenaires via l'interface
3. Fetchez les données:

```tsx
const partners = await client.fetch(`
  *[_type == "partner" && isActive == true] | order(order asc) {
    name,
    "logo": logo.asset->url,
    country
  }
`)

<PartnersBanner partners={partners} />
```

## ✅ Checklist

- [ ] Logos ajoutés dans `/public/images/partners/`
- [ ] Composant importé dans votre page
- [ ] Testé sur mobile et desktop
- [ ] Logos en couleur (grayscale automatique)
- [ ] Vitesse ajustée selon préférence

## 🎯 Props disponibles

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `partners` | Partner[] | Liste par défaut | Vos partenaires |
| `speed` | number | 50 | Vitesse de défilement |
| `pauseOnHover` | boolean | true | Pause au survol |
| `title` | string | "🎓 Ils nous font confiance" | Titre |
| `showTitle` | boolean | true | Afficher titre |

## 🐛 Problèmes courants

**Logos ne s'affichent pas ?**
- Vérifiez le chemin: `/images/partners/nom.png`
- Assurez-vous que les images sont dans `/public/`

**Animation saccade ?**
- Optimisez vos images (< 50KB)
- Augmentez la valeur de `speed`

**Logos déjà en grayscale ?**
- Utilisez des logos en couleur
- Le grayscale est appliqué par CSS

## 📚 Documentation complète

Consultez `/docs/PARTNERS_BANNER_GUIDE.md` pour:
- Intégration Sanity détaillée
- Personnalisation avancée
- Exemples complets
- Troubleshooting

## 🎉 C'est tout !

Votre bannière de partenaires est prête à être utilisée ! 🚀

---

**Questions ?** Consultez la documentation complète ou testez sur `/partners-test`
