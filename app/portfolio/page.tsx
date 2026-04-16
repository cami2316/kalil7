import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Portfolio - Finished ${siteConfig.niche} Projects`,
  description: `Explore ${siteConfig.companyName}'s completed installation projects across ${siteConfig.region}.`,
}

export default function Portfolio() {

  const portfolioItems = [
    {
      id: 1,
      title: 'Warm Living Space',
      category: 'Services' as const,
      imageSrc: '/images/services/floor.jpeg',
      alt: 'Premium installation',
    },
    {
      id: 2,
      title: 'Luxury Bathroom Finish',
      category: 'Services' as const,
      imageSrc: '/images/services/bath-05.jpeg',
      alt: 'Luxury bathroom remodel',
    },
    {
      id: 3,
      title: 'Elegant Fireplace Detail',
      category: 'Services' as const,
      imageSrc: '/images/services/fireplace02.jpeg',
      alt: 'Decorative finish',
    },
    {
      id: 4,
      title: 'Refined Bath Design',
      category: 'Services' as const,
      imageSrc: '/images/portfolio/bath01.jpeg',
      alt: 'Luxury remodel',
    },
    {
      id: 5,
      title: 'Modern Shower Space',
      category: 'Portfolio' as const,
      imageSrc: '/images/portfolio/bath-02.jpeg',
      alt: 'Premium finishes',
    },
    {
      id: 6,
      title: 'Feature Wall Installation',
      category: 'Portfolio' as const,
      imageSrc: '/images/portfolio/bath-03.jpeg',
      alt: 'Wall installation',
    },
    {
      id: 7,
      title: 'Contemporary Remodel',
      category: 'Portfolio' as const,
      imageSrc: '/images/portfolio/bath-06.jpeg',
      alt: 'Custom details',
    },
    {
      id: 8,
      title: 'Custom Fireplace Project',
      category: 'Portfolio' as const,
      imageSrc: '/images/portfolio/fireplace1.jpeg',
      alt: 'Finished project',
    },
  ]

  return (
    <>
      {/* HERO */}
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/bath-06.jpeg"
            alt="Luxury remodeling portfolio"
            fill
            className="object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Portfolio
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Spaces Transformed Through Craftsmanship
          </h1>

          <p className="text-lg text-white/90">
            Explore finished projects that showcase our installation standards,
            design precision, and commitment to premium results.
          </p>
        </div>

      </section>

      {/* INTRO */}
      <section className="py-20 bg-brand-white text-center">

        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
            Signature Project Gallery
          </h2>

          <p className="text-lg text-brand-charcoal">
            Browse our completed flooring installations and bathroom remodels.
            Each project reflects careful planning, premium materials, and refined finishing.
          </p>
        </div>

      </section>

      {/* GALLERY */}
      <section className="pb-20 bg-brand-white">
        <div className="container mx-auto px-4">
          <Gallery items={portfolioItems} />
        </div>
      </section>

      {/* DIFFERENTIATOR SECTION */}
      <section className="py-20 bg-brand-white">

        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">

          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl p-8 shadow-premium border border-brand-charcoal/10"
            >
              <div className="text-4xl font-semibold text-brand-primary mb-3">
                {stat.value}
              </div>

              <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                {stat.label}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-brand-charcoal text-white text-center">

        <div className="container mx-auto px-4 max-w-2xl">

          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready To Start Your Own Transformation?
          </h2>

          <p className="text-lg text-white/80 mb-10">
            Schedule a complimentary consultation and receive a detailed remodeling estimate tailored to your home.
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
