// =====================================================================
// OMNI DATA PRO — ENTERPRISE-GRADE CORE CONTROLLER (`script.js`)
// =====================================================================

import { supabase } from './supabase.js';
import { setLanguage, getCurrentLanguage } from './i18n.js';

// Application State Store (Centralized State Management)
const AppState = {
    currentUser: null,
    currentSession: null,
    activePage: 'dashboard-page',
    isOnline: navigator.onLine,
    theme: localStorage.getItem("omni_dark_mode") === "true" ? "dark" : "light"
};

// Expose state globally for debugging if needed
window.OmniApp = AppState;

/**
 * 1. Centralized Page Routing & Dynamic View Controller
 * @param {string} pageId 
 */
window.openPage = function(pageId) {
    try {
        const pages = document.querySelectorAll(".app-page");
        if (!pages.length) return;

        pages.forEach(page => page.classList.add("hidden"));

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove("hidden");
            AppState.activePage = pageId;
            localStorage.setItem("omni_last_page", pageId);
        } else {
            console.warn(`[Router] Target page not found: "${pageId}". Falling back to dashboard.`);
            const fallbackPage = document.getElementById("dashboard-page");
            if (fallbackPage) fallbackPage.classList.remove("hidden");
        }

        // Update Active Navigation State
        document.querySelectorAll(".menu-item").forEach(item => {
            item.classList.toggle("active", item.getAttribute("data-target") === pageId);
        });
    } catch (error) {
        console.error("[Router Error]:", error.message);
    }
};

/**
 * 2. Event Binding for Sidebar Navigation
 */
function initializeNavigation() {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const targetPageId = item.getAttribute("data-target");
            if (targetPageId) {
                window.openPage(targetPageId);
            }
        });
    });
}

/**
 * 3. Enterprise Toast Notification System
 * @param {string} message 
 * @param {'success'|'error'|'warning'|'info'} type 
 */
window.showNotification = function(message, type = "info") {
    const toastContainer = document.getElementById("toast-container") || createToastContainer();
    
    const toast = document.createElement("div");
    toast.className = `toast-notification ${type}`;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
};

function createToastContainer() {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;";
    document.body.appendChild(container);
    return container;
}

/**
 * 4. Network Status Monitors (Online/Offline Sync)
 */
window.addEventListener('online', () => {
    AppState.isOnline = true;
    showNotification("Connection re-established. Syncing...", "success");
});

window.addEventListener('offline', () => {
    AppState.isOnline = false;
    showNotification("Network lost. Operating in offline cache mode.", "warning");
});

/**
 * 5. Global Exception Boundary (Catch Uncaught Script Errors)
 */
window.addEventListener('error', (event) => {
    console.error(`[Runtime Error]: ${event.message} at ${event.filename}:${event.lineno}`);
});

/**
 * 6. Authentication & Session Security Guard
 */
async function initializeAuthGuard() {
    const authContainer = document.getElementById("auth-container");
    const appContainer = document.getElementById("app-container");

    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session) {
            AppState.currentSession = session;
            AppState.currentUser = session.user;

            if (authContainer) authContainer.classList.add("hidden");
            if (appContainer) appContainer.classList.remove("hidden");

            const lastViewedPage = localStorage.getItem("omni_last_page") || "dashboard-page";
            window.openPage(lastViewedPage);
        } else {
            if (authContainer) authContainer.classList.remove("hidden");
            if (appContainer) appContainer.classList.add("hidden");
        }

        // Listen for Real-time Auth State Changes (Login / Logout events)
        supabase.auth.onAuthStateChange((event, currentSession) => {
            if (event === 'SIGNED_OUT' || !currentSession) {
                localStorage.removeItem("omni_last_page");
                window.location.reload();
            }
        });

    } catch (err) {
        console.error("[Auth Guard Error]:", err.message);
        showNotification("Authentication synchronization failed.", "error");
    }
}

/**
 * 7. Theme Engine Initialization
 */
function initializeTheme() {
    if (AppState.theme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
}

/**
 * 8. Main Entry Point (DOM Loaded Lifecycle Hook)
 */
document.addEventListener("DOMContentLoaded", async () => {
    console.info("%c[Omni Data Pro] Initializing Enterprise Kernel...", "color: #00ff66; background: #111; padding: 4px; font-weight: bold;");

    // Initialize UI & Core Modules
    initializeNavigation();
    initializeTheme();

    // Initialize Multi-language Engine
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);

    // Execute Security & Session Checks
    await initializeAuthGuard();

    console.info("%c[Omni Data Pro] System Ready & Operational.", "color: #00bcd4; font-weight: bold;");
});
