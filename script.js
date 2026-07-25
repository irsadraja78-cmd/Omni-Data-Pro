// ===================================
// OmniData Pro
// Script.js
// ===================================


import {
    login,
    signup,
    logout,
    forgotPassword,
    getSession
} from "./Auth.js";


import {
    loadDashboard
} from "./Dashboard.js";


import {
    getWorkspace,
    createProject
} from "./Workspace.js";


import {
    uploadFile,
    getFiles
} from "./File.js";


import {
    runAI
} from "./AI.js";


import {
    getProfile,
    updateProfile
} from "./Profile.js";


import {
    getSettings,
    saveSetting
} from "./Setting.js";






// App Start

document.addEventListener(
    "DOMContentLoaded",
    async()=>{

        try {
            const session = await getSession();

            if(session){
                showApp();
                await initializeDashboard();
            } else {
                showAuth();
            }
        } catch (error) {
            console.error("Auth session error:", error);
            showAuth();
        }

    }
);








// Show Application

function showApp(){


    document
    .getElementById(
        "auth-section"
    )
    .classList
    .add("hidden");


}







// Show Login

function showAuth(){


    document
    .getElementById(
        "auth-section"
    )
    .classList
    .remove("hidden");


}









// Login

document
.getElementById(
    "login-btn"
)
?.addEventListener(
"click",
async()=>{


    const email =
    document.getElementById(
        "login-email"
    ).value;



    const password =
    document.getElementById(
        "login-password"
    ).value;




    await login(
        email,
        password
    );



    location.reload();


});









// Signup

document
.getElementById(
    "signup-btn"
)
?.addEventListener(
"click",
async()=>{


    const name =
    document.getElementById(
        "signup-name"
    ).value;



    const email =
    document.getElementById(
        "signup-email"
    ).value;



    const password =
    document.getElementById(
        "signup-password"
    ).value;




    await signup(
        name,
        email,
        password
    );



});









// Logout

document
.getElementById(
    "logout-btn"
)
?.addEventListener(
"click",
async()=>{


    await logout();


    location.reload();


});









// Forgot Password

document
.getElementById(
    "send-reset-btn"
)
?.addEventListener(
"click",
async()=>{


    const email =
    document.getElementById(
        "forgot-email"
    ).value;



    await forgotPassword(
        email
    );


});









// Dashboard

async function initializeDashboard(){


    const data =
    await loadDashboard();



    console.log(
        "Dashboard:",
        data
    );


}









// Create Project

document
.getElementById(
    "create-project-btn"
)
?.addEventListener(
"click",
async()=>{


    const name =
    prompt(
        "Project Name"
    );


    if(name){


        await createProject({

            name:name,

            description:""

        });


        location.reload();


    }


});









// Upload File

document
.getElementById(
    "upload-file-btn"
)
?.addEventListener(
"click",
async()=>{


    const file =
    document
    .getElementById(
        "file-input"
    )
    .files[0];



    if(file){

        await uploadFile(
            file
        );

    }


});









// Run AI

document
.getElementById(
    "run-ai-btn"
)
?.addEventListener(
"click",
async()=>{


    const prompt =
    document
    .getElementById(
        "ai-prompt"
    )
    .value;



    const response =
    await runAI(
        prompt
    );


    document
    .getElementById(
        "ai-response"
    )
    .innerText =
    response;



});








// Navigation

document
.querySelectorAll(
    "[data-section]"
)
.forEach(
button=>{


    button.addEventListener(
    "click",
    ()=>{


        document
        .querySelectorAll(
            ".app-section"
        )
        .forEach(
        section=>{

            section.style.display =
            "none";

        });


        document
        .getElementById(
            button.dataset.section
        )
        .style.display =
        "block";


    });


});
