
// OmniDataPro Full Script



// AUTH CONTROL


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








// SIGNUP


function signup(){


let user={


name:
document.getElementById("signupName").value,


email:
document.getElementById("signupEmail").value,


password:
document.getElementById("signupPassword").value



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


alert("Wrong Login Details");


}


}








// FORGOT PASSWORD


function forgotPassword(){


alert(
"Password reset system will be connected with email later"
);


}
// OPEN APP


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








// SIDEBAR SLIDE


function toggleSidebar(){


document
.getElementById("sidebar")
.classList.toggle("active");


}








// PAGE OPEN


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



toggleSidebar();


}








// BACK BUTTON


function goBack(){


openPage("dashboard");


}








// OPEN WORK CATEGORY


function openWork(workName){



document.getElementById("workTitle").innerHTML =
workName;



localStorage.setItem(
"currentWork",
workName
);



let folders =
JSON.parse(localStorage.getItem("odpFolders")) || {};



if(!folders[workName]){


folders[workName]={

files:[],

works:[]

};


localStorage.setItem(
"odpFolders",
JSON.stringify(folders)
);


}



openPage("mywork");


}
// SAVE WORK


function saveWork(){


let current =
localStorage.getItem("currentWork");



if(!current){

alert("Select Work First");

return;

}



let folders =
JSON.parse(localStorage.getItem("odpFolders")) || {};



folders[current].works.push({


project:
document.getElementById("projectName").value,


details:
document.getElementById("workDetails").value,


status:
document.getElementById("workStatus").value,


date:
new Date().toLocaleString()


});



localStorage.setItem(

"odpFolders",

JSON.stringify(folders)

);



alert("Work Saved Successfully");


}








// ADD FILE


function addFile(){


let input =
document.getElementById("fileUpload");



if(!input.files.length){

alert("Select File");

return;

}



let current =
localStorage.getItem("currentWork");



let folders =
JSON.parse(localStorage.getItem("odpFolders")) || {};



folders[current].files.push({

name:
input.files[0].name,


date:
new Date().toLocaleString()


});



localStorage.setItem(

"odpFolders",

JSON.stringify(folders)

);



loadFiles();


}








// SHOW FILES


function loadFiles(){


let list =
document.getElementById("fileList");



if(!list)return;



let current =
localStorage.getItem("currentWork");



let folders =
JSON.parse(localStorage.getItem("odpFolders")) || {};



list.innerHTML="";



if(folders[current]){


folders[current].files.forEach(function(file){



list.innerHTML += `

<p>
📄 ${file.name}
</p>

`;



});


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


list.innerHTML +=

`<p>☐ ${task}</p>`;


});


}








// NOTES


function saveNote(){


let note =
document.getElementById("noteInput").value;



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


list.innerHTML +=

`<p>📝 ${note}</p>`;


});


}








// LOGOUT


function logout(){


localStorage.removeItem("odpLogin");


location.reload();


}








// AUTO START


window.onload=function(){


if(localStorage.getItem("odpLogin")){


openApp();


}



loadTasks();

loadNotes();

loadFiles();


};
