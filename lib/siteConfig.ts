/**
 * Centralized Site Configuration
 * 
 * This file contains all customizable settings for the template.
 * Change these values to adapt the site for different clients.
 */

export const siteConfig = {
  // Company Information
  companyName: 'Kalil Services',
  niche: 'Tile, Marble & Travertine Installation',
  tagline: 'Luxury Craftsmanship',
  
  // Contact Details
  phone: '11 98765 4321',
  phoneFormatted: '(11) 98765-4321',
  whatsapp: '11987654321',
  email: 'contato@kalilservices.com',
  
  // Location
  city: 'São Paulo',
  state: 'São Paulo',
  region: 'Grande São Paulo',
  serviceAreas: [
    'São Paulo',
    'Guarulhos',
    'Osasco',
    'Santo André',
    'São Caetano do Sul'
  ],
  
  // Brand Colors (Tailwind CSS variables)
  primaryColor: 'brand-primary',
  secondaryColor: 'brand-accent',
  
  // Hero Section
  heroTitle: 'Premium Tile, Marble & Travertine Installation in São Paulo',
  heroSubtitle: 'Luxury tile installation and bathroom remodeling in São Paulo. Trusted craftsmanship with over 20 years of experience.',
  
  // About Section
  yearsExperience: '20+',
  projectsCompleted: '500+',
  
  // Social Media
  instagram: {
    handle: '@kalilservices',
    url: 'https://www.instagram.com/kalilservices/'
  },
  
  // SEO
  siteUrl: 'https://kalilservices.com',
  defaultImage: '/images/hero/place_1.jpg',
  
  // Business Hours
  businessHours: 'Seg–Sex 8h–18h • Sáb 9h–13h',
  
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
