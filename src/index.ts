import getRamdaPullRequestsLogic from "./business_logic/logic/get-rambda-pull-requests.js";

// Application Entry Point
let result = await getRamdaPullRequestsLogic.getRamdaPullRequests();

console.log("Program finished!");