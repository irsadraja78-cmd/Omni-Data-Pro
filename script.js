// LOGIN FUNCTION
function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email !== "" && password !== ""){
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("app").classList.remove("hidden");
    } else {
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
    } else {
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

// DEMO DATA COUNTER & SYSTEM INIT
document.addEventListener("DOMContentLoaded", function(){
    let projects = document.getElementById("projectTotal");
    let clients = document.getElementById("clientTotal");
    let files = document.getElementById("fileTotal");
    let tasks = document.getElementById("taskTotal");

    if(projects) projects.innerHTML = "25";
    if(clients) clients.innerHTML = "120";
    if(files) files.innerHTML = "560";
    if(tasks) tasks.innerHTML = "340";
});

// REAL-TIME CLIENT ADDING FUNCTION
function addNewClient() {
    let name = document.getElementById("clientNameInput").value;
    let email = document.getElementById("clientEmailInput").value;
    let container = document.getElementById("clientContainer");

    if(name !== "" && email !== "") {
        let card = document.createElement("div");
        card.className = "client-card";
        card.innerHTML = `<div><h3>${name}</h3><p>Email: ${email}</p></div><span>Active</span>`;
        
        container.appendChild(card);
        
        document.getElementById("clientNameInput").value = "";
        document.getElementById("clientEmailInput").value = "";
        
        alert("Client added successfully to the system!");
    } else {
        alert("Please fill in both client name and email.");
    }
}

// REAL-TIME SETTINGS SAVE FUNCTION
function saveCompanySettings() {
    let compName = document.getElementById("companyNameInput").value;
    let compEmail = document.getElementById("companyEmailInput").value;

    if(compName !== "" && compEmail !== "") {
        alert("Settings updated successfully for " + compName);
    } else {
        alert("Fields cannot be empty!");
    }
}
