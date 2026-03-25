# PRP-106: Realtime Multi-Device (Supabase Realtime)

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Sync in tempo reale su piu dispositivi simultaneamente: events, bookings, profilo utente, crediti AI — tutto aggiornato senza refresh.

---

## Pattern Base

```typescript
useEffect(() => {
  const channel = supabase
    .channel('table-changes')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'nome_tabella' },
      payload => {
        // Aggiorna stato locale
        if (payload.eventType === 'INSERT') setItems(prev => [...prev, payload.new])
        if (payload.eventType === 'UPDATE') setItems(prev => prev.map(i => i.id === payload.new.id ? payload.new : i))
        if (payload.eventType === 'DELETE') setItems(prev => prev.filter(i => i.id !== payload.old.id))
      }
    )
    .subscribe()

  return () => { supabase.removeChannel(channel) }
}, [])
```

---

## Pattern per Profilo Utente (crediti AI)

```typescript
// Filtrare per singolo utente — non ascoltare tutti i profili
.on('postgres_changes',
  {
    event: 'UPDATE',
    schema: 'public',
    table: 'profiles',
    filter: `id=eq.${userId}`   // IMPORTANTE: filtrare per utente
  },
  payload => setProfile(payload.new as Profile)
)
```

---

## Realtime Multi-Tabella nello stesso hook

```typescript
const channel = supabase
  .channel('multi-table')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'events' },
    payload => handleEventsChange(payload))
  .on('postgres_changes', { event: '*', schema: 'public', table: 'event_bookings' },
    payload => handleBookingsChange(payload))
  .subscribe()
```

---

## Notifica Promozione Admin (pattern speciale)

```typescript
// Notifica quando is_admin diventa true sul proprio profilo
.on('postgres_changes',
  { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` },
  payload => {
    if (payload.new.is_admin && !payload.old.is_admin) {
      toast.success('Sei stato promosso admin!')
    }
  }
)
```

---

## Aprendizajes (Auto-Blindaje)

### Dimenticare removeChannel nel cleanup
- **Error**: Memory leak e subscriptions duplicate dopo navigazione
- **Fix**: SEMPRE return () => { supabase.removeChannel(channel) } nell'useEffect
- **Aplicar en**: Tutti gli useEffect con Supabase realtime

### Filter obbligatorio per tabelle grandi
- **Error**: Ascoltare tutti i cambiamenti su profiles manda aggiornamenti per ogni utente
- **Fix**: Usare filter: `id=eq.${userId}` per limitare a righe rilevanti
- **Aplicar en**: Tabelle con molti utenti (profiles, orders, ecc.)
