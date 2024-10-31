
import { getRamdaPullRequests } from "./business_logic/logic/get-rambda-pull-requests.js";

// Application Entry Point
let result = await getRamdaPullRequests();

console.log("Program finished!");