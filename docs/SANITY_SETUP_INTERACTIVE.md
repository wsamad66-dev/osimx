# 🚀 Sanity Setup - Interactive Guide

## Current Status
✅ Sanity dependencies installed (914 packages)  
✅ Schemas created (hero, student, studentDocument)  
✅ `.env.local` file prepared  
⏳ **Need to configure Sanity credentials**

---

## 📋 Step-by-Step Setup

### Step 1: Create Your Sanity Project (5 minutes)

#### 1.1 Go to Sanity Dashboard
👉 **Open this link**: [https://www.sanity.io/manage](https://www.sanity.io/manage)

#### 1.2 Sign Up / Log In
- Click **"Sign up"** or **"Log in"**
- Choose one:
  - GitHub (recommended)
  - Google
  - Email

#### 1.3 Create New Project
1. Click **"Create project"** button
2. Enter project name: **`OSIM Student Portal`**
3. Select dataset: **`production`**
4. Click **"Create"**

#### 1.4 Copy Your Project ID
You'll see a screen with your project details.

**Look for**: `Project ID: abc123xyz`

📋 **Copy this ID** - you'll need it in the next step!

---

### Step 2: Add Project ID to Environment Variables

#### 2.1 Open Your `.env.local` File
The file is already prepared at: `/Users/asf/Documents/GitHub/osimx/.env.local`

#### 2.2 Find This Line
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
```

#### 2.3 Paste Your Project ID
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
```
*(Replace `abc123xyz` with your actual Project ID)*

✅ **Save the file**

---

### Step 3: Generate an API Token

#### 3.1 Go to API Settings
In your Sanity project dashboard:
1. Click **"API"** in the left sidebar
2. Click **"Tokens"** tab

#### 3.2 Create a New Token
1. Click **"Add API token"** button
2. Fill in:
   - **Token name**: `OSIM Server Token`
   - **Permissions**: Select **"Editor"** ⚠️ (NOT "Reader" - we need write access!)
3. Click **"Create"**

#### 3.3 Copy the Token
⚠️ **IMPORTANT**: You'll only see the token once!

**It looks like**: `skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

📋 **Copy the entire token**

#### 3.4 Add Token to `.env.local`
Find this line:
```bash
SANITY_API_TOKEN=
```

Paste your token:
```bash
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

✅ **Save the file**

---

### Step 4: Verify Dataset Configuration

#### 4.1 Check Dataset Line
Your `.env.local` should have:
```bash
NEXT_PUBLIC_SANITY_DATASET=production
```

✅ This is correct! (Leave as-is)

---

### Step 5: Deploy Schemas to Sanity

Now that your environment is configured, let's deploy the schemas!

#### 5.1 Open Terminal
In VS Code, press `` Ctrl + ` `` (backtick) to open terminal

#### 5.2 Run Deploy Command
```bash
npx sanity deploy
```

**What happens**:
- Sanity will read your schemas (hero, student, studentDocument)
- Upload them to your Sanity project
- Create the Sanity Studio interface

**You'll be asked**:
- Studio hostname: Enter `osim-studio` (or any name you prefer)
- This creates: `https://osim-studio.sanity.studio`

✅ **Wait for "Studio deployed successfully!" message**

---

### Step 6: Seed Initial Hero Content

#### 6.1 Run Seed Script
```bash
npm run seed:hero
```

**Expected output**:
```
🌱 Seeding hero content...
✅ Hero content seeded successfully!
Document ID: abc123xyz
```

This creates the French homepage hero content with:
- Headline: "Commencez Votre Aventure Académique Internationale"
- 4 benefit cards (Sécurisé, Rapide, Accompagnement, Destinations)

---

### Step 7: Test Your Connection

#### 7.1 Run Test Script
```bash
npm run test:sanity
```

**Expected output**:
```
🧪 Testing Sanity CMS integration...

1️⃣ Checking configuration...
✅ Configuration OK

2️⃣ Testing connection to Sanity...
✅ Connection OK
   Found hero: "Commencez Votre Aventure Académique Internationale"

3️⃣ Validating schemas...
✅ Found 1 schema type(s): hero

✨ All tests passed! Sanity is ready to use.
```

✅ **If you see this, you're all set!**

---

### Step 8: Access Sanity Studio

#### 8.1 Start Development Server
```bash
npm run dev
```

#### 8.2 Open Studio in Browser
👉 **Visit**: [http://localhost:3000/studio](http://localhost:3000/studio)

**You should see**:
- "OSIM Student Portal" title
- Three document types in sidebar:
  - 📰 **Hero** (1 document)
  - 👨‍🎓 **Student** (empty)
  - 📄 **Student Document** (empty)

#### 8.3 Explore Hero Content
1. Click **"Hero"** in sidebar
2. You'll see the seeded document
3. Click to edit:
   - Headline
   - Subheadline
   - Benefits (4 cards)
   - Upload hero image (optional)

✅ Try changing the headline and click **"Publish"**

---

## 🎉 Congratulations!

Your Sanity CMS is now fully configured and ready to use!

### What You've Accomplished
✅ Created Sanity project  
✅ Configured environment variables  
✅ Deployed schemas (hero, student, studentDocument)  
✅ Seeded initial content  
✅ Verified connection  
✅ Accessed Sanity Studio  

### Your Environment is Ready For:
- Phase 2: Building Hero Section UI
- Phase 3: Multi-step registration modal
- Phase 4: File uploads to Sanity Assets
- Phase 5: Registration API integration

---

## 📝 Your Configuration Summary

```bash
# Your .env.local should now look like:
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz          # ✅ Your project ID
NEXT_PUBLIC_SANITY_DATASET=production            # ✅ Dataset name
SANITY_API_TOKEN=skXXXXXXXXXXXXXXXXXXXX         # ✅ Your API token
```

---

## 🔧 Quick Commands Reference

```bash
# Start dev server with Studio
npm run dev

# Access Sanity Studio
http://localhost:3000/studio

# Or access production Studio
https://osim-studio.sanity.studio

# Test Sanity connection
npm run test:sanity

# Seed hero content again (if needed)
npm run seed:hero

# Deploy schema changes
npx sanity deploy
```

---

## 🆘 Troubleshooting

### Error: "Project ID not configured"
**Solution**: Check `.env.local` - ensure `NEXT_PUBLIC_SANITY_PROJECT_ID` has a value

### Error: "Insufficient permissions"
**Solution**: Your API token needs **Editor** permissions, not Reader
1. Go to Sanity dashboard → API → Tokens
2. Delete old token
3. Create new token with **Editor** permissions

### Error: "Dataset not found"
**Solution**: Check dataset name matches in Sanity dashboard and `.env.local`

### Studio Won't Load
**Solution**:
1. Stop dev server (`Ctrl + C`)
2. Restart: `npm run dev`
3. Clear browser cache
4. Try incognito window

### Can't Deploy Schemas
**Solution**:
1. Ensure you're logged in: `npx sanity login`
2. Check internet connection
3. Verify Project ID is correct

---

## 🎯 Next Steps

Now that Sanity is configured, you can:

1. **Explore Sanity Studio**
   - Edit hero content at `/studio`
   - Experiment with different headlines
   - Upload a hero background image

2. **Move to Phase 2**
   - Build the Hero Section UI component
   - Fetch hero content from Sanity
   - Display with Framer Motion animations

3. **Review Documentation**
   - `docs/SANITY_SETUP_GUIDE.md` - Complete reference
   - `docs/SANITY_QUICK_REFERENCE.md` - Commands & queries
   - `docs/PHASE_1_COMPLETE.md` - Architecture overview

---

## 📚 Resources

- [Your Sanity Dashboard](https://www.sanity.io/manage)
- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Slack Community](https://slack.sanity.io)

---

**Ready to build?** Let me know when you've completed the setup, and we'll move to Phase 2! 🚀
