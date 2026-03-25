# PRP-107: AI Image Pipeline (DALL-E 3 + Replicate Flux + BG Removal)

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Pipeline completo per generazione e editing immagini AI: DALL-E 3 HD per qualita, Replicate Flux per velocita, rimozione sfondo con Bria RMBG 2.0.

---

## Stack

- OpenAI DALL-E 3 (image_hd: 20 crediti)
- Replicate flux-schnell (image_fast: 8 crediti)
- Replicate bria/remove-background RMBG 2.0 (bg_removal: 10 crediti)
- Replicate flux-dev con reference image (bg_generation: 15 crediti)

---

## Routing per Tier/Velocita

```typescript
// Premium o quando serve qualita massima
const hdImage = await generateWithDALLE3(prompt, aspectRatio)

// Free o quando serve velocita
const fastImage = await generateWithFlux(prompt)
```

---

## Blueprint de Implementacion

### Fase 1: DALL-E 3 con aspect ratio corretto
```typescript
// IMPORTANTE: DALL-E 3 accetta solo queste dimensioni
const DALLE_SIZES = {
  '1:1': '1024x1024',
  '2:3': '1024x1792',   // Portrait
  '3:2': '1792x1024',   // Landscape
} as const

const response = await openai.images.generate({
  model: 'dall-e-3',
  prompt,
  size: DALLE_SIZES[aspectRatio],
  quality: 'hd',
  n: 1,
})
```

### Fase 2: Replicate Flux (fast)
```typescript
// /api/image/generate/route.ts
const output = await replicate.run('black-forest-labs/flux-schnell', {
  input: { prompt, num_outputs: 1, aspect_ratio: '1:1' }
})
// output e un array di URL
```

### Fase 3: Background Removal (Bria RMBG 2.0)
```typescript
// /api/image/remove-bg/route.ts
const output = await replicate.run('851-labs/background-remover', {
  input: { image: imageUrl }
})
// Restituisce immagine con sfondo trasparente (PNG)
```

### Fase 4: Editor immagine (pagina)
```
/projects/[id]/edit-image/[imgId]/page.tsx
Features:
- Canvas con zoom e undo
- Toggle rimozione sfondo (10 cr)
- Generazione nuovo sfondo AI (15 cr)
- Resize soggetto
- Salva: replace originale o salva come nuova immagine
```

---

## Download Immagine (pattern corretto)

```typescript
// SBAGLIATO: anchor href diretto (CORS block su URL esterni)
<a href={imageUrl} download>

// CORRETTO: fetch come blob poi download
const blob = await fetch(imageUrl).then(r => r.blob())
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'image.png'
a.click()
URL.revokeObjectURL(url)
```

---

## Aprendizajes (Auto-Blindaje)

### DALL-E 3 dimensioni non standard
- **Error**: Passare '2:3' o '16:9' direttamente a DALL-E 3
- **Fix**: Mappare sempre a dimensioni accettate: 1024x1024, 1024x1792, 1792x1024
- **Aplicar en**: Qualsiasi integrazione DALL-E 3

### Download con fetch blob
- **Error**: Link diretto a URL Replicate/OpenAI bloccato da CORS nel download
- **Fix**: Fetch come blob, creare object URL temporaneo per download
- **Aplicar en**: Download di qualsiasi immagine da URL esterno
