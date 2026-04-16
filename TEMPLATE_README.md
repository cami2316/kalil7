# Agency Template - Next.js App Router + Tailwind CSS

A reusable, fully customizable agency template built with Next.js 16, TypeScript, and Tailwind CSS. Perfect for service-based businesses across different niches and locations.

## 🎯 Purpose

This template is designed to be duplicated and customized for multiple clients without editing code across multiple files. All business-specific information is centralized in a single configuration file.

## ✨ Features

- **Centralized Configuration** - Single source of truth for all business information
- **Fully Responsive** - Mobile-first design with modern UI components
- **SEO Optimized** - Dynamic metadata generation from config
- **Type-Safe** - Built with TypeScript for reliability
- **Production Ready** - Optimized build with Next.js App Router
- **Modern Stack** - Next.js 16, TypeScript, Tailwind CSS

## 🚀 Quick Start

### 1. Configuration Setup

All customization happens in `/lib/siteConfig.ts`. Update the following values:

```typescript
export const siteConfig = {
  // Company Information
  companyName: 'Your Company Name',
  niche: 'Your Service Niche',
  tagline: 'Your Tagline',
  
  // Contact Details
  phone: '123 456 7890',
  phoneFormatted: '(123) 456-7890',
  whatsapp: '1234557890',
  email: 'contact@yourcompany.com',
  
  // Location
  city: 'Your City',
  state: 'Your State',
  region: 'Your Region',
  serviceAreas: [
    'Area 1',
    'Area 2',
    'Area 3',
  ],
  
  // SEO
  siteUrl: 'https://yourwebsite.com',
  defaultImage: '/images/hero/place_1.jpg',
  
  // Hero Section
  heroTitle: 'Your Hero Title',
  heroSubtitle: 'Your hero subtitle or description',
  
  // Business Stats
  yearsExperience: '10+',
  projectsCompleted: '300+',
  
  // ... (see full config in /lib/siteConfig.ts)
}
```

### 2. Replace Images

Update images in these folders with your client's photos:

```
/public/images/
├── hero/          # Hero section backgrounds
├── services/      # Service showcase images
├── portfolio/     # Portfolio/gallery images
└── logo/          # Company logo (SVG format recommended)
```

**Image Naming Convention:**
- Keep existing filenames OR update references in `siteConfig.ts`
- Recommended formats: JPG for photos, SVG for logos
- Optimize images before uploading (recommended < 500KB each)

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── services/            # Services page
│   ├── portfolio/           # Portfolio/gallery page
│   ├── contact/             # Contact page with form
│   └── globals.css          # Global styles
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── Footer.tsx           # Site footer
│   ├── ContactForm.tsx      # Contact form (Google Forms embed)
│   ├── Gallery.tsx          # Portfolio gallery component
│   └── SplashSection.tsx    # Reusable splash section
├── lib/
│   └── siteConfig.ts        # 🎯 MAIN CONFIGURATION FILE
└── public/
    ├── images/              # All site images
    └── logo/                # Company logo
```

## 🎨 Customization Guide

### Changing Colors

Update Tailwind theme colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#YOUR_PRIMARY_COLOR',
        accent: '#YOUR_ACCENT_COLOR',
        charcoal: '#2b2d42',
        white: '#ffffff',
      },
    },
  },
}
```

### Updating Contact Form

Replace the Google Forms embed URL in `/components/ContactForm.tsx`:

```tsx
<iframe
  src="YOUR_GOOGLE_FORM_EMBED_URL"
  // ...
/>
```

### Adding/Removing Services

Edit the `services` array in `/lib/siteConfig.ts`:

```typescript
services: [
  {
    title: 'Service Name',
    description: 'Service description',
    image: '/images/services/service1.jpg',
    alt: 'Alt text',
  },
  // Add more services...
]
```

### Modifying Navigation

Navigation is defined in `/components/Header.tsx`:

```typescript
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]
```

## 📋 Pre-Launch Checklist

- [ ] Updated `/lib/siteConfig.ts` with client information
- [ ] Replaced all images in `/public/images/`
- [ ] Updated logo in `/public/logo/`
- [ ] Changed color scheme in `tailwind.config.js` (if needed)
- [ ] Replaced Google Forms embed in ContactForm.tsx
- [ ] Updated `siteUrl` in siteConfig for production
- [ ] Tested all pages in development
- [ ] Run `npm run build` successfully
- [ ] Verified SEO metadata on all pages
- [ ] Tested responsive design on mobile/tablet
- [ ] Updated social media links (if applicable)

## 🔧 Common Tasks

### Change Company Name Everywhere
Just update `companyName` in `/lib/siteConfig.ts`

### Update Phone Number
Update `phone` and `phoneFormatted` in `/lib/siteConfig.ts`

### Add New Service Area
Add to `serviceAreas` array in `/lib/siteConfig.ts`

### Change Hero Text
Update `heroTitle` and `heroSubtitle` in `/lib/siteConfig.ts`

## 🌐 Deployment

This template can be deployed to:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Other Platforms
Build the project with `npm run build` and follow platform-specific instructions.

## ⚠️ Important Notes

1. **Google Forms**: Update the embedded form URL for each client
2. **Images**: Ensure all images are optimized for web
3. **SEO**: Update `siteUrl` before production deployment
4. **Analytics**: Add Google Analytics or tracking code as needed
5. **Logo**: Use SVG format for best quality/performance

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Google Fonts (Playfair Display, Source Sans 3)
- **Image Optimization**: Next.js Image component
- **Form**: Google Forms embed (customizable)

## 📝 License

This template is proprietary. Unauthorized distribution is prohibited.

## 🤝 Support

For questions or issues, contact the development team.

---

**Last Updated**: February 2026  
**Version**: 1.0.0
