// PAGE SWITCH

function showSection(id){

document.querySelectorAll(".auth").forEach(e=>{
e.classList.add("hidden");
});

document.getElementById(id).classList.remove("hidden");

}



function showLogin(){

document.getElementById("loginSection").classList.remove("hidden");
document.getElementById("signupSection").classList.add("hidden");
document.getElementById("forgotSection").classList.add("hidden");

}



function showSignup(){

document.getElementById("loginSection").classList.add("hidden");
document.getElementById("signupSection").classList.remove("hidden");
document.getElementById("forgotSection").classList.add("hidden");

}



function showForgot(){

document.getElementById("loginSection").classList.add("hidden");
document.getElementById("signupSection").classList.add("hidden");
document.getElementById("forgotSection").classList.remove("hidden");

}





// SIGNUP

function signup(){

let user={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value

};


if(!user.name || !user.email || !user.password){

alert("Fill all details");

return;

}


localStorage.setItem(
"odpUser",
JSON.stringify(user)
);


alert("Account Created");


showLogin();


}







// LOGIN

function login(){


let email=document.getElementById("loginEmail").value;

let password=document.getElementById("loginPassword").value;


let user=JSON.parse(
localStorage.getItem("odpUser")
);



if(user && user.email===email && user.password===password){


localStorage.setItem(
"odpLogin",
"true"
);


openDashboard();


}
else{


alert("Invalid Login");


}


}








// DASHBOARD

function openDashboard(){


document.getElementById("loginSection").classList.add("hidden");

document.getElementById("signupSection").classList.add("hidden");

document.getElementById("forgotSection").classList.add("hidden");


document.getElementById("dashboard").classList.remove("hidden");



let user=JSON.parse(
localStorage.getItem("odpUser")
);


if(user){

document.getElementById("profileName").innerHTML=user.name;

document.getElementById("profileEmail").innerHTML=user.email;

}


}








// SIDEBAR

function openPage(page){


document.querySelectorAll(".page").forEach(e=>{

e.classList.add("hidden");

});


document.getElementById(page).classList.remove("hidden");


}







// WORK SAVE


function saveWork(){


let title=document.getElementById("workTitle").value;

let detail=document.getElementById("workDetails").value;


let works=
JSON.parse(localStorage.getItem("works")) || [];



works.push({

title:title,

detail:detail

});



localStorage.setItem(
"works",
JSON.stringify(works)
);



loadWorks();


}





function loadWorks(){


let box=document.getElementById("workList");


if(!box)return;


box.innerHTML="";


let works=
JSON.parse(localStorage.getItem("works")) || [];



works.forEach(w=>{


box.innerHTML +=
`
<div class="card">
<h3>${w.title}</h3>
<p>${w.detail}</p>
</div>
`;

});


}








// FILE SAVE


function saveFile(){


let file=
document.getElementById("fileInput").files[0];


if(!file){

alert("Select File");

return;

}



let files=
JSON.parse(localStorage.getItem("files")) || [];


files.push(file.name);


localStorage.setItem(
"files",
JSON.stringify(files)
);



loadFiles();


}






function loadFiles(){


let box=document.getElementById("fileList");


if(!box)return;


box.innerHTML="";


let files=
JSON.parse(localStorage.getItem("files")) || [];



files.forEach(f=>{


box.innerHTML+=
`
<div class="card">
${f}
</div>
`;

});


}








// FORGOT PASSWORD


function forgotPassword(){


let email=
document.getElementById("resetEmail").value;


let user=
JSON.parse(localStorage.getItem("odpUser"));



if(user && user.email===email){


alert("Reset request received");


}

else{


alert("Email not found");


}


}







// LOGOUT


function logout(){


localStorage.removeItem("odpLogin");


location.reload();


}






// AUTO LOAD


window.onload=function(){


if(localStorage.getItem("odpLogin")){

openDashboard();

}


loadWorks();

loadFiles();


}
