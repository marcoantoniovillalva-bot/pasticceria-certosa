# PRP-112: Apify Lead Scraping & Enrichment

**Estado:** COMPLETADO (battle-tested en ProspectBot)
**Origen:** Extraido de produccion — ProspectBot

---

## Quando usarlo

**SI** — SaaS di lead generation, CRM, prospecting tool
**SI** — quando hai bisogno di dati strutturati da Google Maps, Instagram, LinkedIn
**SI** — pipeline di enrichment automatico per prospect
**NO** — per scraping semplice di una singola pagina — usa fetch/cheerio
**NO** — se il sito target ha API ufficiali — usale invece

---

## Obiettivo

Wrapper attorno alle Apify Actor per scraping strutturato con polling asincrono. Run actor → poll status → fetch risultati.

---

## Stack

- Apify Cloud (account free tier: 5$/mese di compute gratuito)
- `apify-client` npm package
- Actor disponibili: Google Places, Instagram scraper, website analyzer

---

## Dipendenza

```bash
npm install apify-client
```

---

## Variabili ambiente

```env
APIFY_API_TOKEN=apify_api_...
```

---

## Implementazione

### src/lib/apify.ts

```typescript
import { ApifyClient } from 'apify-client'

const client = new ApifyClient({ token: process.env.APIFY_API_TOKEN })

// Pattern: Run → Poll (ogni 3s, max 60 retry) → Fetch dataset
export async function runApifyActor<T = unknown>(
  actorId: string,
  input: Record<string, unknown>,
  maxRetries = 60
): Promise<T[]> {
  // 1. Avvia actor
  const run = await client.actor(actorId).call(input, { waitForFinish: 0 })

  // 2. Poll status
  let attempts = 0
  while (attempts < maxRetries) {
    await new Promise(resolve => setTimeout(resolve, 3000))

    const runInfo = await client.run(run.id).get()

    if (runInfo?.status === 'SUCCEEDED') {
      // 3. Fetch risultati
      const { items } = await client.dataset(runInfo.defaultDatasetId).listItems()
      return items as T[]
    }

    if (runInfo?.status === 'FAILED' || runInfo?.status === 'ABORTED') {
      throw new Error(`Apify actor fallito: ${runInfo.status}`)
    }

    attempts++
  }

  throw new Error('Apify actor timeout dopo 3 minuti')
}
```

### Actor: Google Maps / Google Places
```typescript
export interface GooglePlaceResult {
  title: string
  address: string
  phone: string
  website: string
  rating: number
  reviewsCount: number
  categoryName: string
  location: { lat: number; lng: number }
}

export async function searchGooglePlaces(query: string, location: string, maxResults = 20) {
  return runApifyActor<GooglePlaceResult>(
    'compass/crawler-google-places',
    {
      searchStringsArray: [query],
      locationQuery: location,
      maxCrawledPlacesPerSearch: maxResults,
      language: 'it',
    }
  )
}
```

### Actor: Instagram Profile
```typescript
export interface InstagramProfile {
  username: string
  fullName: string
  biography: string
  followersCount: number
  followsCount: number
  postsCount: number
  profilePicUrl: string
}

export async function scrapeInstagramProfile(username: string) {
  const results = await runApifyActor<InstagramProfile>(
    'apify/instagram-scraper',
    { directUrls: [`https://www.instagram.com/${username}/`], resultsType: 'details' }
  )
  return results[0] ?? null
}
```

### Actor: Website Analyzer
```typescript
export interface WebsiteAnalysis {
  url: string
  title: string
  description: string
  technologies: string[]
  contactInfo: { email?: string; phone?: string }
  socialLinks: Record<string, string>
}

export async function analyzeWebsite(url: string) {
  const results = await runApifyActor<WebsiteAnalysis>(
    'apify/website-content-crawler',
    { startUrls: [{ url }], maxCrawlPages: 3 }
  )
  return results
}
```

### Route API di esempio
```typescript
// src/app/api/ricerca/route.ts
export async function POST(request: Request) {
  const { query, location, maxResults } = await request.json()

  const places = await searchGooglePlaces(query, location, maxResults)

  // Salva i risultati su Supabase
  await supabase.from('prospects').insert(
    places.map(p => ({
      user_id: userId,
      nome: p.title,
      indirizzo: p.address,
      telefono: p.phone,
      sito_web: p.website,
      rating: p.rating,
    }))
  )

  return Response.json({ count: places.length })
}
```

---

## Scoring AI dei prospect

Dopo il fetch, usa Claude o Groq per punteggio automatico:

```typescript
async function scoreProspect(prospect: GooglePlaceResult): Promise<number> {
  const prompt = `
    Assegna un punteggio da 1 a 10 a questo prospect per digital marketing:
    Nome: ${prospect.title}
    Categoria: ${prospect.categoryName}
    Rating: ${prospect.rating} (${prospect.reviewsCount} recensioni)
    Sito web: ${prospect.website ? 'Sì' : 'No'}

    Rispondi solo con il numero.
  `
  const score = await generateWithFallback({ systemPrompt: '', userMessage: prompt })
  return parseInt(score.trim()) || 5
}
```

---

## Aprendizajes (Auto-Blindaje)

### Actor ID cambia tra versioni Apify
- **Error**: `compass/crawler-google-places` potrebbe essere deprecato — ID cambia
- **Fix**: Verificare sempre gli actor ID nel marketplace Apify prima di usarli
- **Aplicar en**: Qualsiasi integrazione Apify — non hardcodare senza verificare

### waitForFinish: 0 è obbligatorio con polling manuale
- **Error**: Usare `waitForFinish: 300` blocca la route per 5 minuti
- **Fix**: `waitForFinish: 0` per risposta immediata + polling separato
- **Aplicar en**: Tutti i run Apify in contesti HTTP con timeout

### Rate limit free tier: 5$/mese compute
- **Error**: Actor costosi (es. Instagram full scrape) esauriscono il budget in pochi run
- **Fix**: Limitare maxResults, usare actor leggeri per test, monitorare usage nella dashboard Apify
- **Aplicar en**: Qualsiasi progetto con Apify su piano free
