// OmniDataPro Authentication System


// ===============================
// SIGNUP
// ===============================

async function signupUser(email, password) {

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });


    if (error) {

        alert(error.message);
        return false;

    }


    alert("Account Created Successfully");

    openPage("loginPage");

    return true;

}




// ===============================
// LOGIN
// ===============================

async function loginUser(email, password) {


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({

            email: email,
            password: password

        });



    if (error) {

        addLoginAttempt();

        alert(error.message);

        return false;

    }



    resetLoginAttempts();



    // Hide Auth Pages

    document.getElementById("loginPage").style.display="none";

    document.getElementById("mainApp").style.display="block";



    openPage("dashboardPage");



    return true;


}







// ===============================
// FORGOT PASSWORD
// ===============================

async function forgotPassword(email){


const {error} =
await supabaseClient.auth.resetPasswordForEmail(email);



if(error){

alert(error.message);

return;

}



alert(
"Password Reset Link Sent"
);


}








// ===============================
// LOGOUT
// ===============================

async function logoutAccount(){


await supabaseClient.auth.signOut();


localStorage.clear();


document.getElementById("mainApp").style.display="none";


openPage("loginPage");


}







// ===============================
// SESSION CHECK
// ===============================

async function checkUserSession(){


const {data} =
await supabaseClient.auth.getSession();



if(data.session){


document.getElementById("loginPage").style.display="none";


document.getElementById("mainApp").style.display="block";


openPage("dashboardPage");


}

else{


document.getElementById("mainApp").style.display="none";


openPage("loginPage");


}



}







document.addEventListener(
"DOMContentLoaded",
function(){

checkUserSession();

}

);
