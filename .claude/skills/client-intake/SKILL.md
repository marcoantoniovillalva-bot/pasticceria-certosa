---
name: client-intake
description: Raccolta strutturata di tutti i materiali e informazioni necessarie prima di iniziare qualsiasi progetto cliente. Fa domande in ordine logico, estrae info da URL/siti esistenti, raccoglie logo/immagini/palette/social/recensioni/chiavi API, e genera CLIENT_BRIEF.md come fonte di verità per tutti gli altri skill.
argument-hint: "[nome cliente o URL sito esistente]"
user-invocable: true
---

# Client Intake Skill

## Scopo

Prima di implementare QUALSIASI cosa per un cliente, questo skill raccoglie tutto il necessario in una conversazione guidata. Il risultato è un file `CLIENT_BRIEF.md` che tutti gli altri skill useranno come contesto.

**Regola d'oro:** Non iniziare mai a costruire senza aver completato l'intake. Un'ora di raccolta materiali evita settimane di revisioni.

---

## Come Eseguire Questo Skill

Conduci una conversazione in fasi progressive. Non fare tutte le domande insieme — una fase alla volta, aspetta le risposte prima di procedere.

---

## FASE 0 — Leggi i Materiali Esistenti (PRIMA DI TUTTO)

**Controlla sempre se esiste la cartella `_materiali/` nella root del progetto.**

```
Glob: _materiali/**/*
```

Se esiste:
1. Leggi tutti i file `.txt`, `.md` presenti — estraggono info già pronte
2. Annota le immagini presenti (logo, foto, ecc.) — le userai come riferimento
3. Se c'è un URL nel brief, esegui WebFetch per analizzare il sito
4. Costruisci un pre-brief con tutto quello che hai trovato
5. Mostra all'utente: *"Ho trovato i materiali in `_materiali/`. Ecco quello che ho estratto — confermami se è corretto o aggiungi quello che manca:"*

```
✅ Trovato:
- Nome: [estratto]
- Settore: [estratto]
- Colori: [estratto]
- Social: [estratto]
- ...

❓ Manca ancora:
- [lista campi non trovati]
```

Poi vai direttamente alle fasi con i campi **mancanti** — non richiedere info già fornite.

**Se `_materiali/` non esiste:**
- Suggerisci di crearla: *"Puoi mettere logo, foto e un file brief.txt in una cartella `_materiali/` per velocizzare il processo — oppure procediamo con le domande."*
- Procedi comunque con la Fase 1

---

## FASE 1 — Analisi Iniziale

Solo se non trovato nei materiali:

```
"Prima di iniziare, ho bisogno di raccogliere tutto il necessario.
Hai già un sito web o profilo online del cliente che posso analizzare?"
```

**Se fornisce URL:**
- Usa WebFetch per analizzare il sito
- Estrai: nome azienda, descrizione, servizi, colori dominanti, tone of voice, contatti, social links presenti
- Riassumi quello che hai trovato e chiedi conferma: "Ho trovato queste informazioni, confermano?"

**Se non ha URL:**
- Procedi direttamente con le domande

---

## FASE 2 — Informazioni Business

Chiedi in un unico messaggio (non uno alla volta):

```
Perfetto. Dimmi tutto sull'azienda:

1. **Nome azienda** e settore di attività
2. **Descrizione** in 2-3 righe (cosa fanno, per chi)
3. **Target audience** — chi è il cliente ideale? (età, professione, problema che risolve)
4. **Città/zona** di operatività (locale, nazionale, internazionale?)
5. **USP** — cosa li differenzia dai competitor?
6. **Tono di voce** preferito: formale, amichevole, tecnico, aspirazionale?
```

---

## FASE 3 — Materiali Visivi

```
Ora i materiali visivi. Condividi tutto quello che hai:

📁 **Logo** — file (PNG/SVG con sfondo trasparente preferito) o URL
🖼️ **Immagini** — foto del team, prodotti, sede, lavori svolti
🎨 **Palette colori** — codici HEX se ce li hanno, oppure descrivi ("blu scuro e oro")
✒️ **Font** — usano già un font specifico? (es. Montserrat, Playfair Display)

Se non hanno materiali, dimmi "niente" e andiamo avanti.
```

**Se fornisce immagini/logo:**
- Analizza visivamente il logo se è un'immagine
- Estrai colori dominanti
- Nota lo stile: minimale, moderno, classico, playful, corporate
- Suggerisci palette complementare se mancano colori secondari

**Se non ha palette:**
```
"Nessun problema. Basandomi sul logo/settore, suggerisco questa palette:
- Primario: #XXXXXX
- Secondario: #XXXXXX
- Accent: #XXXXXX
- Background: #XXXXXX
- Testo: #XXXXXX

Vuoi usarla o preferisci qualcosa di diverso?"
```

---

## FASE 4 — Presenza Online & Social

```
Link ai profili social e presenza online:

- 🌐 Sito web attuale (se esiste)
- 📘 Facebook:
- 📸 Instagram:
- 💼 LinkedIn:
- 🎥 YouTube/TikTok:
- 📍 Google Business Profile (link alla scheda):
- ⭐ Hanno recensioni Google? Quante stelle? Puoi condividere le migliori 3?
```

**Se fornisce Google Business URL:**
- Estrai con WebFetch: rating, numero recensioni, orari, indirizzo, categorie

**Se fornisce recensioni testuali:**
- Salvale nel brief — sono oro per copy e social proof

---

## FASE 5 — Contenuti & Copy

```
Contenuti che posso usare direttamente:

📝 **Testi esistenti** — hanno già copy per il sito? (anche appunti o brochure)
🏆 **Case study / risultati** — numeri, prima/dopo, clienti famosi
💬 **Testimonianze** — citazioni di clienti soddisfatti (con nome e ruolo se possibile)
❓ **FAQ** — domande frequenti che ricevono
📞 **CTA principale** — cosa deve fare l'utente? (chiama, prenota, acquista, richiedi preventivo)
```

---

## FASE 6 — Requisiti Tecnici & Integrazioni

```
Ora le integrazioni tecniche. Dimmi quali servizi usa o vuole usare:

🗺️ **Google Maps** — vuole una mappa sul sito?
   → Se sì: Google Maps API Key (da Google Cloud Console)

💳 **Pagamenti** — accetta pagamenti online?
   → Se sì: Stripe Publishable Key + Secret Key (o Polar)

📧 **Email marketing** — ha una lista email?
   → Se sì: quale provider? (Mailchimp, Brevo, Resend...)
   → API Key del provider

📊 **Analytics** — vuole tracciare visitatori?
   → Google Analytics 4: Measurement ID (G-XXXXXXXXXX)
   → Google Search Console: accesso verificato?

💬 **Chat/WhatsApp** — vuole chat sul sito?
   → Numero WhatsApp Business o ID widget (Tidio, Crisp...)

📅 **Prenotazioni** — sistema di booking?
   → Calendly URL o altro sistema

🔍 **SEO locale** — ha Google Business Profile?
   → Accesso alla scheda o solo lettura?

📱 **Social feed** — vuole mostrare post Instagram sul sito?
   → Instagram Basic Display API Token

Altri servizi specifici del settore?
```

---

## FASE 7 — Obiettivi & Vincoli

```
Ultime domande prima di iniziare:

🎯 **Obiettivo principale** del progetto:
   [ ] Generare lead/richieste di contatto
   [ ] Vendere prodotti/servizi online
   [ ] Costruire brand awareness
   [ ] Fidelizzare clienti esistenti
   [ ] Altro: ___

📅 **Timeline** — quando deve essere pronto?

💰 **Budget** per servizi terzi (hosting, API, ads) — orientativamente?

🔧 **Gestione autonoma** — il cliente gestirà contenuti da solo?
   → Se sì: serve un CMS semplice (Sanity, Contentful, o sezione admin)

⚠️ **Vincoli** — ci sono cose da NON fare? (colori vietati, competitor da non citare, ecc.)
```

---

## FASE 8 — Generazione CLIENT_BRIEF.md

Dopo aver raccolto tutte le informazioni, genera il file:

```markdown
# CLIENT_BRIEF.md — [Nome Cliente]
*Generato il: [data]*

## Business
- **Nome:**
- **Settore:**
- **Descrizione:**
- **Target:**
- **Zona:**
- **USP:**
- **Tono:**

## Brand
- **Palette:**
  - Primario: #______
  - Secondario: #______
  - Accent: #______
  - Background: #______
  - Testo: #______
- **Font heading:**
- **Font body:**
- **Stile visivo:**
- **Logo:** [path o URL]

## Contenuti
- **Tagline:**
- **CTA principale:**
- **Testimonianze:**
  1. "[citazione]" — Nome, Ruolo
  2. ...
- **Case study / numeri:**
- **FAQ:**

## Presenza Online
- **Sito attuale:**
- **Instagram:**
- **Facebook:**
- **LinkedIn:**
- **YouTube:**
- **Google Business:**
- **Rating Google:** ⭐ X.X (N recensioni)
- **Migliori recensioni:**

## Integrazioni & Chiavi API
- **Google Maps API Key:** `AIza...`
- **Google Analytics ID:** `G-...`
- **Stripe Publishable Key:** `pk_live_...`
- **Stripe Secret Key:** `sk_live_...` ⚠️ solo .env.local
- **Email provider:** [nome] — API Key: `...`
- **WhatsApp:** +39 ...
- **Calendly URL:**
- **Instagram Token:**

## Obiettivi & Vincoli
- **Obiettivo principale:**
- **Timeline:**
- **Budget servizi:**
- **CMS necessario:** Sì / No
- **Vincoli:**

## Note Strategiche
[Osservazioni emerse durante l'intake: opportunità, rischi, suggerimenti]
```

---

## Regole di Condotta

1. **Non chiedere tutto insieme** — una fase alla volta, conversazione naturale
2. **Estrai prima di chiedere** — se ha un sito, analizzalo prima di fare domande
3. **Suggerisci quando mancano dati** — palette, copy, struttura
4. **Mai iniziare a costruire** prima che CLIENT_BRIEF.md sia completo e confermato
5. **Le chiavi API vanno in .env.local** — non nel brief pubblico, o usa placeholder `[DA_CONFIGURARE]`
6. **Conferma finale** — prima di chiudere: "Ho tutto. Vuoi che inizi con [skill X] o preferisci rivedere qualcosa?"

---

## Integrazione con Altri Skill

Dopo il client intake, suggerisci il prossimo passo:

```
"CLIENT_BRIEF.md è pronto. Come vuoi procedere?

→ /website-3d — costruisco la landing page
→ /new-app — definiamo l'architettura del SaaS
→ /brand-building — sviluppiamo l'identità di marca completa
→ /paid-ads — pianifichiamo la campagna ads"
```
