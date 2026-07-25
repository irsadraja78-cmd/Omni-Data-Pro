// ===================================
// OmniData Pro
// AI.js
// ===================================


import supabaseClient from "./Supabase.js";







// Save AI History

export async function saveAIHistory(
    prompt,
    response
){



    const {

        data:{
            user

        },

        error:userError

    } = await supabaseClient.auth.getUser();





    if(userError){

        throw userError;

    }








    const {

        data,

        error

    } = await supabaseClient

    .from("ai_history")

    .insert([

        {

            user_id:user.id,

            prompt:prompt,

            response:response


        }

    ])

    .select()

    .single();







    if(error){

        throw error;

    }







    return data;

}











// Get AI History

export async function getAIHistory(){



    const {

        data:{
            user

        },

        error:userError

    } = await supabaseClient.auth.getUser();






    if(userError){

        throw userError;

    }








    const {

        data,

        error

    } = await supabaseClient

    .from("ai_history")

    .select("*")

    .eq(

        "user_id",

        user.id

    )

    .order(

        "created_at",

        {

            ascending:false

        }

    );







    if(error){

        throw error;

    }







    return data;

}











// Run AI Request

export async function runAI(
    prompt
){



    /*
    
    यहां बाद में OpenAI / अन्य AI API connect होगी।
    अभी system structure ready है।

    */





    const response =

    "AI response generated";







    await saveAIHistory(

        prompt,

        response

    );







    return response;

}
