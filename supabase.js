// ===================================
// OmniData Pro
// Supabase.js
// ===================================


// Supabase Configuration

const SUPABASE_URL = "https://qvmywidjilwwkqvstglo.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U";




// Create Supabase Client

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);




// Export Client

export default supabaseClient;
