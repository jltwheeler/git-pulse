import { CommandModule } from "yargs";
import chalk from "chalk";

import { configOutputPath, dateRegex } from "../utils/constants";
import { Config, RepoFetchResp } from "../types";
import { checkConfigExists } from "../utils/checkConfigExists";
import { handleError, parseConfigYaml } from "../utils/parsers";
import { initClient } from "../client";
import { generateFetchReposQuery } from "../queries";
import CliTable3 from "cli-table3";
import { generateHeader } from "../utils/table";

interface RepoResult {
  [key: string]: RepoFetchResp;
}

export const generateRepoTableData = (result: RepoResult): Array<string>[] => {
  return Object.keys(result).map((v) => {
    const repoObj = result[v];

    const name = [
      chalk.bold(`${repoObj.owner.login}/${repoObj.name}`),
      `${chalk.yellow("★")}: ${repoObj.stargazerCount}`,
      `${chalk.yellow("Open PR's")}: ${repoObj.pullRequests.totalCount}`,
      `${chalk.yellow("Forks")}: ${repoObj.forkCount}`,
    ].join("\n");

    if (repoObj.releases.edges.length > 0) {
      const release = repoObj.releases.edges[0].node;

      const regResult = dateRegex.exec(release.updatedAt);
      let date = "";
      if (regResult) {
        date = regResult[0];
      } else {
        date = release.updatedAt;
      }

      const desc = [
        `${chalk.blueBright(repoObj.url)}`,
        "-----------------------",
        `${release.shortDescriptionHTML}`,
      ].join("\n");

      return [name, release.tagName, date, desc];
    } else {
      return [name, repoObj.refs.nodes[0].name, "N/A", "N/A"];
    }
  });
};

const fetchCommand: CommandModule = {
  command: "fetch",
  describe: "Fetches information about tracked repos and / or issues.",
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
      if (!args.a && !args.i && !args.r) {
        throw new Error(
          "Error. Please specify if you wish to fetch info on a repo (-r), issue (-i) or both (-a).",
        );
      }

      const config: Config = parseConfigYaml(configOutputPath);
      const client = initClient();

      if (args.r) {
        const query = generateFetchReposQuery(config.repos);
        const result: RepoResult = await client.request(query);

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
      }
    } catch (error) {
      handleError(error);
    }
  },
};

export default fetchCommand;
