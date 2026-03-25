import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Pasticceria Artigianale a Certosa di Pavia — Delizie della Certosa',
  description:
    'Pasticceria artigianale, caffè e colazione a Certosa di Pavia. Apriamo alle 5:30 ogni giorno con pasticcini freschi, cornetti caldi e prodotti artigianali.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/pasticceria' },
}

export default function PasticceriaPage() {
  return (
    <main>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image src="/images/gallery/torta-11.webp" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-script text-[#C9982A] text-3xl mb-3">Dalle 5:30 ogni giorno</p>
          <h1 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-5xl md:text-7xl mb-4">
            Pasticceria & Caffè
          </h1>
          <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-6 rounded-full" />
          <p className="text-[#FDFEFC]/70 text-lg max-w-xl mx-auto">
            Roberto vi accoglie ogni mattina con un buon caffè e pasticcini irresistibili
            preparati con le sue mani. L&apos;inizio perfetto per la tua giornata.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <ScrollReveal direction="left">
            <Image
              src="/images/gallery/torta-11.webp"
              alt="Pasticceria artigianale Certosa di Pavia - torte e dolci"
              width={600}
              height={500}
              className="w-full h-[260px] md:h-[420px] object-cover rounded-2xl"
            />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={150}>
            <p className="font-script text-[#C9982A] text-3xl mb-3">Artigianale ogni giorno</p>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-4xl mb-6">
              La Nostra Pasticceria
            </h2>
            <div className="w-12 h-0.5 bg-[#C9982A] mb-6 rounded-full" />
            <p className="text-[#222C35]/70 leading-relaxed mb-4">
              Ogni mattina Roberto prepara con cura una selezione di dolci e salati freschi.
              Cornetti appena sfornati, pasticcini della tradizione, mignon colorati e specialità
              siciliane che non troverete da nessun&apos;altra parte nella zona.
            </p>
            <p className="text-[#222C35]/70 leading-relaxed mb-8">
              Accompagnati da un espresso perfetto o da un cappuccino cremoso —
              la colazione da Delizie della Certosa è un rituale che fa venire voglia di tornare.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                ['☕', 'Caffè & Cappuccino'],
                ['🥐', 'Cornetti caldi'],
                ['🍰', 'Pasticcini mignon'],
                ['🍋', 'Specialità siciliane'],
              ].map(([icon, label]) => (
                <div key={label} className="flex items-center gap-2 text-[#222C35]/70 text-sm">
                  <span className="text-xl">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#222C35]/5 p-4 border-l-2 border-[#C9982A]">
              <p className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-xs mb-1">Orario Apertura</p>
              <p className="text-[#222C35]/70 text-sm">Tutti i giorni dalle <strong className="text-[#222C35]">5:30</strong></p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-[#B20D02] text-center">
        <ScrollReveal>
          <p className="font-script text-[#FDFEFC]/80 text-3xl mb-3">Vieni a trovarci</p>
          <h2 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-3xl md:text-4xl mb-6">
            Via Volta 4, Certosa di Pavia
          </h2>
          <p className="text-[#FDFEFC]/80 mb-8">Apriamo alle 5:30 — ogni giorno, senza eccezioni.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390382147278"
              className="inline-flex items-center justify-center bg-[#FDFEFC] text-[#B20D02] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/90 transition-colors"
            >
              Chiama: 0382 1472 728
            </a>
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-[#FDFEFC] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#FDFEFC]/10 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}
