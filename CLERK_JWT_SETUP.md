# Configuration JWT Clerk pour les Métadonnées

## Problème
Les métadonnées publiques (`publicMetadata`) ne sont pas automatiquement incluses dans le JWT des session claims.

## Solution
Configurer un JWT Template dans Clerk Dashboard pour inclure les métadonnées.

## Étapes

### 1. Accéder aux JWT Templates
1. Allez sur https://dashboard.clerk.com
2. Sélectionnez votre application : **climbing-stag-46**
3. Dans le menu de gauche, cliquez sur **JWT Templates**

### 2. Créer/Modifier le Template par défaut
1. Cliquez sur **New template** ou modifiez le template existant
2. Nom du template : `default` (ou gardez celui par défaut)
3. Dans la section **Claims**, ajoutez :

```json
{
  "publicMetadata": "{{user.public_metadata}}"
}
```

### 3. Activer le Template
1. Cochez **Set as default** si ce n'est pas déjà fait
2. Cliquez sur **Save**

### 4. Tester
1. Déconnectez-vous complètement de l'application
2. Videz le cache du navigateur (ou ouvrez une fenêtre privée)
3. Reconnectez-vous
4. Allez sur http://localhost:3000/debug-auth
5. Vérifiez que `publicMetadata` apparaît maintenant dans **Session Claims**

## Alternative Temporaire (pour le développement)

Si vous voulez tester rapidement sans configurer le JWT, vous pouvez utiliser une approche côté serveur qui lit directement depuis l'API Clerk.

Voulez-vous que j'implémente cette alternative ?
