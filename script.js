// SHOW LOGIN

function showLogin(){

document.getElementById("loginSection").classList.remove("hidden");

document.getElementById("signupSection").classList.add("hidden");

document.getElementById("forgotSection").classList.add("hidden");

}



// SHOW SIGNUP

function showSignup(){

document.getElementById("loginSection").classList.add("hidden");

document.getElementById("signupSection").classList.remove("hidden");

document.getElementById("forgotSection").classList.add("hidden");

}



// SHOW FORGOT

function showForgot(){

document.getElementById("loginSection").classList.add("hidden");

document.getElementById("signupSection").classList.add("hidden");

document.getElementById("forgotSection").classList.remove("hidden");

}





// CREATE ACCOUNT

function signup(){


let user={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

password:document.getElementById("password").value

};



if(!user.name || !user.email || !user.password){

alert("Please fill all fields");

return;

}



localStorage.setItem(
"odpUser",
JSON.stringify(user)
);



alert("Account Created Successfully");


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
"odpSession",
"active"
);



openDashboard();


}

else{


alert("Invalid Email or Password");


}


}







// OPEN DASHBOARD

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







// SIDEBAR PAGE CHANGE

function openPage(page){


document.querySelectorAll(".page").forEach(function(item){

item.classList.add("hidden");

});



document.getElementById(page).classList.remove("hidden");


}







// SAVE WORK

function saveWork(){


let title=document.getElementById("workTitle").value;

let details=document.getElementById("workDetails").value;



if(!title || !details){

alert("Enter work details");

return;

}



let works=JSON.parse(
localStorage.getItem("odpWorks")
) || [];



works.push({

title:title,

details:details,

date:new Date().toLocaleString()

});



localStorage.setItem(
"odpWorks",
JSON.stringify(works)
);



loadWorks();



clearWork();


}







// LOAD WORK

function loadWorks(){


let box=document.getElementById("workList");


if(!box)return;



box.innerHTML="";



let works=JSON.parse(
localStorage.getItem("odpWorks")
) || [];



works.forEach(function(work,index){



box.innerHTML += `

<div class="card">

<h3>${work.title}</h3>

<p>${work.details}</p>

<small>${work.date}</small>

</div>

`;



});


}







// CLEAR WORK

function clearWork(){


let title=document.getElementById("workTitle");

let details=document.getElementById("workDetails");


if(title) title.value="";

if(details) details.value="";


}







// FILE SAVE

function saveFile(){


let file=document.getElementById("fileInput").files[0];



if(!file){

alert("Select file");

return;

}



let files=JSON.parse(
localStorage.getItem("odpFiles")
) || [];



files.push(file.name);



localStorage.setItem(
"odpFiles",
JSON.stringify(files)
);



loadFiles();


}







// LOAD FILES

function loadFiles(){


let box=document.getElementById("fileList");


if(!box)return;



box.innerHTML="";



let files=JSON.parse(
localStorage.getItem("odpFiles")
) || [];



files.forEach(function(file){


box.innerHTML += `

<div class="card">

${file}

</div>

`;


});


document.getElementById("totalFiles").innerHTML=files.length;


}







// FORGOT PASSWORD

function forgotPassword(){


let email=document.getElementById("resetEmail").value;



let user=JSON.parse(
localStorage.getItem("odpUser")
);



if(user && user.email===email){


alert("Password reset request sent");


showLogin();


}

else{


alert("Email not found");


}


}







// LOGOUT

function logout(){


localStorage.removeItem("odpSession");


location.reload();


}







// AUTO LOGIN

window.onload=function(){


if(localStorage.getItem("odpSession")){

openDashboard();

}



loadWorks();

loadFiles();


}
