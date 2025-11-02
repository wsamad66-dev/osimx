# 🔍 Debug: Dropdown Pays ne Fonctionne Pas en Production

**Date:** 3 novembre 2025  
**Problème:** La liste déroulante des pays s'affiche en local mais reste vide en production

---

## ✅ Vérifications Effectuées

### 1. Code Source
- ✅ `COUNTRIES` et `COUNTRY_GROUPS` sont bien définis au niveau du module
- ✅ Le select utilise `COUNTRY_GROUPS` correctement
- ✅ Le code est compatible SSR (Server-Side Rendering)

### 2. Git & Déploiement
- ✅ Commit `2d9431a` : Fix dropdown pays
- ✅ Commit `e8cc972` : Documentation
- ✅ Commit `db0db32` : Force redéploiement
- ✅ Tous les commits sont poussés sur `origin/ouassimsamad-dev`

---

## 🔴 Causes Possibles

### Cause #1: Le Build Vercel a Échoué
**Symptôme:** Le code est bon, mais Vercel n'a pas réussi à build

**Solution:**
1. Allez sur https://vercel.com/ouassim-samads-projects/osimx
2. Cliquez sur l'onglet "Deployments"
3. Vérifiez le statut du dernier déploiement :
   - 🟢 "Ready" = Déploiement réussi
   - 🔴 "Failed" = Échec du build
   - 🟡 "Building..." = En cours

**Si le build a échoué:**
```bash
# Vérifier les erreurs de build localement
npm run build

# Si des erreurs apparaissent, les corriger puis:
git add .
git commit -m "fix: Corriger erreurs de build"
git push origin ouassimsamad-dev
```

---

### Cause #2: Cache du Navigateur
**Symptôme:** Le nouveau code est déployé mais vous voyez toujours l'ancienne version

**Solution:**
1. **Hard Refresh:**
   - **Mac:** `Cmd + Shift + R`
   - **Windows/Linux:** `Ctrl + Shift + R`

2. **Navigation Privée:**
   - Ouvrez une fenêtre de navigation privée
   - Visitez votre site de production
   - Testez le dropdown

3. **Vider le Cache:**
   - Chrome: Paramètres > Confidentialité > Effacer les données de navigation
   - Cochez "Images et fichiers en cache"
   - Période: "Dernières 24 heures"

---

### Cause #3: Vercel Edge Cache
**Symptôme:** Vercel met en cache l'ancienne version de la page

**Solution:**
1. Dans le dashboard Vercel, allez dans "Settings" > "General"
2. Trouvez "Deployment Protection"
3. Cliquez sur "Purge Cache"

**OU** Ajoutez un header de cache dans `next.config.ts`:

```typescript
// next.config.ts
const nextConfig = {
  // ... existing config
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}
```

---

### Cause #4: Variables d'Environnement Manquantes
**Symptôme:** Le composant ne se rend pas correctement côté serveur

**Solution:**
Vérifier que toutes les variables d'environnement sont définies dans Vercel:

1. Allez sur https://vercel.com/ouassim-samads-projects/osimx
2. Settings > Environment Variables
3. Vérifiez que ces variables existent:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `NEXT_PUBLIC_TEAM_EMAIL`

---

### Cause #5: Mauvaise Branche Déployée
**Symptôme:** Vercel déploie `main` au lieu de `ouassimsamad-dev`

**Solution:**
1. Vercel Dashboard > Settings > Git
2. Vérifiez "Production Branch" = `ouassimsamad-dev`
3. Ou changez vers la bonne branche

---

## 🧪 Tests de Diagnostic

### Test 1: Vérifier que le Code est Déployé
```bash
# Sur votre machine locale
git log --oneline -1

# Devrait afficher:
# db0db32 chore: Force redéploiement Vercel pour fix dropdown pays
```

### Test 2: Inspecter le HTML en Production
1. Ouvrez votre site de production
2. Clic droit > "Inspecter" (F12)
3. Ouvrez le modal d'inscription
4. Dans l'onglet "Elements", cherchez le `<select>` du pays
5. Vérifiez si les `<option>` sont présentes dans le DOM

**Si les options SONT dans le DOM mais invisible:**
→ Problème CSS/Styling

**Si les options NE SONT PAS dans le DOM:**
→ Problème JavaScript/Hydration

### Test 3: Console JavaScript
1. F12 > Onglet "Console"
2. Regardez s'il y a des erreurs rouges
3. Erreurs courantes:
   - `Hydration failed` → Problème SSR
   - `Cannot read property of undefined` → Variable non définie
   - `Network error` → API non accessible

---

## 🔧 Solution Radicale: Rebuild Complet

Si rien ne fonctionne, forcer un rebuild complet:

```bash
# 1. Nettoyer le cache local
rm -rf .next node_modules/.cache

# 2. Réinstaller les dépendances
npm install

# 3. Tester le build local
npm run build

# 4. Si le build réussit, forcer un nouveau déploiement
git commit --allow-empty -m "fix: Force rebuild complet Vercel"
git push origin ouassimsamad-dev

# 5. Attendre 3-5 minutes

# 6. Tester en navigation privée
```

---

## 📞 Vérification Finale

### Checklist avant de déclarer "ça marche" :

- [ ] Le build Vercel est "Ready" (pas "Building" ni "Failed")
- [ ] Hard refresh effectué (`Cmd + Shift + R`)
- [ ] Testé en navigation privée
- [ ] Console JavaScript sans erreurs
- [ ] Le `<select>` contient bien les `<option>` dans le DOM
- [ ] Le dropdown affiche France, Canada, États-Unis, Sénégal, etc.
- [ ] On peut sélectionner un pays et soumettre le formulaire

---

## 🎯 Cas Spécial: Le Dropdown Fonctionne Mais est Trop Long

Si le dropdown s'affiche mais est coupé ou trop grand:

**Solution CSS:**
```css
/* Dans le fichier CSS global ou component */
select {
  max-height: 300px;
  overflow-y: auto;
}
```

---

## 📚 Ressources

- **Documentation Vercel:** https://vercel.com/docs/deployments/troubleshoot
- **Next.js SSR Debug:** https://nextjs.org/docs/messages/react-hydration-error
- **Fix précédent:** `docs/FIX_COUNTRY_DROPDOWN.md`

---

## 🆘 Si Rien Ne Marche

**Dernière option:**

1. Vérifiez que vous testez bien sur l'URL de production (pas localhost)
2. Essayez un autre navigateur (Firefox, Safari, Edge)
3. Essayez sur un autre appareil (téléphone, tablette)
4. Partagez le lien de votre déploiement Vercel pour debug

---

**Créé le:** 3 novembre 2025  
**Auteur:** Assistant de Développement  
**Statut:** 🔴 En investigation
