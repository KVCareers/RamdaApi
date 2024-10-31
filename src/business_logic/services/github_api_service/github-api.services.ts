import axios from 'axios';
import { GithubApiServiceConstants } from './github-api-service.constants.js';
import { Repo } from '../../../models/github-api-service/repo.model.js';
import { Pull } from '../../../models/github-api-service/pulls.model.js';

export class GithubApiService {
    
    async getRepos(orgName: string): Promise<Repo[]> {
        // ex. https://api.github.com/orgs/ramda/repos
        let url = "";
        url += `${GithubApiServiceConstants.API_ROOT_URL}`;
        url += `/${GithubApiServiceConstants.ROUTE_ORGS}`;
        url += `/${orgName}`;
        url += `/${GithubApiServiceConstants.ROUTE_REPOS}`;        
        
        const response = await axios.get(url);
        const result: Repo[] = response.data;
        return result;
    }

    async getPullRequests(orgName: string, repoName: string): Promise<Pull[]> {
        // ex. https://api.github.com/repos/ramda/ramda-fantasy/pulls

        let url = "";
        url += `${GithubApiServiceConstants.API_ROOT_URL}`;
        url += `/${GithubApiServiceConstants.ROUTE_REPOS}`;
        url += `/${orgName}`;
        url += `/${repoName}`;
        url += `/${GithubApiServiceConstants.ROUTE_PULL_REQUESTS}`;

        const response = await axios.get(url);
        const result: Pull[] = response.data;
        return result;
    }
}