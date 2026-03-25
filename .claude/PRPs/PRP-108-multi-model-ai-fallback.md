# PRP-108: Multi-Model AI Fallback Strategy

**Estado:** COMPLETADO (battle-tested en ProspectBot)
**Origen:** Extraido de produccion — ProspectBot

---

## Quando usarlo

**SI** — quando il progetto dipende criticamente da AI e un downtime di un provider bloccherebbe l'utente
**SI** — quando vuoi ottimizzare i costi (usa modelli economici se quelli premium falliscono)
**NO** — per features AI semplici in un MVP — overkill, aggiungi complessità inutile
**NO** — se usi un solo provider e va bene così

---

## Obiettivo

Chain di fallback automatico tra provider AI: se il primo fallisce, prova il secondo, poi il terzo. Zero interruzioni per l'utente, ottimizzazione costi automatica.

---

## Chain consigliata

```
Claude API (qualità massima)
    ↓ fallisce
OpenAI GPT-4o (qualità alta)
    ↓ fallisce
Groq Llama 3.3 70B (veloce, economico)
    ↓ fallisce
Errore esplicito all'utente
```

---

## Implementazione

### src/lib/ai-fallback.ts

```typescript
import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'
import Groq from 'groq-sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

interface AIRequest {
  systemPrompt: string
  userMessage: string
  maxTokens?: number
}

export async function generateWithFallback(req: AIRequest): Promise<string> {
  // 1. Prova Claude
  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: req.maxTokens ?? 4096,
      messages: [{ role: 'user', content: req.userMessage }],
      system: req.systemPrompt,
    })
    return (response.content[0] as { text: string }).text
  } catch (e) {
    console.warn('Claude fallito, provo OpenAI:', e)
  }

  // 2. Prova OpenAI
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: req.maxTokens ?? 4096,
      messages: [
        { role: 'system', content: req.systemPrompt },
        { role: 'user', content: req.userMessage },
      ],
    })
    return response.choices[0].message.content ?? ''
  } catch (e) {
    console.warn('OpenAI fallito, provo Groq:', e)
  }

  // 3. Prova Groq (ultimo fallback)
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: req.maxTokens ?? 4096,
    messages: [
      { role: 'system', content: req.systemPrompt },
      { role: 'user', content: req.userMessage },
    ],
  })
  return response.choices[0].message.content ?? ''
}
```

### Uso nelle server actions

```typescript
// src/actions/generate.ts
import { generateWithFallback } from '@/lib/ai-fallback'

export async function generateContent(prompt: string) {
  return generateWithFallback({
    systemPrompt: 'Sei un assistente specializzato in...',
    userMessage: prompt,
    maxTokens: 2048,
  })
}
```

---

## Variabili ambiente necessarie

```env
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk_...
```

---

## Aprendizajes (Auto-Blindaje)

### Non fare catch generico senza log
- **Error**: `catch {}` silenzioso — non sai quale provider ha fallito e perché
- **Fix**: `console.warn('Claude fallito:', e)` prima del fallback — mantieni visibilità
- **Aplicar en**: Qualsiasi try/catch in catene di fallback

### Groq ha rate limits bassi su piani free
- **Error**: Groq fallisce anche lui in caso di traffico alto
- **Fix**: Se Groq è il terzo fallback, lancia errore esplicito invece di ritentare — l'utente deve sapere
- **Aplicar en**: Sistemi con traffico > 100 req/min
