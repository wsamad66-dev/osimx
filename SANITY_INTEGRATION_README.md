# 🎓 OSIM Student Registration System

> **Advanced student registration system with Sanity CMS integration, multi-step forms, and secure document uploads**

Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

---

## ✨ Features

### 🎨 Dynamic Hero Section
- **Content Management**: Edit hero content via Sanity Studio (no code changes)
- **Responsive Design**: Desktop split layout, mobile stacked
- **Animations**: Smooth Framer Motion transitions
- **Visual Appeal**: Gradient backgrounds with brand colors

### 📝 Multi-Step Registration
- **4-Step Process**: Personal Info → Academic → Documents → Security
- **Real-time Validation**: Zod schemas with instant feedback
- **Progress Tracking**: Visual progress indicator
- **Keyboard Navigation**: Full Tab/Enter/Escape support

### 📤 Secure Document Upload
- **Drag & Drop**: Intuitive file upload interface
- **File Validation**: Type checking (PDF, JPG, PNG), size limits
- **Sanity Assets**: Files stored securely (no AWS/Cloudinary needed)
- **Progress Tracking**: Real-time upload progress

### 🔒 Security & Accessibility
- **WCAG AA Compliant**: Screen reader support, keyboard navigation
- **Server-side Validation**: Zod schemas on API routes
- **Encrypted Storage**: Sanity handles encryption and security
- **Rate Limiting**: Prevents abuse (TODO: Phase 7)

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Sanity account (free tier available)

### 1. Clone & Install

```bash
git clone <repository-url>
cd osimx
npm install
```

### 2. Configure Sanity CMS

Follow the [Sanity Setup Guide](./docs/SANITY_SETUP_GUIDE.md) to:

1. Create a Sanity project
2. Copy `.env.local.example` to `.env.local`
3. Add your Sanity credentials
4. Deploy schemas to Sanity
5. Seed initial hero content

**Quick Setup**:
```bash
# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your Sanity credentials
# Get them from: https://www.sanity.io/manage

# Deploy schemas
npx sanity deploy

# Seed hero content
npm run seed:hero

# Test connection
npm run test:sanity
```

### 3. Run Development Server

```bash
npm run dev
```

Open:
- **App**: [http://localhost:3000](http://localhost:3000)
- **Sanity Studio**: [http://localhost:3000/studio](http://localhost:3000/studio)

---

## 📁 Project Structure

```
osimx/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── api/                    # API routes
│   │   │   ├── register-student/   # Registration endpoint (Phase 5)
│   │   │   └── upload/             # File upload endpoint (Phase 4)
│   │   ├── studio/                 # Sanity Studio route
│   │   └── page.tsx                # Homepage
│   ├── components/
│   │   ├── registration/           # Registration components (Phase 3)
│   │   ├── sections/               # Page sections
│   │   │   └── HeroSectionV2.tsx   # Sanity-powered hero (Phase 2)
│   │   └── ui/                     # Radix UI components
│   ├── hooks/
│   │   └── useSanityUpload.ts      # Upload hook (Phase 4)
│   └── lib/
│       ├── sanity.client.ts        # Sanity client configuration
│       └── schemas/                # Zod validation schemas
├── sanity/
│   ├── schemas/
│   │   ├── hero.ts                 # Hero content schema
│   │   ├── student.ts              # Student data schema
│   │   ├── studentDocument.ts      # Document metadata schema
│   │   └── index.ts                # Schema exports
│   ├── sanity.config.ts            # Sanity Studio config
│   └── sanity.cli.ts               # Sanity CLI config
├── scripts/
│   ├── seed-hero.ts                # Seed initial hero content
│   └── test-sanity.ts              # Test Sanity connection
├── docs/
│   ├── SANITY_SETUP_GUIDE.md       # Detailed setup walkthrough
│   ├── SANITY_QUICK_REFERENCE.md   # Commands & queries cheat sheet
│   └── PHASE_1_COMPLETE.md         # Phase 1 completion summary
├── .env.local.example              # Environment variables template
└── package.json                    # Dependencies & scripts
```

---

## 🛠️ Tech Stack

### Core
- **Next.js 15.5.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4.1.6** - Utility-first CSS
- **Framer Motion 12.23.22** - Animation library
- **Radix UI** - Accessible component primitives

### CMS & Backend
- **Sanity CMS** - Content management & file storage
- **next-sanity** - Next.js integration
- **@sanity/client** - API client
- **@sanity/assets** - File upload/download

### Validation & Forms
- **Zod 3.24.4** - Schema validation
- **React Hook Form 7.56.3** - Form management
- **@hookform/resolvers** - Zod integration

---

## 📊 Development Roadmap

### ✅ Phase 0: Project Setup (Complete)
- Dependencies installed
- Next.js 15 configured
- TypeScript, Tailwind, Framer Motion ready

### ✅ Phase 1: Sanity Integration (Complete)
- Sanity CMS setup
- 3 schemas created (hero, student, studentDocument)
- Typed clients configured
- Seed & test scripts
- Documentation written

**See**: [docs/PHASE_1_COMPLETE.md](./docs/PHASE_1_COMPLETE.md)

### 🚧 Phase 2: Hero Section UI (In Progress)
- [ ] Fetch hero content via GROQ
- [ ] Build HeroSectionV2 component
- [ ] Framer Motion animations
- [ ] Gradient backgrounds
- [ ] CTA buttons

**Target**: Visually stunning hero section

### ⏳ Phase 3: Registration Modal (Pending)
- [ ] 4-step form with validation
- [ ] Progress indicator
- [ ] Keyboard navigation
- [ ] Focus management

**Target**: Intuitive registration flow

### ⏳ Phase 4: Upload Integration (Pending)
- [ ] /api/upload endpoint
- [ ] useSanityUpload hook
- [ ] File validation
- [ ] Progress tracking

**Target**: Secure file uploads to Sanity

### ⏳ Phase 5: Registration API (Pending)
- [ ] /api/register-student endpoint
- [ ] Zod validation
- [ ] Create student documents
- [ ] Error handling

**Target**: Complete registration backend

### ⏳ Phase 6: UX Polish (Pending)
- [ ] Password strength meter
- [ ] ARIA labels
- [ ] Success animations
- [ ] Loading states
- [ ] Screen reader testing

**Target**: WCAG AA compliant

### ⏳ Phase 7: Production Hardening (Pending)
- [ ] Type checks
- [ ] Linting
- [ ] Rate limiting
- [ ] Security audit
- [ ] Performance optimization

**Target**: Production-ready deployment

---

## 🎨 Brand Colors

```css
--blue: #26a5de;    /* Primary */
--navy: #232d6e;    /* Secondary */
--orange: #f29100;  /* Accent */
--white: #ffffff;   /* Background */
```

---

## 📜 Available Scripts

```bash
# Development
npm run dev                 # Start Next.js dev server (port 3000)
npm run build               # Build for production
npm run start               # Start production server

# Sanity CMS
npm run sanity              # Run Sanity Studio locally
npm run sanity:deploy       # Deploy Studio to production
npm run seed:hero           # Seed initial hero content
npm run test:sanity         # Test Sanity connection

# Code Quality
npm run lint                # Run ESLint
npx tsc --noEmit           # Type check (no build)
```

---

## 🔑 Environment Variables

Required environment variables (see `.env.local.example`):

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

**How to get these**:
1. Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
2. Create a project or select existing
3. Copy Project ID
4. Generate API Token (Settings → API → Tokens → Editor permissions)

See [docs/SANITY_SETUP_GUIDE.md](./docs/SANITY_SETUP_GUIDE.md) for detailed instructions.

---

## 📚 Documentation

### Setup & Configuration
- [Sanity Setup Guide](./docs/SANITY_SETUP_GUIDE.md) - Complete setup walkthrough
- [Sanity Quick Reference](./docs/SANITY_QUICK_REFERENCE.md) - Commands & query examples
- [Phase 1 Complete](./docs/PHASE_1_COMPLETE.md) - Phase 1 summary

### API Documentation
- [Sanity Schemas](./sanity/schemas/) - Data models
- [API Routes](./src/app/api/) - Backend endpoints (Phases 4-5)

---

## 🧪 Testing

### Test Sanity Connection

```bash
npm run test:sanity
```

Expected output:
```
✅ Configuration OK
✅ Connection OK
✅ Found 3 schema type(s): hero, student, studentDocument
```

### Manual Testing

1. **Hero Content**:
   - Open Sanity Studio: `/studio`
   - Edit hero document
   - Refresh homepage to see changes

2. **Registration Flow** (Phase 3+):
   - Click "Créer Mon Compte" on homepage
   - Complete 4-step form
   - Upload documents
   - Submit registration

3. **Admin Dashboard**:
   - Open Sanity Studio
   - View students under "Student" tab
   - Check uploaded documents
   - Update statuses

---

## 🐛 Troubleshooting

### "Project ID not configured"
**Solution**: Check `NEXT_PUBLIC_SANITY_PROJECT_ID` in `.env.local`

### "Cannot upload files"
**Solution**: Ensure `SANITY_API_TOKEN` has **Editor** permissions

### Studio not loading
**Solution**: 
1. Restart dev server: `npm run dev`
2. Clear browser cache
3. Check console for errors

### More issues?
See [Troubleshooting Guide](./docs/SANITY_SETUP_GUIDE.md#troubleshooting)

---

## 🔒 Security

- **Server-side Validation**: Zod schemas on all API routes
- **Token Management**: API tokens only in server-side code
- **File Validation**: Type, size, and content checks
- **Rate Limiting**: TODO (Phase 7)
- **Encryption**: Handled by Sanity CMS

**Never expose** `SANITY_API_TOKEN` in client-side code!

---

## 🚀 Deployment

### Deploy to Vercel

1. **Connect Repository**:
   ```bash
   vercel
   ```

2. **Add Environment Variables**:
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_TOKEN`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Deploy Sanity Studio

```bash
npm run sanity:deploy
```

Your Studio will be available at: `https://your-studio.sanity.studio`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Sanity CMS](https://www.sanity.io/) - Content platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Accessible components

---

## 📞 Support

For project-specific issues:
- Check [documentation](./docs/)
- Review [TODO.md](./TODO.md) for known issues

For Sanity-specific help:
- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Slack](https://slack.sanity.io)

---

**Built with ❤️ for international students**
