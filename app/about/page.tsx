import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `About ${siteConfig.companyName} - Expert Tile & Stone Installation`,
  description: `Family-owned ${siteConfig.niche} company serving ${siteConfig.region} with precision craftsmanship and trusted service.`,
}

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-charcoal text-white py-28">

        <div className="absolute inset-0">
          <Image
            src="/images/services/bath2.jpg"
            alt="Installation craftsmanship"
            fill
            priority
            className="object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.4em] text-brand-accent text-sm mb-5">
            Our Story
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Built on Craftsmanship. Grown Through Trust.
          </h1>

          <p className="text-lg text-white/90">
            {siteConfig.companyName} is a family-owned stone installation company dedicated to
            delivering refined transformations across {siteConfig.region}.
          </p>
        </div>

      </section>

      {/* STORY SECTION */}
      <section className="py-20 bg-brand-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-charcoal mb-6">
                More Than Installation. We Build Confidence.

            <div className="space-y-5 text-brand-charcoal text-lg">

              <p>
                With over {siteConfig.yearsExperience} years of experience in the tile and stone installation industry,
                {siteConfig.companyName} has established itself as a reference for tile, marble and travertine installation
                in bathrooms and kitchens in the {siteConfig.region} area.
              </p>

              <p>
                Our company, in operation for more than 5 years, is committed to delivering high-quality work and
                impeccable finishes. Each project is approached with detailed planning, appropriate techniques,
                and premium finish standards.
              </p>

              <p>
                We understand that remodeling is a personal investment. That's why we focus on clear communication,
                precise scheduling, and respect for your home from preparation to final delivery.
                Recently, we established a strategic partnership with Biaggio Flooring to expand our services
                for custom tile installation in homes.
              </p>

            </div>

          </div>

          <div className="relative h-[440px] rounded-[36px] overflow-hidden shadow-xl">
            <Image
              src="/images/services/floor 2.jpg"
              alt="Premium installation"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-brand-white">

        <div className="container mx-auto px-4">

          <div className="text-center mb-14">
            <p className="uppercase tracking-[0.35em] text-brand-charcoal text-sm mb-3">
              Core Values
            </p>

            <h2 className="text-3xl md:text-4xl font-semibold text-brand-charcoal">
              The Standards Behind Every Project
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.values.map((value) => (
              <div
                key={value.title}
                className="p-8 rounded-3xl border border-brand-charcoal/10 shadow-premium"
              >
                <h3 className="text-xl font-semibold text-brand-charcoal mb-3">
                  {value.title}
                </h3>

                <p className="text-brand-charcoal">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* STATS */}
      <section className="py-20 bg-brand-charcoal text-white">

        <div className="container mx-auto px-4">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">

            {siteConfig.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-semibold text-brand-accent mb-2">
                  {stat.value}
                </p>

                <p className="uppercase tracking-[0.2em] text-sm">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* DIFFERENCE SECTION */}
      <section className="py-20 bg-brand-white">

        <div className="container mx-auto px-4 max-w-4xl text-center">

          <h2 className="text-3xl md:text-4xl font-semibold text-brand-charcoal mb-6">
            The {siteConfig.companyName} Difference
          </h2>

          <p className="text-lg text-brand-charcoal mb-8">
            Our clients choose us because we combine craftsmanship with
            professionalism. We guide homeowners through design decisions,
            material selections, and installation planning so the final result
            meets both aesthetic and structural standards.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-brand-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-brand-accent transition-colors"
          >
            Schedule Consultation
          </Link>

        </div>

      </section>
    </>
  )
}
