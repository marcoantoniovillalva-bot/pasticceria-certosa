-- ============================================================
-- Demo Schema: demo_pasticceria certosa
-- Isolato da public (Marketizzati) — sicuro da droppare dopo
-- ============================================================

CREATE SCHEMA IF NOT EXISTS demo_pasticceria certosa;

-- Abilita RLS sullo schema demo
ALTER DEFAULT PRIVILEGES IN SCHEMA demo_pasticceria certosa
  GRANT ALL ON TABLES TO anon, authenticated;

-- Imposta search_path per le funzioni
SET search_path TO demo_pasticceria certosa, public;

-- ✅ Aggiungi le tue tabelle qui sotto
-- Esempio:
-- CREATE TABLE demo_pasticceria certosa.profiles (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   email TEXT UNIQUE NOT NULL,
--   created_at TIMESTAMPTZ DEFAULT NOW()
-- );
