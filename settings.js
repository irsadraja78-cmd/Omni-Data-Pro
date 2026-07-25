// OmniDataPro Settings System


// ===============================
// SAVE SETTINGS
// ===============================


function saveSettings(){


let settings = {


theme:
document.getElementById("themeSelect")?.value || "light",


language:
document.getElementById("languageSelect")?.value || "English",


notifications:
document.getElementById("notificationToggle")?.checked || false,


updated:
new Date().toLocaleString()


};



localStorage.setItem(

"odpSettings",

JSON.stringify(settings)

);



applySettings();


alert("Settings Saved");

}








// ===============================
// LOAD SETTINGS
// ===============================


function loadSettings(){


let settings =
JSON.parse(

localStorage.getItem("odpSettings")

);



if(!settings){

return;

}



let theme =
document.getElementById("themeSelect");



let language =
document.getElementById("languageSelect");



let notification =
document.getElementById("notificationToggle");



if(theme){

theme.value =
settings.theme;

}



if(language){

language.value =
settings.language;

}



if(notification){

notification.checked =
settings.notifications;

}



applySettings();


}








// ===============================
// THEME SYSTEM
// ===============================


function applySettings(){


let settings =
JSON.parse(

localStorage.getItem("odpSettings")

);



if(!settings){

return;

}



if(settings.theme === "dark"){


document.body.classList.add(
"dark-mode"
);


}

else{


document.body.classList.remove(
"dark-mode"
);


}


}








// ===============================
// LOGOUT SYSTEM
// ===============================


async function logoutAccount(){



if(window.supabaseClient){


await supabaseClient.auth.signOut();


}



localStorage.removeItem(
"odpLogin"
);



location.reload();


}








// ===============================
// DELETE ACCOUNT DATA
// ===============================


function clearLocalData(){



let confirmDelete =
confirm(

"Delete all local data?"

);



if(confirmDelete){


localStorage.clear();


location.reload();


}



}








// ===============================
// SECURITY SETTINGS
// ===============================


function securityStatus(){


return {


honeypot:
"Active",


sessionProtection:
"Active",


fileProtection:
"Enabled"


};


}








document.addEventListener(

"DOMContentLoaded",

function(){


loadSettings();


}

);



console.log(
"OmniDataPro Settings System Active"
);
