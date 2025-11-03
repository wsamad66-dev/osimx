#!/bin/bash

# Script de test pour l'API Blog OSIMX
# Usage: ./test-blog-api.sh

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
API_URL="${API_URL:-http://localhost:3000}"
API_SECRET="${BLOG_API_SECRET:-osimx-blog-api-2025-change-me}"

echo -e "${YELLOW}🧪 Test de l'API Blog OSIMX${NC}\n"
echo "API URL: $API_URL"
echo "API Secret: ${API_SECRET:0:20}..."
echo ""

# Test 1: Créer un article simple
echo -e "${YELLOW}Test 1: Création d'un article simple${NC}"
RESPONSE=$(curl -s -X POST "$API_URL/api/blog/create" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test API: Article Automatique",
    "excerpt": "Cet article a été créé automatiquement via l'\''API",
    "content": "# Article de Test\n\nCeci est un test de l'\''API d'\''automatisation.\n\n## Fonctionnalités\n\n- Création automatique\n- Intégration N8N\n- Support Markdown",
    "categories": ["conseils"],
    "tags": ["test", "api", "automation"]
  }')

if echo "$RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Article créé avec succès${NC}"
  echo "$RESPONSE" | jq '.'
else
  echo -e "${RED}❌ Échec de la création${NC}"
  echo "$RESPONSE" | jq '.'
  exit 1
fi

echo ""

# Test 2: Récupérer les articles
echo -e "${YELLOW}Test 2: Récupération des articles${NC}"
RESPONSE=$(curl -s -X GET "$API_URL/api/blog/create?limit=5")

if echo "$RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Articles récupérés${NC}"
  ARTICLE_COUNT=$(echo "$RESPONSE" | jq '.data | length')
  echo "Nombre d'articles: $ARTICLE_COUNT"
else
  echo -e "${RED}❌ Échec de la récupération${NC}"
  echo "$RESPONSE" | jq '.'
fi

echo ""

# Test 3: Test d'authentification
echo -e "${YELLOW}Test 3: Vérification authentification${NC}"
RESPONSE=$(curl -s -X POST "$API_URL/api/blog/create" \
  -H "Authorization: Bearer mauvaise-cle" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","excerpt":"Test","content":"Test"}')

if echo "$RESPONSE" | grep -q '"error"'; then
  echo -e "${GREEN}✅ Authentification fonctionne correctement${NC}"
else
  echo -e "${RED}❌ Problème d'authentification${NC}"
  echo "$RESPONSE"
fi

echo ""

# Test 4: Générer du contenu avec l'IA (si OpenAI configuré)
echo -e "${YELLOW}Test 4: Génération avec IA (optionnel)${NC}"
RESPONSE=$(curl -s -X POST "$API_URL/api/blog/generate" \
  -H "Authorization: Bearer $API_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Les 5 erreurs à éviter lors d'\''une demande de visa étudiant",
    "keywords": ["visa", "erreurs", "conseils"],
    "category": "visa",
    "language": "fr",
    "length": "short"
  }')

if echo "$RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✅ Contenu généré avec succès${NC}"
  echo "$RESPONSE" | jq '.data.title'
elif echo "$RESPONSE" | grep -q '"error":"OpenAI API non configurée"'; then
  echo -e "${YELLOW}⚠️  OpenAI non configuré (normal si vous n'avez pas ajouté OPENAI_API_KEY)${NC}"
  echo "Pour activer: Ajoutez OPENAI_API_KEY dans .env.local"
else
  echo -e "${RED}❌ Erreur lors de la génération${NC}"
  echo "$RESPONSE" | jq '.'
fi

echo ""
echo -e "${GREEN}✨ Tests terminés !${NC}"
echo ""
echo "📚 Documentation complète:"
echo "   - docs/AI_BLOG_AUTOMATION.md"
echo "   - automation/README.md"
echo ""
echo "🔄 Workflows N8N disponibles:"
echo "   - automation/n8n-simple-workflow.json"
echo "   - automation/n8n-google-sheets-workflow.json"
echo ""
echo "📮 Collection Postman:"
echo "   - automation/postman-collection.json"
