
// Application Entry Point
import { RambdaGithubApiService } from './business_logic/services/rambda_github_api_service/rambda-github-api.service.js';
import { Repo } from './models/github-api-service/repo.model.js';

const rambdaGithubApiService = new RambdaGithubApiService();

let rambdaRepos: Repo[] = await rambdaGithubApiService.getRepos();

rambdaRepos = rambdaRepos.sort((a, b) => a.name.localeCompare(b.name));

rambdaRepos.forEach(repo => {
    console.log(`Repo ${repo.name} found for organization ${repo.owner.login}!`);
});