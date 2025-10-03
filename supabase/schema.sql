-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  user_agent TEXT,
  ip_address TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON subscribers(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow INSERT from anyone (for the public form)
CREATE POLICY "Allow public insert" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow SELECT only for authenticated users (you in the dashboard)
CREATE POLICY "Allow authenticated select" ON subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Optional: Create a view for analytics (count by language, by day, etc.)
CREATE OR REPLACE VIEW subscriber_stats AS
SELECT
  DATE(created_at) as date,
  language,
  COUNT(*) as count
FROM subscribers
GROUP BY DATE(created_at), language
ORDER BY date DESC, language;

-- Grant permissions
GRANT SELECT ON subscriber_stats TO authenticated;
