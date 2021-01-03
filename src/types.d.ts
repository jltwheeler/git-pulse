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

interface ReleaseNode {
  node: {
    name: string;
    shortDescriptionHTML: string;
    tagName: string;
    updatedAt: string;
    url: string;
  };
}

interface RefNodes {
  name: string;
}

export interface RepoFetchResp {
  forkCount: number;
  issues: {
    totalCount: number;
  };
  name: string;
  owner: { login: string };
  pullRequests: {
    totalCount: number;
  };
  refs: {
    nodes: RefNodes[];
  };
  releases: {
    edges: ReleaseNode[];
  };
  shortDescriptionHTML: string;
  stargazerCount: number;
  url: string;
}

interface CommentNode {
  createdAt: string;
  bodyText: string;
}

export interface IssueFetchResp {
  name: string;
  owner: { login: string };
  issue: {
    title: string;
    closedAt: string;
    createdAt: string;
    lastEditedAt: string;
    reactions: {
      totalCount: number;
    };
    state: "OPEN" | "CLOSED";
    comments: {
      nodes: CommentNode[];
      totalCount: number;
    };
    url: string;
  };
}
