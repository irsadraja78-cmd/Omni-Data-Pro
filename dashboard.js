// OmniDataPro Dashboard Final


// ===============================
// WORK CATEGORIES
// ===============================


const workCategories = [

    {
        id:"data_entry",
        name:"Basic Data Entry",
        icon:"📄"
    },

    {
        id:"copywriting",
        name:"Copy Writing",
        icon:"✍️"
    },

    {
        id:"typing",
        name:"Typing Work",
        icon:"⌨️"
    },

    {
        id:"excel",
        name:"Excel Data Work",
        icon:"📊"
    },

    {
        id:"medical",
        name:"Medical Data Entry",
        icon:"🏥"
    },

    {
        id:"pdf",
        name:"PDF Work",
        icon:"📑"
    },

    {
        id:"research",
        name:"Web Research",
        icon:"🌐"
    },

    {
        id:"cleaning",
        name:"Data Cleaning",
        icon:"🧹"
    },

    {
        id:"processing",
        name:"Data Processing",
        icon:"⚙️"
    },

    {
        id:"formatting",
        name:"Document Formatting",
        icon:"📝"
    },

    {
        id:"assistant",
        name:"Virtual Assistant",
        icon:"👨‍💻"
    },

    {
        id:"reporting",
        name:"Reporting Work",
        icon:"📈"
    },

    {
        id:"custom",
        name:"Custom Work",
        icon:"➕"
    }

];







// ===============================
// LOAD DASHBOARD
// ===============================


function loadDashboard(){


const dashboard =
document.getElementById(
"workDashboard"
);



if(!dashboard){

return;

}



dashboard.innerHTML="";



workCategories.forEach(function(work){



let card =
document.createElement("div");



card.className =
"work-card";



card.innerHTML = `

<h3>

${work.icon}

${work.name}

</h3>

<p>
Open Workspace
</p>

`;



card.onclick=function(){


selectWork(work);


};



dashboard.appendChild(card);



});


}







// ===============================
// SELECT WORK
// ===============================


function selectWork(work){



localStorage.setItem(

"currentWork",

JSON.stringify(work)

);




let workData =
JSON.parse(

localStorage.getItem(
"workData"
)

) || {};




if(!workData[work.id]){


workData[work.id]={

name:work.name,

files:[],

tasks:[],

notes:[],

status:"New"

};


}



localStorage.setItem(

"workData",

JSON.stringify(workData)

);





openPage("workPage");



const title =
document.getElementById(
"workTitle"
);



if(title){

title.innerHTML =
work.icon+" "+work.name;

}


}







// ===============================
// GET CURRENT WORK
// ===============================


function getCurrentWork(){


return JSON.parse(

localStorage.getItem(
"currentWork"
)

);


}







// ===============================
// START
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


loadDashboard();


}

);
