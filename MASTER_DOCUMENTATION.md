# 📚 OSIMX Master Documentation

**Last Updated:** October 8, 2025  
**Project:** OSIMX - Study Abroad Platform  
**Version:** 3.0 (Enhanced Edition)

---

## 📖 Table of Contents

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Tech Stack](#tech-stack)
4. [Key Features](#key-features)
5. [Design System](#design-system)
6. [Component Architecture](#component-architecture)
7. [Development Guide](#development-guide)
8. [Deployment](#deployment)
9. [Essential References](#essential-references)

---

## 🚀 Quick Start

### Installation
```bash
npm install
npm run dev
```
Server runs on `http://localhost:3000`

### Build & Deploy
```bash
npm run build
npm start
```

### Essential Commands
- `npm run lint` - Run ESLint
- `npm run build` - Production build
- `npx tsc --noEmit` - Type checking

---

## 🎯 Project Overview

**OSIMX** is a premium study abroad platform connecting Moroccan students with international universities. Built with Next.js 15, React 19, and TailwindCSS 4.

### Core Objectives
- Provide comprehensive information about study destinations
- Offer personalized AI-powered advisory services
- Streamline application and payment processes
- Build trust through testimonials and success stories

### Target Audience
- Moroccan students (18-30 years)
- Parents researching study options
- Educational consultants

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 15.5.4 (App Router)
- **React:** 19.0.0 (with Server Components)
- **TypeScript:** 5.x
- **Styling:** TailwindCSS 4.1.6

### UI & Animations
- **Component Library:** Radix UI primitives
- **Animations:** Framer Motion 12.23.22
- **Icons:** Lucide React 0.509.0
- **Fonts:** Poppins (headings) + Inter (body)

### Forms & Validation
- **Forms:** React Hook Form 7.56.3
- **Validation:** Zod 3.24.4
- **Resolvers:** @hookform/resolvers 5.0.1

### Additional Tools
- **SEO:** next-seo 6.8.0
- **Themes:** next-themes 0.4.6
- **Carousels:** Embla Carousel 8.6.0
- **Charts:** Recharts 2.15.3
- **PDF Generation:** jsPDF 3.0.3

---

## ✨ Key Features

### 1. **AI-Powered Advisory**
- Intelligent chatbot for personalized guidance
- Context-aware recommendations
- Multi-language support (French/English)

### 2. **Premium Design System**
- Gradient-based color palette
- Smooth animations with Framer Motion
- Responsive layouts (mobile-first)
- Dark mode support

### 3. **Interactive Destinations**
- Country-specific landing pages
- University databases
- Cost calculators
- Visa requirement information

### 4. **Lead Management**
- Admin dashboard for lead tracking
- Application status workflows
- Payment processing integration
- Document management

### 5. **Performance Optimized**
- Image optimization with Next.js
- Code splitting & lazy loading
- Server-side rendering (SSR)
- Static generation where possible

---

## 🎨 Design System

### Color Palette

#### Primary Colors
```css
--blue-500: #3B82F6      /* Primary actions */
--blue-600: #2563EB      /* Hover states */
--purple-500: #A855F7    /* Accents */
--orange-500: #F97316    /* CTAs */
```

#### Gradients
```css
/* Primary Gradient */
background: linear-gradient(135deg, #3B82F6 0%, #A855F7 50%, #F97316 100%)

/* Subtle Gradient */
background: linear-gradient(to bottom, #1e3a8a 0%, #7e22ce 100%)
```

#### Neutral Colors
- Background: `#0f172a` (dark) / `#ffffff` (light)
- Text Primary: `#f8fafc` (dark) / `#1e293b` (light)
- Text Secondary: `#94a3b8`
- Borders: `#334155`

### Typography
- **Headings:** Poppins (600-700 weight)
- **Body:** Inter (400-500 weight)
- **Base Size:** 16px
- **Scale:** 1.25 (Major Third)

### Spacing
- Base unit: 4px (0.25rem)
- Container max-width: 1280px
- Section padding: 6rem (mobile) / 12rem (desktop)

### Animations
```typescript
// Framer Motion Variants
fadeIn: {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
}

slideUp: {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

staggerChildren: {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

---

## 🏗 Component Architecture

### Layout Components
- **EnhancedNavigation** - Premium navbar with scroll progress
- **EnhancedFooter** - Animated footer with newsletter
- **WhatsAppWidget** - Floating WhatsApp button
- **FloatingCTA** - Scroll-triggered call-to-action

### Section Components
- **EnhancedHeroSection** - Homepage hero with gradient effects
- **AnimatedStatsSection** - Animated statistics
- **InteractiveDestinations** - Interactive country cards
- **TestimonialsCarousel** - Student testimonials
- **FAQSection** - Accordion-based FAQ
- **ResourcesSection** - Blog/resource grid
- **FinalCTASection** - Bottom call-to-action

### UI Components (Radix-based)
Located in `src/components/ui/`:
- Accordion, Alert, Button, Card, Dialog
- Dropdown, Form, Input, Select, Tabs
- Tooltip, Toast (Sonner), Progress
- See full list in `src/components/ui/`

### Widget Components
- **AssistantWidget** - AI chat interface
- **WhatsAppFloat** - WhatsApp integration
- **FloatingCTA** - Smart CTA display

---

## 👨‍💻 Development Guide

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Homepage
│   ├── layout.tsx      # Root layout
│   ├── about/          # About page
│   ├── contact/        # Contact page
│   ├── destinations/   # Country pages
│   ├── admin/          # Admin dashboard
│   └── api/            # API routes
├── components/
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   ├── ui/             # Reusable UI components
│   └── widgets/        # Interactive widgets
├── lib/                # Utilities & helpers
│   ├── utils.ts        # Utility functions
│   ├── ai.ts           # AI configuration
│   └── knowledge.ts    # Knowledge base
└── hooks/              # Custom React hooks
```

### Coding Standards

#### TypeScript
- Use strict mode
- Prefer interfaces over types for objects
- Use type inference where possible
- Avoid `any` type

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ Avoid
type ButtonProps = {
  label: any;
  onClick: any;
}
```

#### React Components
- Use Server Components by default
- Add `"use client"` only when needed
- Prefer functional components
- Use composition over inheritance

```typescript
// Server Component (default)
export default function Page() {
  return <div>Content</div>
}

// Client Component (when needed)
"use client"
import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

#### CSS & Styling
- Use TailwindCSS utility classes
- Create custom components for repeated patterns
- Use CSS variables for theme colors
- Mobile-first responsive design

```tsx
// ✅ Good
<button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full">
  Click me
</button>

// ❌ Avoid inline styles
<button style={{ padding: '12px 24px', background: '#3B82F6' }}>
  Click me
</button>
```

### Best Practices

1. **Performance**
   - Use `next/image` for images
   - Implement lazy loading for heavy components
   - Minimize client-side JavaScript
   - Use Server Components when possible

2. **SEO**
   - Add metadata to all pages
   - Use semantic HTML
   - Implement proper heading hierarchy
   - Add alt text to images

3. **Accessibility**
   - Use ARIA labels where needed
   - Ensure keyboard navigation works
   - Maintain color contrast ratios
   - Test with screen readers

4. **State Management**
   - Use React Context for global state
   - Keep state as local as possible
   - Use URL state for shareable data
   - Avoid unnecessary re-renders

---

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=https://osimx.com
NEXT_PUBLIC_API_URL=https://api.osimx.com
DATABASE_URL=your_database_url
```

### Performance Checklist
- ✅ Enable image optimization
- ✅ Configure caching headers
- ✅ Enable gzip compression
- ✅ Use CDN for static assets
- ✅ Implement analytics
- ✅ Set up error tracking

---

## 📚 Essential References

### Internal Documentation
- **README.md** - Project overview and setup
- **TODO.md** - Current tasks and roadmap
- **QUICK_REFERENCE.md** - Quick command reference
- **QUICK_START.md** - Detailed setup guide
- **PRODUCTION_SETUP.md** - Production deployment guide

### Key Files to Know
- `src/app/layout.tsx` - Root layout (navigation, footer)
- `src/app/page.tsx` - Homepage
- `src/components/layout/EnhancedNavigation.tsx` - Main navbar
- `src/components/layout/EnhancedFooter.tsx` - Site footer
- `tailwind.config.ts` - TailwindCSS configuration
- `next.config.ts` - Next.js configuration

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Radix UI Documentation](https://www.radix-ui.com)

### Design References
- **VISUAL_OVERVIEW_V3.md** - Complete visual guide (28KB)
- **LANDING_V3_DOCUMENTATION.md** - Landing page specs (17KB)
- **HOMEPAGE_TRANSFORMATION_GUIDE.md** - Design evolution (20KB)
- **FONTS_CONFIG.md** - Typography system (7.6KB)

### Migration Guides
- **MIGRATION_V1_TO_V3_COMPLETE.md** - Version migration guide
- **COLOR_COMPARISON_V1_V3.md** - Color system changes

---

## 🆘 Common Issues & Solutions

### Build Errors
**Issue:** TypeScript errors during build  
**Solution:** Run `npx tsc --noEmit` to identify type errors

**Issue:** Module not found  
**Solution:** Clear cache with `rm -rf .next && npm run build`

### Styling Issues
**Issue:** Styles not applying  
**Solution:** Check TailwindCSS class names, rebuild with `npm run dev`

**Issue:** Dark mode not working  
**Solution:** Verify `next-themes` provider in layout.tsx

### Performance Issues
**Issue:** Slow page loads  
**Solution:** Check image optimization, implement lazy loading

**Issue:** High bundle size  
**Solution:** Use dynamic imports for heavy components

---

## 📞 Support & Contact

- **Project Lead:** Development Team
- **Repository:** GitHub - osimx
- **Documentation:** This file + related docs
- **Last Cleanup:** October 8, 2025

---

**Note:** This is a living document. Update it as the project evolves.
