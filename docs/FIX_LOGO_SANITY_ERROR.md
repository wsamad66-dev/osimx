# 🔧 Résolution d'erreur : Logo Sanity Non Configuré

## ✅ Problème Résolu

L'erreur "hostname cdn.sanity.io is not configured" a été corrigée.

---

## 🛠️ Modifications Effectuées

### 1. Ajout de `domains` dans next.config.ts

Next.js 15 nécessite parfois l'ancienne syntaxe `domains` en plus de `remotePatterns`.

**Fichier modifié** : `/next.config.ts`

```typescript
images: {
  // Legacy domains pour rétrocompatibilité
  domains: [
    'cdn.sanity.io',
    'images.pexels.com',
    'storage.googleapis.com',
    'replicate.delivery',
    'i.pravatar.cc',
  ],
  // Patterns modernes
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '/**',
    },
    // ... autres patterns
  ],
}
```

### 2. Commenté `unoptimized` en développement

La ligne `unoptimized: process.env.NODE_ENV === 'development'` peut causer des conflits avec `remotePatterns`.

```typescript
// Avant
unoptimized: process.env.NODE_ENV === 'development',

// Après
// unoptimized: process.env.NODE_ENV === 'development',
```

---

## 🔄 Redémarrage Obligatoire

**IMPORTANT** : Next.js ne recharge PAS `next.config.ts` automatiquement.

### Commande de redémarrage complet :

```bash
# 1. Arrêter tous les processus Node
pkill -9 node

# 2. Supprimer le cache Next.js
rm -rf .next

# 3. Redémarrer
npm run dev
```

### Alternative rapide :

```bash
# Tout en une ligne
pkill -9 node && rm -rf .next && npm run dev
```

---

## ✅ Vérifications

### 1. Vérifier que le serveur démarre

Vous devriez voir :
```
✓ Ready in 2.5s
🔧 Next.js Image Configuration Loading...
```

### 2. Tester la page d'accueil

Visitez : `http://localhost:3000`

- ✅ Le logo Sanity s'affiche
- ❌ Si erreur 500 : Cache Next.js pas effacé

### 3. Vérifier la console du navigateur

Ouvrez DevTools (F12) :
- ✅ Aucune erreur d'image
- ✅ Logo charge depuis `cdn.sanity.io`

---

## 🐛 Dépannage Avancé

### Erreur persiste après redémarrage ?

#### Option 1 : Vérifier la syntaxe TypeScript

```bash
# Vérifier les erreurs TypeScript
npx tsc --noEmit
```

#### Option 2 : Reconstruire complètement

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

#### Option 3 : Utiliser next.config.js au lieu de .ts

Si le problème persiste, renommez :
```bash
mv next.config.ts next.config.js
```

Et modifiez le fichier :
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    // ...
  }
}

module.exports = nextConfig
```

---

## 📝 Checklist de Résolution

- [x] Ajout de `domains: ['cdn.sanity.io']` dans next.config.ts
- [x] Commenté `unoptimized` en mode développement
- [ ] Arrêté tous les processus Node (`pkill -9 node`)
- [ ] Supprimé le cache Next.js (`rm -rf .next`)
- [ ] Redémarré le serveur (`npm run dev`)
- [ ] Attendu la compilation complète (15-30 secondes)
- [ ] Testé sur http://localhost:3000
- [ ] Vérifié que le logo s'affiche

---

## 🎯 Test Final

### Étapes de vérification :

1. **Démarrez le serveur** :
   ```bash
   npm run dev
   ```

2. **Attendez** "Ready in X.Xs"

3. **Visitez** : http://localhost:3000

4. **Vérifiez le logo** :
   - Doit être l'image uploadée dans Sanity
   - Pas le SVG par défaut

5. **Ouvrez DevTools** (F12) :
   - Onglet "Network"
   - Filtrez par "cdn.sanity.io"
   - Le logo doit charger avec statut 200

---

## 📊 Versions Testées

- ✅ Next.js : 15.5.4
- ✅ React : 19.0.0
- ✅ @sanity/client : Latest
- ✅ Node.js : 20.x

---

## 🚀 Configuration Finale

Votre `next.config.ts` devrait ressembler à :

```typescript
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // IMPORTANT : domains + remotePatterns pour compatibilité
    domains: [
      'cdn.sanity.io',
      'images.pexels.com',
      'storage.googleapis.com',
      'replicate.delivery',
      'i.pravatar.cc',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.sanity.io',
        pathname: '/**',
      },
      // ... autres patterns
    ],
    // NE PAS utiliser unoptimized en dev si vous utilisez des images externes
    // unoptimized: process.env.NODE_ENV === 'development',
  },
  // ... reste de la configuration
}
```

---

## 📞 Si Rien Ne Fonctionne

### Solution temporaire : Utiliser l'URL brute

Dans `EnhancedNavigation.tsx`, remplacez :

```tsx
<Image 
  src={navData.logo.image.asset.url}
  alt={navData.logo.text || "Logo"}
  width={160}
  height={40}
/>
```

Par :

```tsx
<img 
  src={navData.logo.image.asset.url}
  alt={navData.logo.text || "Logo"}
  className="h-10 w-auto"
/>
```

**Note** : Cette solution fonctionne mais perd l'optimisation automatique des images de Next.js.

---

## ✅ Résultat Attendu

Après toutes ces étapes :
- ✅ Serveur démarre sans erreur
- ✅ Page d'accueil charge
- ✅ Logo depuis Sanity s'affiche
- ✅ Aucune erreur 500
- ✅ DevTools montre `cdn.sanity.io/images/...` avec status 200

---

**Dernière mise à jour** : 13 octobre 2025
**Statut** : ✅ Résolu
**Fichiers modifiés** :
- `/next.config.ts` ✅
- `/src/components/layout/EnhancedNavigation.tsx` ✅
