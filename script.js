// OmniDataPro Main Script


// PAGE CONTROL


function hideAllAuth(){

document.getElementById("welcomePage").classList.add("hidden");

document.getElementById("loginPage").classList.add("hidden");

document.getElementById("signupPage").classList.add("hidden");

document.getElementById("forgotPage").classList.add("hidden");

}




function showLogin(){

hideAllAuth();

document.getElementById("loginPage").classList.remove("hidden");

}




function showSignup(){

hideAllAuth();

document.getElementById("signupPage").classList.remove("hidden");

}




function showForgot(){

hideAllAuth();

document.getElementById("forgotPage").classList.remove("hidden");

}







// SIGNUP SYSTEM


function signup(){


let userName =
document.getElementById("signupName").value;


let email =
document.getElementById("signupEmail").value;


let password =
document.getElementById("signupPassword").value;



if(!userName || !email || !password){

alert("Please fill all details");

return;

}



let user={

name:userName,

email:email,

password:password

};



localStorage.setItem(
"odpUser",
JSON.stringify(user)
);



alert("Account Created Successfully");


showLogin();


}








// LOGIN SYSTEM


function login(){


let email =
document.getElementById("loginEmail").value;


let password =
document.getElementById("loginPassword").value;



let user =
JSON.parse(localStorage.getItem("odpUser"));



if(user && user.email===email && user.password===password){


localStorage.setItem(
"odpLogin",
"true"
);



openApp();



}

else{


alert("Wrong Email or Password");


}


}






// FORGOT PASSWORD


function forgotPassword(){


let email =
document.getElementById("forgotEmail").value;



let user =
JSON.parse(localStorage.getItem("odpUser"));



if(user && user.email===email){


alert("Password reset request accepted");


showLogin();


}

else{


alert("Email not found");


}


}// OPEN MAIN APP


function openApp(){


document.getElementById("welcomePage").classList.add("hidden");

document.getElementById("loginPage").classList.add("hidden");

document.getElementById("signupPage").classList.add("hidden");

document.getElementById("forgotPage").classList.add("hidden");



document.getElementById("app").classList.remove("hidden");



let user =
JSON.parse(localStorage.getItem("odpUser"));



if(user){


document.getElementById("userName").innerHTML =
user.name;


document.getElementById("profileName").innerHTML =
user.name;


document.getElementById("profileEmail").innerHTML =
user.email;


}



openPage("dashboard");


}








// OPEN SIDEBAR PAGE


function openPage(page){


let pages =
document.querySelectorAll(".page");



pages.forEach(function(item){

item.classList.add("hidden");

});



let selected =
document.getElementById(page);



if(selected){

selected.classList.remove("hidden");

}


}







// BACK BUTTON


function goBack(){


openPage("dashboard");


}







// LOGOUT


function logout(){


localStorage.removeItem("odpLogin");


location.reload();


}







// SAVE WORK


function saveWork(){



let title =
document.getElementById("workTitle").value;



let description =
document.getElementById("workDescription").value;



if(!title || !description){


alert("Please add work details");


return;


}



let works =
JSON.parse(localStorage.getItem("odpWorks")) || [];



works.push({

title:title,

description:description,

date:new Date().toLocaleString()

});



localStorage.setItem(
"odpWorks",
JSON.stringify(works)
);



loadWorks();



alert("Work Saved");


}







// LOAD WORK


function loadWorks(){


let box =
document.getElementById("savedWork");



if(!box)return;



box.innerHTML="";



let works =
JSON.parse(localStorage.getItem("odpWorks")) || [];



works.forEach(function(work){



box.innerHTML += `

<div class="card">

<h3>${work.title}</h3>

<p>${work.description}</p>

<small>${work.date}</small>

</div>

`;



});


}// FILE MANAGER


function saveFile(){


let fileInput =
document.querySelector("#files input[type='file']");


if(!fileInput.files.length){

alert("Please select a file");

return;

}



let fileName =
fileInput.files[0].name;



let files =
JSON.parse(localStorage.getItem("odpFiles")) || [];



files.push(fileName);



localStorage.setItem(
"odpFiles",
JSON.stringify(files)
);



loadFiles();


alert("File Added");


}







function loadFiles(){


let area =
document.querySelector("#files .card");



if(!area)return;



let files =
JSON.parse(localStorage.getItem("odpFiles")) || [];



area.innerHTML="";



files.forEach(function(file,index){


area.innerHTML += `

<p>
📄 ${file}

<button onclick="deleteFile(${index})">
Delete
</button>

</p>

`;


});


}







function deleteFile(index){


let files =
JSON.parse(localStorage.getItem("odpFiles")) || [];



files.splice(index,1);



localStorage.setItem(
"odpFiles",
JSON.stringify(files)
);



loadFiles();


}







// TASK SYSTEM


function addTask(){


alert("Task System Ready");


}








// NOTES SAVE


function saveNote(){


alert("Note Saved");


}







// AUTO LOAD


window.onload=function(){



if(localStorage.getItem("odpLogin")){


openApp();


}



loadWorks();


loadFiles();



};
