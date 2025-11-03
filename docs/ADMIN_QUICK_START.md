# 🎉 Admin Dashboard - Quick Start

## ✅ Environment Variables Configured

Your `.env.local` file now includes:

```bash
✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
✅ CLERK_SECRET_KEY
✅ SANITY_API_WRITE_TOKEN
✅ Sanity configuration (existing)
```

## 🚀 Server Running

Your dev server is running at: **http://localhost:3000**

## 📋 Next Steps

### 1. **Set Up Your First Admin User** (Required!)

1. Go to: **https://dashboard.clerk.com**
2. Sign in with your Clerk account
3. Go to **Users** section
4. Click on your user
5. Click **Metadata** tab
6. Under **Public metadata**, click **Edit**
7. Add this JSON:
   ```json
   {
     "role": "admin"
   }
   ```
8. Click **Save**

### 2. **Sign In to Admin Dashboard**

1. Go to: **http://localhost:3000/sign-in**
2. Sign in with your Clerk account
3. You'll be redirected to: **http://localhost:3000/admin**

### 3. **Add Test Data via Sanity Studio**

1. Go to: **http://localhost:3000/studio**
2. Create some **Destinations**:
   - Name: France, Code: fr, Flag: 🇫🇷, Active: true
   - Name: Canada, Code: ca, Flag: 🇨🇦, Active: true
   - Name: Belgique, Code: be, Flag: 🇧🇪, Active: true
3. Create a **Team Member**:
   - Clerk User ID: (your Clerk user ID from dashboard)
   - Name: Your name
   - Email: Your email
   - Role: admin
   - Active: true
4. Create some test **Leads**:
   - Fill in name, email, destination
   - Status: new
   - Assigned to: unassigned

### 4. **Explore the Dashboard**

Once you have test data:

#### **Overview** (`/admin`)
- View KPI cards (total leads, new leads, meetings, conversions)
- See top destinations bar chart

#### **Leads** (`/admin/leads`)
- Search leads by name or email
- Filter by status (new, contacted, meeting, converted, lost)
- Filter by team (unassigned, cm, fr)
- Click ⋮ (three dots) to:
  - Change status
  - Assign to team

#### **Documents** (`/admin/documents`)
- View uploaded documents
- Approve or reject documents
- Add rejection reasons

#### **Settings** (`/admin/settings`)
- View destinations configuration
- View team members

#### **Appointments** (`/admin/appointments`)
- Placeholder for Cal.com integration

## 🔐 User Roles

Set in Clerk's public metadata: `{ "role": "admin" }`

| Role | Access Level | Can Do |
|------|--------------|--------|
| **admin** | Full access | Everything: manage leads, documents, settings, delete items |
| **cm** | Commercial Manager | Manage leads, assign leads, view reports |
| **fr** | Équipe France | Manage documents, verify documents, view reports |

## 🎨 Admin Dashboard Features

### Pages Created (5)
- ✅ Overview with KPIs & chart
- ✅ Leads management with filters
- ✅ Appointments (placeholder)
- ✅ Documents verification
- ✅ Settings

### Components Created (9)
- ✅ AdminSidebar (responsive)
- ✅ AdminTopbar (user menu)
- ✅ KPICard (stats)
- ✅ TopDestinationsChart
- ✅ LeadsTable (searchable)
- ✅ LeadRow (with actions)
- ✅ DocumentsList
- ✅ RoleGuard
- ✅ Layout wrapper

### Server Actions (18)
- Lead: create, update, assign, delete, add note, set meeting, convert
- Document: verify, reject, needs correction, add note, delete

### Sanity Schemas (4)
- lead (18 fields)
- studentDocument (17 fields)
- destination (11 fields)
- teamMember (14 fields)

## 🔧 Troubleshooting

### "Unauthorized" Error
**Problem:** Can't access `/admin`
**Solution:** 
1. Make sure you're signed in at `/sign-in`
2. Check that your user has `{ "role": "admin" }` in Clerk's public metadata
3. Clear browser cookies and sign in again

### Dashboard is Empty
**Problem:** No data showing in overview/leads
**Solution:**
1. Go to `/studio` (Sanity Studio)
2. Create destinations and leads
3. Refresh the admin dashboard

### Charts Not Showing
**Problem:** "Top Destinations" chart is empty
**Solution:**
1. Make sure leads have a `destination` field populated
2. Make sure destinations exist in Sanity with matching codes
3. Refresh the page

### Can't Update Leads
**Problem:** "Failed to update lead" error
**Solution:**
1. Check that `SANITY_API_WRITE_TOKEN` is set in `.env.local`
2. Verify the token has **Editor** permissions in Sanity
3. Check the terminal for error messages

## 📱 Mobile Responsive

The dashboard works on all devices:
- **Desktop:** Sidebar always visible
- **Tablet/Mobile:** Collapsible hamburger menu
- All buttons are touch-friendly

## 🎯 Testing Checklist

- [ ] Sign in at `/sign-in`
- [ ] Access `/admin` successfully
- [ ] See your role badge in top bar
- [ ] View overview KPIs (may be 0 if no data)
- [ ] Create a test lead in Sanity Studio
- [ ] See the lead in `/admin/leads`
- [ ] Change lead status via dropdown
- [ ] Assign lead to a team
- [ ] Search for lead by name
- [ ] Filter leads by status
- [ ] View settings page
- [ ] Check mobile menu works on small screen

## 📚 Full Documentation

See `docs/ADMIN_DASHBOARD_SETUP.md` for:
- Complete setup guide
- Permissions matrix
- Customization tips
- Cal.com integration guide
- File upload setup
- Email notifications setup

## 🆘 Need Help?

1. **Clerk Issues:** [clerk.com/docs](https://clerk.com/docs)
2. **Sanity Issues:** [sanity.io/docs](https://www.sanity.io/docs)
3. **Next.js Issues:** [nextjs.org/docs](https://nextjs.org/docs)

---

## 🎉 You're All Set!

Your admin dashboard is now fully configured and ready to use!

**Access it at:** http://localhost:3000/admin

**Remember:** Set up your admin role in Clerk before accessing the dashboard!
