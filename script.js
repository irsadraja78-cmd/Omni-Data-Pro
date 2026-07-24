// Omni Data Pro - Main Script


// Login Button

const loginButton = document.querySelector(".login-box button");


if(loginButton){

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

            // Open Dashboard

            window.location.href = "dashboard.html";

        }


    });

}




// Signup Button

const signupButton = document.querySelector(".signup");


if(signupButton){

    signupButton.addEventListener("click", function(){

        alert(
            "Signup system will be added soon"
        );

    });

}





// Forgot Password

const forgotPassword = document.querySelector(
    ".login-box a"
);


if(forgotPassword){

    forgotPassword.addEventListener(
        "click",
        function(event){

            event.preventDefault();

            alert(
                "Password recovery system will be added soon"
            );

        }
    );

}




// AI Teacher Message

console.log(
    "Welcome to Omni Data Pro AI Teacher"
);