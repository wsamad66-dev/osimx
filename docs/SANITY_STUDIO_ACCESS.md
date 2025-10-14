# 📝 Access Sanity Studio - Quick Guide

## ✅ Sanity Studio is Now Running!

Your Sanity Studio is live at: **http://localhost:3333**

---

## 📚 What You'll See in Sanity Studio

You should now see these content types in the sidebar:

### Blog Section (NEW! 🎉)
1. **📝 Post** - Blog articles
   - Create new blog posts
   - Add rich content (text, images, quotes, callouts)
   - Set categories, tags, SEO
   - Mark as featured
   - Link related posts

2. **✍️ Author** - Blog authors
   - Manage author profiles
   - Add bio, photo, social links
   - Assign role/title

### Other Content Types
3. **🦸 Hero** - Homepage hero section
4. **👨‍🎓 Student** - Student records
5. **🧭 Navigation / Header** - Site navigation
6. **📋 Lead** - Student leads
7. **🤝 Partner** - Partner organizations
8. **👤 Admin** - Admin users

---

## 🚀 Quick Start: Create Your First Blog Post

### Step 1: Create an Author (First Time Only)

1. Click **"Author"** in the left sidebar
2. Click **"Create new Author"**
3. Fill in:
   ```
   Name: Your Name
   Role: Content Writer
   Bio: Brief description about yourself
   ```
4. Upload a profile photo (optional)
5. Add social links (LinkedIn, Twitter, Email)
6. Click **"Publish"**

### Step 2: Create a Blog Post

1. Click **"Post"** in the left sidebar
2. Click **"Create new Post"**
3. Fill in the required fields:

   **📝 Content Tab:**
   - **Title**: "Bienvenue sur notre nouveau blog!"
   - **Image principale**: Upload a 1200x630px image
   - **Résumé**: "Découvrez nos guides pour étudier à l'étranger"
   - **Content**: Write your article using the rich editor

   **🏷️ Metadata Tab:**
   - **Author**: Select the author you created
   - **Category**: Choose "news" or "conseils"
   - **Tags**: Add 2-3 tags like "bienvenue", "guide", "blog"
   - **Date de publication**: Set today's date
   - **À la une**: Check this box to feature on homepage

   **🔍 SEO Tab (Optional):**
   - **Titre SEO**: "Notre nouveau blog pour étudiants"
   - **Description SEO**: "Guides et conseils pour réussir vos études à l'étranger"
   - **Mots-clés**: Add 5-10 keywords

4. Click **"Publish"**

---

## 🎨 Rich Content Editor Features

When writing your blog post content, you can add:

### Text Formatting
- **Bold**, *Italic*, `Code`
- Headings (H2, H3, H4)
- Bullet lists
- Numbered lists
- Links

### Special Blocks (Click the "+" button)

#### 📸 Image
- Upload images
- Add alt text (required for SEO)
- Add captions

#### 💬 Advanced Quote
- Quote text
- Author name
- Author role
- Example: Testimonials from students

#### 📦 Callout Box (4 types)
- **Info** (Blue ℹ️) - Important information
- **Tip** (Green 💡) - Helpful tips
- **Warning** (Yellow ⚠️) - Warnings
- **Student** (Purple 🎓) - Student advice

---

## 🌍 Blog Categories

Choose the right category for your post:

| Category | Use For |
|----------|---------|
| 🇫🇷 **études-france** | Articles about studying in France |
| 🇨🇦 **études-canada** | Articles about studying in Canada |
| 🇺🇸 **études-usa** | Articles about studying in USA |
| 🇬🇧 **études-uk** | Articles about studying in UK |
| 📄 **visa-documents** | Visa guides and documents |
| 💡 **conseils** | General tips and advice |
| ⭐ **testimonials** | Student testimonials |
| 📰 **news** | News and announcements |
| 🎓 **bourses** | Scholarships and funding |
| 🏠 **logement** | Housing guides |

---

## 👀 View Your Blog Posts

After publishing, view your blog at:
- **Blog List**: http://localhost:3000/blog
- **Single Post**: http://localhost:3000/blog/[your-post-slug]

---

## 🧪 Create Sample Data (For Testing)

Want to quickly test with sample data?

```bash
npm run seed:blog
```

This creates:
- 3 sample authors
- 8 sample blog posts covering all categories

---

## 🔄 Common Sanity Studio Commands

```bash
# Start Sanity Studio
npx sanity dev

# Deploy Studio (for team access)
npx sanity deploy

# Manage project online
npx sanity manage
```

---

## 👥 Invite Team Members

### Option 1: Via Sanity Dashboard (Easiest)

1. Go to https://www.sanity.io/manage
2. Select your project
3. Click "Members" or "Team"
4. Click "Invite members"
5. Enter email addresses
6. Choose role:
   - **Administrator** - Full access
   - **Editor** - Create and edit content
   - **Viewer** - Read-only
7. Send invitations

### Option 2: Deploy Studio (No GitHub Needed)

```bash
npx sanity deploy
```

Share the deployed URL with your team. They can:
1. Create a Sanity account
2. Access the Studio
3. Create and edit content
4. No code access required!

---

## 🐛 Troubleshooting

### "I don't see Post or Author in Sanity Studio"

**Solution:** Restart Sanity Studio
```bash
# Stop the server (Ctrl+C)
# Start again
npx sanity dev
```

### "Changes not showing on the website"

**Solution:** The website auto-refreshes every 60 seconds. Wait a minute or restart:
```bash
npm run dev
```

### "I can't upload images"

**Solution:** Check your Sanity project has image hosting enabled:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Check "API" settings

---

## 📚 Learn More

- **Complete Blog Guide**: `/docs/BLOG_SYSTEM_GUIDE.md`
- **Quick Start**: `/docs/BLOG_QUICK_START.md`
- **Sanity Docs**: https://www.sanity.io/docs

---

## ✅ Checklist

- [ ] Sanity Studio running at http://localhost:3333
- [ ] Can see "Post" and "Author" in sidebar
- [ ] Created at least one author
- [ ] Published first blog post
- [ ] Viewed blog at http://localhost:3000/blog
- [ ] (Optional) Invited team members
- [ ] (Optional) Deployed Studio with `npx sanity deploy`

---

**Need Help?** 
- Check `/docs/BLOG_SYSTEM_GUIDE.md` for detailed instructions
- Run `npm run seed:blog` to create sample data
- Visit http://localhost:3333 to access Sanity Studio

---

**Last Updated:** October 14, 2025  
**Sanity Studio Port:** 3333  
**Website Port:** 3000
