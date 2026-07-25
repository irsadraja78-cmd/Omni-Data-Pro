// ===================================
// OmniData Pro
// File.js
// ===================================


import supabaseClient from "./Supabase.js";



const BUCKET_NAME = "omnidatapro-files";








// Get User Files

export async function getFiles(){


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

    .from("files")

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









// Upload File

export async function uploadFile(
    file
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







    const filePath =

    user.id +
    "/" +
    Date.now() +
    "_" +
    file.name;







    const {

        error:uploadError

    } = await supabaseClient.storage

    .from(BUCKET_NAME)

    .upload(

        filePath,

        file

    );







    if(uploadError){

        throw uploadError;

    }








    const {

        data,

        error

    } = await supabaseClient

    .from("files")

    .insert([

        {

            user_id:user.id,

            name:file.name,

            path:filePath,

            size:file.size,

            type:file.type


        }

    ])

    .select()

    .single();







    if(error){

        throw error;

    }





    return data;

}









// Get File URL

export function getFileUrl(
    path
){



    const {

        data

    } = supabaseClient.storage

    .from(BUCKET_NAME)

    .getPublicUrl(path);





    return data.publicUrl;

}









// Delete File

export async function deleteFile(
    fileId,
    filePath
){



    const {

        error:storageError

    } = await supabaseClient.storage

    .from(BUCKET_NAME)

    .remove([

        filePath

    ]);







    if(storageError){

        throw storageError;

    }








    const {

        error

    } = await supabaseClient

    .from("files")

    .delete()

    .eq(

        "id",

        fileId

    );







    if(error){

        throw error;

    }





    return true;

}
