// OmniDataPro Profile System


// ===============================
// SAVE PROFILE
// ===============================


function saveProfile(){


let name =
document.getElementById("profileName")?.value;


let email =
document.getElementById("profileEmail")?.value;



let profile = {


name: name || "User",


email: email || "",


photo: "",


updated:
new Date().toLocaleString()


};




localStorage.setItem(

"odpProfile",

JSON.stringify(profile)

);



alert("Profile Saved Successfully");


loadProfile();


}








// ===============================
// LOAD PROFILE
// ===============================


function loadProfile(){


let profile =
JSON.parse(

localStorage.getItem("odpProfile")

);



if(!profile){

return;

}



let nameBox =
document.getElementById("showProfileName");



let emailBox =
document.getElementById("showProfileEmail");



if(nameBox){

nameBox.innerHTML =
profile.name;

}



if(emailBox){

emailBox.innerHTML =
profile.email;

}



}








// ===============================
// PROFILE PHOTO
// ===============================


function uploadProfilePhoto(){


let input =
document.getElementById(
"profilePhoto"
);



if(!input || !input.files.length){

return;

}



let reader =
new FileReader();



reader.onload=function(e){



let profile =
JSON.parse(

localStorage.getItem("odpProfile")

) || {};



profile.photo =
e.target.result;



localStorage.setItem(

"odpProfile",

JSON.stringify(profile)

);



loadProfilePhoto();


};



reader.readAsDataURL(

input.files[0]

);


}








function loadProfilePhoto(){


let profile =
JSON.parse(

localStorage.getItem("odpProfile")

);



let img =
document.getElementById(
"profileImage"
);



if(profile && profile.photo && img){


img.src =
profile.photo;


}


}








// ===============================
// CLEAR PROFILE
// ===============================


function removeProfile(){


localStorage.removeItem(

"odpProfile"

);



location.reload();


}








document.addEventListener(

"DOMContentLoaded",

function(){


loadProfile();

loadProfilePhoto();


}

);


console.log(
"OmniDataPro Profile System Active"
);
