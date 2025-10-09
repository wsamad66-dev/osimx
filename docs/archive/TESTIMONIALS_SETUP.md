# 🎓 Testimonials Section Setup Guide

## 📋 Quick Start

The testimonials section is fully functional with **mock data** out of the box. You can see it working immediately at `http://localhost:3000`.

---

## 🚀 Steps to Connect Sanity CMS

### 1. Setup Environment Variables

Copy the example file and fill in your Sanity credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Install Sanity Studio (if not already done)

```bash
npm create sanity@latest
# Follow prompts to create a new project
```

### 3. Add Testimonial Schema

Copy `schemas/testimonial.js` to your Sanity Studio project:

```bash
# In your Sanity Studio folder
cp ../schemas/testimonial.js schemas/
```

Then import it in `schemas/index.js`:

```javascript
import testimonial from './testimonial'

export const schemaTypes = [testimonial]
```

### 4. Deploy Schema

```bash
cd your-sanity-studio
npm run deploy
# or
sanity deploy
```

### 5. Add Testimonials in Studio

1. Open Sanity Studio: `http://localhost:3333`
2. Create new testimonials with:
   - Student name, photo
   - Country flags (🇸🇳, 🇫🇷, etc.)
   - Program details
   - Testimonial text
   - Rating (1-5 stars)
   - Optional voice file
   - Sentiment type

### 6. Restart Next.js

```bash
npm run dev
```

---

## 📁 Required Image Files

The mock data references these placeholder images. Add them to `/public/images/testimonials/`:

- `aminata.jpg` - Student from Sénégal
- `kwame.jpg` - Student from Ghana
- `fatima.jpg` - Student from Maroc
- `ibrahim.jpg` - Student from Côte d'Ivoire

**Alternative:** Use placeholder URLs temporarily:
```
https://i.pravatar.cc/400?img=1
https://i.pravatar.cc/400?img=2
```

---

## 🎙️ Optional: Voice Testimonials

Add audio files to `/public/audio/`:
- `kwame-testimonial.mp3`
- `ibrahim-testimonial.mp3`

Format: MP3, max 30 seconds, 128kbps minimum

---

## 🎨 Features Included

✅ Auto-sliding carousel (6 seconds)  
✅ Pause on hover  
✅ Country flags with animations  
✅ Voice playback button  
✅ Sentiment-based glowing borders  
✅ CTA after every 3 testimonials  
✅ Progress bar animation  
✅ Keyboard navigation (arrows, spacebar)  
✅ Full accessibility (ARIA, focus states)  
✅ Mobile responsive  

---

## 🐛 Troubleshooting

### "Images not loading"
- Check paths in `/public/images/testimonials/`
- Use absolute URLs for testing: `https://i.pravatar.cc/400`

### "Sanity connection failed"
- Verify `.env.local` has correct project ID
- Check Sanity dashboard: https://www.sanity.io/manage

### "Voice not playing"
- Ensure audio files are in `/public/audio/`
- Check browser console for CORS errors
- Test with: `http://localhost:3000/audio/test.mp3`

---

## 📚 Full Documentation

See `TESTIMONIALS_DOCUMENTATION.md` for complete API reference, customization guide, and best practices.

---

**Status:** ✅ Fully functional with mock data  
**Production:** 🔄 Connect Sanity CMS to manage content  
