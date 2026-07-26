/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 1/3
===================================== */


console.log("Omni Data Pro Loaded");



/* =========================
   ELEMENTS
========================= */


const authContainer =
document.getElementById("auth-container");


const appContainer =
document.getElementById("app-container");



const loginScreen =
document.getElementById("login-screen");


const signupScreen =
document.getElementById("signup-screen");


const forgotScreen =
document.getElementById("forgot-screen");








/* =========================
   AUTH SCREEN SWITCH
========================= */


function showScreen(screen){


loginScreen.classList.add("hidden");

signupScreen.classList.add("hidden");

forgotScreen.classList.add("hidden");



screen.classList.remove("hidden");


}








/* =========================
   OPEN SIGNUP
========================= */


document
.getElementById("open-signup")
?.addEventListener("click",()=>{


showScreen(signupScreen);


});








/* =========================
   OPEN FORGOT
========================= */


document
.getElementById("open-forgot")
?.addEventListener("click",()=>{


showScreen(forgotScreen);


});








/* =========================
   BACK LOGIN
========================= */


document
.getElementById("back-login-from-signup")
?.addEventListener("click",()=>{


showScreen(loginScreen);


});





document
.getElementById("back-login-from-forgot")
?.addEventListener("click",()=>{


showScreen(loginScreen);


});









/* =========================
   LOGIN
========================= */


document
.getElementById("login-button")
?.addEventListener("click",()=>{


const email =
document.getElementById("login-email").value;



const password =
document.getElementById("login-password").value;




if(!email || !password){


alert("Please enter email and password");


return;


}




openApplication();



});









/* =========================
   SIGNUP
========================= */


document
.getElementById("signup-button")
?.addEventListener("click",()=>{


const name =
document.getElementById("signup-name").value;



const email =
document.getElementById("signup-email").value;



const password =
document.getElementById("signup-password").value;




if(!name || !email || !password){


alert("Fill all fields");


return;


}



alert("Account Created Successfully");



openApplication();



});









/* =========================
   FORGOT PASSWORD
========================= */


document
.getElementById("forgot-button")
?.addEventListener("click",()=>{


const email =
document.getElementById("forgot-email").value;



if(!email){


alert("Enter your email");


return;


}



alert(
"Password reset link sent"
);



});









/* =========================
   OPEN APPLICATION
========================= */


function openApplication(){


authContainer.classList.add("hidden");


appContainer.classList.remove("hidden");



openPage("dashboard-page");


}








/* =========================
   LOGOUT
========================= */


document
.getElementById("logout-button")
?.addEventListener("click",()=>{


appContainer.classList.add("hidden");


authContainer.classList.remove("hidden");


showScreen(loginScreen);



});/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 2/3
===================================== */



/* =========================
   PAGE NAVIGATION
========================= */


const menuButtons =
document.querySelectorAll(".menu-item");



const pages =
document.querySelectorAll(".app-page");





function openPage(pageID){


pages.forEach(page=>{

page.classList.remove("active-page");

});



const page =
document.getElementById(pageID);



if(page){

page.classList.add("active-page");

}


}






menuButtons.forEach(button=>{


button.addEventListener("click",()=>{


const page =
button.getAttribute("data-page");



openPage(page);



});


});









/* =========================
   DASHBOARD COUNTERS
========================= */


let projectCount = 0;

let fileCount = 0;

let chatCount = 0;




function updateDashboard(){


document.getElementById(
"project-total"
).innerText = projectCount;



document.getElementById(
"file-total"
).innerText = fileCount;



document.getElementById(
"chat-total"
).innerText = chatCount;



}



updateDashboard();









/* =========================
   AI CHAT
========================= */


const aiSendButton =
document.getElementById(
"ai-send-button"
);



aiSendButton
?.addEventListener("click",()=>{


const input =
document.getElementById(
"ai-input"
);



const history =
document.getElementById(
"ai-history"
);



const text =
input.value.trim();




if(!text){

return;

}





history.innerHTML += `

<div class="ai-message">

<b>You:</b>

${text}

</div>

`;





chatCount++;

updateDashboard();





setTimeout(()=>{


history.innerHTML += `

<div class="ai-message">

<b>AI:</b>

Your request is being processed.

</div>

`;



history.scrollTop =
history.scrollHeight;



},500);





input.value="";



});









/* =========================
   FILE UPLOAD
========================= */


const uploadButton =
document.getElementById(
"upload-button"
);





uploadButton
?.addEventListener("click",()=>{


const input =
document.getElementById(
"upload-input"
);



const container =
document.getElementById(
"files-container"
);



const file =
input.files[0];




if(!file){


alert("Select file first");


return;


}




container.innerHTML += `


<div class="file-item">


<h3>

${file.name}

</h3>



<p>

Uploaded Successfully

</p>


</div>


`;





fileCount++;

updateDashboard();




input.value="";



});









/* =========================
   WORKSPACE
========================= */


const createProject =
document.getElementById(
"create-project-button"
);





createProject
?.addEventListener("click",()=>{


const container =
document.getElementById(
"workspace-container"
);



projectCount++;



container.innerHTML += `


<div class="project-item">


<h3>

Project ${projectCount}

</h3>


<p>

New workspace created

</p>


</div>


`;



updateDashboard();



});/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 3/3
===================================== */





/* =========================
   GLOBAL SEARCH
========================= */


const searchButton =
document.getElementById(
"global-search-button"
);



searchButton
?.addEventListener("click",()=>{


const input =
document.getElementById(
"global-search-input"
);



const output =
document.getElementById(
"search-output"
);



const value =
input.value.trim();




if(!value){


output.innerHTML =

"<p>Please enter search text</p>";


return;


}




output.innerHTML = `


<div class="file-item">


<h3>
Search Result
</h3>


<p>
${value}
</p>


</div>


`;



});









/* =========================
   PROFILE SAVE
========================= */


const profileButton =
document.getElementById(
"save-profile-button"
);



profileButton
?.addEventListener("click",()=>{


const name =
document.getElementById(
"profile-name"
).value;



if(!name){


alert(
"Enter profile name"
);


return;


}



alert(
"Profile Saved Successfully"
);



});









/* =========================
   SETTINGS
========================= */


const settingsButton =
document.getElementById(
"save-settings-button"
);



settingsButton
?.addEventListener("click",()=>{


const darkMode =
document.getElementById(
"dark-mode-toggle"
);



if(darkMode.checked){


document.body.classList.add(
"dark-active"
);


}
else{


document.body.classList.remove(
"dark-active"
);


}





alert(
"Settings Saved"
);



});









/* =========================
   SECURITY LOGS
========================= */


function addSecurityLog(text){


const box =
document.getElementById(
"system-logs"
);



if(box){


box.innerHTML += `


<p>

${text}

</p>


`;

}


}





addSecurityLog(
"System initialized"
);



addSecurityLog(
"User session started"
);









/* =========================
   NOTIFICATIONS
========================= */


function addNotification(text){


const box =
document.getElementById(
"notification-container"
);



if(box){


box.innerHTML += `


<div class="notification-item">

${text}

</div>


`;

}


}





addNotification(
"Welcome to Omni Data Pro"
);



addNotification(
"All systems ready"
);









/* =========================
   FINAL CHECK
========================= */


window.addEventListener(
"load",
()=>{


console.log(
"Omni Data Pro System Ready"
);



});
