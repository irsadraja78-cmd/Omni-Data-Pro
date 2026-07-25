// Supabase.js

const SUPABASE_URL = "https://qvmywidjilwwkqvstglo.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

export default supabaseClient;
