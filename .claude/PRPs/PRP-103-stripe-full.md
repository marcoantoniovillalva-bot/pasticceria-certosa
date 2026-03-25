# PRP-103: Stripe Full Integration (Subscriptions + Events + Webhook)

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Stripe completo: abbonamenti premium + checkout eventi one-time + webhook con routing per tipo + billing portal.

---

## Architettura

```
/api/stripe/checkout          → Subscription (premium)
/api/stripe/event-checkout    → One-time payment (eventi)
/api/stripe/webhook           → Routing per metadata.type
/api/stripe/billing-portal    → Gestione abbonamento (cancel, update)
```

---

## Modello Dati

```sql
-- Su profiles
ALTER TABLE profiles ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN tier TEXT DEFAULT 'free'; -- 'free' | 'premium'
ALTER TABLE profiles ADD COLUMN subscription_id TEXT;

-- Tabella eventi booking
CREATE TABLE event_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  payment_intent_id TEXT,
  credit_used INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own bookings" ON event_bookings FOR SELECT USING (auth.uid() = user_id);
```

---

## Blueprint de Implementacion

### Fase 1: Setup Stripe
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_PREMIUM_PRICE_ID=price_...
```

### Fase 2: Webhook con metadata routing
```typescript
// /api/stripe/webhook/route.ts
const event = stripe.webhooks.constructEvent(body, sig, secret)

if (event.type === 'checkout.session.completed') {
  const session = event.data.object

  if (session.metadata?.type === 'event') {
    // Insert event_booking, deduct credit_used
  } else {
    // Update profiles SET tier='premium', subscription_id=...
  }
}
```

### Fase 3: Fix race condition checkout
```typescript
// Quando ?success=true: polling con retry ogni 2s (max 40s)
// Il webhook potrebbe arrivare dopo il redirect
useEffect(() => {
  if (searchParams.get('success')) {
    const poll = setInterval(async () => {
      await refreshProfile()
      if (profile?.tier === 'premium') clearInterval(poll)
    }, 2000)
    setTimeout(() => clearInterval(poll), 40000) // max 40s
  }
}, [])
```

### Fase 4: Billing Portal
```typescript
// Richiede Customer Portal abilitato in Stripe Dashboard
export async function createBillingPortalSession(customerId: string) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profilo`,
  })
}
```

---

## Aprendizajes (Auto-Blindaje)

### Race condition webhook vs redirect
- **Error**: Utente viene reindirizzato a ?success=true ma il webhook non e ancora arrivato → profilo ancora free
- **Fix**: Polling ogni 2s per max 40s fino a quando tier diventa premium
- **Aplicar en**: Qualsiasi checkout Stripe con redirect

### Billing Portal richiede setup manuale
- **Error**: createBillingPortalSession lancia errore "No configuration provided"
- **Fix**: Abilitare Customer Portal in Stripe Dashboard → Settings → Billing → Customer portal
- **Aplicar en**: Tutti i progetti con cancel subscription

### metadata.type per routing webhook
- **Error**: Un solo webhook gestisce tutto → difficile distinguere abbonamenti da one-time payments
- **Fix**: Passare metadata: { type: 'event' | 'subscription' } nel checkout e fare routing nel webhook
- **Aplicar en**: Qualsiasi progetto con piu tipi di pagamento Stripe
