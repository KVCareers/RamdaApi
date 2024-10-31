import { GithubApiService } from "../github_api_service/github-api.services.js";
import { RambdaGithubApiServiceConstants } from "./ramda-github-api-service.constants.js";
import { Repo } from "../../../models/github-api-service/repo.model.js";

export class RambdaGithubApiService {
    
    async getRepos(): Promise<Repo[]> {
        const githubApiService = new GithubApiService();
        const result: Repo[] = await githubApiService.getRepos(RambdaGithubApiServiceConstants.ORG_NAME);
        return result;
    }
}