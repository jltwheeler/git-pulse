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

export const testIssues = [
  "https://github.com/CesiumGS/gltf-pipeline/issues/549",
  "https://github.com/vercel/swr/issues/781",
  "https://github.com/mui-org/material-ui/issues/16947",
];
export const invalidIssue = "https://github.com/invalid/repourl/issues/100";
