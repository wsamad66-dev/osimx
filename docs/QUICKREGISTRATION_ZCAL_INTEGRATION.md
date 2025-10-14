# QuickRegistrationModal + zcal Integration Guide

## 🎯 Overview

The `QuickRegistrationModal` component has been enhanced to integrate zcal appointment booking directly into the existing student registration flow. When a student submits the registration form, their information is saved as a lead in Sanity CMS, and they are immediately presented with a zcal booking modal to schedule a consultation.

## ✨ What Was Added

### 1. New Form Field
- **Country dropdown**: Optional field to capture the student's country of origin
- 12 countries available with flag emojis
- Fully integrated with react-hook-form validation

### 2. Dual Data Saving
- **Lead saved to Sanity**: Form data is sent to `/api/save-lead` endpoint
- **Student registration**: Original `/api/register-student` functionality maintained
- Both operations happen in parallel for data redundancy

### 3. zcal Booking Modal
- Appears automatically after successful form submission
- Full-screen modal with zcal iframe
- Branded header with calendar icon
- Close button to exit modal
- GA4 tracking for calendar load events

### 4. Google Analytics Tracking
- `appointment_form_submitted`: Fired when form is submitted successfully
- `appointment_calendar_loaded`: Fired when zcal iframe loads
- Includes country as event label for segmentation

## 🔧 Technical Implementation

### Form Schema Changes
```typescript
const quickRegistrationSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  country: z.string().optional(), // NEW FIELD
})
```

### Countries List
12 countries with values and flags:
- France 🇫🇷
- Canada 🇨🇦
- États-Unis 🇺🇸
- Royaume-Uni 🇬🇧
- Allemagne 🇩🇪
- Espagne 🇪🇸
- Italie 🇮🇹
- Belgique 🇧🇪
- Suisse 🇨🇭
- Maroc 🇲🇦
- Sénégal 🇸🇳
- Côte d'Ivoire 🇨🇮

### Form Submission Flow
```
1. User fills form (name, email, phone, country)
2. Form validation passes
3. POST to /api/save-lead (saves to Sanity)
4. POST to /api/register-student (creates student record)
5. GA4 tracking event fired
6. setShowZcalModal(true)
7. zcal modal appears with booking calendar
8. User selects appointment time
9. Booking confirmation (handled by zcal)
```

## 📋 Component Structure

### New State
```typescript
const [showZcalModal, setShowZcalModal] = useState(false)
```

### New Imports
```typescript
import { AnimatePresence } from 'framer-motion'
import { Calendar, Globe, X } from 'lucide-react'
```

### Modal Component
The zcal modal is rendered outside the main `DialogContent` to avoid z-index conflicts:
```tsx
<AnimatePresence>
  {showZcalModal && (
    <motion.div className="fixed inset-0 z-[100]">
      {/* Modal with zcal iframe */}
    </motion.div>
  )}
</AnimatePresence>
```

## 🎨 UI/UX Features

### Country Field
- **Icon**: Globe icon from lucide-react
- **Styling**: Matches existing form fields with rounded-xl borders
- **Placeholder**: "Sélectionnez votre pays"
- **Validation**: Optional field, no errors if left empty

### zcal Modal
- **Backdrop**: Black overlay with backdrop-blur
- **Animation**: Scale + fade transition with spring physics
- **Size**: max-w-2xl, max-h-[90vh]
- **Header**: Gradient background (blue to purple)
- **Content**: 600px height iframe with zcal calendar
- **Footer**: Help text with emoji icon

### Close Behavior
- Click backdrop → close modal + close registration modal
- Click X button → close modal + close registration modal
- Maintains clean exit flow

## 🔌 API Integration

### Save Lead Endpoint
```typescript
POST /api/save-lead
Body: {
  name: string
  email: string
  phone: string
  country: string
}
Response: {
  success: true
  leadId: string
}
```

### Register Student Endpoint (Original)
```typescript
POST /api/register-student
Body: {
  step1: { firstName, lastName, email, phone, ... }
  step2: { ... }
  step3: { ... }
  step4: { ... }
}
```

## 📊 Sanity CMS Data

### Lead Schema Fields
When form is submitted, the following data is saved to Sanity:

```typescript
{
  _type: 'lead',
  name: string,
  email: string,
  phone: string,
  country: string,
  status: 'pending', // Default status
  appointmentBooked: false, // Default
  createdAt: Date,
}
```

### Viewing Leads
Access leads in Sanity Studio:
1. Navigate to http://localhost:3000/studio
2. Click on "Leads" in the sidebar
3. View all submitted leads with status indicators
4. Filter by status: pending / contacted / converted / lost

## 🚀 Usage

The `QuickRegistrationModal` is already integrated throughout your site. No additional setup needed:

### Existing Usages
- Homepage hero section
- Navigation menu
- Footer sections
- Various CTA buttons

### How It Works
1. User clicks any "Inscription gratuite" or registration button
2. `QuickRegistrationModal` opens with form
3. User fills: name, email, phone, country (optional)
4. User clicks "Obtenir ma consultation gratuite"
5. Form submits → saves to Sanity + registers student
6. zcal modal appears automatically
7. User selects appointment time in calendar
8. Booking confirmed through zcal
9. User receives confirmation email from zcal

## 🎯 User Journey

```
Landing Page → Click CTA → Fill Form → Submit
       ↓
   Save to Sanity + Register Student
       ↓
   zcal Modal Appears
       ↓
   Select Appointment Time
       ↓
   Confirmation Email from zcal
       ↓
   Consultation Scheduled ✅
```

## 🔍 Testing Checklist

- [ ] Form opens when clicking registration CTAs
- [ ] All fields validate correctly (name, email, phone required)
- [ ] Country dropdown works and is optional
- [ ] Form submits without errors
- [ ] Lead is saved to Sanity (`/api/save-lead`)
- [ ] Student is registered (`/api/register-student`)
- [ ] zcal modal appears after submission
- [ ] zcal calendar loads correctly in iframe
- [ ] Can select appointment time in zcal
- [ ] Close modal with backdrop click works
- [ ] Close modal with X button works
- [ ] GA4 events fire correctly
- [ ] Mobile responsive on all screen sizes

## 🛠️ Configuration

### zcal URL
Currently set to: `https://zcal.co/letudiantetranger/consultation`

To change:
1. Open `src/components/registration/QuickRegistrationModal.tsx`
2. Find the iframe `src` attribute (line ~350)
3. Update to your zcal booking page URL

### GA4 Events
Currently tracking:
- `appointment_form_submitted` (on form submit)
- `appointment_calendar_loaded` (on zcal iframe load)

To modify:
1. Search for `gtag` in the file
2. Update event names or parameters as needed

### Countries List
To add/remove countries:
1. Find the `countries` array (line ~40)
2. Add/remove country objects: `{ value: 'XX', label: 'Name', flag: '🏴' }`
3. Use country code emoji flags

## 📝 Related Documentation

- [Appointment System Guide](./APPOINTMENT_SYSTEM_GUIDE.md) - Full appointment system overview
- [Appointment Quick Start](./APPOINTMENT_QUICK_START.md) - Getting started guide
- [Appointment Final Summary](./APPOINTMENT_FINAL_SUMMARY.md) - Complete implementation summary
- [Sanity Lead Schema](../sanity/schemas/lead.ts) - Lead data structure

## 🐛 Troubleshooting

### Modal doesn't appear after form submission
- Check browser console for API errors
- Verify `/api/save-lead` endpoint is working
- Check `showZcalModal` state is being set to `true`

### zcal iframe not loading
- Verify zcal URL is correct
- Check for CORS issues in console
- Ensure zcal account is active

### Form validation errors
- Check zod schema requirements
- Verify field names match schema
- Check react-hook-form registration

### Sanity not saving leads
- Verify Sanity client is configured
- Check environment variables
- Ensure lead schema is deployed to Sanity Studio

## 🎓 Benefits of This Integration

1. **Seamless UX**: No separate appointment page needed
2. **Higher Conversion**: Immediate booking after interest shown
3. **Data Collection**: Both CMS and student database updated
4. **Flexibility**: Country field helps with targeting
5. **Analytics**: Track entire funnel with GA4
6. **Maintainable**: Single component handles all logic
7. **Mobile-Friendly**: Responsive design works on all devices

## 🔄 Future Enhancements

Potential improvements:
- Add appointment confirmation in Sanity after zcal booking
- Send automated follow-up emails
- Add calendar availability preview before modal
- Integrate with CRM for lead scoring
- Add A/B testing for country field placement
- Implement timezone detection
- Add reminder notifications

---

**Last Updated**: January 2025  
**Component**: `src/components/registration/QuickRegistrationModal.tsx`  
**Dependencies**: Sanity CMS, zcal, react-hook-form, framer-motion
