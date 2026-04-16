import Image from 'next/image'
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Contact ${siteConfig.companyName} - Request Free Estimate`,
  description: `Request a free ${siteConfig.niche} estimate in ${siteConfig.region}. Professional consultation and clear project planning.`,
}

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/fireplace1.jpeg"
            alt="Luxury remodeling consultation"
            fill
            className="object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Contact
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Request Your Free Installation Estimate
          </h1>

          <p className="text-lg text-white/90">
            Tell us about your project. Our team will review your request and guide you through next steps with clarity and transparency.
          </p>
        </div>

      </section>

      {/* MAIN SECTION */}
      <section className="relative py-20 bg-brand-white overflow-hidden">

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 relative">

          {/* LEFT CONTENT */}
          <div className="space-y-10">

            {/* INTRO */}
            <div>
              <h2 className="text-3xl font-semibold text-brand-charcoal mb-4">
                Speak With Our Installation Team
              </h2>

              <p className="text-brand-charcoal text-lg">
                We respond within one business day with consultation details,
                project recommendations, and scheduling availability.
              </p>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">

              <div>
                <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                  Phone
                </p>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-xl font-semibold text-brand-charcoal hover:text-brand-accent transition"
                >
                  {siteConfig.phoneFormatted}
                </a>

                <div className="flex gap-3 mt-3">
                  <a
                    href={`https://wa.me/1${siteConfig.whatsapp}?text=Hello%20Kalil%207%20Services%2C%20I%27d%20like%20to%20request%20an%20estimate`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`sms:+1${siteConfig.phone}?body=Hello%20Kalil%207%20Services%2C%20I%27d%20like%20to%20request%20an%20estimate`}
                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
                  >
                    SMS
                  </a>
                </div>

                <p className="text-sm text-brand-charcoal/70 mt-2">
                  {siteConfig.businessHours}
                </p>
              </div>

              <div>
                <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                  Email
                </p>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xl font-semibold text-brand-charcoal hover:text-brand-accent transition"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                  Instagram
                </p>

                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl font-semibold text-brand-charcoal hover:text-brand-accent transition"
                >
                  {siteConfig.instagram.handle}
                </a>
              </div>

              <div>
                <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                  Service Area
                </p>

                <p className="text-xl font-semibold text-brand-charcoal">
                  {siteConfig.region}
                </p>
              </div>

            </div>

            {/* PROCESS SECTION */}
            <div className="rounded-3xl border border-brand-charcoal/10 p-7 shadow-premium">

              <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                What Happens Next?
              </h3>

              <ul className="space-y-3 text-brand-charcoal">
                <li>✔ Review of your project details</li>
                <li>✔ Consultation scheduling</li>
                <li>✔ Material and layout discussion</li>
                <li>✔ Written estimate and timeline</li>
              </ul>

            </div>

            {/* TRUST BOX */}
            <div className="rounded-3xl bg-brand-white p-6 border border-brand-charcoal/10 shadow-premium">

              <h3 className="text-lg font-semibold text-brand-charcoal mb-4">
                Why Homeowners Choose {siteConfig.companyName}
              </h3>

              <ul className="space-y-2 text-brand-charcoal">
                <li>Free in-home consultation</li>
                <li>Transparent written estimates</li>
                <li>Licensed & insured professionals</li>
                <li>Clean installation standards</li>
              </ul>

            </div>

            {/* IMAGE */}
            <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/services/floor.jpeg"
                alt="Premium installation"
                fill
                className="object-cover"
              />
            </div>

          </div>

          {/* FORM */}
          <div>
            <ContactForm />
          </div>

        </div>
      </section>
    </>
  )
}
