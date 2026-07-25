// OmniDataPro Main Controller Final


// ===============================
// SIDEBAR CONTROL
// ===============================


function openSidebar(){

    const sidebar = document.getElementById("sidebar");

    if(sidebar){

        sidebar.classList.add("active");

    }

}




function closeSidebar(){

    const sidebar = document.getElementById("sidebar");

    if(sidebar){

        sidebar.classList.remove("active");

    }

}







// ===============================
// PAGE NAVIGATION
// ===============================


function openPage(pageName){


    const pages = document.querySelectorAll(".page");


    pages.forEach(function(page){

        page.style.display = "none";

    });



    const target =
    document.getElementById(pageName);



    if(target){

        target.style.display = "block";

    }



    closeSidebar();


}








// ===============================
// BACK BUTTON
// ===============================


function goBack(){

    history.back();

}








// ===============================
// START APP
// ===============================


function startOmniDataPro(){


    console.log(
        "OmniDataPro Started"
    );



    if(typeof loadDashboard === "function"){

        loadDashboard();

    }



    if(typeof loadFolders === "function"){

        loadFolders();

    }



    if(typeof loadFiles === "function"){

        loadFiles();

    }



    if(typeof loadProfile === "function"){

        loadProfile();

    }



    if(typeof loadSettings === "function"){

        loadSettings();

    }


}








// ===============================
// CLOSE SIDEBAR OUTSIDE CLICK
// ===============================


document.addEventListener(
"click",
function(event){


const sidebar =
document.getElementById("sidebar");

const menuButton =
event.target.closest("button");



if(
sidebar &&
sidebar.classList.contains("active") &&
!sidebar.contains(event.target) &&
!menuButton
){

closeSidebar();

}



});








// ===============================
// INITIAL LOAD
// ===============================


document.addEventListener(
"DOMContentLoaded",
function(){


startOmniDataPro();


});
