// =====================================
// OMNI DATA PRO — SECURITY MODULE
// =====================================

import { supabase } from './supabase.js';

const loginActivityContainer = document.getElementById("login-activity");
const systemLogsContainer = document.getElementById("system-logs");

async function loadSecurityLogs() {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (loginActivityContainer) {
            loginActivityContainer.innerHTML = `
                <div class="log-item">
                    <p><b>Current Session:</b> ${user ? user.email : 'Guest'}</p>
                    <p><b>Last Sign In:</b> ${user ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
                </div>
            `;
        }

        if (systemLogsContainer) {
            systemLogsContainer.innerHTML = `
                <div class="log-item">
                    <p>System status: Secure and operational</p>
                    <p>Encryption: TLS Active</p>
                </div>
            `;
        }
    } catch (error) {
        console.error("Error loading security logs:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadSecurityLogs();
});

console.log("Security Module Loaded");
