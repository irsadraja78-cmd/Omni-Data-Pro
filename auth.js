// =====================================
// OmniDataPro Authentication System
// =====================================


// SIGNUP

async function signup(email, password) {

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });


    if (error) {
        alert(error.message);
        return;
    }


    alert("Account created successfully");

    return data;

}





// LOGIN

async function login(email, password) {

    const { data, error } = await supabaseClient.auth.signInWithPassword({

        email: email,
        password: password

    });


    if (error) {

        alert(error.message);
        return;

    }


    alert("Login successful");

    return data;

}





// LOGOUT

async function logout(){

    const { error } = await supabaseClient.auth.signOut();


    if(error){

        alert(error.message);

    }
    else{

        alert("Logged out");

    }

}





// CHECK USER SESSION

async function checkUser(){

    const { data } = await supabaseClient.auth.getSession();


    if(data.session){

        return data.session.user;

    }


    return null;

}
