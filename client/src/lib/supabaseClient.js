import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xcisctpsxghnwlzlhvdd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if a valid non-empty anon key is supplied, otherwise export null to allow graceful offline fallback
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseAnonKey.trim().length > 0)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
