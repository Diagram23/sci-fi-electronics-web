import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';

// Singleton — created once, never recreated across re-renders or Strict Mode double-mounts
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      // Persist session in localStorage so page refreshes keep the user logged in
      persistSession: true,
      // Use a single storage key to avoid lock conflicts
      storageKey: 'sfx-auth-token',
      // Prevent multiple simultaneous lock attempts
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
