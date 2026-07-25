// OmniDataPro Workspace System Final


// ===============================
// SAVE PROJECT
// ===============================


function saveProjectWork(){


    const work = getCurrentWork();


    if(!work){

        alert("Select Work First");

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



    if(!workspace[work.id]){

        workspace[work.id]=[];

    }



    workspace[work.id].push(project);



    localStorage.setItem(

        "workspaceData",

        JSON.stringify(workspace)

    );



    loadProjects();



    alert("Work Saved Successfully");


}








// ===============================
// LOAD PROJECTS
// ===============================


function loadProjects(){


    const box =
    document.getElementById(
        "projectList"
    );



    if(!box)return;



    const work =
    getCurrentWork();



    if(!work)return;



    let workspace =
    JSON.parse(
        localStorage.getItem("workspaceData")
    ) || {};



    box.innerHTML="";



    (workspace[work.id] || [])
    .forEach(function(project){



        box.innerHTML += `

        <div class="project-card">

        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <p>
        Status: ${project.status}
        </p>

        <small>
        ${project.date}
        </small>


        </div>

        `;


    });


}








// ===============================
// TASK SYSTEM
// ===============================


function addWorkspaceTask(){


    const work =
    getCurrentWork();



    const input =
    document.getElementById(
        "workspaceTask"
    );



    if(!input || !input.value)return;



    let tasks =
    JSON.parse(
        localStorage.getItem("workspaceTasks")
    ) || {};



    if(!tasks[work.id]){

        tasks[work.id]=[];

    }



    tasks[work.id].push({

        text:input.value,

        done:false,

        date:
        new Date().toLocaleString()

    });



    localStorage.setItem(

        "workspaceTasks",

        JSON.stringify(tasks)

    );



    input.value="";


    loadWorkspaceTasks();


}








function loadWorkspaceTasks(){


    const box =
    document.getElementById(
        "workspaceTaskList"
    );


    if(!box)return;



    const work =
    getCurrentWork();



    if(!work)return;



    let tasks =
    JSON.parse(
        localStorage.getItem("workspaceTasks")
    ) || {};



    box.innerHTML="";



    (tasks[work.id] || [])
    .forEach(function(task,index){



        box.innerHTML += `

        <div class="task-card">

        ☑ ${task.text}

        <button onclick="deleteTask(${index})">

        Delete

        </button>

        </div>

        `;


    });


}








function deleteTask(index){


    const work =
    getCurrentWork();



    let tasks =
    JSON.parse(
        localStorage.getItem("workspaceTasks")
    ) || {};



    tasks[work.id].splice(index,1);



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


    const work =
    getCurrentWork();



    const note =
    document.getElementById(
        "workspaceNote"
    )?.value;



    if(!note)return;



    let notes =
    JSON.parse(
        localStorage.getItem("workspaceNotes")
    ) || {};



    if(!notes[work.id]){

        notes[work.id]=[];

    }



    notes[work.id].push({

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


    const box =
    document.getElementById(
        "workspaceNotesList"
    );


    if(!box)return;



    const work =
    getCurrentWork();



    let notes =
    JSON.parse(
        localStorage.getItem("workspaceNotes")
    ) || {};



    box.innerHTML="";



    (notes[work.id] || [])
    .forEach(function(note){


        box.innerHTML += `

        <p>
        📝 ${note.text}
        </p>

        `;


    });


}




console.log(
"OmniDataPro Workspace Active"
);
