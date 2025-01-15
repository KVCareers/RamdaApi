
import ramdaGithubApiService, { RamdaGithubApiService } from "../services/ramda_github_api_service/ramda-github-api.service.js";
import { Repo } from "../../models/github-api-service/repo.model.js";
import { Pull } from "../../models/github-api-service/pulls.model.js";
import apiRateLimitDelayService, { ApiRateLimitDelayService } from "../services/api_rate_limit_delay_service/api-rate-limit-delay.service.js";

export class GetRamdaPullRequestsLogic {

    private ramdaGithubApiService: RamdaGithubApiService;
    private apiRateLimitDelayService: ApiRateLimitDelayService;

    constructor(ramdaGithubApiService: RamdaGithubApiService, apiRateLimitDelayService: ApiRateLimitDelayService) {
        this.ramdaGithubApiService = ramdaGithubApiService;
        this.apiRateLimitDelayService = apiRateLimitDelayService;
    }

    async getRamdaPullRequests(): Promise<void> { 
        let ramdaRepos: Repo[] = (await this.ramdaGithubApiService.getRepos()) ?? [];

        ramdaRepos.sort((a, b) => a.name.localeCompare(b.name));

        const ramdaRepoNames = ramdaRepos.map(repo => repo.name);

        console.log(`Found ${ramdaRepoNames.length} repos for the Ramda organization!`);

        let ramdaPullRequests: Pull[] = [];

        for (const name of ramdaRepoNames) {
            // Delay the next request to avoid rate limiting
            await this.apiRateLimitDelayService.delayRequest();

            let pullRequests = (await this.ramdaGithubApiService.getPullRequests(name)) ?? [];
        
            console.log(`Found ${pullRequests.length} pull requests for the repo '${name}'!`);

            pullRequests.forEach(pr => {
                ramdaPullRequests.push(pr);
            })
        }

        const openPullRequests = ramdaPullRequests.filter(pr => pr.state === "open");
        const closedPullRequests = ramdaPullRequests.filter(pr => pr.state === "closed");

        console.log(`Found ${ramdaPullRequests.length} total pull requests for the Ramda organization, 
            with ${openPullRequests.length} open pr's and ${closedPullRequests.length} closed pr's!`);
    }
}

const getRamdaPullRequestsLogic = new GetRamdaPullRequestsLogic(ramdaGithubApiService, apiRateLimitDelayService);
export default getRamdaPullRequestsLogic;