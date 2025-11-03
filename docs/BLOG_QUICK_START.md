# 🚀 Blog System - Quick Start Guide

## ✅ Installation Complete!

Your complete blog system is now ready to use! Here's how to get started.

---

## 📦 What's Included

### Backend (Sanity CMS)
- ✅ **Author Schema** - Manage blog authors with bio, photo, and social links
- ✅ **Post Schema** - Rich blog posts with 20+ fields including:
  - Portable Text content with images, quotes, and callouts
  - 10 specialized categories for international students
  - SEO optimization fields
  - Related posts system
  - Featured article support
  - Reading time estimation

### Frontend (Next.js)
- ✅ **Blog List Page** (`/blog`) - Homepage with:
  - Hero section
  - Featured articles section
  - Search functionality
  - Category filters
  - Responsive grid (2 columns)
  - Pagination (6 posts per page)

- ✅ **Blog Post Page** (`/blog/[slug]`) - Individual articles with:
  - Full-width cover image
  - Rich content rendering (PortableText)
  - Author bio and social links
  - Related posts recommendations
  - Newsletter signup CTA
  - Social sharing buttons
  - SEO metadata (OpenGraph, Twitter Cards)

### Components
- ✅ `BlogCard` - Article preview cards
- ✅ `BlogSearch` - Animated search input
- ✅ `CategoryFilter` - Filter buttons with emojis
- ✅ `RelatedPosts` - 3-column related articles grid
- ✅ `NewsletterCTA` - Newsletter signup form
- ✅ `Pagination` - Page navigation with ellipsis
- ✅ `PortableTextRenderer` - Rich content display

---

## 🎯 Getting Started in 3 Steps

### Step 1: Start Sanity Studio

```bash
npm run sanity
```

Open http://localhost:3333/studio

### Step 2: Create Sample Data

```bash
npm run seed:blog
```

This creates:
- 3 authors (Sophie Martin, Ahmed Ben Salah, Marie Dubois)
- 8 sample blog posts covering all categories

### Step 3: View Your Blog

```bash
npm run dev
```

Visit http://localhost:3000/blog

---

## 📝 Create Your First Blog Post

### 1. Open Sanity Studio
Navigate to http://localhost:3333/studio

### 2. Create an Author (if needed)
1. Click **"Author"** in the sidebar
2. Click **"Create new Author"**
3. Fill in:
   - Name
   - Role (e.g., "Expert en visas")
   - Bio (use the rich text editor)
   - Social links (LinkedIn, Twitter, Email)
   - Upload a profile photo
4. Click **Publish**

### 3. Create a Blog Post
1. Click **"Post"** in the sidebar
2. Click **"Create new Post"**
3. Fill in the required fields:

**Content Group:**
- **Title**: Catchy and descriptive (10-100 chars)
- **Image principale**: Upload 1200x630px image
- **Résumé**: Brief summary (50-200 chars)
- **Content**: Write your article using the rich text editor

**Metadata Group:**
- **Author**: Select an author
- **Category**: Choose from 10 categories
- **Tags**: Add 3-5 relevant tags
- **Date de publication**: Set publish date
- **À la une**: Check to feature on homepage

**SEO Group (Optional but Recommended):**
- **Titre SEO**: Optimized title for search engines
- **Description SEO**: Meta description
- **Mots-clés**: 5-10 keywords

4. Click **Publish**

---

## 🎨 Blog Categories

Your blog has 10 specialized categories:

| Category | Emoji | Best For |
|----------|-------|----------|
| **études-france** | 🇫🇷 | Articles about studying in France |
| **études-canada** | 🇨🇦 | Articles about studying in Canada |
| **études-usa** | 🇺🇸 | Articles about studying in USA |
| **études-uk** | 🇬🇧 | Articles about studying in UK |
| **visa-documents** | 📄 | Visa guides and documents |
| **conseils** | 💡 | General tips and advice |
| **testimonials** | ⭐ | Student testimonials |
| **news** | 📰 | News and updates |
| **bourses** | 🎓 | Scholarships and funding |
| **logement** | 🏠 | Housing guides |

---

## ✨ Rich Content Editor

Your blog supports rich content blocks:

### Text Formatting
- **Bold**, *Italic*, `Code`
- Headings (H2, H3, H4)
- Bullet lists
- Numbered lists
- Links (internal/external)

### Special Blocks

#### 📸 Images
Click **"+"** → **"Image"**
- Upload image
- Add alt text (required for SEO)
- Add caption (optional)

#### 💬 Advanced Quotes
Click **"+"** → **"Advanced Quote"**
- Quote text
- Author name
- Author role

#### 📦 Callouts (4 Types)
Click **"+"** → **"Callout"**

**Info** (Blue) - Important information
**Tip** (Green) - Helpful tips
**Warning** (Yellow) - Warnings
**Student** (Purple) - Student testimonials

---

## 🔍 SEO Best Practices

### Title SEO
```
Format: [Topic] : [Details] | L'Étudiant Étranger
Example: Guide Complet pour Étudier en France 2025 | L'Étudiant Étranger
Length: 50-60 characters
```

### Description SEO
```
Format: [Benefit] : [Details] [Call-to-action]
Example: Découvrez comment obtenir votre visa étudiant : documents, délais, conseils d'experts.
Length: 150-160 characters
```

### Keywords
- Use 5-10 keywords
- Include variations
- Think about user search intent

---

## 📊 Navigation

The blog is automatically added to your navigation:

**Menu Item:** Blog & Conseils  
**URL:** /blog  
**Order:** 5 (between Destinations and Contact)

You can customize this in Sanity Studio under **"Navigation / Header"**.

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start Next.js dev server
npm run sanity           # Start Sanity Studio

# Data
npm run seed:blog        # Create sample blog data

# Production
npm run build            # Build for production
npm run sanity:deploy    # Deploy Sanity Studio

# Maintenance
npm run lint             # Check code quality
```

---

## 📁 File Structure

```
/src/app/blog/
  ├── page.tsx                  # Blog list page
  └── [slug]/
      └── page.tsx              # Individual post page

/src/components/blog/
  ├── BlogCard.tsx              # Post preview card
  ├── BlogSearch.tsx            # Search input
  ├── CategoryFilter.tsx        # Category buttons
  ├── RelatedPosts.tsx          # Related articles
  ├── NewsletterCTA.tsx         # Newsletter form
  ├── Pagination.tsx            # Page navigation
  └── PortableTextRenderer.tsx  # Content renderer

/sanity/schemas/blog/
  ├── author.ts                 # Author schema
  └── post.ts                   # Post schema

/scripts/
  └── seed-blog.ts              # Data seeding script

/docs/
  └── BLOG_SYSTEM_GUIDE.md      # Complete documentation
```

---

## 🎨 Customization

### Colors
Blog uses your theme colors defined in Tailwind:
- **Primary**: Blue (600)
- **Secondary**: Purple (600)
- **Accent**: Pink (600)
- **Background**: Slate (50)
- **Text**: Slate (900, 700, 600)

### Fonts
- **Body**: Inter (sans-serif)
- **Headings**: Playfair Display (serif)

### Layout
- **Posts per page**: 6 (change in `page.tsx`)
- **Related posts**: 3 (change in `RelatedPosts.tsx`)
- **Grid columns**: 2 on desktop, 1 on mobile

---

## 🐛 Troubleshooting

### Images Not Showing
1. Check `next.config.ts` includes `cdn.sanity.io` in domains
2. Restart dev server: `rm -rf .next && npm run dev`
3. Verify image has been uploaded in Sanity

### Posts Not Appearing
1. Check `publishedAt` date is in the past
2. Verify post is published in Sanity (green dot)
3. Check browser console for errors

### Search/Filter Not Working
These are client-side components. Make sure:
1. JavaScript is enabled
2. No console errors
3. Blog data is loaded correctly

---

## 📚 Learn More

For complete documentation, see:
- **Full Guide**: `/docs/BLOG_SYSTEM_GUIDE.md`
- **Sanity Docs**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 🎉 You're Ready!

Your blog system is fully functional. Start creating amazing content for international students!

**Need help?** Check the full documentation at `/docs/BLOG_SYSTEM_GUIDE.md`

---

**Created**: January 2025  
**Version**: 1.0.0  
**Tech Stack**: Next.js 15 + Sanity CMS + TypeScript + Tailwind CSS
