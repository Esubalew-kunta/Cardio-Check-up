import { createClient } from '@supabase/supabase-js'

// Not wired into the app yet — see SUPABASE_SETUP.md. Nothing currently
// imports this file, so its `@supabase/supabase-js` import is never
// resolved by the running site until something does (and the package is
// installed as a setup step before that happens).
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only once both env vars are set. Callers must check this (or just
// use blogRepository.js, which already does) instead of assuming `supabase`
// is non-null.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
