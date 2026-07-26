/* =====================================
   OMNI DATA PRO
   FINAL WORKSPACES.JS
   PART 1/3
===================================== */





/*
   WORKSPACE STATE
*/


const WorkspaceSystem = {


    initialized:false,


    workspaces:[],


    currentWorkspace:null



};









/*
   INITIALIZE WORKSPACE
*/


function initializeWorkspace(){



    if(
    WorkspaceSystem.initialized
    )
    return;



    WorkspaceSystem.initialized=true;



    loadWorkspaces();



    setupWorkspaceEvents();



    renderWorkspaces();



}









/*
   WORKSPACE EVENTS
*/


function setupWorkspaceEvents(){



    const createBtn =

    document.getElementById(
    "create-workspace-btn"
    );





    if(createBtn){



        createBtn.addEventListener(

        "click",

        ()=>{


            createWorkspace();



        });


    }



}









/*
   CREATE WORKSPACE
*/


async function createWorkspace(){



    const name =

    document.getElementById(
    "workspace-name"
    )
    ?.value
    .trim();





    if(!name){



        showMessage(

        "Workspace name required",

        "error"

        );


        return;



    }







    const workspace={



        id:
        Date.now(),



        name:name,



        owner:
        OmniApp.currentUser
        ?
        OmniApp.currentUser.email
        :
        "guest",



        members:[],


        createdAt:
        new Date()
        .toISOString()



    };





    WorkspaceSystem.workspaces.push(
    workspace
    );





    saveWorkspaces();



    renderWorkspaces();



    showMessage(

    "Workspace created",

    "success"

    );



}/* =====================================
   OMNI DATA PRO
   FINAL WORKSPACES.JS
   PART 2/3
===================================== */





/*
   SAVE WORKSPACES
*/


function saveWorkspaces(){



    localStorage.setItem(

        "omni_workspaces",

        JSON.stringify(
        WorkspaceSystem.workspaces
        )

    );



}









/*
   LOAD WORKSPACES
*/


function loadWorkspaces(){



    const saved =

    localStorage.getItem(
    "omni_workspaces"
    );





    if(saved){



        WorkspaceSystem.workspaces =

        JSON.parse(
        saved
        );



    }



}









/*
   RENDER WORKSPACES
*/


function renderWorkspaces(){



    const container =

    document.getElementById(
    "workspace-list"
    );





    if(!container)
    return;





    if(
    WorkspaceSystem.workspaces.length===0
    ){



        container.innerHTML=`

        <div class="workspace-empty">

            No workspace created

        </div>

        `;


        return;



    }







    container.innerHTML =



    WorkspaceSystem.workspaces.map(

    workspace=>`


    <div class="workspace-card">



        <h3>

        ${workspace.name}

        </h3>



        <p>

        Owner:
        ${workspace.owner}

        </p>



        <small>

        Members:
        ${workspace.members.length}

        </small>




        <button

        onclick="openWorkspace(${workspace.id})"

        >

        Open

        </button>



    </div>


    `

    )

    .join("");



}









/*
   OPEN WORKSPACE
*/


function openWorkspace(
id
){



    const workspace =

    WorkspaceSystem.workspaces.find(

        item=>

        item.id===id

    );





    if(!workspace)
    return;





    WorkspaceSystem.currentWorkspace =
    workspace;





    localStorage.setItem(

        "current_workspace",

        JSON.stringify(
        workspace
        )

    );





    showMessage(

    `Opened ${workspace.name}`,

    "success"

    );



}









/*
   ADD MEMBER
*/


function addWorkspaceMember(
email,
role="member"
){



    if(
    !WorkspaceSystem.currentWorkspace
    )
    return;





    const member={



        email:email,


        role:role,



        joinedAt:
        new Date()
        .toISOString()



    };





    WorkspaceSystem.currentWorkspace.members.push(

        member

    );





    saveWorkspaces();



    renderWorkspaces();



}









/*
   CHANGE PERMISSION
*/


function updateMemberRole(
email,
role
){



    if(
    !WorkspaceSystem.currentWorkspace
    )
    return;





    const member =

    WorkspaceSystem.currentWorkspace.members.find(

        item=>

        item.email===email

    );





    if(member){



        member.role=role;



        saveWorkspaces();



    }




}/* =====================================
   OMNI DATA PRO
   FINAL WORKSPACES.JS
   PART 3/3
===================================== */





/*
   SYNC WORKSPACES WITH DATABASE
*/


async function syncWorkspaces(){



    try{



        if(
        typeof OmniDatabase==="undefined"
        )
        return;





        const remote =

        await OmniDatabase.fetch(

            "workspaces"

        );





        if(remote && remote.length){



            WorkspaceSystem.workspaces =
            remote;



            saveWorkspaces();



            renderWorkspaces();



        }



    }



    catch(error){



        console.error(

        "Workspace Sync Error:",

        error

        );



    }



}









/*
   SAVE REMOTE WORKSPACE
*/


async function saveWorkspaceRemote(
workspace
){



    try{



        if(
        typeof OmniDatabase==="undefined"
        )
        return;





        await OmniDatabase.insert(

            "workspaces",

            workspace

        );



    }



    catch(error){



        console.error(

        "Remote Save Error:",

        error

        );



    }



}









/*
   DELETE WORKSPACE
*/


async function deleteWorkspace(
id
){



    const workspace =

    WorkspaceSystem.workspaces.find(

        item=>

        item.id===id

    );





    if(!workspace)
    return;





    WorkspaceSystem.workspaces =

    WorkspaceSystem.workspaces.filter(

        item=>

        item.id!==id

    );





    if(
    WorkspaceSystem.currentWorkspace
    &&
    WorkspaceSystem.currentWorkspace.id===id
    ){


        WorkspaceSystem.currentWorkspace=null;


    }





    saveWorkspaces();



    renderWorkspaces();





    showMessage(

    "Workspace deleted",

    "success"

    );



}









/*
   CHECK PERMISSION
*/


function hasWorkspacePermission(
role
){



    if(
    !WorkspaceSystem.currentWorkspace
    )
    return false;





    const user =

    WorkspaceSystem.currentWorkspace.members.find(

        member=>

        member.email===

        OmniApp.currentUser?.email

    );





    if(!user)
    return false;





    return user.role===role
    ||
    user.role==="admin";



}









/*
   GET CURRENT WORKSPACE
*/


function getCurrentWorkspace(){



    return WorkspaceSystem.currentWorkspace;



}









/*
   FINAL WORKSPACE START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeWorkspace();



    syncWorkspaces();



});
