import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import { siteConfig } from '@/lib/siteConfig'

const displayFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
})

const bodyFont = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.companyName} | ${siteConfig.heroTitle}`,
    template: `%s | ${siteConfig.companyName}`,
  },

  description: siteConfig.heroSubtitle,

  keywords: [
    `${siteConfig.niche} ${siteConfig.city}`,
    `${siteConfig.niche} ${siteConfig.region}`,
    'instalação de tile',
    'mármore',
    'travertino',
    'banheiros',
    'cozinhas',
  ],

  openGraph: {
    title: siteConfig.companyName,
    description: siteConfig.heroSubtitle,
    url: siteConfig.siteUrl,
    siteName: siteConfig.companyName,
    images: [
      {
        url: siteConfig.defaultImage,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} scroll-smooth`}
    >
      <body className="bg-brand-white text-brand-charcoal antialiased">

        {/* HEADER */}
        <Header />

        {/* PAGE CONTENT */}
        <main className="min-h-screen flex flex-col">
          <Providers>
            {children}
          </Providers>
        </main>

        {/* FOOTER */}
        <Footer />

      </body>
    </html>
  )
}
