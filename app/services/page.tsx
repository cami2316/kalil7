import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Services - ${siteConfig.niche}`,
  description: `Professional ${siteConfig.niche} in ${siteConfig.region}.`,
}

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/images/hero/heroe.jpeg"
            alt="Luxury remodeling services"
            fill
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Our Services
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Precision Installation Designed Around Your Space
          </h1>

          <p className="text-lg text-white/90">
            From tile installations to full bathroom transformations, we deliver premium craftsmanship with dependable timelines.
          </p>
        </div>
      </section>

      {/* FLOORING */}
      <section className="py-24 bg-brand-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="uppercase tracking-[0.35em] text-brand-charcoal mb-4">
              Tile Installation
            </p>

            <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
              Floors Engineered for Durability & Style
            </h2>

            <p className="text-brand-charcoal mb-8">
              We install premium systems designed to enhance aesthetics while ensuring long-term performance in {siteConfig.region} homes.
            </p>

            <ul className="space-y-4">
              {[
                'Ceramic Tile Installation',
                'Porcelain Tile Installation',
                'Bathroom Tile Installation',
                'Kitchen Tile Installation',
                'Decorative Tile Installation',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-brand-charcoal">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[440px] rounded-[36px] overflow-hidden shadow-premium">
            <Image
              src="/images/services/floor.jpeg"
              alt="Premium installation"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* BATHROOM */}
      <section className="py-24 bg-brand-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative h-[440px] rounded-[36px] overflow-hidden shadow-premium order-2 lg:order-1">
            <Image
              src="/images/services/bath 05.jpeg"
              alt="Bathroom remodeling"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="uppercase tracking-[0.35em] text-brand-charcoal mb-4">
              Marble Installation
            </p>

            <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
              Luxury Bathrooms Designed for Everyday Living
            </h2>

            <p className="text-brand-charcoal mb-8">
              Waterproofing systems, precise marble alignment, and modern layouts designed for durability and elegance.
            </p>

            <ul className="space-y-4">
              {[
                'Marble Countertops',
                'Marble Flooring',
                'Wall Marble Installation',
                'Custom Marble Showers',
                'Luxury Marble Finishes',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-brand-charcoal">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* TILE WORK */}
      <section className="py-24 bg-brand-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="uppercase tracking-[0.35em] text-brand-charcoal mb-4">
              Custom Tile & Decorative Work
            </p>

            <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
              Statement Details That Define Your Space
            </h2>

            <p className="text-brand-charcoal mb-8">
              From artistic backsplashes to custom entry medallions, our decorative tile installations deliver refined finishes.
            </p>

            <ul className="space-y-4">
              {[
                'Backsplashes',
                'Feature Walls',
                'Entry Medallions',
                'Custom Layout Designs',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-brand-charcoal">
                  <span className="mt-2 h-2.5 w-2.5 rounded-full bg-brand-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-[440px] rounded-[36px] overflow-hidden shadow-premium">
            <Image
              src="/images/services/fireplace02.jpeg"
              alt="Decorative installation"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-charcoal text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Transform Your Space?
          </h2>

          <p className="text-lg text-white/80 mb-10">
            Schedule a free consultation and receive a personalized installation estimate.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-brand-primary px-10 py-4 rounded-full font-semibold hover:bg-brand-accent transition shadow-lg"
          >
            Request Free Estimate
          </Link>

        </div>
      </section>
    </>
  )
}
