/**
 * Centralized Site Configuration
 * 
 * This file contains all customizable settings for the template.
 * Change these values to adapt the site for different clients.
 */

export const siteConfig = {
  // Company Information
  companyName: 'Kalil 7 Services',
  niche: 'Tile, Marble & Travertine Installation',
  tagline: 'Luxury Craftsmanship',
  
  // Contact Details
  phone: '321 4425003',
  phoneFormatted: '(321) 442-5003',
  whatsapp: '3214425003',
  email: 'kalil7services@gmail.com',
  
  // Location
  city: 'Orlando',
  state: 'Florida',
  region: 'Central Florida',
  serviceAreas: [
    'Orlando',
    'Lake Nona',
    'Winter Park',
    'Celebration',
    'Greater Central Florida'
  ],
  
  // Brand Colors (Tailwind CSS variables)
  primaryColor: 'brand-primary',
  secondaryColor: 'brand-accent',
  
  // Hero Section
  heroTitle: 'Premium Tile, Marble & Travertine Installation in Central Florida',
  heroSubtitle: 'Luxury tile installation and bathroom remodeling in Central Florida. Trusted craftsmanship with over 20 years of experience.',
  
  // About Section
  yearsExperience: '20+',
  projectsCompleted: '500+',
  
  // Social Media
  instagram: {
    handle: '@kalil7services',
    url: 'https://www.instagram.com/kalil7services/'
  },
  
  // SEO
  siteUrl: 'https://kalil7services.com',
  defaultImage: '/images/hero/place_1.jpg',
  
  // Business Hours
  businessHours: 'Mon–Fri 8AM–6PM • Sat 9AM–4PM',
  
  // Core Services
  services: [
    {
      title: 'Tile Installation',
      description: 'Professional tile installation for bathrooms and kitchens with precision and long-lasting performance.',
      image: '/images/services/tile1.jpg',
      alt: 'Premium tile installation',
    },
    {
      title: 'Marble Installation',
      description: 'Luxury marble installation for countertops, floors, and feature walls with expert craftsmanship.',
      image: '/images/services/marble.jpg',
      alt: 'Marble installation with premium finish',
    },
    {
      title: 'Travertine Installation',
      description: 'Elegant travertine installation for bathrooms and kitchens, bringing natural beauty to your space.',
      image: '/images/services/travertine.jpg',
      alt: 'Travertine installation with natural texture',
    }
  ],
  
  // Features/Values
  values: [
    {
      title: 'Precision Craftsmanship',
      description: 'Every layout, cut, and installation follows strict alignment and finish standards.'
    },
    {
      title: 'Client Relationships',
      description: 'We treat every home with respect, clear communication, and professional care.'
    },
    {
      title: 'Transparent Pricing',
      description: 'Detailed written estimates and honest guidance before any project begins.'
    }
  ],
  
  // Trust Stats
  stats: [
    { value: '20+', label: 'Years Experience' },
    { value: '500+', label: 'Completed Projects' },
    { value: 'Licensed', label: '& Insured' },
    { value: '5-Star', label: 'Customer Rating' }
  ]
}
