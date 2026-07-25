// OmniDataPro AI System


// ===============================
// AI ASSISTANT BASE
// ===============================


function aiAssistant(input){


if(!input){

return "Please enter your request";

}



let response = "";



input = input.toLowerCase();



// Simple AI Help Rules


if(input.includes("data")){


response =
"AI Suggestion: Check data format, remove duplicate entries and verify accuracy.";

}



else if(input.includes("typing")){


response =
"AI Suggestion: Maintain proper formatting and spelling while typing.";

}



else if(input.includes("excel")){


response =
"AI Suggestion: Use proper columns, filters and data validation.";

}



else if(input.includes("write")){


response =
"AI Suggestion: Improve grammar, structure and readability.";

}



else{


response =
"AI is ready to help you with your work.";

}



return response;


}








// ===============================
// AI OUTPUT DISPLAY
// ===============================


function runAI(){


let input =
document.getElementById("aiInput")?.value;



let output =
document.getElementById("aiOutput");



if(!output)return;



output.innerHTML =
aiAssistant(input);


}








// ===============================
// AI WORK SUGGESTION
// ===============================


function getAIWorkSuggestion(work){



let suggestions = {


"Basic Data Entry":
"Check spelling, accuracy and data consistency.",


"Excel Data Work":
"Use sorting, filtering and formulas carefully.",


"Medical Data Entry":
"Verify every field before saving.",


"Copy Writing":
"Focus on grammar, clarity and user intent.",


"Typing Work":
"Maintain speed with accuracy."


};



return suggestions[work] ||

"Complete your task with quality and accuracy.";


}








console.log(
"OmniDataPro AI System Active"
);
