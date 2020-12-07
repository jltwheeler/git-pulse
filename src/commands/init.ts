import { Arguments, Argv } from "yargs";
import yaml from "js-yaml";

import fs from "fs";
import path from "path";

import {
  configOutputPath,
  configDir,
  configTemplateName,
  repoRegex,
} from "../utils/constants";
import { parseConfigYaml, isStringArray } from "../utils/parsers";
import { createRepoQuery } from "../queries";
import serviceRepo from "../services/repos";
import { Config, InitArgs } from "../types/types";

const generateConfigFile = async (
  configDir: string,
  args: InitArgs,
): Promise<string> => {
  fs.mkdirSync(configDir);

  const config: Config = parseConfigYaml(
    path.resolve(__dirname, `../templates/${configTemplateName}`),
  );

  if (args.token) {
    config.username.authToken = args.token;
  }

  if (args.issues && isStringArray(args.issues)) {
    config.issues = args.issues;
  }

  if (args.repos && isStringArray(args.repos)) {
    const queries: string[] = args.repos.map((repo: string, idx) => {
      const result = repoRegex.exec(repo);
      if (result) {
        const [owner, name] = result[0].split("/");
        return createRepoQuery(idx, name, owner);
      } else {
        throw new Error(`${repo} is not a correct repository URL`);
      }
    });

    const data = await serviceRepo.tester(queries.join("\n"));
    console.log(data);

    config.repos = args.repos;
  }

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
  handler: async (args: Arguments<InitArgs>): Promise<void> => {
    if (!fs.existsSync(configDir)) {
      const configOutputPath = await generateConfigFile(configDir, {
        token: args.token,
        issues: args?.issues,
        repos: args?.repos,
      });
      console.log(`Written config file at: ${configOutputPath}`);
    } else {
      throw new Error(
        `Config file already exists at: ${configOutputPath}. Please use git-pulse config commands to update any config settings.`,
      );
    }
  },
};
