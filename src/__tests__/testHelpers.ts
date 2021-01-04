import fs from "fs";
import path from "path";

import yargs from "yargs/yargs";
import { CommandModule } from "yargs";
import yaml from "js-yaml";
import * as dotenv from "dotenv";
dotenv.config();

import { Config } from "../types";
import { configDir, configOutputPath } from "../utils/constants";
import { parseConfigYaml } from "../utils/parsers";

enum State {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export const TOKEN: string = process.env?.GITHUB_TOKEN
  ? process.env.GITHUB_TOKEN
  : "secret";

export const removeConfig = (): void => {
  if (fs.existsSync(configDir)) {
    fs.rmdirSync(configDir, { recursive: true });
  }
};

export const createDummyConfig = (): void => {
  const config: Config = parseConfigYaml(
    path.resolve(__dirname, "data/testConfig.yml"),
  );

  config.username.authToken = TOKEN;

  fs.mkdirSync(configDir);
  fs.writeFileSync(configOutputPath, yaml.safeDump(config));
};

export const loadYamlConfig = (): Config => {
  return parseConfigYaml(configOutputPath);
};

export const asyncCommand = (
  command: CommandModule,
  args: string[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      yargs(args)
        .command(command)
        .onFinishCommand((r) => resolve(r))
        .fail((_, error) => reject(error))
        .exitProcess(false).argv;
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};

export const testRepos = [
  "https://github.com/Microsoft/TypeScript",
  "https://github.com/facebook/create-react-app",
  "https://github.com/docker/cli",
  "https://github.com/docker/compose",
];
export const invalidRepo = "https://github.com/invalid/repourl";
export const newTestRepo =
  "https://github.com/testing-library/react-testing-library";

export const testIssues = [
  "https://github.com/CesiumGS/gltf-pipeline/issues/549",
  "https://github.com/mui-org/material-ui/issues/16947",
  "https://github.com/microsoft/terminal/issues/1375",
];
export const invalidIssue = "https://github.com/invalid/repourl/issues/100";
export const newTestIssue = "https://github.com/vercel/swr/issues/781";

export const fetchIssuesResult = {
  fetchRepo0: {
    name: "gltf-pipeline",
    owner: { login: "CesiumGS" },
    issue: {
      title: "Title X",
      closedAt: null,
      createdAt: "2020-07-08T16:12:55Z",
      lastEditedAt: "2020-07-08T19:51:29Z",
      reactions: { totalCount: 10 },
      state: State.OPEN,
      comments: {
        nodes: [{ createdAt: "2020-07-08T16:12:55Z", bodyText: "hello" }],
        totalCount: 10,
      },
      url: "http://example.com",
    },
  },
};

export const issueTableVals = [
  fetchIssuesResult.fetchRepo0.name,
  fetchIssuesResult.fetchRepo0.owner.login,
  fetchIssuesResult.fetchRepo0.issue.title,
  fetchIssuesResult.fetchRepo0.issue.state,
  fetchIssuesResult.fetchRepo0.issue.reactions.totalCount,
  fetchIssuesResult.fetchRepo0.issue.comments.totalCount,
];

export const fetchReposResult = {
  fetchRepo0: {
    forkCount: 8944,
    issues: { totalCount: 4700 },
    name: "TypeScript",
    owner: { login: "microsoft" },
    pullRequests: { totalCount: 263 },
    refs: { nodes: [{ name: "test version" }] },
    releases: {
      edges: [
        {
          node: {
            name: "v4.1.3",
            shortDescriptionHTML: "test release",
            tagName: "v4.1.3",
            updatedAt: "2020-12-16T16:12:55Z",
            url: "http://example.com",
          },
        },
      ],
    },
    shortDescriptionHTML: "desc",
    stargazerCount: 67433,
    url: "https://github.com/microsoft/TypeScript",
  },
  fetchRepo1: {
    forkCount: 100,
    issues: { totalCount: 2000 },
    name: "test",
    owner: { login: "microsoft" },
    pullRequests: { totalCount: 500 },
    refs: { nodes: [{ name: "v1.0.0" }] },
    releases: {
      edges: [],
    },
    shortDescriptionHTML: "desc",
    stargazerCount: 1,
    url: "https://github.com/test/tester",
  },
};

export const repoTableValsFull = [
  fetchReposResult.fetchRepo0.name,
  fetchReposResult.fetchRepo0.owner.login,
  fetchReposResult.fetchRepo0.forkCount,
  fetchReposResult.fetchRepo0.issues.totalCount,
  fetchReposResult.fetchRepo0.pullRequests.totalCount,
  fetchReposResult.fetchRepo0.stargazerCount,
  fetchReposResult.fetchRepo0.releases.edges[0].node.name,
  fetchReposResult.fetchRepo0.releases.edges[0].node.shortDescriptionHTML,
];

export const repoTableValsEmpty = [
  fetchReposResult.fetchRepo1.name,
  fetchReposResult.fetchRepo1.owner.login,
  fetchReposResult.fetchRepo1.forkCount,
  fetchReposResult.fetchRepo1.issues.totalCount,
  fetchReposResult.fetchRepo1.pullRequests.totalCount,
  fetchReposResult.fetchRepo1.stargazerCount,
  fetchReposResult.fetchRepo1.refs.nodes[0].name,
];
