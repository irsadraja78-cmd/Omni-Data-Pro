
// LOGIN FUNCTION

function login(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;


    if(email !== "" && password !== ""){


        document.getElementById("loginScreen").classList.add("hidden");

        document.getElementById("app").classList.remove("hidden");


    }
    else{

        alert("Please enter email and password");

    }

}





// FORGOT PASSWORD

function showForgot(){

    document.getElementById("loginScreen").classList.add("hidden");

    document.getElementById("forgotScreen").classList.remove("hidden");


}



function backLogin(){

    document.getElementById("forgotScreen").classList.add("hidden");

    document.getElementById("loginScreen").classList.remove("hidden");


}



function resetPassword(){

    let email = document.getElementById("resetEmail").value;


    if(email !== ""){

        alert("Password reset link sent to your email");

        backLogin();

    }

    else{

        alert("Enter your email");

    }

}







// SIDEBAR SECTION SWITCH


function openTab(section){


    let sections = document.querySelectorAll(".content-section");


    sections.forEach(function(item){

        item.classList.add("hidden");

    });



    document.getElementById(section).classList.remove("hidden");


}







// LOGOUT


function logout(){


    document.getElementById("app").classList.add("hidden");


    document.getElementById("loginScreen").classList.remove("hidden");


}







// DEMO DATA COUNTER


document.addEventListener("DOMContentLoaded",function(){


    let projects = document.getElementById("projectTotal");

    let clients = document.getElementById("clientTotal");

    let files = document.getElementById("fileTotal");

    let tasks = document.getElementById("taskTotal");



    if(projects){

        projects.innerHTML = "25";

    }


    if(clients){

        clients.innerHTML = "120";

    }


    if(files){

        files.innerHTML = "560";

    }


    if(tasks){

        tasks.innerHTML = "340";

    }


});
