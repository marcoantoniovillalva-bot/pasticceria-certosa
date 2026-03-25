import type { Metadata } from 'next'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Contatti — Delizie della Certosa, Via Volta 4 Certosa di Pavia',
  description:
    'Trova Delizie della Certosa a Via Volta 4, 27012 Certosa di Pavia. Tel: 0382 1472728. Aperto dalle 5:30. Ordina su WhatsApp o contattaci per informazioni.',
  alternates: { canonical: 'https://www.deliziedellacertosa.it/contatti' },
}

export default function ContattiPage() {
  return (
    <main className="pt-20">
      <section className="bg-[#F7F1E8] py-12 md:py-20 text-center">
        <p className="font-script text-[#C9982A] text-3xl mb-3">Vieni a trovarci</p>
        <h1 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-5xl md:text-6xl mb-4">
          Contatti
        </h1>
        <div className="w-16 h-0.5 bg-[#B20D02] mx-auto rounded-full" />
      </section>

      <section className="py-10 md:py-16 bg-[#FDFEFC]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
          <ScrollReveal direction="left">
            <div className="w-full h-96 overflow-hidden">
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
              className="mt-3 inline-flex items-center gap-1 text-[#B20D02] text-sm hover:underline"
            >
              Apri in Google Maps →
            </a>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={100}>
            <address className="not-italic space-y-8">
              <div>
                <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-sm mb-3 border-b border-[#222C35]/10 pb-2">
                  Indirizzo
                </h2>
                <p className="text-[#222C35]/70 leading-relaxed">
                  Via Volta 4<br />
                  27012 Certosa di Pavia (PV)<br />
                  Lombardia, Italia
                </p>
              </div>
              <div>
                <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-sm mb-3 border-b border-[#222C35]/10 pb-2">
                  Telefono
                </h2>
                <a href="tel:+390382147278" className="block text-[#222C35]/70 hover:text-[#B20D02] transition-colors">
                  0382 1472 728
                </a>
                <a href="tel:+393486722438" className="block text-[#222C35]/70 hover:text-[#B20D02] transition-colors">
                  348 672 2438
                </a>
              </div>
              <div>
                <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-sm mb-3 border-b border-[#222C35]/10 pb-2">
                  Email & WhatsApp
                </h2>
                <a href="mailto:robivetri64@gmail.com" className="block text-[#222C35]/70 hover:text-[#B20D02] transition-colors">
                  robivetri64@gmail.com
                </a>
                <a href="https://wa.link/8kwj8i" target="_blank" rel="noopener noreferrer" className="block text-[#222C35]/70 hover:text-[#B20D02] transition-colors">
                  WhatsApp Business → wa.link/8kwj8i
                </a>
              </div>
              <div>
                <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-sm mb-3 border-b border-[#222C35]/10 pb-2">
                  Orari di Apertura
                </h2>
                <table className="w-full text-sm text-[#222C35]/70">
                  <tbody>
                    {[
                      ['Lunedì', '5:30 – 14:00'],
                      ['Martedì', '5:30 – 14:00 · 15:30 – 20:00'],
                      ['Mercoledì', '5:30 – 14:00 · 15:30 – 21:00'],
                      ['Giovedì', '5:30 – 14:00 · 15:30 – 21:00'],
                      ['Venerdì', '5:30 – 14:00 · 15:30 – 21:00'],
                      ['Sabato', '5:30 – 14:00 · 15:30 – 21:00'],
                      ['Domenica', '5:30 – 14:00'],
                    ].map(([day, hours]) => (
                      <tr key={day} className="border-b border-[#222C35]/5 last:border-0">
                        <td className="py-1.5 font-semibold text-[#222C35]/50 w-28">{day}</td>
                        <td className="py-1.5">{hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.link/8kwj8i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-[#25D366] text-white py-3 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#1ebe5d] transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="tel:+390382147278"
                  className="flex-1 text-center bg-[#B20D02] text-[#FDFEFC] py-3 rounded-full font-sans font-bold tracking-widest uppercase text-sm hover:bg-[#B20D02]/90 transition-colors"
                >
                  Chiama
                </a>
              </div>
            </address>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
