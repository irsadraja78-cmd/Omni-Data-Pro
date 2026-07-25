// OmniDataPro - Supabase Connection


const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";


// Create Supabase Client

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// Make available for other files

window.supabaseClient = supabaseClient;


console.log("Supabase Connection Ready");
