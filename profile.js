// =====================================
// OMNI DATA PRO — PROFILE MODULE
// =====================================

import { supabase } from './supabase.js';

const profileButton = document.getElementById("save-profile-button");
const profileNameInput = document.getElementById("profile-name");
const profileEmailInput = document.getElementById("profile-email");

// Load user profile data on load
async function loadProfile() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            if (profileEmailInput) profileEmailInput.value = user.email || "";
            if (profileNameInput && user.user_metadata?.full_name) {
                profileNameInput.value = user.user_metadata.full_name;
            }
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}

profileButton?.addEventListener("click", async () => {
    const name = profileNameInput?.value.trim();

    if (!name) {
        alert("Enter profile name");
        return;
    }

    try {
        const { error } = await supabase.auth.updateUser({
            data: { full_name: name }
        });

        if (error) {
            alert(error.message);
            return;
        }

        alert("Profile Saved Successfully");
    } catch (err) {
        console.error("Profile update error:", err);
        alert("Failed to save profile");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});

console.log("Profile Module Loaded");
