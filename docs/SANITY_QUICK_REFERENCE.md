# 📋 Sanity CMS Quick Reference

## 🚀 Quick Start Commands

```bash
# Setup
cp .env.local.example .env.local  # Copy env file
# Edit .env.local with your Sanity credentials

# Deploy schemas to Sanity
npx sanity deploy

# Seed initial hero content
npm run seed:hero

# Test Sanity connection
npm run test:sanity

# Run Sanity Studio locally
npm run sanity
# Visit: http://localhost:3000/studio
```

---

## 🔑 Environment Variables

```bash
# Required for all operations
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production

# Required for writes (registration, uploads)
SANITY_API_TOKEN=sk...your_token
```

---

## 📊 Sanity Schemas

### Hero (`hero`)
Controls homepage hero section content.

```typescript
{
  headline: string           // Main heading
  subheadline: string        // Supporting text
  heroImage?: image          // Background image
  primaryCtaText: string     // "Créer Mon Compte"
  secondaryCtaText: string   // "En Savoir Plus"
  benefits: [                // Feature badges
    {
      icon: string           // Icon name
      title: string          // Benefit title
      description: string    // Short description
    }
  ]
  isActive: boolean          // Enable/disable
}
```

### Student (`student`)
Student registration data.

```typescript
{
  // Personal Info
  name: string
  email: string              // Validated
  phone: string
  country: string
  dateOfBirth: date
  nationality: string
  
  // Academic
  educationLevel: string     // high_school | bachelors | masters | phd | other
  intendedProgram: string
  intendedCountry: string
  
  // Media
  avatar?: image
  
  // Admin
  status: string             // new | in_review | approved | rejected
  notes?: string
  createdAt: datetime        // Auto-generated
}
```

### Student Document (`studentDocument`)
Uploaded files (passport, transcripts, etc.).

```typescript
{
  student: reference         // → student
  title: string              // e.g., "Passport"
  file: file                 // PDF/image
  mimeType: string           // Auto-detected
  size: number               // File size (bytes)
  notes?: string
  verified: boolean          // Admin verification
  createdAt: datetime        // Auto-generated
}
```

---

## 🔍 GROQ Queries

### Fetch Active Hero Content
```typescript
const hero = await client.fetch(`
  *[_type == "hero" && isActive == true][0] {
    headline,
    subheadline,
    primaryCtaText,
    secondaryCtaText,
    benefits[] {
      icon,
      title,
      description
    },
    "heroImageUrl": heroImage.asset->url
  }
`)
```

### Fetch All Students
```typescript
const students = await client.fetch(`
  *[_type == "student"] | order(createdAt desc) {
    _id,
    name,
    email,
    status,
    createdAt,
    "avatarUrl": avatar.asset->url
  }
`)
```

### Fetch Student with Documents
```typescript
const studentWithDocs = await client.fetch(`
  *[_type == "student" && _id == $studentId][0] {
    ...,
    "documents": *[_type == "studentDocument" && references(^._id)] {
      _id,
      title,
      "fileUrl": file.asset->url,
      verified,
      createdAt
    }
  }
`, { studentId: 'abc123' })
```

---

## 📤 Upload Files to Sanity

### Frontend Upload Hook (Example)
```typescript
import { serverClient } from '@/lib/sanity.client'

async function uploadFile(file: File, studentId: string) {
  // Upload to Sanity Assets
  const asset = await serverClient.assets.upload('file', file, {
    filename: file.name,
  })

  // Create studentDocument reference
  const doc = await serverClient.create({
    _type: 'studentDocument',
    student: { _type: 'reference', _ref: studentId },
    title: file.name,
    file: {
      _type: 'file',
      asset: { _type: 'reference', _ref: asset._id },
    },
    mimeType: file.type,
    size: file.size,
    createdAt: new Date().toISOString(),
  })

  return doc
}
```

---

## 🛠️ Common Operations

### Create a Student
```typescript
import { serverClient } from '@/lib/sanity.client'

const student = await serverClient.create({
  _type: 'student',
  name: 'Jean Dupont',
  email: 'jean@example.com',
  phone: '+33612345678',
  country: 'France',
  dateOfBirth: '2000-01-01',
  nationality: 'French',
  educationLevel: 'bachelors',
  intendedProgram: 'Computer Science',
  intendedCountry: 'Canada',
  status: 'new',
  createdAt: new Date().toISOString(),
})
```

### Update Student Status
```typescript
await serverClient
  .patch(studentId)
  .set({ status: 'approved' })
  .commit()
```

### Delete a Document
```typescript
await serverClient.delete(documentId)
```

---

## 🎨 Sanity Studio Access

### Local Development
```bash
npm run dev
# Visit: http://localhost:3000/studio
```

### Production Studio
```bash
npm run sanity:deploy
# Visit: https://your-studio.sanity.studio
```

---

## 🔒 Security Best Practices

1. **Token Permissions**:
   - Frontend (public): No token or Reader token
   - Backend (API routes): Editor token (SANITY_API_TOKEN)

2. **Never Expose**:
   - `SANITY_API_TOKEN` in client-side code
   - Use `serverClient` only in API routes or server components

3. **Rate Limiting**:
   - Add rate limiting to `/api/register-student`
   - Add rate limiting to `/api/upload`

4. **File Validation**:
   - Check file types (PDF, JPG, PNG only)
   - Limit file size (10MB max)
   - Scan for malware in production

---

## 🐛 Troubleshooting

| Error | Solution |
|-------|----------|
| "Project ID not configured" | Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local` |
| "Dataset not found" | Verify dataset name matches Sanity project |
| "Insufficient permissions" | Ensure token has **Editor** rights |
| "Studio not loading" | Restart dev server, clear browser cache |
| "Cannot upload files" | Check `SANITY_API_TOKEN` is set with Editor permissions |

---

## 📚 Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [next-sanity Guide](https://www.sanity.io/plugins/next-sanity)
- [Assets API](https://www.sanity.io/docs/http-api-assets)

---

## 🎯 Next Steps

After setting up Sanity:

1. ✅ Complete Phase 1 (Sanity setup)
2. 🚧 Phase 2: Build Hero Section UI
3. ⏳ Phase 3: Multi-step registration modal
4. ⏳ Phase 4: File upload integration
5. ⏳ Phase 5: Registration API
6. ⏳ Phase 6: Accessibility polish
7. ⏳ Phase 7: Production hardening

See `docs/SANITY_SETUP_GUIDE.md` for detailed instructions.
