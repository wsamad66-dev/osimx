# 🎨 Visual Guide: Sanity Studio Student Management

## 📱 Sanity Studio Interface

### Main Navigation (Sidebar)

```
┌─────────────────────────────────────┐
│  📊 Sanity Studio                   │
├─────────────────────────────────────┤
│                                     │
│  👥 Étudiants                ← NEW  │
│     Tous les étudiants              │
│     ➕ Ajouter un étudiant          │
│                                     │
│  📅 Leads & Rendez-vous             │
│     Tous les leads                  │
│     ➕ Ajouter un lead              │
│                                     │
│  ─────────────────────────          │
│                                     │
│  🧭 Navigation / Header             │
│                                     │
│  ─────────────────────────          │
│                                     │
│  📰 Hero                            │
│  📄 Student Document                │
│                                     │
└─────────────────────────────────────┘
```

---

## 👥 Students List View

### Full List Interface

```
┌────────────────────────────────────────────────────────────────┐
│  👥 Étudiants                                   ➕ Ajouter      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔍 Search students...                   Sort: ▼ Date (récent) │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📝 Jean Dupont                                           │ │
│  │ jean.dupont@example.com • Sénégal                       │ │
│  │ +221 77 123 45 67                                       │ │
│  │ Registered: 11 oct. 2025, 14:30                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📞 Marie Martin                                          │ │
│  │ marie.martin@example.com • France                       │ │
│  │ +33 6 12 34 56 78                                       │ │
│  │ Registered: 10 oct. 2025, 09:15                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ ✅ Ahmed Ben Ali                                         │ │
│  │ ahmed.benali@example.com • Maroc                        │ │
│  │ +212 6 12 34 56 78                                      │ │
│  │ Registered: 09 oct. 2025, 16:45                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## ➕ Add New Student Form

### Create Student Interface

```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Étudiants                                   Publish  │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  New Student                                                    │
│  ─────────────────────────────────────────────────────────────│
│                                                                 │
│  Nom complet *                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Jean Dupont                                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Prénom et nom de l'étudiant                                  │
│                                                                 │
│  Email *                                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ jean.dupont@example.com                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Adresse email de l'étudiant                                  │
│                                                                 │
│  Téléphone / WhatsApp *                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ +221 77 123 45 67                                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Numéro de téléphone (format international recommandé)        │
│                                                                 │
│  Pays d'origine                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🇸🇳 Sénégal                                    ▼        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Pays d'origine de l'étudiant (optionnel)                    │
│                                                                 │
│  Statut                                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📝 Nouveau                                     ▼        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Statut actuel de l'étudiant                                  │
│                                                                 │
│  Source                                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Manuel (Sanity)                                ▼        │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Comment l'étudiant nous a trouvé                            │
│                                                                 │
│  Date d'inscription                                            │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 11 octobre 2025, 14:30                                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Date de première inscription                                 │
│                                                                 │
│  Notes administratives                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Contacté par téléphone.                                 │ │
│  │ Intéressé par études en France.                         │ │
│  │ Rappel prévu le 15 octobre.                             │ │
│  │                                                           │ │
│  └──────────────────────────────────────────────────────────┘ │
│  Notes internes pour l'équipe                                │
│                                                                 │
│  ┌─────────────────┐                                          │
│  │    Publish      │                                          │
│  └─────────────────┘                                          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## ✏️ Edit Student View

### Edit Interface

```
┌────────────────────────────────────────────────────────────────┐
│  ← Jean Dupont              •••  Delete     Changes  Publish   │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Jean Dupont                                                    │
│  ─────────────────────────────────────────────────────────────│
│                                                                 │
│  Nom complet *                                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Jean Dupont                                              │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Email *                                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ jean.dupont@example.com                                  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Téléphone / WhatsApp *                                        │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ +221 77 123 45 67                                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Pays d'origine                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 🇸🇳 Sénégal                                    ▼        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Statut ← CHANGE THIS                                          │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📞 Contacté                                    ▼        │ │ ← Updated!
│  └──────────────────────────────────────────────────────────┘ │
│  Options: 📝 Nouveau, 📞 Contacté, ✅ Actif, etc.             │
│                                                                 │
│  Source                                                         │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Formulaire site web                            ▼        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Notes administratives ← ADD NOTES                             │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ Appelé le 11/10/2025 à 14h30.                          │ │ ← New note!
│  │ Intéressé par Master en Informatique.                   │ │
│  │ Rendez-vous fixé pour le 15/10.                        │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─────────────────┐                                          │
│  │    Publish      │  ← Click to save changes                │
│  └─────────────────┘                                          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Status Dropdown Options

### All Available Statuses

```
┌────────────────────────────────┐
│  Statut             ▼          │
├────────────────────────────────┤
│  📝 Nouveau                    │ ← New registration
│  📞 Contacté                   │ ← Team contacted them
│  ✅ Actif                      │ ← Active student
│  🎓 En cours                   │ ← Currently studying
│  ✨ Diplômé                    │ ← Graduated!
│  ⏸️ En pause                   │ ← Taking a break
│  ❌ Inactif                    │ ← No longer active
└────────────────────────────────┘
```

---

## 🌍 Country Dropdown Options

### All Available Countries

```
┌────────────────────────────────┐
│  Pays d'origine     ▼          │
├────────────────────────────────┤
│  🇫🇷 France                    │
│  🇨🇦 Canada                    │
│  🇺🇸 États-Unis                │
│  🇬🇧 Royaume-Uni               │
│  🇩🇪 Allemagne                 │
│  🇪🇸 Espagne                   │
│  🇮🇹 Italie                    │
│  🇧🇪 Belgique                  │
│  🇨🇭 Suisse                    │
│  🇲🇦 Maroc                     │
│  🇸🇳 Sénégal                   │
│  🇨🇮 Côte d'Ivoire             │
└────────────────────────────────┘
```

---

## 📊 Source Dropdown Options

### All Available Sources

```
┌────────────────────────────────┐
│  Source             ▼          │
├────────────────────────────────┤
│  Formulaire site web           │ ← From your website
│  Rendez-vous zcal              │ ← From zcal booking
│  Manuel (Sanity)               │ ← Manually added
│  Réseaux sociaux               │ ← Social media
│  Bouche à oreille              │ ← Word of mouth
│  Autre                         │ ← Other source
└────────────────────────────────┘
```

---

## 🗑️ Delete Student Flow

### Deletion Confirmation

```
Step 1: Click student → Menu (•••)

┌────────────────────────────────┐
│  ← Jean Dupont      •••        │
│                     │          │
│                     ▼          │
│              ┌──────────────┐  │
│              │ Delete       │  │ ← Click here
│              └──────────────┘  │
└────────────────────────────────┘

Step 2: Confirm deletion

┌─────────────────────────────────────────────┐
│  ⚠️ Confirm Deletion                       │
├─────────────────────────────────────────────┤
│                                             │
│  Are you sure you want to delete           │
│  this student document?                    │
│                                             │
│  Jean Dupont                               │
│  jean.dupont@example.com                   │
│                                             │
│  This action cannot be undone.             │
│                                             │
│  ┌──────────┐   ┌──────────┐              │
│  │ Cancel   │   │ Delete   │              │
│  └──────────┘   └──────────┘              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔍 Search & Filter

### Search Interface

```
┌────────────────────────────────────────────────────────────────┐
│  👥 Étudiants                                   ➕ Ajouter      │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │ 🔍 Search: "jean"                                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                                    Sort: ▼ Date (récent)       │
│                                                                 │
│  Results for "jean":                                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📝 Jean Dupont                        ← Found!           │ │
│  │ jean.dupont@example.com • Sénégal                       │ │
│  │ +221 77 123 45 67                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📞 Jean-Pierre Martin                 ← Found!           │ │
│  │ jp.martin@example.com • France                          │ │
│  │ +33 6 12 34 56 78                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│  2 results found                                               │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 📱 Mobile View

### Responsive Design

```
┌─────────────────────────┐
│  👥 Étudiants      ☰   │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐ │
│  │ 📝 Jean Dupont    │ │
│  │ jean@example.com  │ │
│  │ 🇸🇳 Sénégal       │ │
│  │ +221 77 123...    │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │ 📞 Marie Martin   │ │
│  │ marie@example.com │ │
│  │ 🇫🇷 France        │ │
│  │ +33 6 12 34...    │ │
│  └───────────────────┘ │
│                         │
│  ┌───────────────────┐ │
│  │ ✅ Ahmed Ali      │ │
│  │ ahmed@example.com │ │
│  │ 🇲🇦 Maroc         │ │
│  │ +212 6 12 34...   │ │
│  └───────────────────┘ │
│                         │
│  ┌─────────────────┐   │
│  │  ➕ Ajouter     │   │
│  └─────────────────┘   │
│                         │
└─────────────────────────┘
```

---

## 🎨 Color Coding

### Status Colors in Studio

```
📝 Nouveau (New)
   └── Blue/Gray background
   
📞 Contacté (Contacted)
   └── Light blue background
   
✅ Actif (Active)
   └── Green background
   
🎓 En cours (In Progress)
   └── Purple background
   
✨ Diplômé (Graduated)
   └── Gold background
   
⏸️ En pause (Paused)
   └── Orange background
   
❌ Inactif (Inactive)
   └── Red/Gray background
```

---

## ⚡ Quick Actions

### Keyboard Shortcuts (in Sanity Studio)

```
Cmd/Ctrl + K       → Quick search
Cmd/Ctrl + S       → Publish changes
Cmd/Ctrl + Shift + S → Save draft
Esc                → Close current document
```

---

## 📊 Student Journey Visualization

### Typical Flow in Studio

```
1. Student Registers on Website
   │
   ▼
2. Appears in Studio (📝 Nouveau)
   │
   ▼
3. Team Opens Student Record
   │
   ▼
4. Team Calls Student
   │
   ▼
5. Update Status → 📞 Contacté
   Add notes about call
   │
   ▼
6. Student Becomes Active
   │
   ▼
7. Update Status → ✅ Actif
   Add notes about program
   │
   ▼
8. Student Starts Studies
   │
   ▼
9. Update Status → 🎓 En cours
   Track progress in notes
   │
   ▼
10. Student Graduates
    │
    ▼
11. Update Status → ✨ Diplômé
    Celebrate in notes! 🎉
```

---

## 🎓 Training Tips

### For Your Team

**Day 1: Viewing Students**
```
✓ Login to Sanity Studio
✓ Navigate to 👥 Étudiants
✓ Browse student list
✓ Click on a student to view details
✓ Learn the status meanings
```

**Day 2: Updating Status**
```
✓ Open a student
✓ Change status as needed
✓ Click Publish
✓ See updated emoji in list
```

**Day 3: Adding Notes**
```
✓ Open a student
✓ Scroll to Notes section
✓ Add detailed notes about calls/emails
✓ Save with Publish
```

**Day 4: Creating Students**
```
✓ Click ➕ Ajouter un étudiant
✓ Fill required fields
✓ Select country and source
✓ Add initial notes
✓ Publish
```

**Day 5: Advanced Features**
```
✓ Use search to find students quickly
✓ Sort by different criteria
✓ Filter by status
✓ Bulk operations (if needed)
```

---

**Visual Guide Complete** ✨  
Now you can see exactly how Sanity Studio looks and works!
