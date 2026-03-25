import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import GallerySlider from '@/components/GallerySlider'

export const metadata: Metadata = {
  title: 'Torte Personalizzate a Pavia e Certosa di Pavia — Delizie della Certosa',
  description:
    'Torte personalizzate artigianali per compleanni, matrimoni, comunioni e lauree. Ordina la tua torta su misura a Certosa di Pavia. Richiedi su WhatsApp.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/torte-personalizzate' },
  openGraph: {
    title: 'Torte Personalizzate a Pavia — Delizie della Certosa',
    description: 'Torte artigianali su misura per ogni occasione. Contattaci su WhatsApp per ordinare.',
    images: [{ url: '/images/gallery/torta-1.jpg', alt: 'Torta personalizzata Certosa di Pavia' }],
  },
}

const galleryImages = [
  { src: '/images/gallery/auguri-amore.webp', alt: 'Torta auguri amore - Delizie della Certosa' },
  { src: '/images/gallery/torta-bing.webp', alt: 'Torta Bing personalizzata - Delizie della Certosa' },
  { src: '/images/gallery/torta-1.jpg', alt: 'Torta personalizzata artigianale Certosa di Pavia' },
  { src: '/images/gallery/torta-3.jpg', alt: 'Torta matrimonio artigianale Certosa di Pavia' },
  { src: '/images/gallery/torta-6.jpg', alt: 'Torta decorata Certosa di Pavia' },
  { src: '/images/reviews/torta-nicoletta.jpg', alt: 'Torta Nicoletta - Delizie della Certosa' },
  { src: '/images/gallery/torta-napoli.jpg', alt: 'Torta Napoli - Delizie della Certosa' },
  { src: '/images/gallery/torta-lol.jpg', alt: 'Torta LOL - Delizie della Certosa' },
]

const steps = [
  {
    num: '01',
    title: 'Contattaci su WhatsApp',
    desc: 'Scrivi su WhatsApp per descriverci l\'occasione, il numero di persone e i tuoi gusti. Risponderemo in poche ore.',
  },
  {
    num: '02',
    title: 'Scegli design e gusto',
    desc: 'Definisci insieme a noi la decorazione, il tema e i gusti della torta. Pan di Spagna, cioccolato, crema pasticcera, frutti di bosco e molto altro.',
  },
  {
    num: '03',
    title: 'Ritira o ricevi a domicilio',
    desc: 'Passa in negozio a Via Volta 4, Certosa di Pavia, oppure organizza la consegna a domicilio nella tua zona.',
  },
]

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Torte Personalizzate Artigianali',
  description:
    'Torte artigianali personalizzate per compleanni, matrimoni, comunioni e lauree. Realizzate a mano con ingredienti freschi a Certosa di Pavia.',
  brand: {
    '@type': 'Brand',
    name: 'Delizie della Certosa',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'EUR',
    seller: {
      '@type': 'LocalBusiness',
      name: 'Delizie della Certosa',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Via Volta 4',
        addressLocality: 'Certosa di Pavia',
        postalCode: '27012',
        addressCountry: 'IT',
      },
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: '112',
  },
}

export default function TortePersonalizzatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <main>
        {/* HERO */}
        <section className="relative py-24 md:py-48 flex items-center justify-center bg-ardesia overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/gallery/torta-bing.webp"
              alt="Torte personalizzate artigianali Certosa di Pavia"
              fill
              className="object-cover opacity-20"
              priority
            />
          </div>
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="font-script text-[#C9982A] text-3xl md:text-4xl mb-3">Ogni torta racconta una storia</p>
              <h1 className="font-sans font-700 tracking-widest uppercase text-cream text-4xl md:text-7xl leading-none mb-6">
                Torte Personalizzate
              </h1>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-6 rounded-full" />
              <p className="text-cream/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
                Creazioni artigianali su misura per compleanni, matrimoni, comunioni, lauree e ogni momento speciale.
                Ogni torta è unica, realizzata a mano con ingredienti freschi.
              </p>
              <a
                href="https://wa.link/8kwj8i"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-rosso text-cream px-8 py-4 rounded-full font-sans font-700 tracking-widest uppercase text-sm hover:bg-rosso/90 hover:scale-105 transition-all"
              >
                Ordina su WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </section>

        {/* GALLERIA */}
        <section className="py-14 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="font-script text-[#C9982A] text-3xl mb-2">Le nostre creazioni</p>
                <h2 className="font-sans font-700 tracking-widest uppercase text-ardesia text-4xl md:text-5xl mb-4">
                  Galleria
                </h2>
                <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-4 rounded-full" />
                <p className="text-ardesia/60 max-w-xl mx-auto">
                  Ogni torta è un&apos;opera d&apos;arte. Sfoglia le nostre creazioni e lasciati ispirare.
                </p>
              </div>
            </ScrollReveal>

            <GallerySlider images={galleryImages} />
          </div>
        </section>

        {/* COME ORDINARE */}
        <section className="py-14 md:py-24 bg-ardesia">
          <div className="max-w-6xl mx-auto px-4">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="font-script text-[#C9982A] text-3xl mb-2">Semplice e veloce</p>
                <h2 className="font-sans font-700 tracking-widest uppercase text-cream text-4xl md:text-5xl mb-4">
                  Come Ordinare
                </h2>
                <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 120}>
                  <div className="border border-cream/10 p-8 rounded-2xl text-center hover:border-[#C9982A]/40 transition-colors">
                    <p className="font-sans font-700 text-[#C9982A] text-5xl mb-6 leading-none">{step.num}</p>
                    <h3 className="font-sans font-700 tracking-widest uppercase text-cream text-lg mb-4">
                      {step.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* GUSTI E VARIANTI */}
        <section className="py-14 md:py-24 bg-cream">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
              <ScrollReveal direction="left">
                <p className="font-script text-[#C9982A] text-3xl mb-3">Per ogni palato</p>
                <h2 className="font-sans font-700 tracking-widest uppercase text-ardesia text-3xl md:text-4xl mb-6">
                  Gusti e Varianti
                </h2>
                <div className="w-12 h-0.5 bg-[#C9982A] mb-8 rounded-full" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Pan di Spagna classico',
                    'Crema pasticcera',
                    'Cioccolato fondente',
                    'Frutti di bosco',
                    'Panna e fragole',
                    'Tiramisù',
                    'Pistacchio siciliano',
                    'Nutella e nocciole',
                    'Limone e menta',
                    'Su richiesta',
                  ].map((gusto) => (
                    <div
                      key={gusto}
                      className="flex items-center gap-2 text-ardesia/70 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-[#C9982A] shrink-0" />
                      {gusto}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={150}>
                <div className="relative">
                  <Image
                    src="/images/gallery/torta-4.jpg"
                    alt="Torta personalizzata con crema pasticcera Certosa di Pavia"
                    width={600}
                    height={700}
                    className="w-full h-[260px] md:h-[460px] object-cover"
                  />
                  <div className="absolute -bottom-5 -left-5 bg-rosso text-cream px-8 py-5 rounded-xl hidden md:block">
                    <p className="font-sans font-700 tracking-widest uppercase text-xs">Fatte a mano</p>
                    <p className="font-script text-2xl mt-1">ogni giorno</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA FINALE */}
        <section className="py-12 md:py-20 bg-rosso text-center">
          <ScrollReveal>
            <p className="font-script text-cream/80 text-3xl mb-3">Il tuo momento speciale merita il meglio</p>
            <h2 className="font-sans font-700 tracking-widest uppercase text-cream text-4xl md:text-5xl mb-6">
              Ordina la Tua Torta
            </h2>
            <p className="text-cream/80 max-w-xl mx-auto mb-8">
              Scrivici su WhatsApp con i dettagli del tuo evento. Ti risponderemo in poco tempo per creare insieme la torta perfetta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.link/8kwj8i"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-cream text-rosso px-8 py-4 rounded-full font-sans font-700 tracking-widest uppercase text-sm hover:bg-cream/90 transition-colors"
              >
                Ordina su WhatsApp
              </a>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center border-2 border-cream text-cream px-8 py-4 rounded-full font-sans font-600 tracking-widest uppercase text-sm hover:bg-cream/10 transition-colors"
              >
                Dove Siamo
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </main>
    </>
  )
}
