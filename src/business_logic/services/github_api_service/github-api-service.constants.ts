import exp from "constants";

class QueryParamsGetPullRequests {
    /**
    Options are "open", "closed", "all". Default is "open".
    */    
     readonly QUERYPARAM_STATE = 'state';
}

export class GithubApiServiceConstants {

    // Api Key Config Key
     readonly API_KEY_CONFIG_KEY_NAME = "githubApiToken";

    // Root url of the Github API
     readonly API_ROOT_URL = 'https://api.github.com';
    
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - - 
    // API ROUTES SECTION
     readonly ROUTE_ORGS = 'orgs';
     readonly ROUTE_REPOS = 'repos';        
     readonly ROUTE_PULL_REQUESTS = 'pulls';
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -
    // GLOBAL QUERY PARAMS SECTION

    /**
        default is 30, max is 100
    */ 
     readonly QUERYPARAM_PER_PAGE = 'per_page';
    
     readonly QUERYPARAM_PAGE = 'page';
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -
    

    // QUERY PARAMS SECTION
     readonly QueryParamsGetPullRequests = new QueryParamsGetPullRequests();
}

const githubApiServiceConstants = new GithubApiServiceConstants();
export default githubApiServiceConstants;