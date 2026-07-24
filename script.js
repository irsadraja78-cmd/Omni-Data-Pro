
// Omni Data Pro - Main Script


// Login Function

const loginButton = document.querySelector(".login-box button");


loginButton.addEventListener("click", function(){

    const email = document.querySelector(
        'input[type="email"]'
    ).value;


    const password = document.querySelector(
        'input[type="password"]'
    ).value;



    if(email === "" || password === ""){

        alert(
            "Please enter email and password"
        );

    }

    else{

        alert(
            "Login successful! Welcome to Omni Data Pro"
        );

    }

});




// Signup Button

const signupButton = document.querySelector(
    ".signup"
);


signupButton.addEventListener(
"click",
function(){

    alert(
        "Signup page will be added soon"
    );

});




// Forgot Password

const forgotPassword =
document.querySelector(
    ".login-box a"
);


forgotPassword.addEventListener(
"click",
function(e){

    e.preventDefault();


    alert(
        "Password recovery system will be added soon"
    );

});




// AI Teacher Welcome

window.onload = function(){

    console.log(
        "Welcome to Omni Data Pro AI Teacher"
    );

};