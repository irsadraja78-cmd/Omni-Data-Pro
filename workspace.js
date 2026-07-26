// =====================================
// OMNI DATA PRO — WORKSPACE MODULE
// =====================================

import { supabase } from './supabase.js';
import { incrementCounter } from './dashboard.js';

const createProjectButton = document.getElementById("create-project-button");
const workspaceContainer = document.getElementById("workspace-container");

createProjectButton?.addEventListener("click", async () => {
    const projectName = prompt("Enter Project Name:");

    if (!projectName) {
        return;
    }

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Optional Supabase integration for inserting project
            // await supabase.from('projects').insert([{ user_id: user.id, name: projectName }]);
        }

        if (workspaceContainer) {
            workspaceContainer.innerHTML += `
                <div class="workspace-project-card">
                    <h3>${projectName}</h3>
                    <p>Status: Active</p>
                </div>
            `;
        }

        incrementCounter('project');
        alert("Project Created Successfully");
    } catch (error) {
        console.error("Error creating project:", error);
        alert("Failed to create project");
    }
});

console.log("Workspace Module Loaded");
