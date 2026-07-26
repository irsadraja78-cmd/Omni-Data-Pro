/* =====================================
   OMNI DATA PRO
   FINAL PROFILE.JS
   PART 1/3
===================================== */





/*
   PROFILE STATE
*/


const ProfileSystem = {


    initialized:false,


    profile:{},


    avatar:null



};









/*
   INITIALIZE PROFILE
*/


function initializeProfile(){



    if(
    ProfileSystem.initialized
    )
    return;



    ProfileSystem.initialized=true;



    loadProfile();



    setupProfileEvents();



    renderProfile();



}









/*
   PROFILE EVENTS
*/


function setupProfileEvents(){



    const saveBtn =

    document.getElementById(
    "save-profile-btn"
    );



    const avatarInput =

    document.getElementById(
    "avatar-upload"
    );







    if(saveBtn){



        saveBtn.addEventListener(

        "click",

        ()=>{


            updateProfile();



        });


    }








    if(avatarInput){



        avatarInput.addEventListener(

        "change",

        ()=>{


            uploadAvatar(
            avatarInput.files[0]
            );



        });


    }



}









/*
   LOAD PROFILE
*/


function loadProfile(){



    const saved =

    localStorage.getItem(
    "omni_profile"
    );





    if(saved){



        ProfileSystem.profile =

        JSON.parse(
        saved
        );



    }

    else{



        ProfileSystem.profile={



            name:
            OmniApp.currentUser?.name
            ||
            "",



            email:
            OmniApp.currentUser?.email
            ||
            "",



            bio:
            "",



            avatar:
            ""



        };



    }



}









/*
   UPDATE PROFILE
*/


function updateProfile(){



    const name =

    document.getElementById(
    "profile-name"
    )
    ?.value;





    const bio =

    document.getElementById(
    "profile-bio"
    )
    ?.value;






    ProfileSystem.profile.name =
    name ||
    ProfileSystem.profile.name;





    ProfileSystem.profile.bio =
    bio ||
    "";





    saveProfile();



    renderProfile();





    showMessage(

    "Profile updated",

    "success"

    );



}/* =====================================
   OMNI DATA PRO
   FINAL PROFILE.JS
   PART 2/3
===================================== */





/*
   SAVE PROFILE
*/


function saveProfile(){



    localStorage.setItem(

        "omni_profile",

        JSON.stringify(
        ProfileSystem.profile
        )

    );



}









/*
   RENDER PROFILE
*/


function renderProfile(){



    const name =
    document.getElementById(
    "profile-display-name"
    );



    const email =
    document.getElementById(
    "profile-display-email"
    );



    const avatar =
    document.getElementById(
    "profile-avatar"
    );






    if(name){


        name.textContent =

        ProfileSystem.profile.name
        ||
        "User";


    }







    if(email){


        email.textContent =

        ProfileSystem.profile.email
        ||
        "";


    }








    if(avatar && ProfileSystem.profile.avatar){


        avatar.src =

        ProfileSystem.profile.avatar;



    }



}









/*
   AVATAR UPLOAD
*/


async function uploadAvatar(
file
){



    if(!file)
    return;





    try{



        const reader =

        new FileReader();





        reader.onload =

        function(event){



            ProfileSystem.profile.avatar =

            event.target.result;





            saveProfile();



            renderProfile();



        };





        reader.readAsDataURL(
        file
        );





        showMessage(

        "Avatar updated",

        "success"

        );



    }



    catch(error){



        console.error(

        "Avatar Error:",

        error

        );



        showMessage(

        "Avatar upload failed",

        "error"

        );



    }



}









/*
   UPDATE PROFILE REMOTE
*/


async function syncProfileRemote(){



    try{



        if(
        typeof OmniProfile==="undefined"
        )
        return;





        const user =

        OmniApp.currentUser;





        if(!user)
        return;








        await OmniProfile.createProfile({

            id:user.id,

            name:
            ProfileSystem.profile.name,

            bio:
            ProfileSystem.profile.bio,

            avatar:
            ProfileSystem.profile.avatar


        });





    }



    catch(error){



        console.error(

        "Profile Sync Error:",

        error

        );



    }



}/* =====================================
   OMNI DATA PRO
   FINAL PROFILE.JS
   PART 3/3
===================================== */





/*
   FETCH REMOTE PROFILE
*/


async function fetchRemoteProfile(){



    try{



        const user =

        OmniApp.currentUser;





        if(
        !user
        ||
        typeof OmniProfile==="undefined"
        )
        return;





        const data =

        await OmniProfile.getProfile(

            user.id

        );





        if(data){



            ProfileSystem.profile =

            {

                ...ProfileSystem.profile,

                ...data

            };





            saveProfile();



            renderProfile();



        }



    }



    catch(error){



        console.error(

        "Fetch Profile Error:",

        error

        );



    }



}









/*
   DELETE PROFILE DATA
*/


function deleteLocalProfile(){



    ProfileSystem.profile={};



    localStorage.removeItem(
    "omni_profile"
    );



    renderProfile();





    showMessage(

    "Profile data removed",

    "success"

    );



}









/*
   USER PREFERENCES
*/


const UserPreferences = {



    save(
    key,
    value
    ){



        const preferences =

        JSON.parse(

            localStorage.getItem(
            "omni_preferences"
            )

            ||

            "{}"

        );





        preferences[key]=value;





        localStorage.setItem(

            "omni_preferences",

            JSON.stringify(
            preferences
            )

        );



    },







    get(
    key
    ){



        const preferences =

        JSON.parse(

            localStorage.getItem(
            "omni_preferences"
            )

            ||

            "{}"

        );





        return preferences[key];



    }





};









/*
   CHANGE PROFILE SETTING
*/


function updatePreference(
key,
value
){



    UserPreferences.save(

        key,

        value

    );



}









/*
   FINAL PROFILE START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeProfile();



    fetchRemoteProfile();



});
