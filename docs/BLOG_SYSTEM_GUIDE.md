# 📚 Guide du Système de Blog - L'Étudiant Étranger

## 📖 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Créer un article de blog](#créer-un-article-de-blog)
3. [Système de catégories](#système-de-catégories)
4. [Optimisation SEO](#optimisation-seo)
5. [Images et médias](#images-et-médias)
6. [Contenu riche (Portable Text)](#contenu-riche-portable-text)
7. [Auteurs](#gestion-des-auteurs)
8. [Articles connexes](#articles-connexes)
9. [Bonnes pratiques](#bonnes-pratiques)
10. [Commandes utiles](#commandes-utiles)

---

## 🎯 Vue d'ensemble

Le système de blog est intégré avec **Sanity CMS** et permet de créer des articles riches et optimisés pour le SEO. Les articles sont organisés en 10 catégories liées aux études internationales.

### Fonctionnalités principales :
- ✅ Éditeur de contenu riche (texte, images, citations, encadrés)
- ✅ 10 catégories spécialisées
- ✅ Système de tags flexible
- ✅ SEO automatique et personnalisable
- ✅ Temps de lecture estimé
- ✅ Articles à la une
- ✅ Articles connexes
- ✅ Gestion des auteurs avec bio et réseaux sociaux
- ✅ Recherche et filtres par catégorie
- ✅ Pagination automatique

---

## ✍️ Créer un article de blog

### 1. Accéder au Studio Sanity

```bash
npm run sanity
```

Puis ouvrez http://localhost:3333/studio

### 2. Créer un nouvel article

1. Cliquez sur **"Post"** dans le menu latéral
2. Cliquez sur **"Create new Post"**
3. Remplissez les champs obligatoires :
   - **Titre** (10-100 caractères)
   - **Résumé** (50-200 caractères)
   - **Contenu** (texte riche)
   - **Auteur** (référence)
   - **Catégorie**
   - **Date de publication**

### 3. Champs du formulaire

#### 📝 **Groupe: Contenu**

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Titre** | Texte court | ✅ | 10-100 caractères. Accrocheur et descriptif |
| **Slug** | Slug | ✅ | Auto-généré à partir du titre. Utilisé dans l'URL |
| **Image principale** | Image | ✅ | 1200x630px recommandé. Avec hotspot |
| **Résumé** | Texte | ✅ | 50-200 caractères. Utilisé dans les cartes et SEO |
| **Contenu** | Portable Text | ✅ | Texte riche avec blocs personnalisés |

#### 🏷️ **Groupe: Métadonnées**

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Auteur** | Référence | ✅ | Lien vers un auteur existant |
| **Catégorie** | Select | ✅ | Une des 10 catégories disponibles |
| **Tags** | Array | ❌ | Maximum 8 tags. Pour recherche et organisation |
| **Date de publication** | DateTime | ✅ | Date de publication de l'article |
| **Temps de lecture** | Number | ❌ | En minutes. Calculé automatiquement si laissé vide |
| **À la une** | Boolean | ❌ | Affiche l'article dans la section "À la une" |
| **Articles connexes** | Array | ❌ | Maximum 3 articles liés |

#### 🔍 **Groupe: SEO**

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| **Titre SEO** | Texte | ❌ | Utilisé dans `<title>`. Par défaut: titre de l'article |
| **Description SEO** | Texte | ❌ | Meta description. Par défaut: résumé |
| **Mots-clés** | Array | ❌ | Pour référencement. 5-10 mots-clés recommandés |

---

## 🎨 Système de catégories

Le blog utilise 10 catégories avec emojis et couleurs personnalisées :

| Catégorie | Emoji | Couleur | Usage |
|-----------|-------|---------|-------|
| **études-france** | 🇫🇷 | Bleu | Articles sur les études en France |
| **études-canada** | 🇨🇦 | Rouge | Articles sur les études au Canada |
| **études-usa** | 🇺🇸 | Indigo | Articles sur les études aux USA |
| **études-uk** | 🇬🇧 | Violet | Articles sur les études au Royaume-Uni |
| **visa-documents** | 📄 | Émeraude | Guides sur visas et documents |
| **conseils** | 💡 | Ambre | Conseils et astuces généraux |
| **testimonials** | ⭐ | Rose | Témoignages d'étudiants |
| **news** | 📰 | Cyan | Actualités et nouveautés |
| **bourses** | 🎓 | Vert | Bourses et financement |
| **logement** | 🏠 | Orange | Guides logement |

### Choisir la bonne catégorie

- **Un article = une catégorie principale**
- Utilisez les **tags** pour les thématiques secondaires
- Exemple : Article sur "Bourses pour étudier en France"
  - Catégorie : `bourses`
  - Tags : `france`, `financement`, `étudiants-internationaux`

---

## 🚀 Optimisation SEO

### Titre SEO

**Format recommandé :**
```
[Sujet principal] : [Complément] | L'Étudiant Étranger
```

**Exemples :**
- ✅ "Guide Complet pour Étudier en France 2025 | L'Étudiant Étranger"
- ✅ "Top 10 Bourses Internationales : Guide 2025"
- ❌ "Article de blog" (trop vague)

**Bonnes pratiques :**
- 50-60 caractères idéal
- Inclure l'année si pertinent
- Inclure le mot-clé principal
- Éviter le keyword stuffing

### Description SEO

**Format recommandé :**
```
[Action/Bénéfice] : [Détails] [Call-to-action optionnel]
```

**Exemples :**
- ✅ "Découvrez comment obtenir votre visa étudiant : documents requis, délais, conseils d'experts. Guide complet 2025."
- ✅ "Les 10 meilleures bourses pour étudiants internationaux : montants, critères, dates. Maximisez vos chances !"
- ❌ "Cet article parle des visas." (trop vague)

**Bonnes pratiques :**
- 150-160 caractères idéal
- Inclure un call-to-action
- Utiliser des chiffres si possible
- Rester factuel et précis

### Mots-clés SEO

**Recommandations :**
- 5-10 mots-clés maximum
- Inclure des variations (singulier/pluriel)
- Penser à l'intention de recherche

**Exemple pour un article sur les bourses :**
```
bourses étudiants internationaux, financement études étranger, 
bourse eiffel, fulbright, chevening, aide financière étudiants
```

### Images et SEO

- **Texte alternatif** : Décrivez l'image pour l'accessibilité
- **Légende** : Contexte supplémentaire (optionnel)
- **Dimensions** : 1200x630px pour l'image principale (OpenGraph)

---

## 🖼️ Images et médias

### Image principale

**Spécifications :**
- **Dimensions** : 1200 x 630 pixels (ratio 1.91:1)
- **Format** : JPG ou PNG
- **Poids** : < 500 KB idéal
- **Qualité** : Haute résolution

**Configuration du hotspot :**
Le hotspot permet de définir le point focal de l'image pour les recadrages automatiques. Cliquez sur l'image après upload pour positionner le point focal.

### Images dans le contenu

**Pour ajouter une image dans le contenu :**
1. Dans l'éditeur de contenu, cliquez sur le bouton **"+"**
2. Sélectionnez **"Image"**
3. Uploadez votre image
4. Ajoutez un **texte alternatif** (important pour SEO et accessibilité)
5. Ajoutez une **légende** (optionnelle mais recommandée)

**Bonnes pratiques :**
- Images de 800-1200px de large
- Compressez vos images avant upload
- Utilisez des images libres de droits
- Nommez vos fichiers de manière descriptive

---

## ✨ Contenu riche (Portable Text)

L'éditeur Portable Text permet d'ajouter différents types de blocs :

### 1. Blocs de texte

- **Paragraphe normal** : Texte standard
- **Titres H2, H3, H4** : Structure hiérarchique
- **Listes à puces** : Pour énumérations
- **Listes numérotées** : Pour étapes séquentielles
- **Citation simple** : Citation basique avec barre latérale

### 2. Blocs personnalisés

#### 📸 **Image**
Insérez des images avec légende et texte alternatif.

#### 💬 **Citation avancée**
Citation avec auteur et rôle.

**Exemple d'utilisation :**
```
Citation : "La préparation est la clé du succès."
Auteur : Dr. Sophie Martin
Rôle : Conseillère en mobilité internationale
```

#### 📦 **Encadré (Callout)**

4 types disponibles :

| Type | Icon | Couleur | Usage |
|------|------|---------|-------|
| **Info** | ℹ️ | Bleu | Informations importantes |
| **Astuce** | 💡 | Vert | Conseils et astuces |
| **Attention** | ⚠️ | Ambre | Avertissements |
| **Étudiant** | 🎓 | Violet | Témoignages ou conseils d'étudiants |

**Exemple :**
```
Type : Astuce
Titre : Économisez sur les frais
Contenu : Renseignez-vous sur les accords bilatéraux...
```

### 3. Mise en forme du texte

- **Gras** : `Ctrl/Cmd + B`
- **Italique** : `Ctrl/Cmd + I`
- **Code** : Pour termes techniques
- **Liens** : Internes ou externes avec option "Ouvrir dans un nouvel onglet"

### 4. Structure recommandée

```markdown
# Titre de l'article (H1 - automatique)

## Introduction (H2)
Paragraphe d'introduction...

[Encadré Info : Contexte important]

## Section principale 1 (H2)
Contenu...

### Sous-section (H3)
Détails...

[Image avec légende]

## Section principale 2 (H2)
Contenu...

[Citation avancée]

### Sous-section (H3)
- Point 1
- Point 2
- Point 3

[Encadré Astuce]

## Conclusion (H2)
Résumé et call-to-action...
```

---

## 👤 Gestion des auteurs

### Créer un auteur

1. Dans Sanity Studio, cliquez sur **"Author"**
2. Remplissez les informations :

| Champ | Obligatoire | Description |
|-------|-------------|-------------|
| **Nom** | ✅ | Nom complet de l'auteur |
| **Slug** | ✅ | Auto-généré |
| **Photo** | ❌ | Photo de profil (400x400px recommandé) |
| **Bio** | ❌ | Biographie en Portable Text |
| **Rôle** | ❌ | Titre/fonction (ex: "Expert en visas") |
| **LinkedIn** | ❌ | URL complète |
| **Twitter** | ❌ | URL complète |
| **Email** | ❌ | Email professionnel |

### Bio de l'auteur

La bio utilise le même éditeur Portable Text que les articles. Recommandations :
- 2-3 paragraphes maximum
- Mentionner expertise et expérience
- Ton professionnel mais accessible
- 100-200 mots idéal

**Exemple :**
```
Avec plus de 10 ans d'expérience dans l'accompagnement 
des étudiants internationaux, Sophie est spécialisée dans 
les démarches administratives et les stratégies de réussite 
académique. 

Elle a aidé plus de 500 étudiants à réaliser leur rêve 
d'études à l'étranger.
```

---

## 🔗 Articles connexes

### Sélectionner des articles connexes

Les articles connexes apparaissent en bas de chaque article pour encourager la navigation.

**Comment choisir :**
1. Maximum 3 articles
2. Choisissez des articles complémentaires
3. Privilégiez la même thématique ou destination

**Exemple :**
Article : "Guide pour étudier en France"
Articles connexes :
- "Procédure Campus France en détail"
- "Trouver un logement étudiant en France"
- "Bourses pour étudiants en France"

---

## 💡 Bonnes pratiques

### Rédaction

✅ **À FAIRE :**
- Utilisez des titres clairs et descriptifs
- Structurez avec H2 et H3
- Ajoutez des listes pour la lisibilité
- Utilisez des encadrés pour mettre en valeur
- Incluez des citations et témoignages
- Ajoutez des images pertinentes
- Vérifiez l'orthographe et grammaire
- Restez factuel et précis
- Mettez à jour les informations obsolètes

❌ **À ÉVITER :**
- Paragraphes trop longs (>5-6 lignes)
- Jargon sans explication
- Informations non vérifiées
- Images de mauvaise qualité
- Trop de tags ou mots-clés
- Titres trompeurs (clickbait)
- Contenu copié d'autres sources

### Publication

**Checklist avant publication :**

- [ ] Titre accrocheur et descriptif
- [ ] Résumé convaincant (50-200 caractères)
- [ ] Image principale ajoutée (1200x630px)
- [ ] Contenu structuré avec H2/H3
- [ ] Au moins une image dans le contenu
- [ ] Auteur assigné
- [ ] Catégorie appropriée
- [ ] 3-5 tags pertinents
- [ ] Date de publication définie
- [ ] Temps de lecture vérifié
- [ ] Texte alternatif pour toutes les images
- [ ] Titre SEO optimisé
- [ ] Description SEO rédigée
- [ ] Mots-clés SEO ajoutés
- [ ] Articles connexes sélectionnés (si applicable)
- [ ] Relecture complète

### Fréquence de publication

**Recommandations :**
- **Minimum** : 2 articles par mois
- **Idéal** : 1 article par semaine
- **Consistance** : Plus important que la quantité
- **Mise à jour** : Révisez les articles anciens tous les 6 mois

---

## 🛠️ Commandes utiles

### Démarrage

```bash
# Démarrer le site Next.js
npm run dev

# Démarrer Sanity Studio
npm run sanity

# Démarrer les deux en parallèle
npm run dev & npm run sanity
```

### Seed (données de test)

```bash
# Créer des articles et auteurs de démonstration
npm run seed:blog
```

Cette commande crée :
- 3 auteurs avec profils complets
- 8 articles variés couvrant toutes les catégories

### Déploiement

```bash
# Build du site Next.js
npm run build

# Déployer Sanity Studio
npm run sanity:deploy
```

### Vérification

```bash
# Linter
npm run lint

# Tests
npm test
```

---

## 🔧 Configuration avancée

### Variables d'environnement

Fichier `.env.local` :
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=votre_token
```

### Domaines d'images

Configuré dans `next.config.ts` :
```typescript
images: {
  domains: ['cdn.sanity.io'],
}
```

### Schémas personnalisés

Les schémas sont dans `/sanity/schemas/blog/` :
- `author.ts` : Schéma des auteurs
- `post.ts` : Schéma des articles

---

## 🐛 Dépannage

### Les images ne s'affichent pas

**Solution :**
1. Vérifiez que `cdn.sanity.io` est dans `next.config.ts`
2. Redémarrez le serveur : `rm -rf .next && npm run dev`
3. Vérifiez que l'image a bien un `asset._ref`

### Articles non visibles

**Solution :**
1. Vérifiez que `publishedAt` est défini et dans le passé
2. Vérifiez que le dataset est correct (`production`)
3. Consultez les logs dans Sanity Studio (Vision tool)

### Erreur de GROQ query

**Solution :**
1. Testez votre query dans Sanity Vision (Studio → Vision)
2. Vérifiez la syntaxe GROQ
3. Consultez les logs du serveur Next.js

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@letudiantetranger.com
- 📚 Documentation Sanity : https://www.sanity.io/docs
- 📚 Documentation Next.js : https://nextjs.org/docs

---

## 📋 Changelog

### v1.0.0 - Janvier 2025
- ✨ Lancement du système de blog
- ✨ 10 catégories spécialisées
- ✨ Éditeur Portable Text avec blocs personnalisés
- ✨ SEO automatique et personnalisable
- ✨ Système d'auteurs
- ✨ Articles connexes
- ✨ Newsletter integration
- ✨ Partage social
- ✨ Recherche et filtres

---

**Dernière mise à jour :** Janvier 2025  
**Version :** 1.0.0  
**Maintenu par :** L'équipe L'Étudiant Étranger
