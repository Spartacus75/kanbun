-- Solution temporaire : Désactiver RLS pour tester
-- Une fois que ça marche, on réactivera avec les bonnes policies

-- 1. Drop table et tout recréer
DROP TABLE IF EXISTS subscribers CASCADE;

-- 2. Create table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- 3. Create indexes
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_created_at ON subscribers(created_at DESC);

-- 4. DISABLE RLS temporairement (pour que ça marche)
ALTER TABLE subscribers DISABLE ROW LEVEL SECURITY;

-- Note: Une fois que ça marche, on pourra réactiver RLS avec les bonnes policies
