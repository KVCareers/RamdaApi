import githubApiService, { GithubApiService } from "../github_api_service/github-api.service.js";
import { RamdaGithubApiServiceConstants } from "./ramda-github-api-service.constants.js";
import { Repo } from "../../../models/github-api-service/repo.model.js";
import { Pull } from "../../../models/github-api-service/pulls.model.js";

export class RamdaGithubApiService {
    
    private githubApiService: GithubApiService;

    constructor(githubApiService: GithubApiService) {
        this.githubApiService = githubApiService;
    }

    async getRepos(): Promise<Repo[]> {
        const result: Repo[] = (await this.githubApiService.getRepos(RamdaGithubApiServiceConstants.ORG_NAME)) ?? [];
        return result;
    }

    async getPullRequests(repoName: string): Promise<Pull[]> {
        const result: Pull[] = (await this.githubApiService.getPullRequests(RamdaGithubApiServiceConstants.ORG_NAME, repoName)) ?? [];
        return result;
    }
}

const ramdaGithubApiService = new RamdaGithubApiService(githubApiService);
export default ramdaGithubApiService;