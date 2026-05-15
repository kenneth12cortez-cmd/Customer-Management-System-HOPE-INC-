import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Project URL and Anon Key
const supabaseUrl = 'https://urkeyiasmlwmlzykilhq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVya2V5aWFzbWx3bWx6eWtpbGhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NzM0MjcsImV4cCI6MjA5MTQ0OTQyN30.6ttLyP0wzsOD2EOu1pUqj7pp3FbpwlBTljheWn3a3sQ'

export const supabase = createClient(supabaseUrl, supabaseKey)