# 🧪 Test Manuel - Phase 4: Sanity Upload

## 📋 Instructions de Test

### Prérequis
1. ✅ Serveur Next.js en cours d'exécution (`npm run dev`)
2. ✅ Variable `SANITY_API_TOKEN` configurée dans `.env.local`
3. ✅ Port 3000 disponible

### Test 1: Upload Basique (PDF)

**Objectif:** Vérifier que l'upload d'un fichier PDF fonctionne correctement

**Étapes:**
1. Ouvrir le navigateur: http://localhost:3000
2. Cliquer sur le bouton d'inscription (Hero Section ou Navigation)
3. Remplir les étapes 1 et 2 rapidement avec des données factices
4. Arriver à l'étape 3 "Documents"
5. Télécharger un fichier PDF de test (max 10MB)
   - Option A: Glisser-déposer dans la zone
   - Option B: Cliquer et sélectionner

**Résultats Attendus:**
- ✅ Barre de progression apparaît immédiatement
- ✅ Progression s'anime de 0% à 100%
- ✅ Icône change: Loader2 (spin) → Check (vert)
- ✅ Texte change: "Upload en cours..." → "Téléchargé"
- ✅ Border change: bleu → gris
- ✅ Fichier reste dans la liste après upload
- ✅ Bouton X apparaît au hover pour supprimer

**Durée estimée:** ~5 secondes pour un PDF de 2MB

---

### Test 2: Validation Taille (Fichier > 10MB)

**Objectif:** Vérifier que les fichiers trop volumineux sont rejetés

**Étapes:**
1. Essayer d'uploader un fichier > 10MB
   - Créer un gros fichier: `dd if=/dev/zero of=big-file.pdf bs=1M count=15`
   - Ou utiliser une vidéo/photo haute résolution

**Résultats Attendus:**
- ❌ Fichier n'apparaît pas dans la liste
- ⚠️ Message d'erreur rouge s'affiche:
  ```
  Le fichier est trop volumineux. Taille maximale : 10MB
  ```

---

### Test 3: Validation Type (Fichier non supporté)

**Objectif:** Vérifier que les types de fichiers non autorisés sont rejetés

**Étapes:**
1. Essayer d'uploader un fichier .exe, .zip, .mp4, ou .txt

**Résultats Attendus:**
- ❌ Fichier n'apparaît pas dans la liste
- ⚠️ Message d'erreur rouge s'affiche:
  ```
  Type de fichier non accepté. Formats acceptés : PDF, JPG, PNG
  ```

---

### Test 4: Upload Multiple (3 fichiers)

**Objectif:** Vérifier l'upload de plusieurs fichiers en série

**Étapes:**
1. Sélectionner 3 fichiers PDF/JPG simultanément
2. Observer le processus d'upload

**Résultats Attendus:**
- ✅ Les 3 fichiers apparaissent dans la liste
- ✅ Upload se fait un par un (séquentiel)
- ✅ Chaque fichier a sa propre barre de progression
- ✅ Les fichiers déjà uploadés restent verts pendant que le suivant se charge
- ✅ Compteur affiche "Documents téléchargés (3/5)"

**Durée estimée:** ~15 secondes pour 3 fichiers de 2MB

---

### Test 5: Gestion d'Erreur Réseau

**Objectif:** Vérifier le comportement en cas d'erreur

**Étapes:**
1. Ouvrir les DevTools (F12) → Network tab
2. Activer "Offline" mode
3. Essayer d'uploader un fichier
4. Observer l'erreur
5. Désactiver "Offline" mode
6. Supprimer le fichier en erreur (X)
7. Réessayer l'upload

**Résultats Attendus:**
- ❌ Fichier affiche état d'erreur (rouge)
- ⚠️ Icône AlertCircle rouge
- ⚠️ Texte "Échec" + message d'erreur
- ✅ Bouton X reste visible (pas besoin de hover)
- ✅ Bouton "Suivant" affiche erreur si on clique
- ✅ Après suppression et reconnexion, upload fonctionne

---

### Test 6: Prévention Navigation (Upload en cours)

**Objectif:** Vérifier qu'on ne peut pas passer à l'étape suivante pendant l'upload

**Étapes:**
1. Uploader un gros fichier (5-10MB)
2. Pendant que la barre de progression avance
3. Cliquer sur "Suivant"

**Résultats Attendus:**
- ❌ Navigation bloquée
- ⚠️ Message d'erreur s'affiche:
  ```
  Veuillez attendre la fin de l'upload de tous les fichiers
  ```

---

### Test 7: Validation Aucun Document

**Objectif:** Vérifier qu'au moins un document est requis

**Étapes:**
1. À l'étape 3, ne rien uploader
2. Cliquer sur "Suivant"

**Résultats Attendus:**
- ❌ Navigation bloquée
- ⚠️ Message d'erreur s'affiche:
  ```
  Veuillez télécharger au moins un document
  ```

---

### Test 8: Suppression de Fichier

**Objectif:** Vérifier qu'on peut supprimer un fichier uploadé

**Étapes:**
1. Uploader 2 fichiers
2. Attendre qu'ils soient tous uploadés (verts)
3. Hover sur le premier fichier
4. Cliquer sur le bouton X

**Résultats Attendus:**
- ✅ Fichier disparaît avec animation (fade + slide)
- ✅ Compteur se met à jour: "Documents téléchargés (1/5)"
- ✅ Les autres fichiers restent intacts

---

### Test 9: Inspection des Données (DevTools)

**Objectif:** Vérifier que les assetId Sanity sont bien stockés

**Étapes:**
1. Uploader 1 fichier
2. Ouvrir React DevTools (extension Chrome/Firefox)
3. Trouver le composant `RegistrationModal`
4. Inspecter l'état `formData`

**Résultats Attendus:**
```javascript
formData: {
  step1: { ... },
  step2: { ... },
  step3: {
    documents: [
      {
        name: "mon-diplome.pdf",
        size: 2560000,
        type: "application/pdf",
        assetId: "file-abc123xyz-pdf",
        url: "https://cdn.sanity.io/files/4hv0dnh9/production/..."
      }
    ]
  }
}
```

**Points clés:**
- ✅ Propriété `file` doit être **absente** (supprimée après upload)
- ✅ Propriété `assetId` doit être **présente**
- ✅ Propriété `url` doit pointer vers Sanity CDN

---

### Test 10: Vérification Sanity Studio

**Objectif:** Confirmer que les fichiers sont bien dans Sanity

**Étapes:**
1. Uploader un fichier via le modal
2. Ouvrir Sanity Studio: http://localhost:3000/studio
3. Aller dans "Media" (ou l'équivalent)
4. Chercher le fichier uploadé

**Résultats Attendus:**
- ✅ Fichier visible dans la liste des assets Sanity
- ✅ Nom du fichier correspond
- ✅ Preview disponible (pour images/PDF)
- ✅ URL publique générée

---

## 🎯 Checklist Complète

### Upload Fonctionnel
- [ ] Upload d'un fichier PDF fonctionne
- [ ] Upload d'un fichier JPG fonctionne
- [ ] Upload d'un fichier PNG fonctionne
- [ ] Barre de progression s'anime correctement
- [ ] États visuels changent (bleu → vert)

### Validation
- [ ] Fichier > 10MB rejeté avec message d'erreur
- [ ] Type non supporté rejeté avec message d'erreur
- [ ] Au moins 1 document requis pour passer à l'étape suivante
- [ ] Navigation bloquée pendant l'upload

### Multiple Files
- [ ] Upload de 3 fichiers fonctionne (séquentiel)
- [ ] Chaque fichier a sa propre barre de progression
- [ ] Compteur "X/5" se met à jour

### Erreurs
- [ ] Erreur réseau affichée correctement (mode offline)
- [ ] Fichier en erreur peut être supprimé
- [ ] Réessai après erreur fonctionne

### Suppression
- [ ] Bouton X apparaît au hover
- [ ] Suppression fonctionne avec animation
- [ ] Compteur se met à jour après suppression

### Données
- [ ] `assetId` présent dans form state
- [ ] `file` object absent dans form state
- [ ] Fichier visible dans Sanity Studio

---

## 🐛 Problèmes Connus

### 1. FormData parse error (Node.js script)
**Symptôme:** Script de test `test-upload.js` échoue avec "Failed to parse body as FormData"

**Cause:** Next.js API routes ont besoin de configuration spéciale pour FormData

**Solution temporaire:** Tester manuellement via le navigateur (tests ci-dessus)

**Fix permanent:** Installer `formidable` ou utiliser `next-connect` (Phase 5)

### 2. Upload lent avec gros fichiers
**Symptôme:** Upload de fichiers > 5MB prend plus de 30 secondes

**Cause:** Sanity Assets API limite la vitesse + connexion internet

**Solution:** Afficher un message "Cela peut prendre quelques minutes pour les gros fichiers"

### 3. Pas de retry automatique
**Symptôme:** Si l'upload échoue, utilisateur doit supprimer et réessayer manuellement

**Amélioration future:** Ajouter un bouton "Réessayer" sur les fichiers en erreur

---

## 📊 Résultats Attendus

### Performance
- **Petit fichier (500KB):** ~1-2 secondes
- **Fichier moyen (2MB):** ~3-5 secondes
- **Gros fichier (10MB):** ~15-30 secondes

### UX
- **Fluidité:** 60 FPS sur les animations
- **Réactivité:** Feedback immédiat (<100ms)
- **Clarté:** Messages d'erreur compréhensibles

---

## 🚀 Prochaine Étape

Une fois tous les tests validés, passer à **Phase 5: Registration API & Database**
- Créer le schema `student` dans Sanity
- Lier les documents uploadés à l'étudiant
- Implémenter l'API `/api/register-student`
- Hash des mots de passe
- Email de confirmation

---

**Date:** 9 octobre 2025  
**Version:** Phase 4 Complete  
**Testeur:** _____________  
**Résultat:** ⬜ Tous les tests passés | ⬜ Problèmes détectés
