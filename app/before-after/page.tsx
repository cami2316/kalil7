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
    title: 'Bathroom 04 Transformation',
    before: '/images/portfolio/before-after/bath-04-before.jpeg',
    after: '/images/portfolio/before-after/bath-04-after.jpeg',
    description: 'A complete bathroom renovation with premium tile and stone finishes that elevate the entire space.',
  },
  {
    title: 'Bathroom 06 Transformation',
    before: '/images/portfolio/before-after/bath-06-before.jpeg',
    after: '/images/portfolio/before-after/bath-06-after.jpeg',
    description: 'A full stone and tile installation that refreshes the layout with premium finishes and clean detail.',
  },
]

const benefits = [
  'Custom tile layouts for every bathroom and kitchen',
  'Detailed surface prep and waterproofing for longevity',
  'Premium stone, marble and travertine finishes',
  'Fast, clean installations that respect your home',
]

export default function BeforeAfter() {
  return (
    <>
      <section className="relative overflow-hidden bg-brand-charcoal text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/before-after/bath-04-before.jpeg"
            alt="Before remodeling project"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/95 via-brand-charcoal/75 to-brand-charcoal/95" />
        </div>

        <div className="relative container mx-auto px-4 py-28 max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex items-center justify-center rounded-[32px] bg-white p-5 shadow-2xl w-32 h-32 mx-auto lg:mx-0">
              <Image
                src="/images/icone.png"
                alt="Icon for before and after"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>

            <div className="space-y-6 text-center lg:text-left">
              <p className="uppercase tracking-[0.45em] text-brand-accent text-sm">
                Before / After
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
                Before and After Projects That Show True Craftsmanship
              </h1>
              <p className="text-lg text-white/80 max-w-3xl">
                Discover how each transformation begins with careful planning, precise tile layout, and finishes with premium stone, marble, and travertine details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="rounded-[36px] bg-brand-primary/10 border border-brand-primary/20 p-8 shadow-xl">
              <p className="uppercase tracking-[0.35em] text-brand-accent text-sm mb-4">
                Our process
              </p>
              <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
                Organized before and after journeys
              </h2>
              <p className="text-brand-charcoal text-lg leading-relaxed">
                Each project is documented from the first demo step to the final tile and grout finish. Our portfolio highlights the progress, the attention to detail, and the premium results that homeowners rely on.
              </p>
            </div>

            <div className="grid gap-4">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-brand-primary/20 bg-white/90 p-5 shadow-lg">
                  <p className="text-brand-charcoal text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-brand-primary/5">
        <div className="container mx-auto px-4 space-y-16">
          {beforeAfterItems.map((item, index) => (
            <div
              key={item.title}
              className={`grid gap-6 lg:grid-cols-2 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="space-y-4">
                <p className="uppercase tracking-[0.35em] text-brand-charcoal text-sm">
                  {item.title}
                </p>
                <h2 className="text-3xl font-semibold text-brand-charcoal">
                  {item.description}
                </h2>
                <p className="text-brand-charcoal text-lg max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[32px] overflow-hidden border border-brand-charcoal/10 bg-white shadow-xl">
                  <div className="bg-white px-6 py-4 text-brand-charcoal font-semibold">Before</div>
                  <div className="relative h-72">
                    <Image
                      src={item.before}
                      alt={`${item.title} before`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="rounded-[32px] overflow-hidden border border-brand-charcoal/10 bg-white shadow-xl">
                  <div className="bg-brand-primary px-6 py-4 text-white font-semibold">After</div>
                  <div className="relative h-72">
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
        </div>
      </section>

      <section className="py-20 bg-brand-charcoal text-white">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="uppercase tracking-[0.35em] text-brand-accent text-sm">
              Design details
            </p>
            <h2 className="text-4xl font-semibold">
              Elegant golden accents with modern tile layouts
            </h2>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Our site design now uses organic golden lists and clean white icon containers for small spaces, giving a polished look across all presentation points.
            </p>
          </div>

          <div className="grid gap-4">
            {['Premium material selection', 'Clean site management', 'Luxury finish details'].map((text) => (
              <div key={text} className="rounded-[36px] bg-white/95 p-6 shadow-2xl border border-brand-primary/20">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-white p-3 shadow-md">
                    <Image
                      src="/images/icone.png"
                      alt="Feature icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-brand-charcoal font-semibold">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-brand-charcoal mb-5">Ready to bring your before and after to life?</h2>
          <p className="text-lg text-brand-charcoal/80 mb-8 max-w-2xl mx-auto">
            We make small spaces look premium with tile and stone installations that stand the test of time.
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-brand-primary text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-accent transition shadow-lg"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
