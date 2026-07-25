// OmniDataPro Dashboard System


// ===============================
// WORK CATEGORY LIST
// ===============================


const workCategories = [


"Basic Data Entry",

"Copy Writing",

"Typing Work",

"Excel Data Work",

"Medical Data Entry",

"PDF Work",

"Web Research",

"Data Cleaning",

"Data Processing",

"Document Formatting",

"Virtual Assistant",

"Reporting Work",

"Custom Work"


];








// ===============================
// LOAD DASHBOARD
// ===============================


function loadDashboard(){


let dashboard =
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

<h3>☑ ${work}</h3>

<p>
Open Workspace
</p>

`;



card.onclick=function(){

openWorkDashboard(work);

};



dashboard.appendChild(card);



});


}








// ===============================
// OPEN WORK
// ===============================


function openWorkDashboard(workName){



localStorage.setItem(

"currentWork",

workName

);



let workData =
JSON.parse(

localStorage.getItem(
"workData"
)

) || {};



if(!workData[workName]){


workData[workName]={


files:[],

tasks:[],

notes:[],

created:
new Date().toLocaleString()


};



localStorage.setItem(

"workData",

JSON.stringify(workData)

);


}



if(typeof openPage === "function"){


openPage("mywork");


}



let title =
document.getElementById(
"workTitle"
);



if(title){


title.innerHTML =
workName;


}


}








// ===============================
// GET CURRENT WORK
// ===============================


function getCurrentWork(){


return localStorage.getItem(

"currentWork"

);


}








// ===============================
// DASHBOARD START
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


loadDashboard();


}

);
