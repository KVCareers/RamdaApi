
import { RamdaGithubApiService } from "../services/ramda_github_api_service/ramda-github-api.service.js";
import { Repo } from "../../models/github-api-service/repo.model.js";
import { Pull } from "../../models/github-api-service/pulls.model.js";
import { ApiRateLimitDelayService } from "../services/api_rate_limit_delay_service/api-rate-limit-delay.service.js";

export async function getRamdaPullRequests(): Promise<void> { 
    const ramdaGithubApiService = new RamdaGithubApiService();
    const apiRateLimitDelayService = new ApiRateLimitDelayService();

    let ramdaRepos: Repo[] = (await ramdaGithubApiService.getRepos()) ?? [];

    ramdaRepos.sort((a, b) => a.name.localeCompare(b.name));

    const ramdaRepoNames = ramdaRepos.map(repo => repo.name);

    console.log(`Found ${ramdaRepoNames.length} repos for the Ramda organization!`);

    let ramdaPullRequests: Pull[] = [];

    for (const name of ramdaRepoNames) {
        // Delay the next request to avoid rate limiting
        await apiRateLimitDelayService.delayRequest();

        let pullRequests = (await ramdaGithubApiService.getPullRequests(name)) ?? [];
    
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