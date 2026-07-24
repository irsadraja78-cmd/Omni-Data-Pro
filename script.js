
// SHOW LOGIN

function showLogin(){

    document.getElementById("loginBox").classList.remove("hidden");

    document.getElementById("signupBox").classList.add("hidden");

    document.getElementById("forgotBox").classList.add("hidden");

}





// SHOW SIGNUP

function showSignup(){

    document.getElementById("loginBox").classList.add("hidden");

    document.getElementById("signupBox").classList.remove("hidden");

    document.getElementById("forgotBox").classList.add("hidden");

}





// SHOW FORGOT PASSWORD

function showForgot(){

    document.getElementById("loginBox").classList.add("hidden");

    document.getElementById("signupBox").classList.add("hidden");

    document.getElementById("forgotBox").classList.remove("hidden");

}







// REGISTER USER

function registerUser(){


let name = document.getElementById("signupName").value;

let email = document.getElementById("signupEmail").value;

let password = document.getElementById("signupPassword").value;



if(name==="" || email==="" || password===""){

    alert("Please fill all fields");

    return;

}




let user={

    name:name,

    email:email,

    password:password

};




localStorage.setItem(
"odpUser",
JSON.stringify(user)
);



alert("Account created successfully");


showLogin();



}









// LOGIN USER

function loginUser(){


let email=document.getElementById("loginEmail").value;

let password=document.getElementById("loginPassword").value;



let savedUser=localStorage.getItem("odpUser");



if(!savedUser){

    alert("Account not found. Please Sign Up");

    return;

}




let user=JSON.parse(savedUser);





if(email===user.email && password===user.password){



localStorage.setItem(
"odpSession",
"active"
);



openDashboard();



}

else{


alert("Wrong email or password");


}



}









// OPEN DASHBOARD

function openDashboard(){


document.getElementById("loginBox").classList.add("hidden");

document.getElementById("signupBox").classList.add("hidden");

document.getElementById("forgotBox").classList.add("hidden");


document.getElementById("dashboard").classList.remove("hidden");


}









// FORGOT PASSWORD

function resetPassword(){


let email=document.getElementById("forgotEmail").value;


let savedUser=localStorage.getItem("odpUser");



if(!savedUser){

alert("No account found");

return;

}



let user=JSON.parse(savedUser);



if(email===user.email){


alert("Password reset request accepted. Contact admin for reset.");


showLogin();



}

else{


alert("Email not registered");


}



}








// LOGOUT

function logoutUser(){


localStorage.removeItem("odpSession");


document.getElementById("dashboard").classList.add("hidden");


showLogin();



}







// AUTO LOGIN

window.onload=function(){


let session=localStorage.getItem("odpSession");



if(session==="active"){

    openDashboard();

}


}
