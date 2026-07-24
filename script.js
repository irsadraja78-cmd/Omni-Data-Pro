// OmniDataPro Updated Script


// AUTH PAGE CONTROL


function hideAuth(){

document.getElementById("welcomePage").classList.add("hidden");

document.getElementById("loginPage").classList.add("hidden");

document.getElementById("signupPage").classList.add("hidden");

document.getElementById("forgotPage").classList.add("hidden");

}




function showLogin(){

hideAuth();

document.getElementById("loginPage").classList.remove("hidden");

}



function showSignup(){

hideAuth();

document.getElementById("signupPage").classList.remove("hidden");

}



function showForgot(){

hideAuth();

document.getElementById("forgotPage").classList.remove("hidden");

}








// CREATE ACCOUNT


function signup(){


let name =
document.getElementById("signupName").value;


let email =
document.getElementById("signupEmail").value;


let password =
document.getElementById("signupPassword").value;



if(!name || !email || !password){

alert("Fill all details");

return;

}



let user={

name:name,

email:email,

password:password

};



localStorage.setItem(
"odpUser",
JSON.stringify(user)
);



alert("Account Created");


showLogin();


}








// LOGIN


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


alert("Invalid Login");


}


}








// FORGOT PASSWORD


function forgotPassword(){


alert(
"Password reset link will be added with email system"
);


}// OPEN APP


function openApp(){


hideAuth();


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








// PAGE NAVIGATION


function openPage(page){


let pages =
document.querySelectorAll(".page");



pages.forEach(function(p){

p.classList.add("hidden");

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








// OPEN WORK CATEGORY


function openWork(workName){



document.getElementById("workHeading").innerHTML =
workName;



openPage("mywork");



let folder =
JSON.parse(localStorage.getItem("odpFolder")) || {};



if(!folder[workName]){


folder[workName]={

files:[],
works:[]

};


localStorage.setItem(
"odpFolder",
JSON.stringify(folder)
);


}



localStorage.setItem(
"currentWork",
workName
);



}









// SAVE WORK


function saveWork(){



let current =
localStorage.getItem("currentWork");



if(!current){

alert("Select Work Category First");

return;

}



let project =
document.getElementById("projectName").value;



let details =
document.getElementById("workDetails").value;



let status =
document.getElementById("workStatus").value;



let folder =
JSON.parse(localStorage.getItem("odpFolder"));



folder[current].works.push({

project:project,

details:details,

status:status,

date:new Date().toLocaleString()

});



localStorage.setItem(
"odpFolder",
JSON.stringify(folder)
);



alert("Work Saved Successfully");


}// FILE SYSTEM


function addFile(){


let input =
document.getElementById("fileUpload");


if(!input.files.length){

alert("Select a file first");

return;

}



let current =
localStorage.getItem("currentWork");



if(!current){

alert("Open a work category first");

return;

}



let folder =
JSON.parse(localStorage.getItem("odpFolder")) || {};



folder[current].files.push({

name:input.files[0].name,

date:new Date().toLocaleString()

});



localStorage.setItem(
"odpFolder",
JSON.stringify(folder)
);



loadFiles();


}








function loadFiles(){


let current =
localStorage.getItem("currentWork");


let list =
document.getElementById("fileList");



if(!list || !current)return;



let folder =
JSON.parse(localStorage.getItem("odpFolder")) || {};



list.innerHTML="";



if(folder[current] && folder[current].files.length){



folder[current].files.forEach(function(file){


list.innerHTML += `

<p>
📄 ${file.name}
</p>

`;



});



}

else{


list.innerHTML="No Files Added";


}


}








// TASK SYSTEM


function addTask(){


let task =
document.getElementById("taskInput").value;



if(!task)return;



let tasks =
JSON.parse(localStorage.getItem("odpTasks")) || [];



tasks.push(task);



localStorage.setItem(
"odpTasks",
JSON.stringify(tasks)
);



loadTasks();


}








function loadTasks(){


let list =
document.getElementById("taskList");



if(!list)return;



let tasks =
JSON.parse(localStorage.getItem("odpTasks")) || [];



list.innerHTML="";



tasks.forEach(function(task){


list.innerHTML += `

<p>
☐ ${task}
</p>

`;


});


}









// NOTES SYSTEM


function saveNote(){


let note =
document.getElementById("noteInput").value;



if(!note)return;



let notes =
JSON.parse(localStorage.getItem("odpNotes")) || [];



notes.push(note);



localStorage.setItem(
"odpNotes",
JSON.stringify(notes)
);



loadNotes();


}








function loadNotes(){


let list =
document.getElementById("noteList");



if(!list)return;



let notes =
JSON.parse(localStorage.getItem("odpNotes")) || [];



list.innerHTML="";



notes.forEach(function(note){


list.innerHTML += `

<p>
📝 ${note}
</p>

`;


});


}








// LOGOUT


function logout(){


localStorage.removeItem("odpLogin");


location.reload();


}








// AUTO LOAD


window.onload=function(){


if(localStorage.getItem("odpLogin")){


openApp();


}



loadTasks();

loadNotes();

loadFiles();


};
