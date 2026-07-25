// =====================================
// OmniDataPro Supabase Connection
// =====================================


// अपना Supabase Project URL यहाँ डालें

const SUPABASE_URL = "https://qvmywidjilwwkqvstglo.supabase.co";


// अपनी Supabase anon public key यहाँ डालें

const SUPABASE_ANON_KEY = "sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U";




// Supabase Client Create

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);



// Export

window.supabaseClient = supabaseClient;
