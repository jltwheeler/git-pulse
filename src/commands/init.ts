import fs from "fs";
import path from "path";

import { CommandModule } from "yargs";
import chalk from "chalk";
import yaml from "js-yaml";

import { safeClear } from "../utils/safeClear";
import { tokenQuestion } from "../questions/token";
import { addIssueQuestions, initIssuesQuestion } from "../questions/issues";
import { initReposQuestion, addRepoQuestions } from "../questions/repos";
import {
  configOutputPath,
  configDir,
  configTemplateName,
} from "../utils/constants";
import { isStringArray, parseConfigYaml, handleError } from "../utils/parsers";
import { Config, InitObject } from "../types";

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

    if (fs.existsSync(configDir)) {
      return Promise.reject(
        new Error(
          `Config file already exists at: ${configOutputPath}. Please use git-pulse config commands to update any config settings.`,
        ),
      );
    }

    try {
      const answer = await tokenQuestion();
      token = answer.token;
      console.log(chalk.green("Success! Token has been authenticated"));
    } catch (error) {
      handleError(error);
    }

    safeClear();

    try {
      const answer = await initReposQuestion();
      if (answer.addRepos) {
        repos = await addRepoQuestions(token);
      }
    } catch (error) {
      handleError(error);
    }

    safeClear();

    try {
      const answer = await initIssuesQuestion();
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
