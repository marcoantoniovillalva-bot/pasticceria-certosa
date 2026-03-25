import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'
import GallerySlider from '@/components/GallerySlider'

export const metadata: Metadata = {
  title: 'Catering ed Eventi a Certosa di Pavia — Cortile 600m² — Delizie della Certosa',
  description:
    'Cortile esclusivo da 600m² per eventi all\'aperto a Certosa di Pavia. Catering per matrimoni, cerimonie e feste private. Zero competitor nell\'area.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/catering-ed-eventi' },
}

const servizi = [
  { icon: '💍', title: 'Matrimoni', desc: 'Il giorno più bello della vostra vita, nel nostro spazio esclusivo. Catering artigianale e torta nuziale inclusi.' },
  { icon: '🎓', title: 'Cerimonie', desc: 'Lauree, comunioni, cresime e battesimi. Ambienti eleganti e cibo artigianale per ogni ricorrenza.' },
  { icon: '🎂', title: 'Compleanni & Feste', desc: 'Grandi feste di compleanno, anniversari, feste di classe. Spazio, cibo e torta personalizzata.' },
  { icon: '🏢', title: 'Aziendali', desc: 'Cene aziendali, aperitivi di gala, team building. Catering professionale per clienti esigenti.' },
]

export default function CateringPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-black pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/eventi-speciali.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="font-script text-[#C9982A] text-3xl mb-3">Il tuo evento da sogno</p>
          <h1 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-5xl md:text-7xl mb-4">
            Catering & Eventi
          </h1>
          <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-6 rounded-full" />
          <div className="inline-block bg-[#B20D02] px-8 py-4 mb-6 rounded-xl">
            <span className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-4xl md:text-6xl">600 m²</span>
            <p className="text-[#FDFEFC]/80 text-sm tracking-widest uppercase mt-1">di cortile esclusivo</p>
          </div>
          <p className="text-[#FDFEFC]/70 text-lg max-w-xl mx-auto mb-8">
            L&apos;unico spazio con cortile privato da 600m² per eventi all&apos;aperto
            nell&apos;area di Certosa di Pavia. Zero competitor per questa tipologia di servizio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 transition-colors"
            >
              Richiedi Preventivo
            </a>
            <a
              href="mailto:robivetri64@gmail.com"
              className="inline-flex items-center justify-center border-2 border-[#FDFEFC] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/10 transition-colors"
            >
              Scrivi per Email
            </a>
          </div>
        </div>
      </section>

      {/* SERVIZI */}
      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Per ogni occasione</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">
                I Nostri Servizi
              </h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {servizi.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <div className="flex gap-5 p-6 border border-[#222C35]/10 rounded-2xl hover:border-[#C9982A]/30 transition-colors">
                  <div className="text-4xl shrink-0">{s.icon}</div>
                  <div>
                    <h3 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-base mb-2">{s.title}</h3>
                    <p className="text-[#222C35]/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDE */}
      <section className="py-14 md:py-24 bg-[#F7F1E8]">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Tutto incluso</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">
                Cosa Comprende
              </h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '✓ Cortile privato da 600m² allestito su misura',
              '✓ Catering artigianale con prodotti freschi',
              '✓ Torta personalizzata per l\'occasione',
              '✓ Antipasti e dolci siciliani',
              '✓ Servizio professionale dedicato',
              '✓ Flessibilità su orari e allestimento',
              '✓ Menù concordato in anticipo',
              '✓ Possibilità di catering esterno con solo affitto spazio',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 py-3 border-b border-[#222C35]/10 last:border-0">
                <span className="text-[#C9982A] font-bold mt-0.5">✓</span>
                <p className="text-[#222C35]/70 text-sm">{item.replace('✓ ', '')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERIA */}
      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Scorci del nostro spazio</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">Galleria</h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <GallerySlider images={[
            { src: '/images/giostre-bambini.jpg', alt: 'Giostre per bambini - Cortile Delizie della Certosa' },
            { src: '/images/eventi-speciali.jpg', alt: 'Eventi speciali - Cortile Delizie della Certosa' },
            { src: '/images/calci-in-culo.jpg', alt: 'Intrattenimento eventi - Cortile Delizie della Certosa' },
            { src: '/images/gonfiabile.jpg', alt: 'Gonfiabile per bambini - Cortile Delizie della Certosa' },
          ]} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-[#B20D02] text-center">
        <ScrollReveal>
          <p className="font-script text-[#FDFEFC]/80 text-3xl mb-3">Prenota il tuo spazio</p>
          <h2 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-3xl md:text-5xl mb-6">
            Contattaci per un Preventivo
          </h2>
          <p className="text-[#FDFEFC]/80 max-w-xl mx-auto mb-8">
            Ogni evento è unico. Contattaci per discutere le tue esigenze e ricevere un preventivo personalizzato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#FDFEFC] text-[#B20D02] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/90 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="mailto:robivetri64@gmail.com"
              className="inline-flex items-center justify-center border-2 border-[#FDFEFC] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/10 transition-colors"
            >
              robivetri64@gmail.com
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
