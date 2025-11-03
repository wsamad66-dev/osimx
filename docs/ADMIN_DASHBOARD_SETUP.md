# Admin Dashboard - Setup Guide

## ✅ Installation Complete

Your admin dashboard has been successfully created with all core features!

## 📦 What's Included

### Authentication & Authorization
- ✅ Clerk authentication with role-based access
- ✅ Middleware protection for `/admin` routes
- ✅ Three roles: `admin`, `cm`, `fr`
- ✅ Sign-in and sign-up pages
- ✅ Unauthorized access page
- ✅ Role utilities with permission system

### Sanity Schemas
- ✅ `lead` - Complete CRM lead management
- ✅ `studentDocument` - Document verification system
- ✅ `destination` - Destination configuration
- ✅ `teamMember` - Team management

### Admin Pages
- ✅ **Overview** (`/admin`) - KPI cards and top destinations chart
- ✅ **Leads** (`/admin/leads`) - Full CRUD with filters, search, and actions
- ✅ **Appointments** (`/admin/appointments`) - Placeholder for Cal.com integration
- ✅ **Documents** (`/admin/documents`) - Document verification workflow
- ✅ **Settings** (`/admin/settings`) - Destinations and team configuration

### Components
- ✅ `AdminSidebar` - Collapsible navigation
- ✅ `AdminTopbar` - User menu and role badge
- ✅ `KPICard` - Reusable stat cards
- ✅ `TopDestinationsChart` - Recharts bar chart
- ✅ `LeadsTable` - Data table with filters
- ✅ `LeadRow` - Row actions (status, assignment)
- ✅ `DocumentsList` - Document verification UI
- ✅ `RoleGuard` - Hide/show content by role

### Server Actions
- ✅ Lead mutations (create, update, assign, convert, delete)
- ✅ Document mutations (verify, reject, needs correction)
- ✅ Auto-revalidation after mutations

### Queries
- ✅ Overview statistics with trend calculations
- ✅ Leads with filters (status, team, destination, search)
- ✅ Documents with lead references
- ✅ Destinations and team members

## 🚀 Setup Steps

### 1. Environment Variables

Add these to your `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Sanity Write Token (required for mutations)
SANITY_API_WRITE_TOKEN=your_write_token_here

# Existing Sanity variables (already configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SANITY_API_VERSION=...
```

### 2. Clerk Setup

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy the API keys to `.env.local`
4. **Configure user roles:**
   - Go to your Clerk dashboard → Users
   - Click on a user → Metadata
   - Add to `publicMetadata`:
     ```json
     {
       "role": "admin"
     }
     ```
   - Available roles: `admin`, `cm`, `fr`

### 3. Sanity Write Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a new token with **Editor** permissions
5. Copy the token to `SANITY_API_WRITE_TOKEN` in `.env.local`

### 4. Create Sanity Studio Structure (Optional)

Add this to `sanity/structure.ts` for better organization:

```typescript
import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Admin section
      S.listItem()
        .title('Admin')
        .child(
          S.list()
            .title('Admin')
            .items([
              S.documentTypeListItem('lead').title('Leads'),
              S.documentTypeListItem('studentDocument').title('Documents'),
              S.documentTypeListItem('destination').title('Destinations'),
              S.documentTypeListItem('teamMember').title('Team'),
            ])
        ),
      
      S.divider(),
      
      // Rest of your content...
      ...S.documentTypeListItems().filter(
        (item) =>
          !['lead', 'studentDocument', 'destination', 'teamMember'].includes(
            item.getId() || ''
          )
      ),
    ])
```

### 5. Restart Development Server

```bash
npm run dev
```

## 🎯 Testing the Dashboard

### 1. Sign In
- Navigate to `http://localhost:3000/sign-in`
- Sign in with your Clerk account
- Make sure you have a role assigned in Clerk metadata

### 2. Add Test Data in Sanity Studio
- Go to `http://localhost:3000/studio`
- Create a few destinations (france, canada, etc.)
- Create a team member with your Clerk user ID
- Create some test leads

### 3. Explore Admin Pages
- **Overview**: See KPIs and chart (empty until you have leads)
- **Leads**: Search, filter, change status, assign to team
- **Documents**: Approve/reject documents (need to upload via Sanity first)
- **Settings**: View destinations and team

## 🔐 Permissions Matrix

| Feature | Admin | CM | FR |
|---------|-------|----|----|
| View Overview | ✅ | ✅ | ✅ |
| View Leads | ✅ | ✅ | ✅ |
| Update Lead Status | ✅ | ✅ | ✅ |
| Assign Leads | ✅ | ✅ | ❌ |
| Delete Leads | ✅ | ❌ | ❌ |
| View Documents | ✅ | ✅ | ✅ |
| Verify Documents | ✅ | ❌ | ✅ |
| Manage Settings | ✅ | ❌ | ❌ |

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop (lg+)**: Sidebar always visible
- **Tablet/Mobile**: Collapsible sidebar with hamburger menu
- **All screens**: Touch-friendly buttons and optimized layouts

## 🎨 Customization

### Colors
Role badge colors are defined in `src/lib/clerk/roles.ts`:
```typescript
export const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-purple-100 text-purple-800',
  cm: 'bg-blue-100 text-blue-800',
  fr: 'bg-green-100 text-green-800',
}
```

### Navigation
Edit `src/components/admin/AdminSidebar.tsx` to add/remove menu items:
```typescript
const navigation = [
  { name: 'Vue d\'ensemble', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  // Add more items...
]
```

## 🚧 Next Steps (Optional Enhancements)

### Cal.com Integration
1. Create `appointment` schema in Sanity
2. Create `/app/api/webhooks/cal/route.ts`
3. Configure webhook in Cal.com dashboard
4. Update appointments page to display data

### File Upload
1. Add file upload to lead/document forms
2. Use Sanity asset upload or external storage (S3, Cloudinary)
3. Link uploaded files to `studentDocument` schema

### Email Notifications
1. Install email service (Resend, SendGrid)
2. Send notifications on lead status changes
3. Notify team members on assignment

### Analytics
1. Add date range filters to overview
2. Create more detailed charts (conversion funnel, lead sources)
3. Export data to CSV/Excel

### Advanced Filtering
1. Add multi-select filters
2. Save filter presets
3. Add sorting to all columns

## 🆘 Troubleshooting

### "Unauthorized" error
- Check that your Clerk user has a `role` in `publicMetadata`
- Verify middleware is not blocking the route
- Check browser console for auth errors

### "Failed to update lead"
- Verify `SANITY_API_WRITE_TOKEN` is set correctly
- Check token has **Editor** permissions in Sanity
- Look for errors in terminal/console

### Charts not showing
- Make sure you have leads with `destination` field populated
- Check that destinations exist in Sanity
- Verify Recharts is installed: `npm list recharts`

### Sidebar not working on mobile
- Clear browser cache
- Check that `lg:pl-64` class is on layout
- Verify Tailwind CSS is processing the file

## 📚 File Structure

```
src/
├── app/
│   ├── (admin)/admin/
│   │   ├── layout.tsx          # Admin wrapper
│   │   ├── page.tsx            # Overview with KPIs
│   │   ├── leads/page.tsx      # Leads management
│   │   ├── appointments/page.tsx
│   │   ├── documents/page.tsx  # Document verification
│   │   └── settings/page.tsx   # Configuration
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   └── sign-up/page.tsx
│   ├── unauthorized/page.tsx
│   └── actions/
│       ├── leads.ts            # Lead mutations
│       └── documents.ts        # Document mutations
├── components/admin/
│   ├── AdminSidebar.tsx
│   ├── AdminTopbar.tsx
│   ├── KPICard.tsx
│   ├── TopDestinationsChart.tsx
│   ├── LeadsTable.tsx
│   ├── LeadRow.tsx
│   ├── DocumentsList.tsx
│   └── RoleGuard.tsx
├── lib/
│   ├── clerk/roles.ts          # Role utilities
│   └── sanity/
│       ├── writeClient.ts      # Write operations
│       └── queries/admin.ts    # Read queries
└── middleware.ts               # Route protection

sanity/schemas/admin/
├── lead.ts                     # Lead schema
├── studentDocument.ts          # Document schema
├── destination.ts              # Destination config
└── team.ts                     # Team members
```

## ✨ Success!

Your admin dashboard is production-ready! 🎉

Access it at: `http://localhost:3000/admin`

For questions or issues, check the Clerk and Sanity documentation:
- [Clerk Docs](https://clerk.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
