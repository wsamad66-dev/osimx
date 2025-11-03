# 🚀 Quick Start - Automatisation Blog OSIMX

## 📝 Créer des Articles de Blog

### Option 1 : Mode Interactif (Recommandé pour débuter)
```bash
npm run blog:create
```
Questions guidées pour créer un article rapidement.

---

### Option 2 : Import JSON (Pour créer plusieurs articles)
```bash
npm run blog:import scripts/example-blog-posts.json
```

**Créez votre propre fichier JSON :**
```json
{
  "title": "Mon Article",
  "excerpt": "Résumé court",
  "content": "# Contenu\n\nTexte de l'article...",
  "categories": ["etudes"],
  "tags": ["canada", "visa"],
  "featured": true
}
```

---

### Option 3 : Articles d'Exemple (Démarrage rapide)
```bash
npm run blog:seed
```
Crée 5 articles complets prêts à l'emploi sur différents sujets.

---

## 🏠 Contenu Page d'Accueil

### Créer les Sections d'Accueil
```bash
npm run content:seed-homepage
```

Crée automatiquement :
- 📊 Section Expertise (statistiques)
- 🛠️ Section Services
- 💬 Section Témoignages
- ❓ Section FAQ
- 🎯 Section Call-to-Action

---

## 🎯 Workflow Typique

```bash
# 1. Créer le contenu initial (une fois)
npm run content:seed-homepage
npm run blog:seed

# 2. Ajouter des articles régulièrement
npm run blog:create

# 3. Ou créer plusieurs articles d'un coup
npm run blog:import mon-fichier.json
```

---

## 📍 Accès Sanity Studio

Après création du contenu, accédez au Studio pour :
- Ajouter des images
- Modifier les textes
- Réorganiser le contenu

```
http://localhost:3000/studio
```

---

## 📚 Documentation Complète

Pour plus de détails, consultez :
- `docs/BLOG_AUTOMATION_GUIDE.md` - Guide complet d'automatisation
- `scripts/example-blog-posts.json` - Exemples de format JSON

---

## ✅ Checklist Rapide

- [ ] Contenu homepage créé (`npm run content:seed-homepage`)
- [ ] Articles de blog créés (`npm run blog:seed`)
- [ ] Images ajoutées dans Studio
- [ ] Contenu relu et personnalisé
- [ ] Site testé en local

---

**Besoin d'aide ?** Tous les scripts sont dans le dossier `scripts/`
