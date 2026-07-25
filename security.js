// OmniDataPro Security System


// ===============================
// HONEYPOT SYSTEM
// ===============================


// Hidden field check
function checkHoneypot(form){


let trap = form.querySelector(
".website-check"
);



if(trap && trap.value !== ""){


securityAlert(
"Bot activity detected"
);


return false;

}


return true;


}






// ===============================
// SECURITY LOG
// ===============================


function securityAlert(message){


let logs =
JSON.parse(
localStorage.getItem("securityLogs")
) || [];



logs.push({

message: message,

time:
new Date().toLocaleString(),

device:
navigator.userAgent


});



localStorage.setItem(

"securityLogs",

JSON.stringify(logs)

);



console.warn(
"Security Alert:",
message
);


}







// ===============================
// LOGIN ATTEMPT MONITOR
// ===============================


function checkLoginAttempts(){


let attempts =
JSON.parse(
localStorage.getItem("loginAttempts")
) || 0;



if(attempts >= 5){


alert(
"Too many attempts. Try later."
);


return false;


}


return true;


}







function addLoginAttempt(){


let attempts =
JSON.parse(
localStorage.getItem("loginAttempts")
) || 0;



attempts++;


localStorage.setItem(

"loginAttempts",

JSON.stringify(attempts)

);


}






function resetLoginAttempts(){


localStorage.removeItem(
"loginAttempts"
);


}







// ===============================
// SESSION SECURITY
// ===============================


function secureSession(){


let login =
localStorage.getItem(
"odpLogin"
);



if(!login){


console.log(
"No active session"
);


}


}







// ===============================
// FILE ACCESS CHECK
// ===============================


function checkFileAccess(userId,fileOwner){


if(userId !== fileOwner){


securityAlert(
"Unauthorized file access attempt"
);


return false;


}


return true;


}






// Start Security

secureSession();


console.log(
"OmniDataPro Security System Active"
);
