#!/bin/bash

echo "🔍 Test de configuration NextAuth + Google OAuth"
echo "================================================"
echo ""

echo "1️⃣ Vérification des variables Vercel..."
echo ""
npx vercel env ls production 2>&1 | grep -E "NEXTAUTH|GOOGLE" | while read line; do
  echo "  ✅ $line"
done
echo ""

echo "2️⃣ Test de l'URL de production..."
echo ""
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://osimx.vercel.app)
if [ "$STATUS" = "200" ]; then
  echo "  ✅ Site accessible : HTTP $STATUS"
else
  echo "  ❌ Site inaccessible : HTTP $STATUS"
fi
echo ""

echo "3️⃣ Test de la page de connexion..."
echo ""
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://osimx.vercel.app/auth/signin)
if [ "$STATUS" = "200" ]; then
  echo "  ✅ Page signin accessible : HTTP $STATUS"
else
  echo "  ❌ Page signin inaccessible : HTTP $STATUS"
fi
echo ""

echo "4️⃣ Test de l'API NextAuth..."
echo ""
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://osimx.vercel.app/api/auth/providers)
if [ "$STATUS" = "200" ]; then
  echo "  ✅ API NextAuth opérationnelle : HTTP $STATUS"
  echo ""
  echo "  Providers disponibles :"
  curl -s https://osimx.vercel.app/api/auth/providers | jq . 2>/dev/null || echo "  (impossible de parser JSON)"
else
  echo "  ❌ API NextAuth erreur : HTTP $STATUS"
fi
echo ""

echo "5️⃣ Configuration Google OAuth requise..."
echo ""
echo "  📋 URIs à configurer dans Google Cloud Console :"
echo "  https://console.cloud.google.com/apis/credentials"
echo ""
echo "  URI 1 : http://localhost:3000/api/auth/callback/google"
echo "  URI 2 : https://osimx.vercel.app/api/auth/callback/google"
echo ""

echo "6️⃣ Test de connexion Google..."
echo ""
echo "  🌐 Ouvre cette URL dans ton navigateur :"
echo "  https://osimx.vercel.app/admin"
echo ""
echo "  Si tu vois l'erreur 400 :"
echo "  1. Va sur https://console.cloud.google.com/apis/credentials"
echo "  2. Clique sur ton OAuth Client ID"
echo "  3. Vérifie que l'URI https://osimx.vercel.app/api/auth/callback/google"
echo "     est EXACTEMENT dans la liste"
echo "  4. Clique ENREGISTRER"
echo "  5. Attends 30 secondes"
echo "  6. Réessaye"
echo ""

echo "================================================"
echo "✅ Test terminé !"
