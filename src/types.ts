export interface RSVPData {
  id?: string;
  created_at?: string;
  full_name: string;
  email?: string;
  phone?: string;
  attending: 'yes' | 'no';
  has_plus_one?: boolean;
  plus_one_name?: string;
  guest_count: number;
  dietary_restrictions?: string;
  song_request?: string;
  message?: string;
}

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const SUPABASE_SQL_QUERY = `-- ========================================================
-- Bandar & Rahaf Wedding RSVP Table Setup (Supabase SQL)
-- Run this script in your Supabase SQL Editor:
-- ========================================================

-- 1. Create the rsvps table
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    attending TEXT NOT NULL CHECK (attending IN ('yes', 'no')),
    guest_count INTEGER DEFAULT 1 NOT NULL,
    has_plus_one BOOLEAN DEFAULT FALSE,
    plus_one_name TEXT,
    dietary_restrictions TEXT,
    song_request TEXT,
    message TEXT
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow anyone to insert an RSVP (Public guest submission)
CREATE POLICY "Allow public guests to submit RSVP" 
ON public.rsvps 
FOR INSERT 
WITH CHECK (true);

-- 4. Policy: Allow public read for organizer portal or authenticated admins
CREATE POLICY "Allow public read for RSVPs" 
ON public.rsvps 
FOR SELECT 
USING (true);

-- 5. Create index for fast sorting by date
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON public.rsvps (created_at DESC);
`;
