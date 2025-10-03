import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for our database
export type Subscriber = {
  id: string;
  email: string;
  language: string;
  created_at: string;
  user_agent?: string;
  ip_address?: string;
};

export type SubscriberInsert = Omit<Subscriber, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};
