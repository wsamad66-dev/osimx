# 🎓 OSIM Student Registration - Sanity CMS Setup Guide

## Overview

This guide walks you through setting up Sanity CMS for the OSIM student registration system. The system includes:

- **Hero Content Management**: Dynamic homepage hero section
- **Student Registration**: Multi-step form with document uploads
- **Secure Document Storage**: Files stored in Sanity Assets (no AWS/Cloudinary)
- **Admin Dashboard**: Manage students and documents via Sanity Studio

---

## Prerequisites

- Node.js 18+ installed
- OSIM project cloned and `npm install` completed
- Sanity account (free tier available at [sanity.io](https://www.sanity.io))

---

## Step 1: Create a Sanity Project

### 1.1 Sign up for Sanity

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Sign up with GitHub, Google, or email
3. Verify your email if required

### 1.2 Create a New Project

1. Click **"Create project"**
2. Enter project name: **"OSIM Student Portal"**
3. Select dataset: **"production"**
4. Note your **Project ID** (e.g., `abc123xyz`)

---

## Step 2: Configure Environment Variables

### 2.1 Copy the Example File

```bash
cp .env.local.example .env.local
```

### 2.2 Get Your Project ID

1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Click on your "OSIM Student Portal" project
3. Copy the **Project ID** from the project settings

### 2.3 Generate an API Token

1. In your Sanity project dashboard, go to **API** → **Tokens**
2. Click **"Add API token"**
3. Name: `OSIM Server Token`
4. Permissions: **Editor** (required for document creation)
5. Copy the token (you'll only see it once!)

### 2.4 Update `.env.local`

Open `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...your_token_here
```

⚠️ **IMPORTANT**: Never commit `.env.local` to git! It's already in `.gitignore`.

---

## Step 3: Deploy Schemas to Sanity

### 3.1 Deploy the Studio

```bash
npx sanity deploy
```

- This creates the Sanity Studio UI
- Choose a studio hostname: `osim-studio` (or your preference)
- The studio will be available at `https://osim-studio.sanity.studio`

### 3.2 Verify Schemas

1. Open Sanity Studio: `https://your-studio.sanity.studio` (or locally at `/studio`)
2. You should see three document types:
   - **Hero** - Homepage hero content
   - **Student** - Student registration data
   - **Student Document** - Uploaded files

---

## Step 4: Seed Initial Hero Content

### 4.1 Run the Seed Script

```bash
npm run seed-hero
```

Or manually:

```bash
node --loader tsx scripts/seed-hero.ts
```

### 4.2 Verify in Sanity Studio

1. Open Sanity Studio
2. Go to **Hero** in the left sidebar
3. You should see one document with French hero content
4. Edit as needed (headline, subheadline, benefits)

---

## Step 5: Test the Sanity Integration

### 5.1 Check Configuration Status

Create a test file to verify the setup:

```typescript
// scripts/test-sanity.ts
import { isSanityConfigured, client } from '../lib/sanity.client'

async function testSanity() {
  console.log('Sanity configured:', isSanityConfigured)
  
  if (!isSanityConfigured) {
    console.error('❌ Sanity not configured. Check .env.local')
    process.exit(1)
  }
  
  const hero = await client.fetch(`*[_type == "hero" && isActive == true][0]`)
  console.log('✅ Hero content:', hero?.headline)
}

testSanity()
```

### 5.2 Run the Test

```bash
node --loader tsx scripts/test-sanity.ts
```

Expected output:
```
Sanity configured: true
✅ Hero content: Commencez Votre Aventure Académique Internationale
```

---

## Step 6: Access Sanity Studio

### 6.1 Local Development

While your Next.js dev server is running:

```bash
npm run dev
```

Open: [http://localhost:3000/studio](http://localhost:3000/studio)

### 6.2 Production Studio

After deploying with `npx sanity deploy`:

Open: `https://your-studio.sanity.studio`

---

## Sanity Schema Reference

### Hero Schema

| Field | Type | Description |
|-------|------|-------------|
| `headline` | String | Main heading (max 100 chars) |
| `subheadline` | Text | Supporting text (max 250 chars) |
| `heroImage` | Image | Background image (optional) |
| `primaryCtaText` | String | Main CTA button text |
| `secondaryCtaText` | String | Secondary CTA button text |
| `benefits` | Array | List of benefits (icon, title, description) |
| `isActive` | Boolean | Enable/disable this hero version |

### Student Schema

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Full name |
| `email` | String | Email (validated) |
| `phone` | String | Phone number |
| `country` | String | Country of residence |
| `dateOfBirth` | Date | Birth date |
| `nationality` | String | Nationality |
| `educationLevel` | String | Dropdown: high_school, bachelors, masters, phd, other |
| `intendedProgram` | String | Desired program of study |
| `intendedCountry` | String | Destination country |
| `avatar` | Image | Profile photo (optional) |
| `status` | String | Dropdown: new, in_review, approved, rejected |
| `notes` | Text | Admin notes |
| `createdAt` | DateTime | Auto-timestamp |

### Student Document Schema

| Field | Type | Description |
|-------|------|-------------|
| `student` | Reference | Link to student document |
| `title` | String | Document name (e.g., "Passport") |
| `file` | File | PDF/image file (max 10MB) |
| `mimeType` | String | File MIME type (auto) |
| `size` | Number | File size in bytes (auto) |
| `notes` | Text | Optional notes |
| `verified` | Boolean | Admin verification status |
| `createdAt` | DateTime | Upload timestamp |

---

## Troubleshooting

### Error: "Project ID not configured"

**Solution**: Check `.env.local` for correct `NEXT_PUBLIC_SANITY_PROJECT_ID`

### Error: "Dataset not found"

**Solution**: Verify `NEXT_PUBLIC_SANITY_DATASET` matches your Sanity project dataset

### Error: "Insufficient permissions"

**Solution**: Ensure `SANITY_API_TOKEN` has **Editor** permissions, not just Reader

### Studio Not Loading

**Solution**: 
1. Restart Next.js dev server
2. Clear browser cache
3. Check console for errors

### Cannot Upload Files

**Solution**:
1. Verify `SANITY_API_TOKEN` is set
2. Check token has Editor permissions
3. Ensure file size < 10MB

---

## Security Best Practices

1. **Never commit `.env.local`** - Use `.env.local.example` for templates
2. **Use different tokens** for development and production
3. **Rotate API tokens** regularly (every 3-6 months)
4. **Limit token permissions** - Use Reader for frontend, Editor only for backend
5. **Add rate limiting** to upload endpoints (TODO: implement in Phase 7)

---

## Next Steps

After completing this setup:

1. **Phase 2**: Build Hero Section UI component
2. **Phase 3**: Create multi-step registration modal
3. **Phase 4**: Implement Sanity upload integration
4. **Phase 5**: Build registration API endpoints
5. **Phase 6**: Add accessibility and UX polish
6. **Phase 7**: Final hardening and deployment

---

## Useful Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [next-sanity Guide](https://www.sanity.io/plugins/next-sanity)
- [GROQ Query Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Sanity Assets API](https://www.sanity.io/docs/http-api-assets)

---

## Support

For issues specific to this project:
- Check `TODO.md` for known issues
- Review `PRODUCTION_SETUP.md` for deployment guides

For Sanity-specific issues:
- [Sanity Slack Community](https://slack.sanity.io)
- [Sanity Support](https://www.sanity.io/help)
