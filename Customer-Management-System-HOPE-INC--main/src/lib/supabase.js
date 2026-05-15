import { createClient } from '@supabase/supabase-js'

// This pulls the keys you just saved in the .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This creates the "client" that handles all your database requests
export const supabase = createClient(supabaseUrl, supabaseKey)