# 📝 Guide d'Automatisation des Articles de Blog

Ce guide vous explique comment créer automatiquement des articles de blog pour votre site OSIMX.

## 🎯 Méthodes Disponibles

### 1. Création Interactive (Mode CLI)
**Idéal pour :** Créer un article rapidement avec des questions guidées

```bash
npx tsx scripts/create-blog-post.ts
```

**Ce que vous pouvez faire :**
- Choisir un auteur existant ou en créer un nouveau
- Entrer le titre, résumé, contenu
- Ajouter des catégories et tags
- Publier immédiatement ou en brouillon

---

### 2. Import depuis JSON
**Idéal pour :** Créer plusieurs articles en une fois

```bash
npx tsx scripts/import-blog-posts.ts scripts/example-blog-posts.json
```

**Format JSON :**
```json
{
  "title": "Titre de l'article",
  "excerpt": "Résumé court",
  "content": "Contenu complet en Markdown",
  "categories": ["etudes", "visa"],
  "tags": ["canada", "admission"],
  "featured": true,
  "author": {
    "name": "John Doe",
    "email": "john@osimx.com",
    "bio": "Expert en..."
  }
}
```

**Créer plusieurs articles :**
```json
[
  { "title": "Article 1", ... },
  { "title": "Article 2", ... },
  { "title": "Article 3", ... }
]
```

---

### 3. Articles d'Exemple Prêts à l'Emploi
**Idéal pour :** Démarrer rapidement avec du contenu de qualité

```bash
npx tsx scripts/seed-blog-posts.ts
```

**Contenu créé :**
- 5 articles complets sur différents sujets
- Auteur OSIMX Team
- Contenu en Markdown formaté
- Catégories et tags pertinents

---

## 📋 Champs Disponibles

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `title` | string | ✅ | Titre de l'article |
| `slug` | string | ❌ | URL (auto-généré si vide) |
| `excerpt` | string | ✅ | Résumé court (150-200 chars) |
| `content` | string | ✅ | Contenu complet (Markdown supporté) |
| `categories` | array | ✅ | Catégories (voir liste ci-dessous) |
| `tags` | array | ❌ | Tags libres |
| `featured` | boolean | ❌ | Article en vedette (défaut: false) |
| `publishedAt` | string | ❌ | Date de publication ISO (défaut: maintenant) |
| `author` | object | ❌ | Infos auteur (ou auteur par défaut) |

---

## 🏷️ Catégories Disponibles

- `etudes` - Programmes, universités, admissions
- `visa` - Procédures de visa
- `logement` - Trouver un logement
- `financement` - Bourses, budget
- `temoignages` - Histoires d'étudiants
- `conseils` - Conseils pratiques

---

## 📝 Format Markdown pour le Contenu

```markdown
# Titre Principal

Introduction de l'article...

## Section 1

Contenu de la section 1.

### Sous-section

- Point 1
- Point 2
- Point 3

## Section 2

**Texte en gras**
*Texte en italique*

[Lien](https://example.com)

> Citation importante

\`\`\`
Code ou exemple
\`\`\`
```

---

## 🤖 Exemples d'Utilisation

### Exemple 1 : Créer un article simple
```json
{
  "title": "5 Conseils pour Réussir votre Visa",
  "excerpt": "Découvrez nos 5 meilleurs conseils pour obtenir votre visa étudiant.",
  "content": "# 5 Conseils Essentiels\n\n## 1. Préparez vos documents...",
  "categories": ["visa", "conseils"],
  "tags": ["visa", "preparation"],
  "featured": false
}
```

### Exemple 2 : Article avec auteur personnalisé
```json
{
  "title": "Mon Expérience au Canada",
  "excerpt": "Témoignage d'un étudiant qui a réussi",
  "content": "# Mon Parcours au Canada\n\nIl y a 2 ans...",
  "categories": ["temoignages"],
  "tags": ["canada", "reussite"],
  "featured": true,
  "author": {
    "name": "Marie Dubois",
    "email": "marie@example.com",
    "bio": "Étudiante en commerce international"
  }
}
```

### Exemple 3 : Article programmé
```json
{
  "title": "Nouveautés 2026",
  "excerpt": "Ce qui change pour 2026",
  "content": "# Changements 2026...",
  "categories": ["etudes"],
  "publishedAt": "2026-01-01T00:00:00.000Z"
}
```

---

## 🔄 Workflow Recommandé

### Pour un Blog Actif

1. **Créez des articles d'exemple** (une fois)
   ```bash
   npx tsx scripts/seed-blog-posts.ts
   ```

2. **Créez des articles régulièrement**
   - Option A : Mode interactif pour articles uniques
   - Option B : Préparez un JSON avec plusieurs articles

3. **Ajoutez les images** dans Sanity Studio
   - Allez sur http://localhost:3000/studio
   - Cliquez sur l'article
   - Uploadez l'image featured

4. **Prévisualisez** avant de publier
   - Allez sur votre site
   - Section blog

---

## 🎨 Ajouter des Images

Les images ne peuvent pas être ajoutées via script (limitation Sanity).

**Pour ajouter une image :**
1. Allez sur http://localhost:3000/studio
2. Cliquez sur 📝 Articles de blog
3. Sélectionnez votre article
4. Dans "Featured Image", uploadez votre image
5. Cliquez "Publish"

---

## 🔐 Configuration Requise

Les scripts utilisent vos variables d'environnement dans `.env.local` :

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=votre-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=votre-token-avec-permissions-editor
```

---

## 💡 Conseils d'Utilisation

### SEO
- Titre : 50-60 caractères
- Excerpt : 150-160 caractères
- Tags : 3-7 tags pertinents

### Contenu
- Longueur : 800-2000 mots minimum
- Structure : Utilisez H2 et H3
- Lisibilité : Paragraphes courts

### Images
- Format : JPG ou PNG
- Taille : < 500KB
- Dimensions : 1200x630px (ratio 1.91:1)

### Publication
- Fréquence : 2-4 articles/mois minimum
- Planification : Préparez à l'avance
- Cohérence : Gardez le même ton

---

## 🆘 Résolution de Problèmes

### Erreur "Configuration must contain projectId"
```bash
# Vérifiez que .env.local existe et contient :
NEXT_PUBLIC_SANITY_PROJECT_ID=...
```

### Erreur "Token missing"
```bash
# Ajoutez dans .env.local :
SANITY_API_TOKEN=...
```

### Slug en double
Le script génère automatiquement un slug unique. Si erreur, ajoutez un slug manuel :
```json
{
  "slug": "titre-article-version-2"
}
```

---

## 🚀 Aller Plus Loin

### API REST
Créez des articles depuis n'importe quelle application :

```javascript
const response = await fetch('https://[PROJECT_ID].api.sanity.io/v2024-01-01/data/mutate/production', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    mutations: [{
      create: {
        _type: 'blogPost',
        title: 'Mon article',
        // ...
      }
    }]
  })
})
```

### Webhooks
Configurez des webhooks dans Sanity pour déclencher des actions :
- Publication automatique sur réseaux sociaux
- Newsletter automatique
- Notification d'équipe

---

## 📚 Ressources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Studio Local](http://localhost:3000/studio)

---

## ✅ Checklist de Publication

Avant de publier un article :

- [ ] Titre accrocheur et clair
- [ ] Excerpt descriptif
- [ ] Contenu relu et corrigé
- [ ] Image featured ajoutée
- [ ] Catégories appropriées
- [ ] Tags pertinents (3-7)
- [ ] Liens internes/externes vérifiés
- [ ] Formatage Markdown correct
- [ ] Prévisualisation OK
- [ ] Date de publication définie

---

**Besoin d'aide ?** Consultez les exemples dans `scripts/example-blog-posts.json` ou créez un article de test avec `npx tsx scripts/create-blog-post.ts`
