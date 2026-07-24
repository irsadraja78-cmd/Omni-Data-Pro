// LOGIN SYSTEM
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
        alert("Please enter your email");
    }
}

// TAB SWITCHING
function openTab(sectionId){
    let sections = document.querySelectorAll(".content-section");
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

// LOGOUT
function logout(){
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginScreen").classList.remove("hidden");
}

// ADD CLIENT DYNAMICALLY
function addNewClient() {
    let name = document.getElementById("clientNameInput").value;
    let email = document.getElementById("clientEmailInput").value;
    let container = document.getElementById("clientContainer");

    if(name !== "" && email !== "") {
        let div = document.createElement("div");
        div.className = "item-card";
        div.innerHTML = `<div><h3>${name}</h3><p>${email}</p></div><span>Active</span>`;
        container.appendChild(div);

        document.getElementById("clientNameInput").value = "";
        document.getElementById("clientEmailInput").value = "";
        alert("Client added successfully!");
    } else {
        alert("Please fill in both fields");
    }
}

// SAVE SETTINGS
function saveCompanySettings() {
    let name = document.getElementById("companyNameInput").value;
    if(name !== "") {
        alert("Settings saved successfully for " + name);
    } else {
        alert("Company name cannot be empty");
    }
}
