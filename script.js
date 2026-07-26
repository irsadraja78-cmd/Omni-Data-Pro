/* =====================================
   Omni Data Pro
   Main JavaScript
   Part 1/3
===================================== */



// ===============================
// ELEMENTS
// ===============================


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





// ===============================
// AUTH PAGE SWITCH
// ===============================


function showLogin(){


    loginSection.classList.remove("hidden");

    signupSection.classList.add("hidden");

    forgotSection.classList.add("hidden");


}




function showSignup(){


    loginSection.classList.add("hidden");

    signupSection.classList.remove("hidden");

    forgotSection.classList.add("hidden");


}





function showForgot(){


    loginSection.classList.add("hidden");

    signupSection.classList.add("hidden");

    forgotSection.classList.remove("hidden");


}







// ===============================
// BUTTON EVENTS
// ===============================


document
.getElementById("show-signup")
?.addEventListener(
"click",
(e)=>{

e.preventDefault();

showSignup();

});




document
.getElementById("show-login")
?.addEventListener(
"click",
(e)=>{

e.preventDefault();

showLogin();

});





document
.getElementById("show-forgot")
?.addEventListener(
"click",
(e)=>{

e.preventDefault();

showForgot();

});





document
.getElementById("back-login")
?.addEventListener(
"click",
(e)=>{

e.preventDefault();

showLogin();

});








// ===============================
// TAB SYSTEM
// ===============================


const navButtons =
document.querySelectorAll(
"#sidebar button[data-page]"
);



const pages =
document.querySelectorAll(
".page-section"
);






function openPage(pageId){



pages.forEach(page=>{


    page.classList.remove("active");


});





const target =
document.getElementById(pageId);



if(target){

    target.classList.add("active");

}



}






navButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const page =
button.dataset.page;


openPage(page);



});


});







// ===============================
// APP START
// ===============================


function startApp(){


authContainer
.classList.add("hidden");



appContainer
.classList.remove("hidden");



openPage("dashboard");


}






// Temporary local test

// बाद में Supabase Auth से replace होगा


const demoLogin =
document.getElementById("login-btn");



demoLogin
?.addEventListener(
"click",
()=>{


startApp();


});





const demoSignup =
document.getElementById("signup-btn");



demoSignup
?.addEventListener(
"click",
()=>{


startApp();


});






// ===============================
// LOGOUT
// ===============================


document
.getElementById("logout-btn")
?.addEventListener(
"click",
()=>{


appContainer
.classList.add("hidden");



authContainer
.classList.remove("hidden");



showLogin();


});/* =====================================
   SUPABASE AUTH SYSTEM
   Part 2/3
===================================== */



// ===============================
// SUPABASE IMPORT
// ===============================


import supabaseClient from "./supabase.js";







// ===============================
// SIGNUP
// ===============================


const signupButton =
document.getElementById("signup-btn");



signupButton
?.addEventListener(
"click",
async ()=>{


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





const {
data,
error
} = await supabaseClient.auth.signUp({

email,

password,

options:{

data:{

full_name:name

}

}

});






if(error){


alert(error.message);


return;


}




alert(
"Account Created Successfully"
);



startApp();



});









// ===============================
// LOGIN
// ===============================


const loginButton =
document.getElementById("login-btn");



loginButton
?.addEventListener(
"click",
async ()=>{


const email =
document.getElementById(
"login-email"
).value;



const password =
document.getElementById(
"login-password"
).value;





const {

data,

error

}

=
await supabaseClient.auth.signInWithPassword({

email,

password

});





if(error){


alert(error.message);


return;


}




startApp();



});










// ===============================
// SESSION CHECK
// ===============================


async function checkSession(){



const {

data

}

=
await supabaseClient.auth.getSession();





if(data.session){


startApp();


loadUserProfile();


loadDashboard();


}



}





checkSession();









// ===============================
// PROFILE LOAD
// ===============================


async function loadUserProfile(){



const {

data:

{

user

}

}

=
await supabaseClient.auth.getUser();






if(!user)
return;





const nameInput =
document.getElementById(
"profile-name"
);



const emailInput =
document.getElementById(
"profile-email"
);




if(nameInput)

nameInput.value =
user.user_metadata?.full_name || "";





if(emailInput)

emailInput.value =
user.email;



}










// ===============================
// DASHBOARD LOAD
// ===============================


async function loadDashboard(){



try{



const {

count:

projectCount

}

=
await supabaseClient

.from("work_projects")

.select("*",
{

count:"exact",

head:true

});





const projectBox =
document.getElementById(
"project-count"
);



if(projectBox)

projectBox.innerText =
projectCount || 0;





}

catch(error){


console.log(
"Dashboard Error",
error
);


}



}/* =====================================
   Omni Data Pro
   Final JavaScript
   Part 3/3
===================================== */



// ===============================
// FILE UPLOAD
// ===============================


const uploadButton =
document.getElementById(
"upload-file"
);



uploadButton
?.addEventListener(
"click",
async ()=>{


const fileInput =
document.getElementById(
"file-input"
);



const file =
fileInput.files[0];



if(!file){

alert(
"Select file first"
);

return;

}





const {

data:

{

user

}

}

=
await supabaseClient.auth.getUser();





if(!user)
return;





const filePath =
`${user.user.id}/${file.name}`;





const {

error

}

=
await supabaseClient
.storage
.from(
"omnidatapro-files"
)
.upload(

filePath,

file

);





if(error){


alert(error.message);


return;


}





alert(
"File Uploaded"
);



loadFiles();



});









// ===============================
// LOAD FILES
// ===============================


async function loadFiles(){


const {

data:

{

user

}

}

=
await supabaseClient.auth.getUser();




if(!user)
return;





const {

data,

error

}

=
await supabaseClient
.storage
.from(
"omnidatapro-files"
)
.list(
user.user.id
);





if(error)
return;





const box =
document.getElementById(
"file-list"
);



if(!box)
return;



box.innerHTML="";





data.forEach(file=>{


box.innerHTML += `

<div class="file-card">

<h3>

${file.name}

</h3>


</div>

`;



});



}









// ===============================
// AI CHAT
// ===============================


const sendAI =
document.getElementById(
"send-ai"
);



sendAI
?.addEventListener(
"click",
()=>{


const input =
document.getElementById(
"ai-message"
);



const history =
document.getElementById(
"chat-history"
);



if(!input.value)
return;





history.innerHTML += `

<div class="message">

<b>You:</b>

${input.value}

</div>

`;





history.innerHTML += `

<div class="message">

<b>AI:</b>

Your request is processing...

</div>

`;





input.value="";



});









// ===============================
// GLOBAL SEARCH
// ===============================


document
.getElementById(
"search-btn"
)
?.addEventListener(
"click",
()=>{


const text =
document.getElementById(
"global-search"
).value;





const result =
document.getElementById(
"search-result"
);





result.innerHTML = `

<div class="card">

Search Result:

${text}

</div>

`;



});









// ===============================
// PROFILE UPDATE
// ===============================


document
.getElementById(
"save-profile"
)
?.addEventListener(
"click",
async ()=>{


const name =
document.getElementById(
"profile-name"
).value;





const {

data:

{

user

}

}

=
await supabaseClient.auth.getUser();





if(!user)
return;





await supabaseClient.auth.updateUser({

data:{

full_name:name

}

});





alert(
"Profile Updated"
);



});









// ===============================
// SETTINGS
// ===============================


document
.getElementById(
"save-settings"
)
?.addEventListener(
"click",
()=>{


alert(
"Settings Saved"
);


});









// ===============================
// START LOADERS
// ===============================


window.addEventListener(
"load",
()=>{


loadFiles();



});
