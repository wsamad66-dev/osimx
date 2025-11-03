# 🎯 Admin Dashboard Implementation Guide

## Overview
Complete admin dashboard for L'Étudiant Étranger with:
- ✅ Clerk authentication (admin, cm, fr roles)
- ✅ Sanity CMS backend
- ✅ shadcn/ui components
- ✅ Next.js 15 App Router
- ✅ Responsive design

---

## 📦 Step 1: Install Dependencies

```bash
# Install Clerk
npm install @clerk/nextjs

# Install Recharts (already installed - verify)
npm install recharts

# Install date-fns for date manipulation (already installed - verify)
npm install date-fns
```

---

## 🔐 Step 2: Setup Clerk

### 2.1 Get Clerk Keys

1. Go to [clerk.com](https://clerk.com) and create account
2. Create new application
3. Get your keys from dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

### 2.2 Add to `.env.local`

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxx

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# Sanity Write Token (create in Sanity dashboard)
SANITY_API_WRITE_TOKEN=sk

xxxxxx
```

### 2.3 Configure Clerk Roles

In Clerk Dashboard:
1. Go to "User & Authentication" → "Metadata"
2. Add to `publicMetadata` schema:
```json
{
  "role": "admin" | "cm" | "fr"
}
```

3. Manually assign roles to users via Clerk dashboard

---

## 📁 File Structure

```
src/
├── app/
│   ├── (main)/          # Public site
│   ├── (admin)/         # Admin dashboard
│   │   ├── layout.tsx   # Admin layout with sidebar
│   │   └── admin/
│   │       ├── page.tsx              # Overview
│   │       ├── leads/
│   │       │   └── page.tsx
│   │       ├── appointments/
│   │       │   └── page.tsx
│   │       ├── documents/
│   │       │   └── page.tsx
│   │       └── settings/
│   │           └── page.tsx
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx
│   └── middleware.ts
├── components/
│   └── admin/
│       ├── layout/
│       │   ├── AdminSidebar.tsx
│       │   ├── AdminTopbar.tsx
│       │   └── AdminLayout.tsx
│       ├── dashboard/
│       │   ├── KPICard.tsx
│       │   └── TopDestinationsChart.tsx
│       ├── leads/
│       │   ├── LeadsDataTable.tsx
│       │   └── LeadActions.tsx
│       ├── shared/
│       │   ├── RoleGuard.tsx
│       │   └── DataTable.tsx
│       └── ui/
│           └── ... (shadcn components)
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   └── writeClient.ts
│   └── clerk/
│       └── roles.ts
├── actions/
│   └── admin/
│       ├── leads.ts
│       ├── documents.ts
│       └── settings.ts
└── sanity/
    └── schemas/
        ├── admin/
        │   ├── lead.ts
        │   ├── studentDocument.ts
        │   ├── destination.ts
        │   └── team.ts
        └── index.ts
```

---

## 🚀 Implementation Priority

This is a LARGE implementation (50+ files). I recommend:

### Option A: Phased Implementation (Recommended)
1. **Phase 1** (Day 1): Authentication + Layout + Overview
2. **Phase 2** (Day 2): Leads Management + Sanity Integration
3. **Phase 3** (Day 3): Documents + Appointments + Settings

### Option B: Starter Kit
I'll create a **minimal working version** with:
- ✅ Clerk auth + middleware
- ✅ Basic admin layout
- ✅ Overview page with KPIs
- ✅ Leads page (table + actions)
- ✅ Sanity schemas
- ✅ Core components

Then you can extend it.

### Option C: Full Implementation
I'll generate all 50+ files right now (will take multiple iterations).

---

## 🎯 Recommended Approach

**Let's build the STARTER KIT first** (Option B), which includes:

1. ✅ Clerk authentication middleware
2. ✅ Admin layout with sidebar
3. ✅ Overview page with KPIs
4. ✅ Leads management page
5. ✅ Sanity schemas (lead, studentDocument)
6. ✅ Core reusable components
7. ✅ Server actions for CRUD

This gives you a **working admin dashboard** that you can:
- Test immediately
- Extend gradually
- Customize to your needs

---

## 📝 Next Steps

**Should I proceed with:**

1. **Starter Kit** (15-20 key files, fully working)
   - Fastest to production
   - All core features
   - Easy to extend

2. **Full Implementation** (50+ files, complete system)
   - Every feature built
   - More time required
   - Copy-paste ready

3. **Custom Request** (Tell me what to prioritize)

**Please confirm and I'll start building!** 🚀

---

## 📚 What's Included in Starter Kit

### Authentication
- Clerk middleware protecting `/admin`
- Role-based access (admin, cm, fr)
- Sign-in/Sign-up pages
- User avatar in topbar

### Layout
- Responsive sidebar navigation
- Topbar with user info
- Mobile-friendly menu
- Clean design

### Overview Page
- 4 KPI cards (total leads, new 7d, meetings 7d, converted 30d)
- Bar chart showing top destinations (Recharts)
- Real data from Sanity

### Leads Management
- Data table with search
- Filter by status (new, contacted, meeting, converted, lost)
- Filter by team (cm, fr)
- Row actions (update status, assign team)
- Server actions to update Sanity

### Sanity Schemas
- `lead` - Full lead management schema
- `studentDocument` - Document verification schema
- `destination` - Destination configuration
- `team` - Team routing

### Components
- `KPICard` - Reusable KPI display
- `TopDestinationsChart` - Recharts bar chart
- `DataTable` - Reusable table component
- `RoleGuard` - Hide/show based on role
- `AdminSidebar` - Navigation
- `AdminTopbar` - Header with user

### Server Actions
- `updateLeadStatus()`
- `assignLeadToTeam()`
- `verifyDocument()`
- All with Sanity write client

---

**Ready when you are!** 🎯
