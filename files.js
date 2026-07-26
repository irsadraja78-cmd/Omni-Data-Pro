/* =====================================
   OMNI DATA PRO
   FINAL FILE.JS
   PART 1/3
===================================== */





/*
   FILE SYSTEM STATE
*/


const FileSystem = {


    initialized:false,


    files:[],


    uploading:false



};









/*
   FILE SYSTEM INITIALIZATION
*/


function initializeFiles(){



    if(
    FileSystem.initialized
    )
    return;



    FileSystem.initialized=true;



    loadFiles();



    setupFileEvents();



    renderFiles();



}









/*
   FILE EVENTS
*/


function setupFileEvents(){



    const uploadBtn =
    document.getElementById(
    "upload-file-btn"
    );



    const input =
    document.getElementById(
    "file-upload"
    );





    if(uploadBtn){



        uploadBtn.addEventListener(

        "click",

        ()=>{


            uploadSelectedFile();



        });


    }









    if(input){



        input.addEventListener(

        "change",

        ()=>{


            if(input.files.length){


                uploadBtn.disabled=false;


            }



        });


    }



}









/*
   UPLOAD SELECTED FILE
*/


async function uploadSelectedFile(){



    const input =
    document.getElementById(
    "file-upload"
    );





    if(
    !input ||
    !input.files.length
    ){



        showMessage(
        "Select a file first",
        "error"
        );


        return;



    }







    const file =
    input.files[0];





    try{



        FileSystem.uploading=true;





        let uploaded=null;





        if(
        typeof OmniStorage !== "undefined"
        &&
        OmniStorage.uploadFile
        ){



            uploaded =

            await OmniStorage.uploadFile(
            file
            );



        }








        const fileData={



            id:
            Date.now(),



            name:
            file.name,



            size:
            file.size,



            type:
            file.type,



            uploadedAt:
            new Date()
            .toISOString(),



            path:
            uploaded
            ?
            uploaded.path
            :
            null



        };





        FileSystem.files.push(
        fileData
        );





        saveFiles();



        renderFiles();



        showMessage(
        "File uploaded successfully",
        "success"
        );





        fileUploaded(
        file.name
        );




    }



    catch(error){



        console.error(

        "Upload Error:",

        error

        );



        showMessage(
        "File upload failed",
        "error"
        );



    }



    finally{


        FileSystem.uploading=false;


    }



}/* =====================================
   OMNI DATA PRO
   FINAL FILE.JS
   PART 2/3
===================================== */





/*
   SAVE FILE DATA
*/


function saveFiles(){



    localStorage.setItem(

        "omni_files",

        JSON.stringify(
        FileSystem.files
        )

    );



}









/*
   LOAD FILE DATA
*/


function loadFiles(){



    const saved =

    localStorage.getItem(
    "omni_files"
    );





    if(saved){



        FileSystem.files =

        JSON.parse(
        saved
        );



    }



}









/*
   RENDER FILE LIST
*/


function renderFiles(
list=FileSystem.files
){



    const container =

    document.getElementById(
    "file-list"
    );





    if(!container)
    return;





    if(
    list.length===0
    ){



        container.innerHTML=`

        <div class="file-empty">

            No files available

        </div>

        `;



        return;



    }








    container.innerHTML =



    list.map(

    file=>`


    <div class="file-item">



        <div class="file-info">


            <strong>
            ${file.name}
            </strong>



            <small>

            ${formatFileSize(
            file.size
            )}

            </small>


        </div>




        <div class="file-actions">



            <button
            onclick="downloadFile(${file.id})"
            >

            Download

            </button>




            <button
            onclick="deleteFile(${file.id})"
            >

            Delete

            </button>



        </div>



    </div>



    `

    )

    .join("");



}









/*
   FORMAT FILE SIZE
*/


function formatFileSize(
bytes
){



    if(bytes===0)
    return "0 Bytes";



    const sizes=[

        "Bytes",
        "KB",
        "MB",
        "GB"

    ];





    const index =

    Math.floor(

        Math.log(bytes)

        /

        Math.log(1024)

    );





    return (

        Math.round(

            bytes /

            Math.pow(
            1024,
            index
            )

        )

        +

        " "

        +

        sizes[index]

    );



}









/*
   DELETE FILE
*/


async function deleteFile(
id
){



    try{



        const file =

        FileSystem.files.find(

            item=>

            item.id===id

        );





        if(!file)
        return;





        FileSystem.files =

        FileSystem.files.filter(

            item=>

            item.id!==id

        );





        saveFiles();



        renderFiles();





        showMessage(

        "File deleted",

        "success"

        );



    }



    catch(error){



        console.error(

        "Delete Error:",

        error

        );



    }



}









/*
   DOWNLOAD FILE
*/


async function downloadFile(
id
){



    const file =

    FileSystem.files.find(

        item=>

        item.id===id

    );





    if(!file)
    return;





    try{



        if(
        file.path
        &&
        typeof OmniStorage !== "undefined"
        ){



            const url =

            await OmniStorage.getFileUrl(

                file.path

            );





            window.open(
            url,
            "_blank"
            );



        }

        else{


            showMessage(

            "Download link not available",

            "warning"

            );


        }



    }



    catch(error){



        console.error(

        "Download Error:",

        error

        );



    }



}









/*
   FILE SEARCH
*/


function searchFiles(
query
){



    const result =

    FileSystem.files.filter(

    file=>

    file.name

    .toLowerCase()

    .includes(

    query.toLowerCase()

    )



    );





    renderFiles(
    result
    );/* =====================================
   OMNI DATA PRO
   FINAL FILE.JS
   PART 3/3
===================================== */





/*
   SAVE FILE METADATA TO DATABASE
*/


async function saveFileMetadata(
fileData
){



    try{



        if(
        typeof OmniDatabase === "undefined"
        )
        return;





        await OmniDatabase.insert(

            "files",

            fileData

        );



    }



    catch(error){



        console.error(

        "Metadata Save Error:",

        error

        );



    }



}









/*
   DELETE STORAGE FILE
*/


async function deleteStorageFile(
path
){



    try{



        if(
        typeof supabaseClient === "undefined"
        )
        return;






        const {
            error
        }
        =

        await supabaseClient

        .storage

        .from("files")

        .remove([path]);





        if(error)
        throw error;




    }



    catch(error){



        console.error(

        "Storage Delete Error:",

        error

        );



    }



}









/*
   DRAG AND DROP UPLOAD
*/


function setupDragDrop(){



    const area =

    document.getElementById(
    "drop-area"
    );





    if(!area)
    return;





    area.addEventListener(

    "dragover",

    event=>{


        event.preventDefault();



        area.classList.add(
        "drag-active"
        );


    });








    area.addEventListener(

    "dragleave",

    ()=>{


        area.classList.remove(
        "drag-active"
        );


    });








    area.addEventListener(

    "drop",

    event=>{


        event.preventDefault();



        area.classList.remove(
        "drag-active"
        );





        const files =

        event.dataTransfer.files;





        if(files.length){



            uploadDroppedFile(
            files[0]
            );



        }



    });



}









/*
   UPLOAD DROPPED FILE
*/


async function uploadDroppedFile(
file
){



    try{



        if(
        typeof OmniStorage !== "undefined"
        ){



            const result =

            await OmniStorage.uploadFile(
            file
            );





            const data={



                id:
                Date.now(),



                name:
                file.name,



                size:
                file.size,



                type:
                file.type,



                path:
                result
                ?
                result.path
                :
                null,



                uploadedAt:
                new Date()
                .toISOString()



            };





            FileSystem.files.push(
            data
            );





            saveFiles();



            renderFiles();



            await saveFileMetadata(
            data
            );



        }



    }



    catch(error){



        console.error(

        "Drop Upload Error:",

        error

        );



    }



}









/*
   FILE SYSTEM REFRESH
*/


function refreshFiles(){



    loadFiles();



    renderFiles();



}









/*
   FINAL FILE SYSTEM START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeFiles();



    setupDragDrop();



});
