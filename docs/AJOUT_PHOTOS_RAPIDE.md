# 📸 AJOUT DES PHOTOS - Instructions Rapides

## 🎯 Objectif
Ajouter 2 photos pour les nouvelles destinations: Allemagne 🇩🇪 et Espagne 🇪🇸

---

## ⚡ MÉTHODE RAPIDE (3 étapes)

### 1️⃣ Télécharger les Images

**Site recommandé: Unsplash (gratuit, haute qualité)**
👉 https://unsplash.com

**Pour l'Allemagne 🇩🇪:**
1. Allez sur: https://unsplash.com/s/photos/berlin
2. Choisissez une belle photo de Berlin ou Munich
3. Cliquez sur "Download free" (bouton vert en haut à droite)
4. Renommez le fichier en: `allemagne.png`

**Pour l'Espagne 🇪🇸:**
1. Allez sur: https://unsplash.com/s/photos/barcelona
2. Choisissez une belle photo de Barcelone ou Madrid
3. Cliquez sur "Download free"
4. Renommez le fichier en: `espagne.png`

### 2️⃣ Placer les Images

**Copiez vos 2 images dans:**
```
public/images/destinations/
```

**Vérification:**
- ✅ Le fichier s'appelle exactement `allemagne.png` (pas d'espace, pas de majuscule)
- ✅ Le fichier s'appelle exactement `espagne.png`
- ✅ Les fichiers sont dans le bon dossier

### 3️⃣ Redémarrer le Serveur

```bash
# Dans le terminal, arrêtez le serveur (Ctrl+C)
# Puis relancez:
npm run dev
```

Ouvrez: http://localhost:3000 et scrollez jusqu'à "Destinations populaires"

---

## 🖼️ Suggestions d'Images

### Pour l'Allemagne 🇩🇪
**Recherchez sur Unsplash:**
- "Berlin Brandenburg Gate"
- "Munich Marienplatz"
- "Germany university"

**Style:** Moderne, professionnel, technologique

### Pour l'Espagne 🇪🇸
**Recherchez sur Unsplash:**
- "Barcelona Sagrada Familia"
- "Madrid Plaza Mayor"
- "Spain architecture"

**Style:** Chaud, culturel, vibrant

---

## 📋 Spécifications Techniques

- **Format:** PNG ou JPG
- **Taille recommandée:** 1200 x 800 pixels
- **Poids:** Moins de 500 KB (optimisez si nécessaire)
- **Orientation:** Paysage (horizontal)

---

## 🔧 Optimiser une Image (si trop lourde)

**Site gratuit:** https://tinypng.com
1. Glissez votre image sur le site
2. Attendez la compression
3. Téléchargez l'image optimisée
4. Utilisez cette version

---

## ✅ Vérification Finale

Après avoir ajouté les images:
- [ ] Les 2 fichiers sont dans `public/images/destinations/`
- [ ] Les noms sont corrects: `allemagne.png` et `espagne.png`
- [ ] Le serveur a été redémarré
- [ ] Les images apparaissent sur la page
- [ ] Les images sont belles sur mobile et desktop

---

## 🆘 Besoin d'Aide?

**Guide complet:**
📖 `docs/GUIDE_AJOUT_PHOTOS_DESTINATIONS.md`

**Script automatique (avancé):**
```bash
chmod +x scripts/download-destination-images.sh
./scripts/download-destination-images.sh
```

---

**🚀 C'est tout! Simple et rapide!**
