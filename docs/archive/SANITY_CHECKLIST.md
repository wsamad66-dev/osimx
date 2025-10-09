# ✅ Sanity Setup Checklist

Copy this checklist and mark items as you complete them!

---

## Pre-Setup
- [x] Sanity dependencies installed (914 packages)
- [x] Schemas created (hero, student, studentDocument)
- [x] `.env.local` file prepared

---

## Setup Steps

### 1. Create Sanity Project
- [ ] Go to https://www.sanity.io/manage
- [ ] Sign up / Log in (GitHub/Google/Email)
- [ ] Click "Create project"
- [ ] Name: "OSIM Student Portal"
- [ ] Dataset: "production"
- [ ] Project created successfully
- [ ] Copy Project ID (looks like: abc123xyz)

**My Project ID**: `_________________`

---

### 2. Configure Project ID
- [ ] Open `.env.local` file
- [ ] Find line: `NEXT_PUBLIC_SANITY_PROJECT_ID=`
- [ ] Paste Project ID
- [ ] Save file

---

### 3. Generate API Token
- [ ] In Sanity dashboard, go to API → Tokens
- [ ] Click "Add API token"
- [ ] Token name: "OSIM Server Token"
- [ ] Permissions: **Editor** (not Reader!)
- [ ] Copy token (starts with `sk...`)

**My Token (first 10 chars)**: `sk________`

---

### 4. Configure API Token
- [ ] Open `.env.local` file
- [ ] Find line: `SANITY_API_TOKEN=`
- [ ] Paste token
- [ ] Save file

---

### 5. Deploy Schemas
- [ ] Open terminal in VS Code
- [ ] Run: `npx sanity deploy`
- [ ] Enter studio hostname: `osim-studio`
- [ ] Wait for "Studio deployed successfully!"
- [ ] Note production Studio URL

**My Studio URL**: `https://____________.sanity.studio`

---

### 6. Seed Hero Content
- [ ] Run: `npm run seed:hero`
- [ ] See success message
- [ ] Copy Document ID from output

**Hero Document ID**: `_________________`

---

### 7. Test Connection
- [ ] Run: `npm run test:sanity`
- [ ] ✅ Configuration OK
- [ ] ✅ Connection OK
- [ ] ✅ Found hero content
- [ ] ✅ Schema validation passed

---

### 8. Access Studio
- [ ] Run: `npm run dev`
- [ ] Open: http://localhost:3000/studio
- [ ] See "OSIM Student Portal" title
- [ ] See 3 document types: Hero, Student, Student Document
- [ ] Click "Hero" - see seeded document
- [ ] Try editing headline
- [ ] Click "Publish" to save changes

---

## ✅ Setup Complete!

Once all items above are checked, you're ready for:
- **Phase 2**: Hero Section UI
- **Phase 3**: Multi-step registration modal
- **Phase 4**: File uploads
- **Phase 5**: Registration API

---

## 🔍 Verification

Run this quick verification:

```bash
# Test connection
npm run test:sanity

# Expected output:
# ✅ Configuration OK
# ✅ Connection OK
# ✅ Found hero content
# ✨ All tests passed!
```

If you see all ✅ checks, you're good to go!

---

## 🆘 Having Issues?

Check these common solutions:

1. **"Project ID not configured"**
   - Open `.env.local`
   - Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` has a value

2. **"Insufficient permissions"**
   - Go to Sanity → API → Tokens
   - Create new token with **Editor** permissions

3. **"Cannot connect to Sanity"**
   - Check internet connection
   - Verify Project ID is correct
   - Try logging in: `npx sanity login`

4. **Studio won't load**
   - Restart dev server
   - Clear browser cache
   - Try incognito window

---

## 📚 Resources

- **Detailed Guide**: `docs/SANITY_SETUP_INTERACTIVE.md`
- **Quick Reference**: `docs/SANITY_QUICK_REFERENCE.md`
- **Full Documentation**: `docs/SANITY_SETUP_GUIDE.md`

---

**Need help?** Check the documentation files above or ask for assistance!
