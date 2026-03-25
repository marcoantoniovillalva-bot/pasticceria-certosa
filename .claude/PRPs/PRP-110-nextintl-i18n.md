# PRP-110: Multi-Language Routing con next-intl

**Estado:** COMPLETADO (battle-tested en Marketizzati)
**Origen:** Extraido de produccion — marketizzati.it

---

## Quando usarlo

**SI** — SaaS che vuole acquisire clienti in mercati diversi (IT, EN, ES, ecc.)
**SI** — sito vetrina/landing con SEO internazionale
**NO** — MVP o prodotto interno mono-lingua — aggiungi complessità inutile
**NO** — se hai solo 2 lingue e poco contenuto — considera soluzioni più semplici

---

## Obiettivo

Routing multi-lingua SEO-friendly con Next.js App Router. URL strutturati `/it/`, `/en/`, `/es/`. Traduzioni type-safe, switch lingua senza reload.

---

## Stack

- `next-intl` v4+
- App Router con `[locale]` param
- Middleware per redirect automatico alla lingua del browser

---

## Dipendenza

```bash
npm install next-intl
```

---

## Struttura file

```
src/
├── i18n/
│   ├── routing.ts          # Definisce locales e defaultLocale
│   └── request.ts          # Carica messaggi per ogni request
├── messages/
│   ├── it.json             # Traduzioni italiano
│   ├── en.json             # Traduzioni inglese
│   └── es.json             # Traduzioni spagnolo
├── middleware.ts            # Intercetta e redirige per locale
└── app/
    └── [locale]/           # Tutte le route sotto il locale
        ├── layout.tsx
        └── page.tsx
```

---

## Implementazione

### src/i18n/routing.ts
```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['it', 'en', 'es'],
  defaultLocale: 'it',
})
```

### src/middleware.ts
```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
```

### src/i18n/request.ts
```typescript
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as 'it' | 'en' | 'es')) {
    locale = routing.defaultLocale
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

### src/app/[locale]/layout.tsx
```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

### messages/it.json
```json
{
  "nav": { "home": "Home", "servizi": "Servizi", "contatti": "Contatti" },
  "hero": { "title": "Il tuo titolo", "cta": "Inizia ora" }
}
```

### Uso nelle pagine
```typescript
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('hero')
  return <h1>{t('title')}</h1>
}
```

### Language switcher
```typescript
import { useRouter, usePathname } from 'next/navigation'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    // Sostituisce il locale nell'URL corrente
    const newPath = pathname.replace(/^\/(it|en|es)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div>
      {['it', 'en', 'es'].map(locale => (
        <button key={locale} onClick={() => switchLocale(locale)}>
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
```

---

## next.config.ts

```typescript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

export default withNextIntl({
  // resto della config
})
```

---

## Aprendizajes (Auto-Blindaje)

### params è una Promise in Next.js 15+
- **Error**: Destructurare `{ params }` direttamente senza await
- **Fix**: `const { locale } = await params` — i params sono Promise in App Router moderno
- **Aplicar en**: Tutti i layout/page con params dinamici in Next.js 15+

### Middleware matcher deve escludere API e file statici
- **Error**: Il middleware intercetta `/api/` e `/images/` applicando redirect lingua
- **Fix**: `/((?!api|_next|_vercel|.*\\..*).*)` nel matcher
- **Aplicar en**: Qualsiasi middleware Next.js con routing condizionale
