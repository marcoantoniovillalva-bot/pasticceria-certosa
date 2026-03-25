# PRP-105: Web Push Notifications (VAPID + Service Worker)

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Notifiche push web cross-platform con VAPID keys, service worker, gestione subscriptions su Supabase e invio server-side con web-push.

---

## Stack

- `web-push` npm package (server-side)
- Service Worker nativo (in Next.js: `public/worker/index.js`)
- next-pwa (disabilitato in dev, attivo in build)
- Supabase tabella push_subscriptions

---

## Schema DB

```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users manage own subscriptions" ON push_subscriptions
  FOR ALL USING (auth.uid() = user_id);
```

---

## Variabili Ambiente

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
VAPID_PRIVATE_KEY=...
VAPID_SUBJECT=mailto:admin@tuo-dominio.it
```

Generare le chiavi:
```bash
npx web-push generate-vapid-keys
```

---

## Blueprint de Implementacion

### Fase 1: Service Worker (public/worker/index.js)
```javascript
self.addEventListener('push', event => {
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/images/logo/isotipo.png',
      data: { url: data.url || '/' },
    })
  )
})

self.addEventListener('notificationclick', event => {
  event.notification.close()
  event.waitUntil(clients.openWindow(event.notification.data.url))
})
```

### Fase 2: API Routes
```typescript
// POST /api/push/subscribe — upsert subscription
// DELETE /api/push/subscribe — rimuovi subscription
```

### Fase 3: Helper server-side (src/lib/webpush.ts)
```typescript
import webpush from 'web-push'

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function pushToUser(userId: string, payload: object) {
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('*')
    .eq('user_id', userId)

  for (const sub of subs ?? []) {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      JSON.stringify(payload)
    ).catch(() => {
      // Sub scaduta — rimuoverla
      supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint)
    })
  }
}

export async function pushToAdmins(payload: object) {
  // Fetch all admin user_ids, poi pushToUser per ognuno
}
```

### Fase 4: Hook client (src/hooks/usePushNotifications.ts)
```typescript
// Chiede permesso, si iscrive, chiama POST /api/push/subscribe
```

---

## Aprendizajes (Auto-Blindaje)

### SW non attivo in dev
- **Error**: Le push non arrivano in sviluppo
- **Fix**: next-pwa disabilitato in dev by design. Testare SOLO con npm run build && npm start
- **Aplicar en**: Tutti i progetti con Service Worker + next-pwa

### Subscription scaduta non rimossa
- **Error**: sendNotification lancia errore 410 Gone ma la sub rimane nel DB
- **Fix**: Nel catch di sendNotification, eliminare la sub dal DB automaticamente
- **Aplicar en**: Qualsiasi sistema push in produzione
