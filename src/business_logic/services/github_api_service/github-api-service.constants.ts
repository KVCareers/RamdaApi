
class QueryParamsGetPullRequests {
    /**
    Options are "open", "closed", "all". Default is "open".
    */    
    static readonly QUERYPARAM_STATE = 'state';
}

export class GithubApiServiceConstants {

    // Api Key Config Key
    static readonly API_KEY_CONFIG_KEY_NAME = "githubApiToken";

    // Root url of the Github API
    static readonly API_ROOT_URL = 'https://api.github.com';
    
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - - 
    // API ROUTES SECTION
    static readonly ROUTE_ORGS = 'orgs';
    static readonly ROUTE_REPOS = 'repos';        
    static readonly ROUTE_PULL_REQUESTS = 'pulls';
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -
    // GLOBAL QUERY PARAMS SECTION

    /**
        default is 30, max is 100
    */ 
    static readonly QUERYPARAM_PER_PAGE = 'per_page';
    
    static readonly QUERYPARAM_PAGE = 'page';
    // - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -  - - - - -
    

    // QUERY PARAMS SECTION
    static readonly QueryParamsGetPullRequests = QueryParamsGetPullRequests;
}