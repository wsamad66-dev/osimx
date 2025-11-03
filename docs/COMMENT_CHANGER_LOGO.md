# 🎨 Comment Changer le Logo depuis Sanity

## Problème Résolu ✅

Le logo est maintenant dynamique et se charge depuis Sanity CMS. Voici comment le changer :

---

## 📝 Étapes pour Changer le Logo

### 1. Ouvrez Sanity Studio

```bash
npm run sanity
```

Ou visitez : `http://localhost:3000/studio`

### 2. Naviguez vers Navigation

Dans Sanity Studio :
1. Cliquez sur **"Navigation / Header"** dans le menu latéral
2. Sélectionnez le document de navigation (normalement "Header Principal")

### 3. Uploadez Votre Logo

1. Faites défiler jusqu'à la section **"Logo"**
2. Cliquez sur **"Image du logo (optionnel)"**
3. Cliquez sur **"Upload"** ou glissez-déposez votre fichier
4. Cliquez sur **"Publish"** pour sauvegarder

### 4. Rafraîchissez Votre Site

Le logo devrait apparaître immédiatement après un rafraîchissement de la page :
- Appuyez sur `Cmd + Shift + R` (Mac) ou `Ctrl + Shift + F5` (Windows)
- Ou fermez et rouvrez votre navigateur

---

## 🖼️ Recommandations pour le Logo

### Format
- **Format recommandé** : PNG avec fond transparent
- **Formats acceptés** : PNG, JPG, SVG, WEBP

### Dimensions
- **Largeur recommandée** : 160-200px
- **Hauteur recommandée** : 40-50px
- **Ratio** : 4:1 ou 3:1 (largeur:hauteur)

### Qualité
- **Résolution** : 2x pour écrans Retina (320px de largeur pour un affichage à 160px)
- **Poids du fichier** : < 100KB pour des performances optimales
- **Qualité** : Haute résolution, contours nets

### Exemple de Dimensions
```
Logo affiché à 160x40px → Créer une image de 320x80px
Logo affiché à 200x50px → Créer une image de 400x100px
```

---

## 🔧 Comment Ça Fonctionne

### Avant (Logo Codé en Dur)
```tsx
<svg width="40" height="40">...</svg>
<span>L'Étudiant à l'Étranger</span>
```

### Après (Logo Dynamique depuis Sanity)
```tsx
{navData.logo?.image?.asset?.url ? (
  <Image 
    src={navData.logo.image.asset.url}
    alt={navData.logo.text}
    width={160}
    height={40}
  />
) : (
  /* Fallback vers SVG si pas d'image */
)}
```

---

## 🐛 Dépannage

### Le logo ne s'affiche pas ?

#### 1. Vérifiez que l'image est publiée
- Dans Sanity Studio, assurez-vous d'avoir cliqué sur **"Publish"**
- Le statut doit être "Published" et non "Draft"

#### 2. Effacez le cache
```bash
# Arrêtez le serveur
# Puis supprimez le cache Next.js
rm -rf .next

# Redémarrez
npm run dev
```

#### 3. Vérifiez les variables d'environnement
Assurez-vous que `.env.local` contient :
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

#### 4. Vérifiez la console du navigateur
Ouvrez les DevTools (F12) et cherchez des erreurs comme :
- ❌ Image hostname not configured
- ❌ Failed to load image
- ✅ Si l'URL de l'image contient `cdn.sanity.io`, c'est bon

#### 5. Testez l'URL de l'image
Copiez l'URL de l'image depuis Sanity et collez-la dans un nouvel onglet du navigateur.
Si elle ne se charge pas, le problème vient de Sanity, pas de Next.js.

---

## 📱 Affichage Responsive

Le logo s'adapte automatiquement :
- **Desktop** : Largeur maximale de 160px
- **Mobile** : Largeur réduite automatiquement
- **Retina** : Image 2x pour une qualité parfaite

---

## 🎨 Options de Personnalisation

### Modifier la taille du logo

Éditez `/src/components/layout/EnhancedNavigation.tsx` :

```tsx
<Image 
  src={navData.logo.image.asset.url}
  alt={navData.logo.text}
  width={200}  // ← Changez ici
  height={50}  // ← Et ici
  className="h-12 w-auto object-contain" // ← ou ici pour hauteur CSS
/>
```

### Ajouter un texte à côté du logo

Dans Sanity Studio :
1. Allez dans Navigation → Logo
2. Remplissez **"Texte du logo"**
3. Le texte apparaîtra automatiquement si vous le configurez dans le composant

---

## ✅ Vérification Finale

- [ ] Logo uploadé dans Sanity Studio
- [ ] Document publié (pas en draft)
- [ ] Cache Next.js effacé (`rm -rf .next`)
- [ ] Serveur redémarré (`npm run dev`)
- [ ] Page rafraîchie en mode hard refresh (Cmd+Shift+R)
- [ ] Logo visible sur le site

---

## 📞 Support

Si le logo ne s'affiche toujours pas après avoir suivi tous ces steps :

1. Vérifiez que le domaine `cdn.sanity.io` est dans `next.config.ts` (✅ déjà fait)
2. Testez avec un autre format d'image (essayez PNG au lieu de JPG)
3. Vérifiez que le fichier n'est pas corrompu
4. Essayez de télécharger une image différente

---

**Dernière mise à jour** : 13 octobre 2025
**Fichiers modifiés** :
- `/src/components/layout/EnhancedNavigation.tsx` ✅
- `/next.config.ts` ✅ (déjà configuré)
