/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 1/3
===================================== */


console.log("Omni Data Pro JS Loaded");



/* =====================================
   ELEMENT SELECTOR
===================================== */


const authContainer = 
document.getElementById("auth-container");


const appContainer = 
document.getElementById("app-container");



const loginSection =
document.getElementById("login-section");


const signupSection =
document.getElementById("signup-section");


const forgotSection =
document.getElementById("forgot-section");





/* =====================================
   AUTH PAGE SWITCH
===================================== */


function showLogin(){

    loginSection?.classList.remove("hidden");

    signupSection?.classList.add("hidden");

    forgotSection?.classList.add("hidden");

}




function showSignup(){

    loginSection?.classList.add("hidden");

    signupSection?.classList.remove("hidden");

    forgotSection?.classList.add("hidden");

}




function showForgot(){

    loginSection?.classList.add("hidden");

    signupSection?.classList.add("hidden");

    forgotSection?.classList.remove("hidden");

}







/* =====================================
   AUTH LINKS
===================================== */


document
.getElementById("show-signup")
?.addEventListener("click",(e)=>{

    e.preventDefault();

    showSignup();

});





document
.getElementById("show-login")
?.addEventListener("click",(e)=>{

    e.preventDefault();

    showLogin();

});





document
.getElementById("show-forgot")
?.addEventListener("click",(e)=>{

    e.preventDefault();

    showForgot();

});





document
.getElementById("back-login")
?.addEventListener("click",(e)=>{

    e.preventDefault();

    showLogin();

});








/* =====================================
   OPEN APP
===================================== */


function openApp(){


    authContainer
    ?.classList.add("hidden");



    appContainer
    ?.classList.remove("hidden");



    openPage("dashboard");


}








/* =====================================
   LOGIN BUTTON
===================================== */


document
.getElementById("login-btn")
?.addEventListener("click",()=>{


    const email =
    document.getElementById("login-email")?.value;


    const password =
    document.getElementById("login-password")?.value;




    if(!email || !password){

        alert("Enter email and password");

        return;

    }



    // Temporary frontend login

    openApp();


});









/* =====================================
   SIGNUP BUTTON
===================================== */


document
.getElementById("signup-btn")
?.addEventListener("click",()=>{


    const name =
    document.getElementById("signup-name")?.value;


    const email =
    document.getElementById("signup-email")?.value;


    const password =
    document.getElementById("signup-password
                            /* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 2/3
===================================== */





/* =====================================
   AI CHAT SYSTEM
===================================== */


const sendAIButton =
document.getElementById("send-ai");



sendAIButton
?.addEventListener("click",()=>{


    const input =
    document.getElementById("ai-message");


    const history =
    document.getElementById("chat-history");



    if(!input || !history)
    return;



    const message =
    input.value.trim();



    if(!message)
    return;




    history.innerHTML += `

    <div class="message">

    <b>You:</b><br>

    ${message}

    </div>

    `;



    setTimeout(()=>{


        history.innerHTML += `

        <div class="message">

        <b>AI:</b><br>

        Processing your request...

        </div>

        `;


        history.scrollTop =
        history.scrollHeight;



    },500);




    input.value="";


});








/* =====================================
   FILE MANAGER
===================================== */


const uploadButton =
document.getElementById("upload-file");





uploadButton
?.addEventListener("click",()=>{


    const fileInput =
    document.getElementById("file-input");



    const fileList =
    document.getElementById("file-list");



    if(!fileInput || !fileList)
    return;




    const file =
    fileInput.files[0];



    if(!file){


        alert("Select a file");


        return;


    }






    fileList.innerHTML += `


    <div class="file-card">


    <h3>

    ${file.name}

    </h3>


    <p>

    File Added

    </p>


    </div>


    `;




    fileInput.value="";



});









/* =====================================
   GLOBAL SEARCH
===================================== */


const searchButton =
document.getElementById("search-btn");





searchButton
?.addEventListener("click",()=>{


    const searchInput =
    document.getElementById("global-search");



    const result =
    document.getElementById("search-result");



    if(!searchInput || !result)
    return;




    const value =
    searchInput.value.trim();




    if(!value){


        result.innerHTML =

        `<div class="card">
        Enter something to search
        </div>`;


        return;

    }




    result.innerHTML = `


    <div class="card">


    <h3>

    Search Result

    </h3>


    <p>

    ${value}

    </p>


    </div>


    `;



});









/* =====================================
   DASHBOARD COUNTERS
===================================== */


function updateDashboard(){



const projects =
document.getElementById(
"project-count"
);



const files =
document.getElementById(
"file-count"
);



const chats =
document.getElementById(
"chat-count"
);




if(projects)

projects.innerText="0";



if(files)

files.innerText="0";



if(chats)

chats.innerText="0";



}








/* =====================================
   WORKSPACE
===================================== */


const newProject =
document.getElementById(
"new-project"
);




newProject
?.addEventListener("click",()=>{


const list =
document.getElementById(
"project-list"
);



if(!list)
return;




list.innerHTML += `


<div class="project-card">


<h3>

New Project

</h3>


<p>

Project created successfully

</p>


</div>


`;



});








/* =====================================
   INITIAL LOAD
===================================== */


window.addEventListener(
"load",
()=>{


updateDashboard();


});/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 3/3
===================================== */





/* =====================================
   PROFILE UPDATE
===================================== */


const saveProfile =
document.getElementById(
"save-profile"
);



saveProfile
?.addEventListener("click",()=>{


const name =
document.getElementById(
"profile-name"
);



if(!name)
return;



alert(
"Profile Updated: " + name.value
);



});








/* =====================================
   SETTINGS SAVE
===================================== */


const saveSettings =
document.getElementById(
"save-settings"
);



saveSettings
?.addEventListener("click",()=>{


const darkMode =
document.getElementById(
"dark-mode"
);



if(darkMode?.checked){


document.body.classList.add(
"dark-mode"
);


}
else{


document.body.classList.remove(
"dark-mode"
);


}



alert(
"Settings Saved"
);



});









/* =====================================
   DARK MODE SUPPORT
===================================== */


const darkStyle = document.createElement(
"style"
);



darkStyle.innerHTML = `


.dark-mode {


background:#020617 !important;


}


.dark-mode .card,
.dark-mode .settings-card,
.dark-mode .profile-card {


background:#020617;


}



`;



document.head.appendChild(
darkStyle
);









/* =====================================
   SECURITY LOGS
===================================== */


function addSecurityLog(text){


const box =
document.getElementById(
"security-list"
);



if(!box)
return;




box.innerHTML += `

<div class="notification-item">

${text}

</div>

`;



}





window.addEventListener(
"load",
()=>{


addSecurityLog(
"System started successfully"
);



});









/* =====================================
   NOTIFICATIONS
===================================== */


function addNotification(message){


const box =
document.getElementById(
"notification-list"
);



if(!box)
return;



box.innerHTML += `


<div class="notification-item">

${message}

</div>


`;



}



window.addEventListener(
"load",
()=>{


addNotification(
"Welcome to Omni Data Pro"
);



});









/* =====================================
   BUTTON ERROR PROTECTION
===================================== */


document
.querySelectorAll("button")
.forEach(btn=>{


btn.addEventListener(
"click",
()=>{


console.log(
"Button clicked:",
btn.innerText
);


});


});








/* =====================================
   APP READY
===================================== */


console.log(
"Omni Data Pro System Ready"
);
