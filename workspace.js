// Workspace.js

import supabaseClient from "./Supabase.js";


// Get User Workspace Projects
export async function getWorkspace() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: projectError } = await supabaseClient
        .from("work_projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });


    if (projectError) {
        throw projectError;
    }


    return data;
}



// Create New Project
export async function createProject(projectData) {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: insertError } = await supabaseClient
        .from("work_projects")
        .insert([
            {
                ...projectData,
                user_id: user.id
            }
        ])
        .select()
        .single();


    if (insertError) {
        throw insertError;
    }


    return data;
}



// Delete Project
export async function deleteProject(projectId) {


    const { error } = await supabaseClient
        .from("work_projects")
        .delete()
        .eq("id", projectId);


    if (error) {
        throw error;
    }


    return true;
}
