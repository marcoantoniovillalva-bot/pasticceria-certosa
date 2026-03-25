import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Delizie della Certosa',
  description: 'Informativa sulla privacy ai sensi del GDPR e del D.Lgs. 196/2003 — Delizie della Certosa.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <main className="pt-24 pb-16 bg-[#FDFEFC]">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-3xl md:text-4xl mb-2">
          Privacy Policy
        </h1>
        <p className="text-[#222C35]/50 text-sm mb-8">Aggiornata: marzo 2026</p>

        <div className="prose prose-sm max-w-none text-[#222C35]/70 space-y-8">
          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">1. Titolare del Trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è:<br />
              <strong>Roberto Vetri — Delizie della Certosa</strong><br />
              Via Volta 4, 27012 Certosa di Pavia (PV)<br />
              Email: <a href="mailto:robivetri64@gmail.com" className="text-[#B20D02]">robivetri64@gmail.com</a><br />
              Tel: 0382 1472 728
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">2. Dati Raccolti</h2>
            <p>Raccogliamo i seguenti dati:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Dati di navigazione</strong>: indirizzi IP, tipo di browser, pagine visitate, orari di accesso. Raccolti automaticamente dai server.</li>
              <li><strong>Dati analitici</strong>: tramite Google Analytics 4 (con consenso), per analizzare il traffico e migliorare il sito.</li>
              <li><strong>Dati di contatto</strong>: nome, numero di telefono, email, forniti volontariamente tramite WhatsApp o email.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">3. Finalità del Trattamento</h2>
            <p>I dati vengono trattati per:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Rispondere a richieste di informazioni, ordinazioni e preventivi</li>
              <li>Gestire gli ordini e le prenotazioni</li>
              <li>Analizzare l&apos;utilizzo del sito per migliorarne la qualità (solo con consenso)</li>
              <li>Adempiere a obblighi di legge</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">4. Base Giuridica</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Esecuzione di un contratto o misure precontrattuali (Art. 6(1)(b) GDPR)</li>
              <li>Consenso dell&apos;interessato per cookie analitici (Art. 6(1)(a) GDPR)</li>
              <li>Legittimo interesse per dati di navigazione tecnici (Art. 6(1)(f) GDPR)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">5. Conservazione dei Dati</h2>
            <p>
              I dati di contatto vengono conservati per il tempo necessario a gestire la richiesta.
              I dati analitici sono conservati per 14 mesi (impostazione Google Analytics 4).
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">6. Diritti dell&apos;Interessato</h2>
            <p>Ai sensi degli Artt. 15-22 del GDPR, hai il diritto di:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Chiedere la rettifica o cancellazione</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la limitazione del trattamento</li>
              <li>Richiedere la portabilità dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-3">
              Per esercitare i tuoi diritti, scrivi a:{' '}
              <a href="mailto:robivetri64@gmail.com" className="text-[#B20D02]">robivetri64@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">7. Terze Parti</h2>
            <p>Il sito utilizza i seguenti servizi di terze parti:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Google Analytics 4</strong>: analisi del traffico (solo con consenso). Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">policies.google.com/privacy</a></li>
              <li><strong>Google Maps</strong>: visualizzazione mappa. Privacy Policy Google.</li>
              <li><strong>WhatsApp (Meta)</strong>: comunicazione. Dati condivisi solo se l&apos;utente avvia una conversazione.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-sans font-bold tracking-widest uppercase text-[#222C35] text-lg mb-3">8. Reclami</h2>
            <p>
              Hai il diritto di presentare reclamo al Garante per la Protezione dei Dati Personali:
              <br />
              <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#B20D02]">www.garanteprivacy.it</a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
