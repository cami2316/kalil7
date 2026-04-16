import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: `Serviços - ${siteConfig.niche}`,
  description: `Serviços profissionais de ${siteConfig.niche} em ${siteConfig.region}.`,
}

export default function Services() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-28 bg-brand-charcoal text-white overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="/images/hero/place_1.jpg"
            alt="Luxury remodeling services"
            fill
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/90" />
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl">
          <p className="uppercase tracking-[0.45em] text-brand-accent text-sm mb-5">
            Nossos Serviços
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Instalação de Precisão Projetada Para Seu Espaço
          </h1>

          <p className="text-lg text-white/90">
            De instalações de tile a transformações completas de banheiros e cozinhas, entregamos artesanato premium com cronogramas confiáveis.
          </p>
        </div>
      </section>

      {/* FLOORING */}
      <section className="py-24 bg-brand-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="uppercase tracking-[0.35em] text-brand-charcoal mb-4">
              Instalação de Tile
            </p>

            <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
              Pisos Projetados para Durabilidade e Estilo
            </h2>

            <p className="text-brand-charcoal mb-8">
              Instalamos sistemas premium projetados para realçar a estética enquanto garantem performance de longo prazo em residências de {siteConfig.region}.
            </p>

            <ul className="space-y-4">
              {[
                'Instalação de Tile Cerâmico',
                'Instalação de Tile Porcelanato',
                'Tile para Banheiros',
                'Tile para Cozinhas',
                'Tile Decorativo',
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
              src="/images/services/floor1.jpg"
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
              src="/images/services/bath.jpg"
              alt="Bathroom remodeling"
              fill
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <p className="uppercase tracking-[0.35em] text-brand-charcoal mb-4">
              Instalação de Mármore
            </p>

            <h2 className="text-3xl font-semibold text-brand-charcoal mb-6">
              Banheiros de Luxo Projetados para o Dia a Dia
            </h2>

            <p className="text-brand-charcoal mb-8">
              Sistemas impermeáveis, alinhamento preciso de mármore e layouts modernos projetados para durabilidade e elegância.
            </p>

            <ul className="space-y-4">
              {[
                'Bancadas de Mármore',
                'Pisos de Mármore',
                'Revestimentos de Parede',
                'Chuveiros Personalizados',
                'Instalações de Luxo',
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
              src="/images/services/bath04.jpg"
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
            Pronto para Transformar Seu Espaço?
          </h2>

          <p className="text-lg text-white/80 mb-10">
            Agende uma consulta gratuita e receba um orçamento personalizado de instalação.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-brand-primary px-10 py-4 rounded-full font-semibold hover:bg-brand-accent transition shadow-lg"
          >
            Solicitar Orçamento Gratuito
          </Link>

        </div>
      </section>
    </>
  )
}
