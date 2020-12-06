import { Arguments, Argv } from "yargs";
import yaml from "js-yaml";

import fs from "fs";
import path from "path";

import {
  configOutputPath,
  configDir,
  configTemplateName,
} from "../utils/constants";
import { parseConfigYaml } from "../utils/parsers";
import { Config, InitArgs } from "../types/types";

const generateConfigFile = (configDir: string, token: string): string => {
  fs.mkdirSync(configDir);

  const config: Config = parseConfigYaml(
    path.resolve(__dirname, `../templates/${configTemplateName}`),
  );
  config.username.authToken = token;

  fs.writeFileSync(configOutputPath, yaml.safeDump(config));
  return configOutputPath;
};

export default {
  command: "init",
  desc: "Initialises the user's config file",
  builder: (yargs: Argv): Argv<InitArgs> =>
    yargs.options({
      token: {
        alias: "t",
        describe: "A user's github profile token",
        type: "string",
        default: "secret",
      },
      repos: {
        alias: "r",
        describe: "List of repos you would like to track",
        type: "array",
      },
      issues: {
        alias: "i",
        describe: "List of issues you would like to track",
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
