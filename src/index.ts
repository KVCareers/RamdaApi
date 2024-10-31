
import { GithubApiService } from "./business_logic/services/github_api_service/github-api.services.js";
import { Pull } from "./models/github-api-service/pulls.model.js";

// Application Entry Point

const githubApiService = new GithubApiService();
let result: Pull[] = await githubApiService.getPullRequests("ramda", "ramda-fantasy");

result = result.sort((a, b) => a.title.localeCompare(b.title));

result.forEach(pullRequest => {
    console.log(`Pull request titled  '${pullRequest.title}' found for repo '${pullRequest.head.repo.name}' made by user '${pullRequest.user.login}'!`);
});