// ===================================
// OmniData Pro - script.js
// ===================================

import { getSession } from "./Auth.js";

// App Start
document.addEventListener("DOMContentLoaded", async () => {
    
    // 1. नेविगेशन टैब स्विचिंग लॉजिक
    const navButtons = document.querySelectorAll(".main-navigation button");
    const sections = document.querySelectorAll(".app-section, #auth-section");

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-section");
            
            // सभी सेक्शंस से active क्लास हटाएं
            sections.forEach(sec => sec.classList.remove("active"));
            
            // सिर्फ क्लिक किए गए सेक्शन को active करें
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add("active");
            }
        });
    });

    // 2. सेशन चेक और व्यू कंट्रोल
    try {
        const session = await getSession();
        if (session) {
            showApp();
        } else {
            showAuth();
        }
    } catch (error) {
        console.error("Session error:", error);
        showAuth();
    }
});

// ऐप व्यू दिखाने के लिए (डैशबोर्ड बाय डिफॉल्ट खुलेगा)
function showApp() {
    const authSection = document.getElementById("auth-section");
    if (authSection) authSection.classList.remove("active");

    const dashboardSection = document.getElementById("dashboard-section");
    if (dashboardSection) dashboardSection.classList.add("active");
}

// ऑथेंटिकेशन (लॉगिन) व्यू दिखाने के लिए
function showAuth() {
    const authSection = document.getElementById("auth-section");
    if (authSection) authSection.classList.add("active");

    const dashboardSection = document.getElementById("dashboard-section");
    if (dashboardSection) dashboardSection.classList.remove("active");
}
