# PRP-111: Automation Engine con Scheduler Cadenzato

**Estado:** COMPLETADO (battle-tested en Marketizzati)
**Origen:** Extraido de produccion — marketizzati.it

---

## Quando usarlo

**SI** — SaaS con workflow automatici ricorrenti (follow-up, reminder, report settimanali)
**SI** — CRM, portali clienti, project management tool
**SI** — quando vuoi che il sistema "faccia cose" senza che l'utente le triggeri
**NO** — app semplice senza logica temporale — overkill
**NO** — se bastano i cron job di Supabase o Vercel — non serve un engine custom

---

## Obiettivo

Sistema event-driven che orchestra automazioni a cicli configurabili. Ogni automazione ha una cadenza (giorni), un contesto (dati del workspace) e side effects (notifiche, task, aggiornamenti DB).

---

## Concetti chiave

- **Automazione**: Un workflow con nome, cadenza in giorni, funzione di esecuzione
- **Contesto**: Snapshot dei dati rilevanti passato all'automazione
- **Side effects**: Cosa fa l'automazione (crea task, manda notifica, aggiorna status)
- **Last run tracking**: DB traccia quando ogni automazione è stata eseguita per ogni utente

---

## Schema DB

```sql
CREATE TABLE automation_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  automation_name TEXT NOT NULL,
  last_run_at TIMESTAMPTZ DEFAULT NOW(),
  next_run_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, automation_name)
);
ALTER TABLE automation_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users own runs" ON automation_runs FOR ALL USING (auth.uid() = user_id);
```

---

## Implementazione

### src/lib/automation-engine.ts
```typescript
export interface AutomationContext {
  userId: string
  // Aggiungi dati specifici del tuo dominio
  workspace?: Record<string, unknown>
}

export interface Automation {
  name: string
  cadenceDays: number  // Ogni quanti giorni eseguire
  execute: (context: AutomationContext) => Promise<AutomationSideEffect[]>
}

export interface AutomationSideEffect {
  type: 'create_task' | 'send_notification' | 'update_status' | 'send_email'
  payload: Record<string, unknown>
}

// Registro delle automazioni disponibili
export const AUTOMATIONS: Automation[] = [
  {
    name: 'weekly_review',
    cadenceDays: 7,
    execute: async (ctx) => {
      // Logica per il review settimanale
      return [{ type: 'create_task', payload: { title: 'Review settimanale', userId: ctx.userId } }]
    },
  },
  {
    name: 'post_call_followup',
    cadenceDays: 2,
    execute: async (ctx) => {
      return [{ type: 'send_notification', payload: { message: 'Ricorda il follow-up!', userId: ctx.userId } }]
    },
  },
  {
    name: 'asset_reminder',
    cadenceDays: 3,
    execute: async (ctx) => {
      return [{ type: 'send_email', payload: { template: 'asset_reminder', to: ctx.userId } }]
    },
  },
]

// Engine: controlla quali automazioni sono scadute e le esegue
export async function runDueAutomations(userId: string, context: AutomationContext) {
  const supabase = await createClient()
  const now = new Date()
  const results: AutomationSideEffect[] = []

  for (const automation of AUTOMATIONS) {
    // Recupera ultimo run
    const { data: run } = await supabase
      .from('automation_runs')
      .select('last_run_at')
      .eq('user_id', userId)
      .eq('automation_name', automation.name)
      .single()

    const lastRun = run?.last_run_at ? new Date(run.last_run_at) : new Date(0)
    const daysSinceLastRun = (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60 * 24)

    if (daysSinceLastRun >= automation.cadenceDays) {
      // Esegui automazione
      const effects = await automation.execute(context)
      results.push(...effects)

      // Aggiorna last_run_at
      await supabase.from('automation_runs').upsert({
        user_id: userId,
        automation_name: automation.name,
        last_run_at: now.toISOString(),
        next_run_at: new Date(now.getTime() + automation.cadenceDays * 86400000).toISOString(),
      }, { onConflict: 'user_id,automation_name' })
    }
  }

  return results
}
```

### Trigger: in un Server Action o API route
```typescript
// Chiamato quando l'utente apre la dashboard/portal
// Controlla se ci sono automazioni scadute e le esegue
export async function checkAndRunAutomations(userId: string) {
  const context: AutomationContext = {
    userId,
    workspace: await fetchWorkspaceSnapshot(userId),
  }
  const effects = await runDueAutomations(userId, context)
  await applySideEffects(effects)
}
```

### Applica i side effects
```typescript
async function applySideEffects(effects: AutomationSideEffect[]) {
  for (const effect of effects) {
    switch (effect.type) {
      case 'create_task':
        await supabase.from('tasks').insert(effect.payload)
        break
      case 'send_notification':
        await pushToUser(effect.payload.userId as string, effect.payload)
        break
      case 'send_email':
        await sendEmail(effect.payload)
        break
    }
  }
}
```

---

## Pattern avanzato: Portal Snapshot (fetch atomico)

Invece di N query separate, un'unica chiamata per tutto il contesto:

```typescript
async function fetchWorkspaceSnapshot(userId: string) {
  const [workspace, tasks, assets] = await Promise.all([
    supabase.from('workspaces').select('*').eq('user_id', userId).single(),
    supabase.from('tasks').select('*').eq('user_id', userId),
    supabase.from('assets').select('*').eq('user_id', userId),
  ])
  return { workspace: workspace.data, tasks: tasks.data, assets: assets.data }
}
```

---

## Aprendizajes (Auto-Blindaje)

### Non eseguire automazioni in ogni request
- **Error**: Chiamare runDueAutomations() ad ogni page load causa N+1 queries
- **Fix**: Chiamare solo all'apertura del portal/dashboard, non su ogni navigazione
- **Aplicar en**: Qualsiasi sistema di check periodico lato client

### upsert con onConflict per evitare duplicati
- **Error**: Insert fallisce se l'automazione è già nel DB (unique constraint)
- **Fix**: Usare `.upsert({ ... }, { onConflict: 'user_id,automation_name' })`
- **Aplicar en**: Tutti i pattern "insert or update" su Supabase
