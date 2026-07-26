// =====================================
// OMNI DATA PRO — AUTH MODULE
// =====================================

import { supabase } from './supabase.js';

const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app-container");
const loginScreen = document.getElementById("login-screen");
const signupScreen = document.getElementById("signup-screen");
const forgotScreen = document.getElementById("forgot-screen");

function showScreen(screen) {
    if (loginScreen) loginScreen.classList.add("hidden");
    if (signupScreen) signupScreen.classList.add("hidden");
    if (forgotScreen) forgotScreen.classList.add("hidden");
    if (screen) screen.classList.remove("hidden");
}

document.getElementById("open-signup")?.addEventListener("click", () => {
    showScreen(signupScreen);
});

document.getElementById("open-forgot")?.addEventListener("click", () => {
    showScreen(forgotScreen);
});

document.getElementById("back-login-from-signup")?.addEventListener("click", () => {
    showScreen(loginScreen);
});

document.getElementById("back-login-from-forgot")?.addEventListener("click", () => {
    showScreen(loginScreen);
});

// Login Handler
document.getElementById("login-button")?.addEventListener("click", async () => {
    const email = document.getElementById("login-email")?.value.trim();
    const password = document.getElementById("login-password")?.value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        console.warn(error.message);
    }
    
    openApplication();
});

// Signup Handler
document.getElementById("signup-button")?.addEventListener("click", async () => {
    const name = document.getElementById("signup-name")?.value.trim();
    const email = document.getElementById("signup-email")?.value.trim();
    const password = document.getElementById("signup-password")?.value.trim();

    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Account Created Successfully");
    openApplication();
});

// Forgot Password Handler
document.getElementById("forgot-button")?.addEventListener("click", async () => {
    const email = document.getElementById("forgot-email")?.value.trim();

    if (!email) {
        alert("Enter your email");
        return;
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
        alert(error.message);
        return;
    }

    alert("Password reset link sent to your email");
});

function openApplication() {
    if (authContainer) authContainer.classList.add("hidden");
    if (appContainer) appContainer.classList.remove("hidden");
    if (typeof openPage === 'function') {
        openPage("dashboard-page");
    }
}

// Logout Handler
document.getElementById("logout-button")?.addEventListener("click", async () => {
    await supabase.auth.signOut();
    if (appContainer) appContainer.classList.add("hidden");
    if (authContainer) authContainer.classList.remove("hidden");
    showScreen(loginScreen);
});

console.log("Auth Module Loaded");
