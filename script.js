// OmniDataPro Main Controller


// ===============================
// SIDEBAR SYSTEM
// ===============================


function openSidebar(){


let sidebar =
document.getElementById("sidebar");


if(sidebar){

sidebar.classList.add("active");

}


}




function closeSidebar(){


let sidebar =
document.getElementById("sidebar");


if(sidebar){

sidebar.classList.remove("active");

}


}






// ===============================
// PAGE CONTROL
// ===============================


function openPage(pageName){



let pages =
document.querySelectorAll(".page");



pages.forEach(function(page){


page.style.display="none";


});



let target =
document.getElementById(pageName);



if(target){


target.style.display="block";


}



// Close sidebar after selection

closeSidebar();



}








// ===============================
// BACK BUTTON
// ===============================


function goBack(){


history.back();


}








// ===============================
// APP START
// ===============================


function startOmniDataPro(){


console.log(
"OmniDataPro System Started"
);



if(typeof loadDashboard === "function"){


loadDashboard();


}



if(typeof loadProfile === "function"){


loadProfile();


}



if(typeof loadSettings === "function"){


loadSettings();


}


}








// ===============================
// USER MENU
// ===============================


function toggleUserMenu(){


let menu =
document.getElementById(
"userMenu"
);



if(menu){


menu.classList.toggle(
"show"
);


}


}








// ===============================
// INITIALIZE
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


startOmniDataPro();


}

);
