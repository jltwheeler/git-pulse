import chalk from "chalk";
import CliTable3 from "cli-table3";
import yaml from "js-yaml";
import { CommandModule } from "yargs";

import fs from "fs";

import {
  tokenQuestion,
  validateRespository,
  validateIssue,
} from "../questions";
import { Config } from "../types";
import {
  checkConfigExists,
  constants,
  parsers,
  generateHeader,
} from "../utils";

const { configOutputPath } = constants;
const { handleError, parseConfigYaml } = parsers;

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

const addSubCommand: CommandModule = {
  command: "add",
  describe: "Add a repository or issue to your configuration to track.",
  builder: {
    repo: {
      alias: "r",
      describe: "Add a repository by passing in the full repository URL",
      type: "string",
    },
    issue: {
      alias: "i",
      describe: "Add an issue by passing in the full issue URL",
      type: "string",
    },
  },
  handler: async (args) => {
    const config: Config = parseConfigYaml(configOutputPath);
    let message = "";

    try {
      if ("issue" in args) {
        if (args.issue) {
          const url = args.issue as string;

          if (config.issues.find((v) => v === url)) {
            throw new Error(`Error. ${url} is already being tracked.`);
          }
          await validateIssue(url);

          config.issues = config.issues.concat(url);
          message = `Successfully added ${url} to the tracked issues list.`;
        } else {
          throw new Error("Error. No issue URL was provided.");
        }
      } else if ("repo" in args) {
        if (args.repo) {
          const url = args.repo as string;

          if (config.repos.find((v) => v === url)) {
            throw new Error(`Error. ${url} is already being tracked.`);
          }
          await validateRespository(url);

          config.repos = config.repos.concat(url);
          message = `Successfully added ${url} to the tracked repos list.`;
        } else {
          throw new Error("Error. No repo URL was provided.");
        }
      } else {
        throw new Error(
          "Error. Please specify a repo (-r) or issue (-i) to add.",
        );
      }

      await fs.promises.writeFile(configOutputPath, yaml.safeDump(config));
      console.log(chalk.green(message));
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
  describe: "Manage gpulse configs.",
  builder: (yargs) => {
    return yargs
      .command(lsSubCommand)
      .command(tokenSubCommand)
      .command(addSubCommand)
      .command(removeSubCommand)
      .demandCommand();
  },
  handler: () => {
    //
  },
};

export default configCommand;
