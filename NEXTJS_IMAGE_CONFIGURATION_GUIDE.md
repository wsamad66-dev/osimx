# Next.js 15 Image Configuration - Complete Guide

## 🎯 Problem Summary
**Error:** `Invalid src prop on next/image, hostname "i.pravatar.cc" is not configured`

**Root Cause:** Next.js 15 has stricter requirements for external image domains and requires explicit configuration using `remotePatterns` with proper TypeScript typing.

---

## ✅ Solution Implemented

### 1. **Updated Configuration Structure**

The `next.config.ts` now uses:
- **Explicit TypeScript type annotations** (`as const`)
- **Empty port strings** (required by Next.js 15)
- **Wildcard patterns** (`/**`) for flexible pathname matching
- **Development mode unoptimized images** for faster loading during dev

### 2. **Key Changes Made**

```typescript
// ❌ OLD (Not working in Next.js 15)
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'i.pravatar.cc',
    pathname: '/**',
  }
]

// ✅ NEW (Next.js 15 compatible)
remotePatterns: [
  {
    protocol: 'https' as const,  // Type annotation
    hostname: 'i.pravatar.cc',
    port: '',                     // Required field
    pathname: '/**',
  }
]
```

### 3. **Configured Domains**

All external image sources are now properly configured:

| Domain | Purpose | Pattern |
|--------|---------|---------|
| `i.pravatar.cc` | Avatar placeholders (testimonials) | `/**` |
| `cdn.sanity.io` | Sanity CMS images | `/**` |
| `**.sanity.io` | All Sanity subdomains | `/**` |
| `images.pexels.com` | Stock photos | `/**` |
| `storage.googleapis.com` | Google Cloud Storage | `/**` |
| `replicate.delivery` | AI-generated images | `/**` |

---

## 🔧 Debugging & Verification Steps

### **Step 1: Clear All Caches**
```bash
# Kill all Node processes
pkill -9 node 2>/dev/null

# Remove all cache directories
rm -rf .next node_modules/.cache .swc

# Wait for cleanup
sleep 3
```

### **Step 2: Start Fresh Server**
```bash
npm run dev
```

Wait for:
```
✓ Ready in 2.8s
○ Compiling / ...
✓ Compiled / in 21.6s (2128 modules)
```

### **Step 3: Test in Incognito Browser**
1. **Open incognito/private window** (Cmd+Shift+N / Cmd+Shift+P)
2. Visit: `http://localhost:3000`
3. **Open DevTools Console** (F12 or Cmd+Option+I)
4. Look for: `🔧 Next.js Image Configuration Loading...`
5. **Verify testimonial images load** (no red error boxes)

### **Step 4: Check for Image Errors**
In the browser console, look for:
- ✅ **No errors** = Configuration working
- ❌ **"Invalid src prop"** = Cache issue, try hard refresh
- ❌ **404 errors** = Check image URLs are accessible

---

## 🚨 Troubleshooting Common Issues

### Issue 1: Error Persists After Config Update
**Cause:** Next.js caches compiled pages in memory

**Solution:**
```bash
# Complete reset
pkill -9 node && rm -rf .next && npm run dev

# Wait 30 seconds, then open in incognito window
```

### Issue 2: Images Load Slowly in Development
**Cause:** Next.js optimizes images on-demand

**Solution:** Already implemented in config:
```typescript
unoptimized: process.env.NODE_ENV === 'development'
```
This disables optimization during development for faster loading.

### Issue 3: Wildcard Domain Not Working
**Example:** `**.sanity.io` not matching `your-project.cdn.sanity.io`

**Solution:** Add both patterns:
```typescript
// Specific subdomain
{ hostname: 'cdn.sanity.io', pathname: '/**' }
// Wildcard for all subdomains
{ hostname: '**.sanity.io', pathname: '/**' }
```

### Issue 4: Browser Cache Showing Old Error
**Cause:** Browser cached the error page

**Solutions (try in order):**
1. **Hard Refresh:** Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
2. **Clear Site Data:** DevTools → Application → Clear Storage → Clear site data
3. **Incognito Window:** Always shows fresh content

---

## 📊 Next.js 15 Image Optimization Features

### **Automatic Optimizations Enabled**

1. **Format Conversion**
   - AVIF (best compression)
   - WebP (fallback)
   - Original format (final fallback)

2. **Responsive Images**
   - `deviceSizes`: [640, 750, 828, 1080, 1200, 1920]
   - `imageSizes`: [16, 32, 48, 64, 96, 128, 256, 384]
   - Automatic srcset generation

3. **Performance**
   - Lazy loading by default
   - Blur placeholder support
   - Automatic caching (60s minimum)

### **Configuration Reference**

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [...],
  imageSizes: [...],
  minimumCacheTTL: 60,
  remotePatterns: [...],
  unoptimized: process.env.NODE_ENV === 'development',
}
```

---

## 🎨 Testimonial Images Specifics

### **Current Setup**
- **6 testimonial cards** with student avatars
- **Source:** `https://i.pravatar.cc/400?img={1-70}`
- **Optimization:** Disabled in development, enabled in production

### **Image URLs Used**
```typescript
const testimonials = [
  { studentImage: 'https://i.pravatar.cc/400?img=47' }, // Aminata
  { studentImage: 'https://i.pravatar.cc/400?img=33' }, // Kwame
  { studentImage: 'https://i.pravatar.cc/400?img=48' }, // Fatima
  { studentImage: 'https://i.pravatar.cc/400?img=44' }, // Ibrahim
  { studentImage: 'https://i.pravatar.cc/400?img=49' }, // Aïcha
  { studentImage: 'https://i.pravatar.cc/400?img=27' }, // Omar
];
```

### **Expected Result**
✅ All 6 images load instantly without errors  
✅ Images have proper alt text for accessibility  
✅ Images use Next.js Image component with automatic optimization  
✅ Images lazy load as user scrolls  

---

## 🔮 Future: Sanity CMS Integration

When you connect Sanity CMS for real testimonials:

### **1. Add Environment Variables**
```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### **2. Image Configuration Already Ready**
✅ `cdn.sanity.io` configured  
✅ `**.sanity.io` wildcard configured  
✅ All Sanity subdomains supported  

### **3. Use Sanity Image URLs**
```typescript
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: any) {
  return builder.image(source).url()
}

// Usage
<Image 
  src={urlFor(testimonial.studentImage).width(400).height(400).url()}
  alt={testimonial.studentName}
/>
```

---

## 🎯 Verification Checklist

Use this checklist to verify everything works:

- [ ] Server starts without errors (`npm run dev`)
- [ ] Config console log appears: `🔧 Next.js Image Configuration Loading...`
- [ ] No TypeScript errors in `next.config.ts`
- [ ] Homepage loads successfully (http://localhost:3000)
- [ ] All 6 testimonial images visible (no broken image icons)
- [ ] No console errors in browser DevTools
- [ ] Images load in incognito window (cache-free test)
- [ ] Hard refresh works (Cmd+Shift+R)
- [ ] Mobile responsive (test at different viewport sizes)

---

## 🚀 Performance Best Practices

### **1. Use Proper Image Sizing**
```typescript
<Image
  src={testimonial.studentImage}
  alt={testimonial.studentName}
  width={400}
  height={400}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

### **2. Add Priority for Above-Fold Images**
```typescript
<Image
  src={heroImage}
  priority // Loads immediately, no lazy loading
  alt="Hero"
/>
```

### **3. Use Blur Placeholders**
```typescript
<Image
  src={image}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  alt="Student"
/>
```

---

## 📚 Additional Resources

- **Next.js Image Documentation:** https://nextjs.org/docs/app/api-reference/components/image
- **Remote Patterns Guide:** https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
- **Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images
- **Sanity Image URLs:** https://www.sanity.io/docs/image-url

---

## ✅ Current Status

**Configuration:** ✅ Complete and Next.js 15 compatible  
**Server:** ✅ Running on http://localhost:3000  
**Caches:** ✅ Cleared (fresh compilation)  
**TypeScript:** ✅ Fully typed configuration  

**Next Step:** Open http://localhost:3000 in an **incognito browser window** to test!

---

## 🎉 Expected Result

When you visit the site, you should see:

1. **Hero Section** - Loading instantly
2. **Testimonials Section** - All 6 student avatars visible
3. **No console errors** - Clean browser console
4. **Smooth animations** - Framer Motion working
5. **Fast loading** - Unoptimized images in dev mode

**If you see any errors, check the troubleshooting section above!**
