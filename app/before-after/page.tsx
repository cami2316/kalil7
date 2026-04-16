import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Before / After - ${siteConfig.companyName}`,
  description: `Explore before and after remodeling projects by ${siteConfig.companyName}. Premium tile, marble, travertine, and bathroom transformations.`,
}

const beforeAfterItems = [
  {
    title: 'Bathroom Renovation',
    before: '/images/portfolio/before and after/bath04 before.jpeg',
    after: '/images/portfolio/before and after/bath 04 after.jpeg',
  },
  {
    title: 'Progress Installation',
    before: '/images/portfolio/before and after/bath 04 working.jpeg',
    after: '/images/portfolio/bath 06.jpeg',
  },
  {
    title: 'Full Tile Transformation',
    before: '/images/portfolio/before and after/bath 07 before.jpeg',
    after: '/images/portfolio/before and after/bath07 after.jpeg',
  },
]

export default function BeforeAfter() {
  return (
    <>
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/fireplace1.jpeg"
            alt="Before and after remodeling projects"
            fill
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Before / After
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            See the Craftsmanship That Changes Spaces
          </h1>

          <p className="text-lg text-white/90">
            Our before and after portfolio highlights the transformation power of guided tile, marble, and travertine installations.
          </p>
        </div>
      </section>

      <section className="py-20 bg-brand-white">
        <div className="container mx-auto px-4 space-y-16">
          {beforeAfterItems.map((item) => (
            <div key={item.title} className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="space-y-3">
                <p className="uppercase tracking-[0.35em] text-brand-charcoal text-sm">
                  {item.title}
                </p>
                <h2 className="text-3xl font-semibold text-brand-charcoal">
                  Before & After Comparison
                </h2>
                <p className="text-brand-charcoal text-lg max-w-2xl">
                  From demolition to finished installation, every step is managed with precision and care. These projects reflect our standard for clean sites, accurate layouts, and premium finishes.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="rounded-[32px] overflow-hidden border border-brand-charcoal/10 shadow-xl">
                  <div className="bg-brand-charcoal px-6 py-4 text-white font-semibold">Before</div>
                  <div className="relative h-80">
                    <Image
                      src={item.before}
                      alt={`${item.title} before`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="rounded-[32px] overflow-hidden border border-brand-charcoal/10 shadow-xl">
                  <div className="bg-brand-primary px-6 py-4 text-white font-semibold">After</div>
                  <div className="relative h-80">
                    <Image
                      src={item.after}
                      alt={`${item.title} after`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center py-16 bg-brand-charcoal rounded-[36px] text-white">
            <h2 className="text-3xl font-semibold mb-4">Ready to transform your space?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your next tile, marble, or travertine remodel and get a tailored estimate.
            </p>
            <Link
              href="/contact"
              className="inline-flex bg-brand-primary px-10 py-4 rounded-full font-semibold hover:bg-brand-accent transition shadow-lg"
            >
              Request Your Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
