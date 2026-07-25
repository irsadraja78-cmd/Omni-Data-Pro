// ===================================
// OmniData Pro
// Security.js
// ===================================


import supabaseClient from "./Supabase.js";








// Create Security Log

export async function createSecurityLog(
    action,
    details = {}
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

    .from("security_logs")

    .insert([

        {

            user_id:user.id,

            action:action,

            details:details


        }

    ])

    .select()

    .single();







    if(error){

        throw error;

    }







    return data;

}











// Get Security Logs

export async function getSecurityLogs(){



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

    .from("security_logs")

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











// Delete Security Log

export async function deleteSecurityLog(
    logId
){



    const {

        error

    } = await supabaseClient

    .from("security_logs")

    .delete()

    .eq(

        "id",

        logId

    );







    if(error){

        throw error;

    }







    return true;

}
