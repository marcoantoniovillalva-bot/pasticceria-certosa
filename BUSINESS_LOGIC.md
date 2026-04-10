# BUSINESS_LOGIC.md — Delizie della Certosa

> Sito web per pasticceria, pizzeria e panificio artigianale | Certosa di Pavia (PV), Italia

---

## 1. Problema di Business

**Il contesto:** Un'attività artigianale con tre anime (pasticceria, pizzeria a domicilio, panificio) e un cortile da 600m² per eventi ha bisogno di un sito che mostri tutti i servizi, generi ordini WhatsApp e si posizioni su Google per ricerche locali.

**Obiettivi:**
- Aumentare gli ordini di pizza a domicilio e torte personalizzate
- Posizionarsi per ricerche locali ("pasticceria Certosa di Pavia", "dolci siciliani Pavia")
- Comunicare la storia artigianale e siciliana del brand
- Gestire richieste di catering ed eventi (cortile 600m²)

---

## 2. Soluzione

**Proposta di valore:** Un sito marketing con pagine dedicate per ogni categoria di prodotto/servizio, galleria con slider, elementi decorativi (canvas foglie d'oro), CTA WhatsApp per ordini diretti — ottimizzato per conversione locale e SEO.

**Flusso principale:**
1. Visitatore trova il sito su Google (es. "pizza a domicilio Certosa di Pavia")
2. Homepage con hero visivo e griglia servizi cattura l'interesse
3. Pagina dedicata (es. `/pizza-a-domicilio`) fornisce dettagli e prezzi
4. CTA WhatsApp converte direttamente in ordine o richiesta di info
5. Sezione catering/eventi mostra il cortile per eventi privati

---

## 3. Servizi Offerti

| Servizio | Pagina | Descrizione |
|---|---|---|
| Torte personalizzate | `/torte-personalizzate` | Compleanni, matrimoni, comunioni, lauree |
| Dolci siciliani | `/dolci-siciliani` | Cannoli, cassate, panzerotti artigianali |
| Pizza a domicilio | `/pizza-a-domicilio` | Consegna Certosa di Pavia e dintorni |
| Pasticceria & Caffè | `/pasticceria` | Colazione, pasticcini, caffetteria |
| Pane e colazione | `/pane-e-colazione` | Panificio artigianale |
| Catering ed eventi | `/catering-ed-eventi` | Cortile 600m² per eventi privati |
| Contatti | `/contatti` | Indirizzo, orari, WhatsApp, mappa |

---

## 4. Struttura Pagine

```
/                          → Homepage (hero + griglia servizi + slider galleria)
/torte-personalizzate      → Torte su misura
/dolci-siciliani           → Tradizione siciliana
/pizza-a-domicilio         → Pizza delivery
/pasticceria               → Caffetteria e dolci
/pane-e-colazione          → Panificio
/catering-ed-eventi        → Spazio eventi
/contatti                  → Contatti e orari
/cookie-policy             → GDPR
/privacy-policy            → GDPR
```

---

## 5. Tech Stack

| Layer | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS 3.4 |
| Auth | Supabase SSR (area riservata futura) |
| Immagini | Next.js Image (WebP ottimizzato) |
| Animazioni | ScrollReveal custom + GoldLeafCanvas (canvas decorativo) |
| Galleria | GallerySlider component custom |
| SEO | Metadata API Next.js, canonical URL, JSON-LD LocalBusiness |
| Deployment | Vercel |

---

## 6. Design System

- **Brand:** Caldo, artigianale, siciliano — colori crema, oro, verde oliva
- **Tono:** Tradizione + qualità + famiglia
- **CTA principale:** WhatsApp (ordine diretto, senza frizioni)

---

## 7. KPI di Successo

- Posizionamento per ricerche locali (Certosa di Pavia + tipo prodotto)
- Click su CTA WhatsApp per ordini e preventivi
- Richieste catering mensili
- Core Web Vitals: LCP < 2.5s

---

## 8. Note Sviluppo

- Il sito usa l'URL canonico `https://www.deliziedellacertosa.it`
- `GoldLeafCanvas` è un componente canvas decorativo per effetti visivi sulla homepage
- `GallerySlider` mostra foto dei prodotti con swipe mobile
- Tutte le pagine servizio seguono la stessa struttura: hero + descrizione + galleria + CTA WhatsApp
- Cookie banner conforme GDPR italiano
