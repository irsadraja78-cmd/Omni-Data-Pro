// File.js

import supabaseClient from "./Supabase.js";

const BUCKET_NAME = "omnidatapro-files";


// Get User Files
export async function getFiles() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const { data, error: fileError } = await supabaseClient
        .from("files")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });


    if (fileError) {
        throw fileError;
    }


    return data;
}



// Upload File
export async function uploadFile(file) {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();


    if (error) {
        throw error;
    }


    const filePath = `${user.id}/${Date.now()}_${file.name}`;


    const { error: uploadError } =
        await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(filePath, file);


    if (uploadError) {
        throw uploadError;
    }



    const { data, error: dbError } =
        await supabaseClient
        .from("files")
        .insert([
            {
                user_id: user.id,
                name: file.name,
                path: filePath,
                type: file.type,
                size: file.size
            }
        ])
        .select()
        .single();



    if (dbError) {
        throw dbError;
    }


    return data;
}



// Delete File
export async function deleteFile(fileId, filePath) {


    const { error: storageError } =
        await supabaseClient.storage
        .from(BUCKET_NAME)
        .remove([filePath]);


    if (storageError) {
        throw storageError;
    }



    const { error: dbError } =
        await supabaseClient
        .from("files")
        .delete()
        .eq("id", fileId);



    if (dbError) {
        throw dbError;
    }


    return true;
}
