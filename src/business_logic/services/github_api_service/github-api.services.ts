import axios from 'axios';
import { GithubApiServiceConstants } from './github-api-service.constants.js';
import { Repo } from '../../../models/github-api-service/repo.model.js';

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
}