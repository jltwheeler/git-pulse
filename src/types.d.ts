export interface ProcessEnv {
  NODE_ENV: string | undefined;
}

export interface InitObject {
  token: string;
  repos?: (string | number)[] | undefined;
  issues?: (string | number)[] | undefined;
}

export interface Config {
  issues: string[];
  repos: string[];
  username: {
    authToken: string;
  };
}

export interface TokenAnswer {
  token: string;
}

export interface InitReposAnswer {
  addRepos: boolean;
}

export interface InsertRepoAnswer {
  repo: string;
  continue: true;
}

export interface InitIssuesAnswer {
  addIssues: boolean;
}

export interface InsertIssueAnswer {
  issue: string;
  continue: true;
}

export interface TokenValidationResp {
  rateLimit: { limit: number };
}

export interface RepoValidationResp {
  repository: { url: string };
}

export interface IssueValidationResp {
  repository: { issue: { title: string } };
}
