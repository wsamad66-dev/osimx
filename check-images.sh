#!/bin/bash
# Quick script to check if all images are present

echo "🔍 Checking for destination images..."
echo ""

DEST_DIR="/Users/asf/Documents/GitHub/osimx/public/images/destinations"
REQUIRED_IMAGES=("france.jpg" "italie.jpg" "belgique.jpg" "canada.jpg" "chine.jpg")
MISSING=0

for img in "${REQUIRED_IMAGES[@]}"; do
  if [ -f "$DEST_DIR/$img" ]; then
    SIZE=$(du -h "$DEST_DIR/$img" | cut -f1)
    echo "✅ $img ($SIZE)"
  else
    echo "❌ $img - MISSING!"
    MISSING=$((MISSING + 1))
  fi
done

echo ""
if [ $MISSING -eq 0 ]; then
  echo "🎉 All images found! Refresh your browser."
else
  echo "⚠️  $MISSING images missing. Add them to:"
  echo "   $DEST_DIR"
fi
