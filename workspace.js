// ===================================
// OmniData Pro
// Workspace.js
// ===================================


import supabaseClient from "./Supabase.js";








// Get User Workspace Projects

export async function getWorkspace(){



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

    .from("work_projects")

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









// Create Project

export async function createProject(
    projectData
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

    .from("work_projects")

    .insert([

        {

            user_id:user.id,

            name:
            projectData.name,

            description:
            projectData.description || "",

            status:
            "active"


        }

    ])

    .select()

    .single();







    if(error){

        throw error;

    }






    return data;

}









// Update Project

export async function updateProject(
    projectId,
    updateData
){



    const {

        data,

        error

    } = await supabaseClient

    .from("work_projects")

    .update(updateData)

    .eq(
        "id",
        projectId
    )

    .select()

    .single();






    if(error){

        throw error;

    }






    return data;

}









// Delete Project

export async function deleteProject(
    projectId
){



    const {

        error

    } = await supabaseClient

    .from("work_projects")

    .delete()

    .eq(
        "id",
        projectId
    );






    if(error){

        throw error;

    }






    return true;

}
