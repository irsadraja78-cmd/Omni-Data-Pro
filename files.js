// =====================================
// OMNI DATA PRO — FILES MODULE
// =====================================

import { supabase } from './supabase.js';
import { incrementCounter } from './dashboard.js';

const uploadButton = document.getElementById("upload-button");
const uploadInput = document.getElementById("upload-input");
const filesContainer = document.getElementById("files-container");

uploadButton?.addEventListener("click", async () => {
    const file = uploadInput.files[0];

    if (!file) {
        alert("Select file first");
        return;
    }

    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Optional Supabase Storage upload integration placeholder
        if (user) {
            // const filePath = `user_files/${user.id}/${Date.now()}_${file.name}`;
            // await supabase.storage.from('documents').upload(filePath, file);
        }

        filesContainer.innerHTML += `
            <div class="file-item">
                <h3>${file.name}</h3>
                <p>Uploaded Successfully</p>
            </div>
        `;

        incrementCounter('file');
        alert("File Uploaded Successfully");
    } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading file");
    }

    uploadInput.value = "";
});

console.log("Files Module Loaded");
