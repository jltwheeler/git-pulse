export interface InitArgs {
  token?: string;
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
