import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Cannoli e Dolci Siciliani a Pavia — Delizie della Certosa',
  description:
    'Cannoli siciliani, cassata artigianale e panzerotti fritti. Siamo gli unici nell\'area di Pavia a offrire autentici dolci della tradizione siciliana. Via Volta 4, Certosa di Pavia.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/dolci-siciliani' },
  openGraph: {
    title: 'Cannoli e Dolci Siciliani a Pavia — Delizie della Certosa',
    description: 'L\'autentica tradizione siciliana nel cuore della Lombardia. Cannoli, cassata, panzerotti artigianali.',
    images: [{ url: '/images/gallery/cannoli-2.webp', alt: 'Dolci siciliani Pavia' }],
  },
}

const products = [
  {
    emoji: '🍋',
    title: 'Cannoli Siciliani',
    desc: 'La cialda croccante ripiena di fresca ricotta di pecora aromatizzata. Farciti al momento per mantenere tutta la croccantezza. Impossibile trovarne di così autentici nell\'area di Pavia.',
    detail: 'Farciti al momento su ordinazione',
  },
  {
    emoji: '🍰',
    title: 'Cassata Artigianale',
    desc: 'La regina dei dolci siciliani: pan di Spagna, ricotta, frutta candita e pasta reale. Una preparazione lunga e paziente che richiede dedizione. La nostra cassata è realizzata seguendo la ricetta originale palermitana.',
    detail: 'Ricetta originale palermitana',
  },
  {
    emoji: '🥟',
    title: 'Panzerotti Fritti',
    desc: 'Dorati e croccanti fuori, morbidi e saporiti dentro. I panzerotti siciliani sono una delle nostre specialità più amate. Ripieni di ricotta, di pomodoro e mozzarella, o con varianti stagionali.',
    detail: 'Fritti al momento, sempre freschi',
  },
]

export default function DolciSicilianiPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative py-24 md:py-48 flex items-center justify-center overflow-hidden bg-ardesia">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gallery/cannoli-2.webp"
            alt="Dolci siciliani artigianali Pavia"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-ardesia/60" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <ScrollReveal>
            <p className="font-script text-[#C9982A] text-3xl md:text-4xl mb-3">La Sicilia è arrivata</p>
            <h1 className="font-sans font-700 tracking-widest uppercase text-cream text-5xl md:text-7xl leading-none mb-4">
              Dolci Siciliani
            </h1>
            <p className="font-script text-cream/80 text-2xl md:text-3xl mb-6">
              Unici nell&apos;area di Pavia
            </p>
            <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-8 rounded-full" />
            <p className="text-cream/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Cannoli croccanti farciti al momento, cassate artigianali e panzerotti dorati.
              L&apos;autentica tradizione siciliana nel cuore della Lombardia.
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

      {/* USP UNICI */}
      <section className="py-10 md:py-16 bg-rosso">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="font-sans font-700 tracking-widest uppercase text-cream/60 text-xs mb-4">
              Una rarità nel territorio
            </p>
            <h2 className="font-sans font-700 tracking-widest uppercase text-cream text-3xl md:text-4xl mb-6">
              Siamo gli unici nell&apos;area a offrire autentici dolci<br className="hidden md:block" /> della tradizione siciliana
            </h2>
            <div className="w-16 h-0.5 bg-cream/40 mx-auto mb-6 rounded-full" />
            <p className="text-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
              Roberto porta con sé le ricette e i sapori della Sicilia, preparando ogni giorno dolci
              che non troveresti da nessun&apos;altra parte in provincia di Pavia. Un&apos;esperienza autentica,
              non una copia.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODOTTI */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Le nostre specialità</p>
              <h2 className="font-sans font-700 tracking-widest uppercase text-ardesia text-4xl md:text-5xl mb-4">
                I Dolci della Tradizione
              </h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ScrollReveal key={product.title} delay={i * 120}>
                <article className="border border-ardesia/10 rounded-2xl overflow-hidden hover:border-[#C9982A]/30 transition-colors h-full">
                  <div className="p-8">
                    <div className="text-5xl mb-6">{product.emoji}</div>
                    <h3 className="font-sans font-700 tracking-widest uppercase text-ardesia text-xl mb-4">
                      {product.title}
                    </h3>
                    <div className="w-8 h-0.5 bg-[#C9982A] mb-4 rounded-full" />
                    <p className="text-ardesia/60 text-sm leading-relaxed mb-6">{product.desc}</p>
                    <div className="inline-flex items-center gap-2 bg-ardesia/5 border border-ardesia/10 px-4 py-2 rounded-full">
                      <span className="w-1.5 h-1.5 bg-[#C9982A] shrink-0" />
                      <span className="text-ardesia/50 text-xs font-sans tracking-wider uppercase">
                        {product.detail}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORIA */}
      <section className="py-14 md:py-24 bg-ardesia">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <Image
              src="/images/gallery/cannoli-2.webp"
              alt="Roberto Vetri - tradizione siciliana a Certosa di Pavia"
              width={600}
              height={500}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <p className="font-script text-[#C9982A] text-3xl mb-3">Una tradizione vissuta</p>
            <h2 className="font-sans font-700 tracking-widest uppercase text-cream text-3xl md:text-4xl mb-6">
              Sapori di Sicilia<br />nel cuore della Lombardia
            </h2>
            <div className="w-12 h-0.5 bg-[#C9982A] mb-8 rounded-full" />
            <p className="text-cream/70 leading-relaxed mb-6">
              Roberto ha portato con sé le ricette di famiglia dalla Sicilia, mantenendole vive
              ogni giorno a Certosa di Pavia. Ogni cannolo viene farcito al momento dell&apos;ordine,
              ogni cassata preparata con ricotta fresca e frutta candita di qualità.
            </p>
            <p className="text-cream/70 leading-relaxed mb-8">
              Non troverai versioni industriali o approssimazioni. Solo l&apos;originale,
              come si fa in Sicilia.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Ingredienti freschi', 'Ricette originali', 'Fatti a mano', 'Ogni giorno'].map((tag) => (
                <span
                  key={tag}
                  className="bg-cream/10 border border-cream/20 text-cream/70 px-4 py-1.5 rounded-full font-sans font-600 tracking-widest uppercase text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-rosso text-center">
        <ScrollReveal>
          <p className="font-script text-cream/80 text-3xl mb-3">Non aspettare</p>
          <h2 className="font-sans font-700 tracking-widest uppercase text-cream text-4xl md:text-5xl mb-6">
            Assaggia la Sicilia
          </h2>
          <p className="text-cream/80 max-w-xl mx-auto mb-8">
            Vieni a trovarci in Via Volta 4 a Certosa di Pavia o ordinaci su WhatsApp.
            Disponibili tutti i giorni dalle 5:30.
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
  )
}
