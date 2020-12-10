import fs from "fs";
import path from "path";

import yargs from "yargs/yargs";
import { CommandModule } from "yargs";

import { Config } from "../types/types";
import { configDir, configOutputPath } from "../utils/constants";
import { parseConfigYaml } from "../utils/parsers";

export const removeConfig = (): void => {
  if (fs.existsSync(configDir)) {
    fs.rmdirSync(configDir, { recursive: true });
  }
};

export const createDummyConfig = (): void => {
  fs.mkdirSync(configDir);
  const dummyText = fs.readFileSync(
    path.resolve(__dirname, "data/testConfig.yml"),
  );
  fs.writeFileSync(configOutputPath, dummyText, "utf-8");
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
        .fail((_, err) => reject(err))
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

export const testIssues = [
  "https://github.com/CesiumGS/gltf-pipeline/issues/549",
  "https://github.com/vercel/swr/issues/781",
  "https://github.com/mui-org/material-ui/issues/16947",
];
