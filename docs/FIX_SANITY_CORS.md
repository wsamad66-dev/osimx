# 🔧 Fix Sanity CORS Error

## The Problem

You're seeing: `CorsOriginError` when accessing http://localhost:3000/studio

This means `localhost:3000` is not added to your Sanity project's allowed CORS origins.

---

## ✅ Quick Fix (2 minutes)

### Step 1: Go to Sanity CORS Settings

👉 **Open this link**: https://www.sanity.io/manage/personal/project/4hv0dnh9/api

### Step 2: Add CORS Origin

1. Scroll down to **"CORS Origins"** section
2. Click **"Add CORS origin"** button
3. Enter: `http://localhost:3000`
4. Check **"Allow credentials"** checkbox
5. Click **"Save"**

### Step 3: Refresh Studio

1. Go back to: http://localhost:3000/studio
2. Refresh the page (Cmd/Ctrl + R)
3. Studio should now load! ✅

---

## 🌐 Recommended CORS Origins

Add these origins for complete setup:

### Development:
```
http://localhost:3000
http://localhost:3001
```

### Production (add when deploying):
```
https://yourdomain.com
https://www.yourdomain.com
```

### Sanity Studio:
```
https://osim-studio.sanity.studio
```

---

## 🚨 If Still Not Working

### Option 1: Use Sanity CLI

Run this command to add CORS origin:

```bash
npx sanity cors add http://localhost:3000 --credentials
```

### Option 2: Clear Browser Cache

1. Open DevTools (F12)
2. Right-click the refresh button
3. Click "Empty Cache and Hard Reload"

### Option 3: Check Environment Variables

Run this to verify your Project ID:

```bash
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

Should output: `4hv0dnh9`

If empty, restart your dev server:

```bash
# Stop the server (Ctrl+C)
npm run dev
```

---

## ✅ Verification

Once fixed, you should see:

1. **Sanity Studio Interface**
   - Left sidebar with "Hero", "Student", "Student Document"
   - Top bar with your project name

2. **No Error Messages**
   - No red error screens
   - Console shows no CORS errors

3. **Can Edit Content**
   - Click "Hero" → See your document
   - Make an edit → Click "Publish"

---

## 📋 Quick Checklist

- [ ] Go to https://www.sanity.io/manage/personal/project/4hv0dnh9/api
- [ ] Click "Add CORS origin"
- [ ] Add `http://localhost:3000`
- [ ] Check "Allow credentials"
- [ ] Click "Save"
- [ ] Refresh http://localhost:3000/studio

---

**After adding the CORS origin, the Studio should work perfectly!** 🎉

Let me know once you've added it, and we can verify it's working!
