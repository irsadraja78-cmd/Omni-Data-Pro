// ===================================
// OmniData Pro
// Dashboard.js
// ===================================


import supabaseClient from "./Supabase.js";





// Load Dashboard Data

export async function loadDashboard(){


    const {

        data:{
            user

        },

        error:userError

    } = await supabaseClient.auth.getUser();





    if(userError){

        throw userError;

    }






    const projects =
    await getProjectsCount(user.id);



    const files =
    await getFilesCount(user.id);



    const aiRequests =
    await getAIRequestsCount(user.id);





    return {


        user:user,

        stats:{


            projects,

            files,

            aiRequests


        }


    };

}









// Projects Count

async function getProjectsCount(
    userId
){


    const {

        data,

        error

    } = await supabaseClient

    .from("work_projects")

    .select(
        "id",
        {
            count:"exact",
            head:true
        }
    )

    .eq(
        "user_id",
        userId
    );





    if(error){

        throw error;

    }





    return data?.length || 0;

}









// Files Count

async function getFilesCount(
    userId
){


    const {

        data,

        error

    } = await supabaseClient

    .from("files")

    .select(
        "id",
        {
            count:"exact",
            head:true
        }
    )

    .eq(
        "user_id",
        userId
    );





    if(error){

        throw error;

    }





    return data?.length || 0;

}









// AI Requests Count

async function getAIRequestsCount(
    userId
){


    const {

        data,

        error

    } = await supabaseClient

    .from("ai_history")

    .select(
        "id",
        {
            count:"exact",
            head:true
        }
    )

    .eq(
        "user_id",
        userId
    );





    if(error){

        throw error;

    }





    return data?.length || 0;

}








// Logout Redirect Helper

export function redirectAfterLogout(){


    window.location.href =
    "index.html";


}
