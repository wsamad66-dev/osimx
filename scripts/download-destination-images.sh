#!/bin/bash

# Script pour télécharger des images de démonstration pour Allemagne et Espagne
# Usage: chmod +x download-destination-images.sh && ./download-destination-images.sh

echo "📸 Téléchargement des images de destinations..."
echo ""

# Créer le dossier si nécessaire
mkdir -p public/images/destinations

# Note: Ces URLs pointent vers des exemples Unsplash
# Remplacez-les par les URLs exactes de vos images choisies

echo "🇩🇪 Téléchargement de l'image pour l'Allemagne..."

# Option 1: Avec curl
curl -L "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&h=800&fit=crop" \
  -o "public/images/destinations/allemagne.png" \
  --progress-bar

if [ $? -eq 0 ]; then
  echo "✅ Image Allemagne téléchargée avec succès!"
else
  echo "❌ Erreur lors du téléchargement de l'image Allemagne"
fi

echo ""
echo "🇪🇸 Téléchargement de l'image pour l'Espagne..."

# Option 2: Avec curl
curl -L "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop" \
  -o "public/images/destinations/espagne.png" \
  --progress-bar

if [ $? -eq 0 ]; then
  echo "✅ Image Espagne téléchargée avec succès!"
else
  echo "❌ Erreur lors du téléchargement de l'image Espagne"
fi

echo ""
echo "📊 Vérification des fichiers téléchargés..."
ls -lh public/images/destinations/*.png

echo ""
echo "✨ Terminé! Les images ont été téléchargées."
echo ""
echo "⚠️  IMPORTANT: Ces images sont des exemples."
echo "   Pour une utilisation en production, téléchargez vos propres images"
echo "   depuis Unsplash ou un autre site de photos libres de droits."
echo ""
echo "📚 Consultez le guide: docs/GUIDE_AJOUT_PHOTOS_DESTINATIONS.md"
echo ""
echo "🔄 Redémarrez votre serveur: npm run dev"
