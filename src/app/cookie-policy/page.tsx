import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy — Delizie della Certosa',
  description: 'Informativa sull\'utilizzo dei cookie sul sito di Delizie della Certosa — Certosa di Pavia.',
  robots: { index: false },
}

export default function CookiePolicyPage() {
  return (
    <main className="pt-24 pb-16 bg-[#FDFEFC]">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-4xl mb-2">
          Cookie Policy
        </h1>
        <p className="text-[#222C35]/50 text-sm mb-8">Aggiornata: marzo 2026</p>

        <div className="text-[#222C35]/70 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">Cosa sono i Cookie</h2>
            <p>
              I cookie sono piccoli file di testo che vengono salvati sul tuo dispositivo (computer, tablet, smartphone)
              quando visiti un sito web. Servono a far funzionare il sito correttamente, ricordare le tue preferenze
              e raccogliere informazioni statistiche anonime sull&apos;utilizzo del sito.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">Cookie che Utilizziamo</h2>

            <div className="space-y-4">
              <div className="border border-[#222C35]/10 p-4">
                <h3 className="font-sans font-bold tracking-wider uppercase text-[#222C35] text-sm mb-2">
                  🔒 Cookie Tecnici (Necessari)
                </h3>
                <p className="mb-2">Essenziali per il funzionamento del sito. Non richiedono consenso (Art. 122, D.Lgs. 196/2003).</p>
                <table className="w-full text-xs mt-2">
                  <thead>
                    <tr className="text-[#222C35]/40 border-b border-[#222C35]/10">
                      <th className="text-left py-1">Nome</th>
                      <th className="text-left py-1">Scopo</th>
                      <th className="text-left py-1">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#222C35]/5">
                      <td className="py-1.5 font-mono">cookie_consent</td>
                      <td className="py-1.5">Memorizza la tua preferenza sui cookie</td>
                      <td className="py-1.5">1 anno</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border border-[#222C35]/10 p-4">
                <h3 className="font-sans font-bold tracking-wider uppercase text-[#222C35] text-sm mb-2">
                  📊 Cookie Analitici (Con consenso)
                </h3>
                <p className="mb-2">
                  Utilizzati per analizzare come i visitatori usano il sito, in forma anonima/aggregata.
                  Attivati solo dopo il tuo consenso esplicito.
                </p>
                <table className="w-full text-xs mt-2">
                  <thead>
                    <tr className="text-[#222C35]/40 border-b border-[#222C35]/10">
                      <th className="text-left py-1">Servizio</th>
                      <th className="text-left py-1">Scopo</th>
                      <th className="text-left py-1">Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#222C35]/5">
                      <td className="py-1.5">Google Analytics 4</td>
                      <td className="py-1.5">Statistiche di traffico anonime</td>
                      <td className="py-1.5">14 mesi</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-2 text-xs text-[#222C35]/50">
                  Google Analytics è configurato con anonimizzazione IP. Privacy Policy Google:{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">policies.google.com/privacy</a>
                </p>
              </div>

              <div className="border border-[#222C35]/10 p-4">
                <h3 className="font-sans font-bold tracking-wider uppercase text-[#222C35] text-sm mb-2">
                  🗺️ Cookie di Terze Parti (Google Maps)
                </h3>
                <p>
                  La mappa Google incorporata nella pagina Contatti può impostare cookie di terze parti (Google).
                  Questi sono soggetti alla{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">Privacy Policy di Google</a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">Come Gestire i Cookie</h2>
            <p className="mb-4">
              Puoi gestire le tue preferenze sui cookie in qualsiasi momento tramite il banner presente sul sito.
              Puoi anche disabilitare i cookie tramite le impostazioni del tuo browser:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/it-it/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">Microsoft Edge</a></li>
            </ul>
            <p className="mt-4 text-[#222C35]/50 text-xs">
              Nota: disabilitare i cookie tecnici può compromettere il corretto funzionamento del sito.
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">Contatti</h2>
            <p>
              Per qualsiasi domanda sui cookie, contatta il titolare del trattamento:<br />
              Roberto Vetri — Delizie della Certosa<br />
              Email: <a href="mailto:robivetri64@gmail.com" className="text-[#B20D02]">robivetri64@gmail.com</a>
            </p>
            <p className="mt-3">
              Consulta anche la nostra{' '}
              <Link href="/privacy-policy" className="text-[#B20D02] hover:underline">Privacy Policy</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
