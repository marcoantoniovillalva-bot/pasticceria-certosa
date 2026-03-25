import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'
import GallerySlider from '@/components/GallerySlider'

export const metadata: Metadata = {
  title: 'Delizie della Certosa — Pasticceria, Pizzeria e Panificio a Certosa di Pavia',
  description:
    'Pasticceria artigianale, pizzeria con consegna a domicilio e panificio a Certosa di Pavia. Cannoli siciliani, torte personalizzate e cortile da 600m² per eventi. Chiamaci o ordina su WhatsApp.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it' },
}

const services = [
  {
    href: '/torte-personalizzate',
    icon: '🎂',
    title: 'Torte Personalizzate',
    desc: 'Creazioni su misura per compleanni, matrimoni, comunioni e lauree. Artigianali, fresche, uniche.',
    img: '/images/gallery/torta-bing.webp',
  },
  {
    href: '/dolci-siciliani',
    icon: '🍋',
    title: 'Dolci Siciliani',
    desc: "Cannoli, cassate e panzerotti artigianali. L'autentica tradizione siciliana nel cuore della Lombardia.",
    img: '/images/gallery/cannoli-2.webp',
  },
  {
    href: '/pizza-a-domicilio',
    icon: '🍕',
    title: 'Pizza a Domicilio',
    desc: 'Pizze farcitissime con ingredienti di qualità. Consegna puntuale a Certosa di Pavia e dintorni.',
    img: '/images/pizza.webp',
  },
  {
    href: '/pasticceria',
    icon: '☕',
    title: 'Pasticceria & Caffè',
    desc: 'Un buon caffè, pasticcini irresistibili e pane croccante fresco ogni mattina dalle 5:30.',
    img: '/images/gallery/torta-11.webp',
  },
  {
    href: '/catering-ed-eventi',
    icon: '🌿',
    title: 'Catering & Eventi',
    desc: "Cortile esclusivo da 600m² per eventi all'aperto. Catering per matrimoni, cerimonie e feste private.",
    img: '/images/eventi-speciali.jpg',
  },
  {
    href: '/pane-e-colazione',
    icon: '🥖',
    title: 'Pane & Colazione',
    desc: 'Pane artigianale, cornetti caldi e colazione completa. Apriamo alle 5:30 ogni giorno.',
    img: '/images/pane.jpg',
  },
]

const reviews = [
  {
    name: 'Dany Montalbano',
    text: 'Cercavo da mesi una buona pizza a domicilio a Certosa di Pavia.. FINALMENTE pizze farcitissime, qualità, puntualità e prezzo TUTTO AL TOP! Complimenti',
    avatar: '/images/reviews/dany-montalbano.jpg',
    product: '/images/reviews/pizza-montalbano.jpg',
    stars: 5,
  },
  {
    name: 'Nicoletta',
    text: 'Come sempre le vostre torte non deludono mai, bellissima e super buona. Complimenti',
    avatar: '/images/reviews/nicoletta.jpg',
    product: '/images/reviews/torta-nicoletta.jpg',
    stars: 5,
  },
  {
    name: 'Fabio Fiumefreddo',
    text: 'Una torta anche bellissima da vedere. Buonissima e fresca. Doppio pan di Spagna con crema pasticcera e gocce di cioccolato, guarnita con panna montata. Una vera goduria per le papille gustative! Consiglio vivamente!',
    avatar: null,
    product: '/images/reviews/torta-fabio.png',
    stars: 5,
  },
  {
    name: 'Progetto Senila',
    text: "Abbiamo avuto l'appoggio di fornitori davvero capaci che per primi hanno compreso la particolarità e l'importanza del progetto lavorando a condizioni davvero speciali! Grazie a Roberto Vetri di Delizie della Certosa che ha realizzato la torta",
    avatar: '/images/reviews/progetto-senila.jpg',
    product: '/images/reviews/torta-senila.jpg',
    stars: 5,
  },
]

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

const cortiloImages = [
  { src: '/images/giostre-bambini.jpg', alt: 'Giostre per bambini - Cortile Delizie della Certosa' },
  { src: '/images/eventi-speciali.jpg', alt: 'Eventi speciali - Cortile Delizie della Certosa' },
  { src: '/images/calci-in-culo.jpg', alt: 'Intrattenimento eventi - Cortile Delizie della Certosa' },
  { src: '/images/gonfiabile.jpg', alt: 'Gonfiabile per bambini - Cortile Delizie della Certosa' },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <main>

      {/* ══════════════════════════════════════
          HERO — GIF background, full screen
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Video background (converted from GIF — desktop 5.8MB, mobile 4MB) */}
        <div className="absolute inset-0 z-0">
          {/* Desktop */}
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            className="hidden md:block w-full h-full object-cover"
          >
            <source src="/images/hero-desktop.mp4" type="video/mp4" />
          </video>
          {/* Mobile */}
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            className="block md:hidden w-full h-full object-cover"
          >
            <source src="/images/hero-mobile.mp4" type="video/mp4" />
          </video>
          {/* Overlay multi-layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#222C35]/55 via-[#222C35]/60 to-[#222C35]/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(34,44,53,0.5)_100%)]" />
        </div>

        {/* Content — uses CSS classes with defined keyframes (not inline style) */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          <p className="hero-enter font-script text-[#C9982A] text-2xl md:text-5xl mb-4 drop-shadow-lg">
            Benvenuti da
          </p>

          <h1 className="hero-enter-delay-1 font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-[2.2rem] sm:text-7xl md:text-8xl leading-none mb-5 drop-shadow-2xl">
            Delizie della Certosa
          </h1>

          {/* Gold divider */}
          <div className="hero-enter-delay-2 flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9982A]" />
            <div className="w-2 h-2 bg-[#C9982A] rotate-45" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9982A]" />
          </div>

          <p className="hero-enter-delay-2 font-script text-[#FDFEFC]/90 text-2xl md:text-3xl mb-8 drop-shadow">
            Sapori di Sicilia nel cuore della Lombardia
          </p>

          <p className="hero-enter-delay-3 text-[#FDFEFC]/70 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Pasticceria artigianale · Pizzeria a domicilio · Panificio · Catering
            <br />
            <span className="text-sm text-[#FDFEFC]/50">Via Volta 4, Certosa di Pavia · Aperto dalle 5:30</span>
          </p>

          <div className="hero-enter-delay-4 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 hover:scale-105 hover:shadow-xl hover:shadow-[#B20D02]/40 transition-all duration-300"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.559 4.118 1.535 5.847L.057 23.882l6.188-1.623A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.213-3.724.977.995-3.638-.235-.374A9.818 9.818 0 1112 21.818z" />
              </svg>
              Ordina su WhatsApp
            </a>
            <Link
              href="/torte-personalizzate"
              className="inline-flex items-center justify-center border-2 border-[#FDFEFC]/60 text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-semibold tracking-widest uppercase text-sm hover:bg-[#FDFEFC] hover:text-[#222C35] transition-all duration-300"
            >
              Scopri le Torte
            </Link>
          </div>

          {/* Rating badge */}
          <div className="hero-enter-delay-5 mt-12 inline-flex items-center gap-3 bg-[#222C35]/60 backdrop-blur-sm border border-[#C9982A]/30 px-6 py-3 rounded-2xl relative">
            <Stars count={5} />
            <span className="text-[#FDFEFC] font-sans font-bold text-lg">4.7</span>
            <span className="text-[#FDFEFC]/50 text-sm">· 112 recensioni Google</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#FDFEFC]/40">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase">Scorri</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#C9982A]/60 to-transparent" style={{ animation: 'pulse-soft 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CHI SIAMO
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal direction="right" delay={200} className="order-1 md:order-2">
            <p className="font-script text-[#C9982A] text-3xl mb-2">La nostra storia</p>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl leading-tight mb-8">
              Una tradizione<br />di famiglia
            </h2>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-[#B20D02]" />
              <div className="w-2 h-2 bg-[#C9982A] rotate-45" />
              <div className="w-20 h-px bg-[#B20D02]" />
            </div>
            <p className="text-[#222C35]/65 leading-relaxed mb-5 text-[15px]">
              Roberto vi accoglie ogni mattina con il sorriso, pronto a deliziarvi con un buon caffè
              e farvi assaggiare i pasticcini irresistibili che prepara con le sue mani. Ogni giorno
              dalle 5:30, perché la bontà non va in vacanza.
            </p>
            <p className="text-[#222C35]/65 leading-relaxed mb-10 text-[15px]">
              Siamo l'unica realtà nell'area a portare l'autentica tradizione siciliana nel cuore
              della Lombardia: cannoli croccanti, cassate cremose e panzerotti dorati.
              E il nostro <strong className="text-[#222C35]">cortile da 600m²</strong> vi aspetta per gli eventi più speciali.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-4 text-center mb-10">
              {[
                ['4.7★', '112 Recensioni'],
                ['600m²', 'Cortile eventi'],
                ['Unici', 'Dolci siciliani'],
              ].map(([val, label]) => (
                <div key={label} className="border border-[#222C35]/10 p-4 rounded-2xl hover:border-[#C9982A]/50 transition-colors">
                  <p className="font-sans font-bold text-[#B20D02] text-xl">{val}</p>
                  <p className="text-[10px] text-[#222C35]/40 tracking-widest uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-7 py-3.5 rounded-full font-sans font-bold tracking-widest uppercase text-xs hover:bg-[#B20D02]/90 transition-all duration-300"
            >
              Contattaci
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </ScrollReveal>

          <ScrollReveal direction="left" className="order-2 md:order-1">
            <div className="relative">
              <Image
                src="/images/roberto-profilo.jpeg"
                alt="Roberto Vetri - Fondatore e Pasticcere di Delizie della Certosa"
                width={600}
                height={700}
                className="block mx-auto w-auto max-w-full max-h-[240px] md:w-full md:max-h-none md:h-[540px] object-contain md:object-cover md:object-top rounded-2xl bg-[#f5f5f0]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gold corner accents */}
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-[#C9982A] rounded-tl-sm" />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-[#C9982A] rounded-br-sm" />
              {/* Name badge */}
              <div className="absolute bottom-5 left-4 bg-[#222C35]/90 backdrop-blur-sm text-[#FDFEFC] px-5 py-3 rounded-xl">
                <p className="font-script text-2xl text-[#C9982A]">Roberto</p>
                <p className="font-sans font-semibold tracking-widest uppercase text-[10px] text-[#FDFEFC]/50 mt-0.5">
                  Fondatore & Pasticcere
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVIZI
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#F7F1E8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Cosa offriamo</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl mb-5">
                I Nostri Servizi
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9982A]" />
                <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9982A]" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <ScrollReveal key={s.href} delay={i * 70}>
                <Link
                  href={s.href}
                  className="group relative overflow-hidden block bg-white border border-[#222C35]/8 rounded-2xl hover:border-[#C9982A]/50 card-lift transition-all duration-400 shadow-sm"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={`${s.title} - Certosa di Pavia`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-600 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Gold icon bg */}
                    <div className="absolute top-3 left-3 bg-[#C9982A]/20 backdrop-blur-sm border border-[#C9982A]/30 w-9 h-9 rounded-xl flex items-center justify-center text-lg">
                      {s.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-base mb-2 group-hover:text-[#C9982A] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[#222C35]/55 text-sm leading-relaxed mb-4">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#C9982A] text-xs font-sans font-semibold tracking-widest uppercase group-hover:gap-2 transition-all">
                      Scopri di più
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  {/* Bottom gold line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9982A] group-hover:w-full transition-all duration-400" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          USP SICILIA
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#B20D02] relative overflow-hidden">
        {/* Decorative diagonal */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#FDFEFC]/5 skew-x-12 translate-x-1/4 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <p className="font-script text-[#FDFEFC]/70 text-3xl mb-3">Unici nell&apos;area</p>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-4xl md:text-6xl mb-6">
              La Sicilia è qui
            </h2>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#FDFEFC]/30" />
              <div className="w-1.5 h-1.5 bg-[#FDFEFC]/60 rotate-45" />
              <div className="h-px w-12 bg-[#FDFEFC]/30" />
            </div>
            <p className="text-[#FDFEFC]/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Siamo gli unici nell&apos;area di Pavia a offrire autentici prodotti della tradizione siciliana.
              Cannoli croccanti farciti al momento, cassate artigianali e panzerotti dorati.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['🍋 Cannoli Siciliani', '🍰 Cassata Artigianale', '🥟 Panzerotti Fritti', '🎂 Torte su Ordinazione'].map((item) => (
                <span key={item} className="bg-[#FDFEFC]/10 border border-[#FDFEFC]/20 hover:bg-[#FDFEFC]/15 text-[#FDFEFC] px-5 py-2.5 rounded-full font-sans font-semibold tracking-widest uppercase text-xs transition-colors cursor-default">
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/dolci-siciliani"
              className="inline-flex items-center gap-2 bg-[#FDFEFC] text-[#B20D02] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/90 transition-colors"
            >
              Scopri i Dolci Siciliani
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          GALLERIA TORTE
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#FDFEFC]">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Le nostre creazioni</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl mb-5">
                Galleria Torte
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#B20D02]" />
                <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#B20D02]" />
              </div>
              <p className="text-[#222C35]/50 max-w-xl mx-auto text-sm">
                Ogni torta è un&apos;opera d&apos;arte creata su misura per il tuo momento speciale.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <GallerySlider images={galleryImages} />
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-14">
              <Link
                href="/torte-personalizzate"
                className="inline-flex items-center gap-2 border-2 border-[#222C35] text-[#222C35] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#222C35] hover:text-[#FDFEFC] transition-all duration-300"
              >
                Ordina la Tua Torta
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RECENSIONI
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#FDFEFC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Cosa dicono di noi</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl mb-5">
                Recensioni Reali
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9982A]" />
                <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9982A]" />
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <Stars count={5} />
                <span className="text-[#222C35] font-sans font-bold text-2xl">4.7</span>
                <span className="text-[#222C35]/40 text-sm">su 112 recensioni Google</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="-mx-4 overflow-hidden md:mx-0">
          <div className="flex overflow-x-auto gap-4 pb-4 px-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 md:px-0">
            {reviews.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 90}>
                <div className="min-w-[320px] md:min-w-0 snap-start bg-white border border-[#222C35]/8 rounded-2xl hover:border-[#C9982A]/30 p-6 flex gap-4 transition-all duration-300 card-lift shadow-sm">
                  {r.product && (
                    <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl border border-[#222C35]/10">
                      <Image
                        src={r.product}
                        alt={`${r.name} - Delizie della Certosa`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      {r.avatar ? (
                        <Image
                          src={r.avatar}
                          alt={r.name}
                          width={40}
                          height={40}
                          className="rounded-full w-10 h-10 object-cover border border-[#C9982A]/30"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#B20D02]/10 border border-[#B20D02]/20 flex items-center justify-center text-[#B20D02] font-sans font-bold text-sm shrink-0">
                          {r.name[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-[#222C35] font-sans font-bold text-sm tracking-wider">{r.name}</p>
                        <Stars count={r.stars} />
                      </div>
                    </div>
                    <p className="text-[#222C35]/60 text-sm leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          </div>

          <ScrollReveal>
            <div className="text-center mt-10 flex flex-wrap gap-6 justify-center">
              <a
                href="https://restaurantguru.it/Delizie-della-Certosa-Certosa-di-Pavia/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#222C35]/40 hover:text-[#C9982A] text-xs font-sans tracking-widest uppercase transition-colors"
              >
                Restaurant Guru →
              </a>
              <a
                href="https://www.tripadvisor.it/Restaurant_Review-g1238536-d17605838-Reviews-Delizie_della_Certosa-Certosa_di_Pavia_Province_of_Pavia_Lombardy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#222C35]/40 hover:text-[#C9982A] text-xs font-sans tracking-widest uppercase transition-colors"
              >
                TripAdvisor →
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CORTILE EVENTI
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Text block */}
          <ScrollReveal>
            <div className="bg-[#F7F1E8] border border-[#C9982A]/20 rounded-2xl p-8 md:p-10 relative overflow-hidden mb-10">
              {/* Gold corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-[#C9982A] border-r-transparent" />
              <div className="md:grid md:grid-cols-2 md:gap-10 md:items-center">
                <div>
                  <p className="font-script text-[#C9982A] text-3xl mb-3">Il tuo evento, il nostro spazio</p>
                  <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-4xl mb-6">
                    Cortile da 600m²
                  </h2>
                  <div className="w-12 h-0.5 bg-[#C9982A] mb-6 rounded-full" />
                  <p className="text-[#222C35]/65 leading-relaxed mb-6 text-[15px]">
                    Un cortile esclusivo da 600 metri quadrati per i tuoi eventi all&apos;aperto.
                    Matrimoni, cerimonie, compleanni, cene aziendali — noi pensiamo a tutto.
                  </p>
                </div>
                <div>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Catering artigianale con torta inclusa',
                      'Allestimento personalizzato',
                      'Dolci e pasticcini siciliani',
                      'Capacità fino a 150 persone',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#222C35]/65 text-sm">
                        <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/catering-ed-eventi"
                    className="inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-7 py-3.5 rounded-full font-sans font-bold tracking-widest uppercase text-xs hover:bg-[#B20D02]/90 hover:shadow-lg transition-all"
                  >
                    Richiedi Informazioni
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Gallery slider */}
          <ScrollReveal delay={150}>
            <GallerySlider images={cortiloImages} />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DOVE SIAMO
      ══════════════════════════════════════ */}
      <section className="py-14 md:py-28 bg-[#F7F1E8]" id="dove-siamo">
        <div className="max-w-7xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Vieni a trovarci</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl mb-5">
                Dove Siamo
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9982A]" />
                <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9982A]" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
            <ScrollReveal direction="left">
              <div className="w-full h-80 md:h-[400px] overflow-hidden rounded-2xl border border-[#222C35]/10">
                <iframe
                  title="Delizie della Certosa - Via Volta 4, Certosa di Pavia"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2799.8!2d9.1456!3d45.2564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Volta+4%2C+27012+Certosa+di+Pavia+PV!5e0!3m2!1sit!2sit!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://share.google/6YEpDPXKFmJpOiou7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-[#C9982A] text-xs font-sans tracking-widest uppercase hover:underline"
              >
                Apri in Google Maps →
              </a>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100}>
              <div className="space-y-5">
                <div>
                  <h3 className="font-sans font-bold tracking-widest uppercase text-[#222C35]/50 text-[10px] mb-3">Indirizzo</h3>
                  <p className="text-[#222C35]/70 text-sm">Via Volta 4<br />27012 Certosa di Pavia (PV)</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINALE
      ══════════════════════════════════════ */}
      <section className="py-12 md:py-24 bg-[#B20D02] text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-[#FDFEFC]/5 -skew-x-12 -translate-x-1/4 pointer-events-none" />
        <ScrollReveal>
          <div className="relative z-10">
            <p className="font-script text-[#FDFEFC]/70 text-3xl mb-3">Non aspettare</p>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-4xl md:text-5xl mb-6">
              Vieni o Ordina Ora
            </h2>
            <p className="text-[#FDFEFC]/75 max-w-xl mx-auto mb-8 text-[15px]">
              Ogni giorno dalle 5:30. Ordina via WhatsApp, passa in negozio o chiama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.link/8kwj8i"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#FDFEFC] text-[#B20D02] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/90 hover:shadow-lg transition-all"
              >
                Ordina su WhatsApp
              </a>
              <a
                href="tel:+390382147278"
                className="inline-flex items-center justify-center border-2 border-[#FDFEFC]/50 text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-semibold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/10 hover:border-[#FDFEFC] transition-all"
              >
                0382 1472 728
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}
