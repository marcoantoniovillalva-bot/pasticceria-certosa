# PRP-102: Google OAuth Custom Flow

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Google OAuth che mostra "Continua su [tuo-dominio].it" invece di "supabase.co" — esperienza utente professionale senza redirect strani.

---

## Perche NON usare signInWithOAuth di Supabase

Supabase's built-in OAuth mostra "supabase.co" nella finestra di Google → aspetto non professionale e confusion nell'utente.

---

## Flow Corretto

```
/api/auth/google → Google OAuth consent → /api/auth/google/callback → signInWithIdToken → cookie sessione
```

---

## Setup Google Cloud

1. Tipo client: **Web application** (NON Desktop — quella da redirect_uri_mismatch)
2. Redirect URI da registrare:
   - `http://localhost:3010/api/auth/google/callback`
   - `https://www.tuo-dominio.it/api/auth/google/callback`
3. Abilitare provider Google in Supabase con stesso Client ID

---

## Archivos Clave

```
src/app/api/auth/google/route.ts           # Redirect a Google
src/app/api/auth/google/callback/route.ts  # Riceve code → signInWithIdToken
```

---

## Blueprint de Implementacion

### Fase 1: Variabili ambiente
```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_SITE_URL=https://www.tuo-dominio.it
```

### Fase 2: Route /api/auth/google
```typescript
// Costruisce URL OAuth Google e fa redirect
const params = new URLSearchParams({
  client_id: process.env.GOOGLE_CLIENT_ID!,
  redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/google/callback`,
  response_type: 'code',
  scope: 'openid email profile',
  access_type: 'offline',
})
return NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
```

### Fase 3: Route /api/auth/google/callback
```typescript
// 1. Scambia code con token
const tokens = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: ... })
// 2. Usa id_token con Supabase
const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'google',
  token: tokens.id_token,
})
// 3. Redirect a /dashboard
```

### Fase 4: Pulsante login
```typescript
// CORRETTO — non usare signInWithOAuth
window.location.href = '/api/auth/google'

// SBAGLIATO — mostra supabase.co
supabase.auth.signInWithOAuth({ provider: 'google' })
```

---

## Aprendizajes (Auto-Blindaje)

### redirect_uri_mismatch
- **Error**: Usare tipo client "Desktop" in Google Cloud
- **Fix**: Usare tipo "Web application" — solo questo supporta redirect URI HTTP/HTTPS
- **Aplicar en**: Qualsiasi OAuth setup con Google Cloud

### Supabase deve avere stesso Client ID
- **Error**: signInWithIdToken fallisce se Supabase non conosce il Client ID
- **Fix**: Abilitare provider Google in Supabase Dashboard con esatto stesso Client ID usato nell'app
- **Aplicar en**: Tutti i progetti con Google OAuth
