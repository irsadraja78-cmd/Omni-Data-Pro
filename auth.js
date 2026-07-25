// Auth.js

import supabaseClient from "./Supabase.js";


// Signup
export async function signup(email, password) {
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        throw error;
    }

    return data;
}


// Login
export async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        throw error;
    }

    return data;
}


// Logout
export async function logout() {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        throw error;
    }

    return true;
}


// Current Session Check
export async function getSession() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        throw error;
    }

    return data.session;
}


// Forgot Password
export async function forgotPassword(email) {

    const { data, error } =
        await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/reset-password.html"
        });

    if (error) {
        throw error;
    }

    return data;
}


// Update New Password
export async function updatePassword(newPassword) {

    const { data, error } =
        await supabaseClient.auth.updateUser({
            password: newPassword
        });

    if (error) {
        throw error;
    }

    return data;
}
