import fs from "fs";

import { CommandModule } from "yargs";
import CliTable3 from "cli-table3";
import chalk from "chalk";
import yaml from "js-yaml";

import { tokenQuestion } from "../questions/token";
import { checkConfigExists } from "../utils/checkConfigExists";
import { configOutputPath } from "../utils/constants";
import { handleError, parseConfigYaml } from "../utils/parsers";
import { generateHeader } from "../utils/table";
import { Config } from "../types";

const tokenSubCommand: CommandModule = {
  command: "token",
  describe: "Update GitHub authentication token in the configuration file.",
  handler: async () => {
    try {
      checkConfigExists();
    } catch (error) {
      handleError(error);
      return;
    }

    try {
      const answer = await tokenQuestion();
      const config: Config = parseConfigYaml(configOutputPath);
      config.username.authToken = answer.token;

      await fs.promises.writeFile(configOutputPath, yaml.safeDump(config));
      console.log(chalk.green("Success! Token has been updated."));
      console.log(answer);
    } catch (error) {
      handleError(error);
    }
  },
};

const removeSubCommand: CommandModule = {
  command: "rm",
  describe: "Remove a tracked repository or issue from your configuration",
  builder: {
    repo: {
      alias: "r",
      describe: "Remove a repository by a given ID number.",
      type: "number",
    },
    issue: {
      alias: "i",
      describe: "Remove an issue by a given ID number.",
      type: "number",
    },
  },
  handler: async (args) => {
    const config: Config = parseConfigYaml(configOutputPath);
    let message = "";

    try {
      if ("issue" in args) {
        if (args.issue) {
          const issuesUpdated = config.issues.filter(
            (_item, idx) => idx + 1 !== args.issue,
          );

          const issue = config.issues.find(
            (_item, idx) => idx + 1 === args.issue,
          );

          if (!issue) {
            throw new Error(
              `Error. Could not find issue ${args.issue as number}`,
            );
          }
          config.issues = issuesUpdated;
          message = `Successfully removed issue number ${
            args.issue as number
          } (${issue}) `;
        } else {
          throw new Error("Error. No issue number was given.");
        }
      } else if ("repo" in args) {
        if (args.repo) {
          const reposUpdated = config.repos.filter(
            (_item, idx) => idx + 1 !== args.repo,
          );

          const repo = config.repos.find((_item, idx) => idx + 1 === args.repo);

          if (!repo) {
            throw new Error(
              `Error. Could not find repo ${args.repo as number}`,
            );
          }
          config.repos = reposUpdated;
          message = `Successfully removed repo number ${
            args.repo as number
          } (${repo}) `;
        } else {
          throw new Error("Error. No repo number was given.");
        }
      } else {
        throw new Error(
          "Error. Please specify a repo (-r) or issue (-i) to remove.",
        );
      }

      await fs.promises.writeFile(configOutputPath, yaml.safeDump(config));
      console.log(chalk.green(message));
    } catch (error) {
      handleError(error);
    }
  },
};

const lsSubCommand: CommandModule = {
  command: "ls",
  describe: "Lists the current repos and issues that are being tracked.",
  builder: {
    repos: {
      alias: "r",
      describe: "Only list repositories",
      type: "boolean",
      default: false,
    },
    issues: {
      alias: "i",
      describe: "Only list issues",
      type: "boolean",
      default: false,
    },
  },
  handler: (args) => {
    try {
      checkConfigExists();
    } catch (error) {
      handleError(error);
      return;
    }

    const config: Config = parseConfigYaml(configOutputPath);

    const tokenTable = new CliTable3(
      generateHeader([
        "GitHub authentication token",
        config.username.authToken,
      ]),
    );
    const issueTable = new CliTable3(generateHeader(["Number", "Issue"]));
    const repoTable = new CliTable3(generateHeader(["Number", "Repository"]));

    config.issues.forEach((v, idx) => issueTable.push([idx + 1, v]));
    config.repos.forEach((v, idx) => repoTable.push([idx + 1, v]));

    if (args.repos) {
      console.log(repoTable.toString());
    } else if (args.issues) {
      console.log(issueTable.toString());
    } else {
      console.log(tokenTable.toString());
      console.log(issueTable.toString());
      console.log(repoTable.toString());
    }
  },
};

const configCommand: CommandModule = {
  command: "config",
  describe: "Manage git-pulse configs.",
  builder: (yargs) => {
    return yargs
      .command(lsSubCommand)
      .command(tokenSubCommand)
      .command(removeSubCommand)
      .demandCommand();
  },
  handler: () => {
    //
  },
};

export default configCommand;
