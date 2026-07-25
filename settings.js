// ===================================
// OmniData Pro
// Setting.js
// ===================================


import supabaseClient from "./Supabase.js";








// Get User Settings

export async function getSettings(){



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

    .from("profiles")

    .select(

        "settings"

    )

    .eq(

        "id",

        user.id

    )

    .single();







    if(error){

        throw error;

    }







    return data.settings || {};

}











// Update Settings

export async function updateSettings(
    settingsData
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

    .from("profiles")

    .update({

        settings: settingsData

    })

    .eq(

        "id",

        user.id

    )

    .select()

    .single();







    if(error){

        throw error;

    }







    return data;

}











// Save Single Setting

export async function saveSetting(
    key,
    value
){



    const currentSettings =
    await getSettings();





    currentSettings[key] = value;





    return await updateSettings(
        currentSettings
    );

}
