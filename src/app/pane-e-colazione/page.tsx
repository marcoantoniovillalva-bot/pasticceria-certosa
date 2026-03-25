import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Panificio a Certosa di Pavia — Pane Artigianale — Delizie della Certosa',
  description:
    'Pane artigianale fresco ogni mattina a Certosa di Pavia. Apriamo alle 5:30. Colazione completa, cornetti caldi e prodotti da forno artigianali.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/pane-e-colazione' },
}

export default function PanePage() {
  return (
    <main>
      <section className="relative min-h-[60vh] flex items-center justify-center bg-[#222C35] pt-20">
        <div className="absolute inset-0 opacity-20">
          <Image src="/images/pane.jpg" alt="" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[#222C35]/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-script text-[#C9982A] text-3xl mb-3">Fresco ogni mattina</p>
          <h1 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-5xl md:text-7xl mb-4">
            Pane & Colazione
          </h1>
          <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-6 rounded-full" />
          <p className="text-[#FDFEFC]/70 text-lg max-w-xl mx-auto">
            Il profumo del pane appena sfornato dal panificio di Certosa di Pavia.
            Ogni giorno dalle 5:30.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#FDFEFC]">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Dal forno alla tavola</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">
                I Nostri Prodotti
              </h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🥖', title: 'Pane Fresco', desc: 'Cotto ogni mattina con farine selezionate.' },
              { icon: '🥐', title: 'Cornetti', desc: 'Fragranti, caldi, vuoti o ripieni.' },
              { icon: '🍞', title: 'Pane Speciale', desc: 'Integrale, ai cereali, con semi.' },
              { icon: '🥨', title: 'Prodotti Salati', desc: 'Focacce, schiacciate e rosette.' },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 80}>
                <div className="text-center p-6 border border-[#222C35]/10 rounded-2xl hover:border-[#C9982A]/30 transition-colors">
                  <div className="text-4xl mb-3">{p.icon}</div>
                  <h3 className="font-sans font-bold tracking-wider uppercase text-[#222C35] text-sm mb-2">{p.title}</h3>
                  <p className="text-[#222C35]/50 text-xs leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#222C35] text-center">
        <ScrollReveal>
          <p className="font-script text-[#C9982A] text-3xl mb-3">Il tuo panificio di fiducia</p>
          <h2 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-3xl mb-6">
            Via Volta 4, Certosa di Pavia
          </h2>
          <p className="text-[#FDFEFC]/60 mb-8">Apriamo alle <strong className="text-[#FDFEFC]">5:30</strong> — ogni giorno.</p>
          <a
            href="tel:+390382147278"
            className="inline-flex items-center justify-center bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 transition-colors"
          >
            Chiama: 0382 1472 728
          </a>
        </ScrollReveal>
      </section>
    </main>
  )
}
