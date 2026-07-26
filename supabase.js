/* =====================================
   OMNI DATA PRO
   FINAL SUPABASE.JS
   PART 1/3
===================================== */


/*
   SUPABASE CONFIGURATION

   यहां अपनी Supabase Project Details डालनी होंगी
*/


const SUPABASE_CONFIG = {


    url:
    "https://qvmywidjilwwkqvstglo.supabase.co",


    key:
    "sb_publishable_4HhTJOl3003RLkW_DQR6-w_Kg01Vh5U"



};









/*
   SUPABASE CLIENT
*/


let supabaseClient = null;








function initializeSupabase(){



    try{



        if(
        typeof supabase === "undefined"
        ){


            console.error(
            "Supabase library not loaded"
            );


            return;


        }






        supabaseClient =
        supabase.createClient(

            SUPABASE_CONFIG.url,

            SUPABASE_CONFIG.key

        );





        console.log(
        "Supabase Connected Successfully"
        );



    }


    catch(error){



        console.error(
        "Supabase Initialization Error:",
        error
        );



    }



}









/*
   DATABASE HELPERS
*/


const OmniDatabase = {





    async insert(
    table,
    data
    ){



        try{


            const {
                data:result,
                error
            }
            =
            await supabaseClient

            .from(table)

            .insert(data)

            .select();






            if(error)
            throw error;






            return result;



        }



        catch(error){



            console.error(
            "Database Insert Error:",
            error
            );



            return null;



        }




    },








    async fetch(
    table
    ){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient

            .from(table)

            .select("*");





            if(error)
            throw error;






            return data;



        }



        catch(error){



            console.error(
            "Database Fetch Error:",
            error
            );



            return [];



        }




    }







};/* =====================================
   OMNI DATA PRO
   FINAL SUPABASE.JS
   PART 2/3
===================================== */





/*
   AUTH HELPERS
*/


const OmniAuth = {





    async signup(
    email,
    password,
    metadata={}
    ){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient.auth.signUp({

                email,

                password,

                options:{
                    data:metadata
                }


            });





            if(error)
            throw error;





            return data;




        }



        catch(error){



            console.error(
            "Signup Error:",
            error
            );



            return null;



        }



    },









    async login(
    email,
    password
    ){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient.auth.signInWithPassword({

                email,

                password


            });





            if(error)
            throw error;





            return data;




        }



        catch(error){



            console.error(
            "Login Error:",
            error
            );



            return null;



        }



    },









    async logout(){



        try{



            await supabaseClient.auth.signOut();



            return true;



        }


        catch(error){



            console.error(
            "Logout Error:",
            error
            );



            return false;



        }




    }






};









/*
   PROFILE MANAGEMENT
*/


const OmniProfile = {





    async createProfile(
    profile
    ){



        return await OmniDatabase.insert(

            "profiles",

            profile

        );



    },








    async getProfile(
    userId
    ){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient

            .from("profiles")

            .select("*")

            .eq(
            "id",
            userId
            )

            .single();





            if(error)
            throw error;





            return data;



        }



        catch(error){



            console.error(
            "Profile Error:",
            error
            );



            return null;



        }




    }






};









/*
   STORAGE SYSTEM
*/


const OmniStorage = {





    async uploadFile(
    file,
    bucket="files"
    ){



        try{



            const fileName =

            Date.now()
            +
            "_"
            +
            file.name;






            const {
                data,
                error
            }
            =
            await supabaseClient

            .storage

            .from(bucket)

            .upload(

                fileName,

                file

            );





            if(error)
            throw error;





            return data;



        }



        catch(error){



            console.error(
            "File Upload Error:",
            error
            );



            return null;



        }




    },









    async getFileUrl(
    path,
    bucket="files"
    ){



        const {
            data
        }
        =
        supabaseClient

        .storage

        .from(bucket)

        .getPublicUrl(path);





        return data.publicUrl;



    }






};/* =====================================
   OMNI DATA PRO
   FINAL SUPABASE.JS
   PART 3/3
===================================== */





/*
   CONNECTION TEST
*/


async function testSupabaseConnection(){



    try{



        if(!supabaseClient){



            console.warn(
            "Supabase client not initialized"
            );


            return false;



        }





        const {
            data,
            error
        }
        =
        await supabaseClient

        .from("profiles")

        .select("id")

        .limit(1);






        if(error)
        throw error;






        console.log(
        "Supabase Connection Working"
        );



        return true;



    }



    catch(error){



        console.error(
        "Supabase Connection Failed:",
        error
        );



        return false;



    }



}









/*
   SECURITY HELPERS
*/


const OmniSecurity = {





    async getCurrentSession(){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient.auth
            .getSession();





            if(error)
            throw error;





            return data.session;



        }



        catch(error){



            console.error(
            "Session Error:",
            error
            );



            return null;



        }




    },









    async refreshSession(){



        try{



            const {
                data,
                error
            }
            =
            await supabaseClient.auth
            .refreshSession();





            if(error)
            throw error;





            return data;



        }



        catch(error){



            console.error(
            "Refresh Session Error:",
            error
            );



            return null;



        }




    }






};









/*
   GLOBAL DATABASE ERROR HANDLER
*/


function handleSupabaseError(error){



    if(!error)
    return;



    console.error(
    "Supabase Error:",
    error.message
    );



    if(
    typeof showMessage==="function"
    ){


        showMessage(
        error.message,
        "error"
        );


    }



}









/*
   FINAL INITIALIZATION
*/


document.addEventListener(
"DOMContentLoaded",
()=>{



    initializeSupabase();



    setTimeout(
    ()=>{


        testSupabaseConnection();



    },
    1000
    );



});
