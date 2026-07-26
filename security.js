/* =====================================
   OMNI DATA PRO
   FINAL SECURITY.JS
   PART 1/3
===================================== */





/*
   SECURITY STATE
*/


const SecuritySystem = {


    initialized:false,


    logs:[],


    sessionActive:false,


    attempts:0



};









/*
   INITIALIZE SECURITY
*/


function initializeSecurity(){



    if(
    SecuritySystem.initialized
    )
    return;



    SecuritySystem.initialized=true;



    loadSecurityLogs();



    checkSecuritySession();



    setupSecurityMonitor();



}









/*
   CHECK SESSION SECURITY
*/


function checkSecuritySession(){



    const user =

    localStorage.getItem(
    "omni_user"
    );





    if(user){



        SecuritySystem.sessionActive=true;



    }

    else{


        SecuritySystem.sessionActive=false;


    }



}









/*
   SECURITY MONITOR
*/


function setupSecurityMonitor(){



    document.addEventListener(

    "visibilitychange",

    ()=>{



        if(
        document.hidden
        ){



            addSecurityLog(

            "Application moved to background"

            );



        }



    });



}









/*
   ADD SECURITY LOG
*/


function addSecurityLog(
message
){



    const log={



        message:message,


        time:
        new Date()
        .toISOString()



    };





    SecuritySystem.logs.unshift(
    log
    );





    if(
    SecuritySystem.logs.length>50
    ){



        SecuritySystem.logs.pop();



    }





    saveSecurityLogs();



}









/*
   SAVE SECURITY LOGS
*/


function saveSecurityLogs(){



    localStorage.setItem(

        "omni_security_logs",

        JSON.stringify(

            SecuritySystem.logs

        )

    );



}









/*
   LOAD SECURITY LOGS
*/


function loadSecurityLogs(){



    const saved =

    localStorage.getItem(

        "omni_security_logs"

    );





    if(saved){



        SecuritySystem.logs =

        JSON.parse(saved);



    }



}/* =====================================
   OMNI DATA PRO
   FINAL SECURITY.JS
   PART 2/3
===================================== */





/*
   LOGIN ATTEMPT CONTROL
*/


function recordLoginAttempt(
success
){



    if(success){



        SecuritySystem.attempts=0;



        addSecurityLog(

        "Successful login"

        );



    }

    else{



        SecuritySystem.attempts++;



        addSecurityLog(

        "Failed login attempt"

        );



        if(
        SecuritySystem.attempts>=5
        ){



            lockSecurityTemporarily();



        }



    }



}









/*
   TEMPORARY LOCK
*/


function lockSecurityTemporarily(){



    const lockTime =

    Date.now()
    +
    (
        5 *
        60 *
        1000
    );





    localStorage.setItem(

        "omni_security_lock",

        lockTime

    );





    addSecurityLog(

    "Account temporarily locked"

    );



}









/*
   CHECK LOCK STATUS
*/


function isSecurityLocked(){



    const lock =

    localStorage.getItem(

        "omni_security_lock"

    );





    if(!lock)
    return false;





    if(
    Date.now() <
    Number(lock)
    ){


        return true;


    }





    localStorage.removeItem(

        "omni_security_lock"

    );





    return false;



}









/*
   PASSWORD STRENGTH CHECK
*/


function checkPasswordStrength(
password
){



    let score=0;





    if(
    password.length>=8
    )
    score++;





    if(
    /[A-Z]/.test(password)
    )
    score++;





    if(
    /[a-z]/.test(password)
    )
    score++;





    if(
    /[0-9]/.test(password)
    )
    score++;





    if(
    /[^A-Za-z0-9]/.test(password)
    )
    score++;






    return {


        score:score,


        strong:
        score>=4



    };



}









/*
   USER PERMISSION SYSTEM
*/


function checkPermission(
permission
){



    const user =

    OmniApp.currentUser;





    if(!user)
    return false;





    if(
    user.role==="admin"
    )
    return true;





    return (

        user.permissions

        &&

        user.permissions.includes(
        permission
        )

    );



}









/*
   VERIFY USER
*/


function verifyUser(){



    const user =

    localStorage.getItem(

    "omni_user"

    );





    if(!user){



        return false;



    }





    try{



        return Boolean(

            JSON.parse(
            user
            )

        );



    }



    catch(error){



        return false;



    }



}/* =====================================
   OMNI DATA PRO
   FINAL SECURITY.JS
   PART 3/3
===================================== */





/*
   DEVICE INFORMATION
*/


function getDeviceInfo(){



    return {


        browser:
        navigator.userAgent,



        language:
        navigator.language,



        platform:
        navigator.platform,



        screen:
        `${window.screen.width}x${window.screen.height}`



    };



}









/*
   SAVE DEVICE SESSION
*/


function saveDeviceSession(){



    const session={



        id:
        Date.now(),



        device:
        getDeviceInfo(),



        createdAt:
        new Date()
        .toISOString()



    };





    localStorage.setItem(

        "omni_device_session",

        JSON.stringify(
        session
        )

    );





    addSecurityLog(

    "New device session created"

    );



}









/*
   CHECK ACTIVE SESSION
*/


function checkActiveSession(){



    const session =

    localStorage.getItem(

    "omni_device_session"

    );





    if(session){



        return JSON.parse(
        session
        );



    }





    return null;



}









/*
   LOGOUT SECURITY CLEANUP
*/


function secureLogout(){



    localStorage.removeItem(
    "omni_user"
    );



    localStorage.removeItem(
    "omni_device_session"
    );





    SecuritySystem.sessionActive=false;





    addSecurityLog(

    "Secure logout completed"

    );



}









/*
   SECURITY LOG DISPLAY
*/


function renderSecurityLogs(){



    const container =

    document.getElementById(

    "security-log-list"

    );





    if(!container)
    return;





    container.innerHTML =



    SecuritySystem.logs.map(

    log=>`


    <div class="security-log-item">


        <strong>

        ${log.message}

        </strong>


        <small>

        ${new Date(
        log.time
        )
        .toLocaleString()
        }

        </small>


    </div>


    `

    )

    .join("");



}









/*
   SECURITY STATUS
*/


function getSecurityStatus(){



    return {


        session:

        SecuritySystem.sessionActive,



        logs:

        SecuritySystem.logs.length,



        locked:

        isSecurityLocked()



    };



}









/*
   FINAL SECURITY START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeSecurity();



    saveDeviceSession();



    renderSecurityLogs();



});
