export interface InitArgs {
  token: string;
  repos: (string | number)[] | undefined;
  issues: (string | number)[] | undefined;
}

export type tester = string;

export interface Config {
  issues: string[];
  repos: string[];
  username: {
    authToken: string;
  };
}
