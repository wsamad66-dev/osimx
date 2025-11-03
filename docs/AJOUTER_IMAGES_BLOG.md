# 📸 Guide: Ajouter des Images aux Articles de Blog

## 🎯 Méthode Simple: Via Sanity Studio

### Étape 1: Accéder au Studio

Ouvre ton navigateur et va sur:
```
https://osimx.vercel.app/studio
```

### Étape 2: Naviguer vers les Articles

1. Dans le menu de gauche, clique sur **"Articles de Blog"**
2. Tu verras la liste de tous tes articles

### Étape 3: Modifier un Article

1. Clique sur un article sans image (tu verras qu'il n'y a pas de miniature)
2. Scroll jusqu'à la section **"Image principale"**
3. Clique sur **"Upload"** ou glisse-dépose une image

### Étape 4: Optimiser l'Image

**Dimensions recommandées**: `1200 x 630 pixels`
- Parfait pour les partages sur réseaux sociaux (Facebook, Twitter, LinkedIn)
- Ratio 1.91:1 (paysage)

**Formats acceptés**:
- JPG (meilleur pour photos)
- PNG (meilleur pour graphiques avec texte)
- WebP (meilleur pour performance)

**Poids recommandé**: < 200 KB

### Étape 5: Ajouter le Texte Alternatif

1. Après upload, remplis le champ **"Texte alternatif"**
2. Exemple: `"Étudiants internationaux devant l'université de Toronto"`
3. C'est important pour:
   - **SEO** (Google comprend mieux ton image)
   - **Accessibilité** (pour les personnes malvoyantes)

### Étape 6: Ajouter une Légende (Optionnel)

Si tu veux ajouter un crédit photo:
```
Photo: Unsplash / Nom du photographe
```

### Étape 7: Publier

Clique sur **"Publish"** en haut à droite ✅

---

## 🖼️ Sources d'Images Gratuites

### Unsplash (Recommandé)
🔗 https://unsplash.com

**Recherches utiles**:
- `university campus canada`
- `students studying abroad`
- `passport visa travel`
- `french architecture paris`
- `graduation ceremony`
- `international students`

### Pexels
🔗 https://www.pexels.com

### Pixabay
🔗 https://pixabay.com

---

## 🎨 Images par Catégorie

### 🇨🇦 Études au Canada
Mots-clés: `toronto university`, `vancouver campus`, `montreal students`, `canadian flag`

### 🇫🇷 Études en France  
Mots-clés: `paris university`, `sorbonne`, `french students`, `eiffel tower campus`

### 🇺🇸 Études aux USA
Mots-clés: `american university`, `college campus usa`, `graduation cap`

### 🇬🇧 Études au UK
Mots-clés: `oxford university`, `london student`, `british library`

### 📄 Visa & Documents
Mots-clés: `passport stamp`, `visa application`, `documents paperwork`, `embassy`

### 💡 Conseils Étudiants
Mots-clés: `students studying`, `study group`, `library`, `laptop student`

### 💬 Témoignages
Mots-clés: `happy students group`, `diverse students`, `graduation celebration`

### 💼 Bourses & Financement
Mots-clés: `scholarship`, `piggy bank student`, `calculator money`

### 🏠 Logement
Mots-clés: `student apartment`, `dorm room`, `cozy bedroom`, `house keys`

---

## ⚡ Raccourcis Clavier dans Sanity Studio

| Action | Raccourci |
|--------|-----------|
| Publier | `Ctrl/Cmd + S` |
| Rechercher | `Ctrl/Cmd + K` |
| Fermer | `Esc` |

---

## 🔄 Automatiser (Avancé)

Si tu veux uploader des images en masse, tu peux utiliser l'API:

```bash
cd /Users/asf/Documents/GitHub/osimx
npx tsx scripts/add-blog-images.ts
```

Mais tu devras d'abord:
1. Télécharger les images localement dans `public/blog/`
2. Modifier le script pour pointer vers tes images locales

---

## ✅ Checklist Complète

- [ ] Image uploadée (1200x630px)
- [ ] Texte alternatif rempli
- [ ] Légende ajoutée (optionnel)
- [ ] Article publié
- [ ] Vérifié sur le site: `https://osimx.vercel.app/blog/[slug]`

---

## 🎉 Résultat

Après publication, tes articles auront de belles images qui:
- ✅ S'affichent sur la page blog
- ✅ Apparaissent dans les partages sociaux
- ✅ Améliorent ton SEO
- ✅ Rendent le contenu plus attrayant

**Bravo ! 🚀**
