import { User } from "./user.model.js";
import { Repo } from "./repo.model.js";

export interface Base {
    label: string;
    ref:   string;
    sha:   string;
    user:  User;
    repo:  Repo;
}