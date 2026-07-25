// OmniDataPro Security System Final


// ===============================
// HONEYPOT SYSTEM
// ===============================


function checkHoneypot(){

    const trap =
    document.getElementById("website");

    if(trap && trap.value !== ""){

        console.warn(
            "Bot activity detected"
        );

        return false;

    }

    return true;

}






// ===============================
// LOGIN ATTEMPT SECURITY
// ===============================


function addLoginAttempt(){


    let attempts =
    Number(
        localStorage.getItem(
            "loginAttempts"
        )
    ) || 0;


    attempts++;


    localStorage.setItem(
        "loginAttempts",
        attempts
    );


    securityLog(
        "Failed login attempt"
    );


    if(attempts >= 5){

        alert(
            "Too many login attempts. Try later."
        );

    }


}






function resetLoginAttempts(){


    localStorage.removeItem(
        "loginAttempts"
    );


}







// ===============================
// SECURITY LOG
// ===============================


function securityLog(action){


    let logs =
    JSON.parse(
        localStorage.getItem(
            "securityLogs"
        )
    ) || [];



    logs.push({

        action: action,

        time:
        new Date().toLocaleString()


    });



    localStorage.setItem(

        "securityLogs",

        JSON.stringify(logs)

    );


}








// ===============================
// SESSION CHECK
// ===============================


function checkSecuritySession(){


    let session =
    localStorage.getItem(
        "odpLogin"
    );


    if(session){

        return true;

    }


    return false;


}







console.log(
"OmniDataPro Security Active"
);
