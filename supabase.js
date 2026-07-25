// OmniDataPro Supabase Connection Final


// ===============================
// SUPABASE CONFIG
// ===============================


// बाद में यहाँ अपनी Supabase जानकारी डालनी है

const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";





// ===============================
// CREATE CLIENT
// ===============================


let supabaseClient;



try {


    supabaseClient = supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


    window.supabaseClient = supabaseClient;



    console.log(
        "OmniDataPro Supabase Connected"
    );


}

catch(error){


    console.error(
        "Supabase Connection Error:",
        error
    );


}






// ===============================
// CONNECTION CHECK
// ===============================


async function checkSupabaseConnection(){


    if(!supabaseClient){

        console.log(
            "Supabase Not Connected"
        );

        return false;

    }



    const {data,error} =
    await supabaseClient.auth.getSession();



    if(error){

        console.log(
            error.message
        );

        return false;

    }



    return true;


}
