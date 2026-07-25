// ===================================
// OmniData Pro
// Auth.js
// ===================================


import supabaseClient from "./Supabase.js";




// Signup User

export async function signup(
    name,
    email,
    password
) {


    const {
        data,
        error
    } = await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {

            data: {

                full_name: name

            }

        }

    });



    if(error){

        throw error;

    }


    return data;

}







// Login User

export async function login(
    email,
    password
) {


    const {
        data,
        error
    } = await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

    });



    if(error){

        throw error;

    }



    return data;

}







// Logout User

export async function logout(){


    const {
        error
    } = await supabaseClient.auth.signOut();



    if(error){

        throw error;

    }



    return true;

}







// Get Current Session

export async function getSession(){


    const {
        data,
        error
    } = await supabaseClient.auth.getSession();



    if(error){

        throw error;

    }



    return data.session;

}








// Get Current User

export async function getCurrentUser(){


    const {
        data,
        error
    } = await supabaseClient.auth.getUser();



    if(error){

        throw error;

    }



    return data.user;

}








// Forgot Password

export async function forgotPassword(
    email
){


    const {
        error
    } = await supabaseClient.auth
    .resetPasswordForEmail(
        email,
        {

            redirectTo:
            window.location.origin +
            "/reset-password.html"

        }
    );



    if(error){

        throw error;

    }



    return true;

}








// Update Password

export async function updatePassword(
    newPassword
){


    const {
        data,
        error
    } = await supabaseClient.auth
    .updateUser({

        password:newPassword

    });



    if(error){

        throw error;

    }



    return data;

}
