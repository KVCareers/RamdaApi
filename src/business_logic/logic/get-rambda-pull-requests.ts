
import { RamdaGithubApiService } from "../services/ramda_github_api_service/ramda-github-api.service.js";
import { Repo } from "../../models/github-api-service/repo.model.js";
import { Pull } from "../../models/github-api-service/pulls.model.js";

export async function getRamdaPullRequests(): Promise<void> { 
    const ramdaGithubApiService = new RamdaGithubApiService();

    let ramdaRepos: Repo[] = (await ramdaGithubApiService.getRepos()) ?? [];

    ramdaRepos.sort((a, b) => a.name.localeCompare(b.name));

    const ramdaRepoNames = ramdaRepos.map(repo => repo.name);

    console.log(`Found ${ramdaRepoNames.length} repos for the Ramda organization!`);

    let ramdaPullRequests: Pull[] = [];

    for (const name of ramdaRepoNames) {
        let pullRequests = (await ramdaGithubApiService.getPullRequests(name)) ?? [];
    
        console.log(`Found ${pullRequests.length} pull requests for the repo '${name}'!`);

        pullRequests.forEach(pr => {
            ramdaPullRequests.push(pr);
        })
    }

    console.log(`Found ${ramdaPullRequests.length} pull requests for the Ramda organization!`);
}