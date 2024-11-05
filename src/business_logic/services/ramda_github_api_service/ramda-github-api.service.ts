import { GithubApiService } from "../github_api_service/github-api.service.js";
import { RamdaGithubApiServiceConstants } from "./ramda-github-api-service.constants.js";
import { Repo } from "../../../models/github-api-service/repo.model.js";
import { Pull } from "../../../models/github-api-service/pulls.model.js";

export class RamdaGithubApiService {
    
    async getRepos(): Promise<Repo[]> {
        const githubApiService = new GithubApiService();
        const result: Repo[] = (await githubApiService.getRepos(RamdaGithubApiServiceConstants.ORG_NAME)) ?? [];
        return result;
    }

    async getPullRequests(repoName: string): Promise<Pull[]> {
        const githubApiService = new GithubApiService();
        const result: Pull[] = (await githubApiService.getPullRequests(RamdaGithubApiServiceConstants.ORG_NAME, repoName)) ?? [];
        return result;
    }
}