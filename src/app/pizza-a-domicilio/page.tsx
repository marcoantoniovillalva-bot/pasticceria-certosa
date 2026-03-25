import type { Metadata } from 'next'
import Image from 'next/image'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Pizza a Domicilio a Certosa di Pavia — Delizie della Certosa',
  description:
    'Pizze farcitissime con ingredienti di qualità. Consegna puntuale a Certosa di Pavia e dintorni. Ordina su WhatsApp.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/pizza-a-domicilio' },
}

const aree = [
  'Certosa di Pavia', 'Giussago', 'Bornasco', 'Lardirago',
  'Trivolzio', 'Vellezzo Bellini', 'Bereguardo', 'Borgarello',
]

const pizze = [
  { name: 'Margherita', ingredienti: 'Pomodoro, mozzarella' },
  { name: 'Affumicata', ingredienti: 'Pomodoro, mozzarella, spezie, spek' },
  { name: 'Americana', ingredienti: 'Pomodoro, mozzarella, salame piccante' },
  { name: 'California', ingredienti: 'Pomodoro, mozzarella, salame piccante, mais' },
  { name: 'Delizia Certosa', ingredienti: 'Pomodoro, mozzarella, rucola, crudo' },
  { name: 'Roby', ingredienti: 'Pomodoro, mozzarella, patatine, spezie' },
  { name: 'Via Volta', ingredienti: 'Pomodoro, mozzarella, zucchine, mais' },
  { name: 'Mary', ingredienti: 'Mozzarella, mortadella, pepe nero, pistacchio' },
  { name: 'Tony', ingredienti: 'Pomodoro, mozzarella, noci, speck' },
  { name: 'Annuzza', ingredienti: 'Pomodoro, mozzarella, rucola, scaglie di grana' },
  { name: 'Vegana', ingredienti: 'Pomodoro, verdure grigliate' },
  { name: 'Tonno', ingredienti: 'Pomodoro, mozzarella, tonno, cipolla' },
  { name: 'Salsiccia e Friarielli', ingredienti: 'Pomodoro, mozzarella, salsiccia, friarielli' },
  { name: 'Torre del Mangano', ingredienti: 'Pomodoro, mozzarella, dolce cotto, mais' },
  { name: 'Marinara', ingredienti: 'Pomodoro, aglio, olio' },
  { name: 'Tirolese', ingredienti: 'Pomodoro, mozzarella, speck, wurstel' },
  { name: 'Tarantella', ingredienti: 'Pomodoro, mozzarella, salsa, olive nere' },
  { name: 'Maremonti', ingredienti: 'Pomodoro, mozzarella bufala, fagiolini, alici' },
  { name: 'Brigantina', ingredienti: 'Mozzarella, peperoni, zucchine, ricotta' },
  { name: 'Brenda & Karol', ingredienti: 'Pomodoro, mozzarella, patate rosse' },
]

export default function PizzaPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <Image src="/images/pizza.webp" alt="Pizza a domicilio Certosa di Pavia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#222C35]/70" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-script text-[#C9982A] text-3xl mb-3">Consegna a domicilio</p>
          <h1 className="font-sans font-bold tracking-widest uppercase text-[#FDFEFC] text-5xl md:text-7xl mb-4">
            Pizza a Domicilio
          </h1>
          <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-6 rounded-full" />
          <p className="text-[#FDFEFC]/80 text-xl max-w-xl mx-auto mb-8">
            Pizze farcitissime, ingredienti freschi, consegna puntuale.
            A Certosa di Pavia e comuni limitrofi.
          </p>
          <a
            href="https://wa.link/8kwj8i"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 transition-colors"
          >
            Ordina Ora su WhatsApp
          </a>
        </div>
      </section>

      {/* PERCHE NOI */}
      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Qualità garantita</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">
                Perché Sceglierci
              </h2>
              <div className="w-16 h-0.5 bg-[#C9982A] mx-auto rounded-full" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🍕', title: 'Farcitissime', desc: 'Ingredienti abbondanti e di qualità. Ogni pizza è un pasto completo.' },
              { icon: '⚡', title: 'Puntualità', desc: 'Rispettiamo i tempi di consegna. La pizza arriva calda e croccante.' },
              { icon: '💰', title: 'Qualità/Prezzo', desc: 'Il miglior rapporto qualità-prezzo della zona. Lo dicono i nostri clienti.' },
            ].map((i, idx) => (
              <ScrollReveal key={i.title} delay={idx * 100}>
                <div className="text-center p-8 border border-[#222C35]/10 rounded-2xl hover:border-[#C9982A]/30 transition-colors">
                  <div className="text-5xl mb-4">{i.icon}</div>
                  <h3 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">{i.title}</h3>
                  <p className="text-[#222C35]/60 leading-relaxed">{i.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CATALOGO PIZZE */}
      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="font-script text-[#C9982A] text-3xl mb-2">Tutte le nostre varianti</p>
              <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-5xl mb-5">
                Le Nostre Pizze
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9982A]" />
                <div className="w-1.5 h-1.5 bg-[#C9982A] rotate-45" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9982A]" />
              </div>
              <p className="text-[#222C35]/50 text-sm max-w-lg mx-auto">
                Disponibili in formato <span className="text-[#B20D02] font-semibold">rotonda</span> o <span className="text-[#B20D02] font-semibold">familiare</span> · anche con farine integrali
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {pizze.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 35}>
                <div className="group relative bg-[#FDFEFC] border border-[#222C35]/8 hover:border-[#C9982A]/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-md cursor-default overflow-hidden">
                  {/* Icon */}
                  <div className="w-7 h-7 rounded-full bg-[#B20D02]/10 border border-[#B20D02]/20 flex items-center justify-center mb-3">
                    <span className="text-sm">🍕</span>
                  </div>
                  <h3 className="font-sans font-bold text-[#222C35] tracking-wide text-sm md:text-base mb-2 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-[#222C35]/45 text-xs leading-relaxed font-sans">
                    {p.ingredienti}
                  </p>
                  {/* Bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9982A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Info badges */}
          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
              {[
                { icon: '🕕', text: 'Aperto lun–sab dalle 18:30 alle 21:00' },
                { icon: '🌾', text: 'Disponibile anche con farine integrali' },
                { icon: '🎁', text: 'Ordina 3 pizze: bibita grande in omaggio' },
              ].map((b) => (
                <span key={b.text} className="flex items-center gap-2 bg-[#222C35]/5 border border-[#222C35]/10 text-[#222C35]/70 px-4 py-2.5 rounded-full text-xs font-sans tracking-wide">
                  <span>{b.icon}</span>
                  {b.text}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={300}>
            <div className="text-center mt-10">
              <a
                href="https://wa.link/8kwj8i"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 hover:scale-105 hover:shadow-lg hover:shadow-[#B20D02]/30 transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.559 4.118 1.535 5.847L.057 23.882l6.188-1.623A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.36-.213-3.724.977.995-3.638-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Ordina su WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* RECENSIONE */}
      <section className="py-14 md:py-24 bg-[#222C35]">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="relative w-full md:w-64 h-64 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/reviews/pizza-montalbano.jpg"
                  alt="Pizza Delizie della Certosa - Recensione Dany Montalbano"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-[#FDFEFC] text-xl md:text-2xl italic leading-relaxed mb-4">
                  &ldquo;Cercavo da mesi una buona pizza a domicilio a Certosa di Pavia..
                  FINALMENTE pizze farcitissime, qualità, puntualità e prezzo TUTTO AL TOP! Complimenti&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/reviews/dany-montalbano.jpg"
                    alt="Dany Montalbano"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <p className="text-[#FDFEFC]/70 font-sans font-bold tracking-widest uppercase text-sm">
                    Dany Montalbano · Cliente verificato
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* AREA CONSEGNA */}
      <section className="py-14 md:py-24 bg-[#FDFEFC]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <p className="font-script text-[#C9982A] text-3xl mb-2">Dove consegniamo</p>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-4xl mb-4">
              Area di Consegna
            </h2>
            <div className="w-16 h-0.5 bg-[#C9982A] mx-auto mb-8 rounded-full" />
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {aree.map((area) => (
                <span key={area} className="bg-[#222C35]/5 border border-[#222C35]/10 text-[#222C35] px-4 py-2 rounded-full font-sans text-sm tracking-wide">
                  📍 {area}
                </span>
              ))}
            </div>
            <p className="text-[#222C35]/60 mb-8">
              Non sei sicuro se consegniamo nella tua zona? Scrivici su WhatsApp!
            </p>
            <a
              href="https://wa.link/8kwj8i"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#B20D02] text-[#FDFEFC] px-8 py-4 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 transition-colors"
            >
              Ordina su WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
