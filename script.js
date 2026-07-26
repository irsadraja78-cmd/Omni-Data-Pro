/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 1/3
===================================== */


/*
   GLOBAL APPLICATION STATE
*/


const OmniApp = {


    currentUser: null,


    currentPage: "dashboard-page",


    language: "en",


    initialized: false



};








/*
   APPLICATION START
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    initializeApp();


});









/*
   INITIALIZE SYSTEM
*/


function initializeApp(){


    if(OmniApp.initialized)
        return;



    OmniApp.initialized = true;



    setupNavigation();


    setupMobileMenu();


    setupLanguage();


    setupNotifications();


    setupTheme();



    checkUserSession();



}









/*
   USER SESSION CHECK
*/


function checkUserSession(){


    /*
       Supabase auth state
       will connect here
    */


    const savedUser =
    localStorage.getItem(
    "omni_user"
    );



    if(savedUser){


        OmniApp.currentUser =
        JSON.parse(savedUser);



        openApplication();



    }
    else{


        openAuthentication();



    }



}









/*
   OPEN AUTH SCREEN
*/


function openAuthentication(){


    const auth =
    document.getElementById(
    "auth-section"
    );



    const app =
    document.getElementById(
    "main-app"
    );



    if(auth)
        auth.classList.remove(
        "hidden"
        );



    if(app)
        app.classList.add(
        "hidden"
        );



}









/*
   OPEN MAIN APPLICATION
*/


function openApplication(){


    const auth =
    document.getElementById(
    "auth-section"
    );



    const app =
    document.getElementById(
    "main-app"
    );



    if(auth)
        auth.classList.add(
        "hidden"
        );



    if(app)
        app.classList.remove(
        "hidden"
        );



    loadPage(
    "dashboard-page"
    );


}









/*
   SIDEBAR NAVIGATION
*/


function setupNavigation(){



    const menuButtons =
    document.querySelectorAll(
    ".menu-item"
    );



    menuButtons.forEach(
    button=>{


        button.addEventListener(
        "click",
        ()=>{


            const page =
            button.dataset.page;



            loadPage(page);



        });


    });



}









/*
   PAGE SWITCH SYSTEM
*/


function loadPage(pageId){



    const pages =
    document.querySelectorAll(
    ".app-page"
    );



    pages.forEach(
    page=>{


        page.classList.remove(
        "active-page"
        );


    });





    const target =
    document.getElementById(
    pageId
    );



    if(target){


        target.classList.add(
        "active-page"
        );


        OmniApp.currentPage =
        pageId;



    }





    updateActiveMenu(
    pageId
    );



}









/*
   ACTIVE SIDEBAR ITEM
*/


function updateActiveMenu(pageId){



    const buttons =
    document.querySelectorAll(
    ".menu-item"
    );



    buttons.forEach(
    btn=>{


        btn.classList.remove(
        "active"
        );



        if(btn.dataset.page===pageId){


            btn.classList.add(
            "active"
            );


        }


    });



}/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 2/3
===================================== */





/*
   MOBILE SIDEBAR
*/


function setupMobileMenu(){



    const mobileButton =
    document.querySelector(
    ".mobile-menu"
    );



    const sidebar =
    document.getElementById(
    "sidebar"
    );



    if(!mobileButton || !sidebar)
        return;



    mobileButton.addEventListener(
    "click",
    ()=>{


        sidebar.classList.toggle(
        "show"
        );


    });



}









/*
   LANGUAGE SYSTEM
*/


function setupLanguage(){



    const selector =
    document.getElementById(
    "language-selector"
    );



    if(!selector)
        return;



    selector.addEventListener(
    "change",
    ()=>{


        const lang =
        selector.value;



        OmniApp.language =
        lang;



        localStorage.setItem(
        "omni_language",
        lang
        );



        if(
        typeof changeLanguage === "function"
        ){


            changeLanguage(lang);


        }



    });



    const savedLanguage =
    localStorage.getItem(
    "omni_language"
    );



    if(savedLanguage){


        selector.value =
        savedLanguage;



    }



}









/*
   DARK MODE SYSTEM
*/


function setupTheme(){



    const toggle =
    document.getElementById(
    "dark-mode-toggle"
    );



    if(!toggle)
        return;



    const savedTheme =
    localStorage.getItem(
    "omni_theme"
    );



    if(savedTheme==="dark"){


        document.body.classList.add(
        "dark-mode"
        );


        toggle.checked=true;


    }





    toggle.addEventListener(
    "change",
    ()=>{


        if(toggle.checked){


            document.body.classList.add(
            "dark-mode"
            );


            localStorage.setItem(
            "omni_theme",
            "dark"
            );



        }
        else{


            document.body.classList.remove(
            "dark-mode"
            );


            localStorage.setItem(
            "omni_theme",
            "light"
            );


        }



    });



}









/*
   NOTIFICATION SYSTEM
*/


function setupNotifications(){



    const button =
    document.getElementById(
    "notification-btn"
    );



    const panel =
    document.getElementById(
    "notification-panel"
    );



    if(!button || !panel)
        return;



    button.addEventListener(
    "click",
    ()=>{


        panel.classList.toggle(
        "hidden"
        );


    });



    document.addEventListener(
    "click",
    (event)=>{


        if(
        !panel.contains(event.target)
        &&
        !button.contains(event.target)
        ){


            panel.classList.add(
            "hidden"
            );


        }



    });



}









/*
   LOGOUT SYSTEM
*/


document.addEventListener(
"click",
(event)=>{



    if(
    event.target.closest(
    "#logout-btn"
    )
    ){



        logoutUser();



    }



});









function logoutUser(){



    localStorage.removeItem(
    "omni_user"
    );



    OmniApp.currentUser =
    null;



    openAuthentication();



}









/*
   GLOBAL BUTTON PROTECTION
*/


function showMessage(
message,
type="info"
){



    console.log(
    `[${type}] ${message}`
    );



}









/*
   MODULE CONNECTOR
*/


function initializeModules(){



    if(
    typeof initializeDashboard==="function"
    )
    initializeDashboard();




    if(
    typeof initializeAI==="function"
    )
    initializeAI();




    if(
    typeof initializeFiles==="function"
    )
    initializeFiles();




    if(
    typeof initializeWorkspace==="function"
    )
    initializeWorkspace();



}/* =====================================
   OMNI DATA PRO
   FINAL SCRIPT.JS
   PART 3/3
===================================== */





/*
   AUTH EVENT CONNECTION
*/


function setupAuthConnection(){



    const loginBtn =
    document.getElementById(
    "login-btn"
    );



    const signupBtn =
    document.getElementById(
    "signup-btn"
    );



    const logoutBtn =
    document.getElementById(
    "logout-btn"
    );





    if(loginBtn){


        loginBtn.addEventListener(
        "click",
        ()=>{


            if(
            typeof loginUser === "function"
            ){


                loginUser();


            }


        });


    }






    if(signupBtn){


        signupBtn.addEventListener(
        "click",
        ()=>{


            if(
            typeof signupUser === "function"
            ){


                signupUser();


            }


        });


    }





}









/*
   MODULE STARTUP
*/


function startOmniSystem(){



    try{


        setupAuthConnection();



        initializeModules();



        console.log(
        "Omni Data Pro Started Successfully"
        );



    }

    catch(error){



        console.error(
        "System Startup Error:",
        error
        );



        showMessage(
        "System loading error",
        "error"
        );



    }




}









/*
   GLOBAL DATA STORE
*/


const OmniStorage = {



    save(
    key,
    value
    ){


        localStorage.setItem(
        key,
        JSON.stringify(value)
        );


    },





    get(
    key
    ){


        const data =
        localStorage.getItem(
        key
        );



        return data
        ?
        JSON.parse(data)
        :
        null;



    },





    remove(
    key
    ){


        localStorage.removeItem(
        key
        );


    }



};









/*
   ERROR HANDLER
*/


window.addEventListener(
"error",
(event)=>{



    console.error(
    "Omni Data Pro Error:",
    event.error
    );



});









/*
   NETWORK CHECK
*/


window.addEventListener(
"online",
()=>{


    showMessage(
    "Internet connection restored",
    "success"
    );


});





window.addEventListener(
"offline",
()=>{


    showMessage(
    "Internet connection lost",
    "warning"
    );


});









/*
   FINAL START
*/


document.addEventListener(
"DOMContentLoaded",
()=>{


    startOmniSystem();



});
