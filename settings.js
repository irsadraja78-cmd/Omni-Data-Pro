/* =====================================
   OMNI DATA PRO
   FINAL SETTING.JS
   PART 1/3
===================================== */





/*
   SETTINGS STATE
*/


const SettingsSystem = {


    initialized:false,


    settings:{


        theme:"light",


        language:"en",


        notifications:true,


        autoSave:true,


        aiMode:true


    }



};









/*
   INITIALIZE SETTINGS
*/


function initializeSettings(){



    if(
    SettingsSystem.initialized
    )
    return;



    SettingsSystem.initialized=true;



    loadSettings();



    setupSettingsEvents();



    applySettings();



}









/*
   SETTINGS EVENTS
*/


function setupSettingsEvents(){



    const saveBtn =

    document.getElementById(
    "save-settings-btn"
    );



    const resetBtn =

    document.getElementById(
    "reset-settings-btn"
    );





    if(saveBtn){



        saveBtn.addEventListener(

        "click",

        ()=>{


            saveSettings();



        });


    }








    if(resetBtn){



        resetBtn.addEventListener(

        "click",

        ()=>{


            resetSettings();



        });


    }



}









/*
   LOAD SETTINGS
*/


function loadSettings(){



    const saved =

    localStorage.getItem(

    "omni_settings"

    );





    if(saved){



        SettingsSystem.settings =

        {

            ...SettingsSystem.settings,

            ...JSON.parse(saved)

        };



    }



}









/*
   SAVE SETTINGS
*/


function saveSettings(){



    localStorage.setItem(

        "omni_settings",

        JSON.stringify(

            SettingsSystem.settings

        )

    );





    applySettings();





    showMessage(

    "Settings saved",

    "success"

    );



}/* =====================================
   OMNI DATA PRO
   FINAL SETTING.JS
   PART 2/3
===================================== */





/*
   APPLY SETTINGS
*/


function applySettings(){



    const settings =

    SettingsSystem.settings;





    /*
       THEME CONTROL
    */


    if(
    settings.theme==="dark"
    ){


        document.body.classList.add(
        "dark-mode"
        );


    }

    else{


        document.body.classList.remove(
        "dark-mode"
        );


    }









    /*
       LANGUAGE CONTROL
    */


    if(
    typeof changeLanguage==="function"
    ){



        changeLanguage(

            settings.language

        );



    }









    /*
       NOTIFICATION CONTROL
    */


    if(
    settings.notifications
    ){



        enableNotifications();



    }

    else{


        disableNotifications();



    }




}









/*
   UPDATE SETTING VALUE
*/


function updateSetting(
key,
value
){



    SettingsSystem.settings[key]=value;



    saveSettings();



}









/*
   CHANGE THEME
*/


function changeTheme(
theme
){



    SettingsSystem.settings.theme =
    theme;



    saveSettings();



}









/*
   CHANGE LANGUAGE
*/


function changeAppLanguage(
language
){



    SettingsSystem.settings.language =

    language;





    if(
    typeof changeLanguage==="function"
    ){


        changeLanguage(
        language
        );


    }





    saveSettings();



}









/*
   NOTIFICATION SYSTEM
*/


function enableNotifications(){



    localStorage.setItem(

        "omni_notifications",

        "enabled"

    );



}








function disableNotifications(){



    localStorage.setItem(

        "omni_notifications",

        "disabled"

    );



}









/*
   AUTO SAVE CONTROL
*/


function setAutoSave(
status
){



    SettingsSystem.settings.autoSave =

    status;



    saveSettings();



}









/*
   AI MODE CONTROL
*/


function setAIMode(
status
){



    SettingsSystem.settings.aiMode =

    status;



    saveSettings();



}/* =====================================
   OMNI DATA PRO
   FINAL SETTING.JS
   PART 3/3
===================================== */





/*
   RESET SETTINGS
*/


function resetSettings(){



    SettingsSystem.settings={



        theme:"light",


        language:"en",


        notifications:true,


        autoSave:true,


        aiMode:true



    };





    saveSettings();



    applySettings();





    showMessage(

    "Settings reset successfully",

    "success"

    );



}









/*
   EXPORT SETTINGS
*/


function exportSettings(){



    const data =

    JSON.stringify(

        SettingsSystem.settings,

        null,

        2

    );





    const blob =

    new Blob(

        [data],

        {

            type:"application/json"

        }

    );





    const url =

    URL.createObjectURL(
    blob
    );





    const link =

    document.createElement(
    "a"
    );





    link.href=url;



    link.download=

    "omni-data-pro-settings.json";





    link.click();





    URL.revokeObjectURL(
    url
    );



}









/*
   SYNC SETTINGS REMOTE
*/


async function syncSettingsRemote(){



    try{



        if(
        typeof OmniDatabase==="undefined"
        )
        return;





        const user =

        OmniApp.currentUser;





        if(!user)
        return;





        await OmniDatabase.insert(

            "settings",

            {

                user_id:user.id,


                settings:
                SettingsSystem.settings


            }

        );



    }



    catch(error){



        console.error(

        "Settings Sync Error:",

        error

        );



    }



}









/*
   LOAD REMOTE SETTINGS
*/


async function loadRemoteSettings(){



    try{



        if(
        typeof OmniDatabase==="undefined"
        )
        return;





        const data =

        await OmniDatabase.fetch(

            "settings"

        );





        if(
        data &&
        data.length
        ){



            SettingsSystem.settings =

            {

                ...SettingsSystem.settings,

                ...data[0].settings

            };





            saveSettings();



            applySettings();



        }



    }



    catch(error){



        console.error(

        "Remote Settings Error:",

        error

        );



    }



}









/*
   FINAL SETTINGS START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeSettings();



    loadRemoteSettings();



});
