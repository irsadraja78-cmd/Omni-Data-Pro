// OmniDataPro Workspace System


// ===============================
// SAVE PROJECT WORK
// ===============================


function saveProjectWork(){


let currentWork =
localStorage.getItem("currentWork");


if(!currentWork){

alert("Select Work Category First");

return;

}



let project = {

title:
document.getElementById("projectTitle")?.value || "",


description:
document.getElementById("projectDescription")?.value || "",


status:
document.getElementById("projectStatus")?.value || "Pending",


date:
new Date().toLocaleString()

};



let workspace =
JSON.parse(
localStorage.getItem("workspaceData")
) || {};



if(!workspace[currentWork]){

workspace[currentWork]=[];

}



workspace[currentWork].push(project);



localStorage.setItem(

"workspaceData",

JSON.stringify(workspace)

);



alert("Project Saved Successfully");


loadProjects();


}







// ===============================
// LOAD PROJECTS
// ===============================


function loadProjects(){


let box =
document.getElementById("projectList");


if(!box)return;



let currentWork =
localStorage.getItem("currentWork");



let workspace =
JSON.parse(
localStorage.getItem("workspaceData")
) || {};



box.innerHTML="";



if(workspace[currentWork]){


workspace[currentWork].forEach(function(project){



box.innerHTML += `

<div class="project-card">

<h3>${project.title}</h3>

<p>${project.description}</p>

<p>Status: ${project.status}</p>

<small>${project.date}</small>

</div>

`;


});


}


}








// ===============================
// TASK SYSTEM
// ===============================


function addWorkspaceTask(){


let task =
document.getElementById("workspaceTask")?.value;



if(!task)return;



let tasks =
JSON.parse(
localStorage.getItem("workspaceTasks")
) || [];



tasks.push({

task:task,

done:false,

date:
new Date().toLocaleString()

});



localStorage.setItem(

"workspaceTasks",

JSON.stringify(tasks)

);



loadWorkspaceTasks();


}







function loadWorkspaceTasks(){


let box =
document.getElementById("workspaceTaskList");


if(!box)return;



let tasks =
JSON.parse(
localStorage.getItem("workspaceTasks")
) || [];



box.innerHTML="";



tasks.forEach(function(item,index){



box.innerHTML += `

<div>

☐ ${item.task}

<button onclick="removeWorkspaceTask(${index})">

Delete

</button>

</div>

`;



});


}







function removeWorkspaceTask(index){


let tasks =
JSON.parse(
localStorage.getItem("workspaceTasks")
) || [];



tasks.splice(index,1);



localStorage.setItem(

"workspaceTasks",

JSON.stringify(tasks)

);



loadWorkspaceTasks();


}








// ===============================
// NOTES SYSTEM
// ===============================


function saveWorkspaceNote(){


let note =
document.getElementById("workspaceNote")?.value;



if(!note)return;



let notes =
JSON.parse(
localStorage.getItem("workspaceNotes")
) || [];



notes.push({

text:note,

date:
new Date().toLocaleString()

});



localStorage.setItem(

"workspaceNotes",

JSON.stringify(notes)

);



loadWorkspaceNotes();


}







function loadWorkspaceNotes(){


let box =
document.getElementById("workspaceNotesList");


if(!box)return;



let notes =
JSON.parse(
localStorage.getItem("workspaceNotes")
) || [];



box.innerHTML="";



notes.forEach(function(note){


box.innerHTML += `

<p>
📝 ${note.text}
</p>

`;



});


}








document.addEventListener(

"DOMContentLoaded",

function(){


loadProjects();

loadWorkspaceTasks();

loadWorkspaceNotes();


}

);
