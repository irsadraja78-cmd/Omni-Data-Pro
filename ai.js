// AI.js

import supabaseClient from "./Supabase.js";


// Save AI Request History
export async function saveAIHistory(prompt, response) {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: saveError } =
        await supabaseClient
        .from("ai_history")
        .insert([
            {
                user_id: user.id,
                prompt: prompt,
                response: response
            }
        ])
        .select()
        .single();


    if (saveError) {
        throw saveError;
    }


    return data;
}



// Get User AI History
export async function getAIHistory() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: historyError } =
        await supabaseClient
        .from("ai_history")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false
        });


    if (historyError) {
        throw historyError;
    }


    return data;
}



// AI Request Handler
export async function runAI(prompt) {

    /*
       यहां बाद में AI API connect होगी।
       फिलहाल system structure ready है।
    */


    const response = "AI response will be connected here";


    await saveAIHistory(prompt, response);


    return response;
}
