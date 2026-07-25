// Dashboard.js

import supabaseClient from "./Supabase.js";
import { getProfile } from "./Profile.js";
import { logout } from "./Auth.js";


// Load Dashboard
export async function loadDashboard() {

    const {
        data: { session },
        error
    } = await supabaseClient.auth.getSession();


    if (error) {
        throw error;
    }


    if (!session) {
        window.location.href = "index.html";
        return null;
    }


    const profile = await getProfile();


    return {
        user: session.user,
        profile: profile
    };
}


// Get User Activity Summary
export async function getDashboardStats() {

    const {
        data: { user },
        error: userError
    } = await supabaseClient.auth.getUser();


    if (userError) {
        throw userError;
    }


    const { data: projects } = await supabaseClient
        .from("work_projects")
        .select("id")
        .eq("user_id", user.id);


    const { data: files } = await supabaseClient
        .from("files")
        .select("id")
        .eq("user_id", user.id);


    const { data: tasks } = await supabaseClient
        .from("tasks")
        .select("id")
        .eq("user_id", user.id);


    return {
        projects: projects?.length || 0,
        files: files?.length || 0,
        tasks: tasks?.length || 0
    };
}


// Dashboard Logout
export async function dashboardLogout() {

    await logout();

    window.location.href = "index.html";
}
