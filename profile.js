// Profile.js

import supabaseClient from "./Supabase.js";


// Get Current User Profile
export async function getProfile() {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError) {
        throw userError;
    }

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}


// Update Profile
export async function updateProfile(profileData) {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();

    if (userError) {
        throw userError;
    }


    const { data, error } = await supabaseClient
        .from("profiles")
        .update(profileData)
        .eq("id", user.id)
        .select()
        .single();


    if (error) {
        throw error;
    }

    return data;
}


// Create Default Profile Check
export async function checkProfile() {

    const profile = await getProfile();

    return profile !== null;
}
