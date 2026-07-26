// =====================================
// OMNI DATA PRO — DASHBOARD MODULE
// =====================================

import { supabase } from './supabase.js';

let projectCount = 0;
let fileCount = 0;
let chatCount = 0;

export function updateDashboard() {
    const projectTotalElem = document.getElementById("project-total");
    const fileTotalElem = document.getElementById("file-total");
    const chatTotalElem = document.getElementById("chat-total");

    if (projectTotalElem) projectTotalElem.innerText = projectCount;
    if (fileTotalElem) fileTotalElem.innerText = fileCount;
    if (chatTotalElem) chatTotalElem.innerText = chatCount;
}

export function incrementCounter(type) {
    if (type === 'project') projectCount++;
    if (type === 'file') fileCount++;
    if (type === 'chat') chatCount++;
    updateDashboard();
}

export async function fetchDashboardData() {
    // Supabase integration placeholder for fetching user statistics
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Example: Fetching counts from tables if they exist
        // const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
        // if (pCount !== null) projectCount = pCount;

        updateDashboard();
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
    }
}

// Initial load check
document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
});

console.log("Dashboard Module Loaded");
