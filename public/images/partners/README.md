# Partners Logos Directory

This directory contains university and partner logos for the Partners Banner section.

## Required Images

Place your partner logos here with the following naming convention:

```
/public/images/partners/
  ├── sorbonne.png          # Université de la Sorbonne (France)
  ├── udem.png              # Université de Montréal (Canada)
  ├── uclouvain.png         # UCLouvain (Belgique)
  ├── ulaval.png            # Université Laval (Canada)
  ├── hec-montreal.png      # HEC Montréal (Canada)
  ├── sciences-po.png       # Sciences Po (France)
  ├── mcgill.png            # McGill University (Canada)
  ├── polytechnique.png     # Polytechnique Montréal (Canada)
  └── placeholder.png       # Fallback image
```

## Image Guidelines

- **Format**: PNG or WebP (with transparency preferred)
- **Size**: Recommended 300x200px (will be resized automatically)
- **Background**: Transparent or white
- **Color**: Full color (grayscale effect applied via CSS)
- **Quality**: High resolution for crisp display on all devices

## Adding New Partners

1. Add the logo file to this directory
2. Update the `defaultPartners` array in `PartnersBanner.tsx`
3. Or fetch from Sanity CMS dynamically

## Placeholder Image

If you don't have all logos yet, the component will gracefully fallback to `placeholder.png`.
Create a simple placeholder:
- 300x200px
- Gray background
- "University Logo" text
- Or use the university/institution initial letters

## Usage Example

```tsx
import { PartnersBanner } from '@/components/home/PartnersBanner'

// Default usage with predefined partners
<PartnersBanner />

// Custom partners list
<PartnersBanner 
  partners={[
    { name: 'Harvard', logo: '/images/partners/harvard.png', country: 'USA' },
    { name: 'Oxford', logo: '/images/partners/oxford.png', country: 'UK' },
  ]}
  speed={30}
  pauseOnHover={true}
/>
```

## CMS Integration (Sanity)

Partners can be fetched from Sanity:

```typescript
// In your page or layout
const partners = await client.fetch(`
  *[_type == "partner" && isActive == true] | order(order asc) {
    name,
    "logo": logo.asset->url,
    country
  }
`)

<PartnersBanner partners={partners} />
```
