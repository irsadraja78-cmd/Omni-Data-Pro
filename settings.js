// =====================================
// OMNI DATA PRO — SETTINGS MODULE
// =====================================

import { supabase } from './supabase.js';

const darkModeToggle = document.getElementById("dark-mode-toggle");
const notificationToggle = document.getElementById("notification-toggle");
const saveSettingsButton = document.getElementById("save-settings-button");

// Load settings from localStorage or Supabase user preferences
function loadSettings() {
    const darkMode = localStorage.getItem("omni_dark_mode") === "true";
    const notifications = localStorage.getItem("omni_notifications") !== "false";

    if (darkModeToggle) darkModeToggle.checked = darkMode;
    if (notificationToggle) notificationToggle.checked = notifications;

    if (darkMode) {
        document.body.classList.add("dark-theme");
    }
}

saveSettingsButton?.addEventListener("click", () => {
    const isDarkMode = darkModeToggle ? darkModeToggle.checked : false;
    const isNotifications = notificationToggle ? notificationToggle.checked : true;

    localStorage.setItem("omni_dark_mode", isDarkMode);
    localStorage.setItem("omni_notifications", isNotifications);

    if (isDarkMode) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    alert("Settings Saved Successfully");
});

document.addEventListener("DOMContentLoaded", () => {
    loadSettings();
});

console.log("Settings Module Loaded");
