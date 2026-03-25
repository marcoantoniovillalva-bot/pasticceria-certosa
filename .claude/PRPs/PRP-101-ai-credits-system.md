# PRP-101: AI Credits System

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Sistema completo de crediti AI per tier (Free/Premium) con reset mensile automatico, anti race-condition e UI realtime.

---

## Comportamento

- Free: 50 cr/mese | Premium: 300 cr/mese
- Auto-reset ogni 30 giorni dall'ultima reset
- Costi per azione: chat=2, vision=5, image_fast=8, image_hd=20, bg_removal=10, bg_generation=15
- Optimistic lock anti race-condition su concurrent AI calls
- Realtime sync multi-device via Supabase subscription
- 401 per utenti non loggati
- refreshProfile() dopo ogni AI call per sync UI
- Admin: grantBonusAiCredits(), resetUserAiCredits()

---

## Modelo de Datos

```sql
-- Aggiungere a tabella profiles
ALTER TABLE profiles ADD COLUMN ai_credits_used INT DEFAULT 0;
ALTER TABLE profiles ADD COLUMN ai_credits_reset_at TIMESTAMPTZ DEFAULT NOW();

-- Limiti per tier (gestiti nel codice)
-- free_tier: 50 credits/mese
-- premium_tier: 300 credits/mese
```

---

## Archivos Clave

```
src/lib/ai-credits.ts           # checkAndDeductCredits(userId, action)
src/components/AiCreditsBar.tsx # UI bar (compact + full)
src/hooks/useUserProfile.ts     # Subscription realtime su profiles
src/features/admin/actions/admin.ts  # resetUserAiCredits(), grantBonusAiCredits()
```

---

## Blueprint de Implementacion

### Fase 1: DB Schema
- ALTER TABLE profiles con ai_credits_used e ai_credits_reset_at
- Nessuna tabella separata — tutto su profiles per semplicita

### Fase 2: Helper checkAndDeductCredits
```typescript
// src/lib/ai-credits.ts
export async function checkAndDeductCredits(userId: string, action: AiAction) {
  const cost = CREDIT_COSTS[action]

  // 1. Fetch profilo con optimistic lock
  // 2. Check se serve reset mensile (> 30gg da reset_at)
  // 3. Check crediti disponibili (usati < limite tier)
  // 4. UPDATE atomico con WHERE ai_credits_used = :current (anti race-condition)
  // 5. Se UPDATE colpisce 0 righe → retry (qualcun altro ha aggiornato)
  // 6. Return { allowed: boolean, remaining: number }
}

const CREDIT_COSTS = {
  chat: 2,
  vision: 5,
  image_fast: 8,
  image_hd: 20,
  bg_removal: 10,
  bg_generation: 15,
}
```

### Fase 3: UI AiCreditsBar
- Barra compatta per header (mostra X/Y crediti)
- Versione full per pagina profilo
- Colore: verde > 50%, giallo 20-50%, rosso < 20%

### Fase 4: Realtime sync
```typescript
// In useUserProfile
supabase
  .channel('profile-credits')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
    payload => setProfile(payload.new))
  .subscribe()
```

### Fase 5: Admin controls
- Badge "✦ X cr AI" per ogni utente in admin dashboard
- Pulsante + (bonus crediti) con input amount
- Pulsante ↺ (reset mensile manuale)

---

## Aprendizajes (Auto-Blindaje)

### Race-condition su concurrent calls
- **Error**: Due richieste AI simultanee possono entrambe leggere credits=10, entrambe scalare, risultato: -crediti
- **Fix**: UPDATE atomico con WHERE ai_credits_used = :current_value. Se 0 righe colpite → refetch e retry
- **Aplicar en**: Qualsiasi sistema di contatori/balance con scritture concorrenti

### DALL-E 3 aspect ratio
- **Error**: Passare ratio 2:3 direttamente — DALL-E accetta solo dimensioni specifiche
- **Fix**: 2:3 → 1024x1792, 3:2 → 1792x1024, 1:1 → 1024x1024
- **Aplicar en**: Qualsiasi integrazione DALL-E 3

### refreshProfile() obbligatorio dopo AI call
- **Error**: UI mostra crediti vecchi dopo una generazione AI
- **Fix**: Chiamare refreshProfile() nel finally{} di ogni server action AI
- **Aplicar en**: Tutte le server actions che deducono crediti
