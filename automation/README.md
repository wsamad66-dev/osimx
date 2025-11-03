# 🔄 Workflows d'Automatisation OSIMX Blog

Ce dossier contient tous les workflows et configurations pour automatiser la création de contenu blog avec l'IA.

---

## 📁 Fichiers Disponibles

### 1. **n8n-simple-workflow.json**
Workflow N8N basique pour publication hebdomadaire automatique.

**Ce qu'il fait :**
- Se déclenche tous les lundis à 9h
- Génère un article avec l'IA
- Publie automatiquement
- Envoie une notification email

**Importer dans N8N :**
1. Ouvrez N8N
2. Cliquez sur "Import from File"
3. Sélectionnez `n8n-simple-workflow.json`
4. Configurez les variables d'environnement

---

### 2. **n8n-google-sheets-workflow.json**
Workflow N8N avec Google Sheets comme source de contenu.

**Ce qu'il fait :**
- Lit une Google Sheet avec des sujets d'articles
- Pour chaque ligne en "pending"
- Génère le contenu
- Publie l'article
- Met à jour le statut dans la Sheet

**Format Google Sheet :**
```
| Topic | Category | Keywords | Status |
|-------|----------|----------|--------|
| Visa Canada | visa | visa,canada,permis | pending |
```

---

### 3. **postman-collection.json**
Collection Postman/Insomnia pour tester l'API.

**8 Requêtes incluses :**
1. Générer du contenu avec l'IA
2. Créer un article complet
3. Récupérer tous les articles
4. Filtrer par catégorie
5. Créer un article simple
6. Générer contenu court
7. Générer contenu long
8. Pipeline complet (générer + créer)

**Utilisation :**
1. Importer dans Postman
2. Modifier les variables :
   - `base_url`: http://localhost:3000
   - `api_secret`: Votre clé secrète
3. Tester les endpoints

---

## 🚀 Quick Start

### Option 1 : N8N (Recommandé)

```bash
# 1. Installer N8N
npm install -g n8n

# 2. Lancer N8N
n8n start

# 3. Accéder à http://localhost:5678

# 4. Importer un workflow
# File > Import from File > Sélectionner n8n-simple-workflow.json

# 5. Configurer les credentials
# - Ajouter SITE_URL (votre domaine)
# - Ajouter BLOG_API_SECRET
```

### Option 2 : Postman/Insomnia

```bash
# 1. Installer Postman ou Insomnia

# 2. Importer la collection
# File > Import > Sélectionner postman-collection.json

# 3. Configurer les variables
base_url: http://localhost:3000
api_secret: votre-cle-secrete

# 4. Tester !
```

---

## 🔧 Configuration Requise

### Variables d'Environnement

Dans `.env.local` :
```bash
# API Secret (obligatoire)
BLOG_API_SECRET=votre-cle-super-secrete

# OpenAI (optionnel, pour génération IA)
OPENAI_API_KEY=sk-...

# Site URL (pour les notifications)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

### Générer une clé secrète :
```bash
openssl rand -base64 32
```

---

## 📊 Workflows Disponibles

### 1. Publication Hebdomadaire
**Fichier :** `n8n-simple-workflow.json`

**Schedule :** Lundi 9h00
**Actions :**
- Génère 1 article
- Publie automatiquement
- Notification email

**Personnalisation :**
Modifiez le node "Set Topics" pour changer :
- Le sujet
- La catégorie
- Les mots-clés

---

### 2. Google Sheets → Blog
**Fichier :** `n8n-google-sheets-workflow.json`

**Trigger :** Modification Google Sheet
**Actions :**
- Lit les lignes "pending"
- Génère le contenu
- Publie l'article
- Met à jour le statut

**Setup Google Sheet :**
1. Créez une Sheet "Blog Topics"
2. Colonnes : Topic | Category | Keywords | Status
3. Ajoutez vos sujets avec Status = "pending"
4. Partagez la Sheet avec le compte N8N

---

### 3. RSS → Blog (À venir)
Transforme un flux RSS en articles de blog personnalisés.

---

### 4. Content Calendar (À venir)
Google Calendar → Publication automatique selon planning.

---

## 🎯 Exemples d'Utilisation

### Cas 1 : Créer 1 Article par Semaine

1. Utilisez `n8n-simple-workflow.json`
2. Modifiez le cron : `0 9 * * 1` (Lundi 9h)
3. Changez le sujet chaque semaine

### Cas 2 : Batch de 10 Articles

1. Créez Google Sheet avec 10 sujets
2. Utilisez `n8n-google-sheets-workflow.json`
3. Lancez le workflow
4. Tous les articles sont générés et publiés

### Cas 3 : Publication Programmée

1. Ajoutez un champ "PublishDate" dans la Sheet
2. Ajoutez un node "Switch" dans N8N
3. Publiez uniquement si date = aujourd'hui

---

## 🔐 Sécurité

### Best Practices

1. **Ne committez JAMAIS** les clés API
   ```bash
   # .gitignore (déjà configuré)
   .env.local
   *.secret
   ```

2. **Utilisez des clés différentes** pour dev/prod
   ```bash
   # .env.local (dev)
   BLOG_API_SECRET=dev-key

   # Vercel (prod)
   BLOG_API_SECRET=prod-key
   ```

3. **Limitez les permissions**
   - N8N : Accès lecture seule aux Sheets
   - API : Rate limiting (10 requêtes/heure)

---

## 📈 Monitoring

### Logs N8N

N8N garde un historique de toutes les exécutions :
- Succès/Échecs
- Temps d'exécution
- Données traitées

**Accès :** N8N > Executions

### Logs API

Les logs API sont dans la console Next.js :
```bash
npm run dev

# Voir les logs
[2025-10-16T10:00:00] Article créé: article-id-123
```

---

## 🐛 Troubleshooting

### Erreur : "Non autorisé"
```
✓ Vérifier BLOG_API_SECRET dans .env.local
✓ Vérifier le header Authorization dans N8N
✓ Format : "Bearer VOTRE_CLE"
```

### Erreur : "OpenAI API non configurée"
```
✓ Ajouter OPENAI_API_KEY dans .env.local
✓ Obtenir une clé sur platform.openai.com
✓ Vérifier le solde du compte OpenAI
```

### Workflow N8N ne se déclenche pas
```
✓ Vérifier que N8N est actif (n8n start)
✓ Vérifier l'expression cron
✓ Activer le workflow (toggle en haut à droite)
```

### Articles non publiés
```
✓ Vérifier les logs N8N
✓ Tester l'API avec Postman
✓ Vérifier SANITY_API_TOKEN
```

---

## 🔄 Mises à Jour

### Ajouter un Nouveau Workflow

1. Créez votre workflow dans N8N
2. Testez-le
3. Exportez : File > Export
4. Sauvegardez dans `automation/`
5. Documentez dans ce README

---

## 📚 Ressources

### N8N
- [Documentation](https://docs.n8n.io)
- [Community](https://community.n8n.io)
- [Templates](https://n8n.io/workflows)

### OpenAI
- [Documentation](https://platform.openai.com/docs)
- [Pricing](https://openai.com/pricing)
- [Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)

### Sanity
- [HTTP API](https://www.sanity.io/docs/http-api)
- [GROQ Queries](https://www.sanity.io/docs/groq)

---

## 💡 Idées de Workflows

### À Implémenter

1. **LinkedIn → Blog**
   - Monitorer posts LinkedIn
   - Transformer en article
   - Publier automatiquement

2. **YouTube → Blog**
   - Transcription automatique
   - Conversion en article
   - Ajout de screenshots

3. **Trending Topics**
   - Google Trends API
   - Génération d'article sur sujet tendance
   - Publication automatique

4. **Competitor Watch**
   - RSS concurrents
   - Analyse de contenu
   - Version OSIMX

5. **Seasonal Content**
   - Calendrier annuel
   - Articles pré-générés
   - Publication automatique

---

## 🎉 Contributeurs

Ajoutez vos propres workflows !

1. Fork le repo
2. Créez votre workflow
3. Testez-le
4. Pull Request

---

**Questions ?** Consultez `docs/AI_BLOG_AUTOMATION.md` pour le guide complet.
