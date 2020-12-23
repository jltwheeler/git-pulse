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

export interface RepoAnswer {
  addRepos: boolean;
}

export interface IssuesAnswer {
  addIssues: boolean;
}
