// Setting.js

import supabaseClient from "./Supabase.js";


// Get User Settings
export async function getSettings() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: settingsError } =
        await supabaseClient
        .from("profiles")
        .select("settings")
        .eq("id", user.id)
        .single();


    if (settingsError) {
        throw settingsError;
    }


    return data.settings || {};
}



// Update User Settings
export async function updateSettings(settingsData) {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: updateError } =
        await supabaseClient
        .from("profiles")
        .update({
            settings: settingsData
        })
        .eq("id", user.id)
        .select()
        .single();


    if (updateError) {
        throw updateError;
    }


    return data;
}
