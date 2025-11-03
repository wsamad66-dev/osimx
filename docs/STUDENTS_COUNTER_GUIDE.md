# 📊 Comment modifier le compteur d'étudiants

Le compteur d'étudiants (ex: "10,000+ étudiants déjà accompagnés") peut maintenant être modifié depuis **Sanity Studio** ! 🎉

## 🎯 Accès rapide

1. **Ouvrir Sanity Studio** : http://localhost:3000/studio (en développement)
2. **Cliquer sur "Hero Section"** dans le menu de gauche
3. **Modifier les champs** :
   - **"Nombre d'étudiants accompagnés"** : ex: `10,000+` ou `15,000+`
   - **"Texte du compteur d'étudiants"** : ex: `étudiants déjà accompagnés`
4. **Cliquer sur "Publish"** pour sauvegarder

## 📍 Où le compteur apparaît

Le compteur s'affiche automatiquement dans :
- ✅ **Hero Section** (page d'accueil)
- ✅ **Formulaire d'inscription rapide** (modal)
- ✅ **Autres sections** (utilise la valeur par défaut de config)

## 🔧 Valeurs par défaut

Si aucune valeur n'est définie dans Sanity, le système utilise automatiquement :
- **Nombre** : `10,000+` (défini dans `src/config/stats.ts`)
- **Texte** : `étudiants déjà accompagnés`

## 🚀 Première utilisation

Exécutez cette commande pour initialiser les valeurs dans Sanity :

\`\`\`bash
npm run update-hero-stats
\`\`\`

## 📝 Modifier manuellement les valeurs

### Via Sanity Studio (Recommandé) ✨
1. Allez sur http://localhost:3000/studio
2. Cliquez sur "Hero Section"
3. Modifiez "Nombre d'étudiants accompagnés" : `15,000+`
4. Modifiez "Texte du compteur" : `étudiants satisfaits`
5. Cliquez sur "Publish"

### Via le code (Fallback)
Éditez le fichier `src/config/stats.ts` :

\`\`\`typescript
export const STATS = {
  studentsHelped: '15,000+',
  studentsHelpedText: 'étudiants satisfaits',
  // ...
}
\`\`\`

## 🎨 Exemples de valeurs

```
10,000+ étudiants déjà accompagnés
15K+ étudiants satisfaits
20,000+ futurs leaders accompagnés
10k+ success stories
```

## 🔄 Synchronisation

Les modifications dans Sanity Studio sont **instantanées** :
- ✅ Pas besoin de redémarrer le serveur
- ✅ Les changements apparaissent immédiatement après publication
- ✅ Fonctionne en développement et en production

## 📱 Mobile-Friendly

Le compteur est optimisé pour tous les écrans :
- Desktop : Texte complet
- Mobile : Texte adapté (si trop long)

---

**💡 Astuce** : Utilisez des valeurs arrondies comme `10k+`, `15,000+` ou `20K+` pour plus d'impact visuel !
