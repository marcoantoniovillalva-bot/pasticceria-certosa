# PRP-104: Sistema RAG con pgvector

**Estado:** COMPLETADO (battle-tested en Lurumi.it)
**Origen:** Extraido de produccion — lurumi.it

---

## Objetivo

Knowledge base vettorizzata con retrieval semantico: chunking documenti, embeddings OpenAI, ricerca similarita coseno su pgvector.

---

## Stack

- pgvector (estensione PostgreSQL su Supabase)
- OpenAI text-embedding-3-small (1536 dimensioni)
- Groq Llama 3.3 70B per generazione risposta (premium) / Llama 3.1 8B (free)
- Model routing per tier: ottimizzazione costi

---

## Schema DB

```sql
-- Abilitare estensione
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabella chunks
CREATE TABLE knowledge_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES projects(id),
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index per ricerca veloce
CREATE INDEX ON knowledge_chunks
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

ALTER TABLE knowledge_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users see own chunks" ON knowledge_chunks
  FOR ALL USING (auth.uid() = user_id);
```

---

## Blueprint de Implementacion

### Fase 1: Chunking e indicizzazione
```typescript
// Chunk size: 500 tokens con 50 overlap
async function chunkAndEmbed(text: string, userId: string, projectId: string) {
  const chunks = splitIntoChunks(text, 500, 50)

  for (const chunk of chunks) {
    const embedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: chunk,
    })

    await supabase.from('knowledge_chunks').insert({
      user_id: userId,
      project_id: projectId,
      content: chunk,
      embedding: embedding.data[0].embedding,
    })
  }
}
```

### Fase 2: Retrieval semantico
```typescript
// Funzione SQL per similarity search
// Creare in Supabase via migration:
/*
CREATE OR REPLACE FUNCTION match_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  filter_user_id uuid
)
RETURNS TABLE(id uuid, content text, similarity float)
LANGUAGE sql STABLE
AS $$
  SELECT id, content, 1 - (embedding <=> query_embedding) as similarity
  FROM knowledge_chunks
  WHERE user_id = filter_user_id
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
*/

async function retrieveRelevant(query: string, userId: string, topK = 5) {
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  })

  const { data } = await supabase.rpc('match_chunks', {
    query_embedding: queryEmbedding.data[0].embedding,
    match_threshold: 0.7,
    match_count: topK,
    filter_user_id: userId,
  })

  return data
}
```

### Fase 3: Model routing per tier
```typescript
const model = userTier === 'premium'
  ? 'llama-3.3-70b-versatile'   // Premium: piu intelligente
  : 'llama-3.1-8b-instant'       // Free: piu veloce, meno costoso

const response = await groq.chat.completions.create({
  model,
  messages: [
    { role: 'system', content: `Rispondi basandoti su questo contesto:\n${chunks.map(c => c.content).join('\n\n')}` },
    { role: 'user', content: query },
  ],
})
```

---

## Aprendizajes (Auto-Blindaje)

### ivfflat richiede minimo 100 righe per training
- **Error**: Index creation fallisce se la tabella e vuota
- **Fix**: Creare index DOPO aver inserito dati, oppure usare hnsw (non richiede training)
- **Aplicar en**: Qualsiasi setup pgvector in produzione

### match_threshold troppo alto = zero risultati
- **Error**: Threshold 0.9 restituisce 0 chunks anche con query pertinenti
- **Fix**: Iniziare con 0.7, abbassare a 0.6 se troppo pochi risultati
- **Aplicar en**: Tutte le ricerche semantiche pgvector
