import chalk from "chalk";
import CliTable3 from "cli-table3";
import ora from "ora";
import terminalLink from "terminal-link";
import { CommandModule } from "yargs";

import { initClient } from "../client";
import { generateFetchIssuesQuery, generateFetchReposQuery } from "../queries";
import { Config, IssueFetchResp, RepoFetchResp } from "../types";
import {
  constants,
  checkConfigExists,
  parsers,
  sleep,
  generateHeader,
} from "../utils";

const { configOutputPath, SLEEP_TIME } = constants;
const { handleError, parseConfigYaml, parseYYYYMMDD } = parsers;

export interface RepoResult {
  [key: string]: RepoFetchResp;
}
export interface IssueResult {
  [key: string]: IssueFetchResp;
}

export const generateRepoTableData = (result: RepoResult): Array<string>[] => {
  return Object.keys(result).map((v) => {
    const repoObj = result[v];

    const name = [
      chalk.bold(`${repoObj.owner.login}/${repoObj.name}`),
      `${chalk.yellow("★")}: ${repoObj.stargazerCount}`,
      `${chalk.yellow("Open PR's")}: ${repoObj.pullRequests.totalCount}`,
      `${chalk.yellow("Forks")}: ${repoObj.forkCount}`,
      `${chalk.yellow("Open Issues")}: ${repoObj.issues.totalCount}`,
    ].join("\n");

    if (repoObj.releases.edges.length > 0) {
      const release = repoObj.releases.edges[0].node;

      const date = parseYYYYMMDD(release.updatedAt);
      const link = terminalLink(`Link to ${release.tagName}`, release.url);

      const desc = [
        `${release.shortDescriptionHTML}`,
        "-----------------------",
        `${chalk.blueBright(link)}`,
      ].join("\n");

      return [name, release.tagName, date, desc];
    } else {
      return [name, repoObj.refs.nodes[0].name, "N/A", "N/A"];
    }
  });
};

export const generateIssueTableData = (
  result: IssueResult,
): Array<string>[] => {
  return Object.keys(result).map((v) => {
    const issueObj = result[v];
    const name = chalk.bold(`${issueObj.owner.login} / ${issueObj.name}`);

    const link = terminalLink("Link to issue", issueObj.issue.url);

    const desc = [
      `${issueObj.issue.title}`,
      "-------------",
      `${chalk.blueBright(link)}`,
    ].join("\n");

    const state =
      issueObj.issue.state === "OPEN"
        ? chalk.green(issueObj.issue.state)
        : chalk.red(issueObj.issue.state);

    const comments = [
      `Total: ${issueObj.issue.comments.totalCount}`,
      `New: ${issueObj.issue.comments.totalCount}`,
    ].join("\n");

    const reactions = [
      `Total: ${issueObj.issue.reactions.totalCount}`,
      `New: ${issueObj.issue.reactions.totalCount}`,
    ].join("\n");

    return [
      name,
      desc,
      state,
      parseYYYYMMDD(issueObj.issue.createdAt),
      parseYYYYMMDD(issueObj.issue.lastEditedAt),
      comments,
      reactions,
    ];
  });
};

export const displayRepoTable = (result: RepoResult): void => {
  const values = generateRepoTableData(result);

  const table = new CliTable3({
    ...generateHeader([
      "Repository",
      "Latest Version",
      "Updated",
      "Link & Description",
    ]),
    colWidths: [null, null, null, 25],
    wordWrap: true,
  });
  values.forEach((v) => table.push(v));
  console.log(table.toString());
};

export const displayIssueTable = (result: IssueResult): void => {
  const values = generateIssueTableData(result);

  const table = new CliTable3({
    ...generateHeader([
      "Repository",
      "Issue",
      "State",
      "Created At",
      "Last Edited",
      "Comments",
      "Reactions",
    ]),
    colWidths: [15, 15, null, null, null, null, null],
    wordWrap: true,
  });
  values.forEach((v) => table.push(v));
  console.log(table.toString());
};

const checkCommand: CommandModule = {
  command: "check",
  describe: "Checks information about tracked repos and / or issues.",
  builder: {
    repo: {
      alias: "r",
      describe: "Add a repository by passing in the full repository URL",
      boolean: false,
    },
    issue: {
      alias: "i",
      describe: "Add an issue by passing in the full issue URL",
      boolean: false,
    },
    all: {
      alias: "a",
      describe: "",
      boolean: false,
    },
  },
  handler: async (args) => {
    try {
      checkConfigExists();
    } catch (error) {
      handleError(error);
      return;
    }

    try {
      const config: Config = parseConfigYaml(configOutputPath);
      const client = initClient();

      if (args.r) {
        const spinner = ora("Fetching repository information").start();
        const query = generateFetchReposQuery(config.repos);
        const result: RepoResult = await client.request(query);

        await sleep(SLEEP_TIME);
        spinner.stop();

        displayRepoTable(result);
      } else if (args.i) {
        const spinner = ora("Fetching issue information").start();
        const query = generateFetchIssuesQuery(config.issues);
        const result: IssueResult = await client.request(query);

        await sleep(SLEEP_TIME);
        spinner.stop();

        displayIssueTable(result);
      } else if (args.a) {
        const spinner = ora(
          "Fetching repository and issue information",
        ).start();
        const repoQuery = generateFetchReposQuery(config.repos);
        const repoResult: RepoResult = await client.request(repoQuery);

        const issueQuery = generateFetchIssuesQuery(config.issues);
        const issueResult: IssueResult = await client.request(issueQuery);

        await sleep(SLEEP_TIME);
        spinner.stop();

        displayRepoTable(repoResult);
        displayIssueTable(issueResult);
      } else {
        throw new Error(
          "Error. Please specify if you wish to check info on a repo (-r), issue (-i) or both (-a).",
        );
      }
    } catch (error) {
      handleError(error);
    }
  },
};

export default checkCommand;
