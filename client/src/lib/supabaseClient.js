import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xcisctpsxghnwlzlhvdd.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_hUiQBC1Cz-VputBh9FtX_w_h-Dkyi6e';

// Only initialize if a valid non-empty anon key is supplied, otherwise export null to allow graceful offline fallback
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseAnonKey.trim().length > 0)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
