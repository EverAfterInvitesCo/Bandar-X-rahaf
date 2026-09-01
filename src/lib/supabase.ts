import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RSVPData } from '../types';

const STORAGE_KEY_CONFIG = 'everafter_supabase_config';
const STORAGE_KEY_RSVPS = 'everafter_wedding_rsvps';

// Default initial sample entries for demo / organizer dashboard
const INITIAL_DEMO_RSVPS: RSVPData[] = [
  {
    id: 'demo-1',
    created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    full_name: 'Zaid & Noor Al-Husseini',
    email: 'zaid.husseini@example.com',
    phone: '+962 7 9123 4567',
    attending: 'yes',
    guest_count: 2,
    dietary_restrictions: 'None, excited to taste the Dead Sea feast!',
    song_request: 'Amr Diab - Tamally Maak',
    message: 'Mabrouk Bandar & Rahaf! Wishing you a lifetime of endless happiness, laughter, and love.'
  },
  {
    id: 'demo-2',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    full_name: 'Tariq Al-Qatarneh',
    email: 'tariq.q@example.com',
    phone: '+962 7 8555 8899',
    attending: 'yes',
    guest_count: 3,
    dietary_restrictions: 'Gluten-free for 1 guest',
    song_request: 'Ed Sheeran - Perfect',
    message: 'So incredibly proud of you both! Counting down the days to celebrate at the Dead Sea!'
  },
  {
    id: 'demo-3',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    full_name: 'Leen Abuaisheh',
    email: 'leen.a@example.com',
    phone: '+962 7 9999 1122',
    attending: 'yes',
    guest_count: 2,
    dietary_restrictions: 'Vegetarian',
    song_request: 'Majida El Roumi - Habiby',
    message: 'To the sweetest couple ever, congratulations dearest Rahaf and Bandar! We love you!'
  }
];

export const DEFAULT_SUPABASE_URL = 'https://ttmrivwrfiauwaebfski.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_b6XZ9NYdHTvNToJTu7uvOQ_G4TK80mt';

export function getSupabaseConfig(): { url: string; key: string } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.url && parsed.key) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading Supabase config from storage', e);
  }
  
  return {
    url: (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    key: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY
  };
}

export function saveSupabaseConfig(url: string, key: string) {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify({ url, key }));
}

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (config.url && config.key) {
    try {
      return createClient(config.url, config.key);
    } catch (e) {
      console.warn('Could not initialize Supabase client:', e);
      return null;
    }
  }
  return null;
}

// Get all RSVPs (from Supabase if configured, otherwise from LocalStorage)
export async function fetchRSVPs(): Promise<RSVPData[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, falling back to local store:', error.message);
      } else if (data) {
        return data as RSVPData[];
      }
    } catch (err) {
      console.warn('Supabase request failed:', err);
    }
  }

  // Fallback to LocalStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY_RSVPS);
    if (local) {
      return JSON.parse(local);
    }
    // Initialize with demo data if empty
    localStorage.setItem(STORAGE_KEY_RSVPS, JSON.stringify(INITIAL_DEMO_RSVPS));
    return INITIAL_DEMO_RSVPS;
  } catch {
    return INITIAL_DEMO_RSVPS;
  }
}

// Submit a new RSVP
export async function submitRSVP(rsvp: Omit<RSVPData, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  const newEntry: RSVPData = {
    ...rsvp,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `rsvp_${Date.now()}`,
    created_at: new Date().toISOString()
  };

  let supabaseSuccess = false;
  const client = getSupabaseClient();

  if (client) {
    try {
      const { error } = await client.from('rsvps').insert([
        {
          full_name: newEntry.full_name,
          email: newEntry.email || null,
          phone: newEntry.phone || null,
          attending: newEntry.attending,
          guest_count: newEntry.guest_count,
          dietary_restrictions: newEntry.dietary_restrictions || null,
          song_request: newEntry.song_request || null,
          message: newEntry.message || null
        }
      ]);

      if (error) {
        console.warn('Supabase insert failed:', error.message);
      } else {
        supabaseSuccess = true;
      }
    } catch (err) {
      console.warn('Supabase insert exception:', err);
    }
  }

  // Always update local storage for offline reliability and instant feedback
  try {
    const current = await fetchRSVPs();
    const updated = [newEntry, ...current.filter(item => item.id !== newEntry.id)];
    localStorage.setItem(STORAGE_KEY_RSVPS, JSON.stringify(updated));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }

  return { success: true };
}
