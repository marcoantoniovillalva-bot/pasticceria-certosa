# PRP-109: Web Terminal via SSE (Server-Sent Events)

**Estado:** COMPLETADO (battle-tested en ProspectBot)
**Origen:** Extraido de produccion — ProspectBot

---

## Quando usarlo

**SI** — admin dashboard con operazioni CLI (deploy, migrations, script)
**SI** — tool interno per sviluppatori o power users
**SI** — quando vuoi mostrare output di processi in tempo reale
**NO** — per utenti normali consumer — troppo tecnico e rischio sicurezza
**NO** — se bastano i log in una textarea — non serve xterm.js

---

## Obiettivo

Terminal emulator nel browser con output streaming in tempo reale. Bash shell reale lato server, output via SSE, UI con xterm.js.

---

## Stack

- `@xterm/xterm` + `@xterm/addon-fit` — terminal UI nel browser
- Server-Sent Events (ReadableStream nativo Next.js)
- `child_process.spawn` lato server
- `global.shellSessionsMap` per mantenere processi vivi tra richieste

---

## Schema generale

```
Browser (xterm.js) → POST /api/terminal/input → Server (bash process)
Server (bash process stdout) → GET /api/terminal/stream → Browser (xterm.js)
```

---

## Implementazione

### Dipendenze
```bash
npm install @xterm/xterm @xterm/addon-fit
```

### src/app/api/terminal/route.ts
```typescript
import { spawn } from 'child_process'

// Session map globale — persiste tra richieste HTTP
declare global {
  var shellSessionsMap: Map<string, ReturnType<typeof spawn>>
}
global.shellSessionsMap ??= new Map()

// GET /api/terminal?sessionId=xxx — stream SSE
export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get('sessionId') ?? 'default'

  const stream = new ReadableStream({
    start(controller) {
      // Crea nuova shell bash per questa sessione
      const shell = spawn('bash', [], { env: process.env })
      global.shellSessionsMap.set(sessionId, shell)

      shell.stdout.on('data', (data: Buffer) => {
        controller.enqueue(`data: ${JSON.stringify({ output: data.toString() })}\n\n`)
      })

      shell.stderr.on('data', (data: Buffer) => {
        controller.enqueue(`data: ${JSON.stringify({ output: data.toString() })}\n\n`)
      })

      shell.on('close', () => {
        controller.enqueue(`data: ${JSON.stringify({ closed: true })}\n\n`)
        controller.close()
        global.shellSessionsMap.delete(sessionId)
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

// POST /api/terminal — invia comando
export async function POST(request: Request) {
  const { sessionId, command } = await request.json()
  const shell = global.shellSessionsMap.get(sessionId ?? 'default')

  if (!shell) return Response.json({ error: 'Sessione non trovata' }, { status: 404 })

  shell.stdin.write(command + '\n')
  return Response.json({ ok: true })
}
```

### src/components/WebTerminal.tsx
```typescript
'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

export function WebTerminal({ sessionId = 'default' }: { sessionId?: string }) {
  const termRef = useRef<HTMLDivElement>(null)
  const term = useRef<Terminal>()

  useEffect(() => {
    if (!termRef.current) return

    term.current = new Terminal({ theme: { background: '#1a1a1a' }, fontSize: 14 })
    const fitAddon = new FitAddon()
    term.current.loadAddon(fitAddon)
    term.current.open(termRef.current)
    fitAddon.fit()

    // Connetti SSE stream
    const es = new EventSource(`/api/terminal?sessionId=${sessionId}`)
    es.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.output) term.current?.write(data.output)
    }

    // Invia input al server
    let inputBuffer = ''
    term.current.onData((data) => {
      inputBuffer += data
      term.current?.write(data)
      if (data === '\r') {
        fetch('/api/terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, command: inputBuffer.trim() }),
        })
        inputBuffer = ''
      }
    })

    return () => { es.close(); term.current?.dispose() }
  }, [sessionId])

  return <div ref={termRef} className="h-96 w-full rounded-lg overflow-hidden" />
}
```

---

## Sicurezza — OBBLIGATORIO

```typescript
// SEMPRE proteggere la route con auth admin
// src/app/api/terminal/route.ts
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user?.id).single()

  if (!profile?.is_admin) {
    return new Response('Unauthorized', { status: 401 })
  }
  // ... resto della logica
}
```

---

## Aprendizajes (Auto-Blindaje)

### global.shellSessionsMap si resetta a ogni hot reload in dev
- **Error**: In dev mode, Next.js ricarica i moduli e perde la Map — shell orfane
- **Fix**: `global.shellSessionsMap ??= new Map()` (nullish assignment evita reset)
- **Aplicar en**: Qualsiasi stato globale in Next.js API routes

### Shell non termina dopo chiusura browser
- **Error**: Processo bash rimane in memoria se il client si disconnette senza cleanup
- **Fix**: Ascoltare `request.signal.aborted` e fare `shell.kill()` nel cleanup
- **Aplicar en**: Tutti i processi spawn con SSE
