# 🎓 Sanity Student Schema - Simplified & CRUD Enabled

## 🎯 Overview

The Sanity student schema has been **simplified** to match your QuickRegistrationModal form fields and **CRUD operations** (Create, Read, Update, Delete) have been enabled in Sanity Studio.

## ✨ What Changed

### Before (Complex Schema)
- 20+ fields across 4 steps
- Personal info, education details, documents, password hash
- Complex validation rules
- Difficult to manually add/edit students

### After (Simplified Schema)
- **4 core fields** matching your form:
  - Full Name (required)
  - Email (required)
  - Phone/WhatsApp (required)
  - Country (optional)
- **Easy to use** in Sanity Studio
- **Full CRUD** - Add, edit, delete students manually
- **Status tracking** with emojis
- **Source tracking** (where student came from)

---

## 📋 New Student Schema

### Core Fields

#### 1. Full Name (`fullName`)
- **Type**: String
- **Required**: Yes
- **Validation**: 2-100 characters
- **Example**: "Jean Dupont"

#### 2. Email (`email`)
- **Type**: String
- **Required**: Yes
- **Validation**: Valid email format
- **Example**: "jean.dupont@example.com"

#### 3. Phone / WhatsApp (`phone`)
- **Type**: String
- **Required**: Yes
- **Validation**: Minimum 8 characters
- **Example**: "+221 77 123 45 67"

#### 4. Country (`country`)
- **Type**: String (dropdown)
- **Required**: No
- **Options**: 12 countries with flags
  - 🇫🇷 France
  - 🇨🇦 Canada
  - 🇺🇸 États-Unis
  - 🇬🇧 Royaume-Uni
  - 🇩🇪 Allemagne
  - 🇪🇸 Espagne
  - 🇮🇹 Italie
  - 🇧🇪 Belgique
  - 🇨🇭 Suisse
  - 🇲🇦 Maroc
  - 🇸🇳 Sénégal
  - 🇨🇮 Côte d'Ivoire

### Metadata Fields

#### 5. Status (`status`)
- **Type**: String (dropdown)
- **Default**: "nouveau"
- **Options**:
  - 📝 Nouveau (new)
  - 📞 Contacté (contacted)
  - ✅ Actif (active)
  - 🎓 En cours (in progress)
  - ✨ Diplômé (graduated)
  - ⏸️ En pause (paused)
  - ❌ Inactif (inactive)

#### 6. Source (`source`)
- **Type**: String (dropdown)
- **Default**: "site-web"
- **Options**:
  - Formulaire site web
  - Rendez-vous zcal
  - Manuel (Sanity)
  - Réseaux sociaux
  - Bouche à oreille
  - Autre

#### 7. Registration Date (`registeredAt`)
- **Type**: Datetime
- **Auto-filled**: Current date/time
- **Example**: "2025-10-11T14:30:00.000Z"

#### 8. Admin Notes (`notes`)
- **Type**: Text area
- **Required**: No
- **Rows**: 5
- **Purpose**: Internal notes for your team

---

## 🎨 Studio Preview

When you view students in Sanity Studio, you'll see:

```
┌─────────────────────────────────────────────────┐
│ 👥 Jean Dupont                                  │
│ 📝 jean.dupont@example.com • Sénégal           │
│ +221 77 123 45 67                              │
└─────────────────────────────────────────────────┘
```

**Title**: Full name  
**Subtitle**: Status emoji + email + country  
**Description**: Phone number  

---

## 🔧 Sanity Studio - CRUD Operations

### 1. View All Students

```
Sanity Studio → 👥 Étudiants → See full list
```

**Features**:
- Sorted by registration date (newest first)
- Search by name, email, phone
- Filter by status
- Sort by name or status

### 2. Add New Student

**Method 1: Button in Studio**
```
👥 Étudiants → Click "➕ Ajouter un étudiant"
```

**Method 2: Menu action**
```
Right-click in list → Create new student
```

**Required fields**:
- Full Name ✓
- Email ✓
- Phone ✓

**Optional fields**:
- Country
- Status (defaults to "nouveau")
- Source (defaults to "site-web")
- Notes

### 3. Edit Student

```
👥 Étudiants → Click on student → Edit any field → Publish
```

**You can edit**:
- Name, email, phone, country
- Status (update their progress)
- Source (if wrong)
- Notes (add internal comments)
- Registration date (if needed)

### 4. Delete Student

```
👥 Étudiants → Click on student → 
Menu (•••) → Delete → Confirm
```

⚠️ **Warning**: Deletion is permanent!

---

## 📊 Sorting Options

In Sanity Studio, you can sort students by:

1. **Date d'inscription (récent)** - Newest registrations first (default)
2. **Date d'inscription (ancien)** - Oldest registrations first
3. **Nom (A-Z)** - Alphabetical by name
4. **Statut** - Grouped by status

---

## 🔌 API Integration

### Register Student Endpoint

**Endpoint**: `POST /api/register-student`

**Body**:
```json
{
  "step1": {
    "firstName": "Jean",
    "lastName": "Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+221771234567",
    "countryOfResidence": "Sénégal"
  }
}
```

**What happens**:
1. Validates email format
2. Checks for duplicate email
3. Combines firstName + lastName → fullName
4. Creates student in Sanity
5. Sets status to "nouveau"
6. Sets source to "site-web"
7. Returns success response

**Response**:
```json
{
  "success": true,
  "studentId": "draft-abc123",
  "message": "Inscription réussie! Bienvenue...",
  "data": {
    "fullName": "Jean Dupont",
    "email": "jean.dupont@example.com",
    "status": "nouveau"
  }
}
```

---

## 🚀 How to Use in Sanity Studio

### Access Studio

```bash
# Start your dev server
npm run dev

# Open Sanity Studio
http://localhost:3000/studio
```

### Navigate to Students

```
Sidebar → 👥 Étudiants
```

### Add a Student Manually

1. Click **"➕ Ajouter un étudiant"**
2. Fill in the form:
   - **Nom complet**: Jean Dupont
   - **Email**: jean@example.com
   - **Téléphone**: +221771234567
   - **Pays d'origine**: 🇸🇳 Sénégal (optional)
   - **Statut**: 📝 Nouveau (default)
   - **Source**: Manuel (Sanity)
   - **Notes**: Any internal notes
3. Click **"Publish"**

### Edit a Student

1. Click on the student in the list
2. Edit any field
3. Click **"Publish"** to save changes

### Delete a Student

1. Click on the student
2. Click menu (•••) in top right
3. Select **"Delete"**
4. Confirm deletion

---

## 📊 Student Lifecycle

```
Registration Form
    ↓
📝 Nouveau (New)
    ↓
📞 Contacté (Contacted by your team)
    ↓
✅ Actif (Active student)
    ↓
🎓 En cours (In progress - studying)
    ↓
✨ Diplômé (Graduated) OR
⏸️ En pause (Paused) OR
❌ Inactif (Inactive)
```

---

## 🔍 Data Comparison

### Old Schema (Complex)
```typescript
{
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean@example.com",
  phone: "+221...",
  dateOfBirth: "1995-01-01",
  nationality: "Sénégalaise",
  countryOfResidence: "Sénégal",
  currentEducationLevel: "bachelor",
  desiredDegree: "master",
  fieldOfStudy: "Informatique",
  preferredCountry: "France",
  preferredUniversity: "Sorbonne",
  intendedStartDate: "2025-09",
  documents: [...],
  passwordHash: "...",
  verificationToken: "...",
  emailVerified: false,
  status: "pending",
  registeredAt: "..."
}
```

### New Schema (Simplified)
```typescript
{
  fullName: "Jean Dupont",
  email: "jean@example.com",
  phone: "+221771234567",
  country: "Sénégal",
  status: "nouveau",
  source: "site-web",
  registeredAt: "2025-10-11T14:30:00.000Z",
  notes: ""
}
```

**Reduction**: 20+ fields → 8 fields (60% less complex!)

---

## 🎯 Benefits of New Schema

### 1. **Matches Your Form**
- Exact same fields as QuickRegistrationModal
- No unused/unnecessary fields
- Clean and simple

### 2. **Easy Manual Entry**
- Can add students from phone calls
- Can import from other sources
- Quick data entry in Studio

### 3. **Better UX in Studio**
- Less overwhelming
- Clear what each field is for
- Fast to edit

### 4. **Flexible Status Tracking**
- 7 status options with emojis
- Track student journey
- Easy filtering

### 5. **Source Attribution**
- Know where students came from
- Track marketing effectiveness
- Multiple entry points

### 6. **Full CRUD**
- ✅ Create manually or via API
- ✅ Read with sorting/filtering
- ✅ Update any field anytime
- ✅ Delete when needed

---

## 🧪 Testing the New Schema

### Test 1: View Existing Students

```bash
# Open Studio
http://localhost:3000/studio

# Navigate to 👥 Étudiants
# You should see all students with new preview format
```

### Test 2: Add Student Manually

1. Click "➕ Ajouter un étudiant"
2. Fill required fields:
   - Nom: "Test Student"
   - Email: "test@example.com"
   - Téléphone: "+221771234567"
3. Select country: 🇸🇳 Sénégal
4. Status: 📝 Nouveau
5. Source: Manuel (Sanity)
6. Notes: "Test entry from Studio"
7. Click "Publish"

✅ **Expected**: Student appears in list immediately

### Test 3: Edit Student

1. Click on the test student
2. Change status to: 📞 Contacté
3. Add notes: "Called on 11/10/2025"
4. Click "Publish"

✅ **Expected**: Changes saved, preview updates

### Test 4: Delete Student

1. Click on test student
2. Menu (•••) → Delete
3. Confirm

✅ **Expected**: Student removed from list

### Test 5: API Registration

```bash
# In your browser
http://localhost:3000

# Click any "Inscription gratuite" button
# Fill form and submit
# Check Sanity Studio
```

✅ **Expected**: New student appears with:
- fullName: Combined name
- email: From form
- phone: From form
- country: From form (if selected)
- status: "nouveau"
- source: "site-web"

---

## 🔧 Troubleshooting

### Students not showing in Studio

**Solution**:
```bash
# Restart dev server
Ctrl+C
npm run dev

# Refresh Studio
http://localhost:3000/studio
```

### Can't delete students

**Check**:
- Are you logged in to Sanity?
- Do you have admin permissions?

**Solution**:
```bash
# Re-login to Sanity
npx sanity login
```

### Old data still showing

**Issue**: Old student documents with old schema format

**Solution**:
1. Go to Sanity Studio
2. Click on old student
3. Manually update to match new fields
4. Or delete old entries and re-import

### API returns 409 error

**Issue**: Duplicate email

**Solution**:
- Email already exists in database
- Use different email
- Or delete existing student first

---

## 📁 Files Modified

1. **sanity/schemas/student.ts**
   - Simplified from 20+ fields to 8 fields
   - Updated field names (firstName/lastName → fullName)
   - Changed status options
   - Added source field
   - French labels

2. **sanity/structure.ts**
   - Added students as prominent section
   - Enabled "Add student" button
   - Set default sorting
   - Organized with emojis

3. **src/app/api/register-student/route.ts**
   - Updated validation for new schema
   - Removed password/documents logic
   - Combines firstName + lastName
   - Sets status to "nouveau"
   - Sets source to "site-web"

---

## 🎓 Next Steps

### Recommended Actions

1. **Test the new schema**
   - Open Studio and explore
   - Add a test student manually
   - Edit and delete

2. **Update existing students** (if any)
   - Go through old entries
   - Update to new format
   - Or clean database and start fresh

3. **Use the system**
   - Accept registrations via form
   - Add students from calls/emails manually
   - Track status changes

4. **Train your team**
   - Show them how to add students
   - How to update status
   - How to use notes field

---

## 📞 Support

### Need Help?

**Common Tasks**:
- Add student → Click ➕ button
- Edit student → Click on name → Edit → Publish
- Delete student → Click name → Menu (•••) → Delete
- Sort students → Click sort dropdown above list
- Search students → Use search box at top

**Documentation**:
- [Sanity Studio Docs](https://www.sanity.io/docs/sanity-studio)
- [Schema Types](https://www.sanity.io/docs/schema-types)
- [Structure Builder](https://www.sanity.io/docs/structure-builder)

---

**Last Updated**: October 11, 2025  
**Version**: 2.0 (Simplified)  
**Status**: ✅ Production Ready  

🎉 **Your student management system is now simpler and more powerful!**
