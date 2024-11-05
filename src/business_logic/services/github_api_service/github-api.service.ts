import axios from 'axios';
import axiosRetry from 'axios-retry';
import { GithubApiServiceConstants } from './github-api-service.constants.js';
import { Repo } from '../../../models/github-api-service/repo.model.js';
import { Pull } from '../../../models/github-api-service/pulls.model.js';
import { ApiRateLimitDelayService } from '../api_rate_limit_delay_service/api-rate-limit-delay.service.js';
import { ConfigService } from '../config_service/config.service.js';

export class GithubApiService {
    
    readonly apiRateLimitDelayService = new ApiRateLimitDelayService();
    readonly configService = new ConfigService();
    
    // Regex pattern to extract the "next" link from the "link" header
    // See: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
    readonly linkHeaderNextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;    
    readonly linkHeaderNextIndicator = `rel=\"next\"`;
    readonly paginationCountPerPage = 50;
    readonly queryParamStartPage = 1;
    readonly exponentialRetryBaseDelay = 1500;
    readonly exponentialRetryCount = 2;

    // Set up retries and auth token
    constructor() {
        this.configureAxiosRetries();
        this.configureAxiosAuthToken();
    }

    async getRepos(orgName: string): Promise<Repo[]> {
        // ex. https://api.github.com/orgs/ramda/repos
        let url = "";
        url += `${GithubApiServiceConstants.API_ROOT_URL}`;
        url += `/${GithubApiServiceConstants.ROUTE_ORGS}`;
        url += `/${orgName}`;
        url += `/${GithubApiServiceConstants.ROUTE_REPOS}`;        
        
        // Query params: pagination
        url += `?${GithubApiServiceConstants.QUERYPARAM_PER_PAGE}=${this.paginationCountPerPage}`;
        url += `&${GithubApiServiceConstants.QUERYPARAM_PAGE}=${this.queryParamStartPage}`;

        let results: Repo[] = [];

        // If request is paginated, it will return a "link" header
        // See: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
        while (url) {
            console.log(`Fetching repos from: ${url}`);

            const response = await axios.get(url);
            const result: Repo[] = (response?.data) ?? [];

            if (result?.length > 0) {
                results = results.concat(result);
            } else {
                url = "";
                break;
            }

            let linkHeader = response.headers.link;
            if (linkHeader && linkHeader.includes(this.linkHeaderNextIndicator)) {
                url = linkHeader.match(this.linkHeaderNextPattern)[0];
                // Delay the next request to avoid rate limiting
                await this.apiRateLimitDelayService.delayRequest();                
            } else {
                url = "";
                break;
            }            
        }

        return results;
    }

    async getPullRequests(orgName: string, repoName: string): Promise<Pull[]> {
        const queryParamState = "all";
        const queryParamStartPage = 1;
        
        // Base url
        // ex. https://api.github.com/repos/ramda/ramda-fantasy/pulls
        let url = "";
        url += `${GithubApiServiceConstants.API_ROOT_URL}`;
        url += `/${GithubApiServiceConstants.ROUTE_REPOS}`;
        url += `/${orgName}`;
        url += `/${repoName}`;
        url += `/${GithubApiServiceConstants.ROUTE_PULL_REQUESTS}`;

        // Query params: data filters
        url += `?${GithubApiServiceConstants.QueryParamsGetPullRequests.QUERYPARAM_STATE}=${queryParamState}`;
        
        // Query params: pagination
        url += `&${GithubApiServiceConstants.QUERYPARAM_PER_PAGE}=${this.paginationCountPerPage}`;
        url += `&${GithubApiServiceConstants.QUERYPARAM_PAGE}=${queryParamStartPage}`;

        let results: Pull[] = [];

        // If request is paginated, it will return a "link" header
        // See: https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers
        while (url) {
            console.log(`Fetching pull requests from: ${url}`);

            const response = await axios.get(url);
            const result: Pull[] = (response?.data) ?? [];

            if (result?.length > 0) {
                results = results.concat(result);
            } else {
                url = "";
                break;
            }

            let linkHeader = response.headers.link;
            if (linkHeader && linkHeader.includes(this.linkHeaderNextIndicator)) {
                url = linkHeader.match(this.linkHeaderNextPattern)[0];
                // Delay the next request to avoid rate limiting
                await this.apiRateLimitDelayService.delayRequest();                
            } else {
                url = "";
                break;
            }
        }

        return results;
    }

    private configureAxiosRetries(): void {
        // Configure axios retries
        axiosRetry(axios, { 
            retries: this.exponentialRetryCount,
            // Retry on any error even if it's a HTTP status code that would normally not be retried
            retryCondition: (error) => {
                console.log(`Request failed. Error: ${error}`);
                return true;
            }, 
            retryDelay: (retryCount, error) => axiosRetry.exponentialDelay(
                retryCount,
                error,
                this.exponentialRetryBaseDelay // Manually set base delay for exponential retries
            ),
        });
    }

    private configureAxiosAuthToken(): void {
        let apiToken = this.getApiToken();
        axios.defaults.headers.common['Authorization'] = `token ${apiToken}`;
    }

    private getApiToken(): string {
        return this.configService.getConfigValue(GithubApiServiceConstants.API_KEY_CONFIG_KEY_NAME);
    }
}