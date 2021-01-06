import chalk from "chalk";
import figlet from "figlet";
import yaml from "js-yaml";
import { CommandModule } from "yargs";

import fs from "fs";
import path from "path";

import {
  tokenQuestion,
  addRepoQuestions,
  addIssueQuestions,
  initReposQuestion,
  initIssuesQuestion,
} from "../questions";
import { Config, InitObject } from "../types";
import { safeClear, constants, parsers } from "../utils";

const { configOutputPath, configDir, configTemplateName } = constants;
const { isStringArray, parseConfigYaml, handleError } = parsers;

const generateConfigFile = async (
  configDir: string,
  initObject: InitObject,
): Promise<string> => {
  const config: Config = parseConfigYaml(
    path.resolve(__dirname, `../templates/${configTemplateName}`),
  );

  config.username.authToken = initObject.token;

  if (initObject.issues && isStringArray(initObject.issues)) {
    config.issues = initObject.issues;
  }

  if (initObject.repos && isStringArray(initObject.repos)) {
    config.repos = initObject.repos;
  }

  await fs.promises.mkdir(configDir);
  await fs.promises.writeFile(configOutputPath, yaml.safeDump(config));
  return configOutputPath;
};

const initCommand: CommandModule = {
  command: "init",
  describe: "Initialises the user's config file",
  handler: async (_) => {
    let token = "";
    let repos: string[] = [];
    let issues: string[] = [];

    try {
      if (fs.existsSync(configDir)) {
        throw new Error(
          `Config file already exists at: ${configOutputPath}. Please use gpulse config commands to update any config settings.`,
        );
      }
    } catch (error) {
      handleError(error);
      return;
    }

    safeClear();

    console.log(
      chalk.blueBright(
        figlet.textSync("Git Pulse", {
          horizontalLayout: "default",
          font: "Small",
        }),
      ),
    );

    console.log(
      `This is the ${chalk.blueBright.bold(
        "gpulse configuration wizard",
      )}, which will help you generate a configuration file. It will ask you a few questions and configure your ${chalk.blueBright.bold(
        ".git-pulse conf file",
      )}.\n\n`,
    );

    console.log(
      `To start, you will need a ${chalk.blueBright(
        "GitHub account",
      )} and a ${chalk.blueBright(
        "GitHub authentication token",
      )}, which you can generate at ${chalk.blueBright(
        "https://github.com/settings/tokens",
      )}\n\n`,
    );

    try {
      const answer = await tokenQuestion();
      token = answer.token;
      console.log(chalk.green("Success! Token has been authenticated"));
    } catch (error) {
      handleError(error);
    }

    try {
      const answer = await initReposQuestion();
      safeClear();
      if (answer.addRepos) {
        repos = await addRepoQuestions(token);
      }
    } catch (error) {
      handleError(error);
    }

    try {
      const answer = await initIssuesQuestion();
      safeClear();
      if (answer.addIssues) {
        issues = await addIssueQuestions(token);
      }
    } catch (error) {
      handleError(error);
    }

    safeClear();

    const outputPath = await generateConfigFile(configDir, {
      token,
      issues,
      repos,
    });
    console.log(`Written config file at: ${outputPath}`);
  },
};

export default initCommand;
