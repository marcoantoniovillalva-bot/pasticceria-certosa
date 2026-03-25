import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-ardesia text-cream/80">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Image
            src="/images/logo.png"
            alt="Delizie della Certosa"
            width={140}
            height={56}
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm leading-relaxed text-cream/60">
            Roberto vi accoglie con il sorriso, pronto a deliziarvi con un buon caffè,
            farvi assaggiare un pasticcino irresistibile e preparare la pizza perfetta
            per una serata davvero speciale.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.facebook.com/Deliziedellacertora"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-cream/60 hover:text-rosso transition-colors rounded-full"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-sans font-700 tracking-widest uppercase text-cream text-sm mb-5">
            Esplora
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              ['/', 'Home'],
              ['/pasticceria', 'Pasticceria'],
              ['/torte-personalizzate', 'Torte Personalizzate'],
              ['/dolci-siciliani', 'Dolci Siciliani'],
              ['/pizza-a-domicilio', 'Pizza a Domicilio'],
              ['/catering-ed-eventi', 'Catering & Eventi'],
              ['/contatti', 'Contatti'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-cream/60 hover:text-rosso transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-sans font-700 tracking-widest uppercase text-cream text-sm mb-5">
            Contatti
          </h3>
          <address className="not-italic text-sm text-cream/60 space-y-3">
            <p className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-rosso" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              Via Volta 4, 27012 Certosa di Pavia (PV)
            </p>
            <p className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-rosso" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>
                <a href="tel:+390382147278" className="hover:text-rosso transition-colors block">0382 1472 728</a>
                <a href="tel:+393486722438" className="hover:text-rosso transition-colors block">348 672 2438</a>
              </span>
            </p>
            <p className="flex gap-2">
              <svg className="w-4 h-4 mt-0.5 shrink-0 text-rosso" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <a href="mailto:robivetri64@gmail.com" className="hover:text-rosso transition-colors">
                robivetri64@gmail.com
              </a>
            </p>
          </address>
        </div>

        {/* Orari */}
        <div>
          <h3 className="font-sans font-700 tracking-widest uppercase text-cream text-sm mb-5">
            Orari
          </h3>
          <table className="text-xs text-cream/60 w-full">
            <tbody>
              {[
                ['Lunedì', '5:30 – 14:00'],
                ['Martedì', '5:30 – 14:00 · 15:30 – 20:00'],
                ['Mer – Ven', '5:30 – 14:00 · 15:30 – 21:00'],
                ['Sabato', '5:30 – 14:00 · 15:30 – 21:00'],
                ['Domenica', '5:30 – 14:00'],
              ].map(([day, hours]) => (
                <tr key={day} className="border-b border-cream/10 last:border-0">
                  <td className="py-1.5 font-semibold text-cream/40 w-20 shrink-0">{day}</td>
                  <td className="py-1.5">{hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
          <p>© {new Date().getFullYear()} Delizie della Certosa — Roberto Vetri. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-rosso transition-colors">Privacy Policy</Link>
            <Link href="/cookie-policy" className="hover:text-rosso transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
