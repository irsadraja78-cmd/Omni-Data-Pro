/* =====================================
   OMNI DATA PRO
   FINAL DASHBOARD.JS
   PART 1/3
===================================== */





/*
   DASHBOARD STATE
*/


const DashboardSystem = {


    initialized:false,


    stats:{


        projects:0,


        files:0,


        messages:0,


        health:"100%"


    },



    activities:[]



};









/*
   DASHBOARD INITIALIZATION
*/


function initializeDashboard(){



    if(
    DashboardSystem.initialized
    )
    return;



    DashboardSystem.initialized=true;



    loadDashboardData();



    updateDashboardCards();



    loadRecentActivity();



}









/*
   LOAD DASHBOARD DATA
*/


async function loadDashboardData(){



    try{



        /*
          Future Supabase data connection
        */



        const savedData =
        localStorage.getItem(
        "omni_dashboard"
        );





        if(savedData){



            DashboardSystem.stats =
            JSON.parse(savedData);



        }
        else{



            DashboardSystem.stats = {


                projects:12,


                files:48,


                messages:156,


                health:"99%"


            };



            localStorage.setItem(

                "omni_dashboard",

                JSON.stringify(
                DashboardSystem.stats
                )

            );



        }




    }



    catch(error){



        console.error(

        "Dashboard Data Error:",

        error

        );



    }



}









/*
   UPDATE STAT CARDS
*/


function updateDashboardCards(){



    const projects =
    document.getElementById(
    "total-projects"
    );



    const files =
    document.getElementById(
    "total-files"
    );



    const messages =
    document.getElementById(
    "total-messages"
    );







    if(projects)
    projects.textContent =
    DashboardSystem.stats.projects;





    if(files)
    files.textContent =
    DashboardSystem.stats.files;





    if(messages)
    messages.textContent =
    DashboardSystem.stats.messages;



}









/*
   UPDATE SINGLE STAT
*/


function updateStat(
name,
value
){



    if(
    DashboardSystem.stats[name]
    !== undefined
    ){


        DashboardSystem.stats[name]=value;



        localStorage.setItem(

            "omni_dashboard",

            JSON.stringify(
            DashboardSystem.stats
            )

        );



        updateDashboardCards();



    }




}/* =====================================
   OMNI DATA PRO
   FINAL DASHBOARD.JS
   PART 2/3
===================================== */





/*
   ANALYTICS DATA
*/


const DashboardAnalytics = {



    data:{


        dailyUsers:[],


        fileUploads:[],


        aiUsage:[]



    },






    generate(){



        this.data = {


            dailyUsers:[

                12,
                25,
                31,
                45,
                52,
                68,
                80

            ],



            fileUploads:[

                5,
                14,
                22,
                30,
                38,
                45,
                60

            ],




            aiUsage:[

                20,
                35,
                40,
                55,
                70,
                90,
                120

            ]



        };



        return this.data;



    }





};









/*
   LOAD ANALYTICS
*/


function loadAnalytics(){



    const chart =
    document.getElementById(
    "analytics-chart"
    );



    if(!chart)
    return;





    const data =
    DashboardAnalytics.generate();





    chart.innerHTML = `

        <div class="analytics-box">

            <p>
            Users Growth
            </p>

            <strong>
            ${data.dailyUsers.join(" , ")}
            </strong>


        </div>



        <div class="analytics-box">

            <p>
            File Uploads
            </p>

            <strong>
            ${data.fileUploads.join(" , ")}
            </strong>


        </div>



        <div class="analytics-box">

            <p>
            AI Usage
            </p>

            <strong>
            ${data.aiUsage.join(" , ")}
            </strong>


        </div>


    `;



}









/*
   ACTIVITY SYSTEM
*/


function addActivity(
message
){



    const activity = {


        message:message,


        time:
        new Date()
        .toLocaleString()



    };





    DashboardSystem.activities
    .unshift(activity);





    if(
    DashboardSystem.activities.length > 10
    ){


        DashboardSystem.activities.pop();



    }





    localStorage.setItem(

        "omni_activity",

        JSON.stringify(
        DashboardSystem.activities
        )

    );



    loadRecentActivity();



}









/*
   LOAD RECENT ACTIVITY
*/


function loadRecentActivity(){



    const container =
    document.getElementById(
    "activity-list"
    );



    if(!container)
    return;





    const saved =
    localStorage.getItem(
    "omni_activity"
    );





    if(saved){



        DashboardSystem.activities =
        JSON.parse(saved);



    }





    if(
    DashboardSystem.activities.length===0
    ){



        container.innerHTML = `

        <div class="activity-item">

        No recent activity

        </div>

        `;


        return;



    }








    container.innerHTML =

    DashboardSystem.activities

    .map(

    item=>`

    <div class="activity-item">

        <strong>
        ${item.message}
        </strong>


        <small>
        ${item.time}
        </small>


    </div>


    `

    )

    .join("");



}









/*
   REFRESH DASHBOARD
*/


function refreshDashboard(){



    loadDashboardData();


    updateDashboardCards();


    loadAnalytics();


    loadRecentActivity();



            }/* =====================================
   OMNI DATA PRO
   FINAL DASHBOARD.JS
   PART 3/3
===================================== */





/*
   SUPABASE DASHBOARD DATA
*/


async function loadRemoteDashboardData(){



    try{



        if(
        typeof OmniDatabase === "undefined"
        ){


            return;


        }





        const projects =
        await OmniDatabase.fetch(
        "projects"
        );



        const files =
        await OmniDatabase.fetch(
        "files"
        );





        if(projects){


            DashboardSystem.stats.projects =
            projects.length;


        }





        if(files){


            DashboardSystem.stats.files =
            files.length;


        }






        updateDashboardCards();




    }



    catch(error){



        console.error(

        "Remote Dashboard Error:",

        error

        );



    }



}









/*
   REAL TIME UPDATE
*/


function startDashboardRealtime(){



    if(
    typeof supabaseClient === "undefined"
    )
    return;






    supabaseClient

    .channel(
    "dashboard-updates"
    )

    .on(

        "postgres_changes",

        {

            event:"*",

            schema:"public"

        },

        payload=>{


            console.log(

            "Dashboard Update:",

            payload

            );



            refreshDashboard();



        }


    )

    .subscribe();



}









/*
   SYSTEM HEALTH CHECK
*/


function updateSystemHealth(){



    const health =
    document.querySelector(
    ".system-health"
    );



    if(health){


        health.textContent =
        DashboardSystem.stats.health;


    }



}









/*
   DASHBOARD EXPORT DATA
*/


function getDashboardStats(){



    return DashboardSystem.stats;



}









/*
   CREATE PROJECT ACTIVITY
*/


function projectCreated(
projectName
){



    addActivity(

    `New project created: ${projectName}`

    );



    updateStat(

    "projects",

    DashboardSystem.stats.projects + 1

    );



}









/*
   FILE ACTIVITY
*/


function fileUploaded(
fileName
){



    addActivity(

    `File uploaded: ${fileName}`

    );



    updateStat(

    "files",

    DashboardSystem.stats.files + 1

    );



}









/*
   FINAL DASHBOARD START
*/


document.addEventListener(

"DOMContentLoaded",

()=>{



    initializeDashboard();



    loadAnalytics();



    startDashboardRealtime();



    loadRemoteDashboardData();



});
