import { Arguments, Argv } from "yargs";
import yaml from "js-yaml";

import fs from "fs";
import path from "path";

import {
  configOutputName,
  configDir,
  configTemplateName,
} from "../utils/constants";
import { isObject } from "../utils/parsers";
import { Config, InitArgs } from "../types/types";

const parseYaml = (): Config => {
  const yamlStr: string = fs.readFileSync(
    path.resolve(__dirname, `../templates/${configTemplateName}`),
    "utf-8",
  );

  const config = yaml.safeLoad(yamlStr);

  if (!isObject(config)) {
    throw new Error(
      "Something went wrong whilst creating the configuration file",
    );
  }

  return config;
};

const generateConfigFile = (configDir: string, token: string): string => {
  fs.mkdirSync(configDir);

  const configOutputPath: string = path.resolve(configDir, configOutputName);

  const config: Config = parseYaml();
  config.username.authToken = token;

  fs.writeFileSync(configOutputPath, yaml.safeDump(config));
  return configOutputPath;
};

export default {
  command: "init",
  desc: "initialises the user's config file",
  builder: (yargs: Argv): Argv<InitArgs> =>
    yargs.options({
      token: {
        alias: "t",
        describe: "A users github profile token",
        type: "string",
        demandOption: true,
      },
      repos: {
        alias: "r",
        describe: "A users github profile token",
        type: "array",
      },
      issues: {
        alias: "i",
        describe: "A users github profile token",
        type: "array",
      },
    }),
  handler: (args: Arguments<InitArgs>): void => {
    // if file exists, perhaps ask user if they want to overwrite??
    if (!fs.existsSync(configDir)) {
      const configOutputPath = generateConfigFile(configDir, args.token);

      console.log(`Written config file at: ${configOutputPath}`);
    } else {
      console.log(args.issues);
      console.log("Config file already exists.");
    }
  },
};
