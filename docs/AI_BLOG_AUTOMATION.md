# 🤖 Automatisation Blog avec IA - Guide Complet

Ce guide vous explique comment automatiser la création de blogs avec l'IA en utilisant N8N, Make (Integromat), Zapier, ou directement via l'API.

---

## 📡 API REST Créée

### 1. Créer un Article (`POST /api/blog/create`)

**Endpoint:** `https://votre-domaine.com/api/blog/create`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer votre-cle-api-secrete
# OU
X-API-Key: votre-cle-api-secrete
```

**Body (JSON):**
```json
{
  "title": "Titre de l'article",
  "excerpt": "Résumé court",
  "content": "# Contenu complet en Markdown",
  "categories": ["etudes", "visa"],
  "tags": ["canada", "admission"],
  "featured": false,
  "publishedAt": "2025-10-16T10:00:00.000Z",
  "author": {
    "name": "John Doe",
    "email": "john@osimx.com",
    "bio": "Expert en..."
  }
}
```

**Réponse Success (201):**
```json
{
  "success": true,
  "message": "Article créé avec succès",
  "data": {
    "id": "article-id-123",
    "title": "Titre de l'article",
    "slug": "titre-article",
    "publishedAt": "2025-10-16T10:00:00.000Z",
    "studioUrl": "https://votre-site.com/studio/desk/blogPost;article-id-123"
  }
}
```

---

### 2. Générer du Contenu avec l'IA (`POST /api/blog/generate`)

**Endpoint:** `https://votre-domaine.com/api/blog/generate`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer votre-cle-api-secrete
```

**Body (JSON):**
```json
{
  "topic": "Comment obtenir un visa étudiant pour le Canada",
  "keywords": ["visa", "canada", "étudiant", "permis"],
  "category": "visa",
  "language": "fr",
  "tone": "professional",
  "length": "medium"
}
```

**Options:**
- `language`: "fr" | "en"
- `tone`: "professional" | "casual" | "academic"
- `length`: "short" (800-1000 mots) | "medium" (1200-1500) | "long" (2000-2500)

**Réponse Success (200):**
```json
{
  "success": true,
  "message": "Contenu généré avec succès",
  "data": {
    "title": "Titre généré",
    "excerpt": "Résumé généré",
    "content": "# Contenu complet",
    "categories": ["visa"],
    "tags": ["visa", "canada", "étudiant"],
    "featured": false
  },
  "usage": {
    "promptTokens": 450,
    "completionTokens": 1200,
    "totalTokens": 1650
  }
}
```

---

## 🔐 Configuration

### 1. Ajouter la Clé API Secrète

Dans `.env.local`:
```bash
# Clé secrète pour l'API Blog (générez une clé aléatoire forte)
BLOG_API_SECRET=votre-cle-super-secrete-changez-moi

# Optionnel: Pour la génération avec IA
OPENAI_API_KEY=sk-...
```

**Générer une clé sécurisée:**
```bash
openssl rand -base64 32
```

---

## 🔄 Automatisation avec N8N

### Workflow 1: Génération Automatique Hebdomadaire

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│   Schedule  │────▶│  Generate AI │────▶│   Review    │────▶│ Create Post  │
│  (Lundi 9h) │     │   Content    │     │   (Wait)    │     │   (Publish)  │
└─────────────┘     └──────────────┘     └─────────────┘     └──────────────┘
```

**Étapes dans N8N:**

1. **Trigger: Schedule**
   - Type: Cron
   - Expression: `0 9 * * 1` (Tous les lundis à 9h)

2. **HTTP Request: Générer le Contenu**
   - Method: POST
   - URL: `https://votre-site.com/api/blog/generate`
   - Headers:
     ```json
     {
       "Authorization": "Bearer {{$env.BLOG_API_SECRET}}",
       "Content-Type": "application/json"
     }
     ```
   - Body:
     ```json
     {
       "topic": "{{$node.Schedule.json.topic}}",
       "keywords": ["canada", "visa", "etudiant"],
       "category": "visa",
       "language": "fr",
       "length": "medium"
     }
     ```

3. **Wait (Optionnel)**
   - Pour révision manuelle
   - Durée: 1 heure

4. **HTTP Request: Créer l'Article**
   - Method: POST
   - URL: `https://votre-site.com/api/blog/create`
   - Headers: (mêmes que ci-dessus)
   - Body: `{{$node.HTTP_Request.json.data}}`

---

### Workflow 2: Génération depuis Google Sheets

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Google     │────▶│  For Each    │────▶│ Generate &  │
│  Sheets     │     │   Row        │     │   Publish   │
└─────────────┘     └──────────────┘     └─────────────┘
```

**Google Sheet Format:**
| Topic | Category | Keywords | Status |
|-------|----------|----------|--------|
| Visa Canada | visa | visa,canada | pending |
| Bourses France | financement | bourse,france | pending |

**Étapes N8N:**

1. **Google Sheets Trigger**
   - Range: A2:D100
   - Condition: Status = "pending"

2. **Loop: For Each Row**

3. **HTTP Request: Generate**
   - Topic: `{{$json.Topic}}`
   - Category: `{{$json.Category}}`
   - Keywords: `{{$json.Keywords.split(',')}}`

4. **HTTP Request: Create Post**

5. **Google Sheets: Update Row**
   - Status: "published"

---

### Workflow 3: RSS Feed vers Blog

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  RSS Feed   │────▶│  Transform   │────▶│   Create    │
│   Reader    │     │   Content    │     │    Post     │
└─────────────┘     └──────────────┘     └─────────────┘
```

---

## 🔧 Automatisation avec Make (Integromat)

### Scénario Simple

**Modules:**
1. **Webhook** - Reçoit un déclencheur
2. **HTTP Request** - Génère le contenu
3. **HTTP Request** - Publie l'article
4. **Email** - Notification de succès

**Configuration HTTP Request:**
```
URL: https://votre-site.com/api/blog/generate
Method: POST
Headers:
  Authorization: Bearer {{BLOG_API_SECRET}}
Body:
  {
    "topic": "{{topic}}",
    "keywords": {{keywords}},
    "category": "{{category}}"
  }
```

---

## ⚡ Automatisation avec Zapier

### Zap Simple

**Trigger:** Google Sheets (New Row)

**Actions:**
1. **Webhooks by Zapier** - POST Request
   - URL: `https://votre-site.com/api/blog/generate`
   - Data: Topic, Keywords, Category

2. **Webhooks by Zapier** - POST Request
   - URL: `https://votre-site.com/api/blog/create`
   - Data: Generated content from step 1

3. **Email by Zapier** - Send Email
   - Notification de publication

---

## 🐍 Script Python pour Automatisation

```python
import requests
import json
from datetime import datetime

API_URL = "https://votre-site.com/api/blog"
API_KEY = "votre-cle-api-secrete"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

def generate_content(topic, keywords, category="etudes"):
    """Génère du contenu avec l'IA"""
    response = requests.post(
        f"{API_URL}/generate",
        headers=headers,
        json={
            "topic": topic,
            "keywords": keywords,
            "category": category,
            "language": "fr",
            "length": "medium"
        }
    )
    return response.json()

def create_post(article_data):
    """Crée un article dans Sanity"""
    response = requests.post(
        f"{API_URL}/create",
        headers=headers,
        json=article_data
    )
    return response.json()

def auto_publish(topic, keywords, category):
    """Pipeline complet: Génère et publie"""
    print(f"🤖 Génération du contenu pour: {topic}")
    
    # Étape 1: Générer
    generated = generate_content(topic, keywords, category)
    
    if not generated.get("success"):
        print(f"❌ Erreur génération: {generated.get('error')}")
        return
    
    print(f"✅ Contenu généré: {generated['data']['title']}")
    
    # Étape 2: Publier
    print("📝 Publication de l'article...")
    result = create_post(generated["data"])
    
    if result.get("success"):
        print(f"✅ Article publié: {result['data']['studioUrl']}")
    else:
        print(f"❌ Erreur publication: {result.get('error')}")

# Exemple d'utilisation
if __name__ == "__main__":
    topics = [
        ("Visa étudiant Canada", ["visa", "canada", "permis"], "visa"),
        ("Bourses d'études France", ["bourse", "france", "financement"], "financement"),
        ("Logement étudiant UK", ["logement", "uk", "residence"], "logement")
    ]
    
    for topic, keywords, category in topics:
        auto_publish(topic, keywords, category)
        print("\n" + "="*50 + "\n")
```

---

## 📱 Automatisation avec Shortcuts (iOS/macOS)

### Shortcut: Créer Article depuis Dictée

1. **Dictate Text** - Dicter le sujet
2. **Text** - Créer le JSON
3. **Get Contents of URL**
   - URL: `https://votre-site.com/api/blog/generate`
   - Method: POST
   - Headers: Authorization
   - Body: Texte dicté
4. **Get Contents of URL**
   - URL: `https://votre-site.com/api/blog/create`
   - Body: Résultat étape 3
5. **Show Notification** - "Article publié!"

---

## 🔔 Notifications

### Webhook Discord/Slack

Ajoutez à votre workflow N8N/Make:

```javascript
// Après création d'article
const webhookUrl = "https://discord.com/api/webhooks/...";

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: `✅ Nouvel article publié: ${articleTitle}`,
    embeds: [{
      title: articleTitle,
      url: studioUrl,
      description: excerpt,
      color: 0x00ff00
    }]
  })
});
```

---

## 📊 Workflow Avancé: Content Calendar

### Google Calendar → N8N → Blog

1. **Google Calendar Trigger**
   - Événement: "Blog: [Topic]"
   - Déclencheur: 1 jour avant

2. **Generate AI Content**
   - Topic extrait du titre

3. **Send for Review**
   - Email avec lien de révision

4. **Wait for Approval**
   - Webhook approval

5. **Publish Post**
   - Publication automatique

---

## 🎯 Cas d'Usage Réels

### 1. Publication Hebdomadaire Automatique
```
Lundi 9h → Génère article
Lundi 10h → Email de révision
Lundi 16h → Publication si approuvé
```

### 2. Veille Concurrentielle
```
RSS Competitor → Analyse contenu → Génère version OSIMX → Publie
```

### 3. Actualités Automatiques
```
Google News API → Filtre keywords → Génère article → Publie
```

### 4. Contenu Saisonnier
```
Calendrier → Détecte rentrée → Génère "Guide rentrée 2025" → Publie
```

---

## 🔒 Sécurité

### Best Practices

1. **Gardez la clé API secrète**
   ```bash
   # .env.local (ne jamais commit)
   BLOG_API_SECRET=...
   ```

2. **Rate Limiting** (ajoutez dans route.ts):
   ```typescript
   // Maximum 10 requêtes / heure
   const rateLimit = new Map();
   ```

3. **Validation stricte**
   ```typescript
   if (!data.title || data.title.length < 10) {
     return error(400, "Titre trop court");
   }
   ```

4. **Logs d'audit**
   ```typescript
   console.log(`[${new Date()}] Article créé: ${post._id}`);
   ```

---

## 📈 Monitoring

### Suivi des Publications

Créez un dashboard N8N pour suivre:
- Nombre d'articles générés
- Taux d'approbation
- Temps de génération
- Coût OpenAI

---

## 💰 Coûts Estimés

### OpenAI GPT-4
- Article court (~1000 mots): $0.10 - $0.20
- Article moyen (~1500 mots): $0.15 - $0.30
- Article long (~2500 mots): $0.25 - $0.50

### Alternatives Gratuites
- Claude (Anthropic): Limite gratuite
- Llama 2 (local): Gratuit mais requiert serveur

---

## 🚀 Pour Démarrer

1. **Configurez la clé API:**
   ```bash
   echo 'BLOG_API_SECRET='$(openssl rand -base64 32) >> .env.local
   ```

2. **Testez l'API:**
   ```bash
   curl -X POST https://localhost:3000/api/blog/create \
     -H "Authorization: Bearer VOTRE_CLE" \
     -H "Content-Type: application/json" \
     -d '{"title":"Test","excerpt":"Test","content":"# Test"}'
   ```

3. **Créez votre premier workflow N8N**

4. **Automatisez la publication !**

---

## 📚 Ressources

- [N8N Documentation](https://docs.n8n.io)
- [Make Templates](https://www.make.com/en/templates)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Sanity API Reference](https://www.sanity.io/docs/http-api)

---

**Besoin d'aide ?** Consultez les exemples dans `scripts/` ou testez l'API avec Postman/Insomnia.
