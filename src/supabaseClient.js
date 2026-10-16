import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vcwdhwdjakehiysrntoo.supabase.co' 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjd2Rod2RqYWtlaGl5c3JudG9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNjAzOTIsImV4cCI6MjEwNzczNjM5Mn0.OAIc0_xF51IVwo8DI0jAm7cWpmIBwnC7VxdPqK8l2VE' 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
