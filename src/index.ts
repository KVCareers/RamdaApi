
import { GithubApiService } from "./business_logic/services/github_api_service/github-api.services.js";

// Application Entry Point

const githubApiService = new GithubApiService();
let result: any[] = await githubApiService.getPullRequests("ramda", "ramda-fantasy");

result.forEach(pullRequest => {
    console.log(pullRequest);
});