/* =====================================
   OMNI DATA PRO
   FINAL AUTH.JS (UPGRADED)
   PART 1/3
===================================== */



/*
   AUTH STATE
*/


const AuthSystem = {


    user:null,


    loading:false,


    initialized:false



};









/*
   AUTH INITIALIZATION
*/


function initializeAuth(){



    if(AuthSystem.initialized)
        return;



    AuthSystem.initialized=true;



    setupAuthButtons();


    checkAuthSession();



}









/*
   BUTTON EVENTS
*/


function setupAuthButtons(){



    const loginBtn =
    document.getElementById(
    "login-btn"
    );



    const signupBtn =
    document.getElementById(
    "signup-btn"
    );



    const forgotBtn =
    document.getElementById(
    "forgot-btn"
    );





    const showSignup =
    document.getElementById(
    "show-signup"
    );



    const showForgot =
    document.getElementById(
    "show-forgot"
    );





    const backLogin1 =
    document.getElementById(
    "back-login-from-signup"
    );



    const backLogin2 =
    document.getElementById(
    "back-login-from-forgot"
    );








    if(loginBtn){


        loginBtn.onclick =
        loginUser;


    }





    if(signupBtn){


        signupBtn.onclick =
        signupUser;


    }





    if(forgotBtn){


        forgotBtn.onclick =
        resetPassword;


    }









    if(showSignup){


        showSignup.onclick =
        ()=>switchAuthBox(
        "signup-box"
        );


    }







    if(showForgot){


        showForgot.onclick =
        ()=>switchAuthBox(
        "forgot-box"
        );


    }







    if(backLogin1){


        backLogin1.onclick =
        ()=>switchAuthBox(
        "login-box"
        );


    }





    if(backLogin2){


        backLogin2.onclick =
        ()=>switchAuthBox(
        "login-box"
        );


    }





}









/*
   AUTH SCREEN SWITCH
*/


function switchAuthBox(id){



    const boxes =
    document.querySelectorAll(
    ".auth-card"
    );



    boxes.forEach(
    box=>{


        box.classList.add(
        "hidden"
        );


    });




    const target =
    document.getElementById(
    id
    );



    if(target){


        target.classList.remove(
        "hidden"
        );


    }



}









/*
   LOGIN (Upgraded with Supabase)
*/


async function loginUser(){



    const email =
    document.getElementById(
    "login-email"
    ).value.trim();



    const password =
    document.getElementById(
    "login-password"
    ).value.trim();





    if(!email || !password){


        showMessage(
        "Email and password required",
        "error"
        );


        return;


    }




    try{


        AuthSystem.loading=true;



        if(typeof supabaseClient === "undefined"){
            throw new Error("Supabase client not initialized");
        }

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if(error) throw error;



        const user={


            email: data.user.email,
            id: data.user.id,


            loginTime:
            new Date().toISOString()


        };





        localStorage.setItem(
        "omni_user",
        JSON.stringify(user)
        );



        AuthSystem.user=user;



        showMessage("Login successful", "success");

        openApplication();




    }

    catch(error){


        console.error(error);



        showMessage(
        error.message || "Login failed",
        "error"
        );



    }

    finally{


        AuthSystem.loading=false;


    }



}/* =====================================
   OMNI DATA PRO
   FINAL AUTH.JS (UPGRADED)
   PART 2/3
===================================== */





/*
   SIGNUP SYSTEM (Upgraded with Supabase)
*/


async function signupUser(){



    const name =
    document.getElementById(
    "signup-name"
    ).value.trim();



    const email =
    document.getElementById(
    "signup-email"
    ).value.trim();



    const password =
    document.getElementById(
    "signup-password"
    ).value.trim();





    if(!name || !email || !password){


        showMessage(
        "All fields are required",
        "error"
        );


        return;


    }






    if(password.length < 6){


        showMessage(
        "Password must be minimum 6 characters",
        "error"
        );


        return;


    }





    try{


        AuthSystem.loading=true;



        if(typeof supabaseClient === "undefined"){
            throw new Error("Supabase client not initialized");
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: name }
            }
        });

        if(error) throw error;

        if(data && data.user){
            await supabaseClient.from("profiles").insert([{
                id: data.user.id,
                name: name,
                email: email,
                created_at: new Date().toISOString()
            }]);
        }



        const newUser={


            name:name,


            email:email,


            createdAt:
            new Date().toISOString()



        };





        localStorage.setItem(
        "omni_user",
        JSON.stringify(newUser)
        );



        AuthSystem.user =
        newUser;





        showMessage(
        "Account created successfully",
        "success"
        );



        switchAuthBox("login-box");




    }


    catch(error){



        console.error(error);



        showMessage(
        error.message || "Signup failed",
        "error"
        );



    }



    finally{


        AuthSystem.loading=false;


    }




}









/*
   FORGOT PASSWORD
*/


async function resetPassword(){



    const email =
    document.getElementById(
    "forgot-email"
    ).value.trim();





    if(!email){


        showMessage(
        "Email required",
        "error"
        );


        return;


    }





    try{



        if(typeof supabaseClient !== "undefined"){
            await supabaseClient.auth.resetPasswordForEmail(email);
        }





        showMessage(
        "Password reset link sent",
        "success"
        );





    }


    catch(error){



        console.error(error);



        showMessage(
        error.message || "Reset password failed",
        "error"
        );



    }



}









/*
   SESSION CHECK
*/


function checkAuthSession(){



    const savedUser =
    localStorage.getItem(
    "omni_user"
    );




    if(savedUser){



        try{


            AuthSystem.user =
            JSON.parse(
            savedUser
            );



            OmniApp.currentUser =
            AuthSystem.user;



            openApplication();



        }


        catch(error){



            localStorage.removeItem(
            "omni_user"
            );


            openAuthentication();



        }




    }

    else{


        openAuthentication();


    }




}









/*
   GET CURRENT USER
*/


function getCurrentUser(){



    return AuthSystem.user;



}









/*
   UPDATE USER DATA
*/


function updateUserData(data){



    const user = {

        ...AuthSystem.user,

        ...data


    };




    AuthSystem.user=user;



    localStorage.setItem(
    "omni_user",
    JSON.stringify(user)
    );




    return user;



}/* =====================================
   OMNI DATA PRO
   FINAL AUTH.JS (UPGRADED)
   PART 3/3
===================================== */





/*
   SUPABASE AUTH CONNECTION
*/


async function initializeSupabaseAuth(){



    try{



        if(
        typeof supabaseClient !== "undefined"
        ){



            const {
                data
            } =
            await supabaseClient.auth.getSession();





            if(data.session){



                AuthSystem.user =
                data.session.user;



                OmniApp.currentUser =
                AuthSystem.user;



                localStorage.setItem(
                "omni_user",
                JSON.stringify(
                AuthSystem.user
                )
                );



                openApplication();



            }




        }



    }


    catch(error){



        console.error(
        "Supabase Auth Error:",
        error
        );



    }



}









/*
   AUTH STATE LISTENER
*/


function setupAuthListener(){



    if(
    typeof supabaseClient === "undefined"
    )
    return;





    supabaseClient.auth.onAuthStateChange(
    (
        event,
        session
    )=>{



        console.log(
        "Auth Event:",
        event
        );





        if(session){



            AuthSystem.user =
            session.user;



            localStorage.setItem(
            "omni_user",
            JSON.stringify(
            session.user
            )
            );



        }

        else{


            AuthSystem.user=null;



            localStorage.removeItem(
            "omni_user"
            );



        }





    });



}









/*
   SECURE LOGOUT
*/


async function secureLogout(){



    try{



        if(
        typeof supabaseClient !== "undefined"
        ){


            await supabaseClient.auth.signOut();


        }




        AuthSystem.user=null;



        localStorage.removeItem(
        "omni_user"
        );



        openAuthentication();





    }


    catch(error){



        console.error(
        "Logout Error:",
        error
        );



    }



}









/*
   AUTH USER CHECK
*/


function isUserLoggedIn(){



    return AuthSystem.user !== null;



}









/*
   FINAL AUTH START
*/


document.addEventListener(
"DOMContentLoaded",
()=>{



    initializeAuth();



    initializeSupabaseAuth();



    setupAuthListener();



});
