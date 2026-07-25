// Security.js

import supabaseClient from "./Supabase.js";


// Create Security Log
export async function createSecurityLog(action, details = {}) {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: logError } =
        await supabaseClient
        .from("security_logs")
        .insert([
            {
                user_id: user.id,
                action: action,
                details: details
            }
        ])
        .select()
        .single();


    if (logError) {
        throw logError;
    }


    return data;
}



// Get User Security Logs
export async function getSecurityLogs() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: logsError } =
        await supabaseClient
        .from("security_logs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
            ascending: false
        });


    if (logsError) {
        throw logsError;
    }


    return data;
}



// Delete Security Log
export async function deleteSecurityLog(id) {

    const { error } =
        await supabaseClient
        .from("security_logs")
        .delete()
        .eq("id", id);


    if (error) {
        throw error;
    }


    return true;
}
