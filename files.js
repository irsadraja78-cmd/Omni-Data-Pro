// OmniDataPro File & Folder System


// ===============================
// CREATE FOLDER
// ===============================


function createFolder(folderName){


if(!folderName){

alert("Enter Folder Name");

return;

}



let currentWork =
localStorage.getItem("currentWork");



let folders =
JSON.parse(
localStorage.getItem("odpFolders")
) || {};



if(!folders[currentWork]){

folders[currentWork]=[];

}



folders[currentWork].push({

name: folderName,

files:[],

date:
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


let box =
document.getElementById(
"folderList"
);



if(!box) return;



let currentWork =
localStorage.getItem(
"currentWork"
);



let folders =
JSON.parse(
localStorage.getItem("odpFolders")
) || {};



box.innerHTML="";



if(folders[currentWork]){


folders[currentWork].forEach(function(folder){



box.innerHTML += `

<div class="folder-card">

📁 ${folder.name}

</div>

`;


});


}


}








// ===============================
// ADD FILE
// ===============================


function uploadFile(){


let input =
document.getElementById(
"fileInput"
);



if(!input || !input.files.length){

alert("Select File");

return;

}



let currentWork =
localStorage.getItem(
"currentWork"
);



let files =
JSON.parse(
localStorage.getItem("odpFiles")
) || {};



if(!files[currentWork]){

files[currentWork]=[];

}



files[currentWork].push({

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
// SHOW FILES
// ===============================


function loadFiles(){


let list =
document.getElementById(
"fileList"
);



if(!list)return;



let currentWork =
localStorage.getItem(
"currentWork"
);



let files =
JSON.parse(
localStorage.getItem("odpFiles")
) || {};



list.innerHTML="";



if(files[currentWork]){


files[currentWork].forEach(function(file,index){



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


}








// ===============================
// DELETE FILE
// ===============================


function deleteFile(index){


let currentWork =
localStorage.getItem(
"currentWork"
);



let files =
JSON.parse(
localStorage.getItem("odpFiles")
) || {};



files[currentWork].splice(index,1);



localStorage.setItem(

"odpFiles",

JSON.stringify(files)

);



loadFiles();


}








document.addEventListener(

"DOMContentLoaded",

function(){

loadFolders();

loadFiles();

}

);
