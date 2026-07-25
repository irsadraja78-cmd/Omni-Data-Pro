// OmniDataPro - Authentication System


async function signupUser(email, password){


const { data, error } = await supabaseClient.auth.signUp({

email: email,

password: password

});


if(error){

console.log(error.message);

return false;

}


return true;


}




async function loginUser(email, password){


const { data, error } = await supabaseClient.auth.signInWithPassword({

email: email,

password: password

});


if(error){

alert(error.message);

return false;

}


return true;


}





async function logoutUser(){


await supabaseClient.auth.signOut();


location.reload();


}






async function forgotPassword(email){


const { error } = await supabaseClient.auth.resetPasswordForEmail(

email

);


if(error){

alert(error.message);

}

else{

alert("Password reset link sent");

}


}






async function checkSession(){


const { data } = await supabaseClient.auth.getSession();


if(data.session){

console.log("User Logged In");

}

else{

console.log("No User Session");

}


}



checkSession();
