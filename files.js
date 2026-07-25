// OmniDataPro File & Folder System Final


// ===============================
// CREATE FOLDER
// ===============================


function createFolder(folderName){


    if(!folderName){

        alert("Folder name required");

        return;

    }



    const work =
    getCurrentWork();



    if(!work){

        alert("Select Work First");

        return;

    }



    let folders =
    JSON.parse(
        localStorage.getItem("odpFolders")
    ) || {};



    if(!folders[work.id]){

        folders[work.id]=[];

    }



    folders[work.id].push({

        name:folderName,

        created:
        new Date().toLocaleString()

    });



    localStorage.setItem(

        "odpFolders",

        JSON.stringify(folders)

    );



    loadFolders();


}







// ===============================
// LOAD FOLDERS
// ===============================


function loadFolders(){


    const box =
    document.getElementById(
        "folderList"
    );


    if(!box)return;



    const work =
    getCurrentWork();



    if(!work)return;



    let folders =
    JSON.parse(
        localStorage.getItem("odpFolders")
    ) || {};



    box.innerHTML="";



    (folders[work.id] || [])
    .forEach(function(folder){


        box.innerHTML += `

        <div class="folder-card">

        📁 ${folder.name}

        </div>

        `;


    });


}








// ===============================
// UPLOAD FILE
// ===============================


function uploadFile(){



    const input =
    document.getElementById(
        "fileInput"
    );



    if(!input || !input.files.length){

        alert("Select File");

        return;

    }



    const work =
    getCurrentWork();



    if(!work){

        alert("Select Work First");

        return;

    }



    let files =
    JSON.parse(
        localStorage.getItem("odpFiles")
    ) || {};



    if(!files[work.id]){

        files[work.id]=[];

    }



    files[work.id].push({


        name:
        input.files[0].name,


        size:
        input.files[0].size,


        date:
        new Date().toLocaleString()


    });



    localStorage.setItem(

        "odpFiles",

        JSON.stringify(files)

    );



    loadFiles();


}







// ===============================
// LOAD FILES
// ===============================


function loadFiles(){



    const list =
    document.getElementById(
        "fileList"
    );



    if(!list)return;



    const work =
    getCurrentWork();



    if(!work)return;



    let files =
    JSON.parse(
        localStorage.getItem("odpFiles")
    ) || {};



    list.innerHTML="";



    (files[work.id] || [])
    .forEach(function(file,index){


        list.innerHTML += `

        <div class="file-card">

        📄 ${file.name}

        <button onclick="deleteFile(${index})">

        Delete

        </button>

        </div>

        `;


    });



}








// ===============================
// DELETE FILE
// ===============================


function deleteFile(index){


    const work =
    getCurrentWork();



    let files =
    JSON.parse(
        localStorage.getItem("odpFiles")
    ) || {};



    files[work.id].splice(index,1);



    localStorage.setItem(

        "odpFiles",

        JSON.stringify(files)

    );



    loadFiles();


}







console.log(
"OmniDataPro File System Active"
);
