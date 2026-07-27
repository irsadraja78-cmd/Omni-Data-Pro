import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

