// =====================================
// OMNI DATA PRO — AI CHAT MODULE
// =====================================

import { supabase } from './supabase.js';
import { incrementCounter } from './dashboard.js';

const aiSendButton = document.getElementById("ai-send-button");
const aiInput = document.getElementById("ai-input");
const aiHistory = document.getElementById("ai-history");

aiSendButton?.addEventListener("click", async () => {
    const text = aiInput.value.trim();

    if (!text) {
        return;
    }

    // Append user message
    aiHistory.innerHTML += `
        <div class="ai-message">
            <b>You:</b>
            ${text}
        </div>
    `;

    aiInput.value = "";
    aiHistory.scrollTop = aiHistory.scrollHeight;

    // Increment chat count on dashboard
    incrementCounter('chat');

    // Simulate or integrate AI processing
    setTimeout(async () => {
        let aiResponse = "Your request is being processed.";

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Optional: Save chat message to Supabase database if table exists
                // await supabase.from('ai_chats').insert([{ user_id: user.id, message: text }]);
            }
        } catch (err) {
            console.error("AI chat sync error:", err);
        }

        aiHistory.innerHTML += `
            <div class="ai-message">
                <b>AI:</b>
                ${aiResponse}
            </div>
        `;

        aiHistory.scrollTop = aiHistory.scrollHeight;
    }, 500);
});

console.log("AI Chat Module Loaded");
