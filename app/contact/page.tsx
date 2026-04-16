import Image from 'next/image'
import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Contato ${siteConfig.companyName} - Solicite Orçamento Gratuito`,
  description: `Solicite um orçamento gratuito de ${siteConfig.niche} em ${siteConfig.region}. Consultoria profissional e planejamento claro do projeto.`,
}

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/images/portfolio/bath04.jpg"
            alt="Luxury remodeling consultation"
            fill
            className="object-cover scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Contato
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Solicite Seu Orçamento Gratuito de Instalação
          </h1>

          <p className="text-lg text-white/90">
            Conte-nos sobre seu projeto. Nossa equipe irá revisar sua solicitação e guiá-lo pelos próximos passos com clareza e transparência.
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
                Fale com Nossa Equipe de Instalação
              </h2>

              <p className="text-brand-charcoal text-lg">
                Respondemos em até um dia útil com detalhes da consultoria,
                recomendações do projeto e disponibilidade de agendamento.
              </p>
            </div>

            {/* CONTACT INFO */}
            <div className="space-y-6">

              <div>
                <p className="uppercase tracking-widest text-sm text-brand-charcoal/70">
                  Phone
                </p>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="text-xl font-semibold text-brand-charcoal hover:text-brand-accent transition"
                >
                  {siteConfig.phone}
                </a>

                <p className="text-sm text-brand-charcoal/70">
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
                src="/images/services/floor 03.jpg"
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
