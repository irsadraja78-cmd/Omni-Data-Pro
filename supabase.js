// =====================================
// OMNI DATA PRO — SUPABASE CONFIG
// =====================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://qvmywidjilwwkqvstglo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Client Initialized");
